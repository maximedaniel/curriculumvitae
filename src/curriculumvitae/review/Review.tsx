import React, { Component }  from 'react';
import { Icon, Image, Grid, Header, Menu} from 'semantic-ui-react'

interface Props{

}

interface State{
  hover: boolean
}

class Review extends Component<Props, State> {
  constructor(props: any){
    super(props);
    this.state = {
      hover:false
    }
  }

  handleOnMouseOver = (event: any) => {
    this.setState({hover: !this.state.hover});
  }

  render = ()  => {
    return (
      <div id='review'>
            <Header as='h2'>Reviews</Header>
                <Grid padded>
                    <Grid.Row>
                    <Grid.Column textAlign='left' verticalAlign='middle' mobile={10} tablet={13}  computer={14}>
                         CHI 2026 (1 review), TEI 2026 (3 reviews),
                         ISMAR 2025 (3 reviews, one "highly useful"), TEI 2025 (1 review, one "Special Recognitions for Outstanding Reviews")
                         TEI 2020 (1 review), UIST 2020 (1 review)
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
      </div>
    );
  }
}

export default Review;
