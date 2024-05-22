"use client";
import { useEffect, useState, type ReactElement } from "react";
import pfg from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/tip-tap-editor/TipTapEditor";
import { SubmitButtons } from "@/components/submit-buttons/SubmitButtons";
import { UploadDropzone } from "@/components/upload-thing//UploadThing";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { createPost } from "@/actions";

export interface FileTabUploadProps {
  communityName: string;
  communityId: string;
}
const rules = [
  {
    id: 1,
    text: "Remember the human",
  },
  {
    id: 2,
    text: "Behave like you would be in real life",
  },
  {
    id: 3,
    text: "Look for the original source of content",
  },
  {
    id: 4,
    text: "Search for duplication before posting",
  },
  {
    id: 5,
    text: "Read the community guidlines",
  },
];

export function FileTabUpload({
  communityName,
  communityId,
}: FileTabUploadProps): ReactElement {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded, setLoaded]);

  if (!loaded) {
    return <p>Wait..</p>;
  }

  const createRedditPost = createPost.bind(null, description);

  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit:
          <Link
            className="hover:underline text-primary"
            href={`/r/${communityId}`}
          >
            r/{communityName}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="post" className="">
              <Text className="h-4 w-4 mr-2" />
              Post
            </TabsTrigger>
            <TabsTrigger value="image" className="">
              <Video className="h-4 w-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createRedditPost}>
                <input
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                  type="hidden"
                ></input>
                <input
                  type="hidden"
                  name="subredditId"
                  value={communityId}
                ></input>
                <CardHeader>
                  <Label>Title</Label>
                  <Input
                    required
                    value={title ?? ""}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    placeholder="Title"
                  />
                  <TipTapEditor
                    description={description}
                    setDescription={setDescription}
                  />
                </CardHeader>
                <CardFooter>
                  <SubmitButtons buttonTitle="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageUrl === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0]?.url);
                    }}
                    onUploadError={(e: Error) => {
                      alert("Error");
                    }}
                  />
                ) : (
                  <Image
                    className="rounded-xl  w-full h-80 object-contain "
                    src={imageUrl}
                    alt="uploaded image"
                    width={500}
                    height={500}
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%] ">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image className="h-10 w-10" src={pfg} alt="pfp" />
            <h1 className="font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-2" />
          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}.{item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
