import React, { Component }  from 'react';
import { Icon, Image, Grid, Header, Menu} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Publication extends Component<Props, State> {
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
      <div id='publication'>
            <Header as='h2'>Publications</Header>
                <Grid padded>

                    <Grid.Row>
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/chi22.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                         William Delamare, <b>Maxime Daniel</b>, and Khalad Hasan. 2022. MultiFingerBubble: A 3D Bubble Cursor Variation for Dense Environments. <i>In Extended Abstracts of the 2022 CHI Conference on Human Factors in Computing Systems (CHI EA '22)</i>. ACM, New York, NY, USA, Article 453, 1–6.
                        <Menu.Item
                          href="pdf/delamare2022multifingerbubble.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/tei21.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b> and Guillaume Rivière. 2021. Exploring Axisymmetric Shape-Change's Purposes and Allure for Ambient Display: 16 Potential Use Cases and a Two-Month Preliminary Study on Daily Notifications. <i>In Proceedings of the 15th International Conference on Tangible, Embedded, and Embodied Interaction (TEI '21)</i>. ACM, New York, NY, USA, Article 47, 1–6.
                        <Menu.Item
                          href="pdf/daniel2021exploring.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/tei19.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>, Guillaume Rivière, and Nadine Couture. 2019. CairnFORM: a Shape-Changing Ring Chart Notifying Renewable Energy Availability in Peripheral Locations. <i>In Proceedings of the 13th International Conference on Tangible, Embedded, and Embodied Interaction (TEI '19)</i>. ACM, New York, NY, USA, 275-286.
                        <Menu.Item
                          href="pdf/daniel2019cairnform.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/univbordeaux.jpg' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>. 2018. Shape-changing cylindrical displays: Application to data physicalization and peripheral interaction for energy demande-side management (PhD thesis). University of Bordeaux, France.
                        <Menu.Item
                          href="pdf/daniel2018thesis.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/tei18.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>, Guillaume Rivière, and Nadine Couture. 2018. Designing an Expandable Illuminated Ring to Build an Actuated Ring Chart. <i>In Proceedings of the 12th International Conference on Tangible, Embedded, and Embodied Interaction (TEI '18)</i>. ACM, New York, NY, USA, 140-147.
                        <Menu.Item
                          href="pdf/daniel2018designing.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/ihm17.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>, Guillaume Rivière, and Nadine Couture. 2017. CAIRNS: an Ambient Tangible Interface for Shifting Energy Demand at Work. <i>In Proceedings of the 29th Conference on l'Interaction Homme-Machine (IHM '17)</i>. ACM, New York, NY, USA, 221-231.
                        <Menu.Item
                          href="pdf/daniel2017cairns.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/ihm16.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>, Guillaume Rivière, and Nadine Couture. 2016. Persuasive Interactive Systems in public and collective spaces: what Role for Tangible Interfaces ?. <i>In Actes de la 28ième conférence francophone sur l'Interaction Homme-Machine (IHM '16)</i>. ACM, New York, NY, USA, 221-229.
                        <Menu.Item
                          href="pdf/daniel2016persuasive.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/ihm16.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        <b>Maxime Daniel</b>, Guillaume Rivière, Nadine Couture, and Stéphane Kreckelbergh. 2016. An Analysis of Persuasive Technologies for Energy Demand Side Management. <i>In Actes de la 28ième conférence francophone sur l'Interaction Homme-Machine (IHM '16)</i>. ACM, New York, NY, USA, 197-210.
                        <Menu.Item
                          href="pdf/daniel2016analysis.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row >
                    <Grid.Column mobile={6} tablet={3} computer={2} verticalAlign='middle'>
                    <Image centered src='img/chi16.png' size= 'tiny'/>
                    </Grid.Column>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                        Jérémy Frey, <b>Maxime Daniel</b>, Julien Castet, Martin Hachet, and Fabien Lotte. 2016. Framework for Electroencephalography-based Evaluation of User Experience. <i>In Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems (CHI '16)</i>. ACM, New York, NY, USA, 2283-2294.
                        <Menu.Item
                          href="pdf/frey2016framework.pdf"
                          link
                        >
                          <Icon link name="file pdf outline"/>
                        </Menu.Item>
                     </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Publication;
