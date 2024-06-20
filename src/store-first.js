import { combineReducers, createStore } from "redux"

const initalStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalId: "",
    createdAt: "",
}

// Here in the redux, we can use the default feature of JS to default set the state as initialState, We don't do that in useReducer
const accountReducer = (state = initalStateAccount, action) => {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload
            }

        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }

        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            }

        case "account/payLoan":
            return {
                ...state,
                loan: 0,
                loanPurpose: "",
                balance: state.balance - state.loan
            }

        default:
            // In useReducer we throw error here, but in redux it is advised to not throw the error, but simply return the state instead
            return state;
    }
}

const customerReducer = (state = initialStateCustomer, action) => {
    switch (action.type) {
        case "customer/createCustomer":
            return {
               ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            }

        case "customer/updateName":
            return {
               ...state,
                fullName: action.payload,
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

// In this way we can create the store and then call dispatch on it.
const store = createStore(rootReducer);

// store.dispatch({type: "account/deposit", payload: 500});

// console.log(store.getState());

// store.dispatch({type: "account/withdraw", payload: 300});

// console.log(store.getState());

// store.dispatch({type: "account/requestLoan", payload: {
//     amount: 1000,
//     purpose: "Buy a car"
// }});

// console.log(store.getState());

// store.dispatch({type: "account/payLoan"});

// console.log(store.getState());

const deposit = (amount) => {
    return { type: "account/deposit", payload: amount };
}

const withdraw = (amount) => {
    return { type: "account/withdraw", payload: amount };
}

const requestLoan = (amount, purpose) => {
    return { type: "account/requestLoan", payload: {amount, purpose} };
}

const payLoan = () => {
    return { type: "account/payLoan"}
}

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(1000, "Buy a car"));
// store.dispatch(payLoan());
// console.log(store.getState());

const createCustomer = (fullName, nationalId) => {
    return { type: "customer/createCustomer", payload: {fullName, nationalId, createdAt: new Date().toISOString()} };
}

const updateName = (fullName) => {
    return { type: "customer/updateName", payload: fullName };
}

// store.dispatch(createCustomer("John", "123456789"));
// console.log(store.getState());

// store.dispatch(updateName("Jane"));
// console.log(store.getState());