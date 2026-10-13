import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
//const textStrokeWidth = 4
const circleWidth = 8
const fontSize = 10

class SystematicLiteratureReviewGraph extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#SystematicLiteratureReviewGraph');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    var nodes = [
        // examined object
        {id:0, x:width*0.4, y:height*0, fillColor:'#ffffff', strokeColor:'#f7931e',     textAnchor:'end', header:'Review Planning', subheader: 'Plan review effort and training activities.'},
        {id:1, x:width*0.43, y:height*0.14, fillColor:'#ffffff', strokeColor:'#f7931e' , textAnchor:'start', header:'Question formulation', subheader: 'Define research questions.'},
        {id:2, x:width*0.46, y:height*0.28, fillColor:'#ffffff', strokeColor:'#f7931e' , textAnchor:'end', header:'Search strategy', subheader: 'Define review scope and search strings.'},
        {id:3, x:width*0.485, y:height*0.42, fillColor:'#ffffff', strokeColor:'#f7931e', textAnchor:'start', header:'Selection process', subheader: 'Define inclusion and exclusion criteria.'},
        {id:4, x:width*0.514, y:height*0.57, fillColor:'#ffffff', strokeColor:'#f7931e', textAnchor:'end', header:'Strength of evidence', subheader: 'Define what makes a high quality paper.'},
        {id:5, x:width*0.542, y:height*0.71, fillColor:'#ffffff', strokeColor:'#f7931e', textAnchor:'start', header:'Analysis', subheader: 'Extract evidence from the selected papers.'},
        {id:6, x:width*0.571, y:height*0.85, fillColor:'#ffffff', strokeColor:'#f7931e', textAnchor:'end',  header:'Synthesis', subheader: 'Structure evidence in order to draw conclusions.'},
        {id:7, x:width*0.6, y:height*1, fillColor:'#ffffff', strokeColor:'#f7931e',  textAnchor:'start', header:'Process Monitoring', subheader: 'Ensure process is repeatable & complete.'},
        ]    
    var getNodeFromId = (nodeId : any) => nodes.filter((node) => node.id === nodeId)[0];

    var links = [
        {from: 0, to: 1},
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 1, to: 5},
        {from: 5, to: 6},
        {from: 6, to: 7}
    ]

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
    .attr("fill", d => d.fillColor)
    .attr("stroke", d => d.strokeColor)
    .attr("stroke-width", lineStrokeWidth);
    
    svg.selectAll()
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", d => d.x + (d.textAnchor==='end'?-1.5*fontSize:1.5*fontSize))
    .attr("y", d => d.y)
    .text(d => d.header)
    .attr("fill", "white")
    .attr("text-anchor", d => d.textAnchor)
    .attr("alignment-baseline", "central")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.selectAll()
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", d => d.x + (d.textAnchor==='end'?-1.5*fontSize:1.5*fontSize))
    .attr("y", d => d.y + 2*fontSize)
    .text(d => d.subheader)
    .attr("fill", "#f7931e")
    .attr("text-anchor", d => d.textAnchor)
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
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
                id="SystematicLiteratureReviewGraph"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default SystematicLiteratureReviewGraph;
