/**
 * Created by clf on 2017/7/8.
 */
import {createStore,applyMiddleware} from 'redux';
//中间件
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
    createNavigationPropConstructor,
    createReactNavigationReduxMiddleware,
  } from 'react-navigation-redux-helpers';

//reducers
import reducers from './reducers/index';
//引用react-navigation-redux-helpers组件手动创建中间件,接受state并返回新的state,让路由刷新
const middleware = createReactNavigationReduxMiddleware(
    "App",
    state => state.nav,
);
export const navigationPropConstructor = createNavigationPropConstructor("App");
const middleWares = [middleware,thunk,logger];
const store = createStore(
    reducers,
    applyMiddleware(...middleWares),
  );
export default store;
