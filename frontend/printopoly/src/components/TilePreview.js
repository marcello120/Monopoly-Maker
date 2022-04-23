import React from 'react'
import Icon from './Icon';
import './TilePreview.css'


const TilePreview = (props) => {
    return (
        <div className='holder'>
            <div className="space property">
                <div className="container">
                    <div style={{ backgroundColor: props.color }} className="color-bar"></div>
                    <div className="name">{props.name}</div>
                    <div className="price">Price                           
                    <Icon iconName={props.currency} size={20} color={'black'} />
                    {props.price}</div>
                </div>
            </div>
        </div>
    )
}

export default TilePreview