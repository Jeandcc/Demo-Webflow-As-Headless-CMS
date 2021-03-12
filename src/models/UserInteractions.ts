import { FireDB } from '../services/firebase';

export interface IInteractionsWithAuthor {
  messages?: any[];
  likes?: string[];
  dislikes?: string[];
}

export default class UserInteractionsModel {
  public static collectionRef = FireDB.collection(
    `${document.documentElement.getAttribute(
      'data-wf-site',
    )}-user-interactions`,
  );
}
