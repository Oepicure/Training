import firebase from "firebase";
require("firebase/firestore");
import { uuid } from 'uuidv4';
import { db } from "../config/firebase";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'


export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const GET_TOKEN = 'GET_TOKEN'



export const uploadPhoto = (photo ) => {
    return async (dispatch) => {
        try {
            const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => resolve(xhr.response)
            xhr.responseType  = 'blob'
            xhr.open ('GET', photo.uri, true)
            xhr.send(null)
            console.log(blob)
            });
            const id = JSON.stringify(uuid())
            console.log(id)
            console.log('hello again')
            var storageRef = firebase.storage().ref();
            const uploadTask = await storageRef.child(id).put(blob)
            const downloadURL = await uploadTask.ref.getDownloadURL()
            console.log(downloadURL)
            return downloadURL
        }   catch(e) {
            console.error(e)
        }
    }
}

export const allowNotifications = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().user
        try {
            const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS)
            if (permission.status === 'granted'){
                const token = await Notifications.getExpoPushTokenAsync()
                dispatch({type: 'GET_TOKEN', payload: token})
                db.collection('users').doc(uid).update({ token: token })
            }
        } catch(e) {
            console.error(e)
        }
    }
}

export const sendNotification = (uid, text) => {
    return async (dispatch, setState) => {
        const { username } = getState().user
        try {
            const user = await db.collection('users').doc(uid).get()
            if(user.data().token) {
                fetch(PUSH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: user.data().token,
                        title: username,
                        body: text,
                    })
                })
            }
        } catch(e) {
            console.error(e)
        }
    }
}
