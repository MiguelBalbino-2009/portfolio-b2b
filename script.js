// script.js

import { initMenuToggle } from "./src/js/nav.js";
import { initTestimonials } from "./src/js/testimonials.js";

/* ===================================================
   INICIALIZAÇÃO DO SITE
=================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o menu de navegação
    initMenuToggle();

    // Inicializa a seção de depoimentos
    initTestimonials();
});