import React from "react";
import { useFormattedMessages } from "@/checkout-storefront/hooks/useFormattedMessages";
import { ContactSkeleton } from "@/checkout-storefront/sections/Contact";
import { DeliveryMethodsSkeleton } from "@/checkout-storefront/sections/DeliveryMethods";
import { PaymentSectionSkeleton } from "@/checkout-storefront/sections/PaymentSection";
import { Button, Divider } from "@/checkout-storefront/components";
import { AddressSectionSkeleton } from "@/checkout-storefront/sections/Addresses/AddressSectionSkeleton";

export const CheckoutFormSkeleton = () => {
  const formatMessage = useFormattedMessages();

  return (
    <div className="checkout-form-container">
      <div className="checkout-form">
        <ContactSkeleton />
        <Divider />
        <AddressSectionSkeleton />
        <Divider />
        <DeliveryMethodsSkeleton />
        <Divider />
        <PaymentSectionSkeleton />
      </div>
      <Button
        disabled
        ariaLabel={formatMessage("finalizeCheckoutLabel")}
        label={formatMessage("pay")}
        className="pay-button"
      />
    </div>
  );
};
