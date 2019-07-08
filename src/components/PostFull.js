import React from 'react'

export default function PostFull({post,deselectPost}) {
    let imgSrc = ''
    if(post.data.preview){
        imgSrc = post.data.preview.images[0].source.url.replace(/amp;/g,'');
    }
    const title = post.data.title;
    let selfText = null;
    if(post.data.selftext){
        selfText = post.data.selftext.split("\n");
    }
    return (
        
        <div className='postFull_backing'  onClick={()=>deselectPost(null)}>
            <div className='postFull'>
                {imgSrc?<img src={imgSrc} alt={title}/>:<div>{selfText ? selfText.map((p,key)=><p key={key}>{p}</p>) : title}</div>}
            </div>
        </div>
    )
}
