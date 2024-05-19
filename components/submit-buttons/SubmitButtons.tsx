"use client";

import { type ReactElement } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export interface SubmitButtonsProps {
  buttonTitle: string;
}

export function SubmitButtons({
  buttonTitle,
}: SubmitButtonsProps): ReactElement {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit">{buttonTitle}</Button>
      )}
    </>
  );
}
