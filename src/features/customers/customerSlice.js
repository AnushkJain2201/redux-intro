import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(name, countryId) {
                return {
                    payload: {
                        fullName: name,
                        nationalId: countryId,
                        createdAt: new Date().toISOString()
                    }
                }
            },

            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            }
        },

        updateCustomer: (state, action) => {
            state.fullName = action.payload;
        }
    }
});

export default customerSlice.reducer;

export const { createCustomer, update } = customerSlice.actions;



// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                ...state,
//                 fullName: action.payload.fullName,
//                 nationalId: action.payload.nationalId,
//                 createdAt: action.payload.createdAt,
//             }

//         case "customer/updateName":
//             return {
//                ...state,
//                 fullName: action.payload,
//             }

//         default:
//             return state;
//     }
// }

// export const createCustomer = (fullName, nationalId) => {
//     return { type: "customer/createCustomer", payload: {fullName, nationalId, createdAt: new Date().toISOString()} };
// }

// export const updateName = (fullName) => {
//     return { type: "customer/updateName", payload: fullName };
// }
