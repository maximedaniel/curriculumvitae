import React, { Component }  from 'react'
import { Image, Grid,  Header} from 'semantic-ui-react'

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
      <div id="teaching">
            <Header as='h2'>Teaching</Header>
                <Grid padded>
                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='top'>
                    <Image centered src='img/estia.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                    <Header as='h5'>
                        Internet of Thing Expertise
                        <Header.Subheader>
                          Master 2 | 1h Lecture | 4h Applied Lecture | 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Augmented Virtuality Introduction
                        <Header.Subheader>
                          Master 2 | 1h Lecture | 2018
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Git Initiation
                        <Header.Subheader>
                          Master 2 | 1h Lecture | 2h Applied Lecture | 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Literature Review
                        <Header.Subheader>
                          Master 1 | 1h Lecture | 3h Applied Lecture | 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Microprogrammed Systems
                        <Header.Subheader>
                          Master 1 | 16h Supervised Exercice | 24h Applied Lecture | 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Communicating and Mobile Objects
                        <Header.Subheader>
                          Master 1 | 18h Applied Lecture | 2018
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Event-Oriented Programming
                        <Header.Subheader>
                          Master 1 |  32h Applied Lecture | 2017, 2018
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Object-Oriented Programming
                        <Header.Subheader>
                          Master 1 | 16h Supervised Exercice | 64h Applied Lecture | 2017, 2018, 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Procedural Programming
                        <Header.Subheader>
                          Licence 3 | 44h Applied Lecture | 2016, 2017
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Web Programming
                        <Header.Subheader>
                          Licence 3 | 4h Supervised Exercice | 32h Applied Lecture | 2016, 2017, 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Tutoring the Red Wire Project - Delivery Robot & App 
                        <Header.Subheader>
                          Licence 3 | 28h | 2019
                        </Header.Subheader>
                    </Header>
                    <Header as='h5'>
                        Tutoring Student Projects
                        <Header.Subheader>
                          Master 1 | 20h | 2016, 2017, 2019
                        </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Teaching;
