import { combineReducers, createStore } from "redux"
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

// In this way we can create the store and then call dispatch on it.
const store = createStore(rootReducer);

export default store;