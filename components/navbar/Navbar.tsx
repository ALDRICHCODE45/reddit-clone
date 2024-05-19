import Link from "next/link";
import RedditText from "../../public/logo-name.svg";
import RedditMobile from "../../public/reddit-full.svg";
import { type ReactElement } from "react";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { Button } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropDown } from "../userDropDown/UserDropDown";

export interface NavbarProps {}

export async function Navbar({}: NavbarProps): Promise<ReactElement> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
      <Link href="/" className="flex items-center gap-x-3">
        <Image
          src={RedditMobile}
          alt="reddit mobile icon"
          className="h-10 w-fit"
        />
        <Image
          src={RedditText}
          alt="Reddit Desktop"
          className="h-9 w-fit hidden lg:block"
        />
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user ? (
          <UserDropDown image={user.picture ?? undefined} />
        ) : (
          <div className="flex items-center gap-x-3">
            <Button variant="secondary" asChild>
              <RegisterLink>Sign up</RegisterLink>
            </Button>
            <Button asChild>
              <LoginLink>Log in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
