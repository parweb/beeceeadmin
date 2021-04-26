import { orderBy } from 'helpers';

const qualificationsDocument = () =>
  [
    { id: 'ANH', label: 'Analyse d’huile' },
    { id: 'AOE', label: 'AO EVEX' },
    { id: 'ANN', label: 'Archive annonces' },
    { id: 'CGR', label: 'Carte grise' },
    { id: 'CHE', label: 'Chèque' },
    { id: 'C41', label: 'CO 418 / Avis ECR' },
    { id: 'CRX', label: 'Conclusions rédigées de l’expert' },
    { id: 'CON', label: 'Constat amiable / dépôt de plainte' },
    { id: 'CTG', label: 'Contrôle technique / géométrie' },
    { id: 'DI', label: ' Demande interne' },
    { id: 'DEV', label: 'Devis' },
    { id: 'DEP', label: 'Devis pointé' },
    { id: 'DIV', label: 'Divers' },
    { id: 'DOC', label: 'Document de cession' },
    { id: 'FAA', label: "Facture d'achat" },
    { id: 'FAR', label: 'Facture de réparation ou avoir' },
    { id: 'FAE', label: "Facture d'entretien" },
    { id: 'FAP', label: 'Facture pointée' },
    { id: 'FRG', label: 'Facture remorquage / Gardiennage' },
    { id: 'GRV', label: 'Gestion des RDV : repassage terrain, convocation' },
    { id: 'INE', label: 'INFO Emetteur' },
    { id: 'IPT', label: 'INFO pertes totales' },
    { id: 'INA', label: 'Information assuré' },
    { id: 'IRC', label: 'Initiation RCP/PJ' },
    { id: 'LMV', label: 'Lettre de mission VE' },
    { id: 'MCR', label: 'Mail de confirmation de RDV' },
    { id: 'OMR', label: 'Mission RCP /PJ' },
    { id: 'OMT', label: 'OM avec confirmation télématique' },
    { id: 'OML', label: 'OM prioritaire rdv du lendemain' },
    { id: 'OTN', label: 'OMT non prioritaire' },
    { id: 'OMN', label: 'Ordre de mission non prioritaire' },
    { id: 'ODR', label: 'Ordre de réparation' },
    { id: 'PHO', label: 'Photos' },
    { id: 'PVA', label: "PV agricole d'un état descriptif du matériel" },
    { id: 'PVC', label: 'PV de constatation' },
    { id: 'PVS', label: 'PV de suivi VE' },
    { id: 'QSI', label: 'Questionnaire sinistre' },
    { id: 'PVR', label: 'Rapport adverse ou autre rap' },
    { id: 'REC', label: 'Réclamation' },
    { id: 'RDI', label: 'Règlement direct' },
    { id: 'RIR', label: 'Retour Info réparateur' },
    { id: 'STA', label: 'STAN' },
    { id: 'SUR', label: 'Supplément réparateur' },
    { id: 'SYV', label: 'Synthèse annonces' },
    { id: 'TP', label: ' Titre de propriété' }
  ].sort(orderBy('label', 'asc', x => x.trim()));

const qualificationsPhoto = () =>
  [
    { id: 'ARD', label: '3/4 Arrière Droit' },
    { id: 'ARG', label: '3/4 Arrière Gauche' },
    { id: 'ASSU', label: 'Déclaration assuré' },
    { id: 'AUTR', label: 'Autres' },
    { id: 'AVD', label: '3/4 Avant Droit' },
    { id: 'AVG', label: '3/4 Avant Gauche' },
    { id: 'BOIT', label: 'Boite' },
    { id: 'CGRI', label: 'Carte grise' },
    { id: 'COFF', label: 'Coffre (intérieur)' },
    { id: 'COMP', label: 'Compartiment Moteur' },
    { id: 'CONS', label: 'Constat' },
    { id: 'CPTK', label: 'Compteur kilométrique' },
    { id: 'CVER', label: "Attestation d'assurance (Carte Verte)" },
    { id: 'DEVI', label: 'Devis' },
    { id: 'DOMM', label: 'Dommages' },
    { id: 'EXVO', label: 'Experveo' },
    { id: 'IMMA', label: 'Immatriculation' },
    { id: 'INAR', label: 'Intérieur (Arrière)' },
    { id: 'INAV', label: 'Intérieur (Avant)' },
    { id: 'INTE', label: 'Intérieur' },
    { id: 'MISS', label: 'Mission' },
    { id: 'MOTE', label: 'Moteur' },
    { id: 'NSER', label: 'Numero de serie' },
    { id: 'ODRR', label: 'Ordre de réparation régularisé' },
    { id: 'PABI', label: 'Pare Brise' },
    { id: 'PNEU', label: 'Pneumatiques' },
    { id: 'SEAR', label: 'Sellerie Arrière' },
    { id: 'SEAV', label: 'Sellerie Avant' },
    { id: 'SECU', label: 'Sécurité des personnes' },
    { id: 'SELL', label: 'Sellerie' },
    { id: 'SOUB', label: 'Soubassement' },
    { id: 'STRU', label: 'Structure' },
    { id: 'TARI', label: 'Tarif' },
    { id: 'TRAI', label: 'Train Roulant' },
    { id: 'VENS', label: "Vue d'ensemble" }
  ].sort(orderBy('label', 'asc', x => x.trim()));

const qualifications = {
  photo: () => qualificationsPhoto(),
  document: () => qualificationsDocument()
};

export const qualificationsById = type => {
  return qualifications[type]().reduce(
    (carry, { id, label }) => ({ ...carry, [id]: label }),
    {}
  );
};

export const imagesExtension = ['bmp', 'jpg', 'jpeg', 'png', 'gif'];

export default qualifications;
