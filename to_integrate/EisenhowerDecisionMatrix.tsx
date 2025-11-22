import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const fontSize = 10

class EisenhowerDecisionMatrix extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#EisenhowerDecisionMatrix');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    svg.append("line")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", 0)
    .attr("y2", 0)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);
    svg.append("line")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", width)
    .attr("y2", height)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    // Build left legend
    svg.append("text")
    .attr("x", 0 - fontSize)
    .attr("y", height/2)
    .attr("transform", "rotate(-90,"+(- fontSize)+","+ height/2+")")
    .text("IMPORTANCE")
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
    .attr("y", height/4)
    .attr("transform", "rotate(-90,"+0+","+ height/4+")")
    .text("HIGH")
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
    .text("LOW")
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

    // Build absice legend
    svg.append("text")
    .attr("x", width/2)
    .attr("y", height + fontSize)
    .text("URGENCY")
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
    .attr("y", height)
    .text("HIGH")
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
    .attr("x", width/4)
    .attr("y", height)
    .text("LOW")
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

    // Build SCHEDULE
    svg.append("text")
    .attr("x", width/4)
    .attr("y", height/4)
    .text("SCHEDULE")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    svg.append("text")
    .attr("x", width/4)
    .attr("y", height/4)
    .text("Important and not urgent")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    // Build DO
    svg.append("text")
    .attr("x", width/4 * 3)
    .attr("y", height/4)
    .text("DO")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    svg.append("text")
    .attr("x", width/4 * 3)
    .attr("y", height/4)
    .text("Important and urgent")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    // Build ELEMINATE
    svg.append("text")
    .attr("x", width/4)
    .attr("y", height/4 * 3)
    .text("ELEMINATE")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    svg.append("text")
    .attr("x", width/4)
    .attr("y", height/4 * 3)
    .text("Not important and not urgent")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
    
    // Build DELEGATE
    svg.append("text")
    .attr("x", width/4 * 3)
    .attr("y", height/4 * 3)
    .text("DELEGATE")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    svg.append("text")
    .attr("x", width/4 * 3)
    .attr("y", height/4 * 3)
    .text("Not important and urgent")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
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
                id="EisenhowerDecisionMatrix"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default EisenhowerDecisionMatrix;
