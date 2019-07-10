import React from 'react';


export default function PostThumb({ post, id, selectPost, screenHeight }) {

    const data = post.data;
    let imgSrc = null
    if (data.preview) {
        imgSrc = pickCorrectImage(data.preview.images);
    }
    const bUseTitleForSelftext = data.selftext === '';

    let smallTitle = data.title.substring(0, 40);
    smallTitle += data.title.length > smallTitle.length ? '...' : '';
    const mainElement = imgSrc ? <img src={imgSrc} alt={data.title}  /> : <div className='postThumb_text'><p>{bUseTitleForSelftext ? smallTitle : data.selftext.substring(0, 80) + '...'}</p> </div>;

    const handleSelectPost = () => {
        selectPost(id);
    }


    return (
        <div className='postThumb'>
            <div className='postThumb_main' onClick={() => handleSelectPost()}>
                {mainElement}
                <div className='postThumb_smallTitle'>
                    <p>{smallTitle + ' : '}<a href={"http://reddit.com/u/" + data.author} >u/{data.author}</a></p>
                </div>
            </div>
            

        </div>
    )
}

function pickCorrectImage(images) {
    if (!images) {
        return null;
    }

    let correctImage = null;
    const vHeightMin = window.screen.height/2;
    const vWidthMin = 400;
    let bestFitIndex = -1;
    let smallestDif = -1;
    images[0].resolutions.forEach((img, i)=>{
        if(img.width >=  vWidthMin && img.height >= vHeightMin){
            const sizeDif = Math.abs(img.width-vWidthMin);
            if( sizeDif < smallestDif || smallestDif < 0){
                bestFitIndex = i;
                smallestDif = sizeDif;
            }
        }
    });
    correctImage = bestFitIndex !== -1 ? images[0].resolutions[bestFitIndex].url : images[0].source.url;
    return correctImage.replace(/amp;/g, '');

}