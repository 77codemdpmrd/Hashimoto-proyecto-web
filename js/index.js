// ======================================
// SONIDO AMBIENTE DEL MAR
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("ocean-audio");
    const botonSonido = document.getElementById("btn-sonido");
    const iconoSonido = document.getElementById("icono-sonido");


    // Comprobamos que los elementos existen
    if (!audio || !botonSonido || !iconoSonido) {
        console.log("No se encontraron los elementos del audio.");
        return;
    }


    // Volumen suave
    audio.volume = 0.25;


    // Cambiar icono del botón
    function actualizarIcono(sonando) {

        if (sonando) {

            iconoSonido.classList.remove("bi-volume-mute-fill");
            iconoSonido.classList.add("bi-volume-up-fill");

            botonSonido.classList.add("sonando");

            botonSonido.title = "Silenciar sonido";

        } else {

            iconoSonido.classList.remove("bi-volume-up-fill");
            iconoSonido.classList.add("bi-volume-mute-fill");

            botonSonido.classList.remove("sonando");

            botonSonido.title = "Activar sonido";
        }
    }


    // ======================================
    // CLICK EN EL BOTÓN
    // ======================================

    botonSonido.addEventListener("click", async () => {

        if (audio.paused) {

            try {

                await audio.play();

                actualizarIcono(true);

                localStorage.setItem("sonidoActivo", "true");

                console.log("Sonido activado");

            } catch (error) {

                console.error("No se pudo reproducir el audio:", error);
            }

        } else {

            audio.pause();

            actualizarIcono(false);

            localStorage.setItem("sonidoActivo", "false");

            console.log("Sonido desactivado");
        }

    });


    // ======================================
    // RECORDAR LA PREFERENCIA
    // ======================================

    const sonidoActivo =
        localStorage.getItem("sonidoActivo");

    if (sonidoActivo === "true") {

        audio.play()
            .then(() => {

                actualizarIcono(true);

            })
            .catch(() => {

                // Es normal que el navegador
                // bloquee el autoplay.
                actualizarIcono(false);

                console.log(
                    "El navegador bloqueó el inicio automático."
                );
            });

    } else {

        actualizarIcono(false);
    }

});

// =============================
// PANEL INTERACTIVO DE ESTUDIOS
// =============================

const botonesEstudios = document.querySelectorAll(".boton-estudio");
const resultadoEstudio = document.getElementById("resultado-estudio");

const informacionEstudios = {

  tsh: {
    titulo: "TSH",
    texto: `
      La TSH es una hormona producida por la hipófisis que participa
      en la regulación de la glándula tiroides.

      Su medición se utiliza habitualmente para evaluar cómo está
      funcionando la tiroides.

      El resultado debe interpretarse junto con otros estudios
      y con la situación clínica de cada persona.
    `
  },

  t4: {
    titulo: "T4 libre",
    texto: `
      La T4 es una de las principales hormonas producidas por la tiroides.

      La T4 libre representa la fracción disponible para los tejidos
      y puede utilizarse junto con la TSH para conocer mejor
      la función tiroidea.

      Su interpretación corresponde al profesional de salud.
    `
  },

  tpo: {
    titulo: "Anticuerpos anti-TPO",
    texto: `
      Los anticuerpos antiperoxidasa tiroidea, conocidos como anti-TPO,
      pueden encontrarse elevados en enfermedades tiroideas autoinmunes
      como la tiroiditis de Hashimoto.

      Su presencia puede aportar información dentro de una evaluación
      clínica, pero un resultado aislado no debería interpretarse
      sin considerar el resto de los estudios.
    `
  },

  tg: {
    titulo: "Anticuerpos anti-Tg",
    texto: `
      Los anticuerpos antitiroglobulina, conocidos como anti-Tg,
      también pueden aparecer en algunas enfermedades autoinmunes
      de la tiroides.

      Pueden formar parte de la evaluación médica junto con otros
      análisis y antecedentes clínicos.
    `
  }

};


// Esto evita errores en las páginas donde no existe el panel

if (botonesEstudios.length > 0 && resultadoEstudio) {

  botonesEstudios.forEach((boton) => {

    boton.addEventListener("click", () => {

      const estudioSeleccionado = boton.dataset.estudio;

      const informacion =
        informacionEstudios[estudioSeleccionado];

      if (!informacion) {
        return;
      }

      resultadoEstudio.innerHTML = `
        <h4>${informacion.titulo}</h4>
        <p>${informacion.texto}</p>
      `;

    });

  });

}

