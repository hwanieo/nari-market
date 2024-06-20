'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import prismaClient from '@/prisma/prisma.client';
import { SupabaseClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';

export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const supabase = createClient();
  const { error } = await supabase.auth.signUp(data);
  console.log(error);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function usercheck() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect('/login');
  }

  return { data };
}

const FormSchema = z.object({
  title: z.string({
    invalid_type_error: 'Please input title',
  }),
  description: z.string({
    invalid_type_error: 'Please input description',
  }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an price greater than $0' }),
  image: z.any(),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    image?: File[];
    price?: number[];
  };
  message?: string | null;
};

// Add image upload functionality using Supabase storage
// Update the registerProduct function in app/libs/actions.ts

export async function registerProduct(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    image: formData.get('image') as File, // Add image field to FormSchema
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product',
    };
  }

  const { title, description, price, image } = validatedFields.data;
  const fileName = `${uuid()}-${image.name}`;

  const supabase = createClient();

  try {
    const { data, error: getUserError } = await supabase.auth.getUser();

    if (!data.user) {
      throw getUserError;
    }

    // Upload image to Supabase storage
    const { data: fileData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(`public/${fileName}`, image);

    if (uploadError) {
      throw uploadError;
    }

    const { publicUrl } = supabase.storage
      .from('images')
      .getPublicUrl(`public/${fileName}`).data;

    console.log(publicUrl);

    await prismaClient.product.create({
      data: {
        title,
        description,
        imageUrl: publicUrl,
        price,
        userId: data.user.id,
      },
    });
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  revalidatePath('/buy');
  redirect('/buy');
}

export async function getAllProducts() {
  noStore();

  const products = await prismaClient.product.findMany();

  return products;
}

export async function getProduct(id: string) {
  noStore();

  const product = await prismaClient.product.findUnique({ where: { id } });

  await prismaClient.product.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return product;
}

export async function getSalesList() {
  noStore();

  const supabase = createClient();

  const { user } = (await supabase.auth.getUser()).data;

  if (!user) {
    throw new Error('Invalid');
  }

  const userId = user.id;

  const products = await prismaClient.product.findMany({ where: { userId } });

  return products;
}
