export const getToken = (ctxRequest: Request) =>
  ctxRequest.headers['authorization'];
