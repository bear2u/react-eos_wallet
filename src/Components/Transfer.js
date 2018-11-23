import React from "react";
import {
  Grid,
  Button,
  Segment,
  Input,
  Label,
  Container
} from "semantic-ui-react";
import { getSignedEos } from "../eos_provider";

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.init();

    this.accountName = this.props.accountName;
  }

  componentDidMount() {
    // this.setTestDefaultValues();
  }

  init() {
    this.state = {
      to: "",
      quantity: "",
      memo: "",
      privateKey: "",
      error: false,
      errorMsg: "",
      success: false,
      tx: ""
    };
  }

  handleInputChange = event => {    
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log('handleInputChanged', name, value);

    this.setState({
      [name]: value
    });
  };

  // setTestDefaultValues() {
  //   this.setState({
  //     to: "111111111abc",
  //     quantity: 1,
  //     memo: "test",
  //     privateKey: "5HsgSX9CngANSWT6J6voTAjCrUdSbYUz4BqhrRFx3kPXkVZC9XH"
  //   })
  // }

  showMsg() {
    if(this.state.error) {
      return (      
        <Label color="red" content={this.state.errorMsg} />
      );
    }

    if(this.state.success) {
      const txLinkAddr = "https://tools.cryptokylin.io/#/tx/" + this.tx;
      return (
        <Label color="teal" content={<a href={txLinkAddr} target="_blank">전송 완료</a>} />
      );
    }
  }
  render() {
    return (            
      <Container>
        {          
          this.showMsg()
        }
        <Grid divided="vertically" style={{ marginTop: 5 }} >
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Label content="TO" color="blue" />
                <Input
                  name="to"
                  placeholder="받으실 분 아이디를 입력해주세요"
                  fluid="true"
                  style={{ marginTop: 10 }}
                  onChange={this.handleInputChange}   
                  required={true}  
                  value={this.state.to}             
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Label content="수량" color="red" />
                <Input
                  name="quantity"
                  placeholder="수량을 입력해주세요"
                  fluid="true"
                  style={{ marginTop: 10 }}
                  onChange={this.handleInputChange}
                  required={true}
                  value={this.state.quantity}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Label content="MEMO" color="yellow" />
                <Input
                  name="memo"
                  placeholder="메모를 입력해주세요"
                  fluid="true"
                  style={{ marginTop: 10 }}
                  onChange={this.handleInputChange}
                  required={true}
                  value={this.state.memo}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Label content="PrivateKey" color="teal" />
                <Input
                  name="privateKey"
                  placeholder="개인키를 입력해주세요"
                  fluid="true"
                  style={{ marginTop: 10 }}
                  onChange={this.handleInputChange}
                  required={true}
                  value={this.state.privateKey}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button primary fluid={true} onClick={() => this.onClicked()}>
          전송 
        </Button>
      </Container>
    );
  }

  onClicked = () => {
    this.setState({
      error: false,
      errorMsg: ""
    })
    const privateKey = this.state.privateKey;   
    const to = this.state.to;
    const quantity = this.state.quantity;
    const memo = this.state.memo;

    if(privateKey == '' || to == '' || quantity == '' || memo == '') {
      this.setState({
        error: true,
        errorMsg: "유효한 값이 아닙니다"
      })
      return;
    }

    console.log(privateKey, this.state.to, this.state.quantity, this.state.memo);
        
    getSignedEos(privateKey).transaction('eosio.token', (coin) => {
        coin.transfer(this.accountName, to, Number(quantity).toFixed(4) + ' EOS', memo);        
    })
    .then(result =>{
      console.log(result);
      this.tx = result.transaction_id;
      this.setState({        
        success: true,        
      })
      this.init();
    })
    .catch(error => {
      console.error(error);
      this.setState({
        error: true,
        errorMsg: error
      })
    })
  };
}

export default Transfer;
