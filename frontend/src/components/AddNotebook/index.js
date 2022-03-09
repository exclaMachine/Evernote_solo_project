import { useState } from "react";
import { useDispatch } from "react-redux";

import { postNotebookThunk } from "../../store/notebooks";

const AddNotebook = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');

    const reset = () => {
        setTitle('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotebook = {
            title
        }

        dispatch(postNotebookThunk(newNotebook));
        reset();
    }

    return (
        <div>
            <h1>Create Notebook</h1>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddNotebook;
