// ... (Tus otras funciones de notas y alarmas arriba)

// 4. LÓGICA DE INICIALIZACIÓN (La que me pasaste)
function inicializarApp() {
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const diaMes = `${dia}-${mes}`;
    
    if ("Notification" in window) {
        Notification.requestPermission();
    }
    

    const fraseElem = document.getElementById('frase-hoy');
    if (fraseElem) {
        if (diaMes === "30-3") {
            fraseElem.innerText = "\"Abby, mi corazón late por ti. 💓\"";
        } else {
            // Si tienes la función de la API de frases, se llama aquí
            if (typeof obtenerFraseDeAPI === 'function') obtenerFraseDeAPI();
        }
    }

    const musicaElem = document.getElementById('musica-hoy');
    const linkElem = document.getElementById('link-musica');
    
    if (diaMes === "30-3") {
        if (musicaElem) musicaElem.innerText = "Hoy suena: Confieso - Humbe 🎵";
        if (linkElem) linkElem.href = "https://open.spotify.com/track/1p807snmIn99v36pS99m0S"; 
    } else {
        const inicioAnio = new Date(hoy.getFullYear(), 0, 0);
        const diaDelAnio = Math.floor((hoy - inicioAnio) / (1000 * 60 * 60 * 24)); 
        const misArtistas = ["Humbe", "Mon Laferte", "Michael Jackson", "The Weeknd", "Joji", "Bruno Mars", "Daft Punk"];
        const indiceAjustado = (diaDelAnio - 86 + misArtistas.length) % misArtistas.length;
        const artistaDeHoy = misArtistas[indiceAjustado];
        
        if (musicaElem) musicaElem.innerText = `Hoy suena: Especial de ${artistaDeHoy}`;
        if (linkElem) linkElem.href = "spotify:playlist:0kack7sAkvsXEbavXdBbtcs";
    }
}

// 5. EJECUCIÓN AL CARGAR
window.addEventListener('load', () => {
    inicializarApp(); // Llamamos a tu nueva lógica
    renderArchive();
    renderAlarmas();
    
    // Chequeo de alarma cada segundo
    setInterval(checarHora, 1000); 
});
