import React, {createRef, Component, RefObject} from 'react'
import {Grid, Sticky, Ref, Image, Responsive, Header, List, Visibility} from 'semantic-ui-react'
import Experience from './experience/Experience'
import Education from './education/Education'
import Teaching from './teaching/Teaching'
import Project from './project/Project'
import Publication from './publication/Publication'
import Methodology from './methodology/Methodology'
import Review from './review/Review'
import Scrollspy from './scrollspy/Scrollspy'

interface Props{

}

interface State{
  hover: boolean,
  contextRef: RefObject<any>,
  currentSegment: String,
  stickyActive: boolean

}

class Curriculumvitae extends  Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false,
      stickyActive: false,
      contextRef: createRef(),
      currentSegment: 'experience'
    }
  }
  setCurrentSegment = (newSegment:any) => this.setState({currentSegment: newSegment}); 

  handleOnUpdate = (event:any, size:any) => {
    this.setState({stickyActive: size.width > 767});
  };

  isSegmentActice = (key:String) => this.state.currentSegment === key;

  handleSegmentActivation = (event: any, update:any) => {
      let p = Math.round(update.calculations.percentagePassed *100);
      let newSegment = update.children.key;
      if(p > 0 && this.state.currentSegment!==newSegment){
        this.setCurrentSegment(newSegment);
      }
  };
  render(){
      return (
      <Grid padded stackable>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={4} >
            <Responsive fireOnMount as={Sticky}  active={this.state.stickyActive} context={this.state.contextRef} offset={10} onUpdate={this.handleOnUpdate}>
            <Grid>
              <Grid.Row centered>
                  <Grid.Column textAlign='center' width={16}>
                    <Image circular src='/img/profil0.jpg' size='small' centered/>
                    
                  <Header as='h3'>
                      <Header.Content>
                        Maxime DANIEL
                        <Header.Subheader>PhD in Computer Science</Header.Subheader>
                      </Header.Content>
                  </Header>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row centered>
                  <Grid.Column textAlign='center' mobile={14} tablet={14} computer={14} widescreen={8}>
                      <Scrollspy />
                  </Grid.Column>
              </Grid.Row>
              <Responsive as={Grid.Row} minWidth={768} >
                  <Grid.Column textAlign='center' width={16}>
                    <Header as='h5'>Curriculum vitæ</Header>
                    <List link>
                      <List.Item as='a' href="#experience"  active={this.isSegmentActice("experience")}  onClick={() => this.setCurrentSegment('experience')}>Experience</List.Item>
                      <List.Item as='a' href="#education"   active={this.isSegmentActice("education")}   onClick={() => this.setCurrentSegment('education')}>Education</List.Item>
                      <List.Item as='a' href="#teaching"    active={this.isSegmentActice("teaching")}    onClick={() => this.setCurrentSegment('teaching')}>Teaching</List.Item>
                      <List.Item as='a' href="#publication" active={this.isSegmentActice("publication")} onClick={() => this.setCurrentSegment('publication')}>Publications</List.Item>
                      <List.Item as='a' href="#methodology"   active={this.isSegmentActice("methodology")} onClick={() => this.setCurrentSegment('methodology')}>Workflow</List.Item>
                      <List.Item as='a' href="#project"     active={this.isSegmentActice("project")}     onClick={() => this.setCurrentSegment('project')}>Projects</List.Item>
                      <List.Item as='a' href="#review"     active={this.isSegmentActice("review")}     onClick={() => this.setCurrentSegment('review')}>Reviews</List.Item>
                      </List>
                  </Grid.Column>
              </Responsive>
              </Grid>
            </Responsive>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={12}>
            <Ref innerRef={this.state.contextRef}>
            <Grid>
              <Grid.Row centered>
                  <Grid.Column textAlign='left' width={16}>
                  <Visibility
                      continuous={true}
                      once={false}
                      onUpdate={this.handleSegmentActivation}
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
                      onUpdate={this.handleSegmentActivation}
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
                      onUpdate={this.handleSegmentActivation}
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
                      onUpdate={this.handleSegmentActivation}
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
                      onUpdate={this.handleSegmentActivation}
                  >
                      <Methodology key='methodology'/>
                  </Visibility>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row centered>
                  <Grid.Column textAlign='left' width={16}>
            
                  <Visibility
                      continuous={true}
                      once={false}
                      onUpdate={this.handleSegmentActivation}
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
                      onUpdate={this.handleSegmentActivation}
                  >
                          <Review key='review'/>
                  </Visibility>
                  </Grid.Column>
              </Grid.Row>
              </Grid>
            </Ref>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Curriculumvitae;
