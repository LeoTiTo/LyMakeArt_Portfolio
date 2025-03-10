'use strict';



// add Event on multiple elment

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



// PRELOADING

const loadingElement = document.querySelector("[data-loading]");

window.addEventListener("load", function () {
  loadingElement.classList.add("loaded");
  document.body.classList.remove("active");
});



// MOBILE NAV TOGGLE

const [navTogglers, navLinks, navbar, overlay] = [
  document.querySelectorAll("[data-nav-toggler]"),
  document.querySelectorAll("[data-nav-link]"),
  document.querySelector("[data-navbar]"),
  document.querySelector("[data-overlay]")
];

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElements(navLinks, "click", closeNav);



// HEADER

const header = document.querySelector("[data-header]");

const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * TEXT ANIMATION EFFECT FOR HERO SECTION
 */

const letterBoxes = document.querySelectorAll("[data-letter-effect]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {

  // loop through all letter boxes
  for (let i = 0; i < letterBoxes.length; i++) {
    // set initial animation delay
    let letterAnimationDelay = 0;

    // get all character from the current letter box
    const letters = letterBoxes[i].textContent.trim();
    // remove all character from the current letter box
    letterBoxes[i].textContent = "";

    // loop through all letters
    for (let j = 0; j < letters.length; j++) {

      // create a span
      const span = document.createElement("span");

      // set animation delay on span
      span.style.animationDelay = `${letterAnimationDelay}s`;

      // set the "in" class on the span, if current letter box is active
      // otherwise class is "out"
      if (i === activeLetterBoxIndex) {
        span.classList.add("in");
      } else {
        span.classList.add("out");
      }

      // pass current letter into span
      span.textContent = letters[j];

      // add space class on span, when current letter contain space
      if (letters[j] === " ") span.classList.add("space");

      // pass the span on current letter box
      letterBoxes[i].appendChild(span);

      // skip letterAnimationDelay when loop is in the last index
      if (j >= letters.length - 1) break;
      // otherwise update
      letterAnimationDelay += 0.05;

    }

    // get total delay of active letter box
    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    // add active class on last active letter box
    if (i === lastActiveLetterBoxIndex) {
      letterBoxes[i].classList.add("active");
    } else {
      letterBoxes[i].classList.remove("active");
    }

  }

  setTimeout(function () {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;

    // update activeLetterBoxIndex based on total letter boxes
    activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;

    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);

}

// call the letter effect function after window loaded
window.addEventListener("load", setLetterEffect);



/**
 * BACK TO TOP BUTTON
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  // visible back top btn when scrolled 5% of the page
  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();



/**
 * CUSTOM CURSOR
 */

const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

// change cursorElement position based on cursor move
document.body.addEventListener("mousemove", function (event) {
  setTimeout(function () {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
});

// add cursor hoverd class
const hoverActive = function () { cursor.classList.add("hovered"); }

// remove cursor hovered class
const hoverDeactive = function () { cursor.classList.remove("hovered"); }

// add hover effect on cursor, when hover on any button or hyperlink
addEventOnElements(anchorElements, "mouseover", hoverActive);
addEventOnElements(anchorElements, "mouseout", hoverDeactive);
addEventOnElements(buttons, "mouseover", hoverActive);
addEventOnElements(buttons, "mouseout", hoverDeactive);

// add disabled class on cursorElement, when mouse out of body
document.body.addEventListener("mouseout", function () {
  cursor.classList.add("disabled");
});

// remove diabled class on cursorElement, when mouse in the body
document.body.addEventListener("mouseover", function () {
  cursor.classList.remove("disabled");
});




/*============= Dark light mode ===============*/

const updateSvgColors = () => {
  setTimeout(() => {
    // console.log("Forçage de la mise à jour des SVG...");

    document.querySelectorAll(".svg-icon").forEach(svg => {
      svg.style.color = getComputedStyle(document.documentElement).getPropertyValue("--svg-bg");
      const textElement = svg.querySelector("text");
      if (textElement) {
        textElement.style.fill = getComputedStyle(document.documentElement).getPropertyValue("--svg-text");
      }
    });
  }, 50); // Délai léger pour laisser le DOM se mettre à jour
};



// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  const darkModeIcon = document.querySelector("#lightMode-icon");
  const body = document.body;

  // Vérifier et appliquer le mode stocké
  if (localStorage.getItem("theme") === "light-mode") {
    body.classList.add("light-mode");
  }
  updateSvgColors(); //

  // Toggle Light/Dark Mode avec animation circulaire
  darkModeIcon.addEventListener("click", function (event) {
    const x = event.clientX, y = event.clientY;
    body.style.setProperty("--clickX", `${x}px`);
    body.style.setProperty("--clickY", `${y}px`);
    body.classList.add("mode-transition");

    setTimeout(() => {
      body.classList.toggle("light-mode");

      // Sauvegarde du mode utilisateur
      localStorage.setItem("theme", body.classList.contains("light-mode") ? "light-mode" : "dark-mode");

      darkModeIcon.classList.toggle("bxs-brush");
      updateSvgColors();
    }, 700);

    setTimeout(() => {
      body.classList.remove("mode-transition");
    }, 1500);
  });
});



/*============= EN/FR ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const langBtn = document.getElementById("lang-btn");
  let currentLang = localStorage.getItem("selectedLanguage") || "fr"; // Langue par défaut

  // Contenu en français et anglais
  const translations = {
    fr: {
      siteTitle: "Bach Ly Oanh PHAM",
      heroText: "Là où la beauté rencontre la créativité",
      navHome: "Accueil",
      navGallery: "Galerie",
      navAbout: "À propos",
      navServices: "Services",
      navPortfolio: "Portfolio",
      navContact: "Contactez-moi",
      aboutTitle: "Bonjour, je suis <br> Bach Ly Oanh PHAM",
      aboutText: "Passionnée par l’univers de la beauté, je cherche à allier créativité et précision pour offrir le meilleur de mon expertise.",
      serviceSubtitle: "Mes Services",
      serviceWedding: "Maquillage de mariage",
      serviceEvent: "Maquillage pour événements spéciaux",
      serviceProduct: "Maquillage de scène",
      serviceVideo: "Maquillage artistique et effets spéciaux",
      portfolioTitle: "Mon travail récent.",
      contactTitle: "Contactez-moi",
      contactText: "Demande de travail, Opportunités d'emploi ? Envoyez un message.",
      categoryLandscape: "Maquillage à effets spéciaux,",
      categoryModel: "Modèle,",
      categoryStreet: "Rue,",
      categoryProduct: "Portrait,",
      categoryFashion: "Mode,",
      categoryFilm: "Face Painting,",
      categoryArchitecture: "Drag-queen,",
      categoryEvent: "Faux crâne,,",
      categoryWedding: "Mariage,",
      categoryPeople: "Coiffure & Maquillage d'époque,",
      categoryFood: "Body Painting,",
      categoryHealth: "SFX.",
      adresse : "Mon Adresse",
      contact : "Prendre rendez-vous ?",
    },
    en: {
      siteTitle: "Bach Ly Oanh PHAM",
      heroText: "Where beauty meets creativity",
      navHome: "Home",
      navGallery: "Gallery",
      navAbout: "About",
      navServices: "Services",
      navPortfolio: "Portfolio",
      navContact: "Contact me",
      aboutTitle: "Hi. I’m <br> Bach Ly Oanh PHAM",
      aboutText: "A passionate about the world of beauty, I seek to combine creativity and precision to offer the best of my expertise.",
      serviceSubtitle: "My Services",
      serviceWedding: "Wedding Makeup",
      serviceEvent: "Makeup for special events",
      serviceProduct: "Stage makeup",
      serviceVideo: "Artistic makeup and special effects",
      portfolioTitle: "My Recent Work.",
      contactTitle: "Contact me",
      contactText: "Work inquiry, Job opportunities ? Send Message.",
      categoryLandscape: "Special Effects Makeup,",
      categoryModel: "Model,",
      categoryStreet: "Street,",
      categoryProduct: "Portrait,",
      categoryFashion: "Fashion,",
      categoryFilm: "Face Painting,",
      categoryArchitecture: "Drag queen,",
      categoryEvent: "Fake Skull,",
      categoryWedding: "Wedding,",
      categoryPeople: "Period Hair & Makeup,",
      categoryFood: "Body Painting,",
      categoryHealth: "SFX.",
      adresse: "My Address",
      contact: "Make an appointment ?"
    }
  };

  // Sélection des éléments à traduire
  const elementsToTranslate = {
    siteTitle: document.querySelector("#site-title"),
    heroText: document.querySelector("#hero-text"),
    navHome: document.querySelector("#nav-home"),
    navGallery: document.querySelector("#nav-gallery"),
    navAbout: document.querySelector("#nav-about"),
    navServices: document.querySelector("#nav-services"),
    navPortfolio: document.querySelector("#nav-portfolio"),
    navContact: document.querySelector("#nav-contact"),
    aboutTitle: document.querySelector("#about-title"),
    aboutText: document.querySelector("#about-text"),
    serviceSubtitle: document.querySelector("#service-subtitle"),
    serviceWedding: document.querySelector("#service-wedding"),
    serviceEvent: document.querySelector("#service-event"),
    serviceProduct: document.querySelector("#service-product"),
    serviceVideo: document.querySelector("#service-video"),
    portfolioTitle: document.querySelector("#portfolio-title"),
    contactTitle: document.querySelector("#contact-title"),
    contactText: document.querySelector("#contact-text"),
    categoryLandscape: document.querySelector("#category-landscape"),
    categoryModel: document.querySelector("#category-model"),
    categoryStreet: document.querySelector("#category-street"),
    categoryProduct: document.querySelector("#category-product"),
    categoryFashion: document.querySelector("#category-fashion"),
    categoryFilm: document.querySelector("#category-film"),
    categoryArchitecture: document.querySelector("#category-architecture"),
    categoryEvent: document.querySelector("#category-event"),
    categoryWedding: document.querySelector("#category-wedding"),
    categoryPeople: document.querySelector("#category-people"),
    categoryFood: document.querySelector("#category-food"),
    categoryHealth: document.querySelector("#category-health"),
    adresse: document.querySelector("#adresse"),
    contact: document.querySelector(".navbar-text"),
  };

  // Fonction pour mettre à jour la langue
  function changeLanguage(lang) {
    if (translations[lang]) {
      for (const key in elementsToTranslate) {
        if (elementsToTranslate[key]) {
          elementsToTranslate[key].innerHTML = translations[lang][key];
        }
      }
      // Stocker la langue sélectionnée
      localStorage.setItem("selectedLanguage", lang);
    }
  }

  // Appliquer la langue sauvegardée au chargement
  changeLanguage(currentLang);

  // Mettre à jour l'icône du bouton
  langBtn.innerHTML = currentLang === "fr" ? "🇺🇸" : "🇫🇷";

  // Ajout d'un événement pour changer la langue
  langBtn.addEventListener("click", function () {
    currentLang = currentLang === "fr" ? "en" : "fr"; // Alterner entre FR et EN
    changeLanguage(currentLang);
    langBtn.innerHTML = currentLang === "fr" ? "🇺🇸" : "🇫🇷"; // Met à jour l'icône
  });
});


