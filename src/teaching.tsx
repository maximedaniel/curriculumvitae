import React, { Component }  from 'react';
import { Image, Grid, List, Icon, Label, Header, GridRow, Segment, Table } from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Teaching extends Component<Props, State> {
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
      <Segment>
            <Header as='h2'>Education</Header>
                <Grid padded>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
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
      </Segment>
    );
  }
}

export default Teaching;
