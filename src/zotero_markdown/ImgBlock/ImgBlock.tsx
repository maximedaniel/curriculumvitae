import React, { PureComponent } from "react"
import { Image } from 'semantic-ui-react'

interface Props{
    alt: string
    src: string

}
interface State{
    size: string
}

class ImgBlock  extends  PureComponent<Props, State> {
  render() {
    const { alt, src } = this.props;
    var view = <Image alt={alt}  src={src}/> 
    var parameters:string[] = src.split('#')[1].split('-')

    type Size = "big" | "small" | "mini" | "tiny" | "medium" | "large" | "huge" | "massive" | undefined
    console.log(parameters, parameters.includes("centered"))
    if(parameters !== undefined && parameters.length > 0){
        view = 
        <p style={parameters.includes("centered")?{textAlign: 'center'}:undefined} >
        <Image 
        size={parameters[0] as Size} 
        spaced={parameters.includes("spaced")} 
        wrapped={parameters.includes("wrapped")} 
        centered={parameters.includes("centered")} 
        alt={alt}
        src={src}/> 
        </p>
    }

    return (
        view
    );
  }
}

export default ImgBlock;