import React from 'react'

export default function NavBar({initialSub, setSub}) {
    let searchTerm = '';

    const onKeyUp = (e)=>{
        if(e.key === 'Enter'){
            setSub(searchTerm);
            e.target.value = '';
        }
    }
    return (
        <div>
            <input type='text' placeholder={initialSub} onChange={(e)=>searchTerm=e.target.value} onKeyUp={(e)=>onKeyUp(e)} />
            <button type="submit" onClick={()=>setSub(searchTerm)} >View</button>
        </div>
    )
}
