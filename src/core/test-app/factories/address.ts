import {
  AddressPOJO,
  AddressWithContactInfoPOJO,
  Country,
} from "@shipengine/integration-platform-sdk";
import { buildContactInfo } from './contact-info';

export function buildAddressWithContactInfo(
  countryCode: string,
): AddressWithContactInfoPOJO | undefined {
  const countryMap: Record<string, AddressWithContactInfoPOJO> = {
    "US-from": Object.assign(buildAddress("US-from"), buildContactInfo("US-from")),
    "US-to": Object.assign(buildAddress("US-to"), buildContactInfo("US-to")),
    "CA-from": Object.assign(buildAddress("CA-from"), buildContactInfo("CA-from")),
    "CA-to": Object.assign(buildAddress("CA-to"), buildContactInfo("CA-to")),
    "MX-from": Object.assign(buildAddress("MX-from"), buildContactInfo("MX-from")),
    "MX-to": Object.assign(buildAddress("MX-to"), buildContactInfo("MX-to")),
    "GB-from": Object.assign(buildAddress("GB-from"), buildContactInfo("GB-from")),
    "GB-to": Object.assign(buildAddress("GB-to"), buildContactInfo("GB-to")),
    "PT-from": Object.assign(buildAddress("PT-from"), buildContactInfo("PT-from")),
    "PT-to": Object.assign(buildAddress("PT-to"), buildContactInfo("PT-to")),
    "ES-from": Object.assign(buildAddress("ES-from"), buildContactInfo("ES-from")),
    "ES-to": Object.assign(buildAddress("ES-to"), buildContactInfo("ES-to")),
    "FR-from": Object.assign(buildAddress("FR-from"), buildContactInfo("FR-from")),
    "FR-to": Object.assign(buildAddress("FR-to"), buildContactInfo("FR-to")),
    "NL-from": Object.assign(buildAddress("NL-from"), buildContactInfo("NL-from")),
    "NL-to": Object.assign(buildAddress("NL-to"), buildContactInfo("NL-to")),
    "BE-from": Object.assign(buildAddress("BE-from"), buildContactInfo("BE-from")),
    "BE-to": Object.assign(buildAddress("BE-to"), buildContactInfo("BE-to")),
    "DE-from": Object.assign(buildAddress("DE-from"), buildContactInfo("DE-from")),
    "DE-to": Object.assign(buildAddress("DE-to"), buildContactInfo("DE-to")),
    "IT-from": Object.assign(buildAddress("IT-from"), buildContactInfo("IT-from")),
    "IT-to": Object.assign(buildAddress("IT-to"), buildContactInfo("IT-to")),
    "DK-from": Object.assign(buildAddress("DK-from"), buildContactInfo("DK-from")),
    "DK-to": Object.assign(buildAddress("DK-to"), buildContactInfo("DK-to")),
    "CH-from": Object.assign(buildAddress("CH-from"), buildContactInfo("CH-from")),
    "CH-to": Object.assign(buildAddress("CH-to"), buildContactInfo("CH-to")),
    "AT-from": Object.assign(buildAddress("AT-from"), buildContactInfo("AT-from")),
    "AT-to": Object.assign(buildAddress("AT-to"), buildContactInfo("AT-to")),
    "NO-from": Object.assign(buildAddress("NO-from"), buildContactInfo("NO-from")),
    "NO-to": Object.assign(buildAddress("NO-to"), buildContactInfo("NO-to")),
    "SE-from": Object.assign(buildAddress("SE-from"), buildContactInfo("SE-from")),
    "SE-to": Object.assign(buildAddress("SE-to"), buildContactInfo("SE-to")),
    "FI-from": Object.assign(buildAddress("FI-from"), buildContactInfo("FI-from")),
    "FI-to": Object.assign(buildAddress("FI-to"), buildContactInfo("FI-to")),
    "PL-from": Object.assign(buildAddress("PL-from"), buildContactInfo("PL-from")),
    "PL-to": Object.assign(buildAddress("PL-to"), buildContactInfo("PL-to")),
    "CZ-from": Object.assign(buildAddress("CZ-from"), buildContactInfo("CZ-from")),
    "CZ-to": Object.assign(buildAddress("CZ-to"), buildContactInfo("CZ-to")),
    "LU-from": Object.assign(buildAddress("LU-from"), buildContactInfo("LU-from")),
    "LU-to": Object.assign(buildAddress("LU-to"), buildContactInfo("LU-to")),
    "AU-from": Object.assign(buildAddress("AU-from"), buildContactInfo("AU-from")),
    "AU-to": Object.assign(buildAddress("AU-to"), buildContactInfo("AU-to")),
    "NZ-from": Object.assign(buildAddress("NZ-from"), buildContactInfo("NZ-from")),
    "NZ-to": Object.assign(buildAddress("NZ-to"), buildContactInfo("NZ-to")),
    "BR-from": Object.assign(buildAddress("BR-from"), buildContactInfo("BR-from")),
    "BR-to": Object.assign(buildAddress("BR-to"), buildContactInfo("BR-to")),
  };

  return countryMap[countryCode];
}

export function getSupportedCountryCodes(): Set<string> {
  let supportedCountries = new Set<string>()
  for(let key of Object.keys(countryMap)) {

    supportedCountries.add(key.slice(0,2))
  }
  return supportedCountries;
}

export function buildAddress(countryCode: string): AddressPOJO {
  return countryMap[countryCode];
}

const countryMap: Record<string, AddressPOJO> = {
  "US-from": {
    company: "US International",
    addressLines: ["3800 N Lamar Blvd #220"],
    cityLocality: "Austin",
    stateProvince: "TX",
    postalCode: "78756",
    country: Country.UnitedStates
  },
  "US-to": {
    company: "Company Inc",
    addressLines: ["333 O'Farrell St"],
    cityLocality: "San Francisco",
    stateProvince: "CA",
    postalCode: "94102",
    country: Country.UnitedStates,
  },
  "CA-from": {
    company: "CN International",
    addressLines: ["145 Richmond St W"],
    cityLocality: "Toronto",
    stateProvince: "ON",
    postalCode: "M5H 2L2",
    country: Country.Canada,
  },
  "CA-to": {
    company: "Company Inc",
    addressLines: ["6083 McKay Ave"],
    cityLocality: "Burnaby",
    stateProvince: "BC",
    postalCode: "B5H 2W7",
    country: Country.Canada,
  },
  "MX-from": {
    company: "MX International",
    addressLines: ["Blvd. Luis Donaldo Colosio MZA 1", "SM 310"],
    cityLocality: "Cancún",
    stateProvince: "Q.R.",
    postalCode: "77500",
    country: Country.Mexico,
  },
  "MX-to": {
    company: "Company Inc",
    addressLines: ["Carretera Transpeninsular", "km 10.3 Col Cabo del Sol"],
    cityLocality: "Cabo San Lucas",
    stateProvince: "B.C.S.",
    postalCode: "23410",
    country: Country.Mexico,
  },
  "GB-from": {
    company: "UK International",
    addressLines: ["12 Copthall Ave"],
    cityLocality: "London",
    stateProvince: "London",
    postalCode: "EC2N 2DL",
    country: Country.UnitedKingdom,
  },
  "GB-to": {
    company: "Company Inc",
    addressLines: ["Unit 2A", "Prospect Point Prescot Street"],
    cityLocality: "Liverpool",
    stateProvince: "Liverpool",
    postalCode: "L6 1BA",
    country: Country.UnitedKingdom,
  },
  "PT-from": {
    company: "PT International",
    addressLines: ["Av. António Augusto de Aguiar 31"],
    cityLocality: "Lisboa",
    stateProvince: "Lisboa",
    postalCode: "1069-413",
    country: Country.Portugal,
  },
  "PT-to": {
    company: "Company Inc",
    addressLines: ["R. de Mouzinho da Silveira 196"],
    cityLocality: "Porto",
    stateProvince: "Porto",
    postalCode: "4050-417",
    country: Country.Portugal,
  },
  "ES-from": {
    company: "ES International",
    addressLines: ["Calle de Cdad. Rodrigo", "5"],
    cityLocality: "Madrid",
    stateProvince: "Madrid",
    postalCode: "28005",
    country: Country.Spain,
  },
  "ES-to": {
    company: "Company Inc",
    addressLines: ["Moll d'Espanya", "5"],
    cityLocality: "Barcelona",
    stateProvince: "Barcelona",
    postalCode: "08039",
    country: Country.Spain,
  },
  "FR-from": {
    company: "FR International",
    addressLines: ["2 Rue de l'Échelle"],
    cityLocality: "Paris",
    stateProvince: "Paris",
    postalCode: "75001",
    country: Country.France,
  },
  "FR-to": {
    company: "Company Inc",
    addressLines: ["30 Avenue Jean Médecin"],
    cityLocality: "Nice",
    stateProvince: "Nice",
    postalCode: "06000",
    country: Country.France,
  },
  "NL-from": {
    company: "NL International",
    addressLines: ["Utrechtsestraat 9"],
    cityLocality: "Amsterdam",
    stateProvince: "Amsterdam",
    postalCode: "1017 CV",
    country: Country.Netherlands,
  },
  "NL-to": {
    company: "Company Inc",
    addressLines: ["Burgemeester Oudlaan 50"],
    cityLocality: "Rotterdam",
    stateProvince: "Rotterdam",
    postalCode: "3062 PA",
    country: Country.Netherlands,
  },
  "BE-from": {
    company: "BE International",
    addressLines: ["Carrefour de l'Europe"],
    cityLocality: "Bruxelles",
    stateProvince: "Bruxelles",
    postalCode: "1000",
    country: Country.Belgium,
  },
  "BE-to": {
    company: "Company Inc",
    addressLines: ["Stationsplein 5"],
    cityLocality: "Brugge",
    stateProvince: "Brugge",
    postalCode: "8000",
    country: Country.Belgium,
  },
  "DE-from": {
    company: "BE International",
    addressLines: ["Neue Promenade 3"],
    cityLocality: "Berlin",
    stateProvince: "Berlin",
    postalCode: "10178",
    country: Country.Germany,
  },
  "DE-to": {
    company: "Company Inc",
    addressLines: ["Borsigallee 26"],
    cityLocality: "Frankfurt am Main",
    stateProvince: "Frankfurt am Main",
    postalCode: "60388",
    country: Country.Germany,
  },
  "IT-from": {
    company: "IT International",
    addressLines: ["Corso Garibaldi", "118"],
    cityLocality: "Milano",
    stateProvince: "MI",
    postalCode: "20121",
    country: Country.Italy,
  },
  "IT-to": {
    company: "Company Inc",
    addressLines: ["Corso Vittorio Emanuele", "133"],
    cityLocality: "Napoli",
    stateProvince: "NA",
    postalCode: "80121",
    country: Country.Italy,
  },
  "DK-from": {
    company: "DK International",
    addressLines: ["Frederiksborggade 15"],
    cityLocality: "København",
    stateProvince: "København",
    postalCode: "1360",
    country: Country.Denmark,
  },
  "DK-to": {
    company: "Company Inc",
    addressLines: ["Vestsjællandscentret 10 A", "st. 62"],
    cityLocality: "Slagelse",
    stateProvince: "Slagelse",
    postalCode: "4200",
    country: Country.Denmark,
  },
  "CH-from": {
    company: "CH International",
    addressLines: ["Bahnhofpl. 6"],
    cityLocality: "Zürich",
    stateProvince: "Zürich",
    postalCode: "8001",
    country: Country.Switzerland,
  },
  "CH-to": {
    company: "Company Inc",
    addressLines: ["Waaghausgasse 18"],
    cityLocality: "Bern",
    stateProvince: "Bern",
    postalCode: "3011",
    country: Country.Switzerland,
  },
  "AT-from": {
    company: "AT International",
    addressLines: ["Karlsplatzpassage Karlsplatz Hauptpassage"],
    cityLocality: "Wien",
    stateProvince: "Wien",
    postalCode: "1010",
    country: Country.Austria,
  },
  "AT-to": {
    company: "Company Inc",
    addressLines: ["Hofgasse 6"],
    cityLocality: "Innsbruck",
    stateProvince: "Innsbruck",
    postalCode: "6020",
    country: Country.Austria,
  },
  "NO-from": {
    company: "NO International",
    addressLines: ["Nydalsveien 37"],
    cityLocality: "Oslo",
    stateProvince: "Oslo",
    postalCode: "0484",
    country: Country.Norway,
  },
  "NO-to": {
    company: "Company Inc",
    addressLines: ["Vetrlidsallmenningen 2"],
    cityLocality: "Bergen",
    stateProvince: "Bergen",
    postalCode: "5014",
    country: Country.Norway,
  },
  "SE-from": {
    company: "SE International",
    addressLines: ["Kungsgatan 2"],
    cityLocality: "Stockholm",
    stateProvince: "Stockholm",
    postalCode: "111 42",
    country: Country.Sweden,
  },
  "SE-to": {
    company: "Company Inc",
    addressLines: ["Norra Hamngatan 18"],
    cityLocality: "Göteborg",
    stateProvince: "Göteborg",
    postalCode: "411 06",
    country: Country.Sweden,
  },
  "FI-from": {
    company: "FI International",
    addressLines: ["Tuomiokirkonkatu 26-28"],
    cityLocality: "Tampere",
    stateProvince: "Tampere",
    postalCode: "33100",
    country: Country.Finland,
  },
  "FI-to": {
    company: "Company Inc",
    addressLines: ["Malminrinne 2"],
    cityLocality: "Helsinki",
    stateProvince: "Helsinki",
    postalCode: "00100",
    country: Country.Finland,
  },
  "PL-from": {
    company: "PL International",
    addressLines: ["Targowa 72"],
    cityLocality: "Warszawa",
    stateProvince: "Warszawa",
    postalCode: "03-734",
    country: Country.Poland,
  },
  "PL-to": {
    company: "Company Inc",
    addressLines: ["Rynek 27"],
    cityLocality: "Kraków",
    stateProvince: "Kraków",
    postalCode: "31-010",
    country: Country.Poland,
  },
  "CZ-from": {
    company: "CZ International",
    addressLines: ["Jugoslávská 5"],
    cityLocality: "Praha",
    stateProvince: "2-Vinohrady",
    postalCode: "120 00",
    country: Country.CzechRepublic,
  },
  "CZ-to": {
    company: "Company Inc",
    addressLines: ["Netroufalky 770"],
    cityLocality: "Bohunice",
    stateProvince: "Bohunice",
    postalCode: "625 00",
    country: Country.CzechRepublic,
  },
  "LU-from": {
    company: "LU International",
    addressLines: ["Aire de Berchem"],
    cityLocality: "Berchem",
    stateProvince: "Berchem",
    postalCode: "3325",
    country: Country.Luxembourg,
  },
  "LU-to": {
    company: "Company Inc",
    addressLines: ["13 Rue Gabriel Lippmann"],
    cityLocality: "Schuttrange",
    stateProvince: "Schuttrange",
    postalCode: "5365",
    country: Country.Luxembourg,
  },
  "AU-from": {
    company: "AU International",
    addressLines: ["135 George St"],
    cityLocality: "The Rocks",
    stateProvince: "NSW",
    postalCode: "2000",
    country: Country.Australia,
  },
  "AU-to": {
    company: "Company Inc",
    addressLines: ["39 Melbourne St"],
    cityLocality: "South Brisbane",
    stateProvince: "QLD",
    postalCode: "4101",
    country: Country.Australia,
  },
  "NZ-from": {
    company: "NZ International",
    addressLines: ["233-237 Lambton Quay"],
    cityLocality: "Wellington",
    stateProvince: "Wellington",
    postalCode: "6011",
    country: Country.NewZealand,
  },
  "NZ-to": {
    company: "Company Inc",
    addressLines: ["107 Fitzgerald Avenue", "Christchurch Central City"],
    cityLocality: "Christchurch",
    stateProvince: "Christchurch",
    postalCode: "8011",
    country: Country.NewZealand,
  },
  "BR-from": {
    company: "BR International",
    addressLines: ["Av. Pavão, 667", "Indianópolis"],
    cityLocality: "São Paulo",
    stateProvince: "SP",
    postalCode: "04516-012",
    country: Country.Brazil,
  },
  "BR-to": {
    company: "Company Inc",
    addressLines: ["Shopping Plaza", "Rua Quinze de Novembro", "8 - Centro"],
    cityLocality: "Niterói",
    stateProvince: "RJ",
    postalCode: "24020-125",
    country: Country.Brazil,
  }
};