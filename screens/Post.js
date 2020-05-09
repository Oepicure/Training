import React, { Component } from 'react';
import { Modal,SafeAreaView, FlatList, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { updateDescription, uploadPost, updateLocation } from '../actions/post.js'
//import { FlatList } from 'react-native-gesture-handler';
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'

class Post extends React.Component {
  state = {
    modalVisible: false,
    locations: []
  }

  componentDidMount() {
    this.getLocations()
  }

  post = () => {
    console.log('fire post function')
    this.props.uploadPost()
      this.props.navigation.navigate('Home')
  }
 

  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      }
    }
    this.setState({modalVisible: false})
    this.props.updateLocation(place)
    console.log('place', place)
  }


  getLocations = async () => {
    this.setState({modalVisible: true})
    const permission = await Permissions.askAsync(Permissions.LOCATION)
    console.log(permission)
      if(permission.status === 'granted') {
        console.log(permission)
        const location = await Location.getCurrentPositionAsync()
        console.log('location', location)
        const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=AIzaSyAxrE252Uj0WjwWrMwxn99qx_vksfetTbA`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({ locations: data.results })
        console.log('data',data)
      }
  }

  render () {
      return (
          <View style={[styles.container, styles.center]}>
            <Modal animationType='slide' transparent={false} visible={this.state.modalVisible}>
              <View style={[styles.container, styles.center]}>
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={this.state.locations}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                      <Text styles={styles.gray}>{item.name}</Text>
                      <Text styles={styles.gray}>{item.vicinity}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Modal>

              <Image style={styles.postPhoto} source={{uri: this.props.post.photo}}/>
              <TextInput
                  style={styles.border}
                  value={this.props.post.description}
                  onChangeText = {text => this.props.updateDescription(text)}
                  placeholder='Description'
              />
              {
                this.state.locations.length > 0 ?
                <TouchableOpacity style={styles.border} onPress={() => this.setState({showModal: true})}>
                  <Text styles={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add Location'}</Text>
                </TouchableOpacity> : null
              }
              <TouchableOpacity style={styles.button} onPress={this.post}>
                  <Text>Post</Text>
              </TouchableOpacity>
          </View>
      );
    }
}

const mapDispatchToProps = (dispatch) => {
    return (
      bindActionCreators({ updateDescription, uploadPost, updateLocation }, dispatch)
    )
  }
  
  // ability to get global state
  const mapStateToProps = (state) => {
    return {
      post: state.post,
      user: state.user
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post)

