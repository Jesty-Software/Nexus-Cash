import lucia from "lucia-auth";
import prismaAdapter from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prisma } from "$lib/server/prisma";

export const auth = lucia({
  adapter: prismaAdapter(prisma),
  env: dev ? "DEV" : "PROD",

  transformUserData: (userData) => {
    return {
      username: userData.username,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      isVerified: userData.isVerified,
      history: userData.history,
      profileImage: userData.profileImage,
      bannerImage: userData.bannerImage,
    };
  },
});

export type Auth = typeof auth;
