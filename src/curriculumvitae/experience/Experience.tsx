import React, { Component}  from 'react'
import { Image, Grid, Header} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Experience extends Component<Props, State> {
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
      <div id='experience'>
            <Header as='h2'>Experience</Header>
                <Grid padded stretched>
                    
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Lecturer and Researcher
                        <Header.Subheader>
                        Sep 2021 - Now
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/ubc.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Post-doctoral Fellow
                        <Header.Subheader>
                        Oct 2022 - Sept 2023
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Assistant Lecturer and Researcher
                        <Header.Subheader>
                        Sep 2020 - August 2021
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Research Engineer
                        <Header.Subheader>
                        Dec 2018 - March 2020
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        PhD Student
                        <Header.Subheader>
                        Oct 2015 - Nov 2018
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/immersion.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        MSc Student
                        <Header.Subheader>
                        Feb 2015 - Jul 2015
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Experience;
