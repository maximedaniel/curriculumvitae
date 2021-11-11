// @ts-nocheck
import React, {Component} from 'react'
import {Grid, Segment} from 'semantic-ui-react'
import Markdown from 'react-markdown'
import ReactMarkdown from 'react-markdown'

import CodeBlock from "./codeblock/CodeBlock"
//import "./Zotero.css"
import { Image, Header } from 'semantic-ui-react'
import ImgBlock from './ImgBlock/ImgBlock'

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
                        
            {/* <Markdown
              children={this.state.content}
              components={{
                code: CodeBlock,
                img: ImgBlock, 
                // Map `h1` (`# heading`) to use `h2`s.
                h1: 'h2',
                // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                em: ({node, ...props}) => <i style={{color: 'red'}} {...props} />
              }}
            /> */}
            <Markdown 
                escapeHtml={true}

                source={this.state.content}
                renderers={{
                 heading: ({node, ...props}) => <Header as={`h${props.level}`} textAlign={props.level == 1 ? 'center': undefined} {...props}/>,
                 code: CodeBlock,
                  image: ImgBlock, 
                }}
                className="markdown-body"
            />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Zotero;
