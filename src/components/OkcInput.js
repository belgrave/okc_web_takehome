import React from 'react';
import { connect } from "react-redux";
import { submitField } from '../madlibs';

class OkcInput extends React.Component {

    onBlurHandler = (e) => {
        this.props.submitField(e.target.name, e.target.value);
    }

    render() {
        return (
            <div className="OkcInput">
                <label htmlFor={this.props.inputName}>{this.props.inputtext}</label>
                <br />
                <input type="text"
                    id={this.props.inputName}
                    name={this.props.inputName}
                    onBlur={this.onBlurHandler}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { submitField })(OkcInput); 