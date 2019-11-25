import React, { Component }  from 'react';
import { Image, Grid, List } from 'semantic-ui-react'

class Profil extends Component {
  constructor(props: any){
    super(props);
  }

  render() {
    return (
        <Grid>
        <Grid.Row centered>
            <Grid.Column width={4}>
            <Image src='/img/profil0.jpg' size='medium' circular />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={4}>
            <List textAlign='center'>
                <List.Item>
                <List.Icon name='users' />
                <List.Content>Semantic UI</List.Content>
                </List.Item>
                <List.Item>
                <List.Icon name='marker' />
                <List.Content>New York, NY</List.Content>
                </List.Item>
                <List.Item>
                <List.Icon name='mail' />
                <List.Content>
                    <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
                </List.Content>
                </List.Item>
                <List.Item>
                <List.Icon name='linkify' />
                <List.Content>
                    <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
                </List.Content>
                </List.Item>
            </List>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    );
  }
}

export default Profil;
