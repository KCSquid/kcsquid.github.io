function verifyPassword(e) {
    e.preventDefault();
    let title = $('h1');
    let password = $('#passBox').val();

    if (password == 'flexProject2024') {
        title.animate({opacity: '0', top: '-10%'}, 'slow', false, () => {
            title.text('Hey, I\'m Jahvon!');
            title.animate({top: '-10%'}, 600)
            title.animate({opacity: '1'}, 'slow');
        });

        $('#passBox').val('')

        $('h3').animate({opacity: '0'}, false);
        $('#passBox').animate({opacity: '0'}, false);
        $('.projects').animate({top: '70%', opacity: '0'}, 'slow', false);
        $('.btn').animate({opacity: '0.001'}, 2300);
        $('.btn').animate({opacity: '1'}, 'slow', false);
        // $('.wave').animate({top: '100%'}, 1000, false);
        
        $('#blogText').animate({opacity: '0.1%'}, 2300);
        $('#blogText').animate({opacity: '100%'}, 500);
        $('#blogPostTitle').animate({opacity: '0.1%'}, 2300);
        $('#blogPostTitle').animate({opacity: 1}, 500)

        $('#blogText2').animate({opacity: '0.1%'}, 2300);
        $('#blogText2').animate({opacity: '100%'}, 500);
        $('#blogPostTitle2').animate({opacity: '0.1%'}, 2300);
        $('#blogPostTitle2').animate({opacity: 1}, 500)
        $("#back").removeAttr('disabled');
        $("html").css("overflow-y", "visible")
    }
}

function unlockPass(e) {
    e.preventDefault();
    $('#passBox').animate({opacity: '1'}, 'slow');
}

function redirect(e, page) {
    e.preventDefault();
    window.location.href = `projects/${page}.html`
}

function backHome(e) {
    e.preventDefault();
    let title = $('h1');

    title.animate({opacity: '0', top: '1%'}, 'slow', false, () => {
        title.text('Hey, I\'m Squid!');
        title.animate({opacity: '1'}, 1000);
    });

    $('h3').animate({opacity: '1'}, false);
    $('.btn').animate({opacity: '0'}, false);
    $('.projects').animate({top: '60%', opacity: '1'}, 'slow', false);
    // $('.wave').animate({top: '100%'}, 1000, false);
    
    $('#blogText').animate({opacity: '0%'}, 'slow');
    $('#blogPostTitle').animate({opacity: '0%'}, 'slow');
    $('#blogText2').animate({opacity: '0%'}, 'slow');
    $('#blogPostTitle2').animate({opacity: '0%'}, 'slow');
    $("#back").attr('disabled', true);
    $("html").css("overflow-y", "hidden")
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function animateStars() {
    let allStars = document.querySelectorAll('.star');
    let num = Math.floor(Math.random()*allStars.length);
    allStars[num].classList.toggle('animate');
}

window.addEventListener('load', function () {
    setInterval(animateStars, 50);

    for (let i = 1; i <= 75; i++) {
        let stars = document.createElement('div');
        stars.classList.add('star');
        let size = Math.random() * 20;
        stars.style.fontSize = 10 + size + 'px';
        stars.style.left = Math.random() * + this.innerWidth + 'px';
        stars.style.top = Math.random() * + this.innerHeight + 'px';
        stars.style.filter = `hue-rotate(${i * 5}deg)`;
        document.querySelector('.sec').appendChild(stars);
    }

    let title = $('h1');

    title.animate({top: '0.1%', opacity: '70%'}, 600);
        title.animate({top: '0.4%', opacity: '85%'}, 400);
        title.animate({top: '1%', opacity: '90%'}, 100);
        title.animate({top: '1%', opacity: '95%'}, 1);
        title.animate({top: '1%', opacity: '100%'}, 1);

    title.click(() => {
        title.animate({top: '0.2%', opacity: '60%'}, 600);
        title.animate({top: '0.4%', opacity: '85%'}, 400);
        title.animate({top: '1%', opacity: '90%'}, 100);
        title.animate({top: '1%', opacity: '95%'}, 1);
        title.animate({top: '1%', opacity: '100%'}, 1);
    });
});
