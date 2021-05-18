
listaWeb (data.teams);

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