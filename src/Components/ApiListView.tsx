import * as React from 'react';
import ExplorerComponent from './ExplorerComponent';
import Constants from '../Services/Constants';

export default class ApiListView extends React.Component {
  public render(): React.ReactNode {
    // TODO: fetch an actual list of API's from a data source
    return Constants.mockApiList.map((apiConfig) => <ExplorerComponent apiConfig={apiConfig} />);
  }
}
