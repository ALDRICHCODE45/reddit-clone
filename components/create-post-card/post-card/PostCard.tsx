import { handleVote } from "@/actions/votes/handleVote";
import { CopyPostLink } from "@/components/copy-post-link/CopyPostLink";
import { DownVote, UpVote } from "@/components/submit-buttons/SubmitButtons";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";

export interface PostCardProps {
  title: string;
  description: string | null;
  id: string;
  SubredditName: string;
  userName: string;
  imageUrl: string | null;

  SubredditId: string;
  voteCount: number;
  commentAmount: number;
}

export function PostCard({
  id,
  imageUrl,
  description,
  SubredditName,
  title,
  userName,
  SubredditId,
  commentAmount,
  voteCount,
}: PostCardProps): ReactElement {
  return (
    <Card className=" flex relative overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value="UP" />
          <input name="postId" type="hidden" value={id} />
          <UpVote />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input name="voteDirection" type="hidden" value="DOWN" />
          <input name="postId" type="hidden" value={id} />
          <DownVote />
        </form>
      </div>
      <div className="">
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href={`/r/${SubredditId}`}>
            r/{SubredditName}
          </Link>
          <p className="text-xs text-muted-foreground ">
            Posted by:
            <span className="hover:underline cursor-pointer  hover:text-primary">
              u/{userName}
            </span>
          </p>
        </div>
        <div className="px-2 ">
          <Link href={`/post/${id}`}>
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>
        <div className="max-h-[500px] overflow-hidden">
          {imageUrl ? (
            <Image
              className="px-2 pt-2 rounded-3xl w-fit h-fit"
              src={imageUrl}
              alt="postImage"
              width={600}
              height={300}
            />
          ) : (
            <div className="px-2 pt-2 prose">{description}</div>
          )}
        </div>
        <div className="m-3 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Link href={`/post/${id}`} className="flex items-center gap-x-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-xs">
                {commentAmount}
              </p>
            </Link>
          </div>
          <CopyPostLink id={id} />
        </div>
      </div>
    </Card>
  );
}
