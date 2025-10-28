const grid = document.getElementById("grid");
const q = document.getElementById("q");
const region = document.getElementById("region");
const onlyFav = document.getElementById("only-fav");
const status = document.getElementById("status");

const FAV_KEY = "country_favourites_v1";
let all = [];
let fav = loadFav();
let showFavOnly = false;

function loadFav(){
  try{ return JSON.parse(localStorage.getItem(FAV_KEY)) || {}; }catch{return {}}
}
function saveFav(){ localStorage.setItem(FAV_KEY, JSON.stringify(fav)); }

function flagUrl(code){
  return `https://flagcdn.com/w160/${String(code).toLowerCase()}.png`;
}

async function load(){
  status.textContent = "Loading country data...";
  try{
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,region,capital,population");
    const data = await res.json();
    all = data.map(c => ({
      name: c.name.common,
      code: c.cca2,
      region: c.region || "Unknown",
      capital: Array.isArray(c.capital) ? c.capital.join(", ") : (c.capital || "N/A"),
      population: c.population || 0
    })).sort((a,b)=>a.name.localeCompare(b.name));
    status.textContent = `Loaded ${all.length} countries`;
    render();
  }catch(e){
    status.textContent = "Failed to load countries. Please try again.";
  }
}

function filtered(){
  const term = q.value.trim().toLowerCase();
  const reg = region.value;
  let list = all.filter(c =>
    (!term || c.name.toLowerCase().includes(term)) &&
    (!reg || c.region === reg)
  );
  if(showFavOnly){
    list = list.filter(c => !!fav[c.code]);
  }
  return list;
}

function render(){
  const list = filtered();
  grid.innerHTML = "";
  if(list.length === 0){
    const p = document.createElement("p");
    p.textContent = "No matches found.";
    p.style.color = "#66788a";
    grid.appendChild(p);
    return;
  }
  list.forEach(c => grid.appendChild(card(c)));
}

function card(c){
  const wrap = document.createElement("article");
  wrap.className = "card";
  wrap.setAttribute("aria-label", c.name);

  const head = document.createElement("div");
  head.className = "card-head";
  head.innerHTML = `<strong>${c.name}</strong>`;
  wrap.appendChild(head);

  const body = document.createElement("div");
  body.style.padding = "10px";
  body.innerHTML = `
    <img alt="Flag of ${c.name}" src="${flagUrl(c.code)}" width="160" height="120" style="display:block;border-radius:8px;margin-bottom:8px;" />
    <div class="meta">
      Region: ${c.region}<br>
      Capital: ${c.capital}<br>
      Population: ${c.population.toLocaleString()}
    </div>
  `;
  wrap.appendChild(body);

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "8px";
  actions.style.alignItems = "center";
  actions.style.padding = "0 10px 10px";

  const btn = document.createElement("button");
  btn.type = "button";
  const liked = !!fav[c.code];
  btn.textContent = liked ? "Remove favourite" : "Add favourite";
  btn.style.cssText = "background:#fff;border:1px solid #dbe7f0;color:#0b3b58;padding:6px 10px;border-radius:8px;cursor:pointer;";
  btn.addEventListener("click", () => {
    if(fav[c.code]) delete fav[c.code]; else fav[c.code] = true;
    saveFav();
    render();
  });

  const tag = document.createElement("span");
  tag.className = "badge";
  tag.textContent = liked ? "Favourite" : "Country";

  actions.appendChild(btn);
  actions.appendChild(tag);
  wrap.appendChild(actions);

  return wrap;
}

q.addEventListener("input", render);
region.addEventListener("change", render);
onlyFav.addEventListener("click", () => { showFavOnly = !showFavOnly; onlyFav.textContent = showFavOnly ? "All countries" : "Favourites only"; render(); });

load();