/* eslint-disable no-underscore-dangle */
import { fireStore } from '../services/envVars';

interface IAddItemReq {
  collectionSlug: string;
  siteId: string;
  data: any;
}

export default class WFCollectionItemModel {
  static async add(req: IAddItemReq): Promise<FirebaseFirestore.WriteResult> {
    const res = await fireStore
      .collection(`${req.siteId}-${req.collectionSlug}`)
      .doc(req.data._id)
      .set(req.data);

    return res;
  }
}
