import React, {Component} from 'react';
import {AppRegistry, FlatList, StyleSheet, Text, View, Platform, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import solData from '../data/solData';
import sagData from '../data/sagData';
import SwipeOut from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';
import FlatListItem from './FlatListItem';

export default class BasicFlatList extends Component{
    constructor(props){
        super(props);
        this.state = ({
            deletedRowKey: null,
            leftTotal: solData.map(function(b){return b.value}).reduce(function(p,c){return p+c;}),
            rightTotal: sagData.map(function(b){return b.value}).reduce(function(p,c){return p+c;})
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    
    refreshFlatList = (activeKey) =>{
        this.setState((prevState) => {
            return{
                deletedRowKey: activeKey,
                leftTotal: solData.map(function(b){return b.value}).reduce(function(p,c){return p+c;}),
                rightTotal: sagData.map(function(b){return b.value}).reduce(function(p,c){return p+c;})
            };
        });
        this.refs.flatList.scrollToEnd();
    }
    _onPressAdd(){
        this.refs.addModal.showAddModal();
    }

    removeAllElements = () =>{
        solData.splice(0,solData.length);
        sagData.splice(0,sagData.length);
        this.setState(() => {
            return{
                deletedRowKey: null,
                leftTotal: 0,
                rightTotal: 0
            };
        });
    }

    render(){
        return(
            
            <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableHighlight
                    style={{padding: 5}}
                    underlayColor= 'white'
                    onPress={this.removeAllElements}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={require('../images/icons/closeIcon.png')}/>
                </TouchableHighlight>
            </View>

            <View style={{flex:1, flexDirection: 'row', padding: 10}}>
                <FlatList style={{padding: 10}} ref={"flatList"} data={solData} renderItem={({item,index})=>{
                    return(
                        <FlatListItem item={item} index={index} parentFlatList={this}></FlatListItem>
                    );
                }}></FlatList>
                
                <FlatList style={{padding: 10}} ref={"flatList"} data={sagData} renderItem={({item,index})=>{
                    return(
                        <FlatListItem item={item} index={index} parentFlatList={this}></FlatListItem>
                    );
                }}></FlatList>
            </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text style={{fontSize:25, fontWeight: 'bold', textAlign:'center'}}>{this.state.leftTotal}</Text>
                    <Text style={{fontSize:25, fontWeight: 'bold', textAlign:'center'}}>{this.state.rightTotal}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                    <TouchableHighlight
                        style={{marginRight:10}}
                        underlayColor= 'white'
                        onPress={this._onPressAdd}>
                    <Image
                        style={{width: 35, height: 35}}
                        source={require('../images/icons/addButton.png')}/>
                    </TouchableHighlight>
                </View>

                <AddModal ref={'addModal'} parentFlatList={this}></AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}></EditModal>
            </View>
        );
    }
}