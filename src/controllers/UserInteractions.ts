import firebase from 'firebase';

import UserInteractionsModel from '../models/UserInteractions';
import { FireAuth } from '../services/firebase';

interface IBasicInteractionReq {
  targetId: string;
}

export default class UserInteractionsController {
  static async setLikeValue(
    req: IBasicInteractionReq & { value: 1 | 0 | -1 },
  ): Promise<void> {
    if (!FireAuth.currentUser) throw new Error('Missing authentication');

    const { arrayRemove, arrayUnion } = firebase.firestore.FieldValue;

    const userId = FireAuth.currentUser.uid;

    const updatePayload = {
      likes: arrayRemove(userId),
      dislikes: arrayRemove(userId),
    };

    switch (req.value) {
      case -1:
        updatePayload.dislikes = arrayUnion(userId);
        break;

      case 1:
        updatePayload.likes = arrayUnion(userId);
        break;

      default:
        break;
    }

    await UserInteractionsModel.collectionRef
      .doc(req.targetId)
      .set(updatePayload, {
        merge: true,
      });
  }

  static async addComment(
    req: IBasicInteractionReq & { comment: string },
  ): Promise<void> {
    if (!FireAuth.currentUser) throw new Error('Missing authentication');

    await UserInteractionsModel.collectionRef.doc(req.targetId).set(
      {
        messages: firebase.firestore.FieldValue.arrayUnion({
          user: {
            name: FireAuth.currentUser.displayName,
            id: FireAuth.currentUser.uid,
          },
          createdAt: Date.now(),
          text: req.comment,
        }),
      },
      { merge: true },
    );
  }
}
