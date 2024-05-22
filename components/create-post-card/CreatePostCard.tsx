import { type ReactElement } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import pfp from "../../public/pfp.png";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { ImageDown, Link2 } from "lucide-react";

export interface CreatePostCardProps {}

export function CreatePostCard({}: CreatePostCardProps): ReactElement {
  return (
    <Card className="px-4 py-2 flex items-center gap-x-4">
      <Image src={pfp} alt="pfp" className="h-12 w-fit" />
      <Link
        href="/r/70913481-59b7-403a-92e6-848da31a75dc/create"
        className="w-full"
      >
        <Input placeholder="create your post" />
      </Link>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/r/70913481-59b7-403a-92e6-848da31a75dc/create">
            <ImageDown className="w-4 h-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <Link href="">
            <Link2 className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
