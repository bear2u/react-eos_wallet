import React, { Component } from 'react';
import AccountDetails from './Components/AccountDetails';
import SearchBar from './Components/SearchBar';
import { Container, Header, Divider } from 'semantic-ui-react'
import Account from './models/account';
import { getEOS } from './eos_provider';
import Transfer from './Components/Transfer';
// const Eos = require('eosjs');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAccountNameValid: false,      
    };
  }  

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
            ? this.buildAccountDetails()
            : "No Avaliable Id"            
          }          
        </Container>
        
        
      </Container>
    )
  }  

  buildAccountDetails() {
    return (
      <div>
        <Header as="h2" content="Account Details" />
        <Divider />
        <AccountDetails account={this.account}/>
        <Header as='h1' content="전송" textAlign='left' />
        <Divider />
        <Transfer accountName={this.account.account_name}/>
      </div>
    );    
  }

  handleSearchDone = async (searchId) => {  

    console.log('searchDone clicked');
  
    getEOS().getAccount(searchId)
      .then(account => {      
        this.setAccountNameValid(false)
        this.account = account;        
        this.setAccountNameValid(true)
      })
      .catch(error => {       
        console.error(error);       
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
