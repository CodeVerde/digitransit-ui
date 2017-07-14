import configMerger from '../util/configMerger';

const CONFIG = 'oulu20';
const APP_DESCRIPTION = 'Oulun seudun uusi reittiopas - Oulunliikenne.fi 2.0';
const APP_TITLE = 'Reittiopas - Oulunliikenne.fi 2.0';

const walttiConfig = require('./waltti').default;

export default configMerger(walttiConfig, {
  CONFIG,

  feedIds: ['OULU'],

  appBarLink: { name: 'Oulun joukkoliikenne', href: 'http://www.oulunjoukkoliikenne.fi' },

  sprites: 'svg-sprite.oulu20.svg',

  colors: {
    primary: '#c40065',
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    twitter: {
      site: '@oulunkaupunki',
    },
  },

  availableLanguages: ['fi', 'en'],
  defaultLanguage: 'fi',

  title: APP_TITLE,

  searchParams: {
    'boundary.rect.min_lat': 64.71,
    'boundary.rect.max_lat': 65.38,
    'boundary.rect.min_lon': 24.37,
    'boundary.rect.max_lon': 26.61,
  },

  areaPolygon: [[24.37, 64.71], [24.37, 65.38], [26.61, 65.38], [26.61, 64.71]],

  defaultEndpoint: {
    address: 'Keskusta',
    lat: 65.0118,
    lon: 25.4702,
  },

  defaultOrigins: [
    { icon: 'icon-icon_bus', label: 'Kauppatori, Oulu', lat: 65.013559, lon: 25.465032 },
    { icon: 'icon-icon_rail', label: 'Rautatieasema, Oulu', lat: 65.011523, lon: 25.483571 },
    { icon: 'icon-icon_airplane', label: 'Lentoasema, Oulu', lat: 64.928808, lon: 25.373296 },
  ],

  simpleTransportModes: {
    kaara: {
      availableForSelection: true,
      defaultValue: false,
    },

    kavely: {
      availableForSelection: true,
      defaultValue: true,
    },

    polkupyora: {
      availableForSelection: true,
      defaultValue: false,
    },

    bus: {
      availableForSelection: true,
      defaultValue: false,
    },

    rail: {
      availableForSelection: true,
      defaultValue: false,
    },
  },

  footer: {
    content: [
      { label: (function footerContent() { return `© Oulu ${(1900 + new Date().getYear())}`; }()) },
      {},
      { name: 'footer-feedback', nameEn: 'Submit feedback', href: 'http://www.oulunjoukkoliikenne.fi/palautteet', icon: 'icon-icon_speech-bubble' },
      { name: 'about-this-service', nameEn: 'About this service', route: '/tietoja-palvelusta', icon: 'icon-icon_info' },
    ],
  },

  aboutThisService: {
    fi: [
      {
        header: 'Tietoja palvelusta',
        paragraphs: ['Tämän palvelun tarjoaa Oulun joukkoliikenne joukkoliikenteen reittisuunnittelua varten Oulun, Iin, Kempeleen, Limingan, Lumijoen, Muhoksen ja Tyrnävän alueella. Palvelu kattaa joukkoliikenteen, kävelyn, pyöräilyn ja yksityisautoilun rajatuilta osin. Palvelu perustuu Digitransit palvelualustaan.'],
      },
    ],

    en: [
      {
        header: 'About this service',
        paragraphs: ['This service is provided by Oulun joukkoliikenne for route planning in Oulu, Ii, Kempele, Liminka, Lumijoki, Muhos and Tyrnävä region. The service covers public transport, walking, cycling, and some private car use. Service is built on Digitransit platform.'],
      },
    ],
  },

});
