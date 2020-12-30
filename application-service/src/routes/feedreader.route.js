import { Router } from 'express';

import FeedsController from '../controllers/feeds.controller';
const router = Router({ mergeParams: true });
/**
 * @description
 * @author MinhTran
 */

router.get('/', FeedsController('list'));
router.post('/', FeedsController('create'));
router.get('/loadDb',FeedsController('loadDb'));
router.put('/', FeedsController('update'))
router.delete('/', FeedsController('destroy'));
router.get('/producer', FeedsController('producer'));
// router.post('/')
// router.put('/')
export default router;
