import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const { note, updatenote } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <>
            <div className="col-md-4 my-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title border-bottom pb-1"> {note.title} </h5>

                        <p className="card-text"> {note.description} </p>
                        <p className="card-text border-bottom pb-2"> {note.tag} </p>

                        {/* <div className="d-flex align-items-center justify-content-evenly">
                            <i className="fa-solid fa-file-pen" onClick={() => { updatenote(note) }} ></i>

                            <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }} ></i>
                        </div> */}

                        <div className="row text-center justify-content-evenly">
                            <div onClick={() => { updatenote(note) }} className='update col-6 bg-opacity-50  border-success border-end-0 rounded-start'>
                                <i className="fa-solid fa-file-pen"  ></i></div>
                            <div onClick={() => { deleteNote(note._id) }} className='delete col-6 bg-opacity-50 border-danger border-start-0 rounded-end'>
                                <i className="fa-solid fa-trash"  ></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem