"use server";
import prisma from "@/lib/db";

export const getCommunityInformation = async (communityId: string) => {
  try {
    const community = await prisma.subreddit.findUnique({
      where: { id: communityId },
      select: {
        name: true,
        User: true,
        description: true,
        createdAt: true,
        id: true,
        posts: {
          select: {
            title: true,
            imageString: true,
            id: true,
            textContent: true,
            Vote: {
              select: {
                userId: true,
                voteType: true,
              },
            },
            User: {
              select: {
                userName: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (!community) {
      return {
        ok: false,
        msg: "something went wrong",
      };
    }

    return {
      community,
      ok: true,
      msg: "success",
    };
  } catch (e) {
    /* handle error */
    return {
      ok: false,
      msg: "catch",
    };
  }
};
