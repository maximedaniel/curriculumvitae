import React, {Component} from 'react'
import * as d3 from 'd3'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}


const margin = {top: 30, right: 30, bottom: 30, left: 30}
const lineStrokeWidth = 3
const fontSize = 10

class ScammperrDonutChart extends  Component<Props, State> {

  draw(){
    var svgRoot = d3.select('#ScammperrDonutChart');
    svgRoot.selectAll("*").remove();

    var width = this.props.width - margin.left - margin.right,
    height = this.props.height - margin.top - margin.bottom;

    var svg = svgRoot
    .append("g")
    .attr("transform", "translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.top + margin.bottom) / 2 + ")");

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin.top;

    // set the color scale
    /*var color = d3.scaleOrdinal()
    .domain(["a", "b", "c", "d", "e", "f", "g", "h"])
    .range(d3.schemeDark2);*/

    var data = {SUBSTITUTE: 10, ADAPT: 10, MODIFY:10, MAGNIFY_MIGNIFY:10, PUT_TO_ANOTHER_USE:10, ELIMINATE:10, REVERSE:10, REARRANGE:10}
    var pie = d3.pie()
    .sort(null) // Do not sort group by size
    // @ts-ignore
    .value(d => d.value)
    // @ts-ignore
    var data_ready = pie(d3.entries(data))

    // The arc generator
    var arc = d3.arc()
    .innerRadius(radius * 0.5)         // This is the size of the donut hole
    .outerRadius(radius * 0.8)
    
    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    //@ts-ignore
    svg.selectAll('allSlices')
    .data(data_ready)
    .enter()
    .append('path')
    //@ts-ignore
    .attr('d', arc)
    //@ts-ignore
    .attr('fill', "#f7931e")
    .attr("stroke", "white")
    .style("stroke-width", "2px");

    // Add the polylines between chart and labels:
    /*
    svg
    .selectAll('line')
    .data(data_ready)
    .enter()
    .append('line')
    // @ts-ignore
    .attr("x1", (d) => arc.centroid(d)[0])
    // @ts-ignore
    .attr("y1", (d) => arc.centroid(d)[1])
    // @ts-ignore
    .attr("x2", (d) => outerArc.centroid(d)[0])
    // @ts-ignore
    .attr("y2", (d) => outerArc.centroid(d)[1])
    .attr("fill","#f7931e")
    .attr("stroke","#f7931e")
    .attr("stroke-width",lineStrokeWidth);*/

    // Add the polylines between chart and labels:
    svg
    .selectAll('allLabels')
    .data(data_ready)
    .enter()
    .append('text')
      // @ts-ignore
      .text( function(d) { console.log(d.data.key) ; return d.data.key.replace(/_/g, ' ') } )
      .attr('transform', d => {
        // @ts-ignore
          var pos = outerArc.centroid(d);
          // @ts-ignore
          //var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          //pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
      })
      .style('text-anchor', function(d) {
        // @ts-ignore
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
      })
      .attr("fill", "white")
      .attr("alignment-baseline", "middle")
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
                id="ScammperrDonutChart"
                width={this.props.width}
                height={this.props.height}
                />
    );
  }
}

export default ScammperrDonutChart;
