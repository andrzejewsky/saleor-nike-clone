import { ProductCountableEdge, ProductVariant } from "@saleor-api";
import { FC } from "react";
import { FormattedNumber } from "react-intl";

interface ProductPriceProps {
  product: ProductCountableEdge;
}

export const ProductPrice: FC<ProductPriceProps> = ({ product }) => {
  const {
    node: { pricing },
  } = product;

  if (!pricing || !pricing.priceRange) return null;

  const { start } = pricing.priceRange;

  if (!start) return null;

  return (
    <div className="text-md font-normal">
      from{" "}
      <FormattedNumber
        style="currency"
        value={start.gross.amount}
        currency={start.gross.currency}
      />
    </div>
  );
};

interface VariantPriceProps {
  variant: ProductVariant;
}

export const VariantPrice: FC<VariantPriceProps> = ({ variant }) => {
  const { pricing } = variant;

  if (!pricing || !pricing.price) return null;

  const { gross } = pricing.price;

  return (
    <div className="text-md font-normal">
      <FormattedNumber style="currency" value={gross.amount} currency={gross.currency} />
    </div>
  );
};
