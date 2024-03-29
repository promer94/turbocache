import { useState } from "react";
import { isServer } from "../lib/env";

export const useGuideUrl = ({ host }: { host: string }) => {
  const [config] = useState(() => {
    if (isServer) {
      return {
        url: host,
        api: `${host}/api`,
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
