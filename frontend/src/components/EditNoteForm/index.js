import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateNoteThunk } from "../../store/notes";

const UpdateNote = ({id}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const note = useSelector(state => state.noteState.entries)


    console.log('currentTitle', note)
    //similar to post but this is set to what it previously was
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const reset = () => {
        setTitle('')
        setContent('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedNote = {
            userId: sessionUser?.id,
            notebookId: null,
            title,
            content,
        }

        dispatch(updateNoteThunk(id, updatedNote));
        reset();
    }

    return (
        <div>
            <h1>Update Note</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                type='text'
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Content</label>
                <textarea
                // type='textarea'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Update Note</button>
            </form>
        </div>
    )
}

export default UpdateNote;
