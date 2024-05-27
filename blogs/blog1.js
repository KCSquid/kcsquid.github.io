document.addEventListener("scroll", e => {
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var winHeight = window.innerHeight || (document.documentElement || document.body).clientHeight;
    var docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    )

    var scrollPercent = ((scrollTop) / (docHeight - winHeight)) * 100;
    document.documentElement.style.setProperty('--page-y', scrollPercent + "%");
});

function redirect(e, url) {
    e.preventDefault();
    window.location.replace(url)
}