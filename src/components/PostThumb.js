import React from 'react';


export default function PostThumb(post){
    /**
   * "author"
   * "post.post.data.title"
   * "preview.images" [{source{url,width,height} , resolutions[{url,width,height},{}...]}]
   * "reddit_video_preview" //not used yet
   * "selftext" // full internal texts
   */
  const data = post.post.data;
    let imgSrc = null
    if(post.post.data.preview){
        imgSrc = pickCorrectImage(data.preview.images);
    }
    const bUseTitleForSelftext = data.selftext === '';
    const mainElement = imgSrc ? <img src={imgSrc} className="postThumb_mainElement" /> : <p className="postThumb_mainElement">{bUseTitleForSelftext ? data.title : data.selftext}</p>

    console.log(data.title);
    return (
        <div className={`postThumb ${bUseTitleForSelftext ? "titleOnly" : ""}`}>
            {mainElement}
            {bUseTitleForSelftext ? '' : <p className='postThumb_smallTitle'>{data.title}</p>}
            <a href={"http://reddit.com/u/"+data.author} className='postThumb_author'>u/{data.author}</a>
        </div>
    )
  }

function pickCorrectImage(images){
    let correctImage = null;
    if(images){
        // TODO: pick correct image based on screen resolution and available sizes
    }
    correctImage = images[0].resolutions[0].url
    return correctImage.replace(/amp;/g,'');
    
}