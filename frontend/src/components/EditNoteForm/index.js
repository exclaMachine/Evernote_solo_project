import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateNoteThunk } from "../../store/notes";

const UpdateNote = ({id}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const note = useSelector(state => state.noteState.entries)


    console.log('currentTitle', note[id])
    //similar to post but this is set to what it previously was
    const [title, setTitle] = useState(note[id].title);
    const [content, setContent] = useState(note[id].content);
    const [errors, setErrors] = useState([])
    // console.log('id', id);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedNote;
            if (id) {
                updatedNote = {
                    userId: sessionUser?.id,
                    notebookId: note[id].notebookId,
                    title,
                    content,
                }
            } else {
                updatedNote = {
                    userId: sessionUser?.id,
                    notebookId: null,
                    title,
                    content,
            }
        }

        if (title && content) {
            setErrors([]);
            return dispatch(updateNoteThunk(id, updatedNote))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Title and content cannot be empty']);

        // const reset = () => {
        //     setTitle(note[id].title)
        //     setContent(note[id].content)
        // }
        // dispatch(updateNoteThunk(id, updatedNote));
        // reset();
    }

    return (
        <div>
            {/* <h1>Update Note</h1> */}
            <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                <label className="label title">Title</label>
                <input
                className='title-input'
                type='text'
                value= {title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label className="label content">Content</label>
                <textarea
                className='textarea'
                value= {content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Update Note</button>
            </form>
        </div>
    )
}

export default UpdateNote;
