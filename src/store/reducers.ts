// Modules Import
import { useCombinedReducers } from '@Hooks';
import {
  loadingReducer,
  userReducer,
  tenantReducer,
  systemReducer,
  jobReducer
} from '@Modules';

// Types Import
import { DispatchType, StateType } from '@Types';

const useAppReducer = (initialState: StateType): [StateType, DispatchType] =>
  useCombinedReducers(
    {
      loading: loadingReducer,
      user: userReducer,
      tenant: tenantReducer,
      system: systemReducer,
      job: jobReducer
    },
    initialState
  );

export { useAppReducer };
