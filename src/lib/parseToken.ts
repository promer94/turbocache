export const parseToken = (token: string | undefined) =>
  token ? token.replace("Bearer ", "") : "";
