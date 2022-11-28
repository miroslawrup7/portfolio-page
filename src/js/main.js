const homePageLoc = document.querySelector(".home-page");
if (homePageLoc) {

    // projects horizontal scroll (home page)
    const projectArrowLeftLoc = document.querySelector(".arrow-left");
    const projectArrowRightLoc = document.querySelector(".arrow-right");
    const projectBoxesLoc = document.querySelectorAll(".home_3 .box");

    const projectsCount = projectBoxesLoc.length

    let projMovePosition = 0; 
    const projMoveDistance = 360;

    projectArrowRightLoc.addEventListener("click", ()=>{
        
        if (projMovePosition < projectBoxesLoc.length - 1) {
        
            projMovePosition++

            projectBoxesLoc.forEach((elem)=>{
                elem.style.left = `-${projMoveDistance * projMovePosition}px`;
            })

            if (projMovePosition > 0) {
                projectArrowLeftLoc.style.visibility = "visible";
            }

            if (projMovePosition === projectBoxesLoc.length - 2) {
                projectArrowRightLoc.style.visibility = "hidden";
            }
        }   
        
    })

    projectArrowLeftLoc.addEventListener("click", ()=>{

        if (projMovePosition > 0) {

            projMovePosition--

            projectBoxesLoc.forEach((elem)=>{
                elem.style.left = `-${projMoveDistance * projMovePosition}px`;
            })

        }

        if (projMovePosition < projectBoxesLoc.length - 2) {
            projectArrowRightLoc.style.visibility = "visible";
        }

        if (projMovePosition === 0) {
            projectArrowLeftLoc.style.visibility = "hidden";
        }

    })

    // accordion vertical (home page)
    const accordionArrowLoc = document.querySelectorAll(".accordion .acc-arrow");
    const firstNarrowBoxLoc = document.querySelectorAll(".narrow-box");
    const firstWideBoxLoc = document.querySelectorAll(".wide-box");

    firstNarrowBoxLoc[0].style.width = "0";
    firstNarrowBoxLoc[0].style.borderLeft = "none";
    firstNarrowBoxLoc[0].style.borderRight = "none";

    firstWideBoxLoc[0].style.width = "960px";
    firstWideBoxLoc[0].style.borderLeft = "none";


    accordionArrowLoc.forEach((elem)=>{
        elem.addEventListener("click", (e)=>{

            firstNarrowBoxLoc.forEach((elem)=>{
                elem.style.width = "80px";
            })

            firstWideBoxLoc.forEach((elem)=>{
                elem.style.width = "0";
            })

            let narrowBox = e.target.closest(".narrow-box");
            let wideBox = e.target.closest(".narrow-box").nextElementSibling;

            narrowBox.style.width = "0";
            wideBox.style.width = "960px";
        })
    })

}

// companies scroll

const companyLoc = document.querySelectorAll(".companies .company");
if (companyLoc) {

    const barsLoc = document.querySelector(".bars");

    const companyInOneView = 5;

    let companiesQuantity = companyLoc.length;
    let companiesSet = Math.ceil(companiesQuantity / companyInOneView)

    let barsTxt = ""

    for (let i=0; i<companiesSet; i++) {
        if (i === 0) {
            barsTxt = '<div class="bar-wrapper"><div class="bar active"></div></div>'; 
        } else {
            barsTxt = barsTxt + '<div class="bar-wrapper"><div class="bar"></div></div>'; 
        }
    }

    barsLoc.innerHTML = barsTxt;

    const sliderBarLoc = document.querySelectorAll(".bar-wrapper");
    const barLoc = document.querySelectorAll(".bar");

    let barID = 0;

    const moveSlider = (barID)=>{
        barLoc.forEach((elem)=>{
            elem.classList.remove("active");
        })

        barLoc[barID].classList.add("active");
        
        let movement = 0;
        companiesQuantity = companyLoc.length;

        for (let i = 0; i<barID; i++) {

            companiesQuantity = companiesQuantity - companyInOneView;

            if (companiesQuantity >= companyInOneView) {
                movement += 100;
            } else {
                movement = movement + companiesQuantity*100/companyInOneView;
            }
        }

        companyLoc.forEach((elem)=>{
            elem.style.left = `-${movement}%`;
        })
    }

    sliderBarLoc.forEach((elem)=>{
        elem.addEventListener("click", (e)=>{

            barID = [...e.currentTarget.parentNode.children].indexOf(e.currentTarget);

            moveSlider(barID);

        })
    })

    let i = 1;

    window.setInterval(() => {
    
        moveSlider(i);
    
        i++
    
        if (i === companiesSet) {
            i = 0;
        } 
        
    }, 6000);
}