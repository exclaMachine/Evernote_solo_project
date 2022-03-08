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

//thunk creator for GET request
export const fetchNotes = () => async dispatch => {
    const res = await fetch('/api/notes')
    const notes = await res.json()
    console.log(notes);
    dispatch(loadNotes(notes))
    return notes;
}

//thunk creator for POST request
export const postNote = (data) => async dispatch => {
    const res = await fetch('/api/notes', {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    const newNote = await res.json()

    dispatch(addNote(newNote))
    return newNote;
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
            const newState = {...state};
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default noteReducer;
