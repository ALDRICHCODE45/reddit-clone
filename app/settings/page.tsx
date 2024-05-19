import { getUserInformation } from "@/actions/user/get-user-information";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { type ReactElement } from "react";
import { SettingsForm } from "./ui/SettingsForm";
import { User } from "@/interfaces";

export interface pageProps {}

export default async function page({}: pageProps): Promise<ReactElement> {
  const { getUser } = getKindeServerSession();
  const Kindeuser = await getUser();
  if (!Kindeuser || !Kindeuser.id) return redirect("/");

  const { user, ok } = await getUserInformation(Kindeuser!.id);
  if (!ok) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4">
      <SettingsForm userName={user?.userName} />
    </div>
  );
}
