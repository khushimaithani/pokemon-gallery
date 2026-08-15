





const URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

const container = document.querySelector("#pokemon-container");

async function getPokemon() {
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    for (let pokemon of data.results) {
        const response = await fetch(pokemon.url);
        const details = await response.json();

        container.innerHTML += `
            <div class="card">
                <img src="${details.sprites.front_default}">
                <h2>${details.name}</h2>
                <p>Type: ${details.types[0].type.name}</p>
            </div>
        `;
    }
}

getPokemon();






// const API_URL = "https://pokeapi.co/api/v2/pokemon";
// const PAGE_SIZE = 20;

// const pokemonGrid = document.querySelector("#pokemonGrid");
// const typeFilter = document.querySelector("#typeFilter");
// const searchInput = document.querySelector("#searchInput");
// const resetBtn = document.querySelector("#resetBtn");
// const loadMoreBtn = document.querySelector("#loadMoreBtn");
// const statusText = document.querySelector("#status");
// const countText = document.querySelector("#count");
// const emptyState = document.querySelector("#emptyState");

// let allPokemon = [];
// let visiblePokemon = [];
// let offset = 0;
// let loading = false;

// const typeColors = {
//   normal: "#8f9aa9",
//   fire: "#ef4444",
//   water: "#3b82f6",
//   electric: "#eab308",
//   grass: "#22c55e",
//   ice: "#06b6d4",
//   fighting: "#dc2626",
//   poison: "#a855f7",
//   ground: "#a16207",
//   flying: "#6366f1",
//   psychic: "#ec4899",
//   bug: "#65a30d",
//   rock: "#78716c",
//   ghost: "#7c3aed",
//   dragon: "#4f46e5",
//   dark: "#374151",
//   steel: "#64748b",
//   fairy: "#d946ef"
// };

// async function fetchPokemonPage(start = 0) {
//   const response = await fetch(`${API_URL}?limit=${PAGE_SIZE}&offset=${start}`);

//   if (!response.ok) {
//     throw new Error("Could not fetch Pokémon list.");
//   }

//   const listData = await response.json();

//   const detailedPokemon = await Promise.all(
//     listData.results.map(async (pokemon) => {
//       const detailResponse = await fetch(pokemon.url);

//       if (!detailResponse.ok) {
//         throw new Error(`Could not fetch ${pokemon.name}.`);
//       }

//       return detailResponse.json();
//     })
//   );

//   return detailedPokemon;
// }

// function createTypePill(type) {
//   const pill = document.createElement("span");
//   pill.className = "type-pill";
//   pill.textContent = type;
//   pill.style.background = typeColors[type] || "#64748b";
//   return pill;
// }

// function formatStatName(name) {
//   return name
//     .replace("special-attack", "Sp. Atk")
//     .replace("special-defense", "Sp. Def")
//     .replace("hp", "HP")
//     .replace("attack", "Atk")
//     .replace("defense", "Def")
//     .replace("speed", "Speed");
// }

// function createCard(pokemon) {
//   const wrapper = document.createElement("article");
//   wrapper.className = "card-wrap";
//   wrapper.tabIndex = 0;
//   wrapper.setAttribute("aria-label", `${pokemon.name} Pokémon card`);

//   const card = document.createElement("div");
//   card.className = "pokemon-card";

//   const front = document.createElement("div");
//   front.className = "card-face card-front";

//   const imageBox = document.createElement("div");
//   imageBox.className = "image-box";

//   const image = document.createElement("img");
//   image.src =
//     pokemon.sprites.other["official-artwork"].front_default ||
//     pokemon.sprites.front_default;
//   image.alt = `${pokemon.name} official artwork`;
//   image.loading = "lazy";

//   imageBox.appendChild(image);

//   const name = document.createElement("h2");
//   name.className = "card-name";
//   name.textContent = pokemon.name;

//   const types = document.createElement("div");
//   types.className = "types";

//   pokemon.types.forEach(({ type }) => {
//     types.appendChild(createTypePill(type.name));
//   });

//   const hint = document.createElement("p");
//   hint.className = "flip-hint";
//   hint.textContent = "Hover or tap to see specialties";

//   front.append(imageBox, name, types, hint);

//   const back = document.createElement("div");
//   back.className = "card-face card-back";

//   const backTitle = document.createElement("h3");
//   backTitle.textContent = pokemon.name;

//   const subtitle = document.createElement("p");
//   subtitle.className = "back-subtitle";
//   subtitle.textContent = `#${String(pokemon.id).padStart(3, "0")} • specialties`;

//   const infoList = document.createElement("div");
//   infoList.className = "info-list";

//   const height = document.createElement("div");
//   height.className = "info-item";
//   height.innerHTML = `<span>Height</span><strong>${(pokemon.height / 10).toFixed(1)} m</strong>`;

//   const weight = document.createElement("div");
//   weight.className = "info-item";
//   weight.innerHTML = `<span>Weight</span><strong>${(pokemon.weight / 10).toFixed(1)} kg</strong>`;

//   infoList.append(height, weight);

//   const abilityHeading = document.createElement("div");
//   abilityHeading.className = "info-item";
//   abilityHeading.innerHTML = `<span>Abilities</span><strong>${pokemon.abilities.length}</strong>`;

//   const abilities = document.createElement("div");
//   abilities.className = "ability-list";

//   pokemon.abilities.slice(0, 3).forEach(({ ability }) => {
//     const item = document.createElement("span");
//     item.className = "ability";
//     item.textContent = ability.name.replace("-", " ");
//     abilities.appendChild(item);
//   });

//   const stats = document.createElement("div");
//   stats.className = "stat";

//   pokemon.stats.slice(0, 3).forEach(({ base_stat, stat }) => {
//     const row = document.createElement("div");
//     row.className = "stat-row";

//     const label = document.createElement("span");
//     label.textContent = formatStatName(stat.name);

//     const bar = document.createElement("div");
//     bar.className = "bar";

//     const fill = document.createElement("span");
//     fill.style.width = `${Math.min(base_stat, 100)}%`;
//     bar.appendChild(fill);

//     const value = document.createElement("strong");
//     value.textContent = base_stat;

//     row.append(label, bar, value);
//     stats.appendChild(row);
//   });

//   back.append(backTitle, subtitle, infoList, abilityHeading, abilities, stats);
//   card.append(front, back);
//   wrapper.appendChild(card);

//   wrapper.addEventListener("click", () => {
//     wrapper.classList.toggle("flipped");
//   });

//   wrapper.addEventListener("keydown", (event) => {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       wrapper.classList.toggle("flipped");
//     }
//   });

//   return wrapper;
// }

// function renderPokemon() {
//   const selectedType = typeFilter.value;
//   const search = searchInput.value.trim().toLowerCase();

//   visiblePokemon = allPokemon.filter((pokemon) => {
//     const matchesType =
//       selectedType === "all" ||
//       pokemon.types.some(({ type }) => type.name === selectedType);

//     const matchesSearch = pokemon.name.toLowerCase().includes(search);

//     return matchesType && matchesSearch;
//   });

//   pokemonGrid.innerHTML = "";

//   visiblePokemon.forEach((pokemon) => {
//     pokemonGrid.appendChild(createCard(pokemon));
//   });

//   const hasResults = visiblePokemon.length > 0;
//   emptyState.classList.toggle("hidden", hasResults);

//   countText.textContent = hasResults
//     ? `${visiblePokemon.length} Pokémon shown`
//     : "";

//   statusText.textContent = loading
//     ? "Loading Pokémon..."
//     : `Loaded ${allPokemon.length} Pokémon`;

//   loadMoreBtn.disabled = loading;
// }

// function populateTypes() {
//   const types = Object.keys(typeColors);

//   types.forEach((type) => {
//     const option = document.createElement("option");
//     option.value = type;
//     option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
//     typeFilter.appendChild(option);
//   });
// }

// async function loadMore() {
//   if (loading) return;

//   loading = true;
//   loadMoreBtn.disabled = true;
//   statusText.textContent = "Loading Pokémon...";

//   try {
//     const newPokemon = await fetchPokemonPage(offset);

//     if (newPokemon.length === 0) {
//       loadMoreBtn.disabled = true;
//       statusText.textContent = "No more Pokémon available.";
//       return;
//     }

//     allPokemon.push(...newPokemon);
//     offset += PAGE_SIZE;

//     renderPokemon();
//   } catch (error) {
//     console.error(error);
//     statusText.textContent = "Something went wrong while loading Pokémon.";
//   } finally {
//     loading = false;
//     renderPokemon();
//   }
// }

// typeFilter.addEventListener("change", renderPokemon);
// searchInput.addEventListener("input", renderPokemon);

// resetBtn.addEventListener("click", () => {
//   typeFilter.value = "all";
//   searchInput.value = "";
//   renderPokemon();
// });

// loadMoreBtn.addEventListener("click", loadMore);

// populateTypes();
// loadMore();
