"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _axios = _interopRequireDefault(require("axios"));

var _xml2js = _interopRequireDefault(require("xml2js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
    var params, query, data, url1, url2, url3, url4, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = payload.params, query = payload.query, data = payload.data;
            console.log('-----');
            url1 = 'https://feedforall.com/sample-feed.xml';
            url2 = 'https://feedforall.com/sample.xml';
            url3 = 'http://feeds.washingtonpost.com/rss/rss_act-four';
            url4 = 'http://feeds.washingtonpost.com/rss/rss_powerpost';
            _context.next = 8;
            return _axios["default"].get(url2, {
              method: 'GET'
            });

          case 8:
            response = _context.sent;

            _xml2js["default"].parseString(response.data, function (err, datas) {
              console.log(datas.rss['channel'][0].category, 'category'); // console.log('---------------------------');
              // datas.rss['channel'][0].item.map(e => {
              //     console.log(e, '\n');
              // });

              console.log(datas.rss['channel'][0].item.flat(Infinity));
              var arr1 = [1, 2, [3, 4]]; //console.log(arr1.flat()); 
            });

            return _context.abrupt("return", payload);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function update(_x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", params);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _update.apply(this, arguments);
}

function destroy(_x3) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", params);

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _destroy.apply(this, arguments);
}