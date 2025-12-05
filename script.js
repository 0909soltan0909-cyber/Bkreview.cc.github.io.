/* ==========================================
   THEME SWITCHER
========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const darkModeBtn = document.querySelector(".dark-circle");
    const lightModeBtn = document.querySelector(".light-circle");

    function setTheme(theme) {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    if (darkModeBtn) darkModeBtn.addEventListener("click", () => setTheme("dark"));
    if (lightModeBtn) lightModeBtn.addEventListener("click", () => setTheme("light"));
});


/* ==========================================
   STAR RATING — ПОЛНЫЕ И ЧАСТИЧНЫЕ ЗВЁЗДЫ
========================================== */
function createStarRating() {
    const starRatings = document.querySelectorAll(".star-rating");

    starRatings.forEach(ratingElement => {
        // чтобы не дублировать звёзды, если уже отрисованы
        if (ratingElement.querySelector(".stars")) return;

        const rating = parseFloat(ratingElement.getAttribute("data-rating")) || 0;
        const starsContainer = document.createElement("div");
        starsContainer.className = "stars";

        for (let i = 1; i <= 5; i++) {
            const starWrapper = document.createElement("div");
            starWrapper.className = "star";

            const emptyStar = document.createElement("div");
            emptyStar.className = "star-empty";
            emptyStar.innerHTML = "★";

            const filledStar = document.createElement("div");
            filledStar.className = "star-filled";
            filledStar.innerHTML = "★";

            // Полностью заполненная звезда
            if (i <= Math.floor(rating)) {
                filledStar.style.width = "100%";
            }
            // Неполная (дробная) звезда
            else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                const percentage = (rating - Math.floor(rating)) * 100;
                filledStar.style.width = percentage + "%";
            }
            // Пустая звезда
            else {
                filledStar.style.width = "0%";
            }

            starWrapper.appendChild(emptyStar);
            starWrapper.appendChild(filledStar);
            starsContainer.appendChild(starWrapper);
        }

        ratingElement.appendChild(starsContainer);
    });
}

document.addEventListener("DOMContentLoaded", createStarRating);


/* ==========================================
   RATING FILTER TABS
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".rating-tabs .tab");
    const cards = document.querySelectorAll(".platform-card");

    function applyFilter(filter) {
        cards.forEach(card => {
            const cats = (card.dataset.categories || "")
                .split(",")
                .map(c => c.trim())
                .filter(Boolean);

            const show =
                filter === "all" ||
                (filter === "rb" && cats.includes("rb")) ||
                (filter === "popular" && cats.includes("popular")) ||
                (filter === "bonus" && cats.includes("bonus")) ||
                (filter === "reliable" && cats.includes("reliable"));

            card.style.display = show ? "" : "none";
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyFilter(btn.dataset.filter);
        });
    });

    // по умолчанию показываем "Букмекеры для ставок"
    applyFilter("rb");
});


/* ======================================================
   SMOOTH SCROLL — НЕ ЛОВИМ КНОПКИ "ПЕРЕЙТИ НА"
====================================================== */
document.querySelectorAll('a[href^="#"]:not(.platform-bonus):not(.btn-primary)').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            window.scrollTo({
                top: targetEl.offsetTop - 100,
                behavior: "smooth"
            });
        }
    });
});


/* ==========================================
   REFERRAL LINKS SYSTEM (SECURE + FLEX)
========================================== */

const referralLinks = {
    csgoempire: "https://csgoempire.com/r/Bkreview",
    csgo500: "https://500.casino/r/BKREVIEW",
    csgopositive: "https://csgopositive.bet/p/bkreview/",
    duelbits: "https://duelbits.io/?a=Bkreview",
    howlgg: "https://howly.gg/r/bkreview",
    knifex: "https://knifex.bet/ref/1487522",
    bets4pro: "https://bets4.bet/?ref=76561199001300684",
    csgopolygon: "https://playplg.com/ru/ref/bkreview",
    gamdom: "https://gamdom.com/r/BKREVIEW",
    csgoluck: "https://csgoluck.com/r/BKREVIEW",
    csgorun: "https://csgomn.run/",
    rollbit: "https://rollbit.com/referral/BKREVIEW"
};

document.addEventListener("DOMContentLoaded", () => {
    // Кнопки на главной и в обзорах
    const referralButtons = document.querySelectorAll(
        ".platform-bonus, .btn-primary[data-name], .btn-primary[data-ref]"
    );

    referralButtons.forEach(btn => {
        // 1) приоритет: прямой data-ref в HTML
        let href = btn.dataset.ref || "";

        // 2) если data-ref нет — используем словарь referralLinks по data-name
        if (!href) {
            const name = btn.dataset.name;
            if (name && referralLinks[name]) {
                href = referralLinks[name];
            }
        }

        // 3) лёгкая защита: только явные http/https-ссылки
        if (href && /^https?:\/\//i.test(href)) {
            btn.href = href;
            btn.target = "_blank";
            btn.rel = "noopener noreferrer nofollow sponsored";
            btn.style.pointerEvents = "auto";
        }
    });
});


/* ==========================================
   MOBILE MENU
========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector(".burger");
    const mobileMenu = document.querySelector(".nav-links");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("open");
        });
    }
});
