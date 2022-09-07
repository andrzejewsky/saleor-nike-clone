import Image from "next/image";
import Link from "next/link";

export const TopBar = () => (
  <div className="bg-gray-100 px-16 py-2 flex justify-between text-sm">
    <div className="flex flex-nowrap space-x-2 items-center">
      <div>
        <Image src="/top-logo.png" width={30} height={30} />
      </div>
      <div>
        <Image src="/top-logo2.png" width={30} height={30} />
      </div>
    </div>
    <ul className="flex items-center">
      <li>
        <Link href="/">
          <a className="border-slate-400 border-r-2 pr-3">Help</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a className="border-slate-400 border-r-2 px-3">Join Us</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a className="border-slate-400 pl-3">Sign in</a>
        </Link>
      </li>
    </ul>
  </div>
);
