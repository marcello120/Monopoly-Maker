import React, { useState, useEffect } from 'react'
import IconChooser from './IconChooser';


const SinglePropertyInputWithIcon = (props) => {

    const incolor = props.incolor;
    const propertyicon = incolor + "icon";
    const propertycolor = incolor + "color";


    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <IconChooser master={props.master} setMaster={props.setMaster} iconName={propertyicon} iconColor={propertycolor} ></IconChooser>
                <label> {props.title} : </label>
                <input
                    value={props.master[incolor]}
                    type="text"
                    onChange={e => props.setMaster({ ...props.master, [incolor]: e.target.value })}
                    name={incolor}
                />
            </div>
        </div>
    )
}

export default SinglePropertyInputWithIcon