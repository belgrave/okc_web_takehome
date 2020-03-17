import React from 'react';
import { connect } from "react-redux";
import { getTextTemplates } from "../helpers";
import { FIELD_NAMES, SHOW_EDIT_BUTTON, SHOW_START_OVER } from '../constants';

class OkcEssay extends React.Component {

    constructor(props) {
        super(props);
        const textIndex = this.getRandomInt(0, 6);
        this.state = {
            show: this.props.buttonType,
            textIndex
        };
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    formatField = (fieldData, fieldName) => {
        if (fieldData[fieldName]) {
            const fieldtext = "<b>" + fieldData[fieldName] + "</b>";
            const textTemplates = getTextTemplates(fieldName);
            const textIndex = this.state.textIndex;
            return textTemplates[textIndex].replace(/\$answer/g, fieldtext) + " ";
        }
        return " ";
    }

    formatText = (fieldData) => {
        let text = [];

        text.push(this.formatField(fieldData, FIELD_NAMES.hometown));
        text.push(this.formatField(fieldData, FIELD_NAMES.favoriteFood));
        text.push(this.formatField(fieldData, FIELD_NAMES.loveToDo));
        text.push(this.formatField(fieldData, FIELD_NAMES.music));
        text.push(this.formatField(fieldData, FIELD_NAMES.messageIf));
        text.push(this.formatField(fieldData, FIELD_NAMES.bar));

        return text;
    }

    fullForm = (fieldData) => {
        return (fieldData &&
            fieldData[FIELD_NAMES.hometown] &&
            fieldData[FIELD_NAMES.favoriteFood] &&
            fieldData[FIELD_NAMES.loveToDo] &&
            fieldData[FIELD_NAMES.music] &&
            fieldData[FIELD_NAMES.messageIf] &&
            fieldData[FIELD_NAMES.bar]);
    }

    onClickHandler = (e) => {
        if (this.state.show === SHOW_EDIT_BUTTON) {
            this.setState({ show: SHOW_START_OVER });
        }
        this.props.toggle();
    }

    render() {
        const essay = this.props.fieldAnswers ? this.formatText(this.props.fieldAnswers).join('') : "";
        return (
            <div className="EssayBody">
                <div className='EssayText'>
                    <div dangerouslySetInnerHTML={{ __html: essay }} />
                </div>

                {this.fullForm(this.props.fieldAnswers) &&
                    <button type="button" onClick={this.onClickHandler} >{this.state.show}</button>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { fieldAnswers: state.fieldAnswers, essayText: state.essayText };
}

export default connect(mapStateToProps)(OkcEssay);