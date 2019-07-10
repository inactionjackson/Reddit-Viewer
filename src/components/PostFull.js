import React from 'react'


export default function PostFull({data,deselectPost}) {
    let imgSrc = ''
    if(data.preview){
        if(data.preview.images[0].variants.gif){
            imgSrc = data.preview.images[0].variants.gif.source.url.replace(/amp;/g,'');
        }else{
            imgSrc = data.preview.images[0].source.url.replace(/amp;/g,'');
        }
    }
    const title = data.title;
    let selfText = null;
    if(data.selftext){
        selfText = data.selftext.split("\n");
    }
    return (
        
        <div className='postFull_backing'  onClick={()=>deselectPost(null)}>
            <div className='postFull'>
                {imgSrc?<img src={imgSrc} alt={title} />:<div>{selfText ? selfText.map((p,key)=><p key={key}>{p}</p>) : title}</div>}
            </div>
        </div>
    )
}
