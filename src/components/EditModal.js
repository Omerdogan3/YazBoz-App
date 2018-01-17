import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image,
Alert, Platform, TouchableHighlight, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import solData from '../data/solData';

var screen = Dimensions.get('window');

export default class EditModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            Value: null
        };
    }
    showEditModal = (editingValue, flatlistItem) =>{
        this.setState({
            key: editingValue.key,
            value: editingValue.value,
            flatlistItem: flatlistItem
        });
        this.refs.myModal.open();
    }
    generateKey = (numberOfCharacters) =>{
        return require('random-string')({length: numberOfCharacters});
    }

    render(){
        return(
            <Modal ref = {"myModal"} style={{
                justifyContent: 'center',
                borderRadius: Platform.OS === 'ios' ? 30:0,
                shadowRadius: 10,
                width: screen.width - 80,
                height: 280
            }}
            position = 'center'
            backdrop = {true}
            onClosed = {()=>{
                this.setState((prevState) => {
                    return{
                        Value: null
                    };
                });
            }}
            >
            <Text style={{fontSize:16, fontWeight: 'bold', textAlign:'center', marginTop:40 }}>Yeni Deger</Text>
            <TextInput style={{height:40, borderBottomColor:'gray', marginLeft:30, marginRight:30,
                marginTop:20, marginBottom:10, borderBottomWidth:1}}
                placeholder = "Yeni Deger: "
                keyboardType = "numeric"
                value = {this.state.Value}
                onChangeText = {(text) => this.setState({Value: text})}
            ></TextInput>
            <Button style={{ fontSize:18, color:'white',
                padding:8, marginLeft: 70, marginRight: 70, height: 40, borderRadius: 6, backgroundColor: 'mediumseagreen'}}
                onPress = {()=>{
                    let foundIndex = solData.findIndex(item => this.state.key == item.key);
                    if(foundIndex < 0){
                        return;
                    }
                    solData[foundIndex].value = this.state.Value;
                    this.state.flatlistItem.refreshFlatListItem();
                    this.refs.myModal.close();
                }}
                >Kaydet
            </Button>

            </Modal>
        );
    }
}