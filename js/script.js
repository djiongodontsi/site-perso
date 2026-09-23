document.addEventListener('DOMContentLoaded', () => {
  const translations = {
    fr: {
      'nav.about': 'À propos', 'nav.projects': 'Projets', 'nav.skills': 'Compétences', 'nav.contact': 'Contact', 'nav.cv': 'CV <span>↗</span>',
      'hero.availability': 'Disponible pour une opportunité', 'hero.lead': "Je suis Dany Djiongo, étudiant en Bachelor 2 à EPSI Paris. Je transforme des idées techniques en expériences concrètes, de la cybersécurité au prototypage augmenté par l'IA.", 'hero.projects': 'Découvrir mes projets <span>→</span>', 'hero.talk': 'Parlons de votre projet', 'hero.note': 'Curiosité technique<br>et sens du détail', 'hero.scroll': 'explorer',
      'about.label': 'PROFIL', 'about.title': 'Qui suis-je ?', 'about.intro': 'Actuellement en Bachelor 2 Informatique à EPSI Paris, je développe une approche polyvalente mêlant programmation, systèmes, réseaux et cybersécurité.', 'about.body': "J'aime comprendre ce qui se passe derrière une interface : comment un équipement communique, comment une donnée circule et comment une expérience peut devenir plus intelligente. Mes projets me servent de terrain d'expérimentation, avec une préférence pour les défis concrets et le travail en équipe.", 'about.year': 'Bachelor 2', 'about.focus': 'Domaines', 'about.focusValue': 'Cyber · Dev · Réseau', 'about.mindset': 'Mindset', 'about.mindsetValue': 'Apprendre, tester, améliorer',
      'projects.label': 'PROJETS SÉLECTIONNÉS', 'projects.title': 'Du prototype au système.', 'projects.intro': "Des projets où l'on voit à la fois la technique, l'intention et le chemin parcouru.", 'projects.all': 'Tous', 'projects.cyber': 'Cybersécurité', 'projects.build': 'Build & code',
      'workshop.title': 'Rick Virtual World', 'workshop.summary': "Un portail inter-dimensionnel qui transforme une question vocale en voyage vers un monde réel ou virtuel. En cinq jours de Scrum, l'équipe a relié électronique, IA et expérience immersive dans un prototype spectaculaire.", 'workshop.details': 'Voir le parcours →',
      'card.stockme': "Infrastructure virtualisée, segmentation réseau, pare-feu et services d'entreprise.", 'card.vault': 'Coffre-fort CLI Java sécurisé, chiffrement AES-256-GCM et dérivation PBKDF2.', 'card.studyhub': "Une plateforme d'apprentissage pensée pour organiser ressources, échanges et progression.", 'card.view': 'Voir le projet →',
      'skills.label': 'BOÎTE À OUTILS', 'skills.title': "Ce que j'aime<br><em>mettre en mouvement.</em>", 'skills.security': 'Cybersécurité', 'skills.code': 'Programmation', 'skills.systems': 'Systèmes & réseaux', 'skills.method': 'Méthodes',
      'contact.label': 'CONTACT', 'contact.title': 'Un sujet à explorer ?', 'contact.intro': "Je suis ouvert aux échanges autour d'un stage, d'une alternance ou d'un projet technique. Écrivez-moi, je vous répondrai rapidement.", 'contact.name': 'Votre nom', 'contact.namePlaceholder': 'Prénom et nom', 'contact.email': 'Votre email', 'contact.message': 'Votre message', 'contact.messagePlaceholder': 'Parlez-moi de votre projet...', 'contact.send': "Préparer l’email <span>↗</span>",
      'footer.text': 'Bachelor 2 · Développeur web/mobile et cybersécurité', 'modal.title': 'Une interface entre deux mondes', 'modal.body': "Le parcours commence par un badge RFID, continue avec une question vocale et se termine par une décision IA. L'ESP32 pilote l'interaction, Groq Whisper transcrit la voix, le LLM détermine le monde choisi et Delightex rend l'expérience visible.", 'modal.step1': 'Scan du badge et authentification', 'modal.step2': 'Question vocale et transcription', 'modal.step3': 'Décision IA puis animation du portail', 'modal.spec': 'Cahier des charges ↓', 'modal.deck': 'Présentation ↓', 'modal.certificate': 'Certification ↓'
    },
    en: {
      'nav.about': 'About', 'nav.projects': 'Projects', 'nav.skills': 'Skills', 'nav.contact': 'Contact', 'nav.cv': 'Resume <span>↗</span>',
      'hero.availability': 'Available for an opportunity', 'hero.lead': "I'm Dany Djiongo, a Bachelor 2 student at EPSI Paris. I turn technical ideas into tangible experiences, from cybersecurity to AI-enhanced prototyping.", 'hero.projects': 'Explore my projects <span>→</span>', 'hero.talk': "Let's talk about your project", 'hero.note': 'Technical curiosity<br>and attention to detail', 'hero.scroll': 'explore',
      'about.label': 'PROFILE', 'about.title': 'Who am I?', 'about.intro': 'Currently studying for a Bachelor 2 in Computer Science at EPSI Paris, I build a versatile approach across programming, systems, networking and cybersecurity.', 'about.body': "I like understanding what happens behind an interface: how devices communicate, how data moves and how an experience can become smarter. My projects are a place to experiment, with a preference for concrete challenges and teamwork.", 'about.year': 'Bachelor 2', 'about.focus': 'Focus', 'about.focusValue': 'Cyber · Dev · Network', 'about.mindset': 'Mindset', 'about.mindsetValue': 'Learn, test, improve',
      'projects.label': 'SELECTED PROJECTS', 'projects.title': 'From prototype to system.', 'projects.intro': 'Projects where the technical choices, intention and journey are all visible.', 'projects.all': 'All', 'projects.cyber': 'Cybersecurity', 'projects.build': 'Build & code',
      'workshop.title': 'Rick Virtual World', 'workshop.summary': 'An inter-dimensional portal that turns a voice question into a journey toward a real or virtual world. In five days of Scrum, the team connected electronics, AI and immersive experience in a spectacular prototype.', 'workshop.details': 'See the journey →',
      'card.stockme': 'Virtualized infrastructure, network segmentation, firewall and enterprise services.', 'card.vault': 'Secure Java CLI vault using AES-256-GCM encryption and PBKDF2 derivation.', 'card.studyhub': 'A learning platform designed to organize resources, conversations and progress.', 'card.view': 'View project →',
      'skills.label': 'TOOLBOX', 'skills.title': 'What I like<br><em>to set in motion.</em>', 'skills.security': 'Cybersecurity', 'skills.code': 'Programming', 'skills.systems': 'Systems & networking', 'skills.method': 'Methods',
      'contact.label': 'CONTACT', 'contact.title': 'Something to explore?', 'contact.intro': 'I am open to conversations about an internship, work-study position or technical project. Send me a message and I will get back to you shortly.', 'contact.name': 'Your name', 'contact.namePlaceholder': 'First and last name', 'contact.email': 'Your email', 'contact.message': 'Your message', 'contact.messagePlaceholder': 'Tell me about your project...', 'contact.send': 'Prepare email <span>↗</span>',
      'footer.text': 'Bachelor 2 · Web/mobile developer and cybersecurity', 'modal.title': 'An interface between two worlds', 'modal.body': 'The journey starts with an RFID badge, continues with a voice question and ends with an AI decision. The ESP32 drives the interaction, Groq Whisper transcribes the voice, the LLM chooses the world and Delightex renders the experience.', 'modal.step1': 'Badge scan and authentication', 'modal.step2': 'Voice question and transcription', 'modal.step3': 'AI decision then portal animation', 'modal.spec': 'Specifications ↓', 'modal.deck': 'Presentation ↓', 'modal.certificate': 'Certificate ↓'
    }
  };

  const applyLanguage = (language) => {
    const selectedLanguage = translations[language] ? language : 'fr';
    const dictionary = translations[selectedLanguage];
    document.documentElement.lang = selectedLanguage;
    document.title = selectedLanguage === 'fr' ? 'Dany Djiongo | Portfolio cybersécurité' : 'Dany Djiongo | Cybersecurity portfolio';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', selectedLanguage === 'fr' ? 'Portfolio de Dany Djiongo, étudiant en Bachelor 2 à EPSI Paris, orienté cybersécurité.' : 'Dany Djiongo portfolio, Bachelor 2 student at EPSI Paris focused on cybersecurity.');
    const staticTexts = {
      '.hero h1': { fr: 'Construire des systèmes qui <em>réagissent.</em>', en: 'Building systems that <em>respond.</em>' },
      '.hero-meta span:nth-child(1)': { fr: 'B02 · EPSI Paris', en: 'B02 · EPSI Paris' },
      '.hero-meta span:nth-child(2)': { fr: 'Paris & Île-de-France', en: 'Paris & Île-de-France' },
      '.year-2025 h2': { fr: 'Projets 2025.', en: '2025 projects.' },
      '.year-2025 .section-heading>p': { fr: 'Les premiers projets qui ont construit mon parcours entre création, code et travail en équipe.', en: 'The first projects that shaped my path through creativity, code and teamwork.' },
      '.year-2025 .project-card:first-child p': { fr: 'Machine de Rube Goldberg conçue en équipe : mécanique, prototypage, présentation devant jury et première place locale.', en: 'A team-built Rube Goldberg machine combining mechanics, prototyping, jury presentation and a local first-place finish.' },
      '.year-2025 .project-card:nth-child(2) p': { fr: 'Maquette de plateforme étudiante pour centraliser les ressources, les échanges et le profil utilisateur.', en: 'A student platform prototype designed to centralize resources, discussions and user profiles.' },
      '#tous-les-projets h2': { fr: 'Tous les projets.', en: 'All projects.' },
      '#tous-les-projets .section-heading>p': { fr: 'Chaque fiche détaille le contexte, les étapes, les choix techniques et les ressources du projet.', en: 'Each project page explains the context, process, technical choices and project resources.' }
    };
    Object.entries(staticTexts).forEach(([selector, values]) => { const element = document.querySelector(selector); if (element) element.innerHTML = values[selectedLanguage]; });
    document.querySelectorAll('[data-i18n]').forEach((element) => { if (dictionary[element.dataset.i18n] !== undefined) element.innerHTML = dictionary[element.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = dictionary[element.dataset.i18nPlaceholder] || element.placeholder; });
    document.querySelectorAll('.language-button').forEach((button) => { const active = button.dataset.lang === selectedLanguage; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    localStorage.setItem('portfolio-language', selectedLanguage);
  };

  document.querySelectorAll('.language-button').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  applyLanguage(localStorage.getItem('portfolio-language') || 'fr');

  const menu = document.querySelector('.main-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const contactCopy = document.querySelector('.contact-copy');
  if (contactCopy && !contactCopy.querySelector('.email-signature')) contactCopy.insertAdjacentHTML('beforeend', '<div class="email-signature"><img src="https://peelp.me/avatar-png/djiongodany" alt="Photo de Djiongo Dontsi Dany Brel"><div><strong>Djiongo Dontsi Dany Brel</strong><small>Développement web, ingénieur informatique</small><a href="mailto:djiongodontsi@gmail.com">djiongodontsi@gmail.com</a><a href="https://peelp.me/djiongodany">peelp.me/djiongodany</a></div></div>');
  menuToggle?.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => menu.classList.remove('open')));
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress span');
  window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 20); const maximum = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${maximum > 0 ? (window.scrollY / maximum) * 100 : 0}%`; }, { passive: true });
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  document.querySelectorAll('.project-card').forEach((card) => { if (card.querySelector('h3')?.textContent.trim().toLowerCase().includes('vault')) card.remove(); });
  document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active')); button.classList.add('active'); document.querySelectorAll('[data-category]').forEach((card) => card.classList.toggle('is-hidden', button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter)); }));
  const modal = document.querySelector('#workshop-modal');
  document.querySelectorAll('[data-modal]').forEach((trigger) => trigger.addEventListener('click', () => modal.showModal()));
  document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
  document.querySelector('#contact-form')?.addEventListener('submit', (event) => { event.preventDefault(); const values = new FormData(event.currentTarget); const subject = encodeURIComponent(`Portfolio - ${values.get('name')}`); const greeting = document.documentElement.lang === 'fr' ? 'Bonjour Dany' : 'Hello Dany'; const body = encodeURIComponent(`${greeting},\n\n${values.get('message')}\n\n${document.documentElement.lang === 'fr' ? 'Mon email' : 'My email'} : ${values.get('email')}`); window.location.href = `mailto:contact@portfolio.local?subject=${subject}&body=${body}`; document.querySelector('#form-status').textContent = document.documentElement.lang === 'fr' ? 'Votre client email va s’ouvrir.' : 'Your email client will open.'; });
});

