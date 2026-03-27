document.querySelectorAll(".title_block").forEach(title => {
  title.addEventListener("click", () => {

    const accordionItem = title.closest(".accordion_item");
    const info = accordionItem.querySelector(".info");

    const isActive = accordionItem.classList.contains("active_block");

    // Закрити всі інші
    document.querySelectorAll(".accordion_item.active_block").forEach(item => {
      item.classList.remove("active_block");
      const content = item.querySelector(".info");
      if (content) content.style.display = "none";
    });

    // Якщо був відкритий → просто закриваємо
    if (isActive) {
      accordionItem.classList.remove("active_block");
      info.style.display = "none";
    } else {
      // Відкрити
      accordionItem.classList.add("active_block");
      info.style.display = "block";
    }

  });
});