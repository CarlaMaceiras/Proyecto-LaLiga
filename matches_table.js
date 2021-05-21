
const url = "https://api.football-data.org/v2/competitions/2014/matches";

fetch(url, {
    method: "GET",                                                      //No hace falta poner GET porque es el que está por defecto. Si es otro método, sí hay que ponerlo.
    headers: {
        "x-Auth-Token": "0e151f8d5ade42229ee48ec4f37a054c"
    }

}).then(response => {
        if (response.ok) {                                                          //Se podría poner: if (response.ok) response.json();
         return response.json(); 
        }                                              
}).then(data => {
    tablaEquipos(data.matches);

   

    boton.addEventListener("click", () => filtrarNombres(data.matches));
    reset.addEventListener("click", () => tablaEquipos(data.matches));

    empatados.addEventListener("change", () => { filtrarNombres(data.matches) });
    ganados.addEventListener("change", () => { filtrarNombres(data.matches) });
    perdidos.addEventListener("change", () => { filtrarNombres(data.matches) });
    proximos.addEventListener("change", () => { filtrarNombres(data.matches) });
    todos.addEventListener("change", () => { filtrarNombres(data.matches) });

   
})

window.addEventListener("load", () => {
    document.querySelector("#loader").classList.toggle("loader2");
})


let boton = document.getElementById("botonFiltro");
let reset = document.querySelector("#reset");
let todos = document.querySelector("#box_all");
let ganados = document.querySelector("#box_win");
let perdidos = document.querySelector("#box_lost");
let empatados = document.querySelector("#box_draw");
let proximos = document.querySelector("#box_next");


function tablaEquipos(partidos) {

    let tabla = document.querySelector("#body_table");
    tabla.innerHTML = "";

    for (let i = 0; i < partidos.length; i++) {

        let tr = document.createElement("tr");

        let equipoLocal = document.createElement("td");
        equipoLocal.innerHTML = partidos[i].homeTeam.name;

        let escudoLocal = document.createElement("td");

        let imagenLocal = document.createElement("img")
        imagenLocal.setAttribute("src", "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg");

        let resultado = document.createElement("td");

        if (partidos[i].score.fullTime.homeTeam == null) {
            resultado.innerHTML = " Próximamente "
        } else {
            resultado.innerHTML = partidos[i].score.fullTime.homeTeam + " - " + partidos[i].score.fullTime.awayTeam;
        }

        let escudoVisitante = document.createElement("td");

        let imagenVisitante = document.createElement("img");
        imagenVisitante.setAttribute("src", "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg");

        let equipovisitante = document.createElement("td");
        equipovisitante.innerHTML = partidos[i].awayTeam.name;

        escudoLocal.append(imagenLocal);
        escudoVisitante.append(imagenVisitante);
        tr.append(equipoLocal, escudoLocal, resultado, escudoVisitante, equipovisitante);
        tabla.append(tr);

    }

}

function filtrarNombres(equipos) {

    let formulario = document.querySelector("#formulario");                                   //para que cuando se escriba y demos al botón, detecte el texto 
    let texto = formulario.value.toLowerCase();


    let nuevaLista = equipos.filter(equipo => {

        if (equipo.homeTeam.name.toLowerCase().includes(texto) || equipo.awayTeam.name.toLowerCase().includes(texto)) {
            todos.disabled=false;
            ganados.disabled=false;
            perdidos.disabled=false;
            empatados.disabled=false;
            proximos.disabled=false;

            return true;
        } else {
            return false;
        }
    })

    if (!empatados.checked && !ganados.checked && !perdidos.checked && !proximos.checked || todos.checked) {
        return tablaEquipos(nuevaLista);
    }

    let filtroEstado = nuevaLista.filter((resultado) => {

        if (empatados.checked == true) {

            if (resultado.score.winner == "DRAW") {

                return true;
            } else {
                return false
            }

        } else if (proximos.checked == true) {

            if (resultado.status == "SCHEDULED") {

                return true;
            } else {
                return false
            }
        } else if (ganados.checked == true) {

            if (resultado.homeTeam.name.toLowerCase().includes(texto) && resultado.score.winner == "HOME_TEAM" || resultado.awayTeam.name.toLowerCase().includes(texto) && resultado.score.winner == "AWAY_TEAM") {
                return true;
            } else {
                return false
            }

        } else if (perdidos.checked == true) {

            if (resultado.homeTeam.name.toLowerCase().includes(texto) && resultado.score.winner == "AWAY_TEAM" || resultado.awayTeam.name.toLowerCase().includes(texto) && resultado.score.winner == "HOME_TEAM") {
                return true;
            } else {
                return false
            }

        }

    })




    tablaEquipos(filtroEstado);


}














