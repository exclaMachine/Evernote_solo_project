import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom'

import { fetchNotes, addNote } from "../../store/notes";

const NoteList = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const notesObject = useSelector((state) => state.noteState.entries);

    // console.log('noteObj', notesObject)
    const notes = Object.values(notesObject)

    let usersNotes = notes.filter(note => note.userId === sessionUser.id)


    console.log('notes', notes)

    useEffect(() => {
        dispatch(fetchNotes())
    }, [dispatch])

    let userNoteList;
    if (sessionUser) {
        userNoteList = (
            <div>
            {/* <button>Add Note</button> */}
            <h1>Note List</h1>
            <ul>
                {usersNotes.map(({ id, title}) => (
                    <li key={id}>
                        {title}
                    </li>
                ))}
            </ul>
        </div>
        )
    }


    return (
        (userNoteList)
        // <div>
        //     {/* <button>Add Note</button> */}
        //     <h1>Note List</h1>
        //     <ul>
        //         {notes.map(({ id, title}) => (
        //             <li key={id}>
        //                 {title}
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    )
}

export default NoteList;
