import { NextFunction, Request, Response } from 'express';

import { storage } from './firebase';

interface IResponseData {
  body: any;
  headers: { [key: string]: string | number | string[] };
  statusCode: number;
}

export default async (
  { method, originalUrl }: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  if (method !== 'GET') {
    await next();
    return;
  }

  const data = await storage.get(originalUrl);

  if (data) {
    console.log('Responding with cache:', data);

    const { body, headers, statusCode }: IResponseData = data;

    response.status(statusCode);
    response.set(headers);
    response.send(body);

    return;
  }

  const write = response.write;

  response.write = function(
    body: any,
    encoding?: string | Function,
    callback?: Function
  ): boolean {
    console.log('Updating cache:', originalUrl, body);

    const data: IResponseData = {
      body,
      headers: this.getHeaders(),
      statusCode: this.statusCode
    };

    storage.set(originalUrl, data);

    return write.apply(this, [body, encoding, callback]);
  };

  await next();
};
