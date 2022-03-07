const LOAD_NOTEBOOKS = 'notebook/loadNotebooks';
const ADD_NOTEBOOK = 'notebook/addNotebook'

export const loadNotebooks = (notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        notebooks
    }
}

export const addNotebook = (newNotebook) => {
    return {
        type: ADD_NOTEBOOK,
        newNotebook
    }
}

//thunk creator for GET request
export const fetchNotebooks = () => async dispatch => {
    const res = await fetch('/api/notebooks')
    const notebooks = await res.json()
    console.log(notebooks);
    dispatch(loadNotebooks(notebooks))
    return notebooks;
}

const initialState = {entries: {}}

const notebookReducer = (state = initialState, action) => {
    let newState;
    let newEntries;
    switch (action.type) {
        case LOAD_NOTEBOOKS:
            newState = {...state};
            newEntries = {};
            console.log('action', action)
            action.notebooks.forEach(notebook => newEntries[notebook.id] = notebook)
            newState.entries = newEntries;
            // console.log('nnnnnn', newState)
            return newState;
            // return {...state, entries: [...action.notebooks]}
        case ADD_NOTEBOOK:
            newState = {...state};
            newEntries = {...state.entries}
            newEntries[action.newNotebook.id] = action.newNotebook;
            newState.entries = newEntries
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
