
function random_in_range(range) {
    return Math.floor((Math.random() * range));
}

function replace_phrase(text) {
    let header = document.querySelector(".phrase");

    header.textContent = text;
}

function UpdateNavBar() {
    let textIndex = random_in_range(LatinProverbs.length);
    let phraseOfDay = LatinProverbs[textIndex];

    replace_phrase(phraseOfDay);
}

UpdateNavBar();
