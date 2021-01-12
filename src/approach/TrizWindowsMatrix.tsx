import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const fontSize = 10

class TrizWindowsMatrix extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#TrizWindowsMatrix');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // Build matrix horizontal
    svg.append("text")
    .attr("x", 0)
    .attr("y", height/3 - height/6)
    .attr("transform", "rotate(-90,"+0+","+ (height/3 - height/6) +")")
    .text("SUPER SYSTEM")
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

    svg.append("line")
    .attr("x1", 0)
    .attr("y1", height/3)
    .attr("x2", width)
    .attr("y2", height/3)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);
    
    svg.append("text")
    .attr("x", 0)
    .attr("y", height/3*2 - height/6)
    .attr("transform", "rotate(-90,"+0+","+ (height/3*2 - height/6) +")")
    .text("SYSTEM")
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

    svg.append("line")
    .attr("x1", 0)
    .attr("y1", height/3*2)
    .attr("x2", width)
    .attr("y2", height/3*2)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    
    svg.append("text")
    .attr("x", 0)
    .attr("y", height - height/6)
    .attr("transform", "rotate(-90,"+0+","+ (height - height/6) +")")
    .text("SUB SYSTEM")
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

    // Build matrix vertical

    svg.append("text")
    .attr("x", width/3 - width/6)
    .attr("y", 0)
    .text("PAST")
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
    
    svg.append("line")
    .attr("x1", width/3)
    .attr("y1", 0)
    .attr("x2", width/3)
    .attr("y2", height)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    svg.append("text")
    .attr("x", width/3 * 2 - width/6)
    .attr("y", 0)
    .text("PRESENT")
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

    svg.append("line")
    .attr("x1", width/3 * 2)
    .attr("y1", 0)
    .attr("x2", width/3 * 2)
    .attr("y2", height)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    svg.append("text")
    .attr("x", width - width/6)
    .attr("y", 0)
    .text("FUTURE")
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
                id="TrizWindowsMatrix"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default TrizWindowsMatrix;
