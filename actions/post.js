import { db } from "../config/firebase.js";
import firebase from "firebase";
require("firebase/firestore");
import { uuid } from 'uuidv4';
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import Activity from "../screens/Activity.js";
import { sendNotification } from '../actions'



export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const GET_POSTS = 'GET_POSTS'
export const LIKE = 'LIKE'
export const GET_COMMENTS = 'GET_COMMENTS'

export const updateDescription = (input) => {
    return { type: UPDATE_DESCRIPTION, payload: input }
}

export const updatePhoto = (input) => {
    return { type: UPDATE_PHOTO, payload: input }
}

export const updateLocation = (input) => {
    return { type: UPDATE_LOCATION, payload: input }
}

export const uploadPost = () => {
    return async (dispatch, getState) => {
        try {
            const { post, user } = getState()
            const id = JSON.stringify(uuid())
            console.log(post)
            const upload = {
                id: id,
                postPhoto: post.photo || 'https://images.unsplash.com/photo-1559628129-67cf63b72248?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                postDescription: post.description || '',
                postLocation: post.location || {
                    coords: {
                        lat: 55.666890,
                        lng: 12.549850,
                    },
                    name: 'Copenhagen'
                },
                uid: user.uid,
                username: user.username,
                photo: user.photo || 'https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-',
                likes: [],
                comments: [],
        }
            console.log(upload)
        db.collection('posts').doc(id).set(upload)
    }   catch (e) {
            alert(e)
    }
}
}

export const getPosts = () => {
    return async function (dispatch, getState) {
        try {
            const posts = await db.collection('posts').get()
            let array = []
            posts.forEach((post) => {
                array.push(post.data())
            })
            console.log(array)
            dispatch({ type: GET_POSTS, payload: array })
        } catch (e) {
            alert(e)
        }
    }
}

export const likePost = (post) => {
    return (dispatch, getState) => {
        const { uid, username, photo } = getState().user
        try {
            const home = cloneDeep(getState().post.feed)
            let newFeed = home.map(item => {
                if (item.id === post.id) {
                    item.likes.push(uid)
                } return item
            })
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })
            db.collection('activity').doc().set({
                postId: post.id,
                postPhoto: post.postPhoto,
                likerId: uid,
                likerPhoto: photo,
                likerName: username,
                uid: post.uid,
                date: new Date().getTime(),
                type: 'LIKE'
            })
            dispatch(sendNotification(user.uid, 'Liked Your Post'))
            //dispatch({ type: GET_POSTS, payload: newFeed })
            dispatch(getPosts())
        } catch (e) {
            console.error(e)
        }
    }
}

export const unlikePost = (post) => {
    return async (dispatch, getState) => {
        const { uid } = getState().user
        try {
            db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get()
            query.forEach((response) => {
                response.ref.delete()
            })
            dispatch(getPosts())
        } catch (e) {
            console.error(e)
        }
    }
}

export const getComments = (post) => {
    return dispatch => {
        dispatch({type: 'GET_COMMENTS', payload: orderBy(post.comments, 'date', 'desc')})
    }

}

export const addComment = (text, post) => {
    return (dispatch, getState) => {
        const { uid, photo, username} = getState().user
        let comments = cloneDeep(getState().post.comments.reverse())
        try {
            const comment = {
                comment: text,
                commenterId: uid,
                commenterPhoto: photo || '',
                commenterName: username,
                date: new Date().getTime(),
            }
            console.log(comment)
            db.collection('posts').doc(post.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion(comment)
            })
            comment.postId = post.id
            comment.postPhoto = post.postPhoto
            comment.uid = post.uid
            comment.type = 'COMMENT'
            comments.push(comment)
            dispatch({type: 'GET_COMMENTS', payload: comments.reverse()})
            dispatch(sendNotification(post.uid, text))

            db.collection('activity').doc().set(comment)
        }   catch(e) {
                console.error(e)
        }
    }
}