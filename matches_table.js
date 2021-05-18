tablaEquipos(data.matches);

function tablaEquipos(partidos) {

    let tabla = document.querySelector("#body_table");

    for (let i = 0; i < partidos.length; i++) {

        let tr = document.createElement("tr");

        let equipoLocal = document.createElement("td");
        equipoLocal.innerHTML = partidos[i].homeTeam.name;

        let escudoLocal= document.createElement ("td");
        
        let imagenLocal=document.createElement ("img")
        imagenLocal.setAttribute ("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg" );

        let resultado = document.createElement("td");

        if (partidos[i].score.fullTime.homeTeam == null) {
            resultado.innerHTML= " Próximamente "
        } else{
            resultado.innerHTML = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
        }

        let escudoVisitante= document.createElement ("td");
        
        let imagenVisitante=document.createElement ("img");
        imagenVisitante.setAttribute ("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg" );

        let equipovisitante = document.createElement("td");
        equipovisitante.innerHTML = partidos[i].awayTeam.name;

        escudoLocal.append(imagenLocal);
        escudoVisitante.append(imagenVisitante);
        tr.append(equipoLocal, escudoLocal, resultado, escudoVisitante, equipovisitante);
        tabla.append(tr);

    }

}

