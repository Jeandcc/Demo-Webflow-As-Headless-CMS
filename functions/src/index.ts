import * as functions from 'firebase-functions';
import { error } from 'firebase-functions/lib/logger';

import * as yup from 'yup';

import SitePublications from './models/SitePublications';

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

    await SitePublications.add({
      siteId: site,
      date: publishTime,
    });

    res.status(201).json({ message: 'Site publication registered' });
  },
);
