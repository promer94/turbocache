import { useState } from "react";
import { isServer } from "../lib/env";

export const useGuideUrl = () => {
  const [config] = useState(() => {
    if (isServer) {
      return {
        url: process.env.NEXTAUTH_URL,
        api: `${process.env.NEXTAUTH_URL}/api`,
      };
    }
    const port = location.port !== "" ? `:${location.port}` : location.port;
    const url = `${location.protocol}//${location.hostname}${port}`;
    const api = `${url}/api`;
    return {
      url,
      api
    }
  });
  return config;
};
