'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _log = require('gcloud/lib/logging/log');

var _log2 = _interopRequireDefault(_log);

var _gcloud = require('gcloud');

var _gcloud2 = _interopRequireDefault(_gcloud);

var _es6Promisify = require('es6-promisify');

var _es6Promisify2 = _interopRequireDefault(_es6Promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BulkLogger = function () {
  function BulkLogger(projectId, clientEmail, privateKey) {
    _classCallCheck(this, BulkLogger);

    this.projectId = projectId;
    this.resource = {
      type: 'global',
      labels: {
        project_id: projectId
      }
    };
    this.logging = (0, _gcloud2.default)({
      projectId: projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey
      }
    }).logging();
    this.logger = this.logging.log('unknown');
    this.write = (0, _es6Promisify2.default)(this.logger.write, this.logger);
  }

  _createClass(BulkLogger, [{
    key: 'entry',
    value: function entry(log, metadata, data, pKey, sKey) {
      var entry = this.logging.entry(this.resource, data);
      var logName = _log2.default.formatName_(this.projectId, log);
      (0, _extend2.default)(false, entry, metadata);
      (0, _extend2.default)(true, entry, {
        logName: logName,
        labels: {
          'custom.googleapis.com/primary_key': pKey,
          'custom.googleapis.com/secondary_key': sKey
        }
      });

      return entry;
    }
  }]);

  return BulkLogger;
}();

exports.default = BulkLogger;