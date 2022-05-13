import { NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { LoggerRequest } from "./log";
import { TurboObjectStorage } from "../lib/storage";
import { CacheRequst } from './turbo-cache';

export interface StorageRequest extends LoggerRequest, CacheRequst {
  storage: TurboObjectStorage;
}
export const storageMiddleware: (
  storage: TurboObjectStorage
) => Middleware<StorageRequest, NextApiResponse> =
  (storage) => async (req, _, next) => {
    req.storage = storage;
    next()
  };
