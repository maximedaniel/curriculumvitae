import React, { Component }  from 'react';
import { Label, Icon, List} from 'semantic-ui-react'

interface Props{

}

interface State{

}

class Scrollspy extends Component<Props, State> {
  render = ()  => {
    return (
      <div>
        <List>
            <List.Item>
            <List.Icon name='inbox'  flipped='horizontally'/>
            <List.Content>maxaxeldaniel[at]gmail.com</List.Content>
            </List.Item>
            <List.Item>
            <List.Icon name='phone' flipped='horizontally' />
            <List.Content>+33 (0)6 98 41 24 84</List.Content>
            </List.Item>
            <List.Item>
            <List.Icon name='map marker alternate'  flipped='horizontally' />
            <List.Content>Biarritz, France</List.Content>
            </List.Item>
        </List>
        <Label as='a' onClick= {() => window.open("https://github.com/maximedaniel", "_blank")}>
            <Icon name='github' />
            Github
        </Label>
        <Label as='a' onClick= {() => window.open("https://www.youtube.com/channel/UCX7uHVWqJ6TxoQnIXhVZ2gw", "_blank")}>
        <Icon name='youtube' />
        Youtube
        </Label>
      </div>
    );
  }
}

export default Scrollspy;
