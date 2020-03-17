import React, { Component } from "react";
import { connect } from "react-redux";
import OkcInput from './OkcInput';
import OkcEssay from './OkcEssay';
import { FIELDS } from '../constants';
import { INITIAL_STATE, clear_store } from "../madlibs";
import { SHOW_EDIT_BUTTON, SHOW_START_OVER } from '../constants';

require("./App.scss");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { inputMode: true };
  }

  toggleInputMode = () => {
    if (!this.state.inputMode) {
      this.props.clear_store();
    }

    this.setState({ inputMode: !this.state.inputMode });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.inputMode &&
          <div className="matchArea">
            <div className="questionArea">
              <div className="matchAreaTitle">About Me</div>
              {INITIAL_STATE.fieldOrder.map((item, index) => {
                return <OkcInput key={index} inputName={item} inputtext={FIELDS[item]} />
              })}
            </div>
            <div className="answerArea">
              <div className="matchAreaTitle">Your Essay Text</div>
              <OkcEssay toggle={this.toggleInputMode} buttonType={SHOW_EDIT_BUTTON} />
            </div>
          </div>
        }

        {!this.state.inputMode &&
          <div className="matchArea">
            <div className="answerArea showMode">
              <div className="matchAreaTitle">Your Essay Text</div>
              <OkcEssay toggle={this.toggleInputMode} buttonType={SHOW_START_OVER} />
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { clear_store })(App);
