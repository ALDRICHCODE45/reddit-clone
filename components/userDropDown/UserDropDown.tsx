import { type ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import DefaultUser from "../../public/default-user.png";
import Image from "next/image";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export interface UserDropDownProps {
  image?: string;
}

export function UserDropDown({ image }: UserDropDownProps): ReactElement {
  const imageToShow = image ? image : DefaultUser;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-6" />
          <Image
            className="rounded-full h-8 w-8 hidden lg:block"
            src={imageToShow}
            alt="default user"
            width={750}
            height={750}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <Link className="w-full" href="/r/create">
            Create Community
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            href="/r/d9a6a68e-e4fb-4e8d-8dbb-25510084e34e/create"
          >
            Create Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
