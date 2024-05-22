"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPost = async (
  description: string | null,
  formData: FormData
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const subredditId = formData.get("subredditId") as string;

  await prisma.post.create({
    data: {
      title: title,
      imageString: imageUrl ?? undefined,
      subredditId: subredditId,
      userId: user.id,
      textContent: description ?? undefined,
    },
  });
  if (true) {
    revalidatePath("/");
    redirect("/");
  }
};
