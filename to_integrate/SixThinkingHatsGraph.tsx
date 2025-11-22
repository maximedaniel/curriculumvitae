import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const textStrokeWidth = 4
const circleWidth = 8
const fontSize = 10

class SixThinkingHatsGraph extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#SixThinkingHatsGraph');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    var radius = Math.min(width, height) / 2 - margin.top;
    var originX = width/2;
    var originY = height/2;
    var nodes = [
        {id:'User 1', color:'white', header:'FACTS', subheader:'Neutral Objectivity'},
        {id:'User 2', color:'red', header:'EMOTION', subheader:'Emotional View'},
        {id:'User 3', color:'yellow', header:'BENEFIT', subheader:'Logicial Positive'},
        {id:'User 4', color:'green', header:'IDEAS', subheader:'Creativity'},
        {id:'User 5', color:'blue', header:'PLANNING', subheader:'Process Control'},
        {id:'User 6', color:'black', header:'JUDGMENT', subheader:'Logical Negative'},
    ]

    var nodeOriginX = originX + ((radius) * Math.sin(0));
    var nodeOriginY = originY - ((radius) * Math.cos(0));

    var enterSelection = svg.selectAll().data(nodes).enter();
    
    enterSelection.append("text")
    .text(node => node.subheader)
    .attr("x", nodeOriginX)
    .attr("y", nodeOriginY - circleWidth - textStrokeWidth)
    .attr("transform",(_node, i) => "rotate("+ i/nodes.length * 360 +"," +originX + "," + originY + ")")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "bottom")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    enterSelection.append("text")
    .text(node => node.header)
    .attr("x", nodeOriginX)
    .attr("y", nodeOriginY - circleWidth - textStrokeWidth - textStrokeWidth  - fontSize)
    .attr("transform",(_node, i) => "rotate("+ i/nodes.length * 360 +"," +originX + "," + originY + ")")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "bottom")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    enterSelection.append("circle")
    .attr("cx", nodeOriginX)
    .attr("cy", nodeOriginY)
    .attr("r", circleWidth)
    .attr("transform",(_node, i) => "rotate("+ i/nodes.length * 360 +"," +originX + "," + originY + ")")
    .attr("fill","#f7931e")
    .attr("stroke","#fff")
    .attr("stroke-width", textStrokeWidth);

  }

  componentDidMount(){
      this.draw();
  }

  componentDidUpdate(prevProps:any, _prevState:any) {
    if (prevProps.width !== this.props.width) {
        this.draw();
    }
  }

  render(){
      return (
                <svg 
                id="SixThinkingHatsGraph"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default SixThinkingHatsGraph;
