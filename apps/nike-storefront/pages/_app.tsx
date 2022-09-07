import "styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import React from "react";
import { RegionsProvider } from "@saleor-components/RegionsProvider";
import { SaleorProviderWithChannels } from "@saleor-components/SaleorProviderWithChannels";
import { CheckoutProvider } from "@saleor-components/CheckoutProvider";
import apolloClient from "@/lib/graphql";
import { DefaultLayout } from "components/layout/Default";
import type { FC } from "react";
import NextNProgress from "nextjs-progressbar";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <CheckoutProvider>
        <RegionsProvider>
          <SaleorProviderWithChannels>
            <DefaultLayout>
              <NextNProgress />
              <Component {...pageProps} />
            </DefaultLayout>
          </SaleorProviderWithChannels>
        </RegionsProvider>
      </CheckoutProvider>
    </ApolloProvider>
  );
};

export default MyApp;
