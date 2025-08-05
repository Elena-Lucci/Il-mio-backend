import express from "express";
import database from "./db.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Il server è attivo");
})

app.get("/aziende", (req, res) => {
    res.json(database);
})

app.get("/aziende/:id", (req, res) => {
    const { id } = req.params;

    // quello che prendiamo dall'url è sempre una stringa, quindi se devo confrontare stringhe mettere sempre toLowerCase, se devo confrontare un parametro numerico con stringa, o metto parseInt oppure == invece di === (soluzione meno elegante).

    const azienda = database.find((x) => x.id === parseInt(id));
    if (azienda) {
        res.json(azienda);
    } else {
        res.status(404).json({error: "Azienda non trovata"})
    }
    
})

app.get("/aziende/origine/:origine",(req, res)=>{
const {origine}= req.params;
const origini= database.filter((x)=> x.origine.toLowerCase().trim() === origine.toLowerCase().trim() );
if(origini.length > 0){
    res.json(origini);
}else{
    res.status(404).json({error: "Nessun risultato trovato"});
}
}

)

app.listen(PORT, () => console.log(`Il server è attivo su http://localhost:${PORT}`))