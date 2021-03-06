import NextAuthHandler from '../../../lib/next-auth';
import { defaultApiHandler } from '../../../service/handler';

const nextAuth = defaultApiHandler().all((req, res) =>
  NextAuthHandler(req, res)
);

export default nextAuth;
