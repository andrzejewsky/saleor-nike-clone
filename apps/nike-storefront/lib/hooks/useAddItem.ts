import { useCheckoutAddProductLineMutation, useCreateCheckoutMutation } from "@saleor-api";
import { useCheckout } from "@saleor-components/CheckoutProvider";
import { useShopInfo } from "./useShopInfo";

export const useAddItem = () => {
  const { enumedLocale, channel } = useShopInfo();
  const { checkoutToken, setCheckoutToken, checkout } = useCheckout();

  const [createCheckout, createCheckoutState] = useCreateCheckoutMutation();
  const [addLineItem, addLineItemState] = useCheckoutAddProductLineMutation();
  const loading = createCheckoutState.loading || addLineItemState.loading;

  const add = async (variantId: string) => {
    if (loading) return;

    if (checkout) {
      addLineItem({
        variables: {
          checkoutToken,
          variantId,
          locale: enumedLocale,
        },
      });

      return;
    }

    const checkoutResponse = await createCheckout({
      variables: {
        channel,
        lines: [{ quantity: 1, variantId }],
      },
    });

    const newCheckoutToken = checkoutResponse.data?.checkoutCreate?.checkout?.token;

    if (newCheckoutToken) {
      setCheckoutToken(newCheckoutToken);
    }
  };

  return {
    addLineItem: add,
    loading,
  };
};
