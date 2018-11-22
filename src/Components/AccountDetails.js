import React from "react";
import { Grid, Header, Divider, Segment } from "semantic-ui-react";
import Detail from "./Detail";
import { getEOS } from '../eos_provider';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      totalBalance: "",
      unstakedBalance: "",
      refundedBalance: "",
      stakedCpu: "",
      stakedNet: "",
      ramUse: "",
      cpuUse: "",
      netUse: ""
    };

    this.accountName = this.props.accountName;
    
    this.updateBalance();
  }

  async updateBalance() {
    const balance = await getEOS().getCurrencyBalance('eosio.token', this.accountName);
    console.log(balance);
  }

  render() {
    return (
      <div>
        <Header as="h2" content="Account Details" />
        <Divider />
        <Grid divided="vertically">
          <Grid.Row columns={2} >
            <Grid.Column>
              <Segment>
                <Detail title="ACCOUNT NAME" content={this.accountName} />
              </Segment>
            </Grid.Column >
            <Grid.Column>
              <Segment>
                <Detail title="TOTAL BALANCE" content={this.state.totalBalance + "EOS"} />
              </Segment>  
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Detail title="UNSTAKED BALANCE" content={this.state.totalBalance + "EOS"} />
            </Grid.Column>
            <Grid.Column>
              <Detail title="REFUND BALANCE" content={this.state.totalBalance + "EOS"} />
            </Grid.Column>
            <Grid.Column>
              <Detail title="CPU STAKE" content={this.state.totalBalance + "EOS"} />
            </Grid.Column>
            <Grid.Column>
              <Detail title="NET STAKE" content={this.state.totalBalance + "EOS"} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Detail title="RAM USAGE" content="3.225 KB / 56.267 KB" />
            </Grid.Column>
            <Grid.Column>
              <Detail title="CPU USAGE" content="1,307 µs / 134,710 µs" />
            </Grid.Column>
            <Grid.Column>
              <Detail title="NET USAGE" content="0 KB / 732,650 KB" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AccountDetails;
