import React, { Component }  from 'react';
import { Grid, Header} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Methodology extends Component<Props, State> {
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
      <div id='methodology'>
            <Header as='h2'>Workflow</Header>
                <Grid padded>
                    <Grid.Row >
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                    <Header as='h5'>
                        1. Understanding
                        <Header.Subheader>
                        <b>Synthetizing knowledge</b> (Systematic Literature Review)
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                    <Header as='h5'>
                        2. Designing
                        <Header.Subheader>
                            <b>Ideating</b> (Brainstorming, 9-Windows, Biomimicry), <b>Sketching</b> (Autodesk Sketchbook), <b>Modeling</b> (Autodesk Fusion 360, OnShape) and <b>Simulating</b> (Unity3D)
                       </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                    <Header as='h5'>
                        3. Prototyping
                        <Header.Subheader>
                            <b>Manufacturing</b> (3D printing, Laser cutting, Thermoforming), <b>Integrating</b> (Raspberry Pi, Arduino, sensors, actuators), <b>Hardware programming</b> (Python, C), <b>Sofware programming</b> (C++/QT5, Java/JavaFX, Python/PyQT, C/Xamarin), Vision programming (C++/OpenCV) and <b>Web programming</b> (Full Stack Django, Full Stack MERN Javascript) </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                    <Header as='h5'>
                        4. Experimenting
                        <Header.Subheader>
                            <b>Data gathering</b> (structured questionnaires, semi-structured interviews, realtime measurements with sensors) and <b>Statistics computing</b> (R, Python, NumPy, Pandas, SciPy, StatsModels)
                        </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                    <Grid.Column textAlign='left' verticalAlign='middle'>
                    <Header as='h5'>
                        5. Reporting
                        <Header.Subheader>
                        <b>Open sourcing</b> (GitHub, OnShape), <b>Video editing</b> (Adobe After Effect, Blender), <b>Paper writing</b> (LaTeX, Word, Markdown) and <b>Talking</b> (english operational, french native)
                        </Header.Subheader>
                    </Header>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Methodology;
