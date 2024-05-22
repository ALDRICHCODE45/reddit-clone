import { type ReactElement } from "react";
import { FileTabUpload } from "../ui/FileTabUpload";
import { getCommunityInformation } from "@/actions";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({
  params,
}: pageProps): Promise<ReactElement> {
  const { ok, community } = await getCommunityInformation(params.id);
  if (!ok) {
    notFound();
  }
  return (
    <FileTabUpload
      communityName={community?.name as string}
      communityId={params.id}
    />
  );
}
