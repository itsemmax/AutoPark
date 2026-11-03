import { voituresInitiales } from "./data.js";

let cards = document.querySelector("#cards");
let marque = document.querySelector("#marque");
let ctg_prix = document.querySelector("#ctg-prix");
let date = document.querySelector("#date");
let days = document.querySelector("#days");
let numberofprix = document.querySelector("#numberofprix");
let total_price = document.querySelector("#totalprice");
let date_debut = document.querySelector("#date-debut");
let date_fin = document.querySelector("#date-fin");
let duree = document.querySelector("#duree");
let total_car = document.querySelector("#total");
let heure_recuperation = document.querySelector("#heure-recuperation");
let siege_bebe = document.querySelector("#recap-siege-bebe");
let conducteur = document.querySelector("#recap-conducteur");
let siege_bebe_prix = document.querySelector("#siege-bebe-prix");
let siege_bebe_total = document.querySelector("#siege-bebe-total");
let conducteur_prix = document.querySelector("#conducteur-prix");
let conducteur_total = document.querySelector("#conducteur-total");

if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}
let voitures = JSON.parse(localStorage.getItem("voitures"));

let voiture_obj = null;
const config = {
  voitures: voitures,
  modesRecuperation: [
    { id: "agence", nom: "À l’agence", fraisFixes: 0 },
    { id: "aeroport", nom: "À l’aéroport", fraisFixes: 150 },
    { id: "adresse", nom: "À une adresse", fraisFixes: 100 },
  ],

  agences: [
    "Casablanca — Centre-ville",
    "Rabat — Agdal",
    "Marrakech — Guéliz",
  ],
  
  aeroports: [
    "Casablanca — Mohammed V",
    "Rabat — Salé",
    "Marrakech — Ménara",
  ],

  options: [
    {
      id: "siegeBebe",
      nom: "Siège bébé",
      prixParJour: 30,
    },
    {
      id: "conducteurSupplementaire",
      nom: "Conducteur supplémentaire",
      prixParJour: 200,
    },
  ],
};

// 2. SÉLECTION : les choix de l'utilisateur, à actualiser avec les formulaires.
// Les identifiants correspondent aux id définis dans config.
// Les dates seront des chaînes au format AAAA-MM-JJ (valeur d'un input date).
const selectedConfig = {
  etape: 1,
  voitureId: null,
  dateDebut: "",
  dateFin: "",
  modeRecuperation: "agence",
  
  recuperation: {
    // Mode agence uniquement.
    heureRecuperation: "",
    
    // Mode aéroport uniquement.
    aeroport: "",
    numeroVol: "",
    heureArrivee: "",
    
    // Mode adresse uniquement.
    ville: "",
    adresse: "",
    heureLivraison: "",
  },

  options: {
    siegeBebe: false,
    conducteurSupplementaire: false,
  },
};

/*
 * 3. À VOUS DE JOUER
 *
 * 1) Sélectionner vos éléments HTML et afficher les voitures depuis config.
 * 2) Écouter les événements et mettre à jour selectedConfig.
 *    Attention : la valeur d'un select est une chaîne ; voitureId est un nombre.
 *    Pour une case à cocher, utiliser checked pour récupérer true ou false.
 * 3) Gérer les boutons Précédent / Suivant et afficher une seule étape.
 * 4) Afficher les champs du mode de récupération sélectionné.
 *    Masquer et désactiver les autres ; adapter required.
 * 5) Valider l'étape courante avant de passer à la suivante.
 * 6) Calculer et actualiser le prix quand les choix changent.
 * 7) Afficher le récapitulatif des seuls champs concernés, puis confirmer.
 * 8) Permettre de recommencer avec les valeurs initiales.
 *
 * RÈGLES DU PRIX
 * - Les deux dates sont incluses : du 10 au 12 = 3 jours.
 * - Une location sur une même date = 1 jour.
 * - Le début ne peut pas être passé ; la fin ne peut pas précéder le début.
 * - Total = jours × (prixParJour de la voiture + options par jour)
 *           + fraisFixes du mode de récupération.
 * - Les frais de récupération sont ajoutés une seule fois.
 * - Aucun renseignement supplémentaire pour le conducteur.
 * - Ne pas afficher un total numérique tant que la voiture ou les dates
 *   sont manquantes ou invalides.
 *
 * Exemple de contrôle : Sandero, du 10 au 12, siège bébé, aéroport
 * → 3 × (250 + 30) + 150 = 990 MAD.
 */

afficher();

function afficher(){
  cards.textContent = "";
  voitures.forEach(voiture => {
    let label = document.createElement("label");
    label.className = "bg-[#FAFBFF] rounded-xl p-4 border-2 border-[#D8E1EF]";

    let div = document.createElement("div");
    div.className = "flex justify-between";

    let categorie = document.createElement("p");
    categorie.className = "bg-[#EEF2FF] text-[#2852E3] text-[10px] font-bold px-3 py-1 rounded";
    categorie.textContent = `${voiture.categorie}`;

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "voiture";
    radio.value = `${voiture.marque}`;
    radio.required = true;
    radio.addEventListener("change",()=>{
      voiture_obj = voiture;
      config.etape = 1;
      selectedConfig.voitureId = voiture.id;
      if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
          calculerJours();
      }

      document.querySelectorAll("#cards label").forEach((card)=>{
        card.className = "bg-[#FAFBFF] rounded-xl p-4 border-2 border-[#D8E1EF]";
      });
      label.className = "bg-[#FAFBFF] rounded-xl p-4 border-2 border-[#2852E3]";

      marque.textContent = `${voiture.marque} ${voiture.modele}`;
      ctg_prix.textContent = `${voiture.categorie} · ${voiture.prixJour} MAD / jour`;
    });
    
    let titre = document.createElement("h3");
    titre.className = "font-bold text-sm mt-4";
    titre.textContent =`${voiture.marque} ${voiture.modele}`;

    let statut = document.createElement("p");
    statut.className = "text-[#3A9B68] text-[11px] mt-3";
    statut.textContent = `${voiture.statut}`;

    let prix = document.createElement("p");
    prix.className = "text-[#2852E3] font-bold text-sm mt-4";
    prix.textContent = `${voiture.prixJour} MAD / jour`;

    div.append(categorie, radio);

    label.append(div, titre, statut, prix);

    cards.append(label);
  });
}
function calculerJours(){
    let debut = new Date(selectedConfig.dateDebut);
    let fin = new Date(selectedConfig.dateFin);
    let jours = Math.round((fin - debut) / 86400000) + 1;
    let total = jours * voiture_obj.prixJour;

    days.textContent = `${jours} jours · dates incluses`;
    duree.textContent = `Durée : ${jours} jours. Les dates de début et de fin sont incluses.`;
    numberofprix.textContent = `Véhicule · ${jours} × ${voiture_obj.prixJour} MAD`;
    total_price.textContent = `${total} MAD`;
    total_car.textContent = `${total} MAD`;
}

date_debut.addEventListener("change",()=>{
  selectedConfig.dateDebut = date_debut.value;
  date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`;
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
      calculerJours();
    }
})
date_fin.addEventListener("change",()=>{
  selectedConfig.dateFin = date_fin.value;
  date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`;
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
    calculerJours();
  }
})

