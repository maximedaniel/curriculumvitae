import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const textStrokeWidth = 4
const fontSize = 10

class ModelCanvasTreeMap extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#ModelCanvasTreeMap');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    var nodes = [
      {id:0, x:width/5, y:0},
      {id:1, x:width/5 * 2, y:0},
      {id:2, x:width/5 * 3, y:0},
      {id:3, x:width/5 * 4, y:0},
      {id:4, x:width/5, y:height/4*3},
      {id:5, x:width/5 * 2, y:height/4*3},
      {id:6, x:width/5 * 3, y:height/4*3},
      {id:7, x:width/5 * 4, y:height/4*3},
      {id:8, x:width/5, y:height/4*1.5},
      {id:9, x:width/5 * 2, y:height/4*1.5},
      {id:10, x:width/5 * 3, y:height/4*1.5},
      {id:11, x:width/5 * 4, y:height/4*1.5},
      {id:12, x:0, y:height/4*3},
      {id:13, x:width, y:height/4*3},
      {id:14, x:width/2, y:height/4*3},
      {id:15, x:width/2, y:height},
    ]
    var links = [
      {from:0, to:4},
      {from:1, to:5},
      {from:2, to:6},
      {from:3, to:7},
      {from:8, to:9},
      {from:10, to:11},
      {from:12, to:13},
      {from:14, to:15}
    ]

    var texts = [
      {text:'KEY', x:width/5 - width/10, y:0},
      {text:'PARTNERS', x:width/5 - width/10, y:fontSize},
      {text:'KEY', x:(width/5 * 2) - width/10, y:0},
      {text:'ACTIVITIES', x:(width/5 * 2) - width/10, y:fontSize},
      {text:'VALUE', x:(width/5 * 3) - width/10, y:0},
      {text:'PROPOSITIONS', x:(width/5 * 3) - width/10, y:fontSize},
      {text:'CUSTOMER', x:(width/5 * 4) - width/10, y:0},
      {text:'RELATIONSHIPS', x:(width/5 * 4) - width/10, y:fontSize},
      {text:'CUSTOMER', x:width - width/10, y:0},
      {text:'SEGMENTS', x:width - width/10, y:fontSize},
      {text:'KEY', x:(width/5 * 2) - width/10, y:height/4*1.5},
      {text:'RESSOURCES', x:(width/5 * 2) - width/10, y: height/4*1.5 + fontSize},
      {text:'CHANNELS', x:(width/5 * 4) - width/10, y:height/4*1.5},
      {text:'COST STRUCTURES', x:0 + width/4, y:height/4*3},
      {text:'REVENUE STREAMS', x:width - width/4, y:height/4*3},
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
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);

    svg.selectAll()
    .data(texts)
    .enter()
    .append("text")
    //@ts-ignore
    .attr("x", d => d.x)
    //@ts-ignore
    .attr("y", d => d.y  + textStrokeWidth)
    //@ts-ignore
    .text( d => d.text)
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "text-before-edge")
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
                id="ModelCanvasTreeMap"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default ModelCanvasTreeMap;
