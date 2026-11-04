"""Generate the ten standalone educational SVG/PNG slides and a LinkedIn PDF."""
from pathlib import Path
from html import escape as esc
from PIL import Image, ImageFont
import cairosvg, zipfile
OUT=Path('assets/carrousel-cyber-kill-chain');OUT.mkdir(parents=True,exist_ok=True)
FONT=OUT/'fonts/Montserrat.ttf'
N='#101d38'; C='#35d9ed'; B='#557bff'; V='#b8a1ff'; O='#ffa663'; M='#aabbcf'
parts=[]
def box(x,y,w,h,fill='#192b49',stroke='none',r=20):parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
def line(x,y,X,Y,color=C,width=4,dash=False):parts.append(f'<path d="M{x},{y} L{X},{Y}" fill="none" stroke="{color}" stroke-width="{width}" stroke-linecap="round"'+(' stroke-dasharray="9 8"' if dash else '')+'/>')
def circle(x,y,r,color):parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>')
def text(x,y,s,size=24,color='white',weight=500):parts.append(f'<text x="{x}" y="{y}" font-family="Montserrat" font-size="{size}" font-weight="{weight}" fill="{color}">{esc(s)}</text>')
def wrap(x,y,s,width,size=24,color='white',weight=500,leading=None):
 font=ImageFont.truetype(str(FONT),size);words=s.split();row='';rows=[]
 for word in words:
  trial=(row+' '+word).strip()
  if font.getlength(trial)>width and row:rows.append(row);row=word
  else:row=trial
 if row:rows.append(row)
 for i,row in enumerate(rows):text(x,y+i*(leading or size*1.4),row,size,color,weight)
 return len(rows)
def arrow(x,y,X,Y,color=C):
 line(x,y,X,Y,color,4);import math
 a=math.atan2(Y-y,X-x)
 for d in [-.55,.55]:line(X,Y,X-16*math.cos(a+d),Y-16*math.sin(a+d),color,4)
def icon(kind,x,y,color=C,scale=1):
 parts.append(f'<g transform="translate({x},{y}) scale({scale})" fill="none" stroke="{color}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">')
 shapes={'eye':'<path d="M1 16Q16 -3 31 16Q16 35 1 16Z"/><circle cx="16" cy="16" r="5"/>','shield':'<path d="M16 2L29 7V17Q27 27 16 32Q5 27 3 17V7Z"/><path d="M9 16l5 5 10-12"/>','file':'<path d="M6 2h14l7 7v22H6Z"/><path d="M20 2v8h7M11 17h11M11 23h9"/>','flag':'<path d="M6 31V2M6 3h21l-5 7 5 7H6"/>','mail':'<rect x="1" y="5" width="30" height="23" rx="3"/><path d="m2 7 14 11L30 7"/>','alert':'<path d="M16 2 32 30H0Z"/><path d="M16 12v8M16 25v1"/>','lock':'<rect x="4" y="14" width="24" height="17" rx="3"/><path d="M9 14V9a7 7 0 0 1 14 0v5M16 21v4"/>','network':'<rect x="10" y="1" width="12" height="9" rx="2"/><path d="M16 10v8M4 18h24M4 18v5M28 18v5"/><rect x="0" y="23" width="9" height="8" rx="1"/><rect x="23" y="23" width="9" height="8" rx="1"/>','search':'<circle cx="13" cy="13" r="10"/><path d="m21 21 10 10"/>','tool':'<path d="m3 29 17-17M20 12a9 9 0 0 1 8-10l-4 7 3 4 7-3a9 9 0 0 1-13 9"/>'}
 parts.append(shapes.get(kind,shapes['shield']));parts.append('</g>')
def screen(x,y,w=235,h=145,label='POSTE NOVATECH',alert=False):
 box(x+8,y+10,w,h,'#080f22','#2c476c',12);box(x,y,w,h,'#142744',O if alert else '#476491',12)
 box(x+12,y+12,w-24,h-39,'#203b5e',r=6);line(x+w/2,y+h,x+w/2,y+h+20,M);line(x+w*.3,y+h+22,x+w*.7,y+h+22,M)
 text(x+18,y+h-12,label,12,M,600)
def doc(x,y,label='FACTURE',bad=True):
 box(x+5,y+8,136,160,'#0b1429',r=12);box(x,y,136,160,'#e9f0ff',r=12);text(x+15,y+34,label,16,N,700)
 for i in range(3):line(x+18,y+58+i*17,x+110-i*8,y+58+i*17,'#9aa9c3',5)
 icon('alert' if bad else 'file',x+50,y+112,'#d76c33' if bad else B)
def server(x,y,label='DONNÉES'):
 box(x,y,140,174,'#20395b','#5879a7',12)
 for i in range(3):
  box(x+14,y+18+i*44,112,33,'#11223b',r=5);circle(x+29,y+34+i*44,4,C);line(x+46,y+34+i*44,x+106,y+34+i*44,'#5879a7',3)
 text(x+10,y+162,label,12,M,600)
def person(x,y):
 circle(x,y,23,'#e1a98d');parts.append(f'<path d="M{x-25} {y-6}q0-40 42-18l10 29-14-5-8-22-22 20Z" fill="#172036"/>');box(x-36,y+28,72,77,'#657def',r=25)
def label(x,y,s,color=C):
 text(x,y,s,18,color,600)
def scene(n):
 # All scenes use a shared environment, but distinct actions and arrangements.
 box(52,259,976,431,'url(#scene)','#304a70',24)
 if n==1:
  box(388,304,225,216,'#2d4673','#6a87bf',10)
  for a in range(4):
   for b in range(3):box(408+a*48,326+b*48,26,27,'#6dd8ec',r=3)
  text(418,503,'NovaTech',28,'white',700);server(740,342,'RÉSEAU INTERNE');arrow(621,420,720,420)
  circle(190,388,62,'#29324d');icon('eye',150,349,O,2.5);line(258,389,374,389,O,3,True);label(96,541,'UNE MENACE OBSERVE',O);label(402,557,'45 SALARIÉS · PME CONNECTÉE')
 elif n==2:
  screen(110,343,272,172,'SITE PUBLIC');text(137,383,'novatech.example',18,C,600)
  for i in range(3):box(138,402+i*23,190-i*30,8,'#577798',r=3)
  box(650,310,275,102,'#233b5c',r=15);icon('file',672,328,V);text(719,344,'PROFIL PUBLIC',17,V,700);text(719,376,'Responsable informatique',14,'white')
  box(650,445,275,100,'#233b5c',r=15);text(673,479,'CONTACTS · FOURNISSEURS',15,C,700);text(673,512,'Informations accessibles',16,M)
  icon('search',440,359,O,3.4);arrow(391,417,435,417,O);arrow(565,407,630,364,O);arrow(565,445,630,493,O)
 elif n==3:
  screen(106,348,259,170,'PRÉPARATION EXTERNE');icon('tool',192,376,V,2)
  arrow(389,431,485,431,V);doc(517,330);icon('alert',724,378,O,2.4);arrow(673,430,710,430,O)
  label(109,555,'LE PIÈGE EST PRÉPARÉ HORS DE L’ENTREPRISE',V)
 elif n==4:
  doc(105,325);arrow(266,407,414,407,O);screen(455,322,342,220,'BOÎTE MAIL · NOVATECH');icon('mail',479,348,C)
  text(526,374,'Fournisseur inhabituel',19,'white',600);text(481,420,'FACTURE — URGENT',23,O,700);box(479,443,286,43,'#344767',r=8);text(494,470,'Pièce jointe inattendue',18,'white')
  person(916,362);text(824,528,'LÉA · COMPTABILITÉ',15,C,600)
 elif n==5:
  doc(110,322);arrow(273,409,432,409,O);screen(472,319,386,225,'LECTEUR NON MIS À JOUR',True);icon('file',506,352,C,1.9);icon('alert',683,366,O,2.3)
  line(644,342,619,388,O,6);line(619,388,653,418,O,6);line(653,418,624,477,O,6);label(133,555,'OUVERTURE → FAILLE → COMPROMISSION',O)
 elif n==6:
  screen(139,318,350,224,'POSTE DE LÉA',True);icon('alert',270,360,O,2.7);arrow(517,425,625,425,O)
  box(662,323,270,210,'#213650','#a397dc',18);text(687,360,'SYSTÈME',20,V,700)
  for i,s in enumerate(['Nouveau programme','Démarrage modifié','Accès conservé']):text(684,401+i*43,s,18,'white');circle(911,394+i*43,5,O)
  label(146,565,'UNE PRÉSENCE QUI PEUT SURVIVRE AU REDÉMARRAGE',O)
 elif n==7:
  screen(113,345,286,175,'POSTE COMPROMIS',True);icon('alert',222,376,O,1.8);server(784,329,'SERVEUR C2')
  arrow(431,390,750,390,O);arrow(750,468,431,468,V);label(473,369,'INSTRUCTIONS',O);label(486,510,'RÉPONSES',V)
  line(597,295,597,547,'#536688',2,True);text(506,580,'FRONTIÈRE RÉSEAU',16,M,600)
 elif n==8:
  server(128,335,'NOVATECH');arrow(294,364,477,364,O);doc(513,304,'DONNÉES',False);arrow(680,364,827,364,O);icon('network',869,333,O,2)
  screen(372,493,335,90,'FICHIERS CHIFFRÉS',True);icon('lock',385,505,O);text(439,534,'DEMANDE DE RANÇON',18,O,700)
  arrow(193,526,339,526,V);icon('lock',132,501,V);label(718,546,'VOL + CHIFFREMENT',O)
 elif n==9:
  names=['Reconnaissance','Armement','Livraison','Exploitation','Installation','C2','Objectifs'];icons=['search','tool','mail','alert','lock','network','flag']
  coords=[(91,295),(325,295),(559,295),(793,295),(793,462),(442,462),(91,462)]
  for i,((x,y),name,k) in enumerate(zip(coords,names,icons)):
   if i<6:
    X,Y=coords[i+1]
    if Y==y:arrow(x+190 if X>x else x,y+55,X-10 if X>x else X+196,Y+55,C)
    else:arrow(x+96,y+112,X+96,Y-8,C)
   box(x,y,190,112,'#243b60',r=16);icon(k,x+19,y+18,O if i==6 else C);text(x+66,y+43,f'0{i+1}',26,'white',700);text(x+13,y+88,name,15,'white',600)
 elif n==10:
  # Distinct defensive scene: five protective layers surround a healthy company.
  box(406,353,250,168,'#294c70','#57d6df',16);text(447,419,'NovaTech',30,'white',700);text(445,458,'45 personnes',20,M)
  positions=[(133,329,'tool','MISES À JOUR'),(799,329,'lock','MFA'),(117,497,'eye','VIGILANCE'),(805,497,'file','SAUVEGARDES'),(484,281,'shield','RÉPONSE')]
  for x,y,k,t in positions:icon(k,x,y,C,1.6);text(x-20,y+80,t,14,C,700)
  line(228,393,387,418,C,3,True);line(678,418,776,393,C,3,True)
slides=[
('Introduction','Une cyberattaque ne\ncommence pas en un clic.','Observer. Piéger. Compromettre. Agir.',[
'La Cyber Kill Chain, modèle de Lockheed Martin, décrit sept phases pour repérer où interrompre une attaque.',
'NovaTech, PME fictive de 45 salariés, est ciblée pour voler ses données, chiffrer ses fichiers et exiger une rançon.',
'Croiser les signaux des emails, des postes et du réseau. Une alerte isolée ne prouve pas une attaque.',
'Prévoir plusieurs barrières : prévention, détection et réponse. Bloquer une phase peut perturber la suite.']),
('01 / Reconnaissance','Reconnaissance','Les informations publiques dessinent la cible.',[
'Les attaquants étudient le site, les employés et les services exposés pour comprendre l’entreprise.',
'Ils identifient le responsable informatique et un fournisseur de NovaTech à partir de sources publiques.',
'Surveiller les scans et requêtes anormales sur les services exposés. La collecte passive reste souvent invisible.',
'Limiter les détails sensibles publiés. Inventorier les actifs exposés et surveiller les journaux des services.']),
('02 / Weaponization','Armement','Une fausse facture devient un piège.',[
'Les attaquants préparent un document malveillant et le prétexte qui doit convaincre la future victime.',
'Une fausse facture fournisseur est conçue pour viser le lecteur de documents non mis à jour de NovaTech.',
'Cette préparation externe est rarement visible. À réception, analyse antivirus et sandbox peuvent alerter.',
'Filtrer les formats à risque, analyser les pièces jointes en environnement isolé et protéger les postes.']),
('03 / Delivery','Livraison','Le piège arrive dans la boîte mail de Léa.',[
'Le document est transmis à la victime : ici, par email. La livraison ne signifie pas encore compromission.',
'Léa, à la comptabilité de NovaTech, reçoit une facture inattendue au nom d’un fournisseur connu.',
'Repérer un domaine inhabituel, une urgence artificielle, une pièce jointe imprévue ou un ton incohérent.',
'Utiliser un filtre anti-phishing. Former au signalement et vérifier les demandes par un canal déjà connu.']),
('04 / Exploitation','Exploitation','L’ouverture expose une faille non corrigée.',[
'Une vulnérabilité est exploitée ou une action risquée permet l’exécution. Ouvrir un fichier ne suffit pas toujours.',
'Léa ouvre le document avec un lecteur vulnérable. Dans ce scénario, la faille permet de compromettre son poste.',
'Repérer un lecteur qui lance un processus inattendu, une activité anormale ou une alerte EDR sur le poste.',
'Installer les correctifs, désactiver les fonctions inutiles et appliquer le moindre privilège aux comptes.']),
('05 / Installation','Installation','Le programme cherche à conserver son accès.',[
'Un logiciel malveillant est installé. Il peut créer une persistance pour rester présent après un redémarrage.',
'Sur le poste de Léa, un programme inconnu apparaît et modifie un mécanisme de démarrage automatique.',
'Détecter les logiciels nouveaux, les changements de démarrage et les modifications système inhabituelles.',
'Activer antivirus et EDR, contrôler les applications autorisées et isoler rapidement un poste compromis.']),
('06 / Command & Control','Commande et contrôle','Le poste compromis échange avec un serveur C2.',[
'Le programme contacte une infrastructure distante pour recevoir des instructions et renvoyer des informations.',
'Le poste de Léa communique régulièrement avec un serveur externe contrôlé par le groupe criminel.',
'Chercher des connexions sortantes rares ou répétitives, des domaines inconnus et des alertes réseau corrélées.',
'Filtrer les sorties au pare-feu. Croiser journaux DNS, EDR et NDR pour détecter puis bloquer les échanges.']),
('07 / Actions on Objectives','Actions sur les objectifs','Vol de données + chiffrement = double extorsion.',[
'Les criminels exfiltrent des données, chiffrent des fichiers et menacent de publier les informations volées.',
'Des documents confidentiels quittent NovaTech. Des fichiers deviennent illisibles et une rançon est réclamée.',
'Alerter sur les volumes sortants anormaux, les accès inhabituels et les modifications massives de fichiers.',
'Isoler les systèmes touchés. Activer le plan de réponse, limiter les accès et restaurer des sauvegardes isolées.']),
('Synthèse visuelle','7 étapes.\nUne seule cyberattaque.','À chaque étape, une occasion de rompre la chaîne.',[
'Le parcours est un modèle de lecture : certaines attaques sautent, répètent ou combinent des phases.',
'Chez NovaTech : repérage → fausse facture → email → faille → persistance → C2 → vol et chiffrement.',
'Relier les traces dans le temps. Un email suspect suivi d’une alerte poste et réseau forme un signal plus fort.',
'Cumuler les protections. Le MFA aide contre l’abus de comptes, mais ne bloque pas toutes les formes d’attaque.']),
('Conclusion','La cybersécurité est\nl’affaire de tous.','Merci ! Partagez ce carrousel pour diffuser les bons réflexes.',[
'1. Mettre à jour les systèmes. 2. Sécuriser les accès avec une authentification multifacteur (MFA).',
'3. Sensibiliser les collaborateurs. Chez NovaTech, Léa vérifie et signale une facture inattendue.',
'5. Surveiller et réagir aux incidents : traiter les alertes, savoir qui contacter et exercer le plan de réponse.',
'4. Sauvegarder les données : copies isolées ou immuables, restaurations testées et accès protégés.'])]
notes=[
'Un modèle utile pour agir ; toutes les attaques ne suivent pas un parcours linéaire.',
'Reconnaissance passive : consulter des sources publiques sans interagir avec la cible.',
'Sandbox : environnement isolé utilisé pour analyser un fichier suspect.',
'Bon réflexe : ne pas répondre à l’email suspect pour en vérifier l’origine.',
'EDR : outil de détection et de réponse sur les postes et serveurs.',
'Persistance : mécanisme permettant de maintenir un accès dans le temps.',
'NDR : détection et réponse réseau. C2 : commande et contrôle.',
'Une sauvegarde restaure les données ; elle n’annule pas leur vol.',
'Modèle Cyber Kill Chain® : Lockheed Martin. Scénario entièrement fictif.',
'Prévenir · détecter · répondre · reprendre l’activité.']
slugs=['introduction','reconnaissance','armement','livraison','exploitation','installation','commande-controle','objectifs','synthese','conclusion']
for n,(eyebrow,title,caption,bodies) in enumerate(slides,1):
 parts=[]
 parts.append('''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0c162c"/><stop offset="1" stop-color="#152b48"/></linearGradient><linearGradient id="scene" x2="1" y2="1"><stop stop-color="#1a3052"/><stop offset="1" stop-color="#111e36"/></linearGradient></defs>''')
 box(0,0,1080,1350,'url(#bg)',r=0)
 # quiet editorial grid
 for x in range(52,1030,42):line(x,260,x,623,'#273c59',.55)
 text(52,51,'CYBER KILL CHAIN',16,C,700);text(740,51,'DANY DJIONGO  /  CYBER',13,M,600)
 line(52,72,1028,72,'#344962',1)
 text(52,105,eyebrow.upper(),16,V,700)
 for j,t in enumerate(title.split('\n')):text(52,166+j*55,t,45 if n!=8 else 43,'white',700)
 if '\n' not in title:text(54,213,'COMPRENDRE LES 7 ÉTAPES D’UNE CYBERATTAQUE',15,M,500)
 scene(n)
 wrap(64,664,caption,952,23,C if n not in [5,8] else O,600,31)
 labels=['MISE EN SITUATION','EXEMPLE CONCRET','COMMENT DÉTECTER ?','COMMENT SE DÉFENDRE ?'];icons=['flag','file','eye','shield'];colors=[B,V,O,C]
 for i,(label_,body,k,col) in enumerate(zip(labels,bodies,icons,colors)):
  x=52+(i%2)*496;y=719+(i//2)*247
  box(x+2,y+6,480,229,'#091326',r=18);box(x,y,480,229,'#f3f6fc',r=18)
  box(x,y+18,4,193,col,r=2);icon(k,x+22,y+21,'#2b4b78',.85);text(x+65,y+42,label_,16,'#28405f',700)
  rows=wrap(x+24,y+82,body,430,22,N,500,29)
  assert rows<=5,(n,i,rows)
 # glossary and progress
 wrap(54,1235,notes[n-1],970,15,M,500,21)
 for i in range(10):box(54+i*75,1298,63,4,C if i<n else '#344762',r=2)
 text(868,1307,f'{n:02d} / 10',19,'white',600)
 parts.append('</svg>');svg=''.join(parts)
 stem=f'{n:02d}-{slugs[n-1]}'
 (OUT/f'{stem}.svg').write_text(svg)
 cairosvg.svg2png(bytestring=svg.encode(),write_to=str(OUT/f'{stem}.png'),output_width=1080,output_height=1350)
 print('Export',stem)
imgs=[Image.open(p).convert('RGB') for p in sorted(OUT.glob('*.png'))]
imgs[0].save(OUT/'cyber-kill-chain-linkedin.pdf',save_all=True,append_images=imgs[1:],resolution=144)
with zipfile.ZipFile(OUT/'cyber-kill-chain-10-slides.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(OUT.glob('*.png')):z.write(p,p.name)
readme='''# Cyber Kill Chain — Carrousel LinkedIn

Dix slides individuelles, 1080 × 1350 pixels, au format PNG. Importer le PDF sur LinkedIn pour publier un carrousel de documents, ou récupérer les PNG séparément. Le ZIP contient uniquement les dix PNG dans l’ordre.

Les SVG sont les sources vectorielles modifiables. Typographie : Montserrat (Google Fonts, SIL Open Font License). Illustrations originales composées en vectoriel, selon le choix explicite de l’utilisateur ; aucun générateur d’images n’a été utilisé.

Scénario fictif : NovaTech, 45 salariés. Modèle de référence : Cyber Kill Chain®, Lockheed Martin. https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html

Le modèle n’impose pas un parcours universel. La préparation externe et la reconnaissance passive ne sont pas toujours observables par la cible. Les indicateurs de détection nécessitent une analyse contextuelle. Sauvegarder ne supprime pas le risque de divulgation après exfiltration.

Reproduction des exports : installer pillow et cairosvg, rendre la police Montserrat disponible dans fontconfig, puis lancer `python scripts/create-cyber-carousel.py` depuis la racine du projet.
'''
(OUT/'README.md').write_text(readme)
