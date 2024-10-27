const data = {
  audi: "uzywane",
  opel: "nowe",
  francuz: "powypadkowe",
  "duzy fiat": "uzywane",
  mercedes: "nowe",
  "małe fajne autko": "uzywane",
};

const t = Object.values(data);

console.log(t);

const res = {
  uzywane: t.filter((x) => x === "uzywane").length,
  nowe: t.filter((x) => x === "nowe").length,
  powypadkowe: t.filter((x) => x === "powypadkowe").length,
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
