import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";

function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;    // Or const notes = context.notes;

    const Ref = useRef(null)
    const RefClose = useRef(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            getNotes()
        } else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleOnClick = () => {
        // console.log('updatng note...', note)
        editNote(note.id, note.etitle, note.edescription, note.etag);

        RefClose.current.click();
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNoteHere = (currentnote) => {
        Ref.current.click();
        // console.log(currentnote)
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }

    return (
        <>
            <AddNote />

            <button ref={Ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form Body */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onchange} aria-describedby="titleHelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onchange} aria-describedby="descHelp" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onchange} aria-describedby="tagHelp" />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button ref={RefClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleOnClick}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <h4>Your Notes</h4>

                <div className="container row">
                    {notes.length === 0 ? 'No Notes To Display!' :
                        notes.map((note) => {
                            return <Noteitem key={note._id} updatenote={updateNoteHere} note={note} />
                        })
                    }
                    {/* {notes.length === 0 && 'No Notes To Display!'}
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updatenote={updateNoteHere} note={note} />
                    })} */}
                </div>
            </div>
        </>
    )
}

export default Notes