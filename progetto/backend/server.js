import express from "express";
import database from "./db.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Il server è attivo");
});

app.get("/aziende", (req, res) => {
  res.json(database);
});

app.get("/aziende/:id", (req, res) => {
  const { id } = req.params;

  // quello che prendiamo dall'url è sempre una stringa, quindi se devo confrontare stringhe mettere sempre toLowerCase, se devo confrontare un parametro numerico con stringa, o metto parseInt oppure == invece di === (soluzione meno elegante).

  const azienda = database.find((x) => x.id === parseInt(id));
  if (azienda) {
    res.json(azienda);
  } else {
    res.status(404).json({ error: "Azienda non trovata" });
  }
});

app.get("/aziende/origine/:origine", (req, res) => {
  const { origine } = req.params;
  const origini = database.filter(
    (x) => x.origine.toLowerCase().trim() === origine.toLowerCase().trim()
  );
  if (origini.length > 0) {
    res.json(origini);
  } else {
    res.status(404).json({ error: "Nessun risultato trovato" });
  }
});

app.get("/disponibili", (req, res) => {
  const aziendeFiltrate = database.filter((x) => {
    const verifica = x.prodotti.some((y) => y.disponibilita);
    console.log(verifica);
    return verifica;
  });
  if (aziendeFiltrate.length > 0) {
    res.json(aziendeFiltrate);
  } else {
    res.status(404).json({ error: "Nessun risultato trovato" });
  }
});

// richiesta get che restituisca tramite req.query tutte le aziende che producano il gusto di gelato, categoria gelato, che ho indicato nelle query. Se non e' presente restituisce tutte le aziende.

//

app.get("/gusti", (req, res) => {
  const { gusto, categorie } = req.query;

  const aziendeGelato = database.filter(({ prodotti }) =>
    prodotti.some(({ categoria, gusti }) =>
      gusto && categorie
        ? categoria === categorie.toLowerCase() &&
          gusti.includes(gusto.toLowerCase())
        : categorie
        ? categoria === categorie.toLowerCase()
        : gusto
        ? gusti.includes(gusto.toLowerCase())
        : categoria
    )
  );

  if (aziendeGelato.length > 0) {
    res.json(aziendeGelato);
  } else {
    res.status(404).json({ error: "Nessun gusto trovato" });
  }
});

app.listen(PORT, () =>
  console.log(`Il server è attivo su http://localhost:${PORT}`)
);
