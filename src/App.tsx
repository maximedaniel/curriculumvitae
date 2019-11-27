import React, {createRef, Component, RefObject} from 'react';
import {Grid, Sticky, Ref, Segment } from 'semantic-ui-react'
import Side from './side'
import Content from './content';

interface Props{

}
interface State{
  hover: boolean,
  contextRef: RefObject<any>,
  currentSegment: String
}

class App extends  Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false,
      contextRef: createRef(),
      currentSegment: 'experience'
    }
  }
  setCurrentSegment = (newSegment:any) => this.setState({currentSegment: newSegment}, () => {
    console.log('currentSegment', this.state.currentSegment)
  }) 
  render(){
      return (
        <Grid columns={3} divided padded>
          <Grid.Row stretched>
            <Grid.Column width={16}>
              <Segment>1</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
              <Segment>3</Segment>
            </Grid.Column>
          </Grid.Row>
      {/*
      <Grid padded>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={4}>
            <Sticky context={this.state.contextRef} offset={10}>
              <Side currentSegment={this.state.currentSegment}  setCurrentSegment = {this.setCurrentSegment} />
            </Sticky>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={12}>
            <Ref innerRef={this.state.contextRef}>
              <Content currentSegment={this.state.currentSegment} setCurrentSegment = {this.setCurrentSegment}/>
            </Ref>
          </Grid.Column>
        </Grid.Row>
      </Grid>*/}
        </Grid>
    );
  }
}

export default App;
