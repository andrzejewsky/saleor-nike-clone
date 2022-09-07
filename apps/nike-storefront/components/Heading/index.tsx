import Link from "next/link";
import type { FC } from "react";

interface HeadningProps {
  headline: string;
  description: string;
  href: string;
  linkText: string;
}

export const Heading: FC<HeadningProps> = ({ headline, description, href, linkText }) => {
  return (
    <div className="text-center my-32">
      <h4 className="text-7xl font-extrabold">{headline}</h4>
      <p className="text-lg w-[40%] m-auto mt-4 mb-8">{description}</p>
      <Link href={href}>
        <a className="rounded-full bg-zinc-800 text-slate-100 px-5 py-3">{linkText}</a>
      </Link>
    </div>
  );
};
