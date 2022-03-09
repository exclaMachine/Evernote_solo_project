import { csrfFetch } from './csrf';


const LOAD_NOTEBOOKS = 'note/loadNotebooks';
const ADD_NOTEBOOK = 'note/addNotebook'
const DELETE_NOTEBOOK = 'note/deleteNotebook'


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

export const deleteNotebook = (id) => {
    return {
        type: DELETE_NOTEBOOK,
        id
    }
}

//thunk creator for DELETE request
export const removeNotebookThunk = (id) => async dispatch => {
    // const res = await fetch(`/api/notebooks/${id}`, {
    const res = await csrfFetch(`/api/notebooks/${id}`, {
        method: 'DELETE',
    })
    let idToDelete = await res.json()
    // console.log('data', data)
    dispatch(deleteNotebook(idToDelete))
    // return data;
}

//thunk creator for GET request
export const fetchNotesThunk = () => async dispatch => {
    const res = await fetch('/api/notebooks')
    const notebooks = await res.json()
    console.log(notebooks);
    dispatch(loadNotebooks(notebooks))
    return notebooks;
}

//thunk creator for POST request
export const postNotebookThunk = (data) => async dispatch => {
    const res = await csrfFetch('/api/notebooks', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const newNotebook = await res.json()
    console.log(newNotebook)
    dispatch(addNotebook(newNotebook))
    return newNotebook;
    // return addDispatch.id;
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
            return newState;
        case ADD_NOTEBOOK:
            newState = {...state};
            newEntries = {...state.entries}
            newEntries[action.newNotebook.id] = action.newNotebook;
            newState.entries = newEntries
            return newState;
        case DELETE_NOTEBOOK:
            newState = {...state};
            // newState = JSON.parse(JSON.stringify(state));
            delete newState.entries[action.id]
            console.log('what is it', newState);
            console.log('action', action)
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
