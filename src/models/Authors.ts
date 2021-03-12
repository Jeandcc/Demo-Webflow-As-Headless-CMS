import { FireDB } from '../services/firebase';

export default class AuthorsModel {
  public static collectionRef = FireDB.collection(
    `${document.documentElement.getAttribute('data-wf-site')}-author`,
  );
}
