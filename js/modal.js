var cancel = $("#cancel"),
    modal = $("#modal"),
    modal_content = modal.querySelector(".modal-content")

modal.open = function() {
    modal_content.classList.remove("modal-hidden-anim")
    modal_content.classList.add("modal-show-anim")
    modal.style.display = "block";
}

modal.close = function() {
    modal_content.classList.remove("modal-show-anim")
    modal_content.classList.add("modal-hidden-anim")
    setTimeout(() => {
        modal.style.display = "none";
    }, 600);
}

modal_content.addEventListener("click", function(event) {
    event.stopPropagation();
})
cancel.addEventListener('click', function() {
    modal.close()
});

modal.addEventListener("click", function() {
    modal.close()
});