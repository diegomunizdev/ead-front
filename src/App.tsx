import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store, { history } from './store'
import Toast from './services/toast'
import Routes from './routes/routes'

import { Growl } from 'primereact/growl'

class App extends Component {

  public configToast(growl: any) {
    return Toast.growl = growl
  }

  public render() {
    return (
      <Provider store={store}>
        <Growl ref={(growl) => this.configToast(growl)} />
        <Routes history={history} />
      </Provider>
    )
  }
}

export default App;
