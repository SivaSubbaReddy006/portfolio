(() => {
  document.body.classList.add("js-ready");

  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  const navLinks = [
    ...document.querySelectorAll('.nav-links a[href^="#"]')
  ];

  function closeMenu() {
    if (!menuButton || !nav) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    nav.classList.remove("open");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const opening =
        menuButton.getAttribute("aria-expanded") !== "true";

      menuButton.setAttribute("aria-expanded", String(opening));

      menuButton.setAttribute(
        "aria-label",
        opening ? "Close menu" : "Open menu"
      );

      nav.classList.toggle("open", opening);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // Scroll reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -25px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  // Highlight the current navigation section
  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const active =
              link.getAttribute("href") === "#" + entry.target.id;

            link.classList.toggle("active", active);

            if (active) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Automatically update the copyright year
  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();