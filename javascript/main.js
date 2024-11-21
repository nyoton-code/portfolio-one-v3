
let data;
async function fetchData() {
    const resp = await fetch("./javascript/main.json");
    data = await resp.json();
}





function enterAnimation() {
    let divAN = document.querySelector(".anm");
    setTimeout(() => {
        document.body.removeChild(divAN);
        document.querySelector(".allp").style.display = "block";
    }, 4500)
}
enterAnimation();


//     job animation text :
function jobAnimation() {
    fetchData().then(() => {
        setTimeout(() => {
            // fetchData().then(() => )
            let jobAnimation = document.querySelector(".job");
            let jobs = data.sections[0].home.jobs;
            let i = 0;
            function typingEffect() {
                let word = jobs[i].split("");
                var loopTyping = function () {
                    if (word.length > 0) {
                        jobAnimation.innerHTML += word.shift();
                    } else {
                        setTimeout(() => deletingEffect(), 1000);
                        return false;
                    };
                    setTimeout(loopTyping, 200);
                };
                loopTyping();
            };

            function deletingEffect() {
                let word = jobs[i].split("");
                var loopDeleting = function () {
                    if (word.length > 0) {
                        word.pop();
                        jobAnimation.innerHTML = word.join("");
                    } else {
                        if (jobs.length > (i + 1)) {
                            i++;
                        } else {
                            i = 0;
                        };
                        typingEffect();
                        return false;
                    };
                    setTimeout(loopDeleting, 200);
                };
                loopDeleting();
            };

            typingEffect();

        }, 5000);
    });
}
jobAnimation();








setTimeout(() => {
    let allScroll = document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight;
    let so = document.querySelector(".progress-page  span");
    window.onscroll = () => {
        let scrollTop = document.scrollingElement.scrollTop;
        let pro = (scrollTop / allScroll) * 100;
        so.style.height = `${pro * 2}%`;
    }
    let myAllListSpan = document.querySelectorAll(".sidebar li span");
    let varHeightSection = allScroll / 5;
    function changeColorSpan() {
        let i = 1;
        window.addEventListener("scroll", function () {
            if ((window.scrollY + 15) >= varHeightSection) {
                myAllListSpan[i].classList.add("goal");
                varHeightSection += (allScroll / 5);
                i++;
            }
            if (window.scrollY < varHeightSection - (allScroll / 5)) {
                myAllListSpan[i - 1].classList.remove("goal");
                varHeightSection -= (allScroll / 5);
                i--;
            }
            window.scrollY + 30 >= allScroll ? myAllListSpan[5].classList.add("goal") : myAllListSpan[5].classList.remove("goal");
        })
    }
    changeColorSpan()
}, 5000);




let listContaine = document.querySelector(".sidebar ul");


function AnimationSpanSidebar() {
    theBar.children[0].style.transform = "rotate(50deg) translateY(14px)";
    theBar.children[2].style.transform = "rotate(-52deg) translateY(-12px)";
    Object.assign(theBar.children[1].style, {
        transform: 'translateX(-10px)',
        opacity: '0'
    });
}
function deleteAnimationSideBar() {
    theBar.children[0].style.transform = "none";
    theBar.children[2].style.transform = "none";
    Object.assign(theBar.children[1].style, {
        transform: 'none',
        opacity: '1'
    });
}

let theBar = document.querySelector(".bars-side");
let k = 0;
theBar.addEventListener("click", function () {
    if (listContaine.classList.contains("hideBar")) {
        listContaine.classList.add("showBar");
        listContaine.classList.remove("hideBar");
        AnimationSpanSidebar();

    }
    else {
        listContaine.classList.remove("showBar");
        listContaine.classList.add("hideBar");
        deleteAnimationSideBar();

    }
});






//  start animation every section : 


// console.log(specialOne);
let specialEncrement = 0;
function changeSpecialElement(sp) {
    sp.style.animation = "color 0.3s 0.3s both";
    sp.children[0].style.animation = "a-special 0.5s both";
    sp.children[0].style.left = "0";
    sp.children[1].style.animation = "a-special 0.5s both";
    sp.children[1].style.right = "0";
}

let specials = document.querySelectorAll(".special");


let windowSize = 400;
window.addEventListener("scroll", function () {
    if (window.scrollY >= windowSize && specialEncrement < specials.length) {
        changeSpecialElement(specials[specialEncrement])
        windowSize += 700;
        specialEncrement++;
    }
})
//  end animation every section : 




///===========  start  circules   animation   ========================
let animatedProgress = false;
function animateProgressBar(c, p) {
    let i = 0;
    const interval = setInterval(() => {
        i++;
        p.textContent = `${i}`;
        c.style.background = `conic-gradient(#ce4980 0% ${i}%, #eee ${i}% 100%)`;
        if (i >= p.getAttribute("data-skill")) {
            clearInterval(interval);
        }
    }, 20);
}
// Call the function 
window.addEventListener("scroll", () => {
    fetchData().then(() => {
        if (window.scrollY > 1200 && !animatedProgress) {
            let skills = data.sections[2].skills;
            let skillName = document.querySelectorAll(".circule");
            let dataSkill = document.querySelectorAll(".skill-progress");
            for (let i = 0; i < skillName.length; i++) {
                // skillName[i].textContent = skills[`skill-${i + 1}`][0];
                dataSkill[i].setAttribute("data-skill", skills[`skill-${i + 1}`][1])
            }
            for (let i = 0; i < dataSkill.length; i++) {
                animateProgressBar(skillName[i], dataSkill[i]);
            }
            animatedProgress = true;

            // let circuless = document.querySelectorAll(".circule");
            // let texted = document.querySelectorAll('.skill-progress');
        }
    })
});
///===========  end  circules   animation   ========================







fetchData().then(() => {
    let all = data.sections;

    function home() {
        let home = all[0].home["full-name"];
        let homeText = document.querySelector(".home h1");
        let firstName = home.match(/\w+\s/);;
        let SecondeName = home.match(/\s\w+/);
        homeText.innerHTML = `${firstName} <span>${SecondeName}</span>`;

    }
    home();

    function about() {
        let about = all[1].about;
        let aboutContent = document.querySelectorAll(".about-contant p");
        aboutContent[0].innerHTML = about.paragraphe1;
        aboutContent[1].innerHTML = about.paragraphe2;

    }
    about();

    function skills() {
        let stats = all[2].skills;
        let statsContent = document.querySelectorAll(".skills-contant h3");
        Object.values(stats).forEach((e, i) => {
            statsContent[i].innerHTML = e[0];
        });

    }
    skills();

    function services() {
        let service = all[3].services;
        let serviceContent = document.querySelectorAll(".services-contant h2");
        for (let i = 0; i < serviceContent.length; i++) {
            serviceContent[i].innerHTML = service[`services-${i + 1}`];
        }

    }
    services();

    function stats() {
        let stats = all[4].stats;
        let statsContent = document.querySelectorAll(".stats-contant span");
        Object.values(stats).forEach((e, i) => {
            statsContent[i].innerHTML = e + "+";
        });
    }
    stats();

    function contact() {
        let contact = all[5].contact;
        let contactContent = document.querySelectorAll(".contact-info-section");
        Object.values(contact).forEach((e, i) => {
            contactContent[i].querySelectorAll("p")[0].innerHTML = e[0];
            contactContent[i].querySelectorAll("p")[1].innerHTML = e[1];
        });
    }
    contact();
})








