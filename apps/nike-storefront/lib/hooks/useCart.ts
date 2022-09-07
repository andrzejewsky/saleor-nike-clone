import { useCheckout } from "@saleor-components/CheckoutProvider";

export const useCart = () => {
  const { checkout } = useCheckout();
  console.log(checkout);
};
