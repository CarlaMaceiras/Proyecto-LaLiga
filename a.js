
function tablaEquipos (partidos) {              

    let cuerpoTabla= document.querySelector ("#table_body");

    
    for (let i=0; i<partidos.length; i++) {

        const tr= document.createElement ("tr");

        let equipo_local= document.createElement ("p");
        equipo_local.innerHTML = partidos[i].homeTeam.name;

        let resultado= partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;

        /*if (resultado == "null") {

            let resultado = "Próximamente";
        } */

        console.log("resultado");

        let equipo_visitante= document.createElement ("p");
        equipo_visitante.innerHTML = partidos[i].awayTeam.name;

        let fila_completa = [
            equipo_local,
            resultado,
            equipo_visitante
        ]

        for (let j=0; j<fila_completa.length; j++) {

            const td= document.createElement ("td");
            td.append(fila_completa[j]);
            tr.appendChild(td);
            

        }
        cuerpoTabla.appendChild(tr);
    }
                                                                            
}

console.log(tablaEquipos);