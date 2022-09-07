import Link from "next/link";
import { useMainMenuQuery } from "@saleor-api";
import { useRegions } from "@saleor-components/RegionsProvider";
import { NavButton } from "components/NavButton";

const Menu = () => {
  const { query } = useRegions();
  const { data, loading } = useMainMenuQuery({
    variables: { ...query },
  });

  if (loading) {
    return <div>skeleton</div>;
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
  return (
    <div className="flex justify-between flex-nowrap py-4 px-16">
      <Link href="/">logo</Link>
      <Menu />
      <div>
        <Link href="/cart">
          <a>
            <NavButton icon="bag" />
          </a>
        </Link>
      </div>
    </div>
  );
};
