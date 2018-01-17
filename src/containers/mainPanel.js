import React, { Component } from 'react';
import { TextField, Button, AppRegistry, FlatList, StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import update from 'immutability-helper';

export default class FlatListBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solIsim: "Team1",
      sagIsim: "Team2",
      solData: [
        {key: -101},
        {key: 202},
        {key: 101},
        {key: 523}
      ],
      sagData: [
        {key: 404},
        {key: 502},
        {key: 101},
        {key: -29}
      ],
      inputValue: 0,
      itemSize: 0,
      activeRowKey:null
    };
  }

  removeElements = () =>{
    this.setState({
      solData: [],
      sagData:[],
      solIsim:'',
      sagIsim:''
    })
  }

  addDummyData = () =>{
    this.setState({
      solIsim: "Team1",
      sagIsim: "Team2",
      solData: [
        {key: -101},
        {key: 202},
        {key: 101},
        {key: 523},
        {key: 404},
        {key: -202},
        {key: 120},
        {key: 110},
      ],
      sagData: [
        {key: 404},
        {key: 502},
        {key: 101},
        {key: -29},
        {key: 404},
        {key: -202},
        {key: 120}
      ]
    })
  }

  // Gonderilen side degeri 1-> soldaki tabloya ekle 2-> sagdaki tabloya ekle.
  addData = (side, item) => {
    let obj = {
      key: parseInt(this.state.inputValue)
    };
    if(side === 1){
      this.setState({
        solData: [...this.state.solData, obj]
      })
    }else if(side === 2){
      this.setState({
        sagData: [...this.state.sagData, obj]
      })
    }
  }

  render() {
    let itemsize = 0;
    var swipeoutRight = [{
        text: 'Duzenle',
        color: "#841584"
      }
    ];
    var swipeoutLeft = [{
      text: 'Sil',
      color: "red",
      onOpen: () =>{
        alert('test')
      },
      onPress: () => {
        alert(this.state.activeRowKey)
        this.setState({
          solData: update(this.state.solData, {$splice: [[this.state.activeRowKey, 1]]})
        })
      }
    }
  ];

    return (  
      [
        <Button
          onPress={this.removeElements}
          title="Sil"
          color="#841584"
          key={'$itemsize++'}
        />,

        
        

        // <Button
        //   onPress={this.addDummyData}
        //   title="Test Data"
        //   color="#111111"
        //   key={'$itemsize++'}
        // />,

      <TextInput
          style= {styles.leftItem}
          keyboardType = 'numeric'
          onSubmitEditing={(event) => this.addData(1,event)}
          onChangeText={(inputValue) => this.setState({inputValue})}
          value={`${this.state.inputValue}`}
          maxLength={4}
          key={'$itemsize++'}
        />,

      <View style={styles.titleContainer} key={'$itemsize++'}>
        <TextInput
          style={{height: 40}}
          onChangeText={(solIsim) => this.setState({solIsim})}
          value={this.state.solIsim}
        />
      
        <TextInput
          style={{height: 40}}
          onChangeText={(sagIsim) => this.setState({sagIsim})}
          value={this.state.sagIsim}
        />  
      </View>
      ,
      // <View style={styles.container} key={'$itemsize++'}>
      //   <FlatList
      //     data={this.state.solData}
      //     renderItem={({item}) =>
      //     <Swipeout right={swipeoutRight} left={swipeoutLeft} backgroundColor="#ffffff">
      //       <Text 
      //         style={styles.leftItem}>{item.key}
      //       </Text>
      //     </Swipeout>}
      //   />


      <View style={styles.container} key={'$itemsize++'}>
        <FlatList
          data={this.state.solData}
          renderItem={({item,index}) =>
          <Swipeout right={swipeoutRight} left={swipeoutLeft} autoClose={true} backgroundColor="#ffffff">
            <Text 
              item = {item}
              index = {index}
              style={styles.leftItem}>{item.key}, {index}
            </Text>
          </Swipeout>}
        />

        <FlatList
          data={this.state.sagData}
          renderItem={({item}) => <Text style={styles.rightItem}>{item.key}</Text>}
        />
      </View>,
      
      <View style={styles.footer} key={'$itemsize++'}>
        <Button 
          onPress={this.removeElements}
          title="Sil"
          color="red"
          key={'$itemsize++'}
        />
        <Button
          onPress={this.removeElements}
          title="Sil"
          color="black"
          key={'$itemsize++'}
        />
        <Button
          onPress={this.addDummyData}
          title="Dummy Data"
          color="blue"
          key={'$itemsize++'}
        />
      </View>

      ]
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 30,
   flexDirection: 'row'
  },
  footer:{
    flexDirection:'row',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer:{
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightItem: {
    padding: 10,
    fontSize: 22,
    height: 44,
    alignSelf: 'center'
  },
  leftItem: {
    padding: 10,
    fontSize: 22,
    height: 44,
    alignSelf: 'center'
  },
})

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);
