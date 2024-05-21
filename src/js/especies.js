let currentPageUrl = 'https://swapi.dev/api/species/'

window.onload = async () => {
    try {
        await loadSpecies(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadSpecies(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((species) => {
            
            const card = document.createElement("div");
            card.style.backgroundImage =`url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";
           
            const speciesNameBG = document.createElement("div");
            speciesNameBG.className = "species-name-bg";

            const speciesName =document.createElement("span");
            speciesName.className = "species-name";
            speciesName.innerText = `${species.name}`;

            speciesNameBG.appendChild(speciesName);
            card.appendChild(speciesNameBG);
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const speciesImage = document.createElement("div")
                speciesImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${species.url.replace(/\D/g, "")}.jpg')`
                
                speciesImage.className = "species-image"

                const name = document.createElement("span")
                name.className = "species-details"
                name.innerText = `Nome: ${species.name}`

                const height = document.createElement("span")
                height.className = "species-details"
                height.innerText = `Altura media: ${converterHeight(species.average_height)}`

                const vidaMedia = document.createElement("span")
                vidaMedia.className = "species-details"
                vidaMedia.innerText = `vida media: ${converterVidaMedia(species.average_lifespan)}`;

                const idioma = document.createElement("span")
                idioma.className = "species-details"
                idioma.innerText = `idioma: ${species.language}`;

                const clasificacao = document.createElement("span")
                clasificacao.className = "species-details"
                clasificacao.innerText = `clasificacao: ${converterClasificacao(species.classification)}`;

                

                modalContent.appendChild(speciesImage)
                modalContent.appendChild(name)
                modalContent.appendChild(clasificacao)
                modalContent.appendChild(height)
                modalContent.appendChild(vidaMedia)
                modalContent.appendChild(idioma)
            }
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";

        currentPageUrl = url;

    } catch (error) {
        alert('errro ao carregar as especies');
        console.log(error);
    }
}

async function loadNextPage () {
    if(!currentPageUrl) return;
    
    try {
        
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();
        
        await loadSpecies(responseJson.next);
        
        
    } catch (error) {
        console.log(error);
        alert('erro ao carregar a próxima página');
        
    }
};

async function loadPreviousPage () {
    if (!currentPageUrl) return;


    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadSpecies(responseJson.previous)

    } catch (error) {
        console.log(error);
        alert('erro ao carregar a pagina anterior')
    }
}

function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function converterHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return `${(height / 100 ).toFixed(2)}M`;
}

function converterVidaMedia(vidaMedia) {
    if (vidaMedia === "indefinite","unknown")
   {
        return "desconhecida"
    }

    return `${vidaMedia} anos`
}

function converterClasificacao(clasificacao) {
    const traducao = {
        mammal: "mamifero",
        reptile:"reptil",
        amphibian:"anfíbio",
        gastropod:"gastropode",
        unknown:"desconhecido",
        insectoid:"insetoide",
        sentient:"autoconsciente",
    }

    return traducao[clasificacao.toLowerCase()] || clasificacao;
}