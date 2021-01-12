import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const textStrokeWidth = 4
const circleWidth = 8
const fontSize = 10

class BrainWritingGraph extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#BrainWritingGraph');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var radius = Math.min(width, height) / 2 - margin.top;
    var originX = width/2;
    var originY = height/2;
    var nodes = [
        {id:'User 1'},
        {id:'User 2'},
        {id:'User 3'},
        {id:'User 4'},
        {id:'User 5'},
        {id:'User 6'},
    ]

    var nodeOriginX = originX + ((radius) * Math.sin(0));
    var nodeOriginY = originY - ((radius) * Math.cos(0));

    var enterSelection = svg.selectAll().data(nodes).enter();
    
    var arc = d3.arc()
    .innerRadius(radius - textStrokeWidth)
    .outerRadius(radius + textStrokeWidth)
    .startAngle(0) //converting from degs to radians
    .endAngle(7) //just radians

    enterSelection.append("path")
    // @ts-ignore
    .attr("d", arc)
    .attr("transform", (_node : any, i : any) => "translate("+originX + "," + originY + ")")
    .attr("fill","#f7931e")
    .attr("stroke","#fff")
    .attr("stroke-width", textStrokeWidth);

    enterSelection.append("text")
    .attr("x", originX)
    .attr("y", originY-5*lineStrokeWidth)
    .text("6 Participants")
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

    enterSelection.append("text")
    .attr("x", originX)
    .attr("y", originY)
    .text("3 Ideas")
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

    enterSelection.append("text")
    .attr("x", originX)
    .attr("y", originY+5*lineStrokeWidth)
    .text("5 Minutes")
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

    enterSelection.append("text")
    .text(node => node.id)
    .attr("x", nodeOriginX)
    .attr("y", nodeOriginY - circleWidth - textStrokeWidth)
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


    //nodes = nodes.map(node => node)
   // var chairOriginX = originX + ((radius) * Math.sin(0))
   //var chairOriginY = originY - ((radius) * Math.cos(0));

    
    /*var links = [
        {from: 0, to: 1, text:'INSPIRATION', angle:0},
        {from: 0, to: 2, text:'DISCOVER', angle:-45},
        {from: 0, to: 3, text:'', angle:0},
        {from: 1, to: 3, text:'', angle:0},
        {from: 1, to: 4, text:'INTERPRETATION', angle:0},
        {from: 2, to: 3, text:'', angle:0},
        {from: 2, to: 4, text:'DEFINE', angle:45},
        {from: 3, to: 4, text:'', angle:0},
        {from: 4, to: 5, text:'IDEATION', angle:0},
        {from: 4, to: 6, text:'DEVELOP', angle:-45},
        {from: 4, to: 7, text:'', angle:0},
        {from: 5, to: 7, text:'', angle:0},
        {from: 5, to: 8, text:'IMPLEMENTATION', angle:0},
        {from: 6, to: 7, text:'', angle:0},
        {from: 6, to: 8, text:'DELIVER', angle:45},
        {from: 7, to: 8, text:'', angle:0}
    ]
    var getNodeFromId= (nodeId) => nodes.filter((node) => node.id === nodeId)[0];

    svg.selectAll()
    .data(links)
    .enter()
    .append("line")
    .attr("x1", (link) => getNodeFromId(link.from).x)
    .attr("y1", (link) => getNodeFromId(link.from).y)
    .attr("x2", (link) => getNodeFromId(link.to).x)
    .attr("y2", (link) => getNodeFromId(link.to).y)
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
    .attr("font-weight", "800");*/

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
                id="BrainWritingGraph"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default BrainWritingGraph;
