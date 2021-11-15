import React, { PureComponent } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Segment } from 'semantic-ui-react'

interface Props{
    value: string,
    language: string

}
interface State{

}

class CodeBlock  extends  PureComponent<Props, State> {
  render() {
    const { language, value } = this.props;
    return (
        <Segment>
          <SyntaxHighlighter language={language} style={coy}>
            {value}
           </SyntaxHighlighter>
        </Segment>
    );
  }
}

export default CodeBlock;