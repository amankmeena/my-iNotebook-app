import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const [notes, setNotes] = useState([])
    const host = "http://localhost:5000"


    //////////////////// Fetch all Notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authtoken')
            }
        });

        let note = await response.json();
        setNotes(note);

        // console.log(typeof localStorage.getItem('authtoken'))
        // console.log(typeof note, note);
        // console.log(note[1]);
    }



    // const notesdata = async () => {
    //     const data = await getNotes()
    //     console.log(data)
    //     return data;
    // };
    // console.log(notesdata())


    //////////////////// Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        if (response.status !== 400) {
            let note = await response.json();
            // console.log(note);
            setNotes(notes.concat(note))
        }
        else {
            // // console.log(response)
            // let note = await response.json();
            // console.log(note)
            // console.log(note.errors[0].msg)
            console.log("some error occ.")
        }
    }


    ///////////////////// Update a Note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authtoken')
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });

        let datajson = await response.json();
        console.log(datajson);

        const newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to update in clint
        for (let index = 0; index < newNotes.length; index++) {

            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                // console.log(newNotes[index])
                break;
            }

            setNotes(newNotes)
        }

    }


    //////////////////////// Delete a Note
    const deleteNote = async (del_id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${del_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authtoken')
            }
        });

        let NOTE = response;
        console.log(NOTE)

        // console.log(`deletng note of id: ${del_id}`);
        const newNotes = notes.filter((note) => { return note._id !== del_id })

        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;