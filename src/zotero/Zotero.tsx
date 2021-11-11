// @ts-nocheck
import React, {createRef, Component, RefObject} from 'react'
import {Grid, Sticky, Ref, Image, Responsive, Header, List, Visibility, Segment, Form, Radio, Button, Message} from 'semantic-ui-react'


interface Props{

}

interface State{
  hover: boolean,
  contextRef: RefObject<any>,
  currentSegment: String,
  stickyActive: boolean

}

class Zotero extends  Component<Props, State> {

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

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setCurrentSegment("introduction");
  }
  

  handleSubmit = (e) => {
    // alert('Le nom a été soumis : ' + this.state.value);
    // event.preventDefault();
    // console.log(e.target.value);
  }

  handleChange = (e) => {
    console.log(e.target.value);
    // this.setState({ value })
  }
  render(){
      return (
      <Grid padded stackable>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={4} >
            <Responsive fireOnMount as={Sticky}  active={this.state.stickyActive} context={this.state.contextRef} offset={10} onUpdate={this.handleOnUpdate}>
            <Grid>
              <Grid.Row centered>
                  <Grid.Column textAlign='center' width={16}>
                    <Image src='/img/zotero/zotero-logo.png' size='small' centered/>
                    
                  <Header as='h3'>
                      <Header.Content>
                        A Software for Literature Management
                        {/* <Header.Subheader>Tutorial</Header.Subheader> */}
                      </Header.Content>
                  </Header>
                  </Grid.Column>
              </Grid.Row>
             <Grid.Row centered>
                   {/* <Grid.Column textAlign='center' mobile={14} tablet={14} computer={14} widescreen={8}>
                      <Scrollspy />
                  </Grid.Column>  */}
              </Grid.Row>
              <Responsive as={Grid.Row} minWidth={768} centered columns={2}>
                  <Grid.Column textAlign='left' mobile={16} tablet={13} computer={10}>
                    <Header as='h5' textAlign='center'>Tutorial</Header>
                    <List ordered link>
                      
                      <List.Item as='a' href="#introduction"  active={this.isSegmentActice("introduction")}  onClick={() => this.setCurrentSegment('introduction')}>Introduction</List.Item>
                      <List.Item as='a' href="#gettingstarted"  active={this.isSegmentActice("gettingstarted")}  onClick={() => this.setCurrentSegment('gettingstarted')}>Getting Started</List.Item>
                      <List.Item as='a' href="#gather"   active={this.isSegmentActice("gather")}   onClick={() => this.setCurrentSegment('gather')}>Gather Literature</List.Item>
                      <List.Item as='a' href="#annotate"    active={this.isSegmentActice("annotate")}    onClick={() => this.setCurrentSegment('annotate')}>Annotate Literature</List.Item>
                      <List.Item as='a' href="#organize" active={this.isSegmentActice("organize")} onClick={() => this.setCurrentSegment('organize')}>Organize Literature</List.Item>
                      <List.Item as='a' href="#export"   active={this.isSegmentActice("export")} onClick={() => this.setCurrentSegment('export')}>Export Literature</List.Item>
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
                    <div id="introduction"  key="introduction">
                          <Header as='h2'>1. Introduction</Header>
                          <p>
                            Zotero is a free bibliography management tool with <a href={"https://guides.library.upenn.edu/citationmgmt"}>approximatively the same features</a> as proprietary ones  (e.g., <a href={"https://www.mendeley.com/"}>Mendeley</a>, <a href={"https://endnote.com/"}>EndNote</a>, <a href={"https://refworks.proquest.com/"}>RefWorks</a>). In this tutorial, you will use Zotero to:
                          </p>
                          <List bulleted>
                            <List.Item><strong>Gather</strong> literature data (references, PDFs, web pages) in one place</List.Item>
                            <List.Item><strong>Annotate</strong> literature data with notes and markers</List.Item>
                            <List.Item><strong>Organize</strong> literature data using (sub-)directories and (sub-)groups</List.Item>
                            <List.Item><strong>Export</strong> litterature data for Latex and Word (e.g., BibTex, CSV, Word)</List.Item>
                          </List>
                    </div>
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
                  <div id="gettingstarted" key="gettingstarted">
                        <Header as='h2'>2. Getting Started</Header>

                        <List ordered>
                            <List.Item><u>Register</u> a Zotero user account (<a href={"https://www.zotero.org/user/register/"}>https://www.zotero.org/user/register/</a>)</List.Item>
                            <List.Item>
                              <u>Download and Install</u> <em>Zotero 5.0 for Windows</em> <u>and</u> <em>Zotero Connector for Chrome</em> (<a href={"https://www.zotero.org/download/"}>https://www.zotero.org/download/</a>)
                            </List.Item>
                          </List>
                  </div>

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
                  <div id="gather"  key="gather">
                        <Header as='h2'>3. Gather</Header>
                        <List ordered>
                            <List.Item><u>Open</u> Zotero</List.Item>
                            <List.Item><u>Create</u> a new collection</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-0.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>   
                            <List.Item><u>Drag-n-Drop</u> existing PDFs</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-1.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Open</u> Google Chrome</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-2.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Enter</u> your search strings into Google Scholar</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-3.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Save</u> your search results using Zotero Connector</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-4.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Go to</u> Zotero and see the results</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16} >
                                            <Segment>
                                              <Image fluid src="/img/zotero/gather-5.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                          </List>
                  </div>

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

                  <div id="annotate"  key="annotate">
                        <Header as='h2'>4. Annotate</Header>
                        <List ordered>
                            <List.Item><u>Create</u> a note for an article of your collection</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/annotate-0.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>   
                            <List.Item><u>Fill</u> the note and see the results</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/annotate-1.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                          </List>
                  </div>
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

                  <div id="organize" key="organize">
                        <Header as='h2'>5. Organize</Header>
                        <List ordered>
                            <List.Item><u>Create</u> a subcollection to your collection</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/organize-0.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>   
                            <List.Item><u>Drag-n-Drop</u> articles of your choice into the subcollection</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/organize-1.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Select</u> the subcollection and see the results</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/organize-2.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                             
                          </List>
                  </div>
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
                  <div id="export" key="export">
                        <Header as='h2'>6. Export</Header>
                        <List ordered>
                            <List.Item><u>Enable</u> Zotero Word for Windows Integration</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-0.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>   
                            <List.Item><u>Open</u> Microsoft Word</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-1.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <List.Item><u>Configure</u> Zotero integration into Microsoft Word</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-2.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                             
                            <List.Item><u>Add</u> citations into Microsoft Word</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-3.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid>  
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-4.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid> 
                            <List.Item><u>Insert</u> bibliography at cursor position into Microsoft Word</List.Item>
                            <Grid padded>       
                              <Grid.Row>
                                  <Grid.Column computer={12} tablet={16} mobile={16}>
                                            <Segment>
                                              <Image fluid src="/img/zotero/export-5.png" />
                                            </Segment>
                                  </Grid.Column>
                              </Grid.Row> 
                            </Grid> 
                          </List>
                  </div>
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

                  <div id="questions"  key="questions">
                  <Form  success={this.state.correctQuestion0 === true}  error={this.state.correctQuestion0 === false} onSubmit={
                    (e) => {
                      e.preventDefault();
                      var answerQuestion0 = '0';
                      if(this.state.choiceQuestion0 !== undefined){
                        this.setState({correctQuestion0: this.state.choiceQuestion0 === answerQuestion0})
                      }
                      
                    }
                  }
                  >
                    <Form.Field>
                      Select the right answer:
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label='Choose this'
                        name='radioGroup'
                        value='0'
                        checked={this.state.choiceQuestion0 === '0'}
                        onChange={(e, {value})  => this.setState({choiceQuestion0: value})}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label='Or that'
                        name='radioGroup'
                        value='1'
                        checked={this.state.choiceQuestion0 === '1'}
                        onChange={(e, {value})  => this.setState({choiceQuestion0: value})}
                      />
                    </Form.Field>
                    {
                      this.state.correctQuestion0 === true ? 
                        <Message
                            success
                            header='Correct answer!'
                            content="You're all signed up for the newsletter"
                          /> : 
                        <Message
                          error
                          header='Wrong answser!'
                          content='You can only sign up for an account once with a given e-mail address.'
                        />
                    }
                    <Button type='submit' disabled={this.state.choiceQuestion0===undefined || this.state.choiceQuestion0===''}>Submit</Button>
                  </Form>
                  </div>
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

export default Zotero;
