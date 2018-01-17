import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import solData from '../data/solData';
import sagData from '../data/sagData';
import SwipeOut from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';

export default class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
            leftTotal: 0,
            rightTotal: 0
        };
    }
    refreshFlatListItem = () =>{
        this.setState((prevState)=>{
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }

    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                this.setState({activeRowKey: null})
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: () =>{
                        this.props.parentFlatList.refs.editModal.showEditModal(solData[this.props.index],this);
                    },
                    text: 'Duzenle', type: 'primary'
                }
                ,{
                    onPress: ()=>{
                        const deletingRow = this.state.activeRowKey;
                        solData.splice(this.props.index,1);
                        this.props.parentFlatList.refreshFlatList(deletingRow);
                    },
                    text: 'Sil', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,

        };

        return(
            <SwipeOut {...swipeSettings}>
                <View style={{flex: 1,
                    backgroundColor: this.props.index %2 == 0 ? 'grey' : 'white'}}>
                    <Text style={styles.FlatListItem}>{this.props.item.value}</Text>
                </View>
            </SwipeOut>   
        )
    }
}

const styles = StyleSheet.create({
    FlatListItem: {
        color: 'black',
        padding: 10,
        fontSize: 16
    }
});