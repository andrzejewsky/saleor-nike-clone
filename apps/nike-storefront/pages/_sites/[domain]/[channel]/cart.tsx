import { useCart } from "@/lib/hooks/useCart";
import { useCheckout } from "@saleor-components/CheckoutProvider";
import type { NextPage } from "next";
import type { FC } from "react";
import Head from "next/head";
import { FormattedNumber } from "react-intl";
import { CheckoutLine } from "@saleor-api";
import Image from "next/image";
import Link from "next/link";
import { useShopInfo } from "@/lib/hooks/useShopInfo";
import { Clips } from "@/components/Clips";
import { Heading } from "@/components/Heading";

interface SummaryItemProps {
  heading: string;
  price: {
    currency: string;
    amount: number;
  };
}

const SummaryItem: FC<SummaryItemProps> = ({ heading, price }) => {
  return (
    <div className="flex justify-between py-1">
      <div className="text-lg font-light">{heading}</div>
      <div>
        <FormattedNumber style="currency" value={price.amount} currency={price.currency} />
      </div>
    </div>
  );
};

interface LiteItemProps {
  lineItem: CheckoutLine;
}

const LiteItem: FC<LiteItemProps> = ({ lineItem }) => {
  const imageSrc = lineItem.variant.product.thumbnail?.url!;

  return (
    <div className="flex flex-nowrap border-b mb-10">
      <div className="w-48 shrink-0">
        <Image src={imageSrc} layout="responsive" width={150} height={150} alt="" />
      </div>
      <div className="grow py-2">
        <p className="text-lg font-medium">{lineItem.variant.product.name}</p>
        <p className="text-md text-zinc-500 mt-2">{lineItem.variant.name}</p>
      </div>
      <div className="shrink-0 w-32 py-2 text-right">
        <FormattedNumber
          style="currency"
          value={lineItem.totalPrice.gross.amount}
          currency={lineItem.totalPrice.gross.currency}
        />
      </div>
    </div>
  );
};

const ItemsSkeleton = () => {
  return (
    <div className="flex flex-nowrap border-b pb-10 animate-pulse">
      <div className="w-48 bg-slate-100 h-40"></div>
      <div className="grow py-2 pl-2">
        <p className="text-lg font-medium bg-slate-100 w-30 h-4 mb-2"></p>
        <p className="text-md bg-slate-100 mt-2 w-60 h-2"></p>
      </div>
      <div className="shrink-0 w-32 py-2 text-right"></div>
    </div>
  );
};

const SummaryItemSkeleton = () => {
  return (
    <div className="flex justify-between py-1 animate-pulse">
      <div className="bg-slate-100 w-60 h-3"></div>
      <div className="bg-slate-100 w-10 h-3"></div>
    </div>
  );
};

const Cart: NextPage = () => {
  const { locale, channel } = useShopInfo();
  const { checkout } = useCheckout();

  return (
    <>
      <div className="max-w-[1100px] mx-auto mt-10">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="px-16 flex flex-nowrap space-x-10">
          <div className="grow">
            <h2 className="text-2xl">Bag</h2>

            <div>
              {checkout ? (
                checkout?.lines.map((item) => (
                  <LiteItem key={item.id} lineItem={item as CheckoutLine} />
                ))
              ) : (
                <ItemsSkeleton />
              )}
            </div>
          </div>
          <div className="w-80">
            <h2 className="text-2xl mb-10">Summary</h2>

            {checkout ? (
              <>
                <SummaryItem heading="Subtotal" price={checkout?.subtotalPrice.net!} />
                <SummaryItem heading="Delivery" price={checkout?.shippingPrice.gross!} />
                <SummaryItem heading="Tax" price={checkout?.subtotalPrice.tax!} />
              </>
            ) : (
              <>
                <SummaryItemSkeleton />
                <SummaryItemSkeleton />
                <SummaryItemSkeleton />
              </>
            )}

            <div className="border-t border-b py-2 mt-4">
              {checkout ? (
                <SummaryItem heading="Total" price={checkout?.totalPrice.gross!} />
              ) : (
                <SummaryItemSkeleton />
              )}
            </div>

            <Link href={`/checkout/?checkout=${checkout?.id}&locale=${locale}&channel=${channel}`}>
              <a className="rounded-full bg-zinc-800 text-zinc-100 text-xl font-normal py-4 w-full mt-14 block text-center">
                Checkout
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-96">
        <div className="px-16">
          <Clips />
          <Heading
            headline="BY CHANGING NOTHING, SHE CHANGED EVERYTHING"
            description="Serena???s never been defined by just one thing. And only the Queen could inspire us to
                rally and rejoice at every deuce, design and dare-to-be-more moment. It began on the
                court and lives on with a new era of statement-makers."
            href="/"
            linkText="Explore the Collection"
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
