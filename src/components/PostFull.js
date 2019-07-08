import React from 'react'

export default function PostFull({post,deselectPost}) {
    let imgSrc = ''
    if(post.data.preview){
        imgSrc = post.data.preview.images[0].source.url.replace(/amp;/g,'');
    }
    const title = post.data.title;
    return (
        
        <div className='postFull_backing'  onClick={()=>deselectPost(null)}>
            <div className='postFull'>
                {imgSrc?<img src={imgSrc} alt={title}/>:<p>{post.data.selftext || post.data.title}</p>}
            </div>
        </div>
    )
}
