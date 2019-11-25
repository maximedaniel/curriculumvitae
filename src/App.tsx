import React from 'react';
import {Grid, Button, Segment, List, Icon, Container, Label } from 'semantic-ui-react'

function App() {
  return (
    <Grid  style={{padding:'1em'}}>
      <Grid.Column width={4}>
      <List animated selection verticalAlign='middle' size='large'>
        <List.Item as='a'> 
            <Icon name='address card' />
          <List.Content >
            <List.Header>Profil</List.Header>
          </List.Content>
        </List.Item>
        
        <List.Item  as='a'>
            <Icon name='user' />
          <List.Content>
            <List.Header>Experience</List.Header>
          </List.Content>
        </List.Item>

        <List.Item  as='a'>
          <Icon name='user' />
          <List.Content>
            <List.Header>Teaching</List.Header>
          </List.Content>
        </List.Item>

        <List.Item   as='a'>
            <Icon name='search' />
          <List.Content>
            <List.Header>Research</List.Header>
          </List.Content>
        </List.Item>

        <List.Item   as='a'>
            <Icon name='user' />
          <List.Content>
            <List.Header>Workflow</List.Header>
          </List.Content>
        </List.Item>
      </List>
      </Grid.Column>
      <Grid.Column width={12}>
  <Container>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
      dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
    </p>
  </Container>
)
      </Grid.Column>
    </Grid>
  );
}

export default App;
