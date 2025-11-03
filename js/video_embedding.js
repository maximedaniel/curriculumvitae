function loadVideo(element) {
  const iframe = document.createElement('iframe');
  iframe.style.margin = 0;

  const parent = element.parentNode;
  const thumbnail = parent.querySelector("#thumbnail");
  const youtubeId = thumbnail.dataset.youtubeId;
 const vimeoId = thumbnail.dataset.vimeoId;
  if (youtubeId){
    iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&vq=hd1080`;
  } else if (vimeoId){
    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  }
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.minHeight = thumbnail.height  + "px";
  element.remove(); 
  thumbnail.replaceWith(iframe);
}