import React, { useState } from 'react';
import { dbService, storageService } from '../mybase';

const Hweet = ( { hweet, user }) => {

    const [edit, setEdit] = useState(false);
    const [newText, setNewText] = useState(hweet.text);

    

    const onDelete = async() => {
        const ok = window.confirm('Delete this?');
        if(ok) {
            await dbService.doc(`hweets/${hweet.id}`).delete();
            await storageService.refFromURL(hweet.fileurl).delete();
            
        }
    }

    const onToggleEdit = () => {
        setEdit((prev) => !prev);
    }

    const onCancle = () => {
        setEdit((prev) => !prev);
        setNewText(hweet.text);
    }

    const onChange = (e) => {
        const { value } = e.target;
        setNewText(prev => value);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.doc(`hweets/${hweet.id}`).update({
            text : newText
        })
        onToggleEdit();
    }


    return (
        <>
        <div>
            { edit ? (
                <>
                <form onSubmit={onSubmit}>
                    <input type = 'text' placeholder='typing pleaze...' value={newText} onChange={onChange} required />
                    <input type='submit' value='Update' />
                </form>
                <button onClick={onCancle}>cancle</button>
                </>
            ) : (
            <>
                { hweet.fileurl && <img src={hweet.fileurl} width='100px' height='100px' alt='이미지'/>}
                <span>{hweet.text}</span>
                { hweet.creatorid === user.uid ? <button onClick={onDelete}>Delete</button> : null}
                { hweet.creatorid === user.uid ? <button onClick={onToggleEdit}>Edit</button> : null}
            </>
            )}
        </div>
        </>

    )
}

export default Hweet;