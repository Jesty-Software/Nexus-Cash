import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  const { user, session } = await locals.validateUser();
  return { user };
}) satisfies LayoutServerLoad;
