

const url = "https://api.football-data.org/v2/competitions/2014/teams";

fetch(url, {
    method: "GET",                                                     
    headers: {
        "x-Auth-Token": "0e151f8d5ade42229ee48ec4f37a054c"
    }

}).then(response => {
        if (response.ok) {                                                          
         return response.json(); 
        }                                              
}).then(data => {
    listaWeb (data.teams);

})


function listaWeb (webEquipos){
    console.log(webEquipos);
    let desplegable= document.querySelector (".dropdown-menu");  

    for (let i=0; i<webEquipos.length; i++) {

        let li= document.createElement("li");

        
        let imagenLocal=document.createElement ("img")
        imagenLocal.setAttribute ("src", "https://crests.football-data.org/" + webEquipos[i].id + ".svg" );

        let web = document.createElement("a");
        web.setAttribute("href", webEquipos[i].website);

        web.append(imagenLocal, webEquipos[i].name)

        li.append (web);

        
        desplegable.append(li);

    }

}