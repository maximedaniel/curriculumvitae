import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const textStrokeWidth = 4
const circleWidth = 8
const fontSize = 10

class WhysGraph extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#WhysGraph');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    var nodes = [
        // INITIAL STATEMENT
        {id:0, x: 0, y:0},
        {id:1, x: width/2 - margin.left, y: 0},

        // REASON 1
        {id:2, x: width/2 + margin.left, y:height/6},
        {id:3, x: width, y: height/6},

        // REASON 2
        {id:4, x: 0, y:height/6*2},
        {id:5, x: width/2 - margin.left, y: height/6*2},

        // REASON 3
        {id:6, x: width/2 + margin.left, y:height/6 * 3},
        {id:7, x: width, y: height/6 * 3},

        // REASON 4
        {id:8, x: 0, y:height/6*4},
        {id:9, x: width/2 - margin.left, y: height/6*4},

        // REAL PROBLEM TO SOLVE
        {id:10, x: width/2 + margin.left, y:height/6*5},
        {id:11, x: width, y: height/6*5},

    ]
    var links = [
        {from: 0, to: 1, text:'INITIAL STATEMENT', angle:0, dashed: false},
        {from: 1, to: 2, text:'WHY ?', angle:0, dashed: true},
        {from: 2, to: 3, text:'REASON 1', angle:0, dashed: false},
        {from: 2, to: 5, text:'WHY ?', angle:0, dashed: true},
        {from: 4, to: 5, text:'REASON 2', angle:0, dashed: false},
        {from: 5, to: 6, text:'WHY ?', angle:0, dashed: true},
        {from: 6, to: 7, text:'REASON 3', angle:0, dashed: false},
        {from: 6, to: 9, text:'WHY ?', angle:0, dashed: true},
        {from: 8, to: 9, text:'REASON 4', angle:0, dashed: false},
        {from: 9, to: 10, text:'WHY ?', angle:0, dashed: true},
        {from: 10, to: 11, text:'REAL PROBLEM TO SOLVE', angle:0, dashed: false},
    ]
    var getNodeFromId = (nodeId : any) => nodes.filter((node) => node.id === nodeId)[0];

    svg.selectAll()
    .data(links)
    .enter()
    .append("line")
    .attr("x1", (link) => getNodeFromId(link.from).x)
    .attr("y1", (link) => getNodeFromId(link.from).y)
    .attr("x2", (link) => getNodeFromId(link.to).x)
    .attr("y2", (link) => getNodeFromId(link.to).y)
    .style("stroke-dasharray",  (link) => link.dashed?("3, 3"): null) 
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);
    
    svg.selectAll()
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", circleWidth)
    .attr("fill","#f7931e")
    .attr("stroke","#fff")
    .attr("stroke-width", textStrokeWidth);

    svg.selectAll()
    .data(links)
    .enter()
    .append("text")
    .text(link => link.text)
    .attr("x", link => (getNodeFromId(link.to).x + getNodeFromId(link.from).x)/2)
    .attr("y", link =>  (getNodeFromId(link.to).y + getNodeFromId(link.from).y)/2)
    .attr("transform",link => "rotate("+ link.angle +"," + (getNodeFromId(link.to).x + getNodeFromId(link.from).x)/2 + "," + (getNodeFromId(link.to).y + getNodeFromId(link.from).y)/2 + ")")
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

    // Link 1-2
    /*svg.append("line")
    .attr("x1", 0)
    .attr("y1", height/2)
    .attr("x2", width/4)
    .attr("y2", height/2)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);*/

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
                id="WhysGraph"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default WhysGraph;
