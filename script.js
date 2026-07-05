let pokemon = {
    pokemonValue: null,
    pokeInfo: {},
    pokeName: null,
    spriteCont: null,
    info: false,
    lastPokemon: null,
    helperVar: null,
    favorite: false,
}

let infoOpen = false
let favOpen = false

const FIRST = 1
const LAST_BREAK = 1024
const FIRST_BREAK = 10001
const STANDARD = 11
const ANIMATED = 12
const RESIZE = [14, 17, 19]

let spriteInUse = [
    {
        generation: "generation-i",
        game: "red-blue",
        sprite: "front_transparent",
        back: "back_transparent",
        shiny: "front_transparent",
        shinyback: "back_transparent"
    },
    {
        generation: "generation-i",
        game: "yellow",
        sprite: "front_transparent",
        back: "back_transparent",
        shiny: "front_transparent",
        shinyback: "back_transparent"
    },
    {
        generation: "generation-ii",
        game: "crystal",
        sprite: "front_transparent",
        back: "back_transparent",
        shiny: "front_shiny_transparent",
        shinyback: "back_shiny_transparent"
    },
    {
        generation: "generation-ii",
        game: "gold",
        sprite: "front_transparent",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-ii",
        game: "silver",
        sprite: "front_transparent",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-iii",
        game: "emerald",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_shiny",
        shinyback: "front_shiny"
    },
    {
        generation: "generation-iii",
        game: "firered-leafgreen",
        sprite: "front_default",
         back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-iii",
        game: "ruby-sapphire",
        sprite: "front_default",
         back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-iv",
        game: "diamond-pearl",
        sprite: "front_default",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-iv",
        game: "heartgold-soulsilver",
        sprite: "front_default",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-iv",
        game: "platinum",
        sprite: "front_default",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-v",
        game: "black-white",
        sprite: "front_default",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-v",
        game: "black-white",
        include: "animated",
        sprite: "front_default",
        back: "back_default",
        shiny: "front_shiny",
        shinyback: "back_shiny"
    },
    {
        generation: "generation-vi",
        game: "omegaruby-alphasapphire",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_shiny",
        shinyback: "front_shiny"
    },
    {
        generation: "generation-vi",
        game: "x-y",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_shiny",
        shinyback: "front_shiny"
    },
    {
        generation: "generation-vii",
        game: "icons",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_default",
        shinyback: "front_default"
    },
    {
        generation: "generation-vii",
        game: "ultra-sun-ultra-moon",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_shiny",
        shinyback: "front_shiny"
    },
    {
        generation: "generation-viii",
        game: "brilliant-diamond-shining-pearl",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_default",
        shinyback: "front_default"
    },
    {
        generation: "generation-viii",
        game: "icons",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_default",
        shinyback: "front_default"
    },
    {
        generation: "generation-ix",
        game: "scarlet-violet",
        sprite: "front_default",
        back: "front_default",
        shiny: "front_default",
        shinyback: "front_default"
    },
]

const foto = document.querySelector('#image')
const carta = document.querySelector('#card')
const fundo = document.querySelector('#bg')
const fundoBack = document.querySelector('body')

const anterior = document.querySelector('#previouspokemon')
const proximo = document.querySelector('#nextpokemon')

const frente = document.querySelector('#frontpokemon')
const frenteShiny = document.querySelector('#frontshinypokemon')
const costas = document.querySelector('#backpokemon')
const costasShiny = document.querySelector('#backshinypokemon')

const frenteName = document.querySelector('#frontname')
const costasName = document.querySelector('#backname')
const frenteShinyName = document.querySelector('#frontshinyname')
const costasShinyName = document.querySelector('#backshinyname')

async function start(){ // ------------------------------------------------------------Array para sugestão-------------------------------------------------------------------------------
    pokemon.helperVar = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    pokemon.helperVar = await pokemon.helperVar.json();
    pokemon.pokeArray = pokemon.helperVar.results
    pokemon.helperVar = null

    pokemon.lastPokemon = pokemon.pokeArray[pokemon.pokeArray.length - 1].url.indexOf('pokemon/')
    pokemon.lastPokemon = Number(pokemon.pokeArray[pokemon.pokeArray.length -1].url.slice(pokemon.lastPokemon + 8, -1));
}

start(); // --- Inicializa o array ---

document.querySelector('#pokemonEntry').addEventListener('input', () =>{  // ---------------------------------------------------------sugestão-------------------------------------------
    const text = document.querySelector('#pokemonEntry').value.toLowerCase();
    const suggestions = pokemon.pokeArray.filter(pokemon => pokemon.name.startsWith(text));
    const list = document.querySelector("#suggestions");

    if (document.querySelector('#pokemonEntry').value.trim() === '') {
        list.innerHTML = '';
        return;
    }

    list.innerHTML = "";
    suggestions.slice(0, 5).forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon.name;
        li.addEventListener('click', () =>{
            pokemonSearch(pokemon.name)
            document.querySelector('#pokemonEntry').value = ''
            list.innerHTML = ''
            })
        list.appendChild(li);
        })
    });

document.querySelector('#pokemonSearch').addEventListener('submit', (e) =>{ // -----------------------------------------------Entrada Pokemon -------------------------------------------
    e.preventDefault();
    pokemon.pokemonValue = document.querySelector('#pokemonEntry').value
    document.querySelector('#pokemonEntry').value = ''
    pokemonSearch(pokemon.pokemonValue)
    const list = document.querySelector("#suggestions");
    list.innerHTML = ''
})

// --------------------------------------------------------Setas-------------------------------------------------------------------------------------------------------------------------
function nextPokemon() {
    if (pokemon.pokeInfo.id >= FIRST && pokemon.pokeInfo.id < LAST_BREAK){
        pokemonSearch(pokemon.pokeInfo.id + 1);
    }else if (pokemon.pokeInfo.id === LAST_BREAK){
        pokemonSearch(FIRST_BREAK);
    }else if (pokemon.pokeInfo.id >= FIRST_BREAK && pokemon.pokeInfo.id < pokemon.lastPokemon){
        pokemonSearch(pokemon.pokeInfo.id + 1);
    }else if (pokemon.pokeInfo.id === pokemon.lastPokemon){
        pokemonSearch(FIRST);
    }
}

function previousPokemon() {
    if (pokemon.pokeInfo.id > FIRST && pokemon.pokeInfo.id <= LAST_BREAK){
        pokemonSearch(pokemon.pokeInfo.id - 1);
    }else if (pokemon.pokeInfo.id === FIRST){
        pokemonSearch(pokemon.pokeArray[pokemon.pokeArray.length - 1].name);
    }else if (pokemon.pokeInfo.id === FIRST_BREAK){
        pokemonSearch(LAST_BREAK);
    }else if (pokemon.pokeInfo.id > FIRST_BREAK && pokemon.pokeInfo.id <= pokemon.lastPokemon){
        pokemonSearch(pokemon.pokeInfo.id - 1);
    }
}

function changeCard(type){ // --------------------------------------------------------Troca de images------------------------------------------------------------------------------------
    const typeUp = type.charAt(0).toUpperCase() + type.slice(1)
    carta.src = `Images/${typeUp}Card.png`
    fundo.src = `Images/${typeUp}CardBackground.png`
    fundoBack.style.backgroundImage = `url(Images/${typeUp}Background.png)`
}

async function abilitySearch(ability){ // --------------------------------------------------------Busca de habilidade--------------------------------------------------------------------
    const response = await fetch(ability);
    const abilitydata = await response.json();
    const abilityInfo = abilitydata.effect_entries.find(lingua => lingua.language.name === "en");
    if (abilityInfo){
        return abilityInfo.effect
    }else{
    return abilitydata.effect_entries[0].effect
    }
}

async function backPokemon(pokenumber) { // --------------------------------------------------------Pokemon Anterior--------------------------------------------------------------------
    let previousId;

    if (pokenumber > FIRST && pokenumber <= LAST_BREAK){
        previousId = pokenumber - 1;
    }else if (pokenumber === FIRST){
        previousId = pokemon.lastPokemon;
    }else if (pokenumber === FIRST_BREAK){
        previousId = LAST_BREAK;
    }else if (pokenumber > FIRST_BREAK && pokenumber <= pokemon.lastPokemon){
        previousId = pokenumber - 1;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${previousId}`);
    return await response.json();
}

async function frontPokemon(pokenumber) { // --------------------------------------------------------Pokemon Posterior------------------------------------------------------------------
    let nextId;

    if (pokenumber >= 1 && pokenumber < LAST_BREAK){
        nextId = pokenumber + 1;
    }else if (pokenumber === LAST_BREAK){
        nextId = FIRST_BREAK;
    }else if (pokenumber >= FIRST_BREAK && pokenumber < pokemon.lastPokemon){
        nextId = pokenumber + 1;
    }else if (pokenumber === pokemon.lastPokemon){
        nextId = 1;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
    return await response.json();
}

function move(option){ // --------------------------------------------------------Atras da Carta-----------------------------------------------------------------------------------------
    if (!favOpen){
        const carta = document.querySelectorAll('.esquerda');
        const atras = document.querySelectorAll('.direita');
        const favorito = document.querySelector('#saved')

        if (pokemon.info){
            document.querySelector('#stats').value = "Info"
            pokemon.info = false
        }else{
            document.querySelector('#stats').value = "Close"
            pokemon.info = true
        }

        carta.forEach(e => e.classList.toggle('active'));
        atras.forEach(el => el.classList.toggle('active'));
        favorito.classList.toggle('active')
        
        infoOpen = !infoOpen
    }
}

function favorite(){ // --------------------------------------------------------Favorito----------------------------------------------------------------------------------------
    let listFavorite = JSON.parse(localStorage.getItem("Favoritos")) || [];

    const sameID = listFavorite.some(fav => fav.id === pokemon.pokeInfo.id)
    let efeito = document.querySelector('#effect')

    if (!sameID) {
        listFavorite.push(pokemon.pokeInfo);
        document.querySelector('#favorite').value = '★'
        efeito.textContent = 'Favorite'
    }else{
        listFavorite = listFavorite.filter(fav => fav.id !== pokemon.pokeInfo.id);
        document.querySelector('#favorite').value = '☆'
        efeito.textContent = 'Unfavorite'
        
    }
    efeito.classList.add('show')
    efeito.addEventListener("animationend", () =>{
        efeito.classList.remove('show')
    })
    localStorage.setItem("Favoritos", JSON.stringify(listFavorite))

    const lastFavorite = pokemon.pokeInfo
    localStorage.setItem("Last Favorite", JSON.stringify(lastFavorite))
    document.querySelector('#favoritename').textContent = 'Last favorite: ' + pokemon.pokeName[0].toUpperCase() + pokemon.pokeName.slice(1)
}

function getFavorite(){
    const favorito = JSON.parse(localStorage.getItem("Last Favorite"));
    pokemonSearch(favorito.id)
}

document.querySelector('#saved-button').addEventListener("click", () =>{
    if (!infoOpen){
        const carta = document.querySelectorAll('.esquerda');
        const atras = document.querySelectorAll('.direita');

        document.querySelector('#saved').classList.toggle('visible');

        carta.forEach(e => e.classList.toggle('inverso'));
        atras.forEach(el => el.classList.toggle('inverso'));

        const flex = document.querySelector('#principal')
        const favoritosLista = JSON.parse(localStorage.getItem('Favoritos')) || [];

        if (favoritosLista !== []);{
            flex.innerHTML = ''
            favoritosLista.forEach(poke =>{            
                let div = document.createElement('div')
                let imagem = document.createElement('img')
                let texto = document.createElement('p')
                imagem.src = poke.sprites.front_default
                texto.textContent = poke.name
                texto.classList.add('texto')
                div.setAttribute("id", `${poke.name}`)
                div.appendChild(imagem)
                div.appendChild(texto)
                div.addEventListener("click", (event) =>{
                    pokemonSearch(event.currentTarget.id)
                })
                flex.appendChild(div)
            })
        }
        
        if (!pokemon.favorite){
            document.querySelector('#saved-button').value = 'Close'
            pokemon.favorite = true
        }else{
            document.querySelector('#saved-button').value = 'Favorites'
            pokemon.favorite = false
        }
        
        favOpen = !favOpen
    }
})
async function changeSprite(spritechange){ // ---------------------------------------------Mudança de sprite-----------------------------------------------------------------------------
    if (spritechange.id === 'spriteleft'){
        pokemon.spriteCont -= 1
    }else{
        pokemon.spriteCont += 1
    }

    if (pokemon.spriteCont < 0){
        pokemon.spriteCont = 19
    }else if (pokemon.spriteCont > 19){
        pokemon.spriteCont = 0
    }

    if (pokemon.spriteCont === RESIZE[1] || pokemon.spriteCont === RESIZE[2]){
        document.querySelector('#imagem').classList.add('resize')
        document.querySelector('#frontpokemon').classList.add('resize')
        document.querySelector('#frontshinypokemon').classList.add('resize')
        document.querySelector('#backpokemon').classList.add('resize')
        document.querySelector('#backshinypokemon').classList.add('resize')
    }else if (pokemon.spriteCont === RESIZE[0]){
        document.querySelector('#frontpokemon').classList.add('resizeOnly')
        document.querySelector('#frontshinypokemon').classList.add('resizeOnly')
        document.querySelector('#backpokemon').classList.add('resizeOnly')
        document.querySelector('#backshinypokemon').classList.add('resizeOnly')
    }else{
        document.querySelector('#imagem').classList.remove('resize')
        document.querySelector('#frontpokemon').classList.remove('resize', 'resizeOnly')
        document.querySelector('#frontshinypokemon').classList.remove('resize', 'resizeOnly')
        document.querySelector('#backpokemon').classList.remove('resize', 'resizeOnly')
        document.querySelector('#backshinypokemon').classList.remove('resize', 'resizeOnly')
    }

    const geracao = spriteInUse[pokemon.spriteCont].generation.slice(0, 11) + spriteInUse[pokemon.spriteCont].generation.slice(11).toUpperCase()
    if (pokemon.spriteCont === ANIMATED){
        const sprite = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].sprite]

        foto.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].sprite]

        if (sprite === null){
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[pokemon.spriteCont].game + ' | animated | ' + geracao + " | *ERROR! SPRITE DOESN'T EXIST*"
        }else{
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[pokemon.spriteCont].game + ' | animated | ' + geracao
        }

        frente.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].sprite]
        frenteShiny.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].shiny]
        costas.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].back]
        costasShiny.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].shinyback]
    }else{
        const sprite = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].sprite]

        foto.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].sprite]

        if (sprite === null){
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[pokemon.spriteCont].game + ' | ' + geracao + " | *ERROR! SPRITE DOESN'T EXIST*"
        }else{
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[pokemon.spriteCont].game + ' | ' + geracao
            
        }

        frente.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].sprite]
        frenteShiny.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].shiny]
        costas.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].back]
        costasShiny.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].shinyback]
    }

}

function shiny(){ // -------------------------------------------------------------------------"Shinyficação"-----------------------------------------------------------------------------
    const geracao = spriteInUse[pokemon.spriteCont].generation.slice(0, 11) + spriteInUse[pokemon.spriteCont].generation.slice(11).toUpperCase()
    if (pokemon.spriteCont === ANIMATED){
        foto.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].include][spriteInUse[pokemon.spriteCont].shiny]
    }else if (pokemon.spriteCont === STANDARD){
        foto.src = pokemon.pokeInfo.sprites.front_shiny
    }else{
        foto.src = pokemon.pokeInfo.sprites.versions[spriteInUse[pokemon.spriteCont].generation][spriteInUse[pokemon.spriteCont].game][spriteInUse[pokemon.spriteCont].shiny]
    }
}

function bulbapedia(){ // -------------------------------------------------------------------------Wiki----------------------------------------------------------------------------------
    pokemon.helperVar = pokemon.pokeName.includes('-')
    if (pokemon.helperVar){
        let pokeBulba = pokemon.pokeName.indexOf('-')
        pokeBulba = pokemon.pokeName.slice(0, pokeBulba)
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokeBulba}_(Pok%C3%A9mon)`, "_blank")
    }else{
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokemon.pokeName}_(Pok%C3%A9mon)`, "_blank")
    }
    pokemon.helperVar = null
}

function random(){ // -------------------------------------------------------------------------Busca Aleatoria---------------------------------------------------------------------------
    let randomNumber = Math.floor(Math.random() * pokemon.pokeArray.length);
    pokemonSearch(pokemon.pokeArray[randomNumber].name)
}

async function pokemonSearch(pokemonEntry){ // ---------------------------------------------------Busca Principal------------------------------------------------------------------------
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEntry}`);
    pokemon.pokeInfo = await response.json();
    if ("count" in pokemon.pokeInfo){

    }else{
        const hidded = document.querySelectorAll('.hide')
        hidded.forEach(h => h.classList.remove('hide'))
    }

    const pokeType = pokemon.pokeInfo.types[0]
    pokemon.pokeName = pokemon.pokeInfo.name.charAt(0).toUpperCase() + pokemon.pokeInfo.name.slice(1);

    const favorito = JSON.parse(localStorage.getItem("Last Favorite"));
    const favoritos = JSON.parse(localStorage.getItem("Favoritos")) || [];

    if (favorito){
        document.querySelector('#favoritename').textContent = 'Last favorite: ' + favorito.name[0].toUpperCase() + favorito.name.slice(1)
    }

    let pokeAbility1 = ''
    let pokeAbility2 = ''
    let pokeAbility1Description = ''
    let pokeAbility2Description = ''

    if (pokemon.pokeInfo.abilities[0]){
        pokeAbility1 = pokemon.pokeInfo.abilities[0].ability.name.charAt(0).toUpperCase() + pokemon.pokeInfo.abilities[0].ability.name.slice(1);
        pokeAbility1Description = await abilitySearch(pokemon.pokeInfo.abilities[0].ability.url)
        
        if (pokemon.pokeInfo.abilities[1]){
            pokeAbility2 = pokemon.pokeInfo.abilities[1].ability.name.charAt(0).toUpperCase() + pokemon.pokeInfo.abilities[1].ability.name.slice(1);
            pokeAbility2Description = await abilitySearch(pokemon.pokeInfo.abilities[1].ability.url)
        }else{
            pokeAbility2 = 'No second ability'
        }
    }else{
        pokeAbility1 = 'No abilities'
    }

    if (pokeType){
      changeCard(pokeType.type.name)  
    }else{
        changeCard('normal')
    }
    
    const pokemonAnterior = await backPokemon(pokemon.pokeInfo.id)
    const pokemonPosterior = await frontPokemon(pokemon.pokeInfo.id)

    pokemon.spriteCont = STANDARD
    anterior.src = pokemonAnterior.sprites.front_default
    proximo.src = pokemonPosterior.sprites.front_default
    document.querySelector('#imagem').classList.remove('resize')
    document.querySelector('#versionname').textContent = 'Game: black-white | generation-V'
    foto.src = pokemon.pokeInfo.sprites.front_default
    

    document.querySelector('#pokemonname').textContent = pokemon.pokeName

    document.querySelector('#ability1').textContent = pokeAbility1
    document.querySelector('#ability2').textContent = pokeAbility2
    document.querySelector('#description1').textContent = pokeAbility1Description
    document.querySelector('#description2').textContent = pokeAbility2Description

    document.querySelector('abbr').title = 'Pokédex: ' + pokemon.pokeInfo.id

    document.querySelector('#previousname').textContent = pokemonAnterior.name
    document.querySelector('#nextname').textContent = pokemonPosterior.name

    frente.src = pokemon.pokeInfo.sprites.front_default
    frenteName.textContent = pokemon.pokeName.charAt(0) + pokemon.pokeName.slice(1) + ' Front'

    frenteShiny.src = pokemon.pokeInfo.sprites.front_shiny
    frenteShinyName.textContent = pokemon.pokeName.charAt(0) + pokemon.pokeName.slice(1) + ' Shiny'

    costas.src = pokemon.pokeInfo.sprites.back_default
    costasName.textContent = pokemon.pokeName.charAt(0) +pokemon.pokeName.slice(1) + ' Back'

    costasShiny.src = pokemon.pokeInfo.sprites.back_shiny
    costasShinyName.textContent = pokemon.pokeName.charAt(0) + pokemon.pokeName.slice(1) + ' Shiny'

    const star = favoritos.some(fav => fav.id === pokemon.pokeInfo.id);
    if (star){
        document.querySelector('#favorite').value = '★'
    }else{
        document.querySelector('#favorite').value = '☆'
    }
}