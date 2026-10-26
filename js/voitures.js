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
const liste_voitures = document.querySelector("#liste-voitures");
const etat_vide = document.querySelector("#etat-vide");

if(localStorage.getItem("voitures"))
    voitures = JSON.parse(localStorage.getItem("voitures"));
localStorage.setItem("voitures",JSON.stringify(voitures));
let count = voitures.length + 1;
afficher();

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
    afficher();
    form.reset();
})

function afficher(){
    liste_voitures.replaceChildren();
    if(voitures.length === 0){
        etat_vide.hidden = false;
        return;
    }
    else
        etat_vide.hidden = true;
    voitures.forEach(voiture => {
        const tr = document.createElement("tr");
        const td_marque = document.createElement("td");
        const strong = document.createElement("strong");
        strong.textContent = voiture.marque;
        td_marque.appendChild(strong);

        const td_modele = document.createElement("td");
        td_modele.textContent = voiture.modele;

        const td_immatriculation = document.createElement("td");
        const span_immatriculation = document.createElement("span");
        span_immatriculation.className = "registration";
        span_immatriculation.textContent = voiture.immatriculation;
        td_immatriculation.appendChild(span_immatriculation);

        const td_categorie = document.createElement("td");
        td_categorie.textContent = voiture.categorie;

        const td_prix = document.createElement("td");
        td_prix.className = "price";
        td_prix.append(voiture.prixJour + " ");
        const span_prix = document.createElement("span");
        span_prix.textContent = "DH / jour";
        td_prix.appendChild(span_prix);

        const td_statut = document.createElement("td");
        const span_statut = document.createElement("span");
        span_statut.className = "badge";
        span_statut.textContent = voiture.statut;
        if(voiture.statut === "Disponible") span_statut.classList.add("badge-disponible");
        else if(voiture.statut === "Louée") span_statut.classList.add("badge-louee");
        else span_statut.classList.add("badge-maintenance");
        td_statut.appendChild(span_statut);

        const td_actions = document.createElement("td");
        const div_actions = document.createElement("div");
        div_actions.className = "row-actions";

        const modifier = document.createElement("button");
        modifier.type = "button";
        modifier.className = "button button-edit";
        modifier.dataset.action = "modifier";
        modifier.dataset.id = voiture.id;
        modifier.setAttribute("aria-label",`Modifier ${voiture.marque} ${voiture.modele}, ${voiture.immatriculation}`);
        modifier.textContent = "Modifier";

        const supprimer = document.createElement("button");
        supprimer.type = "button";
        supprimer.className = "button button-delete";
        supprimer.dataset.action = "supprimer";
        supprimer.dataset.id = voiture.id;
        supprimer.setAttribute("aria-label",`Supprimer ${voiture.marque} ${voiture.modele}, ${voiture.immatriculation}`);
        supprimer.textContent = "Supprimer";
        supprimer.addEventListener("click",() =>{
            voitures = voitures.filter(vv => vv.id != voiture.id);
            if(voitures.length === 0)
                count = 1;
            localStorage.setItem("voitures",JSON.stringify(voitures));
            afficher();
        })

        div_actions.append(modifier,supprimer);
        td_actions.appendChild(div_actions);
        tr.append(td_marque,td_modele,td_immatriculation,td_categorie,td_prix,td_statut,td_actions);
        liste_voitures.appendChild(tr);
    });
}