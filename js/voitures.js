import { voituresInitiales } from "./data.js";

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
const erreur_marque = document.querySelector("#erreur-marque");
const erreur_modele = document.querySelector("#erreur-modele");
const erreur_immatriculation = document.querySelector("#erreur-immatriculation");
const erreur_categorie = document.querySelector("#erreur-categorie");
const erreur_prix = document.querySelector("#erreur-prix-jour");
const erreur_statut = document.querySelector("#erreur-statut");
const bouton_enregistrer = document.querySelector("#bouton-enregistrer");
const recherche = document.querySelector("#recherche");
const filtre_statut = document.querySelector("#filtre-statut");
const filtre_categorie = document.querySelector("#filtre-categorie");
const tri_prix = document.querySelector("#tri-prix");
let reinitialiser_filtres = document.querySelector("#reinitialiser-filtres");

if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}
let voitures = JSON.parse(localStorage.getItem("voitures"));

let count = 7;
let voiture_id = 0;
afficher();

function afficherErreur(input, errorElement, message) {
    input.style.border = "2px solid red";
    errorElement.textContent = message;
    errorElement.style.color = "red";
}

function supprimerErreur(input, errorElement) {
    input.style.border = "";
    errorElement.textContent = "";
}
function reset_validation() {
    supprimerErreur(marque, erreur_marque);
    supprimerErreur(modele, erreur_modele);
    supprimerErreur(immatriculation, erreur_immatriculation);
    supprimerErreur(categorie, erreur_categorie);
    supprimerErreur(prix_jour, erreur_prix);
    supprimerErreur(statut, erreur_statut);
}
function validation() {
    let valide = true;
    marque.addEventListener("input", function() {
        supprimerErreur(marque, erreur_marque);
    });

    modele.addEventListener("input", function() {
        supprimerErreur(modele,erreur_modele);
    });

    immatriculation.addEventListener("input", function() {
        supprimerErreur(immatriculation,erreur_immatriculation);
    });

    categorie.addEventListener("change", function() {
        supprimerErreur(categorie,erreur_categorie);
    });

    prix_jour.addEventListener("input", function() {
        supprimerErreur(prix_jour,erreur_prix);
    });
    if(marque.value.trim() === "") {
        afficherErreur(marque,erreur_marque,"La marque est obligatoire.");
        valide = false;
    } 
    else if(marque.value.trim().length < 2) {
        afficherErreur(marque,erreur_marque,"La marque doit contenir au moins 2 caractères.");
        valide = false;
    } 
    if (modele.value.trim() === "") {
        afficherErreur(modele,erreur_modele,"Le modèle est obligatoire.");
        valide = false;
    } 
    else if(modele.value.trim().length < 1) {
        afficherErreur(modele,erreur_modele,"Le modèle est invalide.");
        valide = false;
    } 
    const formatImmatriculation = /^AUTO-\d{3}$/;
    if(immatriculation.value.trim() === "") {
        afficherErreur(immatriculation,erreur_immatriculation,"L'immatriculation est obligatoire.");
        valide = false;
    }
    else if(!formatImmatriculation.test(immatriculation.value.trim())) {
        afficherErreur(immatriculation,erreur_immatriculation,"Le format doit être AUTO-001.");
        valide = false;
    }
    else if(voitures.some(voiture =>voiture.immatriculation.toLowerCase() === immatriculation.value.trim().toLowerCase() && voiture.id != voiture_id)) {
        afficherErreur(immatriculation,erreur_immatriculation,"Cette immatriculation existe déjà.");
        valide = false;
    }
    if(categorie.value === "") {
        afficherErreur(categorie,erreur_categorie,"Veuillez choisir une catégorie.");
        valide = false;
    } 
    else{
        supprimerErreur(categorie, erreur_categorie);
    }
    if(prix_jour.value === "") {
        afficherErreur(prix_jour,erreur_prix,"Le prix est obligatoire.");
        valide = false;
    } 
    else if(Number(prix_jour.value) < 100 || Number(prix_jour.value) > 3000) {
        afficherErreur(prix_jour,erreur_prix,"Le prix doit être compris entre 100 DH et 3000 DH.");
        valide = false;
    }
    return valide;
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if(!validation()){
        return;
    }
    if(voiture_id == 0) {
        let voiture = {
            id: count++,
            marque: marque.value.trim(),
            modele: modele.value.trim(),
            immatriculation: immatriculation.value.trim(),
            categorie: categorie.value,
            prixJour: Number(prix_jour.value),
            statut: statut.value
        };
        voitures.push(voiture);
    }
    else{
        let voiture = voitures.find(vv => vv.id == voiture_id);
        voiture.marque = marque.value.trim();
        voiture.modele = modele.value.trim();
        voiture.immatriculation = immatriculation.value.trim();
        voiture.categorie = categorie.value;
        voiture.prixJour = Number(prix_jour.value);
        voiture.statut = statut.value;
    }
    localStorage.setItem("voitures", JSON.stringify(voitures));
    afficher();
    form.reset();
    voiture_id = 0;
    bouton_enregistrer.textContent = "Ajouter la voiture";
    annuler_modification.hidden = true;
});
annuler_modification.addEventListener("click",()=>{
    form.reset();
    reset_validation();
    voiture_id = 0;
    bouton_enregistrer.textContent = "Ajouter la voiture";
    annuler_modification.hidden = true;
})
function afficher(lists=voitures){
    liste_voitures.replaceChildren();
    if(lists.length === 0){
        etat_vide.hidden = false;
        return;
    }
    else
        etat_vide.hidden = true;
    lists.forEach(voiture => {
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
        modifier.addEventListener("click", () => {
            reset_validation();
            voiture_id = voiture.id;
            marque.value = voiture.marque;
            modele.value = voiture.modele;
            immatriculation.value = voiture.immatriculation;
            categorie.value = voiture.categorie;
            prix_jour.value = voiture.prixJour;
            statut.value = voiture.statut;
            bouton_enregistrer.textContent = "Modifier la voiture";
            annuler_modification.hidden = false;
            window.scrollTo(0, 0);
        });
        
        const supprimer = document.createElement("button");
        supprimer.type = "button";
        supprimer.className = "button button-delete";
        supprimer.dataset.action = "supprimer";
        supprimer.dataset.id = voiture.id;
        supprimer.setAttribute("aria-label",`Supprimer ${voiture.marque} ${voiture.modele}, ${voiture.immatriculation}`);
        supprimer.textContent = "Supprimer";
        supprimer.addEventListener("click",() =>{
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?");
            if(confirmation){
            voitures = voitures.filter(vv => vv.id != voiture.id);
            localStorage.setItem("voitures",JSON.stringify(voitures));
            afficher();
            form.reset();
            voiture_id = 0;
            bouton_enregistrer.textContent = "Ajouter la voiture";
            annuler_modification.hidden = true;
            }
        })

        div_actions.append(modifier,supprimer);
        td_actions.appendChild(div_actions);
        tr.append(td_marque,td_modele,td_immatriculation,td_categorie,td_prix,td_statut,td_actions);
        liste_voitures.appendChild(tr);
    });
}
function rechercher(liste) {
    let input = recherche.value.toLowerCase();
    let resultat = liste.filter((voiture) => {return (voiture.marque.toLowerCase().startsWith(input) ||
            voiture.modele.toLowerCase().startsWith(input) ||voiture.immatriculation.toLowerCase().startsWith(input));});
    return resultat;
}


function filtrerstatut(liste) {
    let resultat = liste.filter((voiture) => { return (voiture.statut === filtre_statut.value || filtre_statut.value === "");});
    return resultat;
}
function filtrercategorie(liste) {
    let resultat = liste.filter((voiture) => {return (voiture.categorie === filtre_categorie.value || filtre_categorie.value === "");});
    return resultat;
}
function trierPrix(liste) {
    let resultat = [...liste];
    if (tri_prix.value === "croissant") {
        resultat.sort((a, b) => a.prixJour - b.prixJour);
    }
    if (tri_prix.value === "decroissant") {
        resultat.sort((a, b) => b.prixJour - a.prixJour);
    }
    return resultat;
}
function appliquerFiltres() {
    let resultat = [...voitures];
    resultat = rechercher(resultat);
    resultat = filtrerstatut(resultat);
    resultat = filtrercategorie(resultat);
    resultat = trierPrix(resultat);
    afficher(resultat);
}
recherche.addEventListener("input",()=>{
    appliquerFiltres();
})
filtre_statut.addEventListener("change",()=>{
    appliquerFiltres();
})
filtre_categorie.addEventListener("change",()=>{
    appliquerFiltres();
})
tri_prix.addEventListener("change", () => {
    appliquerFiltres();
});
reinitialiser_filtres.addEventListener("click",()=>{
    recherche.value="";
    filtre_statut.value="";
    filtre_categorie.value="";
    tri_prix.value="";
    afficher();
})
