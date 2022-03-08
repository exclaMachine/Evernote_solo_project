import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNote } from "../../store/notes";

const AddNote = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const reset = () => {
        setTitle('')
        setContent('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = {
            userId: sessionUser?.id,
            notebookId: null,
            title,
            content
        }

        dispatch(addNote(newNote));
        reset();
    }

    return (
        <div>
            <h1>Create Note</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                type='text'
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Content</label>
                <input
                type='textarea'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddNote;
