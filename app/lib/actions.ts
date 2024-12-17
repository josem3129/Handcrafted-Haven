"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getSession } from "./session";

const CreateFormSchema = z.object({
  id: z.string(),
  title: z.string({
    message: 'Please add a title.',
  }),
  amount: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),

  description: z.string({
    message: 'Please add description'
  }),
  date: z.string(),
});

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    message: 'Please add a title.',
  }),
  amount: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),

  description: z.string({
    message: 'Please add description'
  }),
  date: z.string(),
});

const ReviewSchema = z.object({
  id: z.string(),
  listing_id : z.string(),
  name: z.string({
    message: 'Please add a title.',
  }),
  rating: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),

  review: z.string({
    message: 'Please add description'
  }),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateReview = ReviewSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    amount?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createInvoice(prevState: State, formData: FormData) {
  // finding session
  const userInfo = await getSession()
    let user: { id: string } = { id: '' };
   if (userInfo !== undefined) {
      user = JSON.parse(JSON.stringify(userInfo))
   }
  //finding user in SQL
  const userData = await sql`SELECT * FROM users WHERE id=${user.id}`;
    const userInfoData = userData.rows[0];

    console.log(userInfoData);
    
  //validate using zod
  const validatedFields = CreateInvoice.safeParse({
    title: formData.get('title'),
    amount: formData.get('amount'),
    description: formData.get('description'),
  });
  
  //if form fails, return errors early. otherwise, continue 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  
  //prepare data insertion into database
  const imageUrl = '/image-holder-icon.png'
  const { title, amount, description } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO listings (user_id, name, title, amount, image_url, product_description, date)
      VALUES (${userInfoData.id}, ${userInfoData.name}, ${title}, ${amountInCents}, ${imageUrl}, ${description}, ${date})
    `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create listing.',
        };
  }
// need to change this to listings
  const rawFormData = {
    title: formData.get('title'),
    amount: formData.get('amount'),
    description: formData.get('description'),
  };

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
  
}

// need to change to update listing
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    title: formData.get('title'),
    amount: formData.get('amount'),
    description: formData.get('description'),
  });
 
  // finding session
  const userInfo = await getSession()
    let user: { name: string } = { name: '' };
   if (userInfo !== undefined) {
      user = JSON.parse(JSON.stringify(userInfo))
   }
  //finding user in SQL
  const userData = await sql`SELECT * FROM users WHERE name=${user.name}`;
    const userInfoData = userData.rows[0];

    
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  const imageUrl = '/image-holder-icon.png'
  const { title, amount, description } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    
    await sql`
      UPDATE listings
      SET title = ${title}, amount = ${amountInCents}, product_description = ${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard');
}

export async function deleteInvoice(id: string) {
  
  try {
    await sql`DELETE FROM listings WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return{message:"Deleted Invoice"}
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Listing.',
    };
  }
}


export type StateReview = {
  errors?: {
    name?: string[];
    review?: string[];
    rating?: string[];
    listing_id?: string[]


  };
  message?: string | null;
};
export async function createReview(prevState: StateReview, formData: FormData) {

  console.log(1);
  
  //validate using zod
  const validatedFields = CreateReview.safeParse({
    name: formData.get('name'),
    review: formData.get('review'),
    rating: formData.get('rating'),
    listing_id: formData.get('listing_id'),
  });
  console.log(2);
  
  //if form fails, return errors early. otherwise, continue 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  console.log(3);
  
  //prepare data insertion into database
  const { name, review, rating, listing_id } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  console.log(`ID${listing_id} NAME${name} RATING${rating} review${review} ${date}`);
  
  try {
    await sql`
      INSERT INTO reviews (listing_id, rating, review, name, date)
      VALUES (${listing_id}, ${rating}, ${review}, ${name}, ${date})
    `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create listing.',
        };
  }
// need to change this to listings
  // const rawFormData = {
  //   title: formData.get('title'),
  //   amount: formData.get('amount'),
  //   description: formData.get('description'),
  // };

  revalidatePath(`/dashboard/invoices`);
  redirect(`/dashboard/invoices/${listing_id}`);
  
}