const database = [
  {
    id: 1,
    nome: "Kalise",
    origine: "Gran Canaria",
    annoFondazione: 1960,
    prodotti: [
      {
        categoria: "ghiacciolo",
        gusti: ["latte", "mango", "ananas-pera", "fragola-mora"],
        numeroGusti: 4,
        disponibilita: true,
      },
    ],
    rating: 10,
    distribuzione: "Spagna",
  },
  {
    id: 2,
    nome: "Algida",
    origine: "Italia",
    annoFondazione: 1946,
    prodotti: [
      {
        categoria: "gelato",
        gusti: ["vaniglia", "cioccolato", "pistacchio", "fragola"],
        numeroGusti: 4,
        disponibilita: true,
      },
      {
        categoria: "ghiacciolo",
        gusti: ["limone", "cola"],
        numeroGusti: 2,
        disponibilita: true,
      },
    ],
    rating: 9,
    distribuzione: "Europa",
  },
  {
    id: 3,
    nome: "Nestlé",
    origine: "Svizzera",
    annoFondazione: 1866,
    prodotti: [
      {
        categoria: "gelato",
        gusti: ["nocciola", "stracciatella", "caffè"],
        numeroGusti: 3,
        disponibilita: true,
      },
    ],
    rating: 8,
    distribuzione: "Globale",
  },
  {
    id: 4,
    nome: "Frigo",
    origine: "Spagna",
    annoFondazione: 1927,
    prodotti: [
      {
        categoria: "ghiacciolo",
        gusti: ["fragola", "arancia", "limone"],
        numeroGusti: 3,
        disponibilita: true,
      },
    ],
    rating: 7,
    distribuzione: "Europa",
  },
  {
    id: 5,
    nome: "Blue Cream",
    origine: "USA",
    annoFondazione: 1985,
    prodotti: [
      {
        categoria: "gelato",
        gusti: ["menta", "cookies", "caramello-salato"],
        numeroGusti: 3,
        disponibilita: true,
      },
      {
        categoria: "ghiacciolo",
        gusti: ["ciliegia", "limone"],
        numeroGusti: 2,
        disponibilita: false,
      },
    ],
    rating: 6,
    distribuzione: "Nord America",
  },
];

export default database;