import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, SAVE_EVENT } from '../Actions'

function loadFromLocal() {
    try {
        const getLocal = localStorage.getItem('CalendarEvents')
        if (getLocal) {
            return JSON.parse(getLocal)
        }
    } catch(e) {
        console.log(e)
    }
}
const localState = loadFromLocal()


export default function reducer(state = localState, action) {
    switch (action.type) {

        case ADD_EVENT:
            return [...state, action.payload]

        case DELETE_EVENT:
            const idx = state.findIndex(event => event.id === action.id)
            return [
                ...state.slice(0, idx),
                ...state.slice(idx + 1)
            ]

        case EDIT_EVENT:
            return state.map(event => {
                if (event.id === action.id) {
                    return {...event, dynamic: true}
                    
                } else return event      
            })
            
        case SAVE_EVENT:
            return action.payload

        default:
            return state
    }
}