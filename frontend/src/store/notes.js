import { csrfFetch } from './csrf';


const LOAD_NOTES = 'note/loadNotes';
const ADD_NOTE = 'note/addNote'
const DELETE_NOTE = 'note/deleteNote'


export const loadNotes = (notes) => {
    return {
        type: LOAD_NOTES,
        notes
    }
}

export const addNote = (newNote) => {
    return {
        type: ADD_NOTE,
        newNote
    }
}

export const deleteNote = (id) => {
    return {
        type: DELETE_NOTE,
        id
    }
}

//thunk creator for DELETE request
export const removeNote = (id) => async dispatch => {
    // const res = await fetch(`/api/notes/${id}`, {
    const res = await csrfFetch(`/api/notes/${id}`, {
        method: 'DELETE',
    })
    let idToDelete = await res.json()
    // console.log('data', data)
    dispatch(deleteNote(idToDelete))
    // return data;
}

//thunk creator for GET request
export const fetchNotes = () => async dispatch => {
    const res = await fetch('/api/notes')
    const notes = await res.json()
    console.log(notes);
    dispatch(loadNotes(notes))
    return notes;
}

//thunk creator for POST request
export const postNoteThunk = (data) => async dispatch => {
    const res = await csrfFetch('/api/notes', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const newNote = await res.json()
    console.log(newNote)
    dispatch(addNote(newNote))
    return newNote;
    // return addDispatch.id;
}

const initialState = {entries: {}}

const noteReducer = (state = initialState, action) => {
    let newState;
    let newEntries;
    switch (action.type) {
        case LOAD_NOTES:
            newState = {...state};
            newEntries = {};
            console.log('action', action)
            action.notes.forEach(note => newEntries[note.id] = note)
            newState.entries = newEntries;
            return newState;
        case ADD_NOTE:
            newState = {...state};
            newEntries = {...state.entries}
            newEntries[action.newNote.id] = action.newNote;
            newState.entries = newEntries
            return newState;
        case DELETE_NOTE:
            newState = JSON.parse(JSON.stringify(state));
            // newState = {...state};
            delete newState.entries[action.id]
            console.log('what is it', newState);
            console.log('action', action)
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
