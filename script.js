"use strict";

/* =========================
  公式LINE URL設定

  現在は未設定のため空文字にしています。
  この状態では「お問い合わせ」ボタンを押しても遷移しません。

  公式LINEが公開されたら、下記を差し替えてください。
  例）const LINE_URL = "https://lin.ee/xxxxxxxx";
========================= */
const LINE_URL = "";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".js-header");
  const menuToggle = document.querySelector(".js-menu-toggle");
  const nav = document.querySelector(".js-nav");
  const lineLinks = document.querySelectorAll(".js-line-link");
  const yearElements = document.querySelectorAll(".js-year");

  lineLinks.forEach(function (link) {
    if (LINE_URL) {
      link.setAttribute("href", LINE_URL);
    } else {
      link.setAttribute("href", "#");
      link.setAttribute("aria-disabled", "true");

      link.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  });

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  if (menuToggle && nav) {
    function openMenu() {
      menuToggle.classList.add("is-active");
      nav.classList.add("is-active");
      header.classList.add("is-menu-open");
      document.body.classList.add("is-menu-open");
      menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      menuToggle.classList.remove("is-active");
      nav.classList.remove("is-active");
      header.classList.remove("is-menu-open");
      document.body.classList.remove("is-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }
});