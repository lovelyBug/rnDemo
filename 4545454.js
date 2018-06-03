import {
    createStackNavigator,
  } from 'react-navigation';
  import {
    createStore,
    applyMiddleware,
    combineReducers,
  } from 'redux';
  import {
    createNavigationPropConstructor,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    initializeListeners,
  } from 'react-navigation-redux-helpers';
  import { Provider, connect } from 'react-redux';
  import React from 'react';
  
  const AppNavigator = createStackNavigator(AppRouteConfigs);
  
  const navReducer = createNavigationReducer(AppNavigator);
  const appReducer = combineReducers({
    nav: navReducer,
  });
  
  // Note: createReactNavigationReduxMiddleware must be run before createNavigationPropConstructor
  const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
  const navigationPropConstructor = createNavigationPropConstructor("root");
  
  class App extends React.Component {
  
    componentDidMount() {
      initializeListeners("root", this.props.nav);
    }
  
    render() {
      const navigation = navigationPropConstructor(
        this.props.dispatch,
        this.props.nav,
      );
      return <AppNavigator navigation={navigation} />;
    }
  
  }
  
  const mapStateToProps = (state) => ({
    nav: state.nav,
  });
  
  const AppWithNavigationState = connect(mapStateToProps)(App);
  
  const store = createStore(
    appReducer,
    applyMiddleware(middleware),
  );
  
  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
  }