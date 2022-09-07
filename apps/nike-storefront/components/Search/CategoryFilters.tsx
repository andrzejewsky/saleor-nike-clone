import Link from "next/link";
import type { FC } from "react";
import type { CategoryBySlugQuery } from "@saleor-api";

interface CategoryFiltersProps {
  category: CategoryBySlugQuery["category"];
}

export const CategoryFiltersSkeleton = () => {
  const categories = Array.from(Array(7).keys());

  return (
    <ul className="animate-pulse border-b-2 pb-10">
      {categories.map((i) => (
        <li key={i} className="my-2 w-28 h-3 bg-slate-100"></li>
      ))}
    </ul>
  );
};

export const CategoryFilters: FC<CategoryFiltersProps> = ({ category }) => {
  if (!category) return null;

  return (
    <ul className="border-b-2 pb-10">
      {category.children?.edges.map(({ node }) => (
        <li key={node.id} className="font-semibold py-1">
          <Link href={`/category/${node.slug}`}>
            <a>{node.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
