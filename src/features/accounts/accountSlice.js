import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit: (state, action) => {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        withdraw: (state, action) => {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                    }
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            }
        },

        payLoan: (state) => {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },

        convetingCurrency: (state) => {
            state.isLoading = true;
        }

    }

});

export const deposit = (amount, currency) => {

    if (currency === 'USD') {
        return { type: "account/deposit", payload: amount };
    }

    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency", payload: amount});
        // API call
        const host = 'api.frankfurter.app';
        const resp = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await resp.json();
        const converted = data.rates.USD;

        // dispatch action
        dispatch({ type: "account/deposit", payload: converted });
    }
}

export default accountSlice.reducer;

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// Here in the redux, we can use the default feature of JS to default set the state as initialState, We don't do that in useReducer
// export default function accountReducer(state = initalStateAccount, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false
//             }

//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload
//             }

//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             }

//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan
//             }

//         case "account/convertingCurrency":
//             return {
//                 ...state,
//                 isLoading: true
//             }    

//         default:
//             // In useReducer we throw error here, but in redux it is advised to not throw the error, but simply return the state instead
//             return state;
//     }
// }

// export const deposit = (amount, currency) => {

//     if (currency === 'USD') {
//         return { type: "account/deposit", payload: amount };
//     }

//     return async function (dispatch, getState) {
//         dispatch({ type: "account/convertingCurrency", payload: amount});
//         // API call
//         const host = 'api.frankfurter.app';
//         const resp = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
//         const data = await resp.json();
//         const converted = data.rates.USD;

//         // dispatch action
//         dispatch({ type: "account/deposit", payload: converted });
//     }
// }

// export const withdraw = (amount) => {
//     return { type: "account/withdraw", payload: amount };
// }

// export const requestLoan = (amount, purpose) => {
//     return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export const payLoan = () => {
//     return { type: "account/payLoan" }
// }

