/*
Calcular estadísticas de los equipos y crear tablas para representar los resultados:
Top 5 equipos con mayor media de goles a favor por partido.
Top 5 equipos con menos goles en contra como visitante.

// 0. Crear función que va calcular las estadísticas, recibiendo como param el array de partidos:

// 1. Crear array vacía (será array de objetos)

// 2. Iterar por todos los partidos

// 3. Condición: si el partido no está acabado, no seguir y mirar siguiente partido, si no el null
// de los goles lo romperá todo.

// 4. Buscar en la array estadísticas el objeto con el mismo id que el homeTeam del partido y guardarlo en una variable

// 5. Si el objeto buscado no existe, crearlo con estos keys: id, name, goals, matches.
// Rellenar cada key con el valor correspondiente

// 6. Si existe, actualizar los goles y los partidos

// 7. Hacer exactamente lo mismo a partir del punto 4, pero con awayTeam

// 8. Una vez fuera del loop de partidos, iterar por el array estadisticas

// 9. Añadir la key avg a cada objeto, con el valor goals/matches

// 10. Hacer console.log() para ver que todo está correcto.*/

const url = "https://api.football-data.org/v2/competitions/2014/matches";

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
    estadisticasPartidos(data.matches);
    estadisticasGolesContra(data.matches);
})

window.onload= function() {

    
    let loader= document.querySelector("#loader");

    loader.style.visibility= "hidden";
    loader.style.opacity = "0";
}


function estadisticasPartidos(partidos) {

    let estadisticas = [];

    for (let i = 0; i < partidos.length; i++) {

        if (partidos[i].status != "FINISHED") {
            continue;
        }
        let idHome = partidos[i].homeTeam.id;

        let nameHome = partidos[i].homeTeam.name;

        let goalsHome = partidos[i].score.fullTime.homeTeam;

        let homeTeamEncontrado

        let idAway = partidos[i].awayTeam.id;

        let nameAway = partidos[i].awayTeam.name;

        let goalsAway = partidos[i].score.fullTime.awayTeam;

        let awayTeamEncontrado

        for (let j = 0; j < estadisticas.length; j++) {

            if (idHome == estadisticas[j].id) {
                homeTeamEncontrado = estadisticas[j]

            }

            if (idAway == estadisticas[j].id) {
                awayTeamEncontrado = estadisticas[j]

            }

        }

        if (!homeTeamEncontrado) {

            let objeto = {
                id: idHome,
                name: nameHome,
                goals: goalsHome,
                matches: 1
            }
            estadisticas.push(objeto);
            //crear objeto y hacer push a estadísticas
        } else {

            homeTeamEncontrado.goals += goalsHome;
            homeTeamEncontrado.matches++;
            //sumar goles + los que ya tenía y sumar un partido
        }

        if (!awayTeamEncontrado) {

            let objeto = {
                id: idAway,
                name: nameAway,
                goals: goalsAway,
                matches: 1
            }
            estadisticas.push(objeto);
            //crear objeto y hacer push a estadísticas
        } else {

            awayTeamEncontrado.goals += goalsAway;
            awayTeamEncontrado.matches++;
            //sumar goles + los que ya tenía y sumar un partido
        }

    }

    for (let i = 0; i < estadisticas.length; i++) {

        let avg = estadisticas[i].goals / estadisticas[i].matches;
        estadisticas[i].avg = avg;

    }


    tablaEstadisticas(estadisticas);
}

function tablaEstadisticas(estadisticas) {
    let cuerpoTabla = document.querySelector("#body_table_statistics1");
    
    estadisticas.sort((a, b) => b.avg - a.avg);

    let mejores5= estadisticas.slice(0,5);

    console.log (mejores5);

    for (let i = 0; i < mejores5.length; i++) {

        let tr = document.createElement("tr");

        let escudo= document.createElement ("td");

        let escudoImagen=document.createElement ("img")
        escudoImagen.setAttribute ("src", "https://crests.football-data.org/" + mejores5[i].id + ".svg" );

        let equipo = document.createElement("td");
        equipo.innerHTML=mejores5[i].name;


        let goles= document.createElement("td");
        goles.innerHTML=mejores5[i].goals;

        let partidosJugados= document.createElement("td");
        partidosJugados.innerHTML=mejores5[i].matches;

        let mejoresAvg= document.createElement("td");
        mejoresAvg.innerHTML=mejores5[i].avg.toFixed(2);


        escudo.append(escudoImagen);
        tr.append(escudo, equipo, goles, partidosJugados, mejoresAvg);
        cuerpoTabla.append(tr);

    }


}


estadisticasGolesContra(data.matches);

function estadisticasGolesContra(partidos) {

    let estadisticas = [];

    for (let i = 0; i < partidos.length; i++) {

        if (partidos[i].status != "FINISHED") {
            continue;
        }

        let goalsHome = partidos[i].score.fullTime.homeTeam;

        let idAway = partidos[i].awayTeam.id;

        let nameAway = partidos[i].awayTeam.name;

        let awayTeamEncontrado

        for (let j = 0; j < estadisticas.length; j++) {

            if (idAway == estadisticas[j].id) {
                awayTeamEncontrado = estadisticas[j]

            }

        }

        if (!awayTeamEncontrado) {

            let objeto = {
                id: idAway,
                name: nameAway,
                goals: goalsHome,
                matches: 1
            }
            estadisticas.push(objeto);
            //crear objeto y hacer push a estadísticas
        } else {

            awayTeamEncontrado.goals += goalsHome;
            awayTeamEncontrado.matches++;
            //sumar goles + los que ya tenía y sumar un partido
        }

    }


    tablaGolesContra(estadisticas);
}

function tablaGolesContra(estadisticas) {
    let cuerpoTabla = document.querySelector("#body_table_statistics2");

    estadisticas.sort((a, b) => a.goals - b.goals );

    let menosGoles= estadisticas.slice(0,5);

    console.log (menosGoles);

    for (let i = 0; i < menosGoles.length; i++) {

        let tr = document.createElement("tr");

        let escudo= document.createElement ("td");

        let escudoImagen=document.createElement ("img")
        escudoImagen.setAttribute ("src", "https://crests.football-data.org/" + menosGoles[i].id + ".svg" );

        let equipo = document.createElement("td");
        equipo.innerHTML=menosGoles[i].name;


        let goles= document.createElement("td");
        goles.innerHTML=menosGoles[i].goals;

        let partidosJugados= document.createElement("td");
        partidosJugados.innerHTML=menosGoles[i].matches;



        escudo.append(escudoImagen);
        tr.append(escudo, equipo, goles, partidosJugados);
        cuerpoTabla.append(tr);

    }


}















