import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

import SignIn from '../screens/SignIn/index';
import SignUp from '../screens/SignUp/index';
import Home from '../screens/Home/index';

interface Props {
  isAuthenticated: boolean;
}
const StackNavigation = (props: Props) => {
  const Stack = createStackNavigator();
  const {isAuthenticated} = props;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="SignUp"
              component={SignUp}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={Home}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.signin.isAuthenticated,
});

export default connect(mapStateToProps)(StackNavigation);
