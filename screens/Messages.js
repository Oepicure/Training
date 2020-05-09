import React, { Component } from 'react';
import styles from '../styles.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { getMessages } from '../actions/message'
import {groupBy, values} from 'lodash';
import moment from 'moment'

class Messages extends React.Component {

    componentDidMount = () => {
        this.props.getMessages()
    }

    goToChat = (members) => {
        const uid = members.filter(id => id !== this.props.user.id)
        this.props.navigation.navigate('Chat', uid[0])
    }

    render () {
        console.log(groupBy(this.props.messages, 'members'))
        return (
            <View style= {styles.container}>
                <FlatList
                    keyExtractor={(item) => JSON.stringify(item[0].date)}
                    data={values(groupBy(this.props.messages, 'members'))}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => this.goToChat(item[0].members)} style={[styles.row, styles.space]}>
                            <Image style={styles.roundImage} source={{uri: item[0].photo}}/>
                            <View style={[styles.container, styles.left]}>
                                <Text style= {styles.bold}>{item[0].username}</Text>
                                <Text style= {styles.grey}>{item[0].message}</Text>
                                <Text style= {[styles.grey, styles.small]}>{moment(item[0].date).format('ll')}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                    }
                />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMessages }, dispatch)
  }
  
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      messages: state.messages,
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages)
  
  