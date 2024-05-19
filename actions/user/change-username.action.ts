"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const changeUserName = async (prevState: any, formData: FormData) => {
  try {
    const { getUser } = getKindeServerSession();
    const kindeuser = await getUser();

    const userExists = await prisma.user.findUnique({
      where: { id: kindeuser?.id },
    });

    if (!userExists) {
      return redirect("/");
    }
    const username = formData.get("username") as string;

    if (userExists.userName === username) {
      return {
        msg: "thats your current userName",
        status: "current",
      };
    }

    await prisma.user.update({
      where: {
        id: kindeuser!.id,
      },
      data: {
        userName: username,
      },
      select: {
        userName: true,
      },
    });

    return {
      msg: "name succefully updated",
      status: "green",
    };
  } catch (e) {
    /* handle error */

    return {
      msg: "Username already exists",
      status: "error",
    };
  }
};
