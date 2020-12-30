import express from 'express';
import feeds from './feedreader.route';
const router = express.Router();

router.use('/', feeds);

router.use((err, req, res, next) => {
    //console.log('error internal server error',err);
    // if(err) next({
    //   message: err,
    //   status: 500,
    //   data: []
    // });
    next(err);
  });
  
export default router;