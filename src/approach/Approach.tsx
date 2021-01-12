import React, {Component} from 'react'
import {Grid, Header, Card, List} from 'semantic-ui-react'
import DiscoveryMatrixHeatMap from './DiscoveryMatrixHeatMap'
import MindMapGraph from './MindMapGraph'
import DoubleDiamondGraph from './DoubleDiamondGraph'
import ScammperrDonutChart from './ScammperrDonutChart'
import BrainWritingGraph from './BrainWritingGraph'
import SwotAnalysisMatrix from './SwotAnalysisMatrix'
import ModelCanvasTreeMap from './ModelCanvasTreeMap'
import EisenhowerDecisionMatrix from './EisenhowerDecisionMatrix'
import TrizWindowsMatrix from './TrizWindowsMatrix'
import SixThinkingHatsGraph from './SixThinkingHatsGraph'
import WhysGraph from './WhysGraph'
import BioStatGvMatrix from './BioStatGvMatrix'
import TheoryCKGraph from './TheoryCKGraph'
import TrochimAnalysisMatrix from './TrochimAnalysisMatrix'
import SystematicLiteratureReviewGraph from './SystematicLiteratureReviewGraph'
import {ParentSize} from '@vx/responsive'

interface Props{
}

interface State{
}

class Approach extends  Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {

    };
  }

  render(){
      return (
      <Grid padded stackable>
        <Grid.Row width={16}>
          <Grid.Column width={16}  textAlign='center'>
                <Header as="h1">
                    Personal Tools for HCI Research
                </Header>
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    1. Vision
                  </Header.Content>
                  <Header.Subheader>
                    How do you envision HCI in the future?
                  </Header.Subheader>
                </Header>
                {/*<p><b>Example:</b> I envision Programmable Matter.
                Programmable Matter is defined as a cyber-physical conjugation. This technology would enable a synthetic reality; an environment in which all the objects in a users environment (including the ones inserted by the computer) are physically realized.
                Programmable Matter promises to bridge the gap between the physicality of Tangible User Interfaces (TUIs) and the flexibility of Graphical User Interfaces (GUIs).
                </p>*/}
          </Grid.Column>
          
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>TRIZ 9-windows
                      </Card.Header>
                      <Card.Meta>Genrich Altshuller (1984)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <TrizWindowsMatrix
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    2. Challenge
                  </Header.Content>
                  <Header.Subheader>
                    What does challenge the advent of this vision?
                  </Header.Subheader>
                </Header>
                {/*<p><b>Example:</b> Need to demonstrate the feasability, utility and usability <i>in situ</i> of new form factors for Shape-Changing Interfaces.
                </p>*/}
          </Grid.Column>
          
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>SWOT Analysis
                      </Card.Header>
                      <Card.Meta>George Albert Smith and C Roland Christiensen (1960)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <SwotAnalysisMatrix 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    3. State of the Art
                  </Header.Content>
                  <Header.Subheader>
                    What are the current answers for these challenges?
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Systematic Literature Review : PRISMA statement
                      </Card.Header>
                      <Card.Meta>British Design Council (2009)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <SystematicLiteratureReviewGraph 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    4. Hypothesis
                  </Header.Content>
                  <Header.Subheader>
                    Could you innovatively answer these challenges?
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Double Diamond
                      </Card.Header>
                      <Card.Meta>British Design Council (2005)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <DoubleDiamondGraph 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Discovery Matrix
                      </Card.Header>
                      <Card.Meta>Moher (1954)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <DiscoveryMatrixHeatMap 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>C-K Theory
                      </Card.Header>
                      <Card.Meta>A. Hatchuel and B. Weil (2003)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <TheoryCKGraph
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>SCAMMPERR
                      </Card.Header>
                      <Card.Meta>Michael Michalko (2002)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <ScammperrDonutChart 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>6-3-5 Brainwriting
                      </Card.Header>
                      <Card.Meta>Bernd Rohrbach (1968)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <BrainWritingGraph 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>MindMap
                      </Card.Header>
                      <Card.Meta>Tony Buzan (1974)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <MindMapGraph 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>5 Whys
                      </Card.Header>
                      <Card.Meta>Sakichi Toyoda (1930)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <WhysGraph 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Six Thinking Hats
                      </Card.Header>
                      <Card.Meta>Edward de Bono (1985)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <SixThinkingHatsGraph
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    5. Design
                  </Header.Content>
                  <Header.Subheader>
                    Biomimetism, Persona, Scenario, User story, UserBoarding, StoryTelling
                    Sketchnoting, Sketching, Simulating, Rapid prototyping, Iterative prototyping
                  </Header.Subheader>
                </Header>
          </Grid.Column>

          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    6. Experimentation
                  </Header.Content>
                  <Header.Subheader> 
                    Questionnaire (New Ecological Paradigm (NEP), User Experience Questionnaire (UEQ-S), Product Emotion (PrEmo), System Usability Scale (SUS), User experience (AttrakDiff), Single Ease Question (SEQ), NASA Task Load Index (NASA-TLX)
                    Semi-structured Interview  (Predefined thematic to talk about that the user engage randomly)
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    7. Analysis
                  </Header.Content>
                  <Header.Subheader>
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Descriptive Statistics Matrix
                      </Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <TrochimAnalysisMatrix
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Inferential Statistic Matrix
                      </Card.Header>
                      <Card.Meta>BiostaTGV (2020)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <BioStatGvMatrix 
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>

          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    8. Dissemination
                  </Header.Content>
                  <Header.Subheader>
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
            <Card fluid>
                    <Card.Content>
                      <Card.Header>CHI Paper Guidelines
                      </Card.Header>
                      <Card.Meta>Maxime Daniel</Card.Meta>
                      <Card.Description textAlign='left'>
                        <List>
                          <List.Item>
                            <List.Header>1. Abstract</List.Header>
                            <List.List as='ol' style={{marginTop:'0.5rem'}}>
                              <List.Item as='li'>Write a fairly-specific, overarching statement about the problem domain – (1 sentence): e.g., Narrative visualisations are increasingly used for visualizing sports stories. Or, Food decision-making has been studied in the context of grocery shopping...</List.Item>
                              <List.Item as='li'>State the problem connected to the above statement — what has not been done/known (and why it is important) – (1 sentence + the importance is optional): e.g., Yet, [some particular aspect] has not been looked at and this is important because … Or, However, [some aspects] have not been considered to help practitioners make decisions regarding...</List.Item>
                              <List.Item as='li'>State your method/solution to the above problem with some specific details – (1-2 sentences): e.g., To address these shortcomings, we conducted a card-sorting study by [doing this and this]… Or, We designed [some interface] based on studying people in their work contexts...</List.Item>
                              <List.Item as='li'>State your contributions/what you found – (1-2 sentences): e.g., Based on our analysis, we present a design space of ... Or, We found that our participants performed better on [interface A] than that on [interface B]...</List.Item>
                              <List.Item as='li'>State how your results or contributions can be useful – (1 sentence – optional): e.g., Our results have useful implications for how technology should be designed to support the grocery shopping experience... Or, Our characterisation can be used to understand how this process works...</List.Item>
                            </List.List>
                          </List.Item>
                          <List.Item>
                            <List.Header>2. Introduction</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>3. Motivation</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>4. Related Work</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>5. Concept</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>6. Implementation</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>7. Use cases</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>8. User study</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>9. Discussion</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>10. Perspectives</List.Header>
                          </List.Item>
                          <List.Item>
                            <List.Header>11. Conclusion</List.Header>
                          </List.Item>
                        </List>
                      </Card.Description>
                    </Card.Content>
                  </Card> 
          </Grid.Column>
          <Grid.Column width={16} style={{paddingTop:'1rem'}} textAlign='left'>
                <Header as="h2">
                  <Header.Content>
                    Others tools
                  </Header.Content>
                  <Header.Subheader>
                  </Header.Subheader>
                </Header>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
            <Card fluid>
                    <Card.Content>
                      <Card.Header>Eisenhower Decision Matrix
                      </Card.Header>
                      <Card.Meta>Dwight D. Eisenhower (1960)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <EisenhowerDecisionMatrix
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card> 
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8} style={{paddingTop:'1rem'}} textAlign='center'>
                <Card fluid>
                    <Card.Content>
                      <Card.Header>Business Model Canvas
                      </Card.Header>
                      <Card.Meta>Alexander Osterwalder (2008)</Card.Meta>
                      <Card.Description>
                      <ParentSize>
                          {parent => (
                              <ModelCanvasTreeMap
                                  width={parent.width}
                                  height={300}
                                  parentRef={parent.ref}
                              />
                          )}
                      </ParentSize>
                      </Card.Description>
                    </Card.Content>
                  </Card>      
          </Grid.Column>
          
        </Grid.Row>
      </Grid>
    );
  }
}

export default Approach;
