"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import prismaClient from "@/prisma/prisma.client";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  console.log(error);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function usercheck() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }

  return { data };
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  title: z.string({
    invalid_type_error: "Please input title",
  }),
  description: z.string({
    invalid_type_error: "Please input description",
  }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an price greater than $0" }),
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

const supabase = createClient();

export async function registerProduct(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: formData.get("price") as string,
    image: formData.get("image") as File, // Add image field to FormSchema
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product",
    };
  }

  const { title, description, price, image } = validatedFields.data;

  try {
    const { data, error: getUserError } = await supabase.auth.getUser();

    if (!data.user) {
      throw getUserError;
    }

    // Upload image to Supabase storage
    const { data: fileData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`public/${image.name}`, image);

    if (uploadError) {
      throw uploadError;
    }

    await prismaClient.product.create({
      data: {
        title,
        description,
        imageUrl: fileData.path, // Store image URL from storage
        price,
        userId: data.user.id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/buy");
  redirect("/buy");
}
