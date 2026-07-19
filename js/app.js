
/* ==========================================================
   APP JS
   전체 앱 공통 기능
========================================================== */


/* ==========================================================
   DOM READY
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        initMobileMenu();

        initSidebarMenu();

        setCurrentDate();

        console.log(
            "매입·매출 관리 시스템 실행"
        );


    }
);




/* ==========================================================
   MOBILE MENU
========================================================== */


function initMobileMenu(){


    const menuBtn =
        document.querySelector(
            ".mobile-menu-btn"
        );


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const overlay =
        document.querySelector(
            ".sidebar-overlay"
        );



    if(
        !menuBtn ||
        !sidebar ||
        !overlay
    ){

        return;

    }



    menuBtn.addEventListener(
        "click",
        ()=>{


            sidebar.classList.toggle(
                "active"
            );


            overlay.classList.toggle(
                "active"
            );


        }
    );



    overlay.addEventListener(
        "click",
        ()=>{


            closeSidebar();


        }
    );


}



function closeSidebar(){


    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const overlay =
        document.querySelector(
            ".sidebar-overlay"
        );



    if(sidebar){

        sidebar.classList.remove(
            "active"
        );

    }


    if(overlay){

        overlay.classList.remove(
            "active"
        );

    }


}





/* ==========================================================
   SIDEBAR MENU ACTIVE
========================================================== */


function initSidebarMenu(){


    const menuLinks =
        document.querySelectorAll(
            ".sidebar a"
        );



    const currentPage =
        location.pathname
            .split("/")
            .pop();



    menuLinks.forEach(
        link=>{


            const href =
                link
                .getAttribute("href");



            if(
                href === currentPage
            ){

                link.classList.add(
                    "active"
                );

            }



            link.addEventListener(
                "click",
                ()=>{


                    menuLinks.forEach(
                        item=>
                            item.classList.remove(
                                "active"
                            )
                    );


                    link.classList.add(
                        "active"
                    );


                    closeSidebar();


                }
            );


        }
    );


}





/* ==========================================================
   CURRENT DATE
========================================================== */


function setCurrentDate(){


    const dateElement =
        document.querySelector(
            ".current-date"
        );


    if(!dateElement){

        return;

    }



    const today =
        new Date();



    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth()+1
        )
        .padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        )
        .padStart(
            2,
            "0"
        );



    dateElement.textContent =
        `${year}-${month}-${day}`;


}





/* ==========================================================
   NUMBER FORMAT
========================================================== */


function formatNumber(value){


    if(
        value === null ||
        value === undefined
    ){

        return "0";

    }


    return Number(value)
        .toLocaleString(
            "ko-KR"
        );


}





/* ==========================================================
   MONEY FORMAT
========================================================== */


function formatMoney(value){


    return (
        formatNumber(value)
        + "원"
    );


}





/* ==========================================================
   CONFIRM DELETE
========================================================== */


function confirmDelete(){


    return confirm(
        "삭제하시겠습니까?"
    );


}
