import * as React from 'react';
import ExplorerComponent from './ExplorerComponent';
import Constants from '../Services/Constants';

export default class ApiListView extends React.Component {
  public render(): React.ReactNode {
    // TODO: fetch the list of api methods and render an explorer component for each in an accordion
    return Constants.mockApiList.map((apiConfig) => <ExplorerComponent apiConfig={apiConfig} />);
  }
}
