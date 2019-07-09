import React from 'react'

export default function NavBar({currentSub, setSub}) {
    let searchTerm = '';

    const onKeyUp = (e)=>{
        if(e.key === 'Enter'){
            setSub(searchTerm);
            e.target.value = '';
        }
    }
    return (
        <div className='navbar'>
            <input type='text' placeholder={currentSub} onChange={(e)=>searchTerm=e.target.value} onKeyUp={(e)=>onKeyUp(e)} />
            <button type="submit" onClick={()=>setSub(searchTerm)} >View</button>
        </div>
    )
}
