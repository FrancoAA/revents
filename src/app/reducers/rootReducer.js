import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';


const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: formReducer,
  modals: modalReducer,
  auth: authReducer
});

export default rootReducer;