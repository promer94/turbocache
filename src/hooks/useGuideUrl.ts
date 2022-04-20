import { useEffect, useState } from "react";

export const useGuideUrl = () => {
  const [config, setConfig] = useState({ url: "", api: "" });
  useEffect(() => {
    const port = location.port !== "" ? `:${location.port}` : location.port;
    const url = `${location.protocol}//${location.hostname}${port}`;
    const api = `${url}/api`;
    setConfig({ url, api });
  }, []);
  return config;
};
