import React, { Component}  from 'react';
import { Grid, Visibility} from 'semantic-ui-react'
import Experience from './experience';
import Education from './education';
import Teaching from './teaching';
import Project from './project';
import Publication from './publication';
import Methodology from './methodology';

interface Props{
    currentSegment: String,
    setCurrentSegment: Function

}

interface State{

}

class Content extends Component<Props, State> {
  constructor(props: any){
    super(props);
  }
  
  handleUpdate = (event: any, update:any) => {
      let p = Math.round(update.calculations.percentagePassed *100);
      let newSegment = update.children.key;
      if(p > 0 && this.props.currentSegment!==newSegment){
        this.props.setCurrentSegment(newSegment);
      }
  } 
  
  render = ()  => {
    return (
        <Grid>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                    <Experience key='experience'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                    <Education key='education'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                    <Teaching key='teaching'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
      
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                    <Project key='project'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                    <Publication key='publication'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column textAlign='left' width={16}>
            <Visibility
                continuous={true}
                once={false}
                onUpdate={this.handleUpdate}
            >
                <Methodology key='methodology'/>
            </Visibility>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    );
  }
}

export default Content;
