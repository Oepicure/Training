import React, { Component } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../styles.js'
import { getPosts, likePost, unlikePost } from '../actions/post.js'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'


class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
    console.log('start post',this.props.post.feed)
  }

  likePost = (post) => {
    const {uid} = this.props.user
    if(post.likes.includes(uid)){
      this.props.unlikePost(post)
    } 
    else {
      this.props.likePost(post)
    }
  }

  navigateMaps = (item) => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('Map', {location: item.postLocation})
  }

  render () {
    if (this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
              <View style={[styles.row, styles.space]} >
                <View style={[styles.row, styles.center]}>
                  <Image style={styles.roundImage} source={{uri: item.photo}}/>
                  <View>
                    <Text style={styles.bold}>{item.username} </Text>
                    <TouchableOpacity onPress={() => this.navigateMaps(item)}>
                        <Text style={[styles.gray]}>{item.postLocation ? item.postLocation.name : null}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.gray, styles.small]}>{moment(item.date).format('ll')}</Text>
                  </View>
                </View>
                <Ionicons style={{margin: 5}} name='ios-flag' size={25}/>
              </View>
                <Image style={styles.postPhoto} source={{uri: item.postPhoto}}/>
                <View style={styles.row} >
                  <TouchableOpacity onPress={() => this.likePost(item)}>
                    <Ionicons style={{margin: 5}} color={liked ? '#db565b' : '#000'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress= {() => this.props.navigation.navigate('Comment', item)}>
                    <Ionicons style={{margin: 5}} name='ios-chatbubbles' size={25}/>
                  </TouchableOpacity>
                  <Ionicons style={{margin: 5}} name='ios-send' size={25}/>
                </View>
              <Text> {item.postDescription} </Text>
            </View>
            )
            
          }}
        />
    </View>
    );
  }
}

// ability to use action, which is kind of a global function connected to state
const mapDispatchToProps = (dispatch) => {
  return (
    bindActionCreators({ getPosts, likePost, unlikePost }, dispatch)
  )
}

// ability to get global state
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


