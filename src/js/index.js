let currentPageUrl = 'https:swapi.dev/api/people/';

window.onload = async () => {
    try {
        await loadCharacter(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacter(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((Character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${Character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg";

            const characterName =document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${Character.name}`;

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility ="visible";

                const conteudoDoModal = document.getElementById('modal-content');
                conteudoDoModal.innerHTML = '';

                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${Character.url.replace(/\D/g, "")}.jpg')`;

                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome:, ${Character.name}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Altura: ${converterHeight(Character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${converterMass(Character.mass)}`;

                const gender = document.createElement("span")
                gender.className = "character-details"
                gender.innerText = `Genero: ${converterGender(Character.gender)}`;

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${converterBirthYear(Character.birth_year)}`;

                conteudoDoModal.appendChild(characterImage)
                conteudoDoModal.appendChild(name)
                conteudoDoModal.appendChild(height)
                conteudoDoModal.appendChild(mass)
                conteudoDoModal.appendChild(gender)
                conteudoDoModal.appendChild(birthYear)
                
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
        alert('errro ao carregar os personagens');
        console.log(error);
    }

}

async function loadNextPage () {
    if(!currentPageUrl) return;

    try {
        
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacter(responseJson.next);


    } catch (error) {
        console.log(error);
        alert('erro ao carregar a próxima página');

    }
};

async function loadPreviousPage () {
    if(!currentPageUrl) return;

    try {
        
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadCharacter(responseJson.previous);


    } catch (error) {
        console.log(error);
        alert('erro ao carregar a página anterior');

    }
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.visibility = "hidden";
}

function converterGender(gender) {
    const genero = {
        hermaphrodite: "hermafrodita",
        male: "masculino",
        female: "feminino",
    }

    return genero[gender.toLowerCase()] || gender;
}

function converterHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return (height / 100 ).toFixed(2);
}

function converterMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`
}

function converterBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido";
    }

    return birthYear;
}

function teste(birthYear) {
    if (birthYear === "unknown") {
        birthYear.className = "character-details-birth"
    }

    birthYear.className = "character-details"
}