import Link from "next/link";

export const TopBar = () => (
  <div className="bg-gray-100 px-16 py-2 flex justify-between text-sm">
    <div>logo1</div>
    <ul className="flex">
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
