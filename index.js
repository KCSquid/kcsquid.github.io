function changeMode(e) {
    e.preventDefault();
    document.body.classList.toggle("light");
    document.getElementById("logo").classList.toggle("light");
    document.getElementById("mode").classList.toggle("light");
}

function scrollCo(e, co) {
    e.preventDefault();
    window.scrollTo({ top: co, behavior: "smooth"});
}

function redirect(e, url) {
    e.preventDefault();
    window.location.replace(url)
}

window.onbeforeunload = function () {
    // window.scrollTo(0, 0);
}