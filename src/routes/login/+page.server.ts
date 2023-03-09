import { auth } from "$lib/server/lucia";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";

const schema = z.object({
  username: z.string({ required_error: "Username is Required" }).min(3, { message: "Username needs to be longer than 3 characters!" }).trim(),
  email: z.string({ required_error: "Email is required" }).min(3, { message: "Email needs to be longer than 3 characters!" }).email({ message: "Email is not valid!" }),
  password: z.string({ required_error: "Password is required" }).min(8, { message: "Password needs to be longer than 8 characters!" }),
});

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.validate();

  if (session) {
    throw redirect(302, "/dashboard");
  }
};

export const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
    const { username, email, password } = formData;

    try {
      await schema.parseAsync({ username, email, password });
    } catch (err: any) {
      const { fieldErrors: errors } = err.flatten();
      const { password, passwordConfirm, ...rest } = formData;
      return {
        data: rest,
        errors,
      };
    }

    try {
      const key = await auth.validateKeyPassword("email", email, password);
      const session = await auth.createSession(key.userId);
      locals.setSession(session);
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Internal Server Error" });
    }
    throw redirect(302, "/dashboard");
  },
} satisfies Actions;
