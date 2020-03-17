import { FIELD_NAMES, } from "./constants";

// Action types
// ----------------------------------------------------------------------------
export const SUBMIT_FIELD = "MADLIBS.SUBMIT_FIELD";
export const INCREMENT_COUNTER = "MADLIBS.INCREMENT_COUNTER";
export const CLEAR_STORE = "MADLIBS.CLEAR_STORE";

// Initial state
// ----------------------------------------------------------------------------
export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],

  fieldAnswers: {},
  essayText: "",

  counter: 1,
};

// Reducer
// ----------------------------------------------------------------------------
export function reducer(state = INITIAL_STATE, action) {

  switch (action.type) {
    case SUBMIT_FIELD: {
      return {
        ...state,
        fieldAnswers: {
          ...state.fieldAnswers,
          [action.payload.name]: action.payload.answer
        },
        essayText: ""
      };
    }

    case CLEAR_STORE: {
      return {
        INITIAL_STATE
      };
    }

    case INCREMENT_COUNTER: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }

    default:
      return state;
  }
}

// Action creators
// ----------------------------------------------------------------------------
export function submitField(name, answer) {
  return {
    type: SUBMIT_FIELD,
    payload: { name, answer }
  };
}

export function clear_store() {
  return { type: CLEAR_STORE };
}

export function increment() {
  return { type: INCREMENT_COUNTER };
}
