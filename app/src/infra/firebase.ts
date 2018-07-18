import * as firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyCM6swVfPD4KzYPqIzcKVhgJAxB6dLfR3A',
  authDomain: 'github-new-trends.firebaseapp.com',
  projectId: 'github-new-trends'
});

export async function initialize(): Promise<void> {
  await firebase.auth().signInAnonymously();
}

export async function getToken(): Promise<string> {
  return await firebase.auth().currentUser.getIdToken();
}

window.onunload = async (): Promise<void> => {
  await firebase.auth().currentUser.delete();
};
