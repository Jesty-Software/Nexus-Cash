import { auth } from "$lib/server/lucia";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";

const schema = z
  .object({
    username: z.string({ required_error: "Username is Required" }).min(3, { message: "Username needs to be longer than 3 characters!" }).trim(),
    email: z.string({ required_error: "Email is required" }).min(3, { message: "Email needs to be longer than 3 characters!" }).email({ message: "Email is not valid!" }),
    password: z.string({ required_error: "Password is required" }).min(8, { message: "Password needs to be longer than 8 characters!" }),
    passwordConfirm: z.string({ required_error: "Password Confirmation is required" }).min(8, { message: "Password Confirmation needs to be longer than 8 characters!" }),
    terms: z.enum(["on", "off"], { required_error: "You must agree to the terms of service!" }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({ code: "custom", message: "The Confirm Password must match the Password!", path: ["password"] });
      ctx.addIssue({ code: "custom", message: "The Confirm Password must match the Password!", path: ["passwordConfirm"] });
    }
  });

export const load = (async ({ locals }) => {
  const session = await locals.validate();

  if (session) {
    throw redirect(302, "/dashboard");
  }
}) satisfies PageServerLoad;

export const actions = ({
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
    const { username, email, password, passwordConfirm, terms } = formData;

    try {
      await schema.parseAsync({ username, email, password, passwordConfirm, terms });
    } catch (err: any) {
      const { fieldErrors: errors } = err.flatten();
      const { password, passwordConfirm, ...rest } = formData;
      return {
        data: rest,
        errors,
      };
    }

    try {
      await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: email,
          password,
        },
        attributes: {
          username: username,
          about: "",
          created_at: new Date().toUTCString(),
          updated_at: new Date().toUTCString(),
          isVerified: false,
          history: [],
          profileImage: "Nexus Default Profile Zoom.png",
        },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Internal Server Error" });
    }
    throw redirect(302, "/login");
  },
}) satisfies Actions;
