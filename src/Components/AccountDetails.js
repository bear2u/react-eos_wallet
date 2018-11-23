import React from "react";
import { Grid, Header, Divider, Segment } from "semantic-ui-react";
import Detail from "./Detail";

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);

    this.account = this.props.account;
    this.unstakedBalance = this.account.core_liquid_balance;
    this.refundedBalance = this.getRefundedBalance();
    this.cpuUse = this.getCpuUses();
    this.ramUse = this.getRamUses();
    this.stakedCPU = this.account.total_resources.cpu_weight;
    this.stakedNET = this.account.total_resources.net_weight;
    this.totalBalance = this.getTotalBalance();
    console.log(this.unstakedBalance);
  }

  getRefundedBalance = () =>
    this.account.refund_request
      ? Number(this.account.refund_request.net_amount.replace("EOS", "")) +
        Number(this.account.refund_request.cpu_amount.replace("EOS", ""))
      : "0";

  getCpuUses = () =>
    this.account.cpu_limit.used.toLocaleString() + "µs / " + this.account.cpu_limit.max.toLocaleString() + "µs";

  getRamUses = () =>
    this.account.ram_usage.toLocaleString() + "bytes / " + this.account.ram_quota.toLocaleString() + "bytes";

  getNetUses = () =>
    this.account.net_limit.used.toLocaleString() +
    "bytes / " +
    this.account.net_limit.max.toLocaleString() +
    "bytes";

  getTotalBalance = () => {
    const stake = this.account.voter_info ? this.account.voter_info.staked / 10000 : 0;
    return Number(this.unstakedBalance.replace('EOS', '')) + Number(this.refundedBalance) + Number(stake);    
  }


  render() {
    return (
      <div>       
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Detail
                  title="ACCOUNT NAME"
                  content={this.account.account_name}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail
                  title="TOTAL BALANCE"
                  content={this.totalBalance + "EOS"}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={4}>
            <Grid.Column>
              <Segment>
                <Detail
                  title="UNSTAKED BALANCE"
                  content={this.unstakedBalance}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail title="REFUND BALANCE" content={this.refundedBalance} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail
                  title="CPU STAKE"
                  content={this.stakedCPU}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail
                  title="NET STAKE"
                  content={this.stakedNET}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column>
              <Segment>
                <Detail title="RAM USAGE" content={this.ramUse} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail title="CPU USAGE" content={this.cpuUse} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Detail title="NET USAGE" content={this.ramUse} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AccountDetails;
