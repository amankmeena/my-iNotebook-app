import React from 'react'
// import React, { useContext, useState } from 'react'
// import noteContext from '../context/notes/noteContext';

function UpdateNote(props) {
    const {note_to_edit} = props
    // const context = useContext(noteContext);
    // const { editNote } = context;
    
    // const [note, setNote] = useState({title: note_to_edit.title, description: note_to_edit.description, tag: note_to_edit.tag})

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     UpdateNote(note.title, note.description, note.tag);
    // }

    const onchange = (e) => {
        // setNote({...note ,[e.target.name]: e.target.value})
    }

    return (
        <>
            <div className='container my-3'>
                {/* <h2>Add a Note</h2> */}

                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note_to_edit.title} name="title" onChange={onchange} aria-describedby="titleHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note_to_edit.description} name='description' onChange={onchange} aria-describedby="descHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note_to_edit.tag} name='tag' onChange={onchange} aria-describedby="tagHelp" />
                    </div>

                    {/* <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
                </form>
            </div>
        </>
    )
}

export default UpdateNote