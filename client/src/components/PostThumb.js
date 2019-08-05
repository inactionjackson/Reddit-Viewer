import React from "react";
import playSymbol from "../playSymbol.png";

export default function PostThumb({ data, id, selectPost, screenHeight }) {
  let imgSrc = null;
  let bIsGif = false;
  if (data.preview) {
    imgSrc = pickCorrectImage(data.preview.images);
    bIsGif = data.preview.images[0].variants.gif ? true : false;
  }

  const bUseTitleForSelftext = data.selftext === "";

  let smallTitle = data.title.substring(0, 40);
  smallTitle += data.title.length > smallTitle.length ? "..." : "";

  const handleSelectPost = () => {
    selectPost(id);
  };

  return (
    <div className="postThumb">
      <div className="postThumb_main" onClick={() => handleSelectPost()}>
        {bIsGif ? (
          <img src={playSymbol} alt="play gif" className="playSymbol" />
        ) : (
          ""
        )}
        {imgSrc ? (
          <img src={imgSrc} alt={data.title} className={bIsGif ? "gif" : ""} />
        ) : (
          <div className="postThumb_text">
            <p>
              {bUseTitleForSelftext
                ? smallTitle
                : data.selftext.substring(0, 80) + "..."}
            </p>{" "}
          </div>
        )}
        <div className="postThumb_smallTitle">
          <p>
            {smallTitle + " : "}
            <a href={"http://reddit.com/u/" + data.author}>u/{data.author}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function pickCorrectImage(images) {
  if (!images) {
    return null;
  }

  let correctImage = null;
  const vHeightMin = window.screen.height / 2;
  const vWidthMin = 400;
  let bestFitIndex = -1;
  let smallestDif = -1;
  images[0].resolutions.forEach((img, i) => {
    if (img.width >= vWidthMin && img.height >= vHeightMin) {
      const sizeDif = Math.abs(img.width - vWidthMin);
      if (sizeDif < smallestDif || smallestDif < 0) {
        bestFitIndex = i;
        smallestDif = sizeDif;
      }
    }
  });
  correctImage =
    bestFitIndex !== -1
      ? images[0].resolutions[bestFitIndex].url
      : images[0].source.url;
  return correctImage.replace(/amp;/g, "");
}
