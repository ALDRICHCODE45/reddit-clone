"use client";
import { changeUserName } from "@/actions/user/change-username.action";
import { SubmitButtons } from "@/components/submit-buttons/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, type ReactElement } from "react";
import { useFormState } from "react-dom";

export interface SettingsFormProps {
  userName: string | null | undefined;
}
const initialState = {
  msg: "",
  status: "",
};

export function SettingsForm({ userName }: SettingsFormProps): ReactElement {
  const [state, formAction] = useFormState(changeUserName, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.msg,
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.msg,
        variant: "destructive",
      });
    } else if (state.status === "current") {
      toast({
        title: "Error",
        description: state.msg,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        In this page you can change your username!
      </p>
      <Input
        defaultValue={userName ?? undefined}
        name="username"
        required
        className="mt-2 "
        min={2}
        maxLength={21}
      />
      <div className="w-full flex mt-5 gap-x-3 justify-end">
        <Button variant="destructive" type="button" asChild>
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButtons buttonTitle="Change Username" />
      </div>
    </form>
  );
}
