import React, { useState, useEffect } from 'react'


const TriplePropertyInput = (props) => {

  const incolor = props.incolor;
  const property1 = incolor + 1;
  const property2 = incolor + 2;
  const property3 = incolor + 3;
  const propertyColor = incolor + "color";
  const defaultcolor = props.master[propertyColor];

  useEffect(() => {
    props.setMaster({ ...props.master, [propertyColor]: defaultcolor });
  }, []);

  return (
    <div>
      <h2>Property group {props.number}</h2>

      <div>
        <label>pick property color:</label>
        <input type="color"
          id={propertyColor}
          name={propertyColor}
          value={props.master[propertyColor]}
          onChange={e => props.setMaster({ ...props.master, [propertyColor]: e.target.value })}
          onFocus={e => props.scroll()}
        />
      </div>
      <div>
        <label> Property {props.number}/1 </label>
        <input
          value={props.master[property1]}
          type="text"
          onChange={e => props.setMaster({ ...props.master, [property1]: e.target.value })}
          name={property1}
          onFocus={e => props.scroll()}
        />
      </div>
      <div>
        <label> Property {props.number}/2 </label>
        <input
          value={props.master[property2]}
          type="text"
          onChange={e => props.setMaster({ ...props.master, [property2]: e.target.value })}
          name={property2}
          onFocus={e => props.scroll()}
        />
      </div>
      <div>
        <label> Property {props.number}/3 </label>
        <input
          value={props.master[property3]}
          type="text"
          onChange={e => props.setMaster({ ...props.master, [property3]: e.target.value })}
          name={property3}
          onFocus={e => props.scroll()}
        />
      </div>
    </div>
  )
}

export default TriplePropertyInput