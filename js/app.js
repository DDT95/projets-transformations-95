const $ = (id) => document.getElementById(id);
const THEMES = {
  mobility: { label: "Mobilités & connexions", color: "#e24a62" },
  planning: { label: "Quartiers & aménagement", color: "#7452b8" },
  environment: { label: "Cadre de vie & résilience", color: "#178267" },
  economy: { label: "Économie & équipements", color: "#d28119" },
};
const STAGES = ["Études", "Concertation", "Travaux", "Livré", "Programmé"];
const STAGE_COLORS = { "Études": "#64748b", "Concertation": "#0891b2", "Travaux": "#e07a2f", "Livré": "#18753c", "Programmé": "#7b3997" };
const PROJECTS = [
  {id:"ligne-17-gonesse",name:"Ligne 17 et gare Gonesse",place:"Gonesse",lat:48.986,lng:2.449,theme:"mobility",stage:"Travaux",horizon:"2028",owner:"Société des grands projets",summary:"Une nouvelle gare du Grand Paris Express au cœur du Triangle de Gonesse, avec une liaison annoncée vers Saint-Denis–Pleyel et l’aéroport Charles-de-Gaulle.",source:"https://www.grandparisexpress.fr/ligne-17/gare-gonesse"},
  {id:"triangle-gonesse",name:"Aménagement du Triangle de Gonesse",place:"Gonesse",lat:48.997,lng:2.437,theme:"planning",stage:"Programmé",horizon:"À partir de 2028",owner:"Grand Paris Aménagement",summary:"Un projet d’aménagement articulé autour de la future gare, de programmes économiques, d’équipements, de services et d’espaces publics paysagers.",source:"https://www.val-doise.gouv.fr/index.php/contenu/telechargement/31448/231583/file/RAAE%20n%C2%B0157%20du%205%20novembre%202025.pdf"},
  {id:"bus-entre-seine",name:"Bus Entre Seine",place:"Argenteuil · Bezons · Cormeilles-en-Parisis",lat:48.95,lng:2.216,theme:"mobility",stage:"Travaux",horizon:"Calendrier du maître d’ouvrage",owner:"Île-de-France Mobilités",summary:"8,2 km de voies dédiées et de mesures d’accompagnement pour relier quatre pôles d’échanges et rendre les lignes de bus plus rapides et régulières.",source:"https://www.iledefrance-mobilites.fr/le-reseau/projets/bus-entre-seine/le-trace-bes"},
  {id:"avenue-parisis",name:"Avenue du Parisis",place:"Est du Val-d’Oise",lat:49.01,lng:2.33,theme:"mobility",stage:"Études",horizon:"Projet de long terme",owner:"Département du Val-d’Oise",summary:"Projet de liaison départementale et de transport collectif visant à améliorer les connexions est-ouest du territoire.",source:"https://www.val-doise.gouv.fr/Actions-de-l-Etat/Le-Plan-d-actions-pour-le-Val-d-Oise/Transport-Mobilites"},
  {id:"roissy-picardie",name:"Liaison ferroviaire Roissy–Picardie",place:"Survilliers · Fosses",lat:49.105,lng:2.56,theme:"mobility",stage:"Travaux",horizon:"Mise en service décembre 2028",owner:"SNCF Réseau",summary:"Création de 6,5 km de voie nouvelle entre le réseau picard et Roissy, complétée par l’adaptation des gares et installations existantes.",scale:"6,5 km de ligne nouvelle · vitesse cible 160 km/h",calendar:"Travaux engagés en 2024 ; voies, caténaires et équipements en 2026 ; mise en service annoncée en décembre 2028.",source:"https://www.sncf-reseau.com/fr/travaux/hauts-france/liaison-ferroviaire-roissy-picardie",kind:"rail"},
  {id:"pont-chaponval",name:"Renouvellement du pont-rail de Chaponval",place:"Auvers-sur-Oise · Saint-Ouen-l’Aumône",lat:49.064,lng:2.132,theme:"mobility",stage:"Travaux",horizon:"2025–2027",owner:"SNCF Réseau",summary:"Remplacement du tablier métallique franchissant l’Oise afin de pérenniser la ligne de Pontoise à Creil.",scale:"Ouvrage ferroviaire de 85 mètres",calendar:"Opération conduite entre 2025 et 2027, avec préparation, remplacement de l’ouvrage puis remise en état.",source:"https://www.sncf-reseau.com/fr/travaux/ile-de-france/projet-de-remplacement-du-tablier-du-pont-rail-de-chaponval",kind:"rail"},
  {id:"pn4-deuil",name:"Suppression du passage à niveau de Deuil–Montmagny",place:"Deuil-la-Barre · Montmagny",lat:48.976,lng:2.337,theme:"mobility",stage:"Travaux",horizon:"Suppression définitive en 2027",owner:"SNCF Réseau · collectivités partenaires",summary:"Création d’un franchissement dénivelé pour supprimer le passage à niveau n°4 et sécuriser les circulations ferroviaires, routières et piétonnes.",scale:"Pont-rail de 1 850 tonnes posé en 2025",calendar:"Pose de l’ouvrage en mai–juin 2025 ; aménagements routiers et suppression définitive annoncée en 2027.",source:"https://www.sncf-reseau.com/cp/ile-france/passage-niveau-deuil-montmagny-val-doise-une-premiere-etape-majeure-franchie-pour-supprimer-passage-niveau",kind:"rail"},
  {id:"cergy-grand-centre",name:"Cergy Grand Centre",place:"Cergy · Pontoise",lat:49.037,lng:2.079,theme:"planning",stage:"Travaux",horizon:"Transformation progressive",owner:"Cergy-Pontoise l’agglomération",summary:"Transformation du cœur d’agglomération autour de la gare, des espaces publics, du logement, des équipements et des mobilités.",source:"https://www.cergypontoise.fr/cergy-grand-centre"},
  {id:"porte-saint-germain",name:"Porte Saint-Germain · Berges de Seine",place:"Argenteuil",lat:48.945,lng:2.248,theme:"planning",stage:"Travaux",horizon:"Opération pluriannuelle",owner:"Boucle Nord de Seine · Ville d’Argenteuil",summary:"Renouvellement urbain d’un secteur d’entrée de ville et reconquête des berges, avec logements, activités, équipements et espaces publics.",source:"https://www.argenteuil.fr/fr/porte-saint-germain-berges-de-seine"},
  {id:"nouveau-lariboisiere",name:"Nouvel hôpital d’Argenteuil",place:"Argenteuil",lat:48.946,lng:2.232,theme:"economy",stage:"Programmé",horizon:"Projet hospitalier",owner:"Centre hospitalier Victor Dupouy",summary:"Modernisation du site hospitalier et recomposition de l’offre de soins au service du bassin de vie d’Argenteuil.",source:"https://www.ch-argenteuil.fr/"},
  {id:"ecoparc-val-d-oise",name:"Écoparc de la Vallée de l’Oise",place:"Saint-Ouen-l’Aumône",lat:49.066,lng:2.118,theme:"economy",stage:"Livré",horizon:"Développement en cours",owner:"Cergy-Pontoise l’agglomération",summary:"Parc d’activités consacré aux éco-activités, à l’innovation environnementale et à l’accueil d’entreprises sur la rive de l’Oise.",source:"https://www.cergypontoise.fr/"},
  {id:"foret-pierrelaye",name:"Forêt de Maubuisson",place:"Plaine de Pierrelaye-Bessancourt",lat:49.02,lng:2.16,theme:"environment",stage:"Travaux",horizon:"Plantations progressives",owner:"SMAPP",summary:"Création d’une forêt de plus de 1 300 hectares sur la plaine, avec plantations, continuités écologiques et cheminements ouverts au public.",source:"https://www.smapp-foret.fr/"},
  {id:"butte-pinsons",name:"Continuités paysagères de la Butte Pinson",place:"Montmagny · Groslay",lat:48.978,lng:2.349,theme:"environment",stage:"Travaux",horizon:"Aménagement progressif",owner:"Agence des espaces verts d’Île-de-France",summary:"Ouverture, restauration écologique et mise en réseau des espaces naturels régionaux de la Butte Pinson.",source:"https://www.aev-iledefrance.fr/"},
  {id:"vexin-voie-verte",name:"Continuités cyclables du Vexin",place:"Vexin français",lat:49.142,lng:1.82,theme:"environment",stage:"Programmé",horizon:"Déploiement progressif",owner:"Collectivités du Vexin",summary:"Aménagement progressif d’itinéraires cyclables et de liaisons douces entre bourgs, gares et paysages du Vexin.",source:"https://www.valdoise.fr/"},
];

const map = L.map("map", { zoomControl:false,preferCanvas:true }).setView([49.08,2.1],10);
L.control.zoom({position:"bottomright"}).addTo(map);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:"© OpenStreetMap · © CARTO"}).addTo(map);
const PERMIT_TYPES={housing:{label:"Permis créant des logements",color:"#0063cb"},business:{label:"Locaux & activités",color:"#a55800"},planning:{label:"Permis d’aménager",color:"#7b3997"}};
const state={themes:new Set(Object.keys(THEMES)),stages:new Set(STAGES),permitType:"housing",markers:new Map(),communes:null,communesVisible:true,communeFilter:null,sitadel:null};
const projectLayer=L.layerGroup().addTo(map);

function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
function markerIcon(theme){return L.divIcon({className:"",html:`<div class="project-marker ${theme}" style="width:22px;height:22px"></div>`,iconSize:[22,22],iconAnchor:[11,11]});}
function visibleProjects(){return PROJECTS.filter(p=>state.themes.has(p.theme)&&state.stages.has(p.stage)&&(!state.communeFilter||p.place.toLowerCase().includes(state.communeFilter.toLowerCase())));}
function renderProjects(fit=false){projectLayer.clearLayers();state.markers.clear();const visible=visibleProjects();visible.forEach(p=>{const marker=L.marker([p.lat,p.lng],{icon:markerIcon(p.theme)}).bindTooltip(`<strong>${esc(p.name)}</strong><br>${esc(p.place)}`,{direction:"top"}).on("click",()=>showProject(p)).addTo(projectLayer);state.markers.set(p.id,marker);});updateCounts();
  const filtered=visible.length<PROJECTS.length;
  $("mapStatus").textContent=state.communeFilter
    ? `Données et projets à ${state.communeFilter}`
    : filtered
      ? `${visible.length} projet(s) affiché(s) sur ${PROJECTS.length} · filtres actifs`
      : "Cliquez un projet ou un cercle Sitadel pour ouvrir sa fiche";if(fit&&visible.length){const bounds=L.latLngBounds(visible.map(p=>[p.lat,p.lng]));map.fitBounds(bounds,{padding:[55,55],maxZoom:11});}}
function showProject(p){const theme=THEMES[p.theme];$("detailContent").innerHTML=`<span class="detail-tag" style="color:${theme.color}">${esc(p.kind==="rail"?"PROJET FERROVIAIRE":theme.label.toUpperCase())}</span><h2>${esc(p.name)}</h2><div class="detail-location">${esc(p.place)}</div><span class="stage-badge" style="background:${STAGE_COLORS[p.stage]}1a;color:${STAGE_COLORS[p.stage]}">${esc(p.stage)} · ${esc(p.horizon)}</span><p>${esc(p.summary)}</p><h3>Repères du projet</h3><div class="detail-meta"><div><small>PORTEUR / RÉFÉRENT</small><strong>${esc(p.owner)}</strong></div><div><small>ÉTAPE AFFICHÉE</small><strong>${esc(p.stage)}</strong></div>${p.scale?`<div><small>ÉCHELLE / PROGRAMME</small><strong>${esc(p.scale)}</strong></div>`:""}${p.calendar?`<div><small>CALENDRIER</small><strong>${esc(p.calendar)}</strong></div>`:""}</div><p>Le repère localise le secteur principal et ne représente pas une emprise juridique ou foncière.</p><a class="profile-link" href="${esc(p.source)}" target="_blank" rel="noreferrer">Consulter la source officielle ↗</a>`;$("detailPanel").classList.add("open");map.panTo([p.lat,p.lng]);}

function buildFilters(){const themes=$("themeFilters");Object.entries(THEMES).forEach(([key,t])=>{const count=PROJECTS.filter(p=>p.theme===key).length;const row=document.createElement("label");row.className="layer-row";row.innerHTML=`<i class="layer-swatch ${key}"></i><span class="layer-label"><strong>${t.label}</strong><small>${count} projet(s) repéré(s)</small></span><input type="checkbox" checked>`;row.querySelector("input").onchange=e=>{e.target.checked?state.themes.add(key):state.themes.delete(key);renderProjects();};themes.appendChild(row);});const permits=$("permitFilters");Object.entries(PERMIT_TYPES).forEach(([key,t])=>{const row=document.createElement("label");row.className="layer-row";row.dataset.permit=key;row.innerHTML=`<i class="layer-swatch permit-${key}"></i><span class="layer-label"><strong>${t.label}</strong><small id="permit-${key}-count">chargement…</small></span><input type="radio" name="permitType" value="${key}" ${key==="housing"?"checked":""}>`;row.querySelector("input").onchange=e=>{state.permitType=e.target.checked?key:null;renderPermits();};permits.appendChild(row);});const stages=$("stageFilters");STAGES.forEach(stage=>{const color=STAGE_COLORS[stage];const count=PROJECTS.filter(p=>p.stage===stage).length;const b=document.createElement("button");b.className="stage-chip active";b.style.setProperty("--stage-color",color);b.innerHTML=`<i></i>${esc(stage)}<b>${count}</b>`;b.onclick=()=>{state.stages.has(stage)?state.stages.delete(stage):state.stages.add(stage);b.classList.toggle("active",state.stages.has(stage));renderProjects();};stages.appendChild(b);});}

function fmt(n){return new Intl.NumberFormat("fr-FR").format(n||0);}
function permitTotal(c,type){return type==="housing"?c.housingPermits:type==="business"?c.businessPermits:c.planningPermits;}
function updateCounts(){const permits=state.sitadel&&state.permitType?state.sitadel.communes.filter(c=>permitTotal(c,state.permitType)>0&&(!state.communeFilter||c.name===state.communeFilter)).length:0;$("visibleCount").textContent=visibleProjects().length+permits;}
function showCommuneData(c,type){const titles={housing:"Logements autorisés",business:"Locaux non résidentiels",planning:"Permis d’aménager"};$("detailContent").innerHTML=`<span class="detail-tag">SITADEL · AUTORISATIONS D’URBANISME</span><h2>${esc(c.name)}</h2><div class="detail-location">Données communales · 2022 à juin 2026</div><span class="stage-badge" style="background:${PERMIT_TYPES[type].color}22;color:${PERMIT_TYPES[type].color}">${esc(titles[type])}</span><div class="summary-kpis permit-kpis"><div class="kpi-housing"><strong>${fmt(c.housingPermits)}</strong><span>autorisations logements</span></div><div class="kpi-housing"><strong>${fmt(c.housingUnits)}</strong><span>logements créés déclarés</span></div><div class="kpi-housing"><strong>${fmt(c.housingSurface)} m²</strong><span>surface d’habitation créée</span></div><div class="kpi-business"><strong>${fmt(c.businessPermits)}</strong><span>autorisations de locaux</span></div><div class="kpi-business"><strong>${fmt(c.businessSurface)} m²</strong><span>surface de locaux créée</span></div><div class="kpi-planning"><strong>${fmt(c.planningPermits)}</strong><span>permis d’aménager</span></div></div><h3>Comment lire ces chiffres ?</h3><p>Il s’agit d’autorisations enregistrées dans Sitadel, agrégées à la commune. Une autorisation ne garantit pas le démarrage du chantier et peut évoluer ou être annulée.</p><a class="profile-link" href="https://www.statistiques.developpement-durable.gouv.fr/donnees-des-permis-de-construire-et-autres-autorisations-durbanisme" target="_blank" rel="noreferrer">Consulter la source SDES–Sitadel ↗</a>`;$("detailPanel").classList.add("open");map.panTo([c.lat,c.lng]);}
function renderPermits(){
  updateCounts();
  if(!state.communes||!state.sitadel)return;
  const byName=Object.fromEntries(state.sitadel.communes.map(c=>[c.name,c]));
  const type=state.permitType;
  const typeColor=type?PERMIT_TYPES[type].color:"#0063cb";
  const max=type?Math.max(...state.sitadel.communes.map(c=>permitTotal(c,type)),1):1;
  state.communes.eachLayer(layer=>{
    const name=layer.feature.properties.nom;
    const selected=name===state.communeFilter;
    const c=byName[name];
    const value=c&&type?permitTotal(c,type):0;
    const intensity=Math.min(1,value/max);
    layer.setStyle({
      color:selected?"#000091":"#8fa6c9",
      weight:selected?2.2:.6,
      fillColor:selected?"#000091":typeColor,
      fillOpacity:selected?.45:(value>0?.12+intensity*.58:.05),
    });
    const active=c&&type&&permitTotal(c,type)>0?[type]:[];
    const breakdown=active.length?active.map(type=>`${fmt(permitTotal(c,type))} ${PERMIT_TYPES[type].label.toLowerCase()}`).join("<br>"):"Aucune autorisation recensée depuis 2022";
    layer.bindTooltip(`<strong>${esc(name)}</strong><br>${breakdown}`,{sticky:true});
  });
}
async function loadSitadel(){try{state.sitadel=await fetch("data/sitadel-95.json").then(r=>r.json());const totals={housing:0,business:0,planning:0};state.sitadel.communes.forEach(c=>{totals.housing+=c.housingPermits;totals.business+=c.businessPermits;totals.planning+=c.planningPermits;});Object.keys(totals).forEach(k=>$("permit-"+k+"-count").textContent=`${fmt(totals[k])} autorisation(s)`);renderPermits();}catch{$("mapStatus").textContent="Données Sitadel momentanément indisponibles";}}
function search(){const q=$("searchInput").value.trim().toLowerCase();const results=$("searchResults");if(!q){results.hidden=true;return;}const matches=PROJECTS.filter(p=>`${p.name} ${p.place} ${THEMES[p.theme].label} ${p.stage}`.toLowerCase().includes(q));results.innerHTML=matches.length?matches.map(p=>`<button data-id="${p.id}"><b>${esc(p.name)}</b><small>${esc(p.place)} · ${esc(p.stage)}</small></button>`).join(""):`<button><b>Aucun projet trouvé</b><small>Essayez un lieu, un thème ou une étape.</small></button>`;results.hidden=false;results.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{const p=PROJECTS.find(x=>x.id===b.dataset.id);state.themes.add(p.theme);state.stages.add(p.stage);renderProjects();map.setView([p.lat,p.lng],12);showProject(p);results.hidden=true;});}
function resetApplicationState(){
  state.themes=new Set(Object.keys(THEMES));
  state.stages=new Set(STAGES);
  state.permitType="housing";
  state.communeFilter=null;
  state.communesVisible=true;
  $("searchInput").value="";
  $("searchResults").hidden=true;
  $("detailPanel").classList.remove("open");
  document.querySelectorAll("#themeFilters input").forEach(x=>x.checked=true);
  document.querySelectorAll("#permitFilters input").forEach(x=>x.checked=x.value==="housing");
  document.querySelectorAll(".stage-chip").forEach(x=>x.classList.add("active"));
  $("toggleCommunes").checked=true;
  if(state.communes){
    if(!map.hasLayer(state.communes))state.communes.addTo(map);
    state.communes.eachLayer(x=>x.setStyle({fillOpacity:.08,fillColor:"#e9eef3"}));
  }
  renderProjects();
  renderPermits();
  window.setTimeout(()=>{
    map.invalidateSize(false);
    if(state.communes)map.fitBounds(state.communes.getBounds(),{padding:[15,15],animate:false,maxZoom:12});
    else map.setView([49.08,2.1],10,{animate:false});
  },40);
}
async function loadCommunes(){
  try {
    const communes=await fetch("https://geo.api.gouv.fr/departements/95/communes?fields=nom,code,contour").then(r=>{if(!r.ok)throw new Error();return r.json()});
    const features=communes.filter(c=>c.contour).map(c=>({type:"Feature",properties:{nom:c.nom,code:c.code},geometry:c.contour}));
    state.communes=L.geoJSON({type:"FeatureCollection",features},{
      style:{color:"#8fa6c9",weight:.6,opacity:.6,fillColor:"#e9eef3",fillOpacity:.05},
      onEachFeature:(f,l)=>l.on("click",()=>{
        const communeName=f.properties.nom;
        state.communeFilter=state.communeFilter===communeName?null:communeName;
        renderProjects(true);
        renderPermits();
        const communeData=state.sitadel&&state.sitadel.communes.find(c=>c.name===communeName);
        if(communeData)showCommuneData(communeData,"housing");
      })
    }).addTo(map);
    map.invalidateSize(false);
    map.fitBounds(state.communes.getBounds(),{padding:[15,15],maxZoom:12});
    renderPermits();
  } catch {
    $("mapStatus").textContent="Fond communal momentanément indisponible · projets accessibles";
    renderProjects(true);
  }
}
function openSynthesis(){
  const counts=Object.keys(THEMES).map(k=>[k,PROJECTS.filter(p=>p.theme===k).length]);
  const cs=state.sitadel?.communes||[];
  const housing=cs.reduce((n,c)=>n+c.housingUnits,0),business=cs.reduce((n,c)=>n+c.businessSurface,0),planning=cs.reduce((n,c)=>n+c.planningPermits,0);
  const d=$("dashboardContent");
  d.innerHTML=`
    <div class="dialog-header"><span class="eyebrow">SYNTHÈSE DÉPARTEMENTALE</span><h2>Le territoire en transformation</h2><p>Grands projets documentés et dynamique récente des autorisations d’urbanisme.</p></div>
    <div class="dashboard-kpis">
      <article><small>GRANDS PROJETS</small><strong>${PROJECTS.length}</strong><span>repérés dans le Val-d’Oise</span></article>
      <article><small>PROJETS FERROVIAIRES</small><strong>${PROJECTS.filter(p=>p.kind==="rail").length}</strong><span>parmi les grands projets</span></article>
      <article><small>LOGEMENTS AUTORISÉS</small><strong>${fmt(housing)}</strong><span>déclarés depuis 2022 · Sitadel</span></article>
      <article><small>LOCAUX AUTORISÉS</small><strong>${fmt(business)} m²</strong><span>activités et équipements</span></article>
      <article><small>PERMIS D’AMÉNAGER</small><strong>${fmt(planning)}</strong><span>autorisations Sitadel</span></article>
      <article><small>DERNIÈRE PÉRIODE</small><strong>Juin 2026</strong><span>diffusion SDES–Sitadel</span></article>
    </div>
    <div class="dashboard-grid">
      <article class="chart-card span-2"><h3>Grands projets par thématique</h3><p>Cliquez une thématique pour la retrouver sur la carte</p><div class="theme-list">${counts.map(([k,n])=>`<button data-theme="${k}"><i class="dot ${k}"></i><b>${THEMES[k].label}</b><small>${n} projet(s)</small></button>`).join("")}</div></article>
      <article class="dashboard-note"><span>COMMENT LIRE</span><h3>Autorisation ≠ chantier</h3><p>Les volumes Sitadel décrivent des autorisations d’urbanisme, pas des mises en chantier. Ils sont agrégés à la commune, pas à la parcelle.</p></article>
    </div>`;
  d.querySelectorAll("[data-theme]").forEach(b=>b.onclick=()=>{
    $("dashboardDialog").close();
    state.themes=new Set([b.dataset.theme]);
    document.querySelectorAll("#themeFilters input").forEach((x,i)=>x.checked=Object.keys(THEMES)[i]===b.dataset.theme);
    renderProjects(true);
  });
  $("dashboardDialog").showModal();
}

buildFilters();renderProjects();loadSitadel();loadCommunes();
$("searchButton").onclick=search;$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search();});
$("resetView").onclick=resetApplicationState;
$("clearLayers").onclick=()=>{state.themes=new Set();state.permitType=null;document.querySelectorAll("#themeFilters input,#permitFilters input").forEach(x=>x.checked=false);renderProjects();renderPermits();};
$("toggleCommunes").onchange=e=>{state.communesVisible=e.target.checked;if(state.communes){state.communesVisible?state.communes.addTo(map):map.removeLayer(state.communes);}};
$("closeDetail").onclick=resetApplicationState;
$("mobileLayers").onclick=()=>$("layerSidebar").classList.toggle("open");
$("openData").onclick=openSynthesis;$("openMethod").onclick=()=>$("methodDialog").showModal();
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).close());
