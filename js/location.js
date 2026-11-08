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
let suivant_vhl = document.querySelector("#suivant_vhl");
let recommencer_1 = document.querySelector("#recommencer_1");
let vehicule_part = document.querySelector("#vehicule_part");
let recuperation_part = document.querySelector("#recuperation_part");
let erreur_date_fin = document.querySelector("#erreur-date-fin");
let erreur_date_debut = document.querySelector("#erreur-date-debut");
let vhl_name = document.querySelector("#vhl_name");
let one = document.querySelector("#one");
let recup_name = document.querySelector("#recup_name");
let two = document.querySelector("#two");
let opts_name = document.querySelector("#opts_name");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let recapitulatif = document.querySelector("#recapitulatif");
let choix_agence = document.querySelector("#choix_agence");
let choix_aeroport = document.querySelector("#choix_aeroport");
let choix_adresse = document.querySelector("#choix_adresse");
let options_part = document.querySelector("#options_part");
let recapitulatif_part = document.querySelector("#recapitulatif_part");
let agence_heure = document.querySelector("#agence_heure");
let aeroport_heure = document.querySelector("#aeroport_heure");
let adresse_heure = document.querySelector("#adresse_heure");
let recup_left = document.querySelector("#recup_left");
let prix_recup = document.querySelector("#prix_recup");
let aeroport_select = document.querySelector("#aeroport");
let numero_vol = document.querySelector("#numero-vol");
let heure_arrivee = document.querySelector("#heure-arrivee");
let ville = document.querySelector("#ville");
let adresse_input = document.querySelector("#adresse");
let heure_livraison = document.querySelector("#heure-livraison");
let precedent_recup = document.querySelector("#precedent_recup");
let suivant_recup = document.querySelector("#suivant_recup");
let precedent_option = document.querySelector("#precedent_option");
let suivant_option = document.querySelector("#suivant_option");
let precedent_recap = document.querySelector("#precedent_recap");
let confirm = document.querySelector("#confirm");
let nouvelle_loc = document.querySelector("#nouvelle_loc");
let siege_bebe_checkbox = document.querySelector("#siege_bebe_checkbox");
let conducteur_checkbox = document.querySelector("#conducteur_checkbox");
let erreur_heure_recuperation = document.querySelector("#erreur-heure-recuperation");
let erreur_aeroport = document.querySelector("#erreur-aeroport");
let erreur_numero_vol = document.querySelector("#erreur-numero-vol");
let erreur_heure_arrivee = document.querySelector("#erreur-heure-arrivee");
let erreur_ville = document.querySelector("#erreur-ville");
let erreur_adresse = document.querySelector("#erreur-adresse");
let erreur_heure_livraison = document.querySelector("#erreur-heure-livraison");
let modifier_vehicule = document.querySelector("#modifier_vehicule");
let modifier_recuperation = document.querySelector("#modifier_recuperation");
let modifier_options = document.querySelector("#modifier_options");
let recap_voiture = document.querySelector("#recap_voiture");
let recap_dates = document.querySelector("#recap_dates");
let recap_mode = document.querySelector("#recap_mode");
let recap_infos = document.querySelector("#recap_infos");
let recap_option1 = document.querySelector("#recap_option1");
let recap_option2 = document.querySelector("#recap_option2");
let confirmation_page = document.querySelector("#confirmation_page");
let confirmation_voiture = document.querySelector("#confirmation_voiture");
let confirmation_dates = document.querySelector("#confirmation_dates");
let confirmation_mode = document.querySelector("#confirmation_mode");
let confirmation_infos = document.querySelector("#confirmation_infos");
let confirmation_option1 = document.querySelector("#confirmation_option1");
let confirmation_option2 = document.querySelector("#confirmation_option2");


if(!localStorage.getItem("voitures")){
    localStorage.setItem("voitures",JSON.stringify(voituresInitiales));
}
let voitures = JSON.parse(localStorage.getItem("voitures"));

let voiture_obj = null;
let config = {
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
let selectedConfig = {
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

if(!sessionStorage.getItem("location")){
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
}
selectedConfig = JSON.parse(sessionStorage.getItem("location"));
if(selectedConfig){
  voiture_obj = voitures.find(voiture=>voiture.id === selectedConfig.voitureId) || null;
  date_debut.value = selectedConfig.dateDebut;
  date_fin.value = selectedConfig.dateFin;
  heure_recuperation.value = selectedConfig.recuperation.heureRecuperation;
  aeroport_select.value = selectedConfig.recuperation.aeroport;
  numero_vol.value = selectedConfig.recuperation.numeroVol;
  heure_arrivee.value = selectedConfig.recuperation.heureArrivee;
  ville.value = selectedConfig.recuperation.ville;
  adresse_input.value = selectedConfig.recuperation.adresse;
  heure_livraison.value = selectedConfig.recuperation.heureLivraison;
  siege_bebe_checkbox.querySelector("input").checked = selectedConfig.options.siegeBebe;
  if(selectedConfig.options.siegeBebe){
    siege_bebe_checkbox.className = "border border-[#2852E3] rounded-xl p-5 flex gap-4";
  }
  conducteur_checkbox.querySelector("input").checked = selectedConfig.options.conducteurSupplementaire;
  if(selectedConfig.options.conducteurSupplementaire){
      conducteur_checkbox.className = "border border-[#2852E3] rounded-xl p-5 flex gap-4";
  }
}

function calculerJours(){
  let debut = new Date(selectedConfig.dateDebut);
  let fin = new Date(selectedConfig.dateFin);
  let jours = Math.round((fin - debut) / 86400000) + 1;
  let frais = 0;
  if(voiture_obj){
    numberofprix.textContent = `Véhicule · ${jours} × ${voiture_obj.prixJour} MAD`;
    total_price.textContent = `${jours * voiture_obj.prixJour} MAD`;
  }
  if(selectedConfig.modeRecuperation === "aeroport"){
      frais = 150;
  }
  else if(selectedConfig.modeRecuperation === "adresse"){
      frais = 100;
  }
  siege_bebe.hidden = !selectedConfig.options.siegeBebe;
  conducteur.hidden = !selectedConfig.options.conducteurSupplementaire;
  if(selectedConfig.options.siegeBebe){
      siege_bebe_prix.textContent = `Siège bébé · ${jours} × 30 MAD`;
      siege_bebe_total.textContent = `${jours * 30} MAD`;
      frais += jours * 30;
  }
  if(selectedConfig.options.conducteurSupplementaire){
      conducteur_prix.textContent = `Conducteur · ${jours} × 200 MAD`;
      conducteur_total.textContent = `${jours * 200} MAD`;
      frais += jours * 200;
  }
  let total = jours * voiture_obj.prixJour + frais;

  days.textContent = `${jours} jours · dates incluses`;
  duree.textContent = `Durée : ${jours} jours. Les dates de début et de fin sont incluses.`;
  total_car.textContent = `${total} MAD`;
}

date_debut.addEventListener("change",()=>{
  selectedConfig.dateDebut = date_debut.value;
  date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
    calculerJours();
  }
})
date_fin.addEventListener("change",()=>{
  selectedConfig.dateFin = date_fin.value;
  date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
    calculerJours();
  }
})

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
    radio.checked = voiture.id === selectedConfig.voitureId;
    if(radio.checked){
      label.className = "bg-[#FAFBFF] rounded-xl p-4 border-2 border-[#2852E3]";
    }
    radio.addEventListener("change",()=>{
      voiture_obj = voiture;
      selectedConfig.etape = 1;
      selectedConfig.voitureId = voiture.id;
      sessionStorage.setItem("location",JSON.stringify(selectedConfig));
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
  })
}
suivant_vhl.addEventListener("click",()=>{
    if(!voiture_obj){
      alert("Veuillez sélectionner une voiture.");
      return;
    }
    if(voiture_obj.statut != "Disponible"){
      alert("Veuillez sélectionner une voiture disponible.");
      return;
    }
    if(!date_fin.value && !date_debut.value){
      erreur_date_debut.textContent = "Veuillez choisir une date de fin.";
      date_debut.classList.add("border-red-500");
      erreur_date_fin.textContent = "Veuillez choisir une date de fin.";
      date_fin.classList.add("border-red-500");
      return;
    }
    erreur_date_debut.textContent = "";
    erreur_date_fin.textContent = "";
    if(!date_debut.value){
      erreur_date_debut.textContent = "Veuillez choisir une date de fin.";
      date_debut.classList.add("border-red-500");
      return;
    }
    erreur_date_debut.textContent = "";
    date_debut.classList.remove("border-red-500");
    if(!date_fin.value){
      erreur_date_fin.textContent = "Veuillez choisir une date de fin.";
      date_fin.classList.add("border-red-500");
      return;
    }
    erreur_date_fin.textContent = "";
    date_fin.classList.remove("border-red-500");
    if(date_debut.value < new Date().toLocaleDateString("en-CA")){
        alert("La date de début ne peut pas être dans le passé.");
        return;
    }
    if(date_fin.value < date_debut.value){
        alert("La date de fin ne peut pas être avant la date de début.");
        return;
    }
    selectedConfig.etape = 2;
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    afficher_perpage();
});
recommencer_1.addEventListener("click",()=>{
    erreur_date_fin.textContent = "";
    date_fin.classList.remove("border-red-500");
    erreur_date_debut.textContent = "";
    date_debut.classList.remove("border-red-500");
    selectedConfig.voitureId = null;
    selectedConfig.dateDebut = "";
    selectedConfig.dateFin = "";
    selectedConfig.etape = 1;
    voiture_obj = null;
    date_debut.value = "";
    date_fin.value = "";
    date.textContent = "__";
    marque.textContent = "__";
    ctg_prix.textContent = "__";
    days.textContent = "__";
    duree.textContent = "Les dates de début et de fin sont incluses.";
    numberofprix.textContent = "__";
    total_price.textContent = "__";
    total_car.textContent = "__";
    recup_left.textContent = "__";
    prix_recup.textContent = "__";
    siege_bebe_prix.textContent = "__";
    siege_bebe_total.textContent = "__";
    conducteur_prix.textContent = "__";
    conducteur_total.textContent = "__";
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    afficher_perpage();
});
function reset_recuperation(){
    selectedConfig.recuperation = {
        heureRecuperation: "",
        aeroport: "",
        numeroVol: "",
        heureArrivee: "",
        ville: "",
        adresse: "",
        heureLivraison: ""
    };
    heure_recuperation.value = "";
    aeroport_select.value = "";
    numero_vol.value = "";
    heure_arrivee.value = "";
    ville.value = "";
    adresse_input.value = "";
    heure_livraison.value = "";
    supprimerErreur(heure_recuperation,erreur_heure_recuperation);
    supprimerErreur(aeroport_select,erreur_aeroport);
    supprimerErreur(numero_vol,erreur_numero_vol);
    supprimerErreur(heure_arrivee,erreur_heure_arrivee);
    supprimerErreur(ville,erreur_ville);
    supprimerErreur(adresse_input,erreur_adresse);
    supprimerErreur(heure_livraison,erreur_heure_livraison);
}
choix_agence.addEventListener("change",()=>{
  reset_recuperation();
  selectedConfig.modeRecuperation = "agence";
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_recuperation();
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin && selectedConfig.dateFin >= selectedConfig.dateDebut){
    calculerJours();
  }
})
choix_aeroport.addEventListener("change",()=>{
  reset_recuperation();
  selectedConfig.modeRecuperation = "aeroport";
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_recuperation();
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin && selectedConfig.dateFin >= selectedConfig.dateDebut){
    calculerJours();
  }
  
})
choix_adresse.addEventListener("change",()=>{
  reset_recuperation();
  selectedConfig.modeRecuperation = "adresse";
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_recuperation();
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin && selectedConfig.dateFin >= selectedConfig.dateDebut){
      calculerJours();
  }
});
heure_recuperation.addEventListener("change",()=>{
    selectedConfig.recuperation.heureRecuperation = heure_recuperation.value;
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

aeroport_select.addEventListener("change",()=>{
  selectedConfig.recuperation.aeroport = aeroport_select.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

numero_vol.addEventListener("input",()=>{
  selectedConfig.recuperation.numeroVol = numero_vol.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

heure_arrivee.addEventListener("change",()=>{
  selectedConfig.recuperation.heureArrivee = heure_arrivee.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

ville.addEventListener("input",()=>{
  selectedConfig.recuperation.ville = ville.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

adresse_input.addEventListener("input",()=>{
  selectedConfig.recuperation.adresse = adresse_input.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});

heure_livraison.addEventListener("change",()=>{
  selectedConfig.recuperation.heureLivraison = heure_livraison.value;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
});
function afficher_recuperation(){
    recup_left.textContent = "__";
    prix_recup.textContent = "__";
    agence_heure.hidden = true;
    aeroport_heure.hidden = true;
    adresse_heure.hidden = true;

    choix_agence.className = "border border-[#D8E1EF] bg-[#FAFBFF] rounded-xl p-4";
    choix_aeroport.className = "border border-[#D8E1EF] bg-[#FAFBFF] rounded-xl p-4";
    choix_adresse.className = "border border-[#D8E1EF] bg-[#FAFBFF] rounded-xl p-4";

    choix_agence.querySelector("input").checked = false;
    choix_aeroport.querySelector("input").checked = false;
    choix_adresse.querySelector("input").checked = false;

    if(selectedConfig.modeRecuperation === "agence"){
        agence_heure.hidden = false;
        choix_agence.querySelector("input").checked = true;
        choix_agence.className = "border border-[#2852E3] bg-[#FAFBFF] rounded-xl p-4";
        if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
          recup_left.textContent = "Récupération";
          prix_recup.textContent = "Gratuite";
        }
    }
    else if(selectedConfig.modeRecuperation === "aeroport"){
        aeroport_heure.hidden = false;
        choix_aeroport.querySelector("input").checked = true;
        choix_aeroport.className = "border border-[#2852E3] bg-[#FAFBFF] rounded-xl p-4";
        recup_left.textContent = "Récupération";
        prix_recup.textContent = "150 MAD";
    }
    else if(selectedConfig.modeRecuperation === "adresse"){
        adresse_heure.hidden = false;
        choix_adresse.querySelector("input").checked = true;
        choix_adresse.className = "border border-[#2852E3] bg-[#FAFBFF] rounded-xl p-4";
        recup_left.textContent = "Récupération";
        prix_recup.textContent = "100 MAD";
    }
}
precedent_recup.addEventListener("click",()=>{
  selectedConfig.etape=1;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  one.textContent = "1";
  one.className = "bg-[#2852E3] text-white flex items-center justify-center rounded-full h-[40px] w-[40px]";
  vhl_name.className = "text-[#2852E3] lg:py-3 lg:text-[13px]";
  two.className = "bg-[#F4F6FA] text-[#697C94] flex items-center justify-center rounded-[50%] h-[40px] w-[40px]";
  recup_name.className = "text-[#697C94] lg:py-3 lg:text-[13px]";
  afficher_perpage();
})
function afficherErreur(input,erreur,message){
    input.style.borderColor = "red";
    erreur.textContent = message;
}

function supprimerErreur(input,erreur){
    input.style.borderColor = "";
    erreur.textContent = "";
}

suivant_recup.addEventListener("click",()=>{
    let valide = true;

    if(selectedConfig.modeRecuperation === "agence"){
      supprimerErreur(heure_recuperation,erreur_heure_recuperation);
      if(!heure_recuperation.value){
        afficherErreur(heure_recuperation,erreur_heure_recuperation,"Veuillez choisir une heure de récupération.");
        valide = false;
      }
    }
    else if(selectedConfig.modeRecuperation === "aeroport"){
      supprimerErreur(aeroport_select,erreur_aeroport);
      supprimerErreur(numero_vol,erreur_numero_vol);
      supprimerErreur(heure_arrivee,erreur_heure_arrivee);

      if(!aeroport_select.value){
        afficherErreur(aeroport_select,erreur_aeroport,"Veuillez choisir un aéroport.");
        valide = false;
      }
      if(!numero_vol.value.trim()){
        afficherErreur(numero_vol,erreur_numero_vol,"Veuillez saisir le numéro du vol.");
        valide = false;
      }
      if(!heure_arrivee.value){
        afficherErreur(heure_arrivee,erreur_heure_arrivee,"Veuillez choisir une heure d'arrivée.");
        valide = false;
      }
    }
    else if(selectedConfig.modeRecuperation === "adresse"){
        supprimerErreur(ville,erreur_ville);
        supprimerErreur(adresse_input,erreur_adresse);
        supprimerErreur(heure_livraison,erreur_heure_livraison);

      if(!ville.value.trim()){
        afficherErreur(ville,erreur_ville,"Veuillez saisir une ville.");
        valide = false;
      }
      if(!adresse_input.value.trim()){
        afficherErreur(adresse_input,erreur_adresse,"Veuillez saisir une adresse complète.");
        valide = false;
      }
      if(!heure_livraison.value){
        afficherErreur(heure_livraison,erreur_heure_livraison,"Veuillez choisir une heure de livraison.");
        valide = false;
      }
  }
  if(!valide) return;
  selectedConfig.etape = 3;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_perpage();
});

siege_bebe_checkbox.addEventListener("change",()=>{
    let checked = siege_bebe_checkbox.querySelector("input").checked;
    selectedConfig.options.siegeBebe = checked;
    if(checked){
        siege_bebe_checkbox.className = "border border-[#2852E3] rounded-xl p-5 flex gap-4";
    }
    else{
        siege_bebe_checkbox.className = "border border-[#D8E1EF] rounded-xl p-5 flex gap-4";
    }
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
        calculerJours();
    }
});

conducteur_checkbox.addEventListener("change",()=>{
    let checked = conducteur_checkbox.querySelector("input").checked;
    selectedConfig.options.conducteurSupplementaire = checked;
    if(checked){
        conducteur_checkbox.className = "border border-[#2852E3] rounded-xl p-5 flex gap-4";
    }
    else{
        conducteur_checkbox.className = "border border-[#D8E1EF] rounded-xl p-5 flex gap-4";
    }
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin){
        calculerJours();
    }
});
precedent_option.addEventListener("click",()=>{
  selectedConfig.etape=2;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  two.textContent = "2";
  two.className = "bg-[#2852E3] text-white flex items-center justify-center rounded-full h-[40px] w-[40px]";
  recup_name.className = "text-[#2852E3] lg:py-3 lg:text-[13px]";
  three.className = "bg-[#F4F6FA] text-[#697C94] flex items-center justify-center rounded-[50%] h-[40px] w-[40px]";
  opts_name.className = "text-[#697C94] lg:py-3 lg:text-[13px]";
  afficher_perpage();
})
suivant_option.addEventListener("click",()=>{
  selectedConfig.etape=4;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_perpage();
})
precedent_recap.addEventListener("click",()=>{
  selectedConfig.etape=3;
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  three.textContent = "3";
  three.className = "bg-[#2852E3] text-white flex items-center justify-center rounded-full h-[40px] w-[40px]";
  opts_name.className = "text-[#2852E3] lg:py-3 lg:text-[13px]";
  four.className = "bg-[#F4F6FA] text-[#697C94] flex items-center justify-center rounded-[50%] h-[40px] w-[40px]";
  recapitulatif.className = "text-[#697C94] lg:py-3 lg:text-[13px]";
  afficher_perpage();
})
confirm.addEventListener("click",()=>{
  selectedConfig.etape=5;
  voiture_obj.statut = "Louée";
  localStorage.setItem("voitures",JSON.stringify(voitures));
  sessionStorage.setItem("location",JSON.stringify(selectedConfig));
  afficher_perpage();
})
nouvelle_loc.addEventListener("click",()=>{
    sessionStorage.removeItem("location");
    window.location.reload();
});
function afficher_progression(){
    let cercles = [one,two,three,four];
    let titres = [vhl_name,recup_name,opts_name,recapitulatif];

    cercles.forEach((cercle,index)=>{
        let numero = index + 1;

        if(numero < selectedConfig.etape){
            cercle.textContent = "✓";
            cercle.className = "bg-[#2852E3] text-white flex items-center justify-center rounded-full h-[40px] w-[40px]";
            titres[index].className = "text-[#2852E3] lg:py-3 lg:text-[13px]";
        }
        else if(numero === selectedConfig.etape){
            cercle.textContent = numero;
            cercle.className = "bg-[#2852E3] text-white flex items-center justify-center rounded-full h-[40px] w-[40px]";
            titres[index].className = "text-[#2852E3] lg:py-3 lg:text-[13px]";
        }
        else{
            cercle.textContent = numero;
            cercle.className = "bg-[#F4F6FA] text-[#697C94] flex items-center justify-center rounded-full h-[40px] w-[40px]";
            titres[index].className = "text-[#697C94] lg:py-3 lg:text-[13px]";
        }
    });
}
modifier_vehicule.addEventListener("click",()=>{
    selectedConfig.etape = 1;
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    afficher_perpage();
});

modifier_recuperation.addEventListener("click",()=>{
    selectedConfig.etape = 2;
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    afficher_perpage();
});

modifier_options.addEventListener("click",()=>{
    selectedConfig.etape = 3;
    sessionStorage.setItem("location",JSON.stringify(selectedConfig));
    afficher_perpage();
});

function afficher_recapitulatif(){
    if(!voiture_obj || !selectedConfig.dateDebut || !selectedConfig.dateFin) return;

    let debut = new Date(selectedConfig.dateDebut);
    let fin = new Date(selectedConfig.dateFin);
    let jours = Math.round((fin - debut) / 86400000) + 1;

    recap_voiture.textContent = `${voiture_obj.marque} ${voiture_obj.modele} · ${voiture_obj.prixJour} MAD / jour`;
    recap_dates.textContent = `Du ${selectedConfig.dateDebut} au ${selectedConfig.dateFin} · ${jours} jours`;

    if(selectedConfig.modeRecuperation === "agence"){
        recap_mode.textContent = "À l'agence";
        recap_infos.textContent = `Heure de récupération : ${selectedConfig.recuperation.heureRecuperation}`;
    }
    else if(selectedConfig.modeRecuperation === "aeroport"){
        let aeroport = aeroport_select.options[aeroport_select.selectedIndex].textContent;
        recap_mode.textContent = aeroport;
        recap_infos.textContent = `Vol ${selectedConfig.recuperation.numeroVol} · arrivée à ${selectedConfig.recuperation.heureArrivee}`;
    }
    else if(selectedConfig.modeRecuperation === "adresse"){
        recap_mode.textContent = `${selectedConfig.recuperation.adresse}, ${selectedConfig.recuperation.ville}`;
        recap_infos.textContent = `Heure de livraison : ${selectedConfig.recuperation.heureLivraison}`;
    }

    recap_option1.textContent = selectedConfig.options.siegeBebe ? "Siège bébé · 30 MAD / jour" : "Sans siège bébé";
    recap_option2.textContent = selectedConfig.options.conducteurSupplementaire ? "Conducteur supplémentaire · 200 MAD / jour" : "Sans conducteur supplémentaire";
}

function afficher_perpage(){
  afficher_progression();
  afficher_recuperation();
  if(selectedConfig.etape === 1){
    vehicule_part.hidden = false;
    recuperation_part.hidden = true;
    options_part.hidden = true;
    recapitulatif_part.hidden = true;
    confirmation_page.hidden = true;
    afficher();
  }
  else if(selectedConfig.etape === 2){
      vehicule_part.hidden = true;
      recuperation_part.hidden = false;
      options_part.hidden = true;
      recapitulatif_part.hidden = true;
      confirmation_page.hidden = true;
      afficher_recuperation();
  }
  else if(selectedConfig.etape === 3){
      vehicule_part.hidden = true;
      recuperation_part.hidden = true;
      options_part.hidden = false;
      recapitulatif_part.hidden = true;
      confirmation_page.hidden = true; 
  }
  else if(selectedConfig.etape === 4){
      vehicule_part.hidden = true;
      recuperation_part.hidden = true;
      options_part.hidden = true;
      recapitulatif_part.hidden = false;
      confirmation_page.hidden = true;
      afficher_recapitulatif();
  }
  else if(selectedConfig.etape === 5){
      vehicule_part.hidden = true;
      recuperation_part.hidden = true;
      options_part.hidden = true;
      recapitulatif_part.hidden = true;
      confirmation_page.hidden = false;
      afficher_recapitulatif();
      confirmation_voiture.textContent = recap_voiture.textContent;
      confirmation_dates.textContent = recap_dates.textContent;
      confirmation_mode.textContent = recap_mode.textContent;
      confirmation_infos.textContent = recap_infos.textContent;
      confirmation_option1.textContent = recap_option1.textContent;
      confirmation_option2.textContent = recap_option2.textContent;
  }
  if(voiture_obj){
    marque.textContent = `${voiture_obj.marque} ${voiture_obj.modele}`;
    ctg_prix.textContent = `${voiture_obj.categorie} · ${voiture_obj.prixJour} MAD / jour`;
  }
  if(selectedConfig.dateDebut && selectedConfig.dateFin){
      date.textContent = `${selectedConfig.dateDebut} → ${selectedConfig.dateFin}`;
  }
  if(voiture_obj && selectedConfig.dateDebut && selectedConfig.dateFin && selectedConfig.dateFin >= selectedConfig.dateDebut){
      calculerJours();
  }
}
afficher_perpage();
