
const materias = [
    // --- PRIMER AÑO ---
    { id: "epistemologia", nombre: "Epistemología" },
    { id: "teoria_estado", nombre: "Teoría Social y del Estado" },
    { id: "semiotica", nombre: "Semiótica" },
    { id: "filosofia", nombre: "Introducción a la Filosofía" },
    { id: "desarrollo1", nombre: "Psicología del Desarrollo I" },
    { id: "corrientes1", nombre: "Corrientes de la Psicología Contemporánea I" },
    { id: "problematica", nombre: "Problemática Epistemológica de la Psicología" },
    { id: "biologia", nombre: "Biología" },

    // --- SEGUNDO AÑO ---
    { id: "psicolinguistica", nombre: "Psicolingüística", prereqs: ["semiotica"] },
    { id: "antropologia", nombre: "Antropología", prereqs: ["filosofia"] },
    { id: "mitologias", nombre: "Historia de las Culturas y Mitologías", prereqs: ["antropologia"] },
    { id: "desarrollo2", nombre: "Psicología del Desarrollo II", prereqs: ["desarrollo1"] },
    { id: "corrientes2", nombre: "Corrientes de la Psicología Contemporánea II", prereqs: ["corrientes1"] },
    { id: "psicoanalisis", nombre: "Teoría Psicoanalítica", prereqs: ["problematica"] },
    { id: "neurobiologia", nombre: "Neurobiología", prereqs: ["biologia"] },

    // --- TERCER AÑO ---
    { id: "metodologia", nombre: "Metodología de la Investigación", prereqs: ["epistemologia", "problematica", "corrientes2"] },
    { id: "desarrollo3", nombre: "Psicología del Desarrollo III", prereqs: ["desarrollo2"] },
    { id: "escuela_inglesa", nombre: "Teoría Psicoanalítica: Escuela Inglesa", prereqs: ["psicoanalisis"] },
    { id: "escuela_francesa", nombre: "Teoría Psicoanalítica: Escuela Francesa", prereqs: ["psicoanalisis"] },
    { id: "social", nombre: "Psicología Social", prereqs: ["corrientes2"] },
    { id: "instrumentos", nombre: "Instrumentos de Exploración y Diagnóstico Psicológico", prereqs: ["corrientes2"] },
    { id: "salud_mental", nombre: "Salud Pública. Salud Mental", prereqs: ["teoria_estado", "corrientes2"] },

    // --- CUARTO AÑO ---
    { id: "vocacional", nombre: "Orientación Vocacional y Laboral", prereqs: ["instrumentos"] },
    { id: "institucional", nombre: "Psicología Institucional", prereqs: ["escuela_inglesa", "escuela_francesa"] },
    { id: "etica", nombre: "Psicología, Ética y Derechos Humanos", prereqs: ["filosofia", "corrientes2"] },
    { id: "educacional", nombre: "Psicología Educacional", prereqs: ["psicolinguistica", "desarrollo2", "corrientes2"] },
    { id: "psicopatologia1", nombre: "Psicopatología I", prereqs: ["escuela_inglesa", "escuela_francesa"] },
    { id: "clinica1", nombre: "Clínica I", prereqs: ["escuela_inglesa", "escuela_francesa"] },
    { id: "comunitaria", nombre: "Psicología Socio-Comunitaria", prereqs: ["corrientes2", "social", "salud_mental"] },
    { id: "psicopatologia2", nombre: "Psicopatología II", prereqs: ["corrientes2", "instrumentos"] },
    { id: "clinica2", nombre: "Clínica II", prereqs: ["corrientes2", "instrumentos"] },
    { id: "juridica", nombre: "Psicología Jurídica Forense", prereqs: ["corrientes2", "salud_mental"] },

    // --- QUINTO AÑO ---
    { id: "psiquiatria", nombre: "Psiquiatría y Psicofarmacología", prereqs: ["neurobiologia", "psicopatologia1", "psicopatologia2"] },
    { id: "comunicacion", nombre: "Comunicación y Sistemas de Relaciones Humanas", prereqs: ["psicolinguistica", "social", "institucional"] },
    { id: "tesis1", nombre: "Seminario de Tesis I", prereqs: ["metodologia", "salud_mental", "institucional", "educacional", "clinica1", "clinica2", "comunitaria"] },
    { id: "tesis2", nombre: "Seminario de Tesis II", prereqs: ["tesis1"] },
    { id: "pps", nombre: "Prácticas Profesionales Supervisadas", prereqs: ["social", "institucional", "comunitaria"] },

    // --- OTROS ---
    { id: "portugues1", nombre: "Lengua Extranjera: Portugués I" },
    { id: "portugues2", nombre: "Lengua Extranjera: Portugués II", prereqs: ["portugues1"] },
    { id: "informatica1", nombre: "Informática I" },
    { id: "informatica2", nombre: "Informática II", prereqs: ["informatica1"] },
    { id: "electivo_clinica", nombre: "Seminario Electivo: Clínica Sistémica", prereqs: ["clinica2"] },
    { id: "tif", nombre: "Trabajo Integrador Final", prereqs: [
        "epistemologia", "teoria_estado", "semiotica", "filosofia", "desarrollo1", "corrientes1", "problematica", "biologia",
        "psicolinguistica", "antropologia", "mitologias", "desarrollo2", "corrientes2", "psicoanalisis", "neurobiologia",
        "metodologia", "desarrollo3", "escuela_inglesa", "escuela_francesa", "social", "instrumentos", "salud_mental",
        "vocacional", "institucional", "etica", "educacional", "psicopatologia1", "clinica1", "comunitaria", "psicopatologia2",
        "clinica2", "juridica", "psiquiatria", "comunicacion", "tesis1", "tesis2", "pps", "portugues2", "informatica2", "electivo_clinica"
    ] }
];

const malla = document.getElementById("malla");

function crearMateria(m) {
    const div = document.createElement("div");
    div.className = "materia";
    div.id = m.id;
    div.innerHTML = `<h3>${m.nombre}</h3><span>${m.prereqs ? "Requiere: " + m.prereqs.join(", ") : "Sin requisitos"}</span>`;
    div.onclick = () => aprobarMateria(m.id);
    malla.appendChild(div);
}

function actualizarEstado() {
    materias.forEach((m) => {
        const elem = document.getElementById(m.id);
        if (!m.aprobada && (m.prereqs || []).every(p => materias.find(x => x.id === p && x.aprobada))) {
            elem.classList.add("habilitada");
        } else if (!m.aprobada) {
            elem.classList.remove("habilitada");
        }
    });
}

function aprobarMateria(id) {
    const materia = materias.find(m => m.id === id);
    if (!materia) return;
    materia.aprobada = !materia.aprobada;
    const elem = document.getElementById(id);
    elem.classList.toggle("aprobada");
    actualizarEstado();
}

window.onload = () => {
    materias.forEach(crearMateria);
    actualizarEstado();
};
