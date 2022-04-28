import React, { useState, useEffect } from 'react'
import IconChooser from './IconChooser';


const DualPropertyInputWithIcon = (props) => {

    const incolor = props.incolor;
    const property1 = incolor + 1;
    const property2 = incolor + 2;
    const propertyicon1 = incolor + "1icon";
    const propertyicon2 = incolor + "2icon";
    const propertycolor1 = incolor + "1color";
    const propertycolor2 = incolor + "2color";
    // const defaultcolor = props.master[propertyColor];
    // const defaulticon = props.master[propertyColor]


    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <h4>  {props.title }/1 </h4>
                <IconChooser master={props.master} setMaster={props.setMaster} iconName={propertyicon1} iconColor={propertycolor1} ></IconChooser>
                <label> {incolor + " 1:"} </label>
                <input
                    value={props.master[property1]}
                    type="text"
                    onChange={e => props.setMaster({ ...props.master, [property1]: e.target.value })}
                    onFocus={e => props.scroll ? props.scroll(): console.log("no scroll")}
                    name={property1}
                />
            </div>
            <div>
                <h4> {props.title }/2 </h4>
                <IconChooser master={props.master} setMaster={props.setMaster} iconName={propertyicon2} iconColor={propertycolor2} ></IconChooser>
                <label> {incolor + " 2:"} </label>
                <input
                    value={props.master[property2]}
                    type="text"
                    onChange={e => props.setMaster({ ...props.master, [property2]: e.target.value })}
                    onFocus={e => props.scroll ? props.scroll(): console.log("no scroll")}
                    name={property2}
                />
            </div>
        </div>
    )
}

export default DualPropertyInputWithIcon