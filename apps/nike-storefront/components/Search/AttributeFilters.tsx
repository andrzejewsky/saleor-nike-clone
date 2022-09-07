import type { FC, ChangeEventHandler } from "react";
import type { Attribute, AttributeValue, FilteringAttributesQuery } from "@saleor-api";
import { useFilterState } from "./useFilterState";
import { useRouter } from "next/router";

interface AttributeFiltersProps {
  attributes: FilteringAttributesQuery["attributes"];
}

interface FilterItemProps {
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler;
}

const FilterItem: FC<FilterItemProps> = ({ name, checked, onChange }) => {
  return (
    <label htmlFor={name} className="flex items-start space-x-1">
      <input
        type="checkbox"
        id={name}
        name={name}
        className="w-5 h-5 accent-gray-800 shrink-0"
        checked={checked}
        onChange={onChange}
      />
      <div className="leading-5">{name}</div>
    </label>
  );
};

export const AttributeFiltersSkeleton = () => {
  const filters = Array.from(Array(4).keys());
  const values = Array.from(Array(5).keys());

  return (
    <div className="animate-pulse mt-5">
      {filters.map((i) => (
        <div key={i}>
          <h3 className="mb-3 mt-5 rounded h-4 w-30 bg-slate-100"></h3>
          <ul className="border-b-2 pb-5">
            {values.map((j) => (
              <li key={j} className="rounded h-3 w-28 bg-slate-100 my-1"></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export const AttributeFilters: FC<AttributeFiltersProps> = ({ attributes }) => {
  const router = useRouter();
  const { toggleFilter, isChecked, filter } = useFilterState();

  if (!attributes) return null;

  const handleChange = (attribute: Attribute, value: AttributeValue) => {
    if (!filter) {
      router.push(`/search/${router.query.slug}?filter=${attribute.slug!}.${value.slug!}`);
      return;
    }

    toggleFilter(attribute.slug!, value.slug!);
  };

  return (
    <div>
      {attributes.edges.map((attr) => (
        <div key={attr.node.id}>
          <h3 className="font-bold pb-3 pt-5">{attr.node.name}</h3>
          <ul className="border-b-2 pb-5">
            {attr.node.choices?.edges.map((choice) => (
              <li key={choice.node.id} className="py-1">
                <FilterItem
                  name={choice.node.name!}
                  checked={isChecked(attr.node.slug!, choice.node.slug!)}
                  onChange={() =>
                    handleChange(attr.node as Attribute, choice.node as AttributeValue)
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
