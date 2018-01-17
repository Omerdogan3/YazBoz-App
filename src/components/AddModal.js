import React, { Component } from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Image,
Alert, Platform, TouchableHighlight, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import solData from '../data/solData';
import sagData from '../data/sagData';

var screen = Dimensions.get('window');

export default class AddModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            solNewValue: null,
            sagNewValue: null
        };
    }
    showAddModal = () =>{
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
                        solNewValue: null,
                        sagNewValue: null
                    };
                });
            }}
            >
            <Text style={{fontSize:16, fontWeight: 'bold', textAlign:'center', marginTop:40 }}>Yeni Deger</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10, }}>
                <TextInput style={{height:40, width: screen.width/4 ,borderBottomColor:'gray', textAlign: 'left'}}
                    placeholder = "Sol Taraf "
                    keyboardType = "numeric"
                    value = {this.state.solNewValue}
                    onChangeText = {(text) => this.setState({solNewValue: parseInt(text)})}
                ></TextInput>
                <TextInput style={{height:40, width: screen.width/4, borderBottomColor:'gray', textAlign: 'right'}}
                    placeholder = "Sag Taraf "
                    keyboardType = "numeric"
                    value = {this.state.sagNewValue}
                    onChangeText = {(text) => this.setState({sagNewValue: parseInt(text)})}
                ></TextInput>
            </View>
            <Button style={{ fontSize:18, color:'white',
                padding:8, marginLeft: 70, marginRight: 70, height: 40, borderRadius: 6, backgroundColor: 'mediumseagreen'}}
                onPress = {()=>{
                    // if(this.state.newValue == null){
                    //     alert("Lutfen bir deger giriniz!");
                    //     return;
                    // }
                    let newKey = this.generateKey(24);
                    let newVal = {
                        key: newKey,
                        value: this.state.solNewValue
                    };
                    if(newVal.value!= null){
                        solData.push(newVal);
                    }

                    newKey = this.generateKey(24);
                    newVal = {
                        key: newKey,
                        value: this.state.sagNewValue
                    };
                    if(newVal.value!= null){
                        sagData.push(newVal);
                    }
                    
                    this.props.parentFlatList.refreshFlatList(newKey);
                    this.refs.myModal.close();
                }}
                >Kaydet
            </Button>

            </Modal>
        );
    }
}