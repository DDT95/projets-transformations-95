const $ = (id) => document.getElementById(id);
const THEMES = {
  mobility: { label: "Mobilités & connexions", color: "#e24a62" },
  planning: { label: "Quartiers & aménagement", color: "#7452b8" },
  environment: { label: "Cadre de vie & résilience", color: "#178267" },
  economy: { label: "Économie & équipements", color: "#d28119" },
};
const STAGES = ["Études", "Concertation", "Travaux", "Livré", "Programmé"];
const PROJECTS = [
  {id:"ligne-17-gonesse",name:"Ligne 17 et gare Gonesse",place:"Gonesse",lat:48.986,lng:2.449,theme:"mobility",stage:"Travaux",horizon:"2028",owner:"Société des grands projets",summary:"Une nouvelle gare du Grand Paris Express au cœur du Triangle de Gonesse, avec une liaison annoncée vers Saint-Denis–Pleyel et l’aéroport Charles-de-Gaulle.",source:"https://www.grandparisexpress.fr/ligne-17/gare-gonesse"},
  {id:"triangle-gonesse",name:"Aménagement du Triangle de Gonesse",place:"Gonesse",lat:48.997,lng:2.437,theme:"planning",stage:"Programmé",horizon:"À partir de 2028",owner:"Grand Paris Aménagement",summary:"Un projet d’aménagement articulé autour de la future gare, de programmes économiques, d’équipements, de services et d’espaces publics paysagers.",source:"https://www.val-doise.gouv.fr/index.php/contenu/telechargement/31448/231583/file/RAAE%20n%C2%B0157%20du%205%20novembre%202025.pdf"},
  {id:"bus-entre-seine",name:"Bus Entre Seine",place:"Argenteuil · Bezons · Cormeilles-en-Parisis",lat:48.95,lng:2.216,theme:"mobility",stage:"Travaux",horizon:"Calendrier du maître d’ouvrage",owner:"Île-de-France Mobilités",summary:"8,2 km de voies dédiées et de mesures d’accompagnement pour relier quatre pôles d’échanges et rendre les lignes de bus plus rapides et régulières.",source:"https://www.iledefrance-mobilites.fr/le-reseau/projets/bus-entre-seine/le-trace-bes"},
  {id:"avenue-parisis",name:"Avenue du Parisis",place:"Est du Val-d’Oise",lat:49.01,lng:2.33,theme:"mobility",stage:"Études",horizon:"Projet de long terme",owner:"Département du Val-d’Oise",summary:"Projet de liaison départementale et de transport collectif visant à améliorer les connexions est-ouest du territoire.",source:"https://www.val-doise.gouv.fr/Actions-de-l-Etat/Le-Plan-d-actions-pour-le-Val-d-Oise/Transport-Mobilites"},
  {id:"roissy-picardie",name:"Liaison Roissy–Picardie",place:"Survilliers · Fosses",lat:49.105,lng:2.56,theme:"mobility",stage:"Travaux",horizon:"2026",owner:"SNCF Réseau",summary:"Une liaison ferroviaire nouvelle pour connecter le réseau picard à la gare Aéroport Charles-de-Gaulle 2 TGV, avec des dessertes au nord-est du Val-d’Oise.",source:"https://www.sncf-reseau.com/fr/travaux/hauts-de-france/liaison-ferroviaire-roissy-picardie"},
  {id:"cergy-grand-centre",name:"Cergy Grand Centre",place:"Cergy · Pontoise",lat:49.037,lng:2.079,theme:"planning",stage:"Travaux",horizon:"Transformation progressive",owner:"Cergy-Pontoise l’agglomération",summary:"Transformation du cœur d’agglomération autour de la gare, des espaces publics, du logement, des équipements et des mobilités.",source:"https://www.cergypontoise.fr/cergy-grand-centre"},
  {id:"porte-saint-germain",name:"Porte Saint-Germain · Berges de Seine",place:"Argenteuil",lat:48.945,lng:2.248,theme:"planning",stage:"Travaux",horizon:"Opération pluriannuelle",owner:"Boucle Nord de Seine · Ville d’Argenteuil",summary:"Renouvellement urbain d’un secteur d’entrée de ville et reconquête des berges, avec logements, activités, équipements et espaces publics.",source:"https://www.argenteuil.fr/fr/porte-saint-germain-berges-de-seine"},
  {id:"nouveau-lariboisiere",name:"Nouvel hôpital d’Argenteuil",place:"Argenteuil",lat:48.946,lng:2.232,theme:"economy",stage:"Programmé",horizon:"Projet hospitalier",owner:"Centre hospitalier Victor Dupouy",summary:"Modernisation du site hospitalier et recomposition de l’offre de soins au service du bassin de vie d’Argenteuil.",source:"https://www.ch-argenteuil.fr/"},
  {id:"ecoparc-val-d-oise",name:"Écoparc de la Vallée de l’Oise",place:"Saint-Ouen-l’Aumône",lat:49.066,lng:2.118,theme:"economy",stage:"Livré",horizon:"Développement en cours",owner:"Cergy-Pontoise l’agglomération",summary:"Parc d’activités consacré aux éco-activités, à l’innovation environnementale et à l’accueil d’entreprises sur la rive de l’Oise.",source:"https://www.cergypontoise.fr/"},
  {id:"foret-pierrelaye",name:"Forêt de Maubuisson",place:"Plaine de Pierrelaye-Bessancourt",lat:49.02,lng:2.16,theme:"environment",stage:"Travaux",horizon:"Plantations progressives",owner:"SMAPP",summary:"Création d’une forêt de plus de 1 300 hectares sur la plaine, avec plantations, continuités écologiques et cheminements ouverts au public.",source:"https://www.smapp-foret.fr/"},
  {id:"butte-pinsons",name:"Continuités paysagères de la Butte Pinson",place:"Montmagny · Groslay",lat:48.978,lng:2.349,theme:"environment",stage:"Travaux",horizon:"Aménagement progressif",owner:"Agence des espaces verts d’Île-de-France",summary:"Ouverture, restauration écologique et mise en réseau des espaces naturels régionaux de la Butte Pinson.",source:"https://www.aev-iledefrance.fr/"},
  {id:"vexin-voie-verte",name:"Continuités cyclables du Vexin",place:"Vexin français",lat:49.142,lng:1.82,theme:"environment",stage:"Programmé",horizon:"Déploiement progressif",owner:"Collectivités du Vexin",summary:"Aménagement progressif d’itinéraires cyclables et de liaisons douces entre bourgs, gares et paysages du Vexin.",source:"https://www.valdoise.fr/"},
];

const map = L.map("map", { zoomControl:false }).setView([49.08,2.1],10);
L.control.zoom({position:"bottomright"}).addTo(map);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{subdomains:"abcd",maxZoom:19,attribution:"© OpenStreetMap · © CARTO"}).addTo(map);
const state={themes:new Set(Object.keys(THEMES)),stages:new Set(STAGES),markers:new Map(),communes:null,communesVisible:true,communeFilter:null};
const projectLayer=L.layerGroup().addTo(map);

function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
function markerIcon(theme){return L.divIcon({className:"",html:`<div class="project-marker ${theme}" style="width:22px;height:22px"></div>`,iconSize:[22,22],iconAnchor:[11,11]});}
function visibleProjects(){return PROJECTS.filter(p=>state.themes.has(p.theme)&&state.stages.has(p.stage)&&(!state.communeFilter||p.place.toLowerCase().includes(state.communeFilter.toLowerCase())));}
function renderProjects(fit=false){projectLayer.clearLayers();state.markers.clear();const visible=visibleProjects();visible.forEach(p=>{const marker=L.marker([p.lat,p.lng],{icon:markerIcon(p.theme)}).bindTooltip(`<strong>${esc(p.name)}</strong><br>${esc(p.place)}`,{direction:"top"}).on("click",()=>showProject(p)).addTo(projectLayer);state.markers.set(p.id,marker);});$("visibleCount").textContent=visible.length;$("filterCount").textContent=visible.length;$("mapStatus").textContent=state.communeFilter?`${visible.length} projet(s) lié(s) à ${state.communeFilter}`:"Cliquez un projet pour ouvrir sa fiche";if(fit&&visible.length){const bounds=L.latLngBounds(visible.map(p=>[p.lat,p.lng]));map.fitBounds(bounds,{padding:[55,55],maxZoom:11});}}
function showProject(p){const theme=THEMES[p.theme];$("detailContent").innerHTML=`<span class="detail-tag">${esc(theme.label.toUpperCase())}</span><h2>${esc(p.name)}</h2><div class="detail-location">${esc(p.place)}</div><span class="stage-badge">${esc(p.stage)} · ${esc(p.horizon)}</span><p>${esc(p.summary)}</p><h3>Repères du projet</h3><div class="detail-meta"><div><small>PORTEUR / RÉFÉRENT</small><strong>${esc(p.owner)}</strong></div><div><small>ÉTAPE AFFICHÉE</small><strong>${esc(p.stage)}</strong></div></div><p>Le point localise le secteur principal et ne représente pas l’emprise juridique ou foncière du projet.</p><a class="profile-link" href="${esc(p.source)}" target="_blank" rel="noreferrer">Consulter la source officielle ↗</a>`;$("detailPanel").classList.add("open");map.panTo([p.lat,p.lng]);}

function buildFilters(){const themes=$("themeFilters");Object.entries(THEMES).forEach(([key,t])=>{const count=PROJECTS.filter(p=>p.theme===key).length;const b=document.createElement("button");b.className="layer-card active";b.innerHTML=`<i class="layer-swatch ${key}"></i><span><b>${t.label}</b><small>${count} projet(s) repéré(s)</small></span><i class="layer-switch"></i>`;b.onclick=()=>{state.themes.has(key)?state.themes.delete(key):state.themes.add(key);b.classList.toggle("active",state.themes.has(key));renderProjects();};themes.appendChild(b);});const stages=$("stageFilters");STAGES.forEach(stage=>{const b=document.createElement("button");b.className="stage-chip active";b.textContent=stage;b.onclick=()=>{state.stages.has(stage)?state.stages.delete(stage):state.stages.add(stage);b.classList.toggle("active",state.stages.has(stage));renderProjects();};stages.appendChild(b);});}
function search(){const q=$("searchInput").value.trim().toLowerCase();const results=$("searchResults");if(!q){results.hidden=true;return;}const matches=PROJECTS.filter(p=>`${p.name} ${p.place} ${THEMES[p.theme].label} ${p.stage}`.toLowerCase().includes(q));results.innerHTML=matches.length?matches.map(p=>`<button data-id="${p.id}"><b>${esc(p.name)}</b><small>${esc(p.place)} · ${esc(p.stage)}</small></button>`).join(""):`<button><b>Aucun projet trouvé</b><small>Essayez un lieu, un thème ou une étape.</small></button>`;results.hidden=false;results.querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{const p=PROJECTS.find(x=>x.id===b.dataset.id);state.themes.add(p.theme);state.stages.add(p.stage);renderProjects();map.setView([p.lat,p.lng],12);showProject(p);results.hidden=true;});}
async function loadCommunes(){
  try {
    const communes=await fetch("https://geo.api.gouv.fr/departements/95/communes?fields=nom,code,contour").then(r=>{if(!r.ok)throw new Error();return r.json()});
    const features=communes.filter(c=>c.contour).map(c=>({type:"Feature",properties:{nom:c.nom,code:c.code},geometry:c.contour}));
    state.communes=L.geoJSON({type:"FeatureCollection",features},{
      style:{color:"#52677e",weight:.65,opacity:.55,fillColor:"#e9eef3",fillOpacity:.08},
      onEachFeature:(f,l)=>l.bindTooltip(f.properties.nom,{sticky:true}).on("click",()=>{
        state.communeFilter=state.communeFilter===f.properties.nom?null:f.properties.nom;
        state.communes.eachLayer(x=>x.setStyle({
          fillOpacity:x.feature.properties.nom===state.communeFilter ? .4 : .08,
          fillColor:x.feature.properties.nom===state.communeFilter ? "#000091" : "#e9eef3"
        }));
        renderProjects(true);
      })
    }).addTo(map);
    map.fitBounds(state.communes.getBounds(),{padding:[15,15]});
  } catch {
    $("mapStatus").textContent="Fond communal momentanément indisponible · projets accessibles";
    renderProjects(true);
  }
}
function openSynthesis(){const counts=Object.keys(THEMES).map(k=>[k,PROJECTS.filter(p=>p.theme===k).length]);const d=$("synthesisContent");d.innerHTML=`<span class="eyebrow">VUE D’ENSEMBLE</span><h2>Les transformations en un regard</h2><p>Une sélection éditoriale de ${PROJECTS.length} projets structurants documentés par des sources publiques.</p><div class="summary-kpis"><div><strong>${PROJECTS.length}</strong><span>projets repérés</span></div><div><strong>${new Set(PROJECTS.map(p=>p.place)).size}</strong><span>secteurs cités</span></div><div><strong>${PROJECTS.filter(p=>p.stage==="Travaux").length}</strong><span>projets en travaux</span></div></div><div class="summary-list">${counts.map(([k,n])=>`<button data-theme="${k}"><i class="dot ${k}"></i><b>${THEMES[k].label}</b><small>${n} projets</small></button>`).join("")}</div>`;d.querySelectorAll("[data-theme]").forEach(b=>b.onclick=()=>{$("synthesisDialog").close();state.themes=new Set([b.dataset.theme]);document.querySelectorAll("#themeFilters .layer-card").forEach((x,i)=>x.classList.toggle("active",Object.keys(THEMES)[i]===b.dataset.theme));renderProjects(true);});$("synthesisDialog").showModal();}

buildFilters();renderProjects();loadCommunes();
$("searchButton").onclick=search;$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search();});
$("resetView").onclick=()=>{state.communeFilter=null;renderProjects();if(state.communes)map.fitBounds(state.communes.getBounds(),{padding:[15,15]});else map.setView([49.08,2.1],10);};
$("selectAll").onclick=()=>{state.themes=new Set(Object.keys(THEMES));state.stages=new Set(STAGES);document.querySelectorAll(".layer-card,.stage-chip").forEach(x=>x.classList.add("active"));renderProjects();};
$("hideAll").onclick=()=>{state.themes=new Set();document.querySelectorAll("#themeFilters .layer-card").forEach(x=>x.classList.remove("active"));renderProjects();};
$("toggleCommunes").onclick=e=>{state.communesVisible=!state.communesVisible;e.currentTarget.classList.toggle("active",state.communesVisible);if(state.communes){state.communesVisible?state.communes.addTo(map):map.removeLayer(state.communes);}};
$("closeDetail").onclick=()=>$("detailPanel").classList.remove("open");
$("mobileLayers").onclick=()=>$("layerSidebar").classList.toggle("open");
[$("openData"),$("openDataTop")].forEach(b=>b.onclick=openSynthesis);$("openMethod").onclick=()=>$("methodDialog").showModal();
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$(b.dataset.close).close());
