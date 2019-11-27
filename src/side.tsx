import React, { Component }  from 'react';
import { Image, Grid, List, Icon, Label, Header, Segment } from 'semantic-ui-react'

interface Props{
  currentSegment: String,
  setCurrentSegment: Function
}

interface State{

}

class Side extends Component<Props, State> {
  constructor(props: any){
    super(props);
  }


  isActice = (key:String) => this.props.currentSegment === key;
  render = ()  => {
    return (
      /*raised={this.state.hover} onMouseEnter={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseOver}*/
      <Segment>
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
                  <List.Icon name='inbox'  flipped='horizontally'/>
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
        <Grid.Row>
            <Grid.Column textAlign='center' width={16}>
              <Header as='h5'>Sommaire</Header>
              <List link>
                <List.Item as='a' href="#experience"  active={this.isActice("experience")}  onClick={() => this.props.setCurrentSegment('experience')}>Experience</List.Item>
                <List.Item as='a' href="#education"   active={this.isActice("education")}   onClick={() => this.props.setCurrentSegment('education')}>Education</List.Item>
                <List.Item as='a' href="#teaching"    active={this.isActice("teaching")}    onClick={() => this.props.setCurrentSegment('teaching')}>Teaching</List.Item>
                <List.Item as='a' href="#project"     active={this.isActice("project")}     onClick={() => this.props.setCurrentSegment('project')}>Projects</List.Item>
                <List.Item as='a' href="#publication" active={this.isActice("publication")} onClick={() => this.props.setCurrentSegment('publication')}>Publications</List.Item>
                <List.Item as='a' href="#methodology"   active={this.isActice("methodology")} onClick={() => this.props.setCurrentSegment('methodology')}>Workflow</List.Item>
              </List>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Side;
