import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
//const textStrokeWidth = 4
const circleWidth = 8
const fontSize = 10

class TheoryCKGraph extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#TheoryCKGraph');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

   var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    var nodes = [
        // examined object
        {id:0, x:width*0.1, y:0, fillColor:'#f7931e', strokeColor:'#f7931e'},
        {id:1, x:width*0.075, y:height*0.225, fillColor:'#f7931e', strokeColor:'#f7931e'},
        {id:2, x:width*0.05, y:height*0.45, fillColor:'#f7931e', strokeColor:'#f7931e'},
        {id:3, x:width*0.025, y:height*0.675, fillColor:'#f7931e', strokeColor:'#f7931e'},
        {id:4, x:0, y:height*0.9, fillColor:'#f7931e', strokeColor:'#f7931e'},
        // first concept space
        {id:5, x:width*0.075 * 2, y:height*0.225, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:6, x:width*0.075 * 3, y:height*0.225, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:7, x:width*0.075 * 4, y:height*0.225, fillColor:'#ffffff', strokeColor:'#f7931e'},
        // second concept space
        {id:8, x: width*0.05 +(width*0.075*1), y:height*0.45, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:9, x: width*0.05 + (width*0.075 * 2), y:height*0.45, fillColor:'#ffffff', strokeColor:'#f7931e'},
        // third concept space
        {id:10, x: width*0.025 +(width*0.075*1), y:height*0.675, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:11, x: width*0.025 + (width*0.075 * 2), y:height*0.675, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:12, x: width*0.025 + (width*0.075 * 2) - (width*0.075/2), y:height*0.7875, fillColor:'#ffffff', strokeColor:'#f7931e'},
        {id:13, x: width*0.025 + (width*0.075 * 2) + (width*0.075/2), y:height*0.7875, fillColor:'#ffffff', strokeColor:'#f7931e'},
        // fourth concept space
        {id:14, x: width*0 +(width*0.075*1), y:height*0.9, fillColor:'#ffffff', strokeColor:'#f7931e'},
    ]
    
    var getNodeFromId = (nodeId : any) => nodes.filter((node) => node.id === nodeId)[0];

    var links = [
        {from: 0, to: 1},
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 1, to: 5},
        {from: 5, to: 6},
        {from: 6, to: 7},
        {from: 2, to: 8},
        {from: 8, to: 9},
        {from: 3, to: 10},
        {from: 10, to: 11},
        {from: 11, to: 12},
        {from: 11, to: 13},
        {from: 4, to: 14},
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



    svg.append("text")
    .text("OBJECT")
    .attr("x", width*0.1 + fontSize)
    .attr("y", 0)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "central")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    var rotationAngle = Math.atan2(-height*0.9, width*0.1)  * 180 / Math.PI;
    svg.append("text")
    .text("Dominant Design")
    .attr("x", -fontSize)
    .attr("y", height*0.45)
    .attr("transform", "rotate(" + rotationAngle + "," + (-fontSize) + ","+ height*0.45 + ")")
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
    .text("representing the object's current properties")
    .attr("x", 0)
    .attr("y", height*0.45)
    .attr("transform", "rotate(" + rotationAngle + "," + 0 + ","+ height*0.45 + ")")
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
    
    
    svg.append("text")
    .text("New concepts")
    .attr("x", width* 0.3)
    .attr("y", height*0.9 + fontSize)
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .text("that have been explored")
    .attr("x", width* 0.3)
    .attr("y", height*0.9 + fontSize * 2)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    svg.append("text")
    .text(" or need exploring")
    .attr("x", width* 0.3)
    .attr("y", height*0.9 + fontSize * 3)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
    
    // Middle line
    svg.append("line")
    .attr("x1", width/2)
    .attr("y1", 0)
    .attr("x2", width/2)
    .attr("y2", height * 0.9)
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);
    
    // CONCEPT SPACE
    svg.append("text")
    .text("CONCEPT SPACE")
    .attr("x", width/2 - fontSize)
    .attr("y", 0)
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    // KNOWLEDGE SPACE
    svg.append("text")
    .text("KNOWLEDGE SPACE")
    .attr("x", width/2 + fontSize)
    .attr("y", 0)
    .attr("fill", "white")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "after-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    

    // knowledge line
    svg.append("line")
    .attr("x1", width/4 * 3)
    .attr("y1", 0)
    .attr("x2", width/4 * 3)
    .attr("y2", height * 0.9)
    .attr("stroke","#f7931e")
    .attr("stroke-dasharray", "4 2")
    .attr("stroke-width",lineStrokeWidth);

    svg.append("line")
    .attr("x1", width/4 * 3)
    .attr("y1", 0)
    .attr("x2", width/4 * 3)
    .attr("y2", height * 0.9)
    
    
    /*{id:0, x:width*0.1, y:0, fillColor:'#f7931e', strokeColor:'#f7931e'},
    {id:1, x:width*0.075, y:height*0.225, fillColor:'#f7931e', strokeColor:'#f7931e'},
    {id:2, x:width*0.05, y:height*0.45, fillColor:'#f7931e', strokeColor:'#f7931e'},
    {id:3, x:width*0.025, y:height*0.675, fillColor:'#f7931e', strokeColor:'#f7931e'},
    {id:4, x:0, y:height*0.9, fillColor:'#f7931e', strokeColor:'#f7931e'},*/
     
    // RECT FILLED
    svg.append("rect")
    .attr("x", width*0.525)
    .attr("y", height*0.225 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("rect")
    .attr("x", width*0.525)
    .attr("y", height*0.45 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    
    svg.append("rect")
    .attr("x", width*0.525 + width*0.1)
    .attr("y", height*0.45 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    
    svg.append("rect")
    .attr("x", width*0.525)
    .attr("y", height*0.675 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");
    
    svg.append("rect")
    .attr("x", width*0.525 + width*0.1)
    .attr("y", height*0.675 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("rect")
    .attr("x", width*0.525)
    .attr("y", height*0.9 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");


    // RECT DASHED
    svg.append("rect")
    .attr("x", width*0.78)
    .attr("y", height*0.225 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");

    svg.append("rect")
    .attr("x",  width*0.78)
    .attr("y", height*0.45 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");
    
    svg.append("rect")
    .attr("x",  width*0.78 + width*0.1)
    .attr("y", height*0.45 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");

    
    svg.append("rect")
    .attr("x",  width*0.78)
    .attr("y", height*0.675 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");
    

    svg.append("rect")
    .attr("x",  width*0.78)
    .attr("y", height*0.9 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");

    svg.append("rect")
    .attr("x",  width*0.78 + width*0.1)
    .attr("y", height*0.9 - height*0.025)
    .attr("width", width*0.1)
    .attr("height", height*0.05)
    .attr("fill", "white")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("stroke-dasharray", "4 2")
    .attr("font-weight", "800");

    // KNOWLEDGE SPACE
    svg.append("text")
    .text("Old knowledge")
    .attr("x", width* 0.625)
    .attr("y", height*0.9 + fontSize)
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .text("used to create concepts")
    .attr("x", width* 0.625)
    .attr("y", height * 0.9 + fontSize * 2)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");
    
    svg.append("text")
    .text("New knowledge")
    .attr("x", width* 0.88)
    .attr("y", height*0.9 + fontSize)
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", lineStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "800");

    svg.append("text")
    .text("to acquire to explore")
    .attr("x", width* 0.88)
    .attr("y", height * 0.9 + fontSize * 2)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
    .attr("font-size",  fontSize)
    .attr("font-weight", "800");

    svg.append("text")
    .text("the new concepts.")
    .attr("x", width* 0.88)
    .attr("y", height * 0.9 + fontSize * 3)
    .attr("fill", "#f7931e")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "before-edge")
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
                id="TheoryCKGraph"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default TheoryCKGraph;
