"use client";
import { Share } from "lucide-react";
import { type ReactElement } from "react";
import { useToast } from "../ui/use-toast";

export interface CopyPostLinkProps {
  id: string;
}

export function CopyPostLink({ id }: CopyPostLinkProps): ReactElement {
  const { toast } = useToast();

  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: "Success",
      description: "your link is copied in your clipboard",
      variant: "default",
    });
  }

  return (
    <button
      className="flex items-center gap-x-2"
      onClick={() => copyToClipboard()}
    >
      <Share className="h-4 w-4 text-muted-foreground" />
      <p className="text-muted-foreground font-medium text-sm">Share</p>
    </button>
  );
}
