"use server";

import prisma from "@/lib/db";

export const getUserInformation = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new Error(`user with id ${id} does not exists`);
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
