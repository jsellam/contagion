import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './redux'
import I18n from 'redux-i18n'
import Icon from './components/Icon/Icon'
import IconTypes from './types/IconTypes'
import Stats from './components/Stats/Stats'

class App extends Component {
  render() {
    return (
   
      <Provider store={store}>
        <I18n translations={{}} useReducer>
          <div className="App">
            <Stats />
          </div>
        </I18n>
      </Provider>
    );
  }
}

export default App;
