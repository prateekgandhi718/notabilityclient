import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        if (word==="danger") { //basically our alert banner was showing Danger: Incorrect cred... we wanted error and not danger. Danger was used because it's a bootstrap class.
            word = "error"
        }
        else if (word==="warning") {
            word = "done"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}}>
        {props.alertProp && <div className={`alert alert-${props.alertProp.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alertProp.type)}</strong>: {props.alertProp.msg} 
        </div>}
        </div>
    )
}

export default Alert