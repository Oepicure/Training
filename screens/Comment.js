import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, TextInput, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import styles from '../styles.js'
import { addComment, getComments } from '../actions/post';


class Comment extends React.Component {
    state = {
        comment: '',
    }

componentDidMount = () => {
    const { params } = this.props.route
    console.log('start',params)
    console.log('post',this.props.post.comments)
    this.props.getComments(params)
}

postComment = () => {
    const { params } = this.props.route
    this.props.addComment(this.state.comment, params)
    this.setState({comment: ''})
}

  render () {
    return (
        <KeyboardAvoidingView enabled behavior='padding' style={styles.container}>
            <FlatList
                keyExtractor={(item) => JSON.stringify(item.date)}
                data={this.props.post.comments}
                renderItem={({item}) => (
                    <View style={[styles.row, styles.space]}>
                        <Image style={styles.roundImage} source={{uri: item.commenterPhoto}}/>
                        <View style={[styles.container, styles.left]}>
                            <Text>{item.commenterName}</Text>
                            <Text>{item.comment}</Text>
                        </View>
                    </View>
                )}
            /> 
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(comment) => this.setState({comment})}
                    value={this.state.comment}
                    returnKeyType='send'
                    placeholder='Add Comment'
                    onSubmitEditing={this.postComment}
                />
            </View >

        </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addComment, getComments }, dispatch)
}

const mapStateToProps = (state) => {
    return {
      post: state.post,
      user: state.user,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Comment)