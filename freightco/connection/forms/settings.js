"use strict";

module.exports = {
  dataSchema: {
    title: "FreightCo Settings",
    description: "Update your FreightCo account settings",
    type: "object",
    required: [
      "default_currency",
      "deliver_duties_paid"
    ],
    properties: {
      default_currency: {
        title: "Default currency",
        type: "string",
        enum: [
          "USD",
          "CAD",
          "AUD",
          "NZD",
          "GBP",
          "EUR"
        ]
      },
      deliver_duties_paid: {
        title: "Include duties & taxes in label cost",
        type: "boolean"
      }
    }
  },
  uiSchema: {
    default_currency: {
      "ui:autofocus": true
    }
  },
  localization: {
    es: {
      dataSchema: {
        title: "Configuraciones de FreightCo",
        description: "Actualice la configuración de su cuenta de FreightCo",
        properties: {
          default_currency: {
            title: "Moneda predeterminada",
          },
          deliver_duties_paid: {
            title: "Incluya aranceles e impuestos en el costo de la etiqueta"
          }
        }
      }
    },
    fr: {
      dataSchema: {
        title: "Paramètres FreightCo",
        description: "Mettez à jour les paramètres de votre compte FreightCo",
        properties: {
          default_currency: {
            title: "Devise par Défaut"
          },
          deliver_duties_paid: {
            title: "Inclure les droits et taxes dans le coût de l'étiquette"
          }
        }
      }
    }
  }
};
