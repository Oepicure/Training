import React, { Component } from 'react'
import StackNavigator from './navigation/SwitchNavigator.js'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index.js'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import firebase from "./config/firebase";
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)
import { NavigationContainer } from '@react-navigation/native';


class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </Provider>
    );
  }
}


export default App