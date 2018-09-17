import * as admin from "firebase-admin";
import { config, https } from "firebase-functions";

import Languages from "./languages";

admin.initializeApp(config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

export const languages = new Languages();

export function httpsFunction(handler) {
  return https.onRequest(handler);
}
