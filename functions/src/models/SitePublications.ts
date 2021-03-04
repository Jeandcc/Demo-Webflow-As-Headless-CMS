import { fireStore } from '../services/envVars';

interface ISitePublication {
  siteId: string;
  date: number;
}

export default class SitePublicationModel {
  static collectionName = 'sitePublications';

  static async add(
    data: ISitePublication,
  ): Promise<FirebaseFirestore.DocumentReference> {
    const res = await fireStore.collection(this.collectionName).add(data);
    return res;
  }
}
