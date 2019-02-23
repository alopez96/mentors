import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import {Card, CardItem, Thumbnail, 
        Body, Left, Right, Button, Icon} from 'native-base';

class CardComponent extends React.Component {

  render() {

    const images = {
      "1": "require('../../images/classico.jpg')",
      "2": "require('../../images/classico.jpg')",
      "2": "require('../../images/classico.jpg')"
    }

    
    postClicked = () => {
      console.log('post clicked')
    }


    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../images/barca.png')}
            button onPress={() => this.props.userClicked()}/>
            <Body>
              <Text>Name</Text>
              <Text note> Dec 15 </Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody button onPress={() => this.postClicked}>
          <Image source={require('../../images/classico.jpg')}
            style={{height:200, width:null, flex:1}}/>
        </CardItem>
        <CardItem style={{height:45}}>
          <Left>
            <Button transparent>
              <Icon name="ios-heart"
                style={{color:'black'}}/> 
            </Button>
            <Button transparent>
              <Icon name="ios-chatbubbles"
                style={{color:'black'}}/> 
            </Button>
            <Button transparent>
              <Icon name="ios-send"
                style={{color:'black'}}/> 
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{height:35}}>
          <Text>{this.props.likes}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text style={{fontWeight:"900"}}>arturo </Text>
              tioregn ieorngvie anve
              argvn'iefvne'View
              nvoenv ea]Viewenfsoiv'ne shouldComponentUpdate              
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}


export default CardComponent;