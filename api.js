let paises = []
let favorito =[]

let tabpaises = null;
let tabfavorites = null;
let contpaises = 0;
let contfavorite = 0;
let constpupulacaopaises = 0;
let constpupulacaofavorite = 0;



window.addEventListener('load',() =>{
    tabpaises = document.querySelector('#tabCountries')
    contpaises = document.querySelector('#countCountries');
    constpupulacaopaises = document.querySelector('#totalPopulationList')

    tabfavorites = document.querySelector('#tabFavorites')
    contfavorite = document.querySelector('#countfavorite')
    constpupulacaofavorite = document.querySelector('#totalPopulationFavorites')
    
    fetchpaises()
})

async function fetchpaises()
{
    const resposta = await fetch('https://restcountries.com/v2/all')
    const json = await resposta.json();
    
    console.log(json);

    paises = json.map(country =>{
        const {numeriCode, translations, population, flag} = country

        return {
            id: numeriCode,
            name: translations.br,
            population,
            formattedPopulacao: population,
            flag
        }
    })
    render()
}

function render()
                    {
                            renderlistapaises()
                            renderlistafavorite()
                            rendersumary()
                            handleCountryButtons();
                    }

function renderlistapaises ()
                                {
                                    let countriesHTML = "<div>";

                                    paises.forEach(country => {
                                        const {id, name, flag, formattedPopulacao} = country

                                        const paiseshtml = `
                                        <div class='country'>
                                            <div>
                                                <a id="${id}" class="waves-effect waves-light btn"> + </a>
                                            </div>
  
                                            <div>
                                                <img src="${flag}" alt="${name}"/>
                                            </div>
      
                                            <div>
                                                <ul> 
                                                    <li> ${name} </li>
                                                    <li> ${formattedPopulacao} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        `
                                        countriesHTML += paiseshtml;
                                    })

                                    countriesHTML += '</div>'
                                    tabpaises.innerHTML = countriesHTML
                                }
function renderlistafavorite()
                                {
                                    let favoritehtml = "<div>"
                                    favorito.forEach(country => {

                                        const {id, name, formattedPopulacao, flag} = country

                                        const favoriteCountryHTML = `
                                        <div class='country'>
                                          <div>
                                            <a id="${id}" class="waves-effect waves-light btn red darken-4"> - </a>
                                          </div>
                                  
                                          <div>
                                            <img src="${flag}" alt="${name}"/>
                                          </div>
                                        
                                          <div>
                                            <ul> 
                                              <li> ${name} </li>
                                              <li> ${formattedPopulation} </li>
                                            </ul>
                                          </div>
                                        </div>
                                      `;
                                      favoritehtml += favoriteCountryHTML;
                                    })

                                    favoritehtml = favoritehtml + '</div>';
                                    tabFavorites.innerHTML = favoritehtml;
                                }
function rendersumary()
                        {
                            contpaises.textContent = paises.length 
                            const populatotal = paises.reduce((accumulator, current) => {
                                return accumulator + current.population;
                            }, 0)
                            
                            constpupulacaopaises.textContent = populatotal

                            const totalfavorite = favorito.reduce((accumulator, current) => {
                                return accumulator + current.population
                            }, 0)
                            totalfavorite.textContent = totalfavorite
                        }

                        function handleCountryButtons() 
                            {
                                const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
                                const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
                                countryButtons.forEach(button => {
                                button.addEventListener('click', () => addToFavorites(button.id));
                            });
                          
                            favoriteButtons.forEach(button => {
                              button.addEventListener('click', () => removeFromFavorites(button.id));
                            });
                          
                          }
function addToFavorites(id) 
                            {
                                
                                const countryToAdd = allCountries.find(country => country.id === id);
                                favorito = [...favorito, countryToAdd];
                                favorito.sort((a, b) => {
                                return a.name.localeCompare(b.name);
                                });
                                paises = paises.filter(country => country.id !== id);
                                render(); 
                            }

function removeFromFavorites(id) 
                                {
                                const countryToRemove = favorito.find(country => country.id === id);
                                paises = [...paises, countryToRemove];
                                paises.sort((a, b) => {
                                  return a.name.localeCompare(b.name);
                                });
  favorito = favorito.filter(country => country.id !== id);
  render();
}