import { company as sharedCompany } from '../site.mjs';

const company = {
  ...sharedCompany,
  description: 'Wir erforschen kognitive Architekturen und entwickeln intelligente Technologien für konkrete Aufgaben.',
};

const research = {
  name: 'Stalyra – Kognitive Architektur',
  english: 'Stalyra Cognitive Architecture',
  description: 'Ein Architekturkonzept, das Repräsentation, Vorhersage, Ziele und Planung koordiniert und Einschätzungen anhand neuer Informationen aktualisiert.',
  overview: 'Stalyra untersucht das Zusammenspiel von Informationsverarbeitung, Vorhersage, Zielen und Planung. Im Architekturkonzept dienen Handlungsergebnisse und neue Informationen dazu, bestehende Einschätzungen zu aktualisieren und die weitere Verarbeitung zu unterstützen.',
  definition: 'Stalyra ist eine rekursive kognitive Architektur, die auf der Aktualisierung eines gemeinsamen Überzeugungszustands beruht. Der übergeordnete Knoten speichert diesen Zustand und koordiniert vier Arten von Prozessen: Repräsentation, Vorhersage, Ziele und Planung. Handlungsergebnisse und neue Beobachtungen aktualisieren die gemeinsame Posterior-Verteilung. Diese wird in den übergeordneten Knoten zurückgeschrieben und bildet die Grundlage für den nächsten Berechnungsdurchlauf.',
};

const product = {
  name: 'LIE｜Lern-Engine',
  english: 'Learning Intelligence Engine',
  description: 'Eine Lern-Engine für Aufgabenanalyse, die Prüfung von Lösungswegen, Lernempfehlungen und die Aktualisierung des Lernstands.',
  introduction: 'Aufgaben, Materialien und Lösungswege werden analysiert, um nächste Lernschritte vorzubereiten.',
};

const contact = {
  description: 'Kontaktieren Sie uns für einen technischen Austausch, Fragen zur Produktanwendung oder eine Zusammenarbeit.',
};

const pages = [
  { key: 'home', file: 'index.html', label: 'Startseite', title: 'Allgemeine Intelligenz erforschen', description: company.description },
  { key: 'research', file: 'research.html', label: 'Forschung', title: research.name, description: research.description },
  { key: 'product', file: 'product.html', label: 'Produkt', title: product.name, description: product.description },
  { key: 'about', file: 'about.html', label: 'Über uns', title: 'Über uns', description: company.description },
  { key: 'contact', file: 'contact.html', label: 'Kontakt', title: 'Kontakt aufnehmen', description: contact.description },
];

export default {
  id: 'de', lang: 'de', label: 'Deutsch', directory: 'de',
  company, research, product, contact, pages,
  ui: {
    skip: 'Zum Hauptinhalt', mainNav: 'Hauptnavigation', footerNav: 'Navigation im Footer', languageNav: 'Sprache',
    homeLabel: 'Startseite', researchLabel: 'Forschung', productLabel: 'Produkt',
    exploreResearch: 'Forschung entdecken', viewProducts: 'Produkt ansehen', contactLink: 'Kontakt',
    researchContact: 'Forschungsaustausch', productContact: 'Produktanfrage',
    invitation: 'Kontakt aufnehmen', contactEyebrow: 'KONTAKT',
    heroTitle: ['Allgemeine', 'Intelligenz erforschen'], mission: 'Allgemeine Intelligenz erforschen',
    signature: 'Kognitive Architekturen / Intelligente Technologien',
    scope: 'Kognitive Architekturen und intelligente Technologien',
    footerScope: ['Kognitive Architekturen', 'Intelligente Technologien'],
    learnMore: 'Mehr erfahren', artCaption: 'Struktur · Verbindung · Rückkopplung',
    architectureName: 'Kognitive Architektur', learnStalyra: 'Stalyra entdecken',
    learningEngine: 'Lern-Engine', productTeaser: 'Informationen zu Funktionsumfang, Ein- und Ausgaben sowie Integrationsbedingungen.',
    learnLie: 'Mehr über LIE', dataApplications: 'Aufgaben, Analyse und Handlung verbinden',
    conceptDiagram: 'Architekturkonzept',
    architectureAria: 'Der übergeordnete Knoten speichert den gemeinsamen Überzeugungszustand und koordiniert Repräsentation, Vorhersage, Ziele und Planung. Handlungsergebnisse und neue Beobachtungen aktualisieren die gemeinsame Posterior-Verteilung, die in den übergeordneten Knoten zurückgeschrieben wird. Die Darstellung legt keine feste Ausführungsreihenfolge der vier Prozesse fest.',
    parentNode: 'Übergeordneter Knoten', jointBelief: 'Gemeinsamer Überzeugungszustand', processes: ['Repräsentation', 'Vorhersage', 'Ziele', 'Planung'],
    actionResults: 'Handlungsergebnisse', and: 'und', observations: 'Neue Beobachtungen', jointPosterior: 'Gemeinsame Posterior-Verteilung',
    update: 'Aktualisierung', writeBack: 'Rückschreiben in den übergeordneten Knoten',
    architectureCaption: 'Der gemeinsame Überzeugungszustand koordiniert die vier Prozesse. Die aktualisierte Posterior-Verteilung wird zurückgeschrieben und bildet die Grundlage für den nächsten Berechnungsdurchlauf.',
    overviewLabels: ['Information', 'Ziele', 'Handlung'], overviewCaption: 'Information, Ziele und Handlung im Zusammenspiel',
    integrationDiagram: 'Integrationsübersicht', input: 'Eingabe', output: 'Ausgabe',
    learningData: 'Aufgaben, Materialien und Antworten', structuredResults: 'Analyse, Lernvorschläge und Lernstand',
    integrationCaption: 'Aufgabenanalyse, Prüfung von Lösungswegen, Lernmaßnahmen und Lernstand werden miteinander verbunden.',
    researchEyebrow: 'FORSCHUNG / STALYRA', designLabel: 'Architekturansatz',
    designTitle: 'Information, Ziele und Handlung verbinden', architectureDetails: 'Architektur im Detail',
    architectureNote: 'Das Diagramm veranschaulicht die Beziehungen zwischen den Komponenten und legt keine Ausführungsreihenfolge fest.',
    productEyebrow: 'PRODUKT / LIE', integrationContact: 'Integration anfragen',
    applicationsLabel: 'Produktanwendung', applicationsTitle: 'Beratung zur Produktanwendung',
    applicationsDescription: 'Datenanforderungen, Integrationsbedingungen und Validierungsziele werden anhand Ihrer Anforderungen geklärt.',
    discussions: [
      { title: 'Anforderungen', description: 'Geschäftsabläufe, Einsatzbereiche und die zu lösenden Aufgaben gemeinsam klären.' },
      { title: 'Ein- und Ausgaben', description: 'Format und Inhalt der Eingabedaten sowie die erwarteten Ausgaben festlegen.' },
      { title: 'Integration und Validierung', description: 'Integrationsumgebung, Einsatzgrenzen und Bedingungen für die Validierung prüfen.' },
    ],
    aboutEyebrow: 'ÜBER UNS / KIZHARYN TECHNOLOGIES', aboutTitle: ['Über', 'Kizharyn Technologies'],
    directionLabel: 'Unsere Ausrichtung', directionDescription: ['Wir erforschen kognitive Architekturen', 'und entwickeln intelligente Technologien für konkrete Aufgaben.'],
    contactTitle: ['Kontakt', 'aufnehmen'], contactMethods: 'Kontaktdaten', cooperation: 'Zusammenarbeit',
    emailDescription: 'Sie erreichen uns unter den folgenden E-Mail-Adressen.',
  },
  form: {
    title: 'Kontaktinformationen', description: 'Aus Ihren Angaben wird ein E-Mail-Entwurf erstellt. Prüfen und versenden Sie ihn anschließend in Ihrem E-Mail-Programm.',
    email: 'E-Mail-Adresse', intent: 'Anliegen', name: 'Name', organization: 'Organisation', message: 'Ihre Nachricht',
    required: 'Pflichtfeld', requiredChoice: 'Auswahl erforderlich', optional: 'Optional',
    research: 'Forschungsaustausch', product: 'Produktanfrage',
    placeholder: 'Beschreiben Sie kurz Ihre technische Frage, den geplanten Einsatz oder Ihr Anliegen zur Zusammenarbeit.',
    notice: 'Bitte übermitteln Sie bei der ersten Kontaktaufnahme keine vertraulichen Geschäftsdaten oder unveröffentlichten technischen Unterlagen.',
    submit: 'E-Mail-Entwurf erstellen', openMail: 'E-Mail-Programm öffnen', copyMail: 'E-Mail-Inhalt kopieren',
    mailHelp: 'Prüfen und versenden Sie die Nachricht in Ihrem E-Mail-Programm. Falls es sich nicht öffnen lässt, kopieren Sie den Inhalt und senden Sie ihn an eine der oben genannten Adressen.',
    noScript: 'Bitte kontaktieren Sie uns direkt über eine der angegebenen E-Mail-Adressen.',
    privacyTitle: 'Hinweise zu Ihren Kontaktangaben',
    privacyDescription: 'Ihre Angaben werden ausschließlich zur Erstellung des E-Mail-Entwurfs verwendet. Diese Seite versendet oder speichert sie nicht automatisch. Prüfen Sie den Inhalt vor dem Versand in Ihrem E-Mail-Programm und geben Sie nur Informationen an, die für Ihr Anliegen erforderlich sind.',
    changed: 'Ihre Angaben wurden geändert. Bitte erstellen Sie den E-Mail-Entwurf erneut.',
    messageRequired: 'Bitte beschreiben Sie kurz Ihr Anliegen.', emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse an.',
    ready: 'Der E-Mail-Entwurf ist bereit. Bitte prüfen und versenden Sie ihn in Ihrem E-Mail-Programm.',
    copied: 'Der E-Mail-Inhalt wurde kopiert. Fügen Sie ihn zum Versand in Ihr E-Mail-Programm ein.',
    copyFailed: 'Der Inhalt konnte nicht kopiert werden. Bitte kontaktieren Sie uns direkt über eine der angegebenen E-Mail-Adressen.',
    recipient: 'Empfänger', subject: 'Betreff', separator: ': ',
  },
};
