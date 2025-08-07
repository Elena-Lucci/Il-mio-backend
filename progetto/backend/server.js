import express from "express";
import database from "./db.js";

const app = express();
const PORT = 3000;
app.use(express.json());

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
  // rendere dinamici i query params

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

// creare una richiesta post che in base all'id passato come params aggiunge all'azienda corrispondente un nuovo prodotto con tutte le chiavi obbligatorie

app.post("/aziende/:id", (req, res) => {
  const { id } = req.params;
  const { categoria, gusti, disponibilita } = req.body;
  const nuovoProdotto = {
    categoria: categoria,
    gusti: gusti,
    disponibilita: disponibilita,
    numeroGusti: gusti.length,
  };
  const aziendaAggiornata = database.find((x) => x.id === parseInt(id));
  if (aziendaAggiornata) {
    aziendaAggiornata.prodotti.push(nuovoProdotto);
    res.status(201).json({ message: "Prodotto aggiunto con successo" });
  } else {
    res.status(404).json({ error: "Nessuna azienda trovata" });
  }
});

// richiesta PUT che ci permette di andare ad aggiornare i dati della nostra azienda: nome origine, anno fondazione. Sempre req.params (id).

app.put("/aziende/:id", (req, res) => {
  const { id } = req.params;
  const { nome, origine, annoFondazione, distribuzione } = req.body;
  const azienda = database.find((x) => x.id === parseInt(id));
  if (azienda) {
    azienda.nome = nome || azienda.nome;
    azienda.origine = origine || azienda.origine;
    azienda.annoFondazione = annoFondazione || azienda.annoFondazione;
    azienda.distribuzione = distribuzione || azienda.distribuzione;
    res.status(202).json({ message: "Azienda aggiornata con successo" });
  } else {
    res.status(404).json({ error: "Nessuna azienda trovata" });
  }
});

app.listen(PORT, () =>
  console.log(`Il server è attivo su http://localhost:${PORT}`)
);
