"use server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";

export const createCommunity = async (prevState: any, formData: FormData) => {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return redirect("/api/auth/login");
    }
    const name = formData.get("name") as string;

    const community = await prisma.subreddit.create({
      data: {
        name: name,
        userId: kindeUser.id,
      },
    });
    return {
      status: "success",
      msg: "Community created successfully",
      id: community.id,
    };
  } catch (e) {
    /* handle error */
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        msg: "Community name already taken",
        status: "error",
      };
    }
  }
};
