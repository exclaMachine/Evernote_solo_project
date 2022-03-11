import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postNoteThunk } from "../../store/notes";
import './AddNoteForm.css'


const AddNote = ({id}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setTitle('')
        setContent('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newNote;
        if (id) {
            newNote = {
                userId: sessionUser?.id,
                notebookId: id,
                title,
                content,
                // createdAt: new Date(),
                // updatedAt: new Date()
            }
        }  else {
                newNote = {
                    userId: sessionUser?.id,
                    notebookId: null,
                    title,
                    content,
            }
        }

        if (title && content) {
            setErrors([]);
            reset();
            return dispatch(postNoteThunk(newNote))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Title and content cannot be empty']);

        // dispatch(postNoteThunk(newNote));
        // reset();
    }

    return (
        <div className="addnote-form">
            {/* <h1>Create Note</h1> */}
            <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                <label>Note Title</label>
                <input
                type='text'
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Content</label>
                <textarea
                className="textarea"
                rows='2'
                cols='33'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Create Note</button>
            </form>
        </div>
    )
}

export default AddNote;
