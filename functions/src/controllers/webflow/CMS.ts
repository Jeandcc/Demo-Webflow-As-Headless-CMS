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

  // This currently only supports 100 items for each collection list.
  // We need to allow this to fetch more items, and also to start
  // taking into consideration API rate limits.
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
