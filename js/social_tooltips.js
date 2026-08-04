const socialLinks = document.querySelectorAll(".social_link");
const usesTouch = window.matchMedia("(hover: none), (pointer: coarse)");

socialLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        if (!usesTouch.matches || link.classList.contains("social_tooltip_open")) {
            return;
        }

        event.preventDefault();
        socialLinks.forEach((otherLink) => {
            otherLink.classList.toggle("social_tooltip_open", otherLink === link);
        });
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".social_link")) {
        socialLinks.forEach((link) => link.classList.remove("social_tooltip_open"));
    }
});
