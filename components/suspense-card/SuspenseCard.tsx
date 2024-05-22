import { type ReactElement } from "react";
import { Skeleton } from "../ui/skeleton";

export interface SuspenseCardProps {}

export function SuspenseCard({}: SuspenseCardProps): ReactElement {
  return (
    <>
      <Skeleton className="w-full h-[400px]" />{" "}
      <Skeleton className="w-full h-[400px]" />{" "}
      <Skeleton className="w-full h-[400px]" />{" "}
      <Skeleton className="w-full h-[400px]" />{" "}
      <Skeleton className="w-full h-[400px]" />{" "}
      <Skeleton className="w-full h-[400px]" />{" "}
    </>
  );
}
