import React, { Component, createRef }  from 'react';
import { Image, Grid, Header} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
  log: Array<Object>,
  logCount: number,
  once: boolean,
  contextRef: Object
}

class Education extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false,
      log: [],
      logCount: 0,
      once: true,
      contextRef: createRef()

    }
  }
    updateLog = (eventName:any) => () =>
    this.setState((prevState) => ({
      log: [
        `${new Date().toLocaleTimeString()}: ${eventName}`,
        ...prevState.log,
      ].slice(0, 20),
      logCount: prevState.logCount + 1,
    }), () => {
      console.log(`${new Date().toLocaleTimeString()}: ${eventName}`)
    })

  handleOnMouseOver = (event: any) => {
    this.setState({hover: !this.state.hover});
  }

  render = ()  => {
    return (
      <div id='education'>
            <Header as='h2'>Education</Header>
                <Grid padded>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/gouv.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Qualification for Lecturer Position in Computer Science
                        <Header.Subheader>
                        2019 - 2024
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/univbordeaux.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Doctorate in Computer Science
                        <Header.Subheader>
                        2015 - 2018
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/univbordeaux.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Master in Computer Science
                        <Header.Subheader>
                        2013 - 2015
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/ubs.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Licence in Mathematics, Informatics, and Statistics
                        <Header.Subheader>
                        2010 - 2013
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/benjamin-franklin.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Baccalauréat in Economics and Social sciences
                        <Header.Subheader>
                        2010
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Education;
