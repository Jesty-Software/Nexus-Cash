import { handleHooks } from "@lucia-auth/sveltekit";
import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const hooks: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  return response;
};

export const handle: Handle = sequence(handleHooks(auth), hooks);
