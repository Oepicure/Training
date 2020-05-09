import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEmail, updatePassword, login, getUser, facebookLogin } from '../actions/user.js'
import firebase from "firebase";
import styles from '../styles.js'


class Login extends React.Component {

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.props.getUser(user.uid, 'LOGIN')
        if(this.props.user !=null){
          this.props.navigation.navigate('Home')
        }
      }
    })
  }

  render () {
    return (
      <View style={[styles.container, styles.center]}>
          <TextInput
           style={styles.border}
            value={this.props.user.email}
            onChangeText={input => this.props.updateEmail(input)}
            placeholder='Email'
          />
          <TextInput
          style={styles.border}
            value={this.props.user.password}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder='Password'
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton} onPress={() => this.props.facebookLogin()}>
            <Text>Login with Facebook</Text>
          </TouchableOpacity>
          <Text>or</Text>          
          <TouchableOpacity  onPress={() => this.props.navigation.navigate('Signup')}>
            <Text>Signup</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

// ability to use action, which is kind of a global function connected to state
const mapDispatchToProps = (dispatch) => {
    return (
bindActionCreators({ updateEmail, updatePassword, login, getUser, facebookLogin }, dispatch)
    )
  }
  
  // ability to get global state
  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)
  
  