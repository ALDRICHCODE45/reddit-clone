"use server";

import prisma from "@/lib/db";

export const getUserInformation = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return {
        ok: false,
        msg: "you must have an account",
      };
    }
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      msg: "something went wrong",
    };
  }
};
