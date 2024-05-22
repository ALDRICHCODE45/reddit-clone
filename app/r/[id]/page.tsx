import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type ReactElement } from "react";
import { SubDescriptionForm } from "./ui/SubDescriptionForm";
import { Cake, FileQuestion } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreatePostCard } from "@/components/create-post-card/CreatePostCard";
import { PostCard } from "@/components/create-post-card/post-card/PostCard";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import Pagination from "@/components/pagination/Pagination";

export interface pageProps {
  params: {
    id: string;
  };
  searchParams: { page: string };
}

async function getData(SubredditId: string, searchParam: string) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count({
      where: {
        subredditId: SubredditId,
      },
    }),

    prisma.subreddit.findUnique({
      where: {
        id: SubredditId,
      },

      select: {
        id: true,
        name: true,
        createdAt: true,
        description: true,
        userId: true,
        User: {
          select: {
            id: true,
          },
        },
        posts: {
          take: 10,
          skip: searchParam ? (Number(searchParam) - 1) * 10 : 0,

          select: {
            title: true,
            imageString: true,
            id: true,
            textContent: true,
            Comemnt: {
              select: {
                id: true,
              },
            },
            Vote: {
              select: {
                userId: true,
                voteType: true,
              },
            },
            User: {
              select: {
                userName: true,
              },
            },
          },
        },
      },
    }),
  ]);

  return { data, count };
}

export default async function page({
  params,
  searchParams,
}: pageProps): Promise<ReactElement> {
  const { data: community, count } = await getData(
    params.id,
    searchParams.page
  );
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (!session) {
    return notFound();
  }

  const isUserSubredditOwner = session.id === community?.User?.id;
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 pb-[120px]">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />

        {community?.posts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col justify-center items-center rounded-md border border-dashed p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <FileQuestion className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              No post have been created
            </h2>
          </div>
        ) : (
          <>
            {community?.posts.map((post) => (
              <PostCard
                commentAmount={post.Comemnt.length}
                key={post.id}
                id={post.id}
                imageUrl={post.imageString}
                SubredditName={community.name}
                SubredditId={community.id}
                title={post.title}
                userName={post.User?.userName as string}
                description={post.textContent}
                voteCount={post.Vote.reduce((acc, vote) => {
                  if (vote.voteType === "UP") return acc + 1;
                  if (vote.voteType === "DOWN") return acc - 1;

                  return acc;
                }, 0)}
              />
            ))}

            <Pagination totalPages={Math.ceil(count / 10)} />
          </>
        )}
      </div>

      <div className="w-[35%] ">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${community?.name}`}
                alt="subreddit image"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href="/" className="font-medium">
                r/{community?.name}
              </Link>
            </div>

            {isUserSubredditOwner ? (
              <SubDescriptionForm
                id={params.id}
                description={community?.description ?? undefined}
              />
            ) : (
              <p className="text-sm font-normal text-secondary-foreground  mt-2">
                {community?.description}
              </p>
            )}
            <div className="flex items-center gap-x-2 mt-2">
              <Cake className="h-5 w-5 text-muted-foreground text-sm" />
              <p className="text-muted-foreground font-medium">
                Created:{" "}
                {new Date(community?.createdAt as Date).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <Separator className="my-5" />
            <Button className="rounded-full w-full" asChild>
              <Link
                href={
                  session?.id ? `/r/${community?.id}/create` : "/api/auth/login"
                }
              >
                Create Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
