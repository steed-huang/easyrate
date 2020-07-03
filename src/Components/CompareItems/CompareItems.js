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
  updateRating = (result) => {
    const matchItemOne = this.props.items.find((item) => {
      return item.name === this.state.random_items[0].name;
    });
    const matchItemTwo = this.props.items.find((item) => {
      return item.name === this.state.random_items[1].name;
    });

    const newRating = this.getRatingChange(matchItemOne.rating, matchItemTwo.rating, result);

    this.props.updateItem(matchItemOne, matchItemTwo, newRating.one, newRating.two);
  };

  // calcuates rating change for match
  getRatingChange = (r1, r2, result) => {
    // generic elo calculations
    // transformed rating
    const TR1 = Math.pow(10, parseFloat(r1) / 400);
    const TR2 = Math.pow(10, parseFloat(r2) / 400);
    // expected scores
    const E1 = parseFloat(TR1) / (parseFloat(TR1) + parseFloat(TR2));
    const E2 = parseFloat(TR2) / (parseFloat(TR1) + parseFloat(TR2));
    // score
    let S1, S2;
    if (result === 0) {
      // item one won
      S1 = 1;
      S2 = 0;
    } else if (result === 1) {
      // item two won
      S1 = 0;
      S2 = 1;
    } else if (result === 0.5) {
      // tie
      S1 = 0.5;
      S2 = 0.5;
    }
    // K value
    const K = 32;
    // new elo rating
    let NR1 = (parseFloat(r1) + parseFloat(K) * (parseFloat(S1) - parseFloat(E1))).toFixed(1);
    let NR2 = (parseFloat(r2) + parseFloat(K) * (parseFloat(S2) - parseFloat(E2))).toFixed(1);

    console.log(NR1);
    console.log(NR2);

    // add calculations later
    return { one: NR1, two: NR2 };
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
                <button
                  onClick={() => {
                    this.updateRating(0.5);
                    this.setRandomOption();
                  }}
                  id="draw_button"
                >
                  Draw
                </button>
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
