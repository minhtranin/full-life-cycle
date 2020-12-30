import express from 'express';
import { create, update, destroy, loadDb, list, producer } from '../services/feeds.services';

function modelHandler(modelFunc) {
  return async (req, res, next) => {
    const { redis } = req.app.locals;
    try {
      res.data = await modelFunc({ params: req.body, query: req.query, data: req.data, redis });
      next();
    } catch (e) {
      next(e);
    }
  };
}
export default function (name) {
  return {
    list: express.Router().use(modelHandler(list)),
    create: express.Router().use(modelHandler(create)),
    update: express.Router().use(modelHandler(update)),
    destroy: express.Router().use(modelHandler(destroy)),
    loadDb: express.Router().use(modelHandler(loadDb)),
    producer: express.Router().use(modelHandler(producer)),
  }[name];
}
