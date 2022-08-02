//variables de function iniciarJuego()
const btnMascota = document.getElementById("boton-seleccionar-mascota");
const reiniciar = document.getElementById("boton-reiniciar");

const mascotas = document.getElementsByName("mascotas");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const imgJugador = document.getElementById("jugador-mascota");
const imgEnemigo = document.getElementById("imagen-mascota-enemigo");
const spanMascotaEnemigo = document.getElementById("nombre-mascota-enemigo");
const seccionMensajes = document.getElementById("resultado");
const mensajeJugador = document.getElementById("ataques-jugador");
const mensajeEnemigo = document.getElementById("ataques-enemigo");
const seccionSeleccionar = document.getElementById("seleccionar-mascota");
const seccionAtaques = document.getElementById("seleccionar-ataque");
const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const botonesDeAtaque = document.getElementById("botones");

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let spanVidaJugador = document.getElementById("vida-jugador");
let spanVidaEnemigo = document.getElementById("vida-enemigo");

let inputChekeado = "";
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataqueAleatorio = [];
let opcionDeMokepones;
let opcionDeAtaques;
let mascotaJugador = {};
let mascotaEnemigo = {};
let botones = [];

let resultado;

let victoriasJugador = 0;
let victoriasEnemigo = 0;
let seleccion = false;

class Mokepon {
  constructor(nombre, vida, foto,elemento) {
    this.nombre = nombre;
    this.vida = vida;
    this.foto = foto;
    this.ataques = [];
    this.elemento = elemento;
  }
}
let hipodoge = new Mokepon("Hipodoge", 3, "assets/hipodoge.webp","AGUA");
let capipepo = new Mokepon("Capipepo", 3, "assets/capipepo.webp","RAYO");
let ratigueya = new Mokepon("Ratigueya", 3, "assets/ratigueya.webp","FUEGO");
let pikachu = new Mokepon("Pikachu", 3, "assets/pikachu.png","RAYO");
let langostelvis = new Mokepon("Langostelvis", 3, "assets/langostelvis.png","FUEGO");
let tucapalma = new Mokepon("Tucapalma", 3, "assets/tucapalma.png","AGUA");

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "⚡", id: "boton-rayo" },
);
capipepo.ataques.push(
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
);
ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "💧", id: "boton-agua" },
);

pikachu.ataques.push(
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
);
langostelvis.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "⚡", id: "boton-rayo" },
  { nombre: "💧", id: "boton-agua" },
);
tucapalma.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "⚡", id: "boton-rayo" },
);
let mokepones = new Array();
mokepones.push(hipodoge, capipepo, ratigueya, pikachu,langostelvis,tucapalma);

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mokeponSeleccionado() {
  mascotas.forEach((input) => {
    if (input.checked) {
      inputChekeado = input.value;
    }
  });
  return inputChekeado;
}
function seleccionarMascotaJugador() {
  mokeponSeleccionado();
  mokepones.forEach((mascota) => {
    if (mascota.nombre === inputChekeado) {
      mascotaJugador = mascota;
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
    seccionSeleccionar.style.display = "none";
    seccionAtaques.style.display = "flex";
    ataquesJugador();
  }
}

function elementosMasFuertes(){
  if(mascotaJugador.elemento == "AGUA" && mascotaEnemigo.elemento == "FUEGO"){
    mascotaJugador.ataques.push({ nombre: "💧", id: "boton-agua" })
  } else if(mascotaJugador.elemento == "FUEGO" && mascotaEnemigo.elemento == "RAYO"){
    mascotaJugador.ataques.push({ nombre: "🔥", id: "boton-fuego" })
  } else if (mascotaJugador.elemento == "RAYO" && mascotaEnemigo.elemento == "AGUA"){
    mascotaJugador.ataques.push({ nombre: "⚡", id: "boton-rayo" })
  }
}

function ataquesJugador() {
  elementosMasFuertes()
  mascotaJugador.ataques.forEach((ataque) => {
    opcionDeAtaques = `
    <button class="boton-de-ataque" name="boton">
    ${ataque.nombre}
        </button>
    `;
    botonesDeAtaque.innerHTML += opcionDeAtaques;
  });
  botones = document.getElementsByName("boton");
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  ataqueAleatorio.push(ataqueEnemigo[aleatorio(0, ataqueEnemigo.length - 1)].nombre);
  if (ataqueAleatorio.length === mascotaJugador.ataques.length) {
    combate();
  }
}
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.innerText === "🔥") {
        ataqueJugador.push("🔥");
        boton.style.background = "grey";
      } else if (e.target.innerText === "💧") {
        ataqueJugador.push("💧");
        boton.style.background = "grey";
      } else {
        ataqueJugador.push("⚡");
        boton.style.background = "grey";
      }
      boton.disabled = true
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo() {
  mascotaEnemigo = mokepones[aleatorio(0, mokepones.length - 1)];
  imgEnemigo.src = mascotaEnemigo.foto;
  spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
  ataqueEnemigo = mascotaEnemigo.ataques;
  console.log(ataqueEnemigo);
}

function reiniciarJuego() {
  location.reload(true);
}

function iniciarJuego() {
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
        <input type="radio" name="mascotas" id="${mokepon.nombre.toLowerCase()}" 
        value="${mokepon.nombre}"/>
        <label class="tarjeta-mokepon" for="${mokepon.nombre.toLowerCase()}">
          <p>${mokepon.nombre}</p>
          <img src="${mokepon.foto}" alt="${mokepon.nombre}" />
        </label>
    `;
    contenedorTarjetas.innerHTML += opcionDeMokepones;
  });

  btnMascota.addEventListener("click", seleccionarMascotaJugador);
  reiniciar.addEventListener("click", reiniciarJuego);
}

function crearMensaje(ataqueJugador,ataqueEnemigo) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  nuevoAtaqueDelJugador.innerText += ataqueJugador
  nuevoAtaqueDelEnemigo.innerText += ataqueEnemigo
  
  mensajeJugador.appendChild(nuevoAtaqueDelJugador);
  mensajeEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function revisarVictorias(){
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("EMPATE")
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE")
  } else {
    crearMensajeFinal("PERDISTE")
  }
}

function crearMensajeFinal(resultado) {
  seccionMensajes.innerHTML = "FIN DE LA BATALLA"
  let mensaje = document.createElement("p");
  if (victoriasJugador == victoriasEnemigo) {
    mensaje.innerText = resultado
    seccionMensajes.appendChild(mensaje);
  } else if (victoriasJugador >= 3) {
    mensaje.innerText = resultado
    seccionMensajes.appendChild(mensaje);
  } else {
    mensaje.innerText = resultado
    seccionMensajes.appendChild(mensaje);
  }
  document.getElementById("reiniciar").style.display = "block";
}

function combate() {
  for (let i = 0; i < mascotaJugador.ataques.length; i++) {
    if (ataqueJugador[i] == ataqueAleatorio[i]) {
      crearMensaje(ataqueJugador[i],ataqueAleatorio[i]);
    } else if (ataqueJugador[i] == "⚡" && ataqueAleatorio[i] == "💧") {
      victoriasJugador++;
      spanVidaJugador.innerText = victoriasJugador;
      crearMensaje(ataqueJugador[i],ataqueAleatorio[i]);
    } else if (ataqueJugador[i] == "💧" && ataqueAleatorio[i] == "🔥") {
      victoriasJugador++;
      spanVidaJugador.innerText = victoriasJugador;
      crearMensaje(ataqueJugador[i],ataqueAleatorio[i]);
    } else if (ataqueJugador[i] == "🔥" && ataqueAleatorio[i] == "⚡") {
      victoriasJugador++;
      spanVidaJugador.innerText = victoriasJugador;
      crearMensaje(ataqueJugador[i],ataqueAleatorio[i]);
    } else {
      victoriasEnemigo++;
      spanVidaEnemigo.innerText = victoriasEnemigo;
      crearMensaje(ataqueJugador[i],ataqueAleatorio[i]);
    }
  }
  revisarVictorias();
}

window.addEventListener("load", iniciarJuego);