document.addEventListener("DOMContentLoaded", () => {
    //activar tooltips de bootstrap
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  
    //navegador
    const navEl = document.querySelector("header.navbar");
    const logo1 = document.querySelector(".logo-1");
    const logo2 = document.querySelector(".logo-2");
    const leftNav = document.getElementById("leftNav");
    const rightNav = document.getElementById("rightNav");
    const navBtnContact = document.getElementById("navbar-btn-contact");
  
    console.log(window);
  
    window.addEventListener("scroll", () => {
      console.log("scrol!");
      if (window.scrollY >= 60) {
        setStylesNavbar((scrollYIsOnTop = false));
      } else if (window.scrollY < 60) {
        setStylesNavbar((scrollYIsOnTop = true));
      }
    });
  
    function setStylesNavbar(scrollYIsOnTop) {
      if (!scrollYIsOnTop) {
        navEl.classList.add("navbar-scrolled");
        leftNav.classList.remove("navbar-dark");
        rightNav.classList.remove("text-light");
        logo1.classList.remove("d-none");
        logo2.classList.add("d-none");
        navBtnContact.classList.remove("btn-outline-light");
        navBtnContact.classList.add("btn-outline-grey");
      } else {
        navEl.classList.remove("navbar-scrolled");
        leftNav.classList.add("navbar-dark");
        rightNav.classList.add("text-light");
        logo1.classList.add("d-none");
        logo2.classList.remove("d-none");
        navBtnContact.classList.add("btn-outline-light");
        navBtnContact.classList.remove("btn-outline-grey");
      }
    }
})