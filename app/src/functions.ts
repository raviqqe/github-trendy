import { Request, Response } from "express";
import { https } from "firebase-functions";
import { createBundleRenderer } from "vue-server-renderer";

const cors = require("cors");
const express = require("express");

const app = express();
const renderer = createBundleRenderer(
  "../dist/server/vue-ssr-server-bundle.json"
);

app.use(cors());
app.get(
  "*",
  async (_: Request, response: Response): Promise<void> =>
    response.end(await renderer.renderToString())
);

export const functions = https.onRequest(app);
