(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.DataScheme = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.schemeOf = schemeOf;
  _exports.default = void 0;

  var _dec, _class;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * @param {Object} meta - Key for Name & Value for `Function` / `RegExp`
   *
   * @return {function(Class: Function): void} Class decorator for Data Scheme
   */
  function schemeOf(meta) {
    return function (Class) {
      Object.defineProperty(Class, 'meta', {
        value: meta,
        enmuerable: true
      });

      var _loop = function _loop(key) {
        if (!(meta[key] instanceof Array)) meta[key] = [meta[key]];
        Object.defineProperty(Class.prototype, key, {
          set: function set(value) {
            return Class.set(key, value);
          },
          enmuerable: true
        });
      };

      for (var key in meta) {
        _loop(key);
      }
    };
  }

  var DataScheme = (_dec = schemeOf({
    id: Number,
    name: String
  }), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataScheme() {
      _classCallCheck(this, DataScheme);
    }

    _createClass(DataScheme, null, [{
      key: "check",

      /**
       * @param {Function|RegExp} scheme
       * @param {*}               value
       *
       * @return {Boolean}
       */
      value: function check(scheme, value) {
        if (scheme instanceof Function) {
          if (global[scheme.name] === scheme) {
            if (Object(value) instanceof scheme) return true;
          } else return scheme(value);
        } else if (scheme instanceof RegExp) return scheme.test(value + '');

        return false;
      }
      /**
       * @param {String} key
       * @param {*}      value
       */

    }, {
      key: "set",
      value: function set(key, value) {
        var _this = this;

        var scheme = this.meta[key];
        if (!scheme.some(function (item) {
          return _this.check(item, value);
        })) throw TypeError("\"".concat(key, "\" of ").concat(this.name, " should be a ").concat(scheme.map(function (item) {
          return item.name || item + '';
        }).join(' / ')));
      }
    }]);

    return DataScheme;
  }()) || _class);
  _exports.default = DataScheme;
});