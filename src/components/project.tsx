import React, { Component }  from 'react';
import { Grid, Header, Card, Embed} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Project extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false
    }
  }

  handleOnMouseOver = (event: any) => {
    this.setState({hover: !this.state.hover});
  }
  
  updateLog = () => {
    console.log("onTopPassed Project !");
  }

  render = ()  => {
    return (
      <div id='project'>
            <Header as='h2'>Projects</Header>
                <Grid padded>
                    <Grid.Row >
                    <Grid.Column width={16} verticalAlign='top'>
                    <Card.Group centered>
                    <Card>
                      <Embed id='wZ_3CtDllbA'  iframe={{allowFullScreen: true}} placeholder='/img/cairnform.jpg' source='youtube'/>
                      <Card.Content>
                        <Card.Header>CairnFORM</Card.Header>
                        <Card.Meta>
                            <span className='date'>Oct 2015 - Nov 2018</span>
                        </Card.Meta>
                        <Card.Description>
                        <b>Keywords:</b> Programmable Matter, Shape-Changing Interfaces; Energy Demand Side-Management; Workplace.<br></br>
                        <b>Abstract:</b> CairnFORM is a stack of expandable illuminated rings for display that can change of cylindrical shape (e.g., cone, double cone, cylinder). We show that cylindrical shape change can be used (1) for informing users around the display through data physicalization, (2) for unobtrusively notifying users around the display through peripheral interaction, (3) for offering a greater user experience over time than a traditional flat display with no shape change.
                        </Card.Description>
                        </Card.Content>
                    </Card>
                    <Card>
                      <Embed id='153599331'  iframe={{allowFullScreen: true}} placeholder='/img/eeg.png' source='vimeo'/>
                        <Card.Content>
                        <Card.Header>EEG EvTool</Card.Header>
                        <Card.Meta>
                            <span className='date'>Feb 2015 - Jul 2015</span>
                        </Card.Meta>
                        <Card.Description>
                        <b>Keywords:</b> HCI Evaluation; Electroencephalography; Workload; Attention; Interaction errors.<br></br>
                        <b>Abstract:</b> EEG EvTool is a tool for continuously estimating the user's mental workload, attention and recognition of interaction errors during different interaction tasks. We (1) validate these measures on a controlled virtual environment and (2) show how they can be used to compare different interaction techniques or devices.
                        </Card.Description>
                        </Card.Content>
                    </Card>
                    </Card.Group>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Project;
