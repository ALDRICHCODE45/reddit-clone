"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

enum VoteType {
  DOWN = "DOWN",
  UP = "UP",
}

export const handleVote = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  if (!session) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as VoteType;

  const vote = await prisma.vote.findFirst({
    where: {
      postId,
      userId: session.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/", "page");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });

      return revalidatePath("/", "page");
    }
  }

  await prisma.vote.create({
    data: {
      userId: session.id,
      postId,
      voteType: voteDirection,
    },
  });

  return revalidatePath("/", "page");
};
