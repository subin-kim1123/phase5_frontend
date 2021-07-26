import React from 'react';
import './style.css'

function Popup(props) {
    return(props.trigger) ? (
        <div className = "popup">
            <div classNmae = "popup-inner">
                <button className="close-btn">cancel</button>
                {props.children}
            </div>
        </div>
    ): "";
}

export default Popup