import { createClient, Provider as UrqlProvider, ClientOptions } from "urql";
import { ErrorBoundary } from "react-error-boundary";
import { I18nProvider } from "@react-aria/i18n";
import { createFetch, createSaleorClient, SaleorProvider } from "@saleor/sdk";

import { Checkout, CheckoutSkeleton } from "@/checkout-storefront/views/Checkout";
import { getCurrentRegion } from "@/checkout-storefront/lib/regions";
import { getQueryVariables } from "@/checkout-storefront/lib/utils";
import { AppConfigProvider } from "@/checkout-storefront/providers/AppConfigProvider";
import {
  OrderConfirmation,
  OrderConfirmationSkeleton,
} from "@/checkout-storefront/views/OrderConfirmation";
import { PageNotFound } from "@/checkout-storefront/views/PageNotFound";
import { ToastContainer } from "react-toastify";
import { alertsContainerProps } from "../hooks/useAlerts/consts";
import { Suspense, useMemo } from "react";
import { AppEnv } from "@/checkout-storefront/providers/AppConfigProvider/types";

export interface RootProps {
  env: AppEnv;
}

export const Root = ({ env }: RootProps) => {
  const orderId = getQueryVariables().orderId;

  const authorizedFetch = useMemo(() => createFetch(), []);

  const client = useMemo(
    () =>
      createClient({
        url: env.apiUrl,
        suspense: true,
        requestPolicy: "cache-first",
        fetch: authorizedFetch as ClientOptions["fetch"],
      }),
    []
  );

  // temporarily need to use @apollo/client because saleor sdk
  // is based on apollo. to be changed
  const saleorClient = useMemo(
    () =>
      createSaleorClient({
        apiUrl: env.apiUrl,
        channel: "default-channel",
      }),
    []
  );

  return (
    // @ts-ignore React 17 <-> 18 type mismatch
    <SaleorProvider client={saleorClient}>
      <I18nProvider locale={getCurrentRegion()}>
        <UrqlProvider value={client}>
          <AppConfigProvider env={env}>
            <div className="app">
              <ToastContainer {...alertsContainerProps} />
              <ErrorBoundary FallbackComponent={PageNotFound}>
                {orderId ? (
                  <Suspense fallback={<OrderConfirmationSkeleton />}>
                    <OrderConfirmation orderId={orderId} />
                  </Suspense>
                ) : (
                  <Suspense fallback={<CheckoutSkeleton />}>
                    <Checkout />
                  </Suspense>
                )}
              </ErrorBoundary>
            </div>
          </AppConfigProvider>
        </UrqlProvider>
      </I18nProvider>
    </SaleorProvider>
  );
};
