"use client";
import { useRef, type ReactElement } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { SubmitButtons } from "../submit-buttons/SubmitButtons";
import { createComment } from "@/actions/comment/create-comment";

export interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps): ReactElement {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      className="mt-5 "
      action={async (formData) => {
        await createComment(formData);
        ref.current?.reset();
      }}
    >
      <input name="postId" value={postId} type="hidden" />
      <Label>Comment as aldrich</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="w-full mt-1 mb-2"
        name="text"
      />
      <SubmitButtons buttonTitle="Comment" />
    </form>
  );
}
