import React, { Component }  from 'react';
import { Image, Grid, List, Icon, Label, Header, GridRow, Segment, Table } from 'semantic-ui-react'
import Experience from './experience';
import Education from './education';

interface Props{

}

interface State{
  hover: boolean
}

class Content extends Component<Props, State> {
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
         /*raised={this.state.hover} onMouseEnter={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseOver}*/
        <Grid>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
                <Experience />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
                <Education />
            </Grid.Column>
        </Grid.Row>
        </Grid>
    );
  }
}

export default Content;
