import { handleVote } from "@/actions/votes/handleVote";
import { CommentForm } from "@/components/comment-form/CommentForm";
import { CopyPostLink } from "@/components/copy-post-link/CopyPostLink";
import { DownVote, UpVote } from "@/components/submit-buttons/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { Cake, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ReactElement } from "react";
import { unstable_noStore } from "next/cache";

export interface PostPageProps {
  params: {
    id: string;
  };
}

async function getData(postId: string) {
  unstable_noStore();
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subredditId: true,
      Comemnt: {
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              imageUrl: true,
              userName: true,
            },
          },
        },
      },
      Vote: {
        select: {
          voteType: true,
        },
      },
      Subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function PostPage({
  params,
}: PostPageProps): Promise<ReactElement> {
  const data = await getData(params.id);
  console.log({ comments: data.Comemnt });

  return (
    <div className="max-w-[1200px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <Card className="p-2 flex">
          <div className="flex flex-col items-center gap-y-2 p-2">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input name="postId" type="hidden" value={data.id} />
              <UpVote />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;
              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input name="postId" type="hidden" value={data.id} />
              <DownVote />
            </form>
          </div>
          <div className="p-2 w-full ">
            <p className="text-xs text-muted-foreground">
              Posted by u/{data.User?.userName}
            </p>
            <h1 className="font-medium mt-1 text-lg">{data.title}</h1>
            {data.imageString && (
              <Image
                className="w-full h-auto object-contain mt-2 rounded-3xl"
                src={data.imageString}
                alt="postImage"
                width={500}
                height={400}
              />
            )}
            {data.textContent && (
              <p className="pt-3 font-bold ml-10">{data.textContent}</p>
            )}
            <div className="flex gap-x-5 items-center mt-3">
              <div className="flex items-center gap-x-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-xs">
                  {data.Comemnt.length}
                </p>
              </div>
              <CopyPostLink id={params.id} />
            </div>

            <CommentForm postId={params.id} />

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-7">
              {data.Comemnt.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        item.User?.imageUrl
                          ? item.User.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      className="w-7 h-7 rounded-full"
                      alt="Avatar of user"
                    />

                    <h3 className="text-sm font-medium">
                      {item.User?.userName}
                    </h3>
                  </div>

                  <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <div className="w[30%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data.User?.userName}`}
                alt="subreddit image"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href={`/r/${data.subredditId}`} className="font-medium">
                r/{data?.Subreddit!.name}
              </Link>
            </div>

            <p className="text-sm font-normal text-secondary-foreground  mt-2">
              {data?.Subreddit?.description}
            </p>
            <div className="flex items-center gap-x-2 mt-2">
              <Cake className="h-5 w-5 text-muted-foreground text-sm" />
              <p className="text-muted-foreground font-medium">
                Created:{" "}
                {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Separator className="my-5" />
            <Button className="rounded-full w-full" asChild>
              <Link href={`/r/${data?.subredditId}/create`}>Create Post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
