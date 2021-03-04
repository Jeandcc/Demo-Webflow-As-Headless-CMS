/* eslint-disable dot-notation */
import * as functions from 'firebase-functions';
import { error } from 'firebase-functions/lib/logger';

import * as yup from 'yup';
import WebflowCMSSynchronizer from './controllers/webflow/Synchronizer';

import SitePublicationModel from './models/SitePublications';

// https://us-central1-headless-webflow-cms.cloudfunctions.net/sitePublishWebhook
export const sitePublishWebhook = functions.https.onRequest(
  async (req, res) => {
    const payloadShape = yup.object().shape({
      site: yup.string().required(),
      publishTime: yup.number().required().positive().integer(),
    });

    try {
      await payloadShape.validate(req.body);
    } catch (e) {
      error(e);
      res.status(400).json({ error: e.errors.join(', ') });
      return;
    }

    const { publishTime, site } = req.body;

    await Promise.all([
      SitePublicationModel.add({
        siteId: site,
        date: publishTime,
      }),

      WebflowCMSSynchronizer.syncWithFirebase(site),
    ]);

    res.status(201).json({ message: 'Site publication registered' });
  },
);
