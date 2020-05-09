import { db } from "../config/firebase.js";
import firebase from "firebase";
require("firebase/auth");
require("firebase/firestore");
import * as Facebook from 'expo-facebook';
import { orderBy, groupBy, values } from 'lodash';
import { allowNotifications, sendNotification } from '../actions'


export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const LOGIN = 'LOGIN'
export const GET_PROFILE = 'GET_PROFILE'

export const updateEmail = (email) => {
    return {type: UPDATE_EMAIL, payload: email}
}

export const updatePassword = (password) => {
    return {type: UPDATE_PASSWORD, payload: password}
}

export const updateUsername = (username) => {
    return {type: UPDATE_USERNAME, payload: username}
}

export const updatePhoto = (photo) => {
    return {type: UPDATE_PHOTO, payload: photo}
}

export const login = () => {
    return async function(dispatch, getState) {
        try {
            const { email, password } = getState().user
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(getUser(response.user.uid))
            dispatch(allowNotifications())
        }   catch(e) {
                alert(e)
            }
    }
}

export const facebookLogin = () => {

    return async function(dispatch) {
        try {
            await Facebook.initializeAsync(
                '241926220159458',
             );
            const { type, token } = await Facebook.logInWithReadPermissionsAsync('241926220159458')
            if(type === 'success'){
                const credential = await firebase.auth.FacebookAuthProvider.credential(token);
                const response = await firebase.auth().signInWithCredential(credential)
                if(response.additionalUserInfo.isNewUser){
                    const user = {
                        uid: response.user.uid,
                        email: response.email,
                        username: response.displayName,
                        photo: response.photoURL,
                        token: null,
                    }
                    db.collection('users').doc(response.user.uid).set(user)
                    dispatch({type: LOGIN, payload: user})                      
                }
                else {
                dispatch(getUser(response.user.uid))
                }
            }
        }   catch(e) {
                alert(e)
            }
    }
}
    

export const getUser = (uid, type) => {
    return async (dispatch, getState) => {
        try {
            const userQuery = await db.collection('users').doc(uid).get()
            let user = userQuery.data()

            let posts = []
            const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
            postsQuery.forEach(function(response) {
                posts.push(response.data())
            })
            user.posts = orderBy(posts, 'date', 'desc')
            if(type === 'LOGIN') {
                dispatch({type: LOGIN, payload: user })
            } else {
                dispatch({type: GET_PROFILE, payload: user })
            }
        }   catch(e) {
                alert(e)
            }
    }
}

export const signup = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password, username } = getState().user
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if(response.user.uid) {
                const user = {
                    uid: response.user.uid,
                    email: email,
                    username: username,
                    photo: '',
                    token: null,
                    followers: [],
                    following: []
                }
                db.collection('users').doc(response.user.uid).set(user)
                dispatch({type: LOGIN, payload: user})  
            }
          }   
        catch(e) {
            alert(e)
        }
    }
}

export const updateUser = () => {
    return async (dispatch, getState) => {
        const { uid, username, bio, photo } = getState().user
        try {
            db.collection('users').doc(uid).update(
                {
                    username: username,
                    photo: photo,
                })
          }   
        catch(e) {
            alert(e)
        }
    }
}

export const followUser = (user) => {
    return async (dispatch, getState) => {
        const {uid, photo, username} = getState().user
        try {
            db.collection('users').doc(user.uid).update({
                    followers: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            db. collection('users').doc(uid).update({
                    following: firebase.firestore.FieldValue.arrayUnion(user.uid)
            })
            db.collection('activity').doc().set({
                followerId: uid,
                followerPhoto: photo,
                followerName, username,
                uid: user.uid,
                photo: user.photo,
                username: user.username,
                date: new Date().getTime(),
                type: 'FOLLOWER'
            })
            dispatch(sendNotification(user.uid, 'Started Following You'))
            dispatch(getUser(user.uid))
        }   catch(e) {
            console.error(e)
        }
    }
}

export const unfollowUser = (user) => {
    return async (dispatch, getState) => {
        const {uid, photo, username} = getState().user
        try {
            db.collection('users').doc(user.uid).update({
                    followers: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            db. collection('users').doc(uid).update({
                    following: firebase.firestore.FieldValue.arrayRemove(user.uid)
            })
            dispatch(getUser(user.uid))
        }   catch(e) {
            console.error(e)
        }
    }
}