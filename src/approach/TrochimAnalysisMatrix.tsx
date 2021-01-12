import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}

class TrochimAnalysisMatrix extends  Component<Props, State> {
  render(){
      return (
        <Table celled structured  textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Distribution</Table.HeaderCell>
            <Table.HeaderCell>Tendency</Table.HeaderCell>
            <Table.HeaderCell>Dispersion</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              Count<br/>
              Percent<br/>
              Frequency<br/>
              Skewness<br/>
              Kurtosis
            </Table.Cell>
            <Table.Cell>
              Mean<br/>
              Median<br/>
              Mode<br/>
              Min<br/>
              Max<br/>
            </Table.Cell>
            <Table.Cell>
              Range<br/>
              Quartiles<br/>
              Variance<br/>
              Standart Deviation<br/>
            </Table.Cell>
            <Table.Cell>
              Percentile Ranks<br/>
              Quartiles Ranks<br/>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default TrochimAnalysisMatrix;
