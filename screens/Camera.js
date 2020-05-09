import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { uploadPhoto } from '../actions/index.js';
import { updatePhoto } from '../actions/post.js';
import firebase from "firebase";
require("firebase/firestore");


export function CameraUpload({ uploadPhoto, updatePhoto, navigation, post }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
        <Camera 
            style={{ flex: 1 }} 
            type={type}
            ref={ref => {setCameraRef(ref) ;}}>        
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 15, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
                if(cameraRef){
                let photo = await cameraRef.takePictureAsync();
                console.log('photo', photo);
                const uri = photo.uri
                  if(!photo.cancelled){
                      const resize = await ImageManipulator.manipulateAsync(photo.uri, [], { compress: 0.1, format: 'png' });
                      const url = await uploadPhoto(resize)
                      updatePhoto(url)      
                      navigation.navigate('Post')
                      };
                }
                }}>
                <View style={{ 
                borderWidth: 2,
                borderRadius:"50%",
                borderColor: 'white',
                height: 50,
                width:50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}
                >
                <View style={{
                    borderWidth: 2,
                    borderRadius:"50%",
                    borderColor: 'white',
                    height: 40,
                    width:40,
                    backgroundColor: 'white'}} >
                </View>
                </View>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
    return (
      bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
    )
  }
  
  // ability to get global state
  const mapStateToProps = (state) => {
    return {
      post: state.post,

    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CameraUpload)
  