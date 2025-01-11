function toggleCheck(button) {
    if (button.innerHTML === "✖") {
        button.innerHTML = "✔";
        button.classList.add("checked");
    } else {
        button.innerHTML = "✖";
        button.classList.remove("checked");
    }
}
