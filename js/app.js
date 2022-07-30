//variables de function iniciarJuego()
const btnMascota = document.getElementById("boton-seleccionar-mascota");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonRayo = document.getElementById("boton-rayo");
const reiniciar = document.getElementById("boton-reiniciar");

const mascotas = document.getElementsByName("mascotas");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const imgJugador = document.getElementById("jugador-mascota");
const imgEnemigo = document.getElementById("imagen-mascota-enemigo");
const spanMascotaEnemigo = document.getElementById("nombre-mascota-enemigo");
const seccionMensajes = document.getElementById("resultado");
const mensajeJugador = document.getElementById("ataques-jugador");
const mensajeEnemigo = document.getElementById("ataques-enemigo");
const botones = document.getElementsByName("boton");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");

let cantidadDeMascotas = 0;
let mascotaElegida = "";
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let mascotaEnemigo = {};

let resultado;
let vidaJugador = 3;
let vidaEnemigo = 3;
let seleccion = false;

class Mokepon {
  constructor(nombre, vida, foto) {
    this.nombre = nombre;
    this.vida = vida;
    this.foto = foto;
    this.ataques = [];
  }
}
let hipodoge = new Mokepon("Hipodoge", 3, "assets/hipodoge.webp");
let capipepo = new Mokepon("Capipepo", 3, "assets/capipepo.webp");
let ratigueya = new Mokepon("Ratigueya", 3, "assets/ratigueya.webp");
let pikachu = new Mokepon("Pikachu", 3, "assets/pikachu.png");

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "⚡", id: "boton-rayo" }
);
capipepo.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "⚡", id: "boton-rayo" }
);
ratigueya.ataques.push(
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" }
);

pikachu.ataques.push(
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" }
);
let mokepones = new Array();
mokepones.push(hipodoge, capipepo, ratigueya,pikachu);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mokeponSeleccionado() {
  mascotas.forEach((input) => {
    if (input.checked) {
      mascotaElegida = input.value;
    }
  });
  return mascotaElegida;
}
function seleccionarMascotaJugador() {
  mokeponSeleccionado();
  mokepones.forEach((mascota) => {
    if (mascota.nombre === mascotaElegida) {
      imgJugador.src = mascota.foto;
      spanMascotaJugador.innerHTML = mascota.nombre;
      seleccion = true;
    }
  });
  if (!seleccion) {
    alert("no seleccionaste ninguna");
    reiniciarJuego();
  } else {
    seleccionarMascotaEnemigo();
  }
}

function seleccionarMascotaEnemigo() {
  mascotaEnemigo = mokepones[aleatorio(1, 3)];
  imgEnemigo.src = mascotaEnemigo.foto;
  spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
  document.getElementById("seleccionar-mascota").style.display = "none";
  document.getElementById("seleccionar-ataque").style.display = "flex";
}

function reiniciarJuego() {
  location.reload(true);
}

function iniciarJuego() {
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascotas" id="${mokepon.nombre.toLowerCase()}" value="${
      mokepon.nombre
    }"/>
        <label class="tarjeta-mokepon" for="${mokepon.nombre.toLowerCase()}">
          <p>${mokepon.nombre}</p>
          <img src="${mokepon.foto}" alt="${mokepon.nombre}" />
        </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  btnMascota.addEventListener("click", seleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonRayo.addEventListener("click", ataqueRayo);
  reiniciar.addEventListener("click", reiniciarJuego);
}

function ataqueFuego() {
  ataqueJugador = "FUEGO🔥";
  ataqueEnemigo = ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "AGUA💧";
  ataqueEnemigo = ataqueAleatorioEnemigo();
}

function ataqueRayo() {
  ataqueJugador = "RAYO⚡";
  ataqueEnemigo = ataqueAleatorioEnemigo();
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  seccionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  mensajeJugador.appendChild(nuevoAtaqueDelJugador);
  mensajeEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  let mensaje = document.createElement("p");

  mensaje.innerText = ` Tu mascota  ${resultadoFinal} EL COMBATE`;
  seccionMensajes.appendChild(mensaje);

  botones.forEach((boton) => {
    boton.disabled = true;
  });
  document.getElementById("reiniciar").style.display = "block";
}

function revisarVidas() {
  if (vidaEnemigo == 0) {
    crearMensajeFinal("GANO");
  } else if (vidaJugador == 0) {
    crearMensajeFinal("PERDIO");
  }
}

function combate() {
  if (vidaEnemigo > 0 && vidaJugador > 0) {
    let spanVidaJugador = document.getElementById("vida-jugador");
    let spanVidaEnemigo = document.getElementById("vida-enemigo");
    if (ataqueJugador == ataqueEnemigo) {
      crearMensaje("EMPATE");
    } else if (ataqueJugador == "RAYO⚡" && ataqueEnemigo == "AGUA💧") {
      vidaEnemigo--;
      spanVidaEnemigo.innerHTML = vidaEnemigo;
      crearMensaje("GANASTE");
    } else if (ataqueJugador == "AGUA💧" && ataqueEnemigo == "FUEGO🔥") {
      crearMensaje("GANASTE");
      vidaEnemigo--;
      spanVidaEnemigo.innerHTML = vidaEnemigo;
    } else if (ataqueJugador == "FUEGO🔥" && ataqueEnemigo == "RAYO⚡") {
      vidaEnemigo--;
      spanVidaEnemigo.innerHTML = vidaEnemigo;
      crearMensaje("GANASTE");
    } else {
      vidaJugador--;
      spanVidaJugador.innerHTML = vidaJugador;
      crearMensaje("PERDISTE");
    }
  }
  revisarVidas();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);
  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO🔥";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA💧";
  } else {
    ataqueEnemigo = "RAYO⚡";
  }

  combate();
}

window.addEventListener("load", iniciarJuego);
