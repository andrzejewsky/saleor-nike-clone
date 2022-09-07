import type { FC, PropsWithChildren } from "react";
import { Navigation } from "components/Navigation";
import { TopBar } from "components/TopBar";
import Link from "next/link";

const FOOTER_DATA = [
  {
    header: "Some header",
    items: [
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
    ],
  },
  {
    header: "Some header",
    items: [
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
    ],
  },
  {
    header: "Some header",
    items: [
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
    ],
  },
  {
    header: "Some header",
    items: [
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
      { link: "/", text: "some link" },
    ],
  },
];

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <TopBar />
        <Navigation />
      </header>
      <main>{children}</main>
      <footer className="px-16 mt-24 py-16">
        <div className="flex flex-nowrap justify-center">
          {FOOTER_DATA.map((col, i) => (
            <div className="flex flex-col px-16" key={i}>
              <div className="text-lg font-medium pb-4">{col.header}</div>
              {col.items.map((row, j) => (
                <Link href={row.link} key={j}>
                  <a className="text-md py-1 text-gray-400 font-normal">{row.text}</a>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};
