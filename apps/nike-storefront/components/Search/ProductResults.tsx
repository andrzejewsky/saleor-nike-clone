import type { FC } from "react";
import type { ProductCollectionQuery, ProductCountableEdge } from "@saleor-api";
import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "components/ProductPrice";

interface ProductResultsProps {
  products: ProductCollectionQuery["products"];
}

export const ProductResultsSkeleton = () => {
  const products = Array.from(Array(15).keys());

  return (
    <div className="flex flex-wrap animate-pulse">
      {products.map((i) => (
        <div key={i} className="w-1/4 p-4">
          <div className="w-full h-60 bg-slate-100"></div>
          <h4 className="bg-slate-100 w-28 h-3 my-2"></h4>
          <div className="bg-slate-100 w-20 h-2"></div>
        </div>
      ))}
    </div>
  );
};

export const ProductResults: FC<ProductResultsProps> = ({ products }) => {
  if (!products) return null;

  return (
    <div className="flex flex-wrap">
      {products.edges.map((product) => (
        <Link key={product.node.id} href={`/product/${product.node.slug}`}>
          <a className="w-1/4 p-4">
            <Image
              src={product.node.thumbnail?.url!}
              layout="responsive"
              width={400}
              height={400}
              alt=""
            />
            <h4 className="text-lg font-medium">{product.node.name}</h4>
            <div className="text-md font-normal">
              <ProductPrice product={product as ProductCountableEdge} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
