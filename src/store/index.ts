export { default as createStore } from "./createStore";
export { default as connectStore } from "./connectStore";

// Types Import
import { StateType } from "@Types";

export const initialState: StateType = {
  loading: {},
  system: {
    list: [],
    tenantItemList: [],
    manualEntryList: []
  },
  tenant: {},
  job: {
    jobTypeConfigSchemas: {},
    availableJobTypes: [],
    jobOptions: {
      systemOptions: [],
      manualSystemOptions: [],
      jobTypeOptions: []
    },
    statuses: [],
    selectedJob: {
      status: null,
      history: []
    }
  },
  user: {}
};
