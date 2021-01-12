import React, {Component} from 'react'
import { Table, Header } from 'semantic-ui-react'

interface Props{width:any,height:any,parentRef: HTMLDivElement | null}
interface State{height:number,width:number}

class BioStatGvMatrix extends  Component<Props, State> {
  render(){
      return (
        <Table celled structured  textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'></Table.HeaderCell>
            <Table.HeaderCell colSpan='4'>
                <Header as="h4">
                    <Header.Content>
                        Answer Variable
                        <Header.Subheader>
                            Tasks, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan='3'></Table.HeaderCell>
            <Table.HeaderCell>
            <Header as="h4">
                <Header.Content>
                     Qualitative nominale<br/>(2 groups)
                    <Header.Subheader>
                        Gender (woman, man), etc.
                    </Header.Subheader>
                </Header.Content>
            </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
            <Header as="h4">
                <Header.Content>
                     Qualitative nominale<br/>(3+ groups)
                    <Header.Subheader>
                        Ethnicity (Black, White, Hispanic, non-Hispanic), etc.
                    </Header.Subheader>
                </Header.Content>
            </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
                
            <Header as="h4">
                <Header.Content>
                    Qualitative ordinale
                    <Header.Subheader>
                        Fatigue (5-points Likert Scale), etc.
                    </Header.Subheader>
                </Header.Content>
            </Header>
                
                
            </Table.HeaderCell>
            <Table.HeaderCell>
                <Header as="h4">
                    <Header.Content>
                        Quantitative
                        <Header.Subheader>
                            Completion speed (seconds), etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.HeaderCell rowSpan='5'>
                <Header as="h4">
                    <Header.Content>
                        Study Factor
                        <Header.Subheader>
                        Interaction  technique, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <br/>
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>
                <Header as="h4">
                    <Header.Content>
                        Qualitatif (2 groups)
                        <Header.Subheader>
                            Two interaction techniques, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.HeaderCell >
                <Header as="h4">
                    <Header.Content>
                        Independants
                        <Header.Subheader>
                            Between groups, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.Cell >Z de comparaison de proportions<br/>Chi²<br/>Test exact de Fisher</Table.Cell>
            <Table.Cell >Chi²</Table.Cell>
            <Table.Cell >Test de Cochran-Armitage</Table.Cell>
            <Table.Cell >Test de Mann-Whitney<br/>t de Student<br/>Test de Weich</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell >
                <Header as="h4">
                    <Header.Content>
                        Appariés
                        <Header.Subheader>
                            Within groups, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.Cell >Test de McNemar<br/>Test exact de Fisher</Table.Cell>
            <Table.Cell >Q de Cochran</Table.Cell>
            <Table.Cell >Tests des signes<br/>Tests des rangs signés de Wilcoxon</Table.Cell>
            <Table.Cell >t de Student pour données appariées<br/>Test des rangs signés de Wilcoxon</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan='2'>
                <Header as="h4">
                    <Header.Content>
                        Qualitatif (3+ groups)
                        <Header.Subheader>
                            Four visualization techniques, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.HeaderCell>
                <Header as="h4">
                    <Header.Content>
                        Independants
                        <Header.Subheader>
                            Between groups, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.Cell >Chi²</Table.Cell>
            <Table.Cell >Chi²</Table.Cell>
            <Table.Cell >Test de kruskal-Wallis (ordinal)</Table.Cell>
            <Table.Cell >Analyse de la variance<br/>Test de Kruskal-Wallis (échelle quanti)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell >
                <Header as="h4">
                    <Header.Content>
                        Appariés
                        <Header.Subheader>
                            Within groups, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Table.HeaderCell>
            <Table.Cell >Q de Cochran</Table.Cell>
            <Table.Cell >Q de Cochran</Table.Cell>
            <Table.Cell >Test de Friedman</Table.Cell>
            <Table.Cell >Test de Friedman</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan='2'>
                
            <Header as="h4">
                    <Header.Content>
                        Quantitatif
                        <Header.Subheader>
                            Gestures, etc.
                        </Header.Subheader>
                    </Header.Content>
                </Header>

            </Table.HeaderCell>
            <Table.Cell >Régression logistique</Table.Cell>
            <Table.Cell >Régression logistique multinomiale</Table.Cell>
            <Table.Cell >Corrélation de Spearman<br/>Tau de Kendall</Table.Cell>
            <Table.Cell >Corrélation de Pearson<br/>Régression linéaire</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default BioStatGvMatrix;
