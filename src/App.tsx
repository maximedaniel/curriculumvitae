import React from 'react';
import {Grid, List, Icon, Segment, Header } from 'semantic-ui-react'
import Side from './side'
import Content from './content';

function App() {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={4}>
          <Side />
        </Grid.Column>
        <Grid.Column width={12}>
          <Content />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
