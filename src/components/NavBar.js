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
            <p>Reddit.com/r/</p>
            <input type='text' placeholder={currentSub} onChange={(e)=>searchTerm=e.target.value} onKeyUp={(e)=>onKeyUp(e)} />
            <button  onClick={()=>setSub(searchTerm)} >View</button>
        </div>
    )
}
