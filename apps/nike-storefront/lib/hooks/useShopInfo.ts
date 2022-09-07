import { LanguageCodeEnum } from "@saleor-api";
import { useRouter } from "next/router";
import { DEFAULT_CHANNEL, DEFAULT_LOCALE, localeToEnum } from "@/lib/regions";

interface ShopInfo {
  locale: string;
  channel: string;
  domain: string;
  enumedLocale: LanguageCodeEnum;
}

export const useShopInfo = (): ShopInfo => {
  const router = useRouter();
  const locale = router.locale?.toString() || DEFAULT_LOCALE;
  const channel = router.query.channel?.toString() || DEFAULT_CHANNEL.slug;
  const domain = router.query.domain?.toString() || "localhost";
  const enumedLocale = localeToEnum(locale);

  return { channel, domain, locale, enumedLocale };
};
