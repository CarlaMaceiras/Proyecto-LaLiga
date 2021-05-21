
const url = "https://api.football-data.org/v2/competitions/2014/standings";

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
        tablaClasificacion(data.standings[0].table);

        
})


function tablaClasificacion (clasificacion) {

    let cuerpoTabla= document.querySelector ("#table_body");

    for (let i=0; i<clasificacion.length; i++) {

        let tr = document.createElement ("tr");

        let posicion= clasificacion[i].position;

        let escudo= document.createElement ("img");
        escudo.setAttribute ("src", clasificacion[i].team.crestUrl )

        let equipo= clasificacion[i].team.name;

        let partidosJugados= clasificacion[i].playedGames;

        let ganados= clasificacion[i].won;

        let empate= clasificacion[i].draw;

        let perdidos= clasificacion[i].lost;

        let golesFavor= clasificacion[i].goalsFor;

        let golesContra= clasificacion[i].goalsAgainst;

        let golesDiferencia= clasificacion[i].goalDifference;

        let puntos= clasificacion[i].points;

        let ultimos5= clasificacion[i].form;

        ultimos5=ultimos5.replaceAll("W", "✅");
    
        ultimos5=ultimos5.replaceAll("L", "❌");
    
        ultimos5=ultimos5.replaceAll("D", "🔘");

        ultimos5=ultimos5.replaceAll(",", " ");

        
        let fila_equipos = [
            posicion,
            escudo,
            equipo,
            partidosJugados,
            ganados,
            empate,
            perdidos,
            golesFavor,
            golesContra,
            golesDiferencia,
            puntos,
            ultimos5
            
        ]

        for (let j=0; j< fila_equipos.length; j++) {

            let td=document.createElement("td");
            td.append(fila_equipos[j]);
            tr.append(td);
            
            
        }
        cuerpoTabla.appendChild(tr);



    }

}
