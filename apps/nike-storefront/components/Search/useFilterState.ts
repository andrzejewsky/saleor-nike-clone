import { AttributeInput } from "@saleor-api";
import { useQueryState } from "next-usequerystate";

export const useFilterState = () => {
  const [filter, setFilter] = useQueryState<AttributeInput[]>("filter", {
    parse: (query: string) => {
      if (!query) return null;

      return query.split(";").map((chunk) => {
        const [slug, ...values] = chunk.split(".");

        return { slug, values };
      });
    },
    serialize: (value) => {
      return value.reduce((p, c) => {
        const delimiter = p ? ";" : "";
        return p + `${delimiter}${c.slug}.${c.values?.join(".")}`;
      }, "");
    },
  });

  const toggleFilter = (slug: string, value: string) => {
    setFilter((oldFilter) => {
      const currentFilter = oldFilter ?? [];

      const hasSlug = currentFilter.some((el) => el.slug === slug);

      if (!hasSlug) {
        return currentFilter.concat([{ slug, values: [value] }]);
      }

      return currentFilter
        .map((el) => {
          if (el.slug === slug && el.values) {
            const currentLength = el.values.length;
            el.values = el.values.filter((v) => v != value);

            if (currentLength === el.values.length) {
              el.values = el.values.concat([value]);
            }
          }

          return el;
        })
        .filter((f) => f.values?.length);
    });
  };

  const isChecked = (slug: string, value: string) => {
    if (!filter) return false;

    return filter.some((el) => el.slug === slug && el.values?.includes(value));
  };

  return { filter, setFilter, toggleFilter, isChecked };
};
