"use client";
import { createCommunity } from "@/actions";
import { SubmitButtons } from "@/components/submit-buttons/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, type ReactElement } from "react";
import { useFormState } from "react-dom";

export interface pageProps {}
const initialState = {
  msg: "",
  status: "",
  id: "",
};

export default function Page({}: pageProps): ReactElement {
  const [state, formAction] = useFormState(createCommunity, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.msg,
        variant: "destructive",
      });
    }
    if (state?.status === "success") {
      toast({
        title: "Success",
        description: state?.msg,
        variant: "default",
      });
      redirect(`/r/${state.id}`);
    }
  }, [state, toast]);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <form action={formAction}>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create Community
        </h1>
        <Separator className="my-4" />
        <Label className="text-lg">Name</Label>
        <p className="text-muted-foreground">
          Community names including capitalization cannot be changed!
        </p>
        <div className="relative mt-3">
          <p className=" absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
            r/
          </p>
          <Input name="name" required className="pl-6" min={2} max={21} />
        </div>
        <div className="w-full flex mt-5 gap-x-4 justify-end">
          <Button type="button" variant="destructive" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <SubmitButtons buttonTitle="Create Community" />
        </div>
      </form>
    </div>
  );
}
