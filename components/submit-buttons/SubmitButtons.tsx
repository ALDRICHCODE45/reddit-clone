"use client";
import { type ReactElement } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export interface SubmitButtonsProps {
  buttonTitle: string;
}

export function SubmitButtons({
  buttonTitle,
}: SubmitButtonsProps): ReactElement {
  const { pending } = useFormStatus();
  const router = useRouter();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{buttonTitle} </Button>
      )}
    </>
  );
}

export function SaveButton(): ReactElement {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="sm" className="mt-2 w-full">
          <Loader2 className="mr-2 h-3 w-3 animate-spin " />
          Please wait
        </Button>
      ) : (
        <Button size="sm" type="submit" className="mt-2 w-full ">
          Save
        </Button>
      )}
    </>
  );
}

export function UpVote() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}

export function DownVote() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="sm" type="submit">
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
