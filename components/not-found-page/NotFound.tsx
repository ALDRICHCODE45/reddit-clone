import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";

export interface PageNotFoundProps {}

export function PageNotFound({}: PageNotFoundProps): ReactElement {
  return (
    <div className="flex  flex-col-reverse  w-screen h-[500px] items-center  ">
      <div className="text-center ">
        <h2 className="antialiased text-9xl">404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light ">
          <span>puedes regresar al </span>
          <Link href="/" className="font-normal hover:underline transition-all">
            Inicio
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5 ">
        <Image
          src="/hero-image.png"
          alt="Starman"
          className=""
          width={75}
          height={75}
        />
      </div>
    </div>
  );
}
