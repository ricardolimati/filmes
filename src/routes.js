import { createStackNavigator } from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator({
  Main
},{
  navigationOptions:{
    headerStyle:{
      backgroundColor: "#e50914"
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    textAling: "center",
  },
});
