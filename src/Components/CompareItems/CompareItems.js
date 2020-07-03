import React from "react";
import "./CompareItems.css";
import Item from "./Item";

export default class CompareItems extends React.Component {
  constructor(props) {
    super(props);
    // whether shown, 2 random items
    this.state = { show: false, random_items: [] };
  }

  // toggle show state
  handleToggleShow = (e) => {
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  // set 2 random items from list
  setRandomOption = () => {
    // list must be at least 3 length
    if (this.props.items == null || this.props.items.length <= 2) {
      const newRandom = [{ name: "NOT ENOUGH ITEMS" }, { name: "NOT ENOUGH ITEMS" }];
      this.setState({ random_items: newRandom });
    } else {
      const shuffled = this.props.items.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      this.setState({ random_items: selected });
    }
  };

  // update compared items ratings in parent
  updateRating = (winner) => {
    const loser = winner ? 0 : 1;
    const matchItemWinner = this.props.items.find((item) => {
      return item.name === this.state.random_items[winner].name;
    });
    const matchItemLoser = this.props.items.find((item) => {
      return item.name === this.state.random_items[loser].name;
    });

    const delta = this.getRatingChange(
      this.state.random_items[winner].rating,
      this.state.random_items[loser].rating
    );

    this.props.updateItem(matchItemWinner, matchItemLoser, delta.winner, delta.loser);
  };

  // calcuates rating change for match
  getRatingChange = (r1, r2) => {
    // add calculations later
    return { winner: 10, loser: -10 };
  };

  render() {
    if (!this.state.show) {
      return (
        // start button
        <div id="button_div">
          <button
            onClick={() => {
              this.handleToggleShow();
              this.setRandomOption();
            }}
          >
            Start Rating
          </button>
        </div>
      );
    } else {
      return (
        // rating modal
        <>
          <div id="modal_background">
            <div id="modal_content">
              <div id="title_div">
                <h3>Which is better?</h3>
              </div>
              <div id="select_div">
                {/* Item Buttons */}
                <Item
                  item={this.state.random_items[0]}
                  updateFunc={() => {
                    this.updateRating(0);
                    this.setRandomOption();
                  }}
                />
                <Item
                  item={this.state.random_items[1]}
                  updateFunc={() => {
                    this.updateRating(1);
                    this.setRandomOption();
                  }}
                />
              </div>
              <button onClick={this.handleToggleShow} id="close_button">
                Close
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}
