import * as React from 'react';

export interface IJSONViewerProps {
  data: any;
}

export default class JSONViewer extends React.Component<IJSONViewerProps> {
  public render(): React.ReactNode {
    // TODO: fix the code viewer to show formatted json
    return (
      <pre className="code-viewer">
        {this.props.data && JSON.stringify(this.props.data, null, 2)}
      </pre>
    );
  }
}