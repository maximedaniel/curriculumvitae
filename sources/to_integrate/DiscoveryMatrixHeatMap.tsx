import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const textStrokeWidth = 4
const fontSize = 12

class DiscoveryMatrixHeatMap extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#DiscoveryMatrixHeatMap');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    //.attr("transform",
    //      "translate(" + margin.left + "," + margin.top + ")");
    // Labels of row and columns
    var myGroups = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    var myVars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, width])
    // @ts-ignore
    .domain(myGroups)
    .padding(0.01);

    
    // Build X scales and axis:
    var y = d3.scaleBand()
    .range([height, 0 ])
    // @ts-ignore
    .domain(myVars)
    .padding(0.01);
    

    // Build color scale
    // @ts-ignore
    var myColor = d3.scaleLinear().range(["#f7e1c6", "#f7931e"]).domain([1,(myGroups.length-1) *(myVars.length-1) ])

    // Build color scale
   /* var myColor = d3.scaleLinear()
    .range(["white", "#69b3a2"])
    .domain([1,100]);*/
    //Read the data
    const data= myGroups.map((group, i) => 
         myVars.map((variable, j) => 
             Object({group: group, variable:variable, value:j*i})
         )
    ).reduce((a, b) => a.concat(b), [])

    svg.selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d['group']))
        .attr("y", (d) =>  y(d['variable']))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", (d) => myColor(d.value))

    var bottomAxis= svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    var leftAxis = svg.append("g")
    .call(d3.axisLeft(y));

    bottomAxis.selectAll('line, path')
    .attr("stroke", "#f7931e")
    .attr("stroke-width", lineStrokeWidth);

    bottomAxis.selectAll('text')
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", textStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "bold");

    leftAxis.selectAll('line, path')
    .attr("stroke", "#f7931e")
    .attr("stroke-width", lineStrokeWidth);

    leftAxis.selectAll('text')
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-size",  fontSize)
    .attr("paint-order", "stroke")
    .attr("stroke","#f7931e")
    .attr("stroke-width", textStrokeWidth)
    .attr("stroke-linecap", "butt")
    .attr("stroke-linejoin", "miter")
    .attr("font-weight", "bold");

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
      /*
      // set the dimensions and margins of the graph
      var margin = {top: 30, right: 30, bottom: 30, left: 30},
      width = 450 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
      
      // append the svg object to the body of the page
      var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");

      // Labels of row and columns
      var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
      var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]
      
      // Build X scales and axis:
      var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.01);
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      
      // Build X scales and axis:
      var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)
      .padding(0.01);
      svg.append("g")
      .call(d3.axisLeft(y));
      
      // Build color scale
      var myColor = d3.scaleLinear()
      .range(["white", "#69b3a2"])
      .domain([1,100])
      
      //Read the data
      d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", (data:any) => {
        svg.selectAll()
        .data(data, (d:any)  => d.group+':'+d.variable)
        .enter()
        .append("rect")
        .attr("x", (d:any) => x(d.group))
        .attr("y", (d:any) => y(d.variable))
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", (d:any) => myColor(d.value))
      })
      */
      return (
                <svg 
                id="DiscoveryMatrixHeatMap"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default DiscoveryMatrixHeatMap;
