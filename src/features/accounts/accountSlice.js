const initalStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
}

// Here in the redux, we can use the default feature of JS to default set the state as initialState, We don't do that in useReducer
export default function accountReducer(state = initalStateAccount, action) {
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

export const deposit = (amount) => {
    return { type: "account/deposit", payload: amount };
}

export const withdraw = (amount) => {
    return { type: "account/withdraw", payload: amount };
}

export const requestLoan = (amount, purpose) => {
    return { type: "account/requestLoan", payload: {amount, purpose} };
}

export const payLoan = () => {
    return { type: "account/payLoan"}
}

