"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const updateCommunityDescription = async (
  prevState: any,
  formData: FormData
) => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  if (!session) {
    return redirect("/api/auth/login");
  }
  try {
    const communityId = formData.get("communityId") as string;
    const newDescription = formData.get("description") as string;

    const communityUpdated = await prisma.subreddit.update({
      where: { id: communityId },
      data: {
        description: newDescription,
        updatedA: new Date(),
      },
    });
    if (!communityUpdated) {
      return {
        msg: "something went wrong",
        status: "error",
      };
    }
    return {
      msg: "description updated succesfully",
      status: "success",
    };
  } catch (e) {
    /* handle error */
    return {
      msg: "something went wrong",
      status: "error",
    };
  }
};
