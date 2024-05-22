"use client";
import { updateCommunityDescription } from "@/actions/community/update-community-description";
import { SaveButton } from "@/components/submit-buttons/SubmitButtons";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, type ReactElement } from "react";
import { useFormState } from "react-dom";

export interface SubDescriptionFormProps {
  id: string;
  description?: string;
}
const initialState = {
  status: "",
  msg: "",
};

export function SubDescriptionForm({
  id,
  description,
}: SubDescriptionFormProps): ReactElement {
  const [{ status, msg }, formAction] = useFormState(
    updateCommunityDescription,
    initialState
  );
  const { toast } = useToast();

  useEffect(() => {
    if (status === "error") {
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } else if (status === "success") {
      toast({
        title: "Success",
        description: msg,
      });
    }
  }, [status, toast, msg]);

  return (
    <form className="mt-3" action={formAction}>
      <input type="hidden" name="communityId" value={id} />
      <Textarea
        placeholder="Create your custom description"
        minLength={5}
        maxLength={100}
        name="description"
        required
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  );
}
