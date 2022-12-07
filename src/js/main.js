const homePageLoc = document.querySelector(".home-page");
if (homePageLoc) {

    // projects horizontal scroll (home page)
    const projectArrowLeftLoc = document.querySelector(".arrow-left");
    const projectArrowRightLoc = document.querySelector(".arrow-right");
    const projectBoxesLoc = document.querySelectorAll(".home_3 .box");

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
if (companyLoc.length) {

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

// project tags

const tagsFilterLoc = document.querySelectorAll(".tags-filter .tag-filter");

if (tagsFilterLoc.length) {

    const projectsLoc = document.querySelectorAll(".projects-wrapper .project");

    tagsArray = [];

    const displayProjectsByTags = () => {

        projectsLoc.forEach((projElem)=>{

            const tagsLoc = projElem.querySelectorAll(".tag");
    
            let findTag = false;
            tagsLoc.forEach((tagElem)=> {
                if (tagsArray.indexOf(tagElem.innerText) !== -1){
                    findTag = true;
                }
            })
    
            if (findTag) {
                projElem.style.display = "flex";
            } else {
                projElem.style.display = "none";
            }
        })
    }

    const createTagsArr = (filterElem) => {
        if (tagsArray.indexOf(filterElem) === -1) {
            tagsArray.push(filterElem)
        } else {
            tagsArray = tagsArray.filter((item) => {
                return item !== filterElem
            })
        }

        displayProjectsByTags();
    }

    const allProjFilterLoc = document.querySelector(".tags-filter .all")
    
    tagsFilterLoc.forEach((filterElem)=>{
        filterElem.addEventListener("click", ()=>{

            if (filterElem.innerText !== "All projects") {
                filterElem.classList.toggle("active");
                allProjFilterLoc.classList.remove("active");
                createTagsArr(filterElem.innerText);
            } else {
                allProjFilterLoc.classList.add("active");

                tagsArray = [];

                tagsFilterLoc.forEach((filterElem)=>{
                    if (filterElem.innerText !== "All projects") {
                        filterElem.classList.remove("active");
                        tagsArray.push(filterElem.innerText);
                    }
                })

                displayProjectsByTags()
                tagsArray = [];
            }

            if (!tagsArray.length) {
                allProjFilterLoc.classList.add("active");
                tagsFilterLoc.forEach((filterElem)=>{
                    if (filterElem.innerText !== "All projects") {
                        filterElem.classList.remove("active");
                        tagsArray.push(filterElem.innerText);
                    }
                })
                displayProjectsByTags()
                tagsArray = [];
            };

        })
    })
}

// my process accordiom horizontal (about)

const accordionLoc = document.querySelector(".about_2 .accordion");

if (accordionLoc) {

const arrowsLoc = accordionLoc.querySelectorAll(".title-wrapper img");
const contentsLoc = accordionLoc.querySelectorAll(".row .content-row");

arrowsLoc.forEach((elem)=> {
    elem.addEventListener("click", ()=>{
        arrowsLoc.forEach((el)=> {
            el.classList.remove("active");
        })
        contentsLoc.forEach((elem)=> {
            elem.classList.remove("active");
        })
        const clickedRowLoc = elem.closest(".row");
        const clickedImgLoc = clickedRowLoc.querySelector("img");
        const clickedContentLoc = clickedRowLoc.querySelector(".content-row");
        clickedImgLoc.classList.add("active");
        clickedContentLoc.classList.add("active");
    })
})

}