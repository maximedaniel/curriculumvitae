import React from 'react';
import {Grid, List, Icon, Segment, Header } from 'semantic-ui-react'
import Profil from './profil';

function App() {
  return (
    <Grid  style={{padding:'1em'}}>
      <Grid.Row>
        <Grid.Column width={4}>
        <Segment>
          <Header as='h3'>Sommaire</Header>
          <List animated verticalAlign='middle' size='large'>
            <List.Item as='a'>
              <Icon name='users' />
              <List.Content>
                <List.Header>Helen</List.Header>
              </List.Content>
            </List.Item>
            <List.Item as='a'>
            <Icon  name='users' />
              <List.Content>
                <List.Header>Christian</List.Header>
              </List.Content>
            </List.Item>
            <List.Item as='a'>
            <Icon  name='users' />
              <List.Content>
                <List.Header>Daniel</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Profil />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
