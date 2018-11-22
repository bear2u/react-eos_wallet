import React, { Component } from 'react';
import AccountDetails from './Components/AccountDetails';
import SearchBar from './Components/SearchBar';
import { Container, Header, Divider } from 'semantic-ui-react'
import Account from './models/account';
import { getEOS } from './eos_provider';
// const Eos = require('eosjs');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAccountNameValid: false,      
    };
  }
  /**
   * // 111111111abz
   * 1. 유효한 어카운트인지 체크
   * 2. Balance 를 가져오기
   * 3. unstaked balance
   * 4. refund balace
   * 5. cpu stake
   * 6. net stake
   * 7. ram usage
   * 8. cpu usage
   * 9. net usage
   */

  
  render() {
    
    return(
      <Container style = {{ marginTop: 30}} >
        <Header as='h1' content='1시간만에 배우는 EOS 지갑 구현' textAlign='center' />        
        <SearchBar 
          onSearchButtonClicked={this.handleSearchDone}          
        />
        <Container style ={{ marginTop: 30}}>
          {
            this.state.isAccountNameValid 
            ? <AccountDetails accountName={this.accountName}/>
            : "No Avaliable Id"
          }
        </Container>
      </Container>
    )
  }  

  test =() => {
    getEOS().getInfo({})
      .then(info => {
        console.log(info);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSearchDone = async (searchId) => {
    // var searchId = this.searchBar.value;  
  
    getEOS().getAccount(searchId)
      .then(accountName => {      
        this.accountName = searchId;        
        this.setAccountNameValid(true)
      })
      .catch(error => {              
        this.setAccountNameValid(false)
      })    
  }

  setAccountNameValid(isValid) {
    this.setState({
      isAccountNameValid: isValid
    })
  }
}

export default App;
