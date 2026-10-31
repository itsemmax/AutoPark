import { voituresInitiales } from "./data.js";

const total = document.querySelector("#total");
const disponibles = document.querySelector("#disponibles");
const louees = document.querySelector("#louees");
const maintenance = document.querySelector("#maintenance");
const citadines = document.querySelector("#citadines");
const berlines = document.querySelector("#berlines");
const suv = document.querySelector("#suv");
const liste_dashboard = document.querySelector("#liste-dashboard");
const etat_vide = document.querySelector("#etat-vide");
const table_container = document.querySelector("#table-container");
const btn_disponible = document.querySelector("#btn-disponible");
const btn_louee = document.querySelector("#btn-louee");
const btn_maintenance = document.querySelector("#btn-maintenance");
const liste_statut = document.querySelector("#liste-statut");
const etat_vide_statut = document.querySelector("#etat-vide-statut");

if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}
let voitures = JSON.parse(localStorage.getItem("voitures"));

afficherCompteurs();
afficherDernieresVoitures();
afficherParStatut("Disponible");

function afficherCompteurs() {
    total.textContent = voitures.length;
    let voitures_disponibles = voitures.filter((voiture) => {
        return voiture.statut === "Disponible";
    });
    let voitures_louees = voitures.filter((voiture) => {
        return voiture.statut === "Louée";
    });
    let voitures_maintenance = voitures.filter((voiture) => {
        return voiture.statut === "En maintenance";
    });
    disponibles.textContent = voitures_disponibles.length;
    louees.textContent = voitures_louees.length;
    maintenance.textContent = voitures_maintenance.length;
}

function afficherDernieresVoitures() {
    liste_dashboard.replaceChildren();

    if (voitures.length === 0) {
        etat_vide.classList.remove("hidden");
        table_container.classList.add("hidden");
        return;
    }

    etat_vide.classList.add("hidden");
    table_container.classList.remove("hidden");

    let dernieres_voitures = voitures.slice(-5).reverse();

    dernieres_voitures.forEach((voiture) => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-100";

        const td_marque = document.createElement("td");
        td_marque.className = "px-8 py-5 font-bold";
        td_marque.textContent = voiture.marque;

        const td_modele = document.createElement("td");
        td_modele.className = "px-8 py-5";
        td_modele.textContent = voiture.modele;

        const td_immatriculation = document.createElement("td");
        td_immatriculation.className = "px-8 py-5";

        const span_immatriculation = document.createElement("span");
        span_immatriculation.className = "border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600";
        span_immatriculation.textContent = voiture.immatriculation;

        td_immatriculation.appendChild(span_immatriculation);

        const td_categorie = document.createElement("td");
        td_categorie.className = "px-8 py-5";
        td_categorie.textContent = voiture.categorie;

        const td_prix = document.createElement("td");
        td_prix.className = "px-8 py-5";

        const prix = document.createElement("span");
        prix.textContent = voiture.prixJour + " ";

        const dh = document.createElement("span");
        dh.className = "text-gray-500 text-sm";
        dh.textContent = "DH / jour";

        td_prix.append(prix, dh);

        const td_statut = document.createElement("td");
        td_statut.className = "px-8 py-5";

        const span_statut = document.createElement("span");
        span_statut.textContent = voiture.statut;

        if (voiture.statut === "Disponible") {
            span_statut.className = "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium";
        } else if (voiture.statut === "Louée") {
            span_statut.className = "inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium";
        } else {
            span_statut.className = "inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium";
        }
        td_statut.appendChild(span_statut);

        tr.append(td_marque,td_modele,td_immatriculation,td_categorie,td_prix,td_statut);
        liste_dashboard.appendChild(tr);
    });
}
function afficherParStatut(statut) {
    liste_statut.replaceChildren();

    let resultat = voitures.filter((voiture) => {
        return voiture.statut === statut;
    });

    if (resultat.length === 0) {
        table_container.classList.add("hidden");
        etat_vide_statut.classList.remove("hidden");
        return;
    }

    table_container.classList.remove("hidden");
    etat_vide_statut.classList.add("hidden");

    resultat.forEach((voiture) => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-100";

        const td_marque = document.createElement("td");
        td_marque.className = "px-8 py-5 font-bold";
        td_marque.textContent = voiture.marque;

        const td_modele = document.createElement("td");
        td_modele.className = "px-8 py-5";
        td_modele.textContent = voiture.modele;

        const td_immatriculation = document.createElement("td");
        td_immatriculation.className = "px-8 py-5";

        const span_immatriculation = document.createElement("span");
        span_immatriculation.className = "border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-600";
        span_immatriculation.textContent = voiture.immatriculation;

        td_immatriculation.appendChild(span_immatriculation);

        const td_categorie = document.createElement("td");
        td_categorie.className = "px-8 py-5";
        td_categorie.textContent = voiture.categorie;

        const td_prix = document.createElement("td");
        td_prix.className = "px-8 py-5";
        td_prix.textContent = voiture.prixJour + " DH / jour";

        const td_statut = document.createElement("td");
        td_statut.className = "px-8 py-5";

        const span_statut = document.createElement("span");
        span_statut.textContent = voiture.statut;

        if (voiture.statut === "Disponible") {
            span_statut.className = "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium";
        } else if (voiture.statut === "Louée") {
            span_statut.className = "inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium";
        } else {
            span_statut.className = "inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium";
        }
        td_statut.appendChild(span_statut);

        tr.append(td_marque,td_modele,td_immatriculation,td_categorie,td_prix,td_statut);

        liste_statut.appendChild(tr);
    });
}
function changerBouton(bouton) {
    btn_disponible.className = "text-[#627184] px-4 py-2 rounded-md font-semibold";
    btn_louee.className = "text-[#627184] px-4 py-2 rounded-md font-semibold";
    btn_maintenance.className = "text-[#627184] px-4 py-2 rounded-md font-semibold";

    bouton.className = "bg-white text-[#2855d7] px-4 py-2 rounded-md font-semibold";
}
btn_disponible.addEventListener("click", () => {
    afficherParStatut("Disponible");
    changerBouton(btn_disponible);
});

btn_louee.addEventListener("click", () => {
    afficherParStatut("Louée");
    changerBouton(btn_louee);
});

btn_maintenance.addEventListener("click", () => {
    afficherParStatut("En maintenance");
    changerBouton(btn_maintenance);
});