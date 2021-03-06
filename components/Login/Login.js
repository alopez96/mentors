import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View,
  TouchableOpacity, Image } from 'react-native';
import Toast, {DURATION} from'react-native-easy-toast';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {localhost} from '../../localhost';


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {  
        email: 'arturo@ucsc.edu',
        password: '123',
    };
}

validateInput = () => {
  const { email, password } = this.state;
  let errors = {};
  if (email == null || !email.includes('@ucsc.edu')){
      errors['email'] = 'Email must be a UCSC email'
  }
  if (password == null || password.length < 3){
      errors['password'] = 'Password must be at least 3 letters'
      this.setState({ errors });
  }
  if (Object.keys(errors).length == 0){
      this.signInUser()
  }
  else {
      this.refs.toast.show(Object.values(errors).join(''), 2000)
  }
}

onEmailInputChange = (emailInput) => {
  this.setState({email: emailInput});
}

onPasswordInputChange = (passwordInput) => {
  this.setState({password: passwordInput});
}



signInUser = () => {
  fetch('http://'+localhost+':3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      email: this.state.email,
      password: this.state.password        
      })
  })
  .then(response => response.json())
    .then(user => {
      if(user.id){
        if(!user.role){
          this.props.navigation.navigate('roleScreen')
          this.props.updateUser(user)
        }
        else{
          this.props.updateUser(user)
          this.props.navigation.navigate('Main')
        }
      }
      else{
        this.refs.toast.show(user, 2000)
      }
    })
    .catch( err => console.log(err));
  }


  render() {
    
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.logoContainer} >
            <Image style={styles.logo}
            source= {require('../../images/logo.png')}/>
            <Text style={styles.title} > Unite </Text>
      </View>
      <View styles={styles.formContainer} >
        <LoginForm
          onEmailInputChange={this.onEmailInputChange}
          onPasswordInputChange={this.onPasswordInputChange}>
        </LoginForm>

        <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText} 
                returnKeyType='go'
                onPress={this.validateInput}>Login</Text>
            </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.forgotText}
        onPress={() => this.props.navigation.navigate('Forgot')}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signUpText}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          Don't have an account?
        </Text>
      </TouchableOpacity>
      </View>
      <Toast ref="toast"/>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch({
      type: 'LOAD_USER',
      payload: {
        user
      }
    })
  }
}

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: 150
  }
  ,title:{
      color: '#fff',
      marginTop: 10,
      opacity: 0.9
  },
  formContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 50,
    marginLeft: 50,
    marginRight: 50,
   },
   buttonText:{
     textAlign: 'center',
     color: '#fff',
     fontWeight: '700',   
    },
  forgotText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20
  },
  signUpText:{
    color:'#000',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 30
  }
  
});
