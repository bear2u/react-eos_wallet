import React from "react";
import { Input, Button } from "semantic-ui-react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  render() {
    return (
      <Input
        action={
          <Button
            content="Search"
            onClick={() => this.onClicked()}
          />
        }
        onChange={evt => this.updateInputValue(evt)}
        placeholder="Input EOS ID"
        fluid="true"
      />
    );
  }

  onClicked = () => {    
    this.props.onSearchButtonClicked(this.state.inputValue);
  }

  updateInputValue(evt) {
      console.log(evt.target.value);
      this.setState({
          inputValue: evt.target.value
      });
  }
}

export default SearchBar;
