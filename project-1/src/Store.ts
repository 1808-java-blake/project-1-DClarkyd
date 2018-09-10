import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { state } from 'src/reducers';
// import  logger  from 'redux-logger';



const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
  // other store enhancers if any
);

export const store: Store<any> = createStore(
  state,
  enhancer
);