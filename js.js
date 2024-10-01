//endereço
const xmlURL = 'sitemap.xml';

function buscarXML(){
    fetch(xmlURL).then(response=>response.text()).then(data => {
        //coverter texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data,"application/xml");
        //extrair pos dados desejados
        let noticias = xml.getElementsByTagName("url");
        //elemento  para exibir noticias
        let manchetesContainer = document.getElementById ("manchetes");
        manchetesContainer.innerHTML=""; //limpa a div

        //vamos percorrer a lista usando um for
        for (let i =0; i < noticias.length; i++){
            let loc = noticias[i].getElementsByTagName
            ("loc")[0].textContent;

            //extrai a data de public.
            let data_publi_element = noticias[i].getElementsByTagName ("publication_date")[0];
            let data_publi = data_publi_element ?
            data_publi_element.textContent : 'data indisp.';
            let titulo = titulo_element ? titulo_element.textContent : 'titulo_indisponivel';

            //interpolação de variaveis

            let montadiv = `<div class= 'noticias'> <h2>${titulo} </h2> 
            <p>Publicado em> ${data_publi }</p>
            <a href='${loc}' target='_blank'>
            leia mais</a> <br>`;
            manchetesContainer.innerHTML += montadiv;
        }
    }).catch(error => {
        console.error('erro ao carregar xml', error);

    });
}
window.onload = buscarXML;