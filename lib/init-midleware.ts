import { NextApiRequest, NextApiResponse } from 'next';

// Initialize middleware
const initMiddleware = (middleware: unknown) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export default initMiddleware;
