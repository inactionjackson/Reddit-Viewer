import React from 'react';


export default function PostThumb({ post, id, selectPost, screenHeight, screenWidth }) {
    //TODO: implement screen sizes in image selection

    const data = post.data;
    let imgSrc = null
    if (data.preview) {
        imgSrc = pickCorrectImage(data.preview.images);
    }
    const bUseTitleForSelftext = data.selftext === '';
    let mainElementClassName = 'postThumb_mainElement';

    let smallTitle = data.title.substring(0, 40);
    smallTitle += data.title.length > smallTitle.length ? '...' : '';
    const mainElement = imgSrc ? <img src={imgSrc} alt={data.title} /> : <div><p>{bUseTitleForSelftext ? smallTitle : data.selftext.substring(0, 80) + '...'}</p> </div>;

    //TODO: fix styling for selftext when image not available - needs properly centered
    const handleSelectPost = () => {
        selectPost(id);
    }


    return (
        <div className={`postThumb ${bUseTitleForSelftext && !imgSrc ? "titleOnly" : ""}`}>
            <div className={mainElementClassName} onClick={() => handleSelectPost()}>
                {mainElement}
            </div>
            <div className='postThumb_smallTitle'>
                <p>{smallTitle + ' : '}<a href={"http://reddit.com/u/" + data.author} >u/{data.author}</a></p>
            </div>

        </div>
    )
}

function pickCorrectImage(images) {
    let correctImage = null;
    if (images) {
        // TODO: pick correct image based on screen resolution and available sizes
    }
    correctImage = images[0].source.url;
    return correctImage.replace(/amp;/g, '');

}