import React, { useReducer } from 'react';
import Quotes from './Quotes';
import QuoteForm from './QuoteForm';

const CREATE_QUOTE = 'CREATE_QUOTE';
const DELETE_QUOTE = 'DELETE_QUOTE';
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY';
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE';
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';

let id = 1
const getNextId = () => id++
const quotes = [
  {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  },
]

const state0 = {
  quotes: quotes,
  displayAllQuotes: true,
  highlightedQuote: null
}

const reducer = (state, action) => {
  switch(action.type) {

    case CREATE_QUOTE:
      return { ...state,
        quotes: [...state.quotes, action.payload]
      };

    case DELETE_QUOTE:
      return { ...state,
        quotes: state.quotes.filter(quote => quote.id != action.payload)
      };

    case EDIT_QUOTE_AUTHENTICITY:
      return { ...state,
        quotes: state.quotes.map(quote => {
          if (quote.id != action.payload) return quote;
          return { ...quote, apocryphal: !quote.apocryphal}
        })
      };

    case SET_HIGHLIGHTED_QUOTE:
      return { ...state,
        highlightedQuote: action.payload === state.highlightedQuote ? null : action.payload
      };

    case TOGGLE_VISIBILITY:
      return { ...state,
        displayAllQuotes: !state.displayAllQuotes
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, state0);

  const createQuote = ({ authorName, quoteText }) => {
    const newQuote = { id: getNextId(), authorName, quoteText, apocryphal: false }
    dispatch({ type: CREATE_QUOTE, payload: newQuote });
  }

  const deleteQuote = id => {
    dispatch({ type: DELETE_QUOTE, payload: id });
  }

  const editQuoteAuthenticity = id => {
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id });
  }

  const setHighlightedQuote = id => {
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id });
  }
  
  const toggleVisibility = () => {
    dispatch({ type: TOGGLE_VISIBILITY })
  }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={state.quotes}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
        deleteQuote={deleteQuote}
        editQuoteAuthenticity={editQuoteAuthenticity}
        setHighlightedQuote={setHighlightedQuote}
        toggleVisibility={toggleVisibility}
      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
