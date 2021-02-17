"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const logger_1 = require("@wdio/logger");
/**
 * TestRail basic API wrapper
 */
class TestRail {
    constructor(options) {
        this.options = options;
        // compute base url
        axios.defaults.baseURL = `https://${options.testRailUrl}/index.php?/api/v2/`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        this.log = logger_1.default('wdio-v6-testrail-reporter');
    }
    _get(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(endpoint, {
                    auth: {
                        username: this.options.username,
                        password: this.options.password,
                    },
                });
                return response.data;
            }
            catch (error) {
                console.log('Error: %s', JSON.stringify(error.body));
            }
        });
    }
    _post(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.post(endpoint, body, {
                    auth: {
                        username: this.options.username,
                        password: this.options.password,
                    },
                });
                return response.data;
            }
            catch (error) {
                this.log.error('Error: %s', JSON.stringify(error.body));
            }
        });
    }
    addResultsForCases(runID, results) {
        /*this._post(`add_results_for_cases/${runID}`, {
          results: results,
        });*/
        console.log('add_results_for_cases/${runID}');
        console.log('results:');
        console.log(results);
    }
    getLastTestRun(projectId, suiteId) {
        return this._get(`get_runs/${projectId}&suite_id=${suiteId}&limit=1`);
    }
}
exports.TestRail = TestRail;
//# sourceMappingURL=testrail.js.map