import { voituresInitiales } from "./data.js";

let voitures = voituresInitiales.map((voiture) => {
    return { ...voiture };
});
const form = document.querySelector("#formulaire-voiture");
const marque = document.querySelector("#marque");
const modele = document.querySelector("#modele");
const immatriculation = document.querySelector("#immatriculation");
const categorie = document.querySelector("#categorie");
const prix_jour = document.querySelector("#prix-jour");
const statut = document.querySelector("#statut");
const annuler_modification = document.querySelector("#annuler-modification");
let count = voitures.length + 1;
if(localStorage.getItem("voitures"))
    voitures = JSON.parse(localStorage.getItem("voitures"));
localStorage.setItem("voitures",JSON.stringify(voitures));

form.addEventListener("submit",(event) =>{
    event.preventDefault();
    let voiture = {
        "id": count++,
        "marque": marque.value,
        "modele": modele.value,
        "immatriculation": immatriculation.value,
        "categorie": categorie.value,
        "prixJour": prix_jour.value,
        "statut": statut.value
    }
    voitures.push(voiture);
    localStorage.setItem("voitures",JSON.stringify(voitures));
    form.reset();
})