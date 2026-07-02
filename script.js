let pokemonValue = ''
let pokeInfo = ''
let pokeName = ''
let helperVar = ''
let pokeArray = ''
let spriteCont = ''
let info = false
let lastPokemon = ''

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
    helperVar = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    helperVar = await helperVar.json();
    pokeArray = helperVar.results
    helperVar = null

    lastPokemon = pokeArray[pokeArray.length - 1].url.indexOf('pokemon/')
    lastPokemon = Number(pokeArray[pokeArray.length -1].url.slice(lastPokemon + 8, -1));
}

start(); // --- Inicializa o array ---

document.querySelector('#pokemonEntry').addEventListener('input', () =>{  // ---------------------------------------------------------sugestão-------------------------------------------
    const text = document.querySelector('#pokemonEntry').value.toLowerCase();
    const suggestions = pokeArray.filter(pokemon => pokemon.name.startsWith(text));
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
    pokemonValue = document.querySelector('#pokemonEntry').value
    document.querySelector('#pokemonEntry').value = ''
    pokemonSearch(pokemonValue)
})

// --------------------------------------------------------Setas-------------------------------------------------------------------------------------------------------------------------
function nextPokemon() {
    if (pokeInfo.id >= FIRST && pokeInfo.id < LAST_BREAK){
        pokemonSearch(pokeInfo.id + 1);
    }else if (pokeInfo.id === LAST_BREAK){
        pokemonSearch(FIRST_BREAK);
    }else if (pokeInfo.id >= FIRST_BREAK && pokeInfo.id < lastPokemon){
        pokemonSearch(pokeInfo.id + 1);
    }else if (pokeInfo.id === lastPokemon){
        pokemonSearch(FIRST);
    }
}

function previousPokemon() {
    if (pokeInfo.id > FIRST && pokeInfo.id <= LAST_BREAK){
        pokemonSearch(pokeInfo.id - 1);
    }else if (pokeInfo.id === FIRST){
        pokemonSearch(pokeArray[pokeArray.length - 1].name);
    }else if (pokeInfo.id === FIRST_BREAK){
        pokemonSearch(LAST_BREAK);
    }else if (pokeInfo.id > FIRST_BREAK && pokeInfo.id <= lastPokemon){
        pokemonSearch(pokeInfo.id - 1);
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
        previousId = lastPokemon;
    }else if (pokenumber === FIRST_BREAK){
        previousId = LAST_BREAK;
    }else if (pokenumber > FIRST_BREAK && pokenumber <= lastPokemon){
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
    }else if (pokenumber >= FIRST_BREAK && pokenumber < lastPokemon){
        nextId = pokenumber + 1;
    }else if (pokenumber === lastPokemon){
        nextId = 1;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
    return await response.json();
}

function move(option){ // --------------------------------------------------------Atras da Carta-----------------------------------------------------------------------------------------
    if (option.id === 'stats'){
        const carta = document.querySelectorAll('.esquerda');
        const atras = document.querySelectorAll('.direita');

        if (info){
            document.querySelector('#stats').value = "Info"
            info = false
        }else{
            document.querySelector('#stats').value = "Close"
            info = true
        }

        carta.forEach(e => e.classList.toggle('active'));
        atras.forEach(el => el.classList.toggle('active'));
    }
}

function favorite(){ // --------------------------------------------------------Favorito----------------------------------------------------------------------------------------
    const favorito = JSON.stringify(pokeInfo)
    localStorage.setItem("Favorito", favorito)
    document.querySelector('#favoritename').textContent = 'Favorite: ' + pokeName
}

function getFavorite(){
    const favorito = JSON.parse(localStorage.getItem("Favorito"));
    pokemonSearch(favorito.id)
}

async function changeSprite(spritechange){ // ---------------------------------------------Mudança de sprite-----------------------------------------------------------------------------
    if (spritechange.id === 'spriteleft'){
        spriteCont -= 1
    }else{
        spriteCont += 1
    }

    if (spriteCont < 0){
        spriteCont = 19
    }else if (spriteCont > 19){
        spriteCont = 0
    }

    if (spriteCont === RESIZE[1] || spriteCont === RESIZE[2]){
        document.querySelector('#imagem').classList.add('resize')
        document.querySelector('#frontpokemon').classList.add('resize')
        document.querySelector('#frontshinypokemon').classList.add('resize')
        document.querySelector('#backpokemon').classList.add('resize')
        document.querySelector('#backshinypokemon').classList.add('resize')
    }else if (spriteCont === RESIZE[0]){
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

    const geracao = spriteInUse[spriteCont].generation.slice(0, 11) + spriteInUse[spriteCont].generation.slice(11).toUpperCase()
    if (spriteCont === ANIMATED){
        const sprite = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].sprite]

        foto.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].sprite]

        if (sprite === null){
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[spriteCont].game + ' | animated | ' + geracao + " | *ERROR! SPRITE DOESN'T EXIST*"
        }else{
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[spriteCont].game + ' | animated | ' + geracao
        }

        frente.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].sprite]
        frenteShiny.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].shiny]
        costas.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].back]
        costasShiny.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].shinyback]
    }else{
        const sprite = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].sprite]

        foto.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].sprite]

        if (sprite === null){
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[spriteCont].game + ' | ' + geracao + " | *ERROR! SPRITE DOESN'T EXIST*"
        }else{
            document.querySelector('#versionname').textContent = 'Game: ' + spriteInUse[spriteCont].game + ' | ' + geracao
            
        }

        frente.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].sprite]
        frenteShiny.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].shiny]
        costas.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].back]
        costasShiny.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].shinyback]
    }

}

function shiny(){ // -------------------------------------------------------------------------"Shinyficação"-----------------------------------------------------------------------------
    const geracao = spriteInUse[spriteCont].generation.slice(0, 11) + spriteInUse[spriteCont].generation.slice(11).toUpperCase()
    if (spriteCont === ANIMATED){
        foto.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].include][spriteInUse[spriteCont].shiny]
    }else if (spriteCont === STANDARD){
        foto.src = pokeInfo.sprites.front_shiny
    }else{
        foto.src = pokeInfo.sprites.versions[spriteInUse[spriteCont].generation][spriteInUse[spriteCont].game][spriteInUse[spriteCont].shiny]
    }
}

function bulbapedia(){ // -------------------------------------------------------------------------Wiki----------------------------------------------------------------------------------
    helperVar = pokeName.includes('-')
    if (helperVar){
        let pokeBulba = pokeName.indexOf('-')
        pokeBulba = pokeName.slice(0, pokeBulba)
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokeBulba}_(Pok%C3%A9mon)`, "_blank")
    }else{
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokeName}_(Pok%C3%A9mon)`, "_blank")
    }
}

function random(){ // -------------------------------------------------------------------------Busca Aleatoria---------------------------------------------------------------------------
    let randomNumber = Math.floor(Math.random() * pokeArray.length);
    pokemonSearch(pokeArray[randomNumber].name)
}

async function pokemonSearch(pokemon){ // --------------------------------------------------------Busca Principal------------------------------------------------------------------------
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    pokeInfo = await response.json();
    if ("count" in pokeInfo){

    }else{
        const hidded = document.querySelectorAll('.hide')
        hidded.forEach(h => h.classList.remove('hide'))
    }

    const pokeType = pokeInfo.types[0]
    pokeName = pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1);
    let favorito = localStorage.getItem('Favorito')
    favorito = JSON.parse(favorito);

    if (favorito){
        document.querySelector('#favoritename').textContent = 'Favorite: ' + favorito.name
    }

    let pokeAbility1 = ''
    let pokeAbility2 = ''
    let pokeAbility1Description = ''
    let pokeAbility2Description = ''

    if (pokeInfo.abilities[0]){
        pokeAbility1 = pokeInfo.abilities[0].ability.name.charAt(0).toUpperCase() + pokeInfo.abilities[0].ability.name.slice(1);
        pokeAbility1Description = await abilitySearch(pokeInfo.abilities[0].ability.url)
        
        if (pokeInfo.abilities[1]){
            pokeAbility2 = pokeInfo.abilities[1].ability.name.charAt(0).toUpperCase() + pokeInfo.abilities[1].ability.name.slice(1);
            pokeAbility2Description = await abilitySearch(pokeInfo.abilities[1].ability.url)
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
    
    const pokemonAnterior = await backPokemon(pokeInfo.id)
    const pokemonPosterior = await frontPokemon(pokeInfo.id)

    spriteCont = STANDARD
    anterior.src = pokemonAnterior.sprites.front_default
    proximo.src = pokemonPosterior.sprites.front_default
    document.querySelector('#imagem').classList.remove('resize')
    document.querySelector('#versionname').textContent = 'Game: black-white | generation-V'
    foto.src = pokeInfo.sprites.front_default
    

    document.querySelector('#pokemonname').textContent = pokeName

    document.querySelector('#ability1').textContent = pokeAbility1
    document.querySelector('#ability2').textContent = pokeAbility2
    document.querySelector('#description1').textContent = pokeAbility1Description
    document.querySelector('#description2').textContent = pokeAbility2Description

    document.querySelector('abbr').title = 'Pokédex: ' + pokeInfo.id

    document.querySelector('#previousname').textContent = pokemonAnterior.name
    document.querySelector('#nextname').textContent = pokemonPosterior.name

    frente.src = pokeInfo.sprites.front_default
    frenteName.textContent = pokeName.charAt(0) + pokeName.slice(1) + ' Front'

    frenteShiny.src = pokeInfo.sprites.front_shiny
    frenteShinyName.textContent = pokeName.charAt(0) + pokeName.slice(1) + ' Shiny'

    costas.src = pokeInfo.sprites.back_default
    costasName.textContent = pokeName.charAt(0) + pokeName.slice(1) + ' Back'

    costasShiny.src = pokeInfo.sprites.back_shiny
    costasShinyName.textContent = pokeName.charAt(0) + pokeName.slice(1) + ' Shiny'
}