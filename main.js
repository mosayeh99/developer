let otherLinks = document.querySelector('.other-links');
let megaMenu = document.querySelector('.megamenu');
let links = document.querySelectorAll('ul .link');
let arrowIcon = document.querySelector('.landing a');
let scrollupIcon = document.querySelector('.scrollup-icon');
let articlesSec = document.querySelector('.articles-sec');
let articles = document.querySelector('.articles-sec .container');
let gallerySec = document.querySelector('.gallery-sec');
let gallery = document.querySelector('.gallery-sec .container');
let testimonialsSec = document.querySelector('.testimonials-sec');
let testimonials = document.querySelector('.testimonials-sec .container');
let skillsSec = document.querySelector('.skills-sec');
let skills = document.querySelectorAll('.skills-sec .progress span');
let timeunits = document.querySelectorAll('.events-sec .unit span');
let priceBtns = document.querySelectorAll('.pricing-sec .price-btns button');
let pricePlans = document.querySelectorAll('.pricing-sec .plan');
let playList = document.querySelectorAll('.videos-sec .playlist .caption');
let videosList = document.querySelectorAll('.videos-sec .videos-list .content');
let statsSec = document.querySelector('.stats-sec');
let stats = document.querySelectorAll('.stats-sec .box span');
let yearSpan = document.querySelector('.copyrights span');


let date;

// -------------------------Show MegaMenu-----------------
otherLinks.onclick = (e) => {
    e.stopPropagation();
    megaMenu.classList.toggle('open');
}

megaMenu.onclick = (e) => {
    e.stopPropagation();
}

document.addEventListener('click', (e) => {
    if (e.target !== otherLinks && e.target !== megaMenu) {
        megaMenu.classList.remove('open');
    }
});

// ------------------------Scroll To Section----------------
links.forEach((e) => {
    e.onclick = (el) => {
        el.preventDefault();
        document.querySelector(e.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

arrowIcon.onclick = (e) => {
    e.preventDefault();
    document.querySelector(arrowIcon.dataset.section).scrollIntoView({
        behavior: 'smooth'
    });
}

// ----------------------Scroll Up Button---------------------------
document.addEventListener('scroll', () => {
    if (window.scrollY > 700) {
        scrollupIcon.style.display = 'flex';
    } else {
        scrollupIcon.style.display = 'none';
    }
});

scrollupIcon.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// -----------------------Section Scroll X Animation------------------
window.onscroll = () => {
    if (window.scrollY > articlesSec.offsetTop) {
        articles.style.animationName = 'scrollx';
    }
    if (window.scrollY > gallerySec.offsetTop) {
        gallery.style.animationName = 'scrollx';
    }
    if (window.scrollY > testimonialsSec.offsetTop) {
        testimonials.style.animationName = 'scrollx';
    }

    // -------------Skills Bar----------------
    if (window.scrollY > skillsSec.offsetTop - 100) {
        skills.forEach((e) => {
            e.style.width = e.dataset.progress;
            e.parentElement.previousElementSibling.innerHTML = e.dataset.progress;
        });
    }
}

// --------------------Event Countdown--------------------------
let countdown = setInterval(() => {
    getFullYear();
    let eventdate = new Date(`31 Dec ${date.getFullYear()} 23:59:59`).getTime();
    let nowdate = new Date().getTime();
    let difftime = eventdate - nowdate;

    let days = Math.floor(difftime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difftime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difftime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difftime % (1000 * 60)) / 1000);

    timeunits[0].innerHTML = days < 10 ?`0${days}` :days;
    timeunits[1].innerHTML = hours < 10 ?`0${hours}` :hours;
    timeunits[2].innerHTML = minutes < 10 ?`0${minutes}` :minutes;
    timeunits[3].innerHTML = seconds < 10 ?`0${seconds}` :seconds;

    if (difftime < 1000) {
        clearInterval(countdown);
    }
}, 1000);

// -----------------Pricing Plans--------------------
priceBtns.forEach((e) => {
    e.onclick = () => {
        priceBtns.forEach((el) =>{
            el.classList.remove('active');
        });
        e.classList.add('active');
        pricePlans.forEach((ele) => {
            ele.classList.remove('open');
            if (ele.classList.contains(e.dataset.price) == true) {
                ele.classList.add('open');
            }
        });
        
    }
});

playList.forEach((e) => {
    e.onclick = (ele) => {
        ele.preventDefault();
        videosList.forEach((el) => {
            el.classList.remove('active');
        });
        videosList[e.dataset.video].classList.add('active');
    }
});

// ------------------Stats Counter-------------------
let count = true;
document.addEventListener('scroll', () => {
    if (window.scrollY > statsSec.offsetTop) {
        if (count == true) {
            stats.forEach((e) => {
                    let counter = setInterval(() => {
                        e.textContent++;
                        if (e.innerHTML == e.dataset.goal) {
                            clearInterval(counter);
                        }
                    }, 10)
            });
            count = false;
        }
    }
});

//-----------------Get Copyrights Year-----------------
getFullYear();
function getFullYear() {
    date = new Date();
    yearSpan.innerHTML = date.getFullYear();
}