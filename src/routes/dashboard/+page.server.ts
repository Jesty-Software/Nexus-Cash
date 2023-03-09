import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const { user, session } = await locals.validateUser();

  if (!user && !session) {
    throw redirect(302, "/login");
  }
}) satisfies PageServerLoad;
