import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface ClipProps {
  image: string;
  href: string;
  text: string;
}

const Clip: FC<ClipProps> = ({ image, href, text }) => {
  return (
    <div className="w-1/2 relative">
      <Image src={image} width={500} height={600} layout="responsive" alt="" />
      <div className="absolute left-16 bottom-16">
        <p className="text-3xl font-medium mb-8">{text}</p>
        <Link href={href}>
          <a className="rounded-full bg-zinc-800 text-zinc-100 font-normal px-6 py-3">Shop</a>
        </Link>
      </div>
    </div>
  );
};

export const Clips = () => {
  return (
    <div className="flex flex-nowrap px-16 space-x-2 my-10">
      <Clip image="/clip2.jpg" text="Pushing boundaries" href="/" />
      <Clip image="/clip1.jpg" text="New arrivals" href="/" />
    </div>
  );
};
