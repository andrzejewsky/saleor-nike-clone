import Link from "next/link";
import { useMainMenuQuery } from "@saleor-api";
import { useRegions } from "@saleor-components/RegionsProvider";
import { NavButton } from "components/NavButton";
import { useCheckout } from "@saleor-components/CheckoutProvider";
import Image from "next/image";

const Menu = () => {
  const { query } = useRegions();
  const { data, loading } = useMainMenuQuery({
    variables: { ...query },
  });

  if (loading) {
    return (
      <ul className="flex animate-pulse">
        <li className="mx-3 w-40 h-3 bg-slate-100"></li>
        <li className="mx-3 w-40 h-3 bg-slate-100"></li>
        <li className="mx-3 w-40 h-3 bg-slate-100"></li>
      </ul>
    );
  }

  return (
    <ul className="flex">
      {data?.menu?.items?.map(({ id, category, name }) => {
        if (!category) return null;

        return (
          <li className="px-3 text-lg font-semibold" key={id}>
            <Link href={"/category/" + category.slug}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export const Navigation = () => {
  const { checkout } = useCheckout();

  return (
    <div className="flex justify-between flex-nowrap py-4 px-16">
      <Link href="/">
        <a>
          <Image src="/logo.png" width={100} height={30} />
        </a>
      </Link>
      <Menu />
      <div>
        <Link href="/cart">
          <a>
            <NavButton icon="bag" counter={checkout?.lines.length} />
          </a>
        </Link>
      </div>
    </div>
  );
};
