"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // const redis = Redis({
//     port: config.redisPort,
//     host: config.redisHost,
//     password: config.redisPass
// });
// redis.on('error', (error) => {
//     console.error(error.message, error);
//     process.exit(1);
// });
// app.locals.redis = redis;

var stringbuilder = '';
process.argv.slice(2).map(function (e) {
  stringbuilder += e;
});
var url = stringbuilder.trim().split(',');
app.locals.url = url;
console.log(url);
app.use(_bodyParser["default"].urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev', {
  skip: function skip(req, res) {
    return req.originalUrl === '/healthz' && res.statusCode === 200;
  }
}));

if (app.get('env') === 'development') {
  app.use((0, _errorhandler["default"])());
}

app.use('/', _routes["default"]);
app.use(function (_, res) {
  return res.send(res.data);
});
app.listen(_config["default"].port, function () {
  console.log('Express server listening on %d, in %s mode', _config["default"].port, app.get('env'));
});
var _default = app;
/**
 * @author Minhtran
 */

exports["default"] = _default;