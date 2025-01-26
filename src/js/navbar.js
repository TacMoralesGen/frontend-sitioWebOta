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
    const cartText = document.getElementById("cart-text");
    const leftNav = document.getElementById("left-nav");
    const navBtnContact = document.getElementById("navbar-btn-contact");
    const togglerIcon = document.getElementById("toggler-icon");
    console.log(window);

    const checkScroll = () => {
      if (window.scrollY < 60) {
        setStylesNavbar((navbarTrans = true));
      } else if (window.scrollY >= 60) {
        setStylesNavbar((navbarTrans = false));
      }
    }
  
    window.addEventListener("scroll", checkScroll);
  
    function setStylesNavbar(navbarTrans) {
      if (navbarTrans) {
        navEl.classList.remove("navbar-scrolled");
        cartText.classList.add("text-light");
        leftNav.classList.add("navbar-dark");
        logo1.classList.add("d-none");
        logo2.classList.remove("d-none");
        navBtnContact.classList.add("btn-outline-light");
        navBtnContact.classList.remove("btn-outline-grey");
        togglerIcon.classList.remove("black-navbar-toggler-icon");
      } else {
        navEl.classList.add("navbar-scrolled");
        cartText.classList.remove("text-light");
        leftNav.classList.remove("navbar-dark");
        logo1.classList.remove("d-none");
        logo2.classList.add("d-none");
        navBtnContact.classList.remove("btn-outline-light");
        navBtnContact.classList.add("btn-outline-grey");
        togglerIcon.classList.add("black-navbar-toggler-icon");
      }
    }

    const navbarToggler = document.getElementById("navbar-toggler");
    navbarToggler.addEventListener("click", () => {
      const isExpanded = navbarToggler.getAttribute('aria-expanded') === "true"
      if (isExpanded){
        setStylesNavbar((navbarTrans = false));
        window.removeEventListener("scroll", checkScroll);
      }
      else{
        setStylesNavbar((navbarTrans = true));
        window.addEventListener("scroll", checkScroll);
      }
    })
})