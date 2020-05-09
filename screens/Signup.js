import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles.js'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { updateEmail, updatePassword, updateUsername, updateUser, updatePhoto, signup } from '../actions/user.js'
import { uploadPhoto } from '../actions/index.js'


class Signup extends React.Component {

  componentDidMount = () => {
    const { routeName } = this.props.route.name
    console.log(this.props.route.name)
  }

  onPress = () => {
    const { routeName } = this.props.route.name
    if(this.props.route.name === 'Signup'){
      this.props.signup()
      this.props.navigation.navigate('Home')
    }
    else {
      this.props.updateUser()
      this.props.navigation.goBack()
    }
  }

  openLibrary = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync()
      if(!image.cancelled) {
        console.log('upload button pressed')
        const url = await this.props.uploadPhoto(image)
        console.log(url)
        this.props.updatePhoto(url)
        console.log(url)
      }
    }
  }


  render () {
    //const { routeName } = this.props.route.name
    return (
      <View style={[styles.container, styles.center]}>
          <TouchableOpacity style={styles.center} onPress={this.openLibrary}>
            <Image style={styles.roundImage} source={{uri: this.props.user.photo}}/>
            <Text style={styles.bold}>Upload photo</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.border}
            editable={this.props.route.name === 'Signup' ? true : false}
            value={this.props.user.email}
            onChangeText={input => this.props.updateEmail(input)}
            placeholder='Email'
          />
          <TextInput
            style={styles.border}
            editable={this.props.route.name === 'Signup' ? true : false}
            value={this.props.password}
            onChangeText={input => this.props.updatePassword(input)}
            placeholder='Password'
            secureTextEntry={true}
          />
          <TextInput
          style={styles.border}
            value={this.props.user.username}
            onChangeText={input => this.props.updateUsername(input)}
            placeholder='Username'
          />
          <TouchableOpacity style={styles.button} onPress={() => this.onPress()}>
            <Text>Done</Text>
          </TouchableOpacity>
          <Text>or</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Login</Text>
          </TouchableOpacity>
    </View>
    );
  }
}

// ability to use action, which is kind of a global function connected to state
const mapDispatchToProps = (dispatch) => {
    return (
      bindActionCreators({ updateEmail, updatePassword, updateUsername, updateUser, updatePhoto, signup, uploadPhoto }, dispatch)
    )
  }
  
  // ability to get global state
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      password: state.user.password,
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Signup)
  
  