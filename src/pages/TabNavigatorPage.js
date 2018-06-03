import React, { Component } from 'react';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FourthPage from './FourthPage';
import {connect} from 'react-redux';
import {
    createBottomTabNavigator
} from 'react-navigation';
import {
    createNavigationPropConstructor,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    initializeListeners,
  } from 'react-navigation-redux-helpers';
import {navigationPropConstructor} from '../store';
class NavigatorPages extends Component{ 
    constructor(props){
        super(props);
    }
    componentDidMount() {
      initializeListeners("App", this.props.nav);
    }
    render(){
        alert(this.props.nav.index);
        return(
            <SimpleAppNavigator
                navigation={navigationPropConstructor(
                    this.props.dispatch,
                    this.props.nav,
                )}
            />
        )
    }
}
export const SimpleAppNavigator = createBottomTabNavigator({
    page1: {screen: FirstPage},
    page2: {screen: SecondPage},
    page3: {screen: ThirdPage},
    page4: {screen: FourthPage}
},{
    initialRouteName: 'page1',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition:'bottom',
});
const mapStateToProps = (state)=>({
    nav: state.TabNavigatorReducer,
});
export default connect(mapStateToProps)(NavigatorPages);