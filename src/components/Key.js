import React from 'react'; 
import './css/Key.css'
import {NOTE_TO_KEY} from './global/contants.js'

class Key extends React.Component {
    render() {

        let keyClassName = 'key';
        const noteIsFlat = this.noteIsFlat(this.props.note)
        const keyIspressed = this.keyIsPressed(this.props.note, this.props.pressedKeys); 


        if(noteIsFlat) {
            keyClassName += ' flat';
            return  (
                <div className={keyClassName}></div>
            )
        }
           
        if(keyIspressed) {
            keyClassName += ' pressed';

        }
        return (
            <div className={keyClassName}>
                <div className='key-text'>
                    {this.props.note.toUpperCase()}
                </div>
            </div>
        )                  
    }
    //functions 
    noteIsFlat(note) {
        return note.length > 1
    }

    keyIsPressed (note, pressedKeys) {
        return pressedKeys.includes(NOTE_TO_KEY[note])
    }
}

export { Key }     