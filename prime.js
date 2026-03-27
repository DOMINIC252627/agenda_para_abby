// 1. LA API (Trae frases de internet)
async function obtenerFraseDeAPI() {
    const elementoFrase = document.getElementById('frase-hoy');
    try {
        const respuesta = await fetch('https://phrasesapi.onrender.com/getLoveAndFriendship');
        const datos = await respuesta.json();
        if (datos.phrase) {
            elementoFrase.innerText = `"${datos.phrase}"`; 
        }
    } catch (error) {
        console.error("Error con la API:", error);
        elementoFrase.innerText = "¡Hoy será un gran día!";
    }
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registrado con éxito', reg))
            .catch(err => console.error('Error al registrar SW', err));
    });
}

// 2. LÓGICA DE INICIO (Frase + Música Especial)
function inicializarApp() {
    const hoy = new Date();
    const diaMes = `${hoy.getDate().toString().padStart(2, '0')}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}`;
    
    // --- PARTE A: LA FRASE ---
    const especiales = {
        "01-01": "¡Feliz Año Nuevo! 🥂",
        "14-02": "¡Feliz San Valentín! ❤️",
        "25-12": "¡Feliz Navidad! 🎄"
    };

    if (especiales[diaMes]) {
        document.getElementById('frase-hoy').innerText = especiales[diaMes];
    } else {
        obtenerFraseDeAPI(); 
    }

    // --- PARTE B: LA MÚSICA (Humbe hoy 27/03) ---
    const inicioAnio = new Date(hoy.getFullYear(), 0, 0);
    const dif = hoy - inicioAnio;
    const diaDelAnio = Math.floor(dif / (1000 * 60 * 60 * 24)); 

    const misArtistas = [
        "Humbe",           // Posición 0
        "Mon Laferte",     // Posición 1
        "Michael Jackson", 
        "The Weeknd",      
        "Joji",            
        "Bruno Mars",      
        "Daft Punk",       
    ];

    // Ajuste matemático para que hoy 27/03 (día 86) sea el índice 0 (Humbe)
    const indiceAjustado = (diaDelAnio - 86 + misArtistas.length) % misArtistas.length;
    const artistaDeHoy = misArtistas[indiceAjustado];
    
    document.getElementById('musica-hoy').innerText = `Hoy suena: Especial de ${artistaDeHoy}`;
    document.getElementById('link-musica').href = "https://open.spotify.com/playlist/0kack7sAkvsXEbavXdBbtc?si=sZrZ2TjJRdKjMJUwPFvIHg&pi=eaMd51w8TT6ts";
}

// 3. EJECUCIÓN FINAL (Al cargar la página)
window.addEventListener('load', () => {
    console.log("Iniciando App Especial...");
    inicializarApp(); 
    renderArchive(); // Carga tus notas guardadas
    renderAlarmas(); // Carga tus alarmas guardadas
    setInterval(checarHora, 10000); // Revisa la alarma cada 10 seg
});