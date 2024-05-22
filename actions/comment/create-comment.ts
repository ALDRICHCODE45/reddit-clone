"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createComment = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  if (!session) {
    return redirect("/");
  }
  const text = formData.get("text") as string;
  const postId = formData.get("postId") as string;

  await prisma.comment.create({
    data: {
      postId,
      userId: session.id,
      text,
    },
  });
  revalidatePath(`/post/${postId}`);
};
