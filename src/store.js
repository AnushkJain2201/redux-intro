const initalState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

// Here in the redux, we can use the default feature of JS to default set the state as initialState, We don't do that in useReducer
const reducer = (state = initalState, action) => {
    switch(action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload
            }

        case "accout/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload
            }

        default:
            // In useReducer we throw error here, but in redux it is advised to not throw the error, but simply return the state instead
            return state;
    }
}