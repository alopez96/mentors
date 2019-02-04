import React from 'react';
import { StyleSheet, Text,  View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';

import SwitchNavigation from './components/route';

const intialState = {
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

export default class App extends React.Component {
  
  constructor(){
    super()
    this.state = intialState;
  }

  loadUser = (data) => {
    console.log('user is signed in', data)
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined
      }
    })
  }


  render() {    
    return (
      <SafeAreaView style={styles.container}>
      <Provider store={store}> 
        <SwitchNavigation/>
      </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
