import { error } from 'firebase-functions/lib/logger';

import { wfApi } from '../../services/axios';

export default class WfCMS {
  static async getAllCollections(siteId: string): Promise<any> {
    try {
      const res = await wfApi.get(`/sites/${siteId}/collections`);
      return res.data;
    } catch (e) {
      error(e.response);
    }

    return [];
  }

  static async getCollectionItems(collectionId: string): Promise<any> {
    try {
      const res = await wfApi.get(`/collections/${collectionId}/items`);
      return res.data.items;
    } catch (e) {
      error(e.response);
    }

    return [];
  }
}
