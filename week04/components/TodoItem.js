import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class TodoItem extends React.Component {
  render() {
    const item = this.props.data;
    return (
      <View>
       <View style={{flexDirection: 'row'}}> {item.state == 'active' ? <View style={{flexDirection: 'row', flex: 1, marginLeft: 10, backgroundColor: 'green', marginBottom: 10, marginRight: 10, borderRadius: 5}}><Text style={{color: 'white', flex: 0.1, marginLeft: 10, marginRight: 10}}>{item.st} </Text><Text onPress={this.props.onClickToChangeState} onLongPress={this.props.onLongClickToDelete} style={{color: 'white', flex: 0.8}}>{item.context}</Text></View> : <View style={{flexDirection: 'row', flex: 1, marginLeft: 10, backgroundColor: 'blue', marginBottom: 10, marginRight: 10, borderRadius: 5}}><Text style={{color: 'white', flex: 0.1, marginLeft: 10, marginRight: 10}}>{item.st} </Text><Text onPress={this.props.onClickToChangeState} style={{color: 'white', flex: 0.8}}>{item.context}</Text></View>}</View>
      </View>
    );
  }
}

