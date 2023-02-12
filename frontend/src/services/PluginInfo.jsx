import { useReducer } from "react"

const initialState = {};

function reducer(state, action) {
    switch(action.type) {
        case 'set':
            return action.value;
    }
}

const [state, dispatch] = useReducer(reducer, initialState);

export { state, dispatch }