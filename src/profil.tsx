import React, { Component }  from 'react';
import { Image, Grid, List, Icon, Label, Header, GridRow, Segment } from 'semantic-ui-react'

interface Props{

}
interface State{
  hover: boolean
}

class Profil extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false
    }
  }

  handleOnMouseOver = (event: any) => {
    this.setState({hover: !this.state.hover});
  }

  render = ()  => {
    return (
      <Segment raised={this.state.hover} onMouseEnter={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseOver}>
        <Grid>
        <Grid.Row centered>
            <Grid.Column textAlign='center' width={16}>
              <Image circular src='/img/profil0.jpg' size='small' centered/>
            <Header as='h3'>
                <Header.Content>
                  Maxime DANIEL
                  <Header.Subheader>PhD in Computer Science</Header.Subheader>
                </Header.Content>
            </Header>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='center' width={16}>
            <List>
                <List.Item>
                  <List.Icon name='inbox'   flipped='horizontally'/>
                  <List.Content>maxaxeldaniel[at]gmail.com</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='phone' flipped='horizontally' />
                  <List.Content>+33 (0)6 98 41 24 84</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='map marker alternate'  flipped='horizontally' />
                  <List.Content>Biarritz, France</List.Content>
                </List.Item>
              </List>
              
              <Label as='a' onClick= {() => window.open("https://github.com/maximedaniel", "_blank")}>
                <Icon name='github' />
                Github
              </Label>
              <Label as='a' onClick= {() => window.open("https://www.youtube.com/channel/UCX7uHVWqJ6TxoQnIXhVZ2gw", "_blank")}>
              <Icon name='youtube' />
              Youtube
            </Label>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Profil;
