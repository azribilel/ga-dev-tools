// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import HistogramChart from './histogram-chart';
import PivotTable from './pivot-table';
import CohortTable from './cohort-table';
import CodeBlock from '../../components/code-block';


import RequestViewer from './request-viewer';



const RESULTS_VIEW = {
  HISTOGRAM: 'Chart',
  PIVOT: 'Table',
  COHORT: 'Table'
};

export default class ResultsViewer extends React.Component {

  /** @return {Object} */
  render() {
    let {response, settings, params} = this.props;
    let responseCode = JSON.stringify(response.result, null, 2);

    if (response.status >= 400) {

      return (
          <div>
          <h2>API Response</h2>
          <CodeBlock code={responseCode} lang="json" />
          </div>
      );
    } else {
      return(
          <div>
          <Tabs selectedIndex={0}>
            <TabList>
              <Tab>Request JSON</Tab>
              <Tab>Response {RESULTS_VIEW[settings.responseType]}</Tab>
              <Tab>Response JSON</Tab>
            </TabList>
            <TabPanel>
              <RequestViewer params={params} settings={settings} />
            </TabPanel>
            <TabPanel>
              {/* <h2>Response {RESULTS_VIEW[settings.responseType]}</h2> */}
              {settings.responseType == 'HISTOGRAM' ? (
                <HistogramChart
                  response={response}
                />
              ) :
              null}
              {settings.responseType == 'PIVOT' ? (
                <PivotTable
                  response={response}
                />
              ) :
              null}
              {settings.responseType == 'COHORT' ? (
                <CohortTable
                  response={response}
                  settings={settings}
                />
              ) :
              null}
            </TabPanel>
            <TabPanel>
              <h2>API Response</h2>
              <CodeBlock code={responseCode} lang="json" />
            </TabPanel>

          </Tabs>
          </div>
      );
    }
  }
}


