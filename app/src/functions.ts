import { Request, Response } from "express";
import { https } from "firebase-functions";
import { createBundleRenderer } from "vue-server-renderer";

import clientManifest from "../dist/client/vue-ssr-client-manifest.json";
import bundle from "../dist/server/vue-ssr-server-bundle.json";

const cors = require("cors");
const express = require("express");

const app = express();
const renderer = createBundleRenderer(bundle, {
  clientManifest,
  template: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>GitHub Trendy</title>
      </head>
      <body>
        <!--vue-ssr-outlet-->
      </body>
    </html>
  `
});

app.use(cors());
app.get(
  "/",
  async (_: Request, response: Response): Promise<void> =>
    response.end(await renderer.renderToString())
);

export const ssr = https.onRequest(app);
