import { Card } from "@/components/ui/card";
import Image from "next/image";
import banner from "../public/banner.png";
import HeroImage from "../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "@/components/create-post-card/CreatePostCard";
import prisma from "@/lib/db";
import { PostCard } from "@/components/create-post-card/post-card/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "@/components/suspense-card/SuspenseCard";
import Pagination from "@/components/pagination/Pagination";
import { unstable_noStore as noStore } from "next/cache";

async function getData(searchParam: string) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParam ? (Number(searchParam) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comemnt: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
            firstName: true,
          },
        },
        Subreddit: {
          select: {
            name: true,
            id: true,
          },
        },
        Vote: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  return { data, count };
}

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className=" w-full lg:max-w-[1200px] mx-auto flex gap-x-10 mt-4 pb-[100px] ">
      <div className="w-[100%]  lg:w-[65%%]  flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="lg:w-[35%]">
        <Card className="opacity-0 lg:opacity-[100%]">
          <Image src={banner} alt="banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HeroImage}
                alt="HeroImage"
                className="w-10 h-16 -mt-5"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground pt2">
              Your Home Reddit frontpage. come here to check in with your
              favorite comminities!
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-3 my-2">
              <Button asChild variant="secondary">
                <Link href="/r/d9a6a68e-e4fb-4e8d-8dbb-25510084e34e/create">
                  Create Post
                </Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const ShowItems = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { data, count } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          commentAmount={post.Comemnt.length}
          key={post.id}
          id={post.id}
          imageUrl={post.imageString}
          description={post.textContent}
          SubredditName={post.Subreddit!.name}
          title={post.title}
          userName={post.User!.userName as string}
          SubredditId={post.Subreddit!.id}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;
            return acc;
          }, 0)}
        />
      ))}
      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  );
};
