import React from "react";

export default class CompareItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  // toggle show state
  handleToggleShow = (e) => {
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  render() {
    if (!this.state.show) {
      return <button onClick={this.handleToggleShow}> Start Rating </button>;
    } else {
      return (
        <>
          <div>
            {this.props.item_one} {this.props.item_two}
          </div>
          <button onClick={this.handleToggleShow}> Close </button>
        </>
      );
    }
  }
}
