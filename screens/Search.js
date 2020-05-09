import React, { Component } from 'react';
import styles from '../styles.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { db } from "../config/firebase.js";
import { getUser } from '../actions/user'


class Search extends React.Component {
    state = {
      search: '',
      query: []
    }

    searchUser = async () => {
      let search = []
      const query = await db.collection('users').where('username', '>=', this.state.search).get()
      query.forEach((response) => {
        search.push(response.data())
      })
      this.setState({query: search})
    }

    goUser = (user) => {
      this.props.getUser(user.uid)
      this.props.navigation.navigate('Profile')
    }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(search) => this.setState({search})}
          value={this.state.search}
          returnKeyType='send'
          placeholder='Search'
          onSubmitEditing={this.searchUser}
        />
        <FlatList
          data={this.state.query}
          keyExtractor={(item) => JSON.stringify(item.uid)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.goUser(item)} style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{uri: item.photo}}/>
              <View styles={[styles.container, styles.right]}>
                <Text styles={styles.bold}>{item.username}</Text>
              </View>
            </TouchableOpacity> 
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)