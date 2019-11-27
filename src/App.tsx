import React, {createRef, Component, RefObject} from 'react';
import {Grid, Sticky, Ref } from 'semantic-ui-react'
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
  setCurrentSegment = (newSegment:any) => this.setState({currentSegment: newSegment}, () =>{
    console.log('currentSegment', this.state.currentSegment)
  }) 
  render(){
      return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={4}>
            <Sticky context={this.state.contextRef} offset={10}>
              <Side currentSegment={this.state.currentSegment}  setCurrentSegment = {this.setCurrentSegment} />
            </Sticky>
          </Grid.Column>
          <Grid.Column width={12}>
            <Ref innerRef={this.state.contextRef}>
              <Content currentSegment={this.state.currentSegment} setCurrentSegment = {this.setCurrentSegment}/>
            </Ref>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
