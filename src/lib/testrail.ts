const axios = require('axios');
import logger from '@wdio/logger';
import { TestRailOptions, TestRailResult } from './testrail.interface';

/**
 * TestRail basic API wrapper
 */
export class TestRail {
  private log;

  constructor(private options: TestRailOptions) {
    // compute base url
    axios.defaults.baseURL = `https://${options.testRailUrl}/index.php?/api/v2/`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    this.log = logger('wdio-v6-testrail-reporter');
  }

  async _get(endpoint: string) {
    try {
      const response = await axios.get(endpoint, {
        auth: {
          username: this.options.username,
          password: this.options.password,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error: %s', JSON.stringify(error.body));
    }
  }

  async _post(endpoint: string, body: object) {
    try {
      const response = await axios.post(endpoint, body, {
        auth: {
          username: this.options.username,
          password: this.options.password,
        },
      });
      return response.data;
    } catch (error) {
      this.log.error('Error: %s', JSON.stringify(error.body));
    }
  }

  public addResultsForCases(runID, results: TestRailResult[]) {
    /*this._post(`add_results_for_cases/${runID}`, {
      results: results,
    });*/
    console.log('add_results_for_cases/${runID}');
    console.log('results:');
    console.log(results);
  }

  public getLastTestRun(projectId, suiteId) {
    return this._get(`get_runs/${projectId}&suite_id=${suiteId}&limit=1`);
  }
}
