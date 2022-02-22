import React from 'react';

type StateType = {}
type ActionType = {
  type: ''
}

const newPasswrodReducer = (state: StateType = {}, action: ActionType) => {
  switch (action.type) {
    default: {
      return state
    }
  }
};

export default newPasswrodReducer;