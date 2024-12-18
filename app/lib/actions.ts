"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getSession } from "./session";
import bcrypt from 'bcrypt';


const CreateUserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string({
    message: "Please add a email.",
  }),
  password: z.string(),
  confirmPassword: z.string()
  });

const CreateFormSchema = z.object({
  id: z.string(),
  listingImage: z.string(),
  title: z.string({
    message: "Please add a title.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),

  description: z.string({
    message: "Please add description",
  }),
  date: z.string(),
});

const FormSchema = z.object({
  id: z.string(),
  image_url: z.string(),
  title: z.string({
    message: "Please add a title.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),

  description: z.string({
    message: "Please add description",
  }),
  date: z.string(),
});

const ReviewSchema = z.object({
  id: z.string(),
  listing_id: z.string(),
  name: z.string({
    message: "Please add a title.",
  }),
  rating: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),

  review: z.string({
    message: "Please add description",
  }),
  date: z.string(),
});
const CreateInvoice = CreateFormSchema.omit({ id: true, date: true });
const CreateUserInvoice = CreateUserFormSchema.omit({ id: true });
const CreateReview = ReviewSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    amount?: string[];
    description?: string[];
    image_url?: string[]
  };
  message?: string | null;
};
export type CreateListingState = {
  errors?: {
    title?: string[];
    amount?: string[];
    description?: string[];
    listingImage?: string[];
  };
  message?: string | null;
};
export type UserState = {
  errors?: {
    name?: string[],
    email?: string[];
    password?: string[];
    confirmPassword?: string[]
  };
  message?: string | null;
};
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function createUser(
  prevState: UserState,
  formData: FormData
) {
  //validate using zod
  const validatedFields = CreateUserInvoice.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm password"),
  });

  //if form fails, return errors early. otherwise, continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create listing.",
    };
  }

  //prepare data insertion into database
  const { name, email, password, confirmPassword } = validatedFields.data;
  
  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword});
      `;
    } catch (error) {
          console.log(`Password ${password} confirm Password ${hashedPassword}`);
          return {
            message: 'Database Error: Failed to Create listing.',
          };
    }
    // need to change this to listings
  
  
    revalidatePath("/login");
    redirect("/login");
  }else{
    return {
      message: "password don't match",
    };
  }
    
  }

export async function createInvoice(
  prevState: CreateListingState,
  formData: FormData
) {
  // finding session
  const userInfo = await getSession();
  let user: { id: string } = { id: "" };
  if (userInfo !== undefined) {
    user = JSON.parse(JSON.stringify(userInfo));
  }
  //finding user in SQL
  const userData = await sql`SELECT * FROM users WHERE id=${user.id}`;
  const userInfoData = userData.rows[0];

  //validate using zod
  const validatedFields = CreateInvoice.safeParse({
    title: formData.get("title"),
    amount: formData.get("amount"),
    description: formData.get("description"),
    listingImage: formData.get("listingImage"),
  });

  //if form fails, return errors early. otherwise, continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create listing.",
    };
  }

  //prepare data insertion into database
  const imageUrl = "/image-holder-icon.png";
  const { title, amount, description, listingImage } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO listings (user_id, name, title, amount, image_url, product_description, date)
      VALUES (${userInfoData.id}, ${userInfoData.name}, ${title}, ${amountInCents}, ${listingImage}, ${description}, ${date})
    `;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create listing.',
        };
  }
  // need to change this to listings
  const rawFormData = {
    title: formData.get("title"),
    amount: formData.get("amount"),
    description: formData.get("description"),
    listingImage: formData.get("listingImage"),
  };
  console.log(`THIS IS THE RAW FORMAT ${JSON.stringify(rawFormData.listingImage)}`);

  revalidatePath("/dashboard/listings");
  redirect("/dashboard/listings");
}

// need to change to update listing
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    title: formData.get("title"),
    amount: formData.get("amount"),
    description: formData.get("description"),
    image_url: formData.get('listingImage')
  });

  // finding session
  const userInfo = await getSession();
  let user: { name: string } = { name: "" };
  if (userInfo !== undefined) {
    user = JSON.parse(JSON.stringify(userInfo));
  }
  //finding user in SQL
  const userData = await sql`SELECT * FROM users WHERE name=${user.name}`;
  const userInfoData = userData.rows[0];

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }
  const { title, amount, description, image_url } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE listings
      SET title = ${title}, amount = ${amountInCents}, product_description = ${description}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/listings");
  redirect("/dashboard");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM listings WHERE id = ${id}`;
    revalidatePath("/dashboard/listings");
    return { message: "Deleted listing" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete Listing.",
    };
  }
}

export type StateReview = {
  errors?: {
    name?: string[];
    review?: string[];
    rating?: string[];
    listing_id?: string[];
  };
  message?: string | null;
};
export async function createReview(prevState: StateReview, formData: FormData) {
  console.log(1);

  //validate using zod
  const validatedFields = CreateReview.safeParse({
    name: formData.get("name"),
    review: formData.get("review"),
    rating: formData.get("rating"),
    listing_id: formData.get("listing_id"),
  });
  console.log(2);

  //if form fails, return errors early. otherwise, continue
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  console.log(3);

  //prepare data insertion into database
  const { name, review, rating, listing_id } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  console.log(
    `ID${listing_id} NAME${name} RATING${rating} review${review} ${date}`
  );

  try {
    await sql`
      INSERT INTO reviews (listing_id, rating, review, name, date)
      VALUES (${listing_id}, ${rating}, ${review}, ${name}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create listing.",
    };
  }
  // need to change this to listings
  // const rawFormData = {
  //   title: formData.get('title'),
  //   amount: formData.get('amount'),
  //   description: formData.get('description'),
  // };

  revalidatePath(`/dashboard/listings`);
  redirect(`/dashboard/listings/${listing_id}`);
}
