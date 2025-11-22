import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
//const textStrokeWidth = 4
//const circleWidth = 8
const fontSize = 10

class SwotAnalysisMatrix extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#SwotAnalysisMatrix');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var marginText = 10;
    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Build abscisse
    svg.append("line")
    .attr("x1", 0)
    .attr("y1", height/2)
    .attr("x2", width)
    .attr("y2", height/2)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    // Build left legend
    svg.append("text")
    .attr("x", 0)
    .attr("y", height/4)
    .attr("transform", "rotate(-90,"+0+","+ height/4+")")
    .text("INTERNAL")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .attr("x", 0)
    .attr("y", height/4 * 3)
    .attr("transform", "rotate(-90,"+0+","+ height/4 * 3+")")
    .text("EXTERNAL")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    
    
    // Build top legend
    svg.append("text")
    .attr("x", width/4)
    .attr("y", 0)
    .text("HELPFUL")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .attr("x", width/4 * 3)
    .attr("y", 0)
    .text("HARMFUL")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    // Build central legend
    svg.append("text")
    .attr("x", width/2 - marginText)
    .attr("y", height/2 - marginText)
    .text("STRENGTH")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .attr("x", width/2 + marginText)
    .attr("y", height/2 - marginText)
    .text("WEAKNESSES")
    .attr("fill", "white")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    
    svg.append("text")
    .attr("x", width/2 - marginText)
    .attr("y", height/2 + marginText)
    .text("OPPORTUNITIES")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "central")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .attr("x", width/2 + marginText)
    .attr("y", height/2 + marginText)
    .text("THREATS")
    .attr("fill", "white")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "central")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");


    // Build ordonate
    svg.append("line")
    .attr("x1", width/2)
    .attr("y1", 0)
    .attr("x2", width/2)
    .attr("y2", height)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);
  }

  componentDidMount(){
      this.draw();
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevProps.width !== this.props.width) {
        this.draw();
    }
  }

  render(){
      return (
                <svg 
                id="SwotAnalysisMatrix"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default SwotAnalysisMatrix;
