import * as React from 'react';
import { Provider } from 'react-redux';
import store from './Services/Store';
import ApiListView from './Components/ApiListView';
import './index.css';

class App extends React.Component {
  public render(): React.ReactNode {
    return (
      <div className="App">
        <Provider store={store}>
          <ApiListView />
        </Provider>
      </div>
    );
  }
}

export default App;
