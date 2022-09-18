const header=document.querySelector("header");
const firstskill=document.querySelector(".skill:first-child");
const skcounters=document.querySelectorAll(".counter span");
const progressbars=document.querySelectorAll(".skills svg circle");
const mlsection=document.querySelector(".milestones");
const mlcounters=document.querySelectorAll(".number span");
const links=document.querySelectorAll(".nav-link");
const togglebtn=document.querySelector(".toggle-btn");

window.addEventListener("scroll", () => {
    activelink();
    if(!skillsplayed) skillsCounter();
    if(!mlplayed) mlCounters();
})

// Sticky Navbar
function stickyNavbar(){
    header.classList.toggle("scrolled", window.pageYOffset>0);
  
}

stickyNavbar();

window.addEventListener("scroll",stickyNavbar);

let sr= ScrollReveal({
    duration: 2500,
    distance:"60px",
});

sr.reveal(".showcase-info",{delay:600});
sr.reveal(".showcase-img",{origin:"top",delay:700});

function updateCount(num, Maxnum){
    let currentnum=+num.innerText;
    if(currentnum<Maxnum){
        num.innerText= currentnum+1;
        setTimeout(() =>{
            updateCount(num,Maxnum);
        }, 12);
    }
}

let skillsplayed=false;

function hasReached(el){
    let Tp=el.getBoundingClientRect().top;
    if(window.innerHeight >= Tp + el.offsetHeight)
        return true;
   return false;
}
function skillsCounter(){
    if(!hasReached(firstskill))  return;
    skillsplayed=true;
    skcounters.forEach((counter,i) => {
        let target= +counter.dataset.target;
        let strokevalue= 426 - 426 * (target/100);

        progressbars[i].style.setProperty("--target", strokevalue);

        setTimeout(() =>{
            updateCount(counter,target);
        }, 400);
    });

    progressbars.forEach(p => (p.style.animation = "progress 2s ease-in-out forwards"));
}

let mlplayed=false;

function mlCounters(){
    if(!hasReached(mlsection))  return;
    mlplayed=true;
    mlcounters.forEach(ctr => {
        let target= +ctr.dataset.target;
        
    setTimeout(() =>{
        updateCount(ctr, target);
    },400);
    });
}

function activelink(){
    let sections=document.querySelectorAll("section[id]");
    let passedsections=Array.from(sections).map((sct,i) =>{
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    }).filter(sct => sct.y <= 0);
    
    let currsectid= passedsections.at(-1).id;
    links.forEach((l) => l.classList.remove("active"));
    links[currsectid].classList.add("active");
}

activelink();
let firsttheme=localStorage.getItem("dark");
changetheme(+firsttheme);
function changetheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        togglebtn.classList.replace("uil-moon","uil-sun");
        localStorage.setItem("dark",1);
    }
    else{
        document.body.classList.remove("dark");
        togglebtn.classList.replace("uil-sun","uil-moon");
        localStorage.setItem("dark",0);
    }
}
togglebtn.addEventListener("click",()=>{
    changetheme(!document.body.classList.contains("dark"));
})