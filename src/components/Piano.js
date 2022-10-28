import React from 'react'; 
import { Key } from './Key.js'
import './css/Piano.css'
import {KEY_TO_NOTE, NOTES} from './global/contants.js'

class Piano extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            pressedKeys: []
        }
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp)
    }

    handleKeyDown= (event) => {
        if (event.repeat){
            return;
        }        
        const key = event.key;
        const updatedPressedKeys = [...this.state.pressedKeys];
        if (!updatedPressedKeys.includes(key)){
            updatedPressedKeys.push(key);
        }

        this.setState({
            pressedKeys: updatedPressedKeys, 
        })

        this.playNote(KEY_TO_NOTE[key])
    }

    handleKeyUp = (event) => {
        const index = this.state.pressedKeys.indexOf(event.key);
        if (index > -1 ) {
            this.setState(state => (
                    {
                        pressedKeys: state.pressedKeys.splice(index, 1)
                    }
                )
            );
        }
    }

    playNote = (note) => {
        if (note) {
            const noteAudio = new Audio(document.getElementById(note).src);
            noteAudio.play()
        }
    }
    
    render() {
        const keys = NOTES.map((note, index) => {
            return (
                <Key
                    key={index}
                    note={note}
                    pressedKeys= {this.state.pressedKeys}
                /> 
            )
        })

        const audioFiles = NOTES.map((note, index) => {
            return (
                <audio
                    id={note}
                    key={index}
                    src= {`../../notes/${note.toUpperCase()}.mp3`}
                /> 
            )
        })

        return (
            <div>
                <div className='piano'>
                        {keys}
                    </div> 
                    <div>
                        {audioFiles}
                </div>
            </div>
        )                  
    }
}

export { Piano }     