import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import TodoItem from './components/TodoItem';

// or any pure javascript modules available in npm
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

const data = [
  { st: 1, context: "think a bit", state: "active"},
  { st: 2, context: "google 'how to build to do app'", state: "active"},
  { st: 3, context: "read result from google", state: "active"},
  { st: 4, context: "read again", state: "done"},
  { st: 5, context: "search more", state: "done"},
  { st: 6, context: "how to learn navigation in react native", state: "done"},
  { st: 7, context: "spend more time to practice", state: "active"},
  
];
class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: '',
      lists: data
    }
  }
  changeInputText = text => {
    this.setState({inputText : text})
  }
  addNewItem = () => {
    const lists = this.state.lists;
    const newTodo = {
    context: this.state.inputText,
    state: 'active',
    st: lists.length + 1
  };
  const newTodoList = [...lists, newTodo];
  this.setState({lists: newTodoList, inputText : ''});
  }
  onChangeState = id => {
    const todoList = this.state.lists;
    const todo = todoList.find(todo => todo.st === id);
    todo.state = todo.state === 'done' ? 'active' : 'done';
    const foundIndex = todoList.findIndex(todo => todo.st === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    this.setState({lists: newTodoList});
    this.props.navigation.navigate("Convert", {item: todo} )
  }
  onLongPress = todo => {
    Alert.alert(
      'Delete your todo?',
      todo.context,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.onDeleteTodo(todo.st) }
      ],
      { cancelable: true }
    );
};
  onDeleteTodo = id => {
    const newTodoList = this.state.lists.filter(todo => todo.st !== id);
    this.setState({lists: newTodoList})
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      <ScrollView contentContainerStyle={{ flex: 0.7, justifyContent: "center", marginTop: 10, marginLeft: 40, width: 250, backgroundColor: 'black',  borderRadius: 5, flexDirection: 'column'}}>
        <View style={{alignItems: "center", marginBottom: 10, marginTop: 10, flex: 0.1}}><Text style={{color: 'white', fontSize: 20}}>Todo list ({this.state.lists.length})</Text></View>  
        <View style={{flex: 0.9}}>      
        {this.state.lists.map(item => {
              return <TodoItem data={item} onClickToChangeState={() => this.onChangeState(item.st)} onLongClickToDelete={()=> this.onLongPress(item)}/>
                
            })}
          </View>
      </ScrollView>
      <View style={{flex: 0.3, alignItems: 'center'}}>
        <TextInput style={{borderColor: 'black', width: 230, height: 30, borderWidth: 1, borderRadius: 5, marginTop: 10}} onChangeText={this.changeInputText} value={this.state.inputText}></TextInput>
        <TouchableOpacity onPress={this.addNewItem}><Text>Submit</Text></TouchableOpacity> 
        <TouchableOpacity><Text onPress={()=>this.props.navigation.navigate("Active", {datas: this.state.lists})}>See active list</Text></TouchableOpacity>
        <TouchableOpacity><Text onPress={()=>this.props.navigation.navigate("Complete", {datas: this.state.lists})}>See done list</Text></TouchableOpacity>
      </View>
      </View>
    );
  }
}
class CompleteScreen extends React.Component {
  render() {
   const {navigation} = this.props;
    const data = navigation.getParam("datas");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
        {data.map(item => { if(item.state == "done")
              return <TodoItem data={item} />
                
            })}
      </View>
    )
  }
}

class ActiveScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    const data = navigation.getParam("datas");
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
        {data.map(item => { if(item.state == "active")
              return <TodoItem data={item} />
                
            })}
      </View>
    )
  }
}

class ConvertScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    const item = navigation.getParam("item");
    const st = item.st;
    const context = item.context;
    const state = item.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{st} : {state}</Text>
        <Text>{context}</Text>
      </View>
    );
  }
}

const All = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Convert: {
    screen: ConvertScreen,
  },
})

const AppNavigator = createBottomTabNavigator({
  Complete: {
    screen: CompleteScreen,
  },
  All,
  Active: {
    screen: ActiveScreen,
  },
}, {
    initialRouteName: 'All',
});

export default createAppContainer(AppNavigator);

