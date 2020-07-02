import React from 'react'
import './ItemList.css';

export default function ItemList({ itemList }) {
    return (
        itemList.map(item => {
            return <div key={item.id} className="item" >
                    <div className="item_name" > {item.name} </div> 
                    <div className="item_rating" > {item.rating} </div> 
                </div>
        })
    )
}