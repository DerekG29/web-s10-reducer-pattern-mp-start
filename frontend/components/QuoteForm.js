import React, { useReducer } from 'react';

const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';

const state0 = {
  authorName: '',
  quoteText: '',
};

const reducer = (state, action) => {
  switch(action.type) {
    
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case RESET_FORM:
      return state0;

    default:
      return state;
  }
};

export default function TodoForm({ createQuote = () => { } }) {
  const [state, dispatch] = useReducer(reducer, state0);

  const onChange = evt => {
    const { name, value } = evt.target;
    dispatch({ type: CHANGE_INPUT, payload: { name: name, value: value } });
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  }
  
  const onNewQuote = evt => {
    evt.preventDefault();
    createQuote({ authorName: state.authorName, quoteText: state.quoteText });
    resetForm();
  }

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          value={state.authorName}
          placeholder='type author name'
          onChange={onChange}
          required
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          value={state.quoteText}
          placeholder='type quote'
          onChange={onChange}
          required
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
        >DO IT!</button>
      </label>
    </form>
  )
}
