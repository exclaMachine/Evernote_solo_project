import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postNotebookThunk } from "../../store/notebooks";
import './AddNotebook.css'
import '../../../src/index.css'

const AddNotebook = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);


    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setTitle('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNotebook = {
            userId: sessionUser?.id,
            title
        }

        if (title) {
            setErrors([]);
            reset();
            return dispatch(postNotebookThunk(newNotebook))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        }
        return setErrors(['Title cannot be empty']);


    }

    return (
        <div className="addnotebook-form">
            {/* <h1>Create Notebook</h1> */}
            <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                <label className="label title">New Notebook Title</label>
                <input
                className="title-input"
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Create Notebook</button>
            </form>
        </div>
    )
}

export default AddNotebook;
