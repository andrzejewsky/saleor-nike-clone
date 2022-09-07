import type { ParsedUrlQuery } from "querystring";
import type { GetStaticPropsContext } from "next";

export interface ChannelContext extends ParsedUrlQuery {
  channel: string;
  domain: string;
}

export const getChannelFromStaticContext = (context: GetStaticPropsContext<ChannelContext>) => {
  return context.params?.channel || "default-channel";
};
