import { createSlice } from "@reduxjs/toolkit"


interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {state.value += 1},
        decrement: (state) => {state.value -= 1},
        incrementByAmount: (state, action: {payload: number}) => {state.value += action.payload},
        decrementByAmount: (state, action: {payload: number}) => {state.value -= action.payload}
    }
})

export const {increment, decrement, incrementByAmount, decrementByAmount} = counterSlice.actions
export default counterSlice.reducer