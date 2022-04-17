import React, { useState, useEffect } from 'react'
import { IconPicker } from 'react-fa-icon-picker'
import Icon from './Icon';


const IconChooser = (props) => {

    // <IconChooser 
    // master={props.master} 
    // setMaster={props.setMaster} 
    // iconName={propertyicon1} 
    // iconColor={propertycolor1} >
    // </IconChooser>

    const camelize = (s) => {
        const word = s.split(' ')[1].replace(/-./g, x => x[1].toUpperCase())
        console.log(word)
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const toKebabCase = (s) => {
        const word = s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        console.log(word);
        return "fa-solid " + word + " fa-5x";
    }

    //kebab case to camel case


    return (
        <div>
            <div>{camelize(props.master[props.iconName])}</div>
            <div className='center'>
                <div>Choose Icon:</div>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <div style={{ display: 'inline-block' }}>
                        <input type="color"
                            id={props.iconColor}
                            name={props.iconColor}
                            value={props.master[props.iconColor]}
                            onChange={e => props.setMaster({ ...props.master, [props.iconColor]: e.target.value })}
                        />                        
                        <IconPicker
                            value={camelize(props.master[props.iconName])}
                            onChange={(v) => props.setMaster({ ...props.master, [props.iconName]: toKebabCase(v) })}
                        />
                    </div>
                    <span style={{ padding: 10 }}>
                        <Icon iconName={camelize(props.master[props.iconName])} size={50} color={props.master[props.iconColor]} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default IconChooser