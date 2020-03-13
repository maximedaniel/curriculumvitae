import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'
import Markdown from 'react-markdown'
import CodeBlock from "./codeblock/CodeBlock"
import "./Zotero.css"

interface Props{

}

interface State{
    content: string
}

class Zotero extends  Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
        content: ''
    }
  }

  componentDidMount(){
      fetch('markdown/zotero.md')
      .then((response) => response.text())
      .then((text) => this.setState({ content: text }));
  }

  render(){
      return (
      <Grid padded stackable centered>
        <Grid.Row>
            <Grid.Column width={10} centered >
                <Markdown 
                escapeHtml={false}
                source={this.state.content}
                renderers={{code: CodeBlock}}
                className="markdown-body"
                />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Zotero;
