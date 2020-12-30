"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _feedreader = _interopRequireDefault(require("./feedreader.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/', _feedreader["default"]);
router.use(function (err, req, res, next) {
  console.log('error internal server error', err);
  console.log('zoooo day');
  next(err);
});
var _default = router;
exports["default"] = _default;