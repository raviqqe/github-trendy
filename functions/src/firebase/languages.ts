import * as admin from "firebase-admin";

import Repositories from "./repositories";

export default class {
  private collection = admin.firestore().collection("languages");

  public repositories(language?: string): Repositories {
    return new Repositories(
      this.collection.doc(language || "default").collection("repositories")
    );
  }
}
