import * as firebase from "firebase/app";
import "firebase/auth";

import configuration from "../configuration.json";

firebase.initializeApp(configuration.firebase);

export async function initialize(): Promise<void> {
  await firebase.auth().signInAnonymously();
}

export async function getToken(): Promise<string> {
  return await firebase.auth().currentUser.getIdToken();
}

window.onunload = async (): Promise<void> => {
  await firebase.auth().currentUser.delete();
};
