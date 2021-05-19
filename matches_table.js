tablaEquipos(data.matches);

let boton = document.getElementById("botonFiltro");

boton.addEventListener("click", () => filtrarNombres(data.matches));

// let checkbox= document.getElementById("box");

// checkbox.addEventListener("click", () => filtroCheckbox (data.matches));

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
    let texto = formulario.value.toLowerCase();                                              //se guarda lo que el usuario escribe en el input en minúsculas
    let nuevaLista = equipos.filter(equipo => {

        if (equipo.homeTeam.name.toLowerCase().includes(texto) || equipo.awayTeam.name.toLowerCase().includes(texto)) {
            return true;
        } else {
            return false;
        }
    });

    tablaEquipos(nuevaLista);

}

// function filtroCheckbox(opciones) {

//     let todos = document.querySelector("#box_all");

//     let ganados = document.querySelector("#box_win");

//     let perdidos = document.querySelector("#box_lost");

//     let empatados = document.querySelector("#box_draw");

//     let próximos = document.querySelector("#box_next");

//     todos.addEventListener("click", opciones.filter(opcion => {


//     })

    

// }










