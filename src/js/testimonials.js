/* ===================================================
   TESTIMONIALS - API FETCH & CENTERED CAROUSEL
=================================================== */

const avatarImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
];

/* ===================================================
   FUNÇÃO PRINCIPAL
=================================================== */

export async function initTestimonials() {
    const cardsContainer = document.getElementById("testimonials-cards");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Evita erros caso o carrossel não exista na página
    if (!cardsContainer) {
        return;
    }

    // Busca os dados da API e cria os cards
    await loadTestimonials(cardsContainer);

    // Botão próximo
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            cardsContainer.scrollBy({
                left: 340,
                behavior: "smooth"
            });
        });
    }

    // Botão anterior
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            cardsContainer.scrollBy({
                left: -340,
                behavior: "smooth"
            });
        });
    }
}

/* ===================================================
   BUSCAR DEPOIMENTOS NA API
=================================================== */

async function loadTestimonials(cardsContainer) {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Erro ao carregar os dados da API.");
        }

        const users = await response.json();

        // Utiliza apenas os cinco primeiros usuários
        const firstFiveUsers = users.slice(0, 5);

        // Limpa o conteúdo anterior
        cardsContainer.innerHTML = "";

        // Cria os cards
        firstFiveUsers.forEach((user, index) => {
            const cardHTML = createCardHTML(user, index);

            cardsContainer.insertAdjacentHTML(
                "beforeend",
                cardHTML
            );
        });

        // Inicializa o carrossel
        initCarouselFocus(cardsContainer);

    } catch (error) {
        console.error(
            "Erro na seção de depoimentos:",
            error
        );
    }
}

/* ===================================================
   CRIAR CARD
=================================================== */

function createCardHTML(user, index) {
    const avatarUrl =
        avatarImages[index] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
        )}`;

    return `
        <article class="testimonial-card">
            <div class="card-company">
                <span class="company-name">
                    ${user.company.name}
                </span>
            </div>

            <p class="card-text">
                "${user.company.catchPhrase}. ${user.company.bs}."
            </p>

            <div class="card-author">
                <img
                    src="${avatarUrl}"
                    alt="Foto de ${user.name}"
                    class="author-avatar"
                    loading="lazy"
                >

                <div class="author-info">
                    <h4 class="author-name">
                        ${user.name}
                    </h4>

                    <span class="author-role">
                        Co-founder / ${user.address.city}
                    </span>
                </div>
            </div>
        </article>
    `;
}

/* ===================================================
   ATUALIZAR CARD ATIVO
=================================================== */

function updateActiveCard(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        ".testimonial-card"
    );

    if (!cards.length) {
        return;
    }

    const containerBox =
        cardsContainer.getBoundingClientRect();

    const containerCenter =
        containerBox.left +
        containerBox.width / 2;

    let closestCard = null;
    let minDistance = Infinity;

    // Procura o card mais próximo do centro
    cards.forEach((card) => {
        const cardBox = card.getBoundingClientRect();

        const cardCenter =
            cardBox.left +
            cardBox.width / 2;

        const distance = Math.abs(
            containerCenter - cardCenter
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    // Remove o active de todos
    cards.forEach((card) => {
        card.classList.remove("active");
    });

    // Ativa somente o card central
    if (closestCard) {
        closestCard.classList.add("active");
    }
}

/* ===================================================
   INICIALIZAR CARROSSEL
=================================================== */

function initCarouselFocus(cardsContainer) {
    const cards = cardsContainer.querySelectorAll(
        ".testimonial-card"
    );

    if (!cards.length) {
        return;
    }

    // Centraliza inicialmente o terceiro card
    if (cards.length >= 3) {
        const targetCard = cards[2];

        const containerWidth =
            cardsContainer.offsetWidth;

        const cardOffsetLeft =
            targetCard.offsetLeft;

        const cardWidth =
            targetCard.offsetWidth;

        const scrollPosition =
            cardOffsetLeft -
            containerWidth / 2 +
            cardWidth / 2;

        // Move somente o carrossel
        cardsContainer.scrollLeft =
            scrollPosition;
    }

    // Define o card inicial como ativo
    updateActiveCard(cardsContainer);

    // Atualiza o card ativo durante o scroll
    cardsContainer.addEventListener(
        "scroll",
        () => updateActiveCard(cardsContainer)
    );
}