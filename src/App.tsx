import React from 'react';
import {Grid, List, Icon, Segment, Header } from 'semantic-ui-react'
import Profil from './profil';

function App() {
  return (
    <Grid  style={{padding:'1em'}}>
      <Grid.Row>
        <Grid.Column width={4}>
          <Profil />
        </Grid.Column>
        <Grid.Column width={12}>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
