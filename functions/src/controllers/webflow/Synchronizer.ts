/* eslint-disable no-underscore-dangle */
import WFCollectionItemModel from '../../models/WfCollectionItem';
import WfCMS from './CMS';

import { deleteFireStoreCollection } from '../../util/firebase';

export default class WebflowCMSSynchronizer {
  static async syncWithFirebase(siteId: string): Promise<void> {
    const collections = await WfCMS.getAllCollections(siteId);

    const collectionsData = await Promise.all(
      collections.map((collection: { _id: string }) => {
        return WfCMS.getCollectionItems(collection._id);
      }),
    );

    await Promise.all(
      collectionsData.map(async (data, idx) => {
        // Cleans up firestore DB from old items
        await deleteFireStoreCollection(
          `${siteId}-${collections[idx].slug}`,
          100,
        );

        const collectionItems = data as any[];

        await Promise.all(
          collectionItems.map(collectionItem => {
            return WFCollectionItemModel.add({
              collectionSlug: collections[idx].slug,
              data: collectionItem,
              siteId,
            });
          }),
        );
      }),
    );
  }
}
