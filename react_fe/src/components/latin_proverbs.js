const LatinProverbs = [
    "Acta non verba!",
    "Dum spiro, spero!",
    "Medice, cura te ipsum!",
    "Periculum in mora!",
    "Qui dormit non peccat!",
    "Quod licet Iovi, non licet bovi!",
    "Memento mori!",
    "Post coitum omne animal triste est!",
    "In vino veritas!",
    "Natura nihil frustra facit!",
    "Si vis pacem, para bellum!",
    "Philosophum non facit barba!",
    "In dubio abstine!"
];

function random_in_range(range) {
    return Math.floor((Math.random() * range));
}


export default function getProverb() {
    let textIndex = random_in_range(LatinProverbs.length);

    return LatinProverbs[textIndex];
}
