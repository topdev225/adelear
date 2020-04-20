import { useAppReducer } from './reducers';

// Types Import
import { StateType, DispatchType } from '@Types';

const createStore = (initialState: StateType): [StateType, DispatchType] => {
  const [state, dispatch] = useAppReducer(initialState);
  return [state, dispatch];
};

export default createStore;
