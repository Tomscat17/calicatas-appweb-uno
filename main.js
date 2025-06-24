let datosProyecto = null;
let contadorCalicatas = 1;

document.getElementById('form-proyecto').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  datosProyecto = {
    proyecto: form.proyecto.value,
    mandante: form.mandante.value,
    sector: form.sector.value,
    laboratorista: form.laboratorista.value,
    ubicacion: form.ubicacion.value,
  };
  // Ocultar pantalla proyecto, mostrar pantalla calicata
  document.getElementById('pantalla-proyecto').style.display = 'none';
  document.getElementById('pantalla-calicata').style.display = 'block';
  console.log('Proyecto iniciado:', datosProyecto);
});

function previewImagen(event, idPreview) {
  const file = event.target.files[0];
  const imgElement = document.getElementById(idPreview);
  imgElement.src = URL.createObjectURL(file);
}

function guardarCalicata() {
  const confirmar = confirm("¿Estás seguro que quieres guardar esta calicata?");
  if (!confirmar) return;

  const fechaHoy = new Date().toLocaleDateString();
  document.getElementById('fecha-ensayo').textContent = fechaHoy;

  document.getElementById('nombre-calicata').textContent = `Calicata ${contadorCalicatas}`;
  const calicataActual = contadorCalicatas;
  contadorCalicatas++;

  alert('✅ Calicata guardada (simulado). Aquí se guardarán los datos e imágenes.');
  const idsInput = ['input-cartel', 'input-camino', 'input-calicata', 'input-sinregla'];
  const idsImg = ['img-cartel', 'img-camino', 'img-calicata', 'img-sinregla'];

  // Limpiar imagenes
  idsInput.forEach(id => document.getElementById(id).value = '');
  idsImg.forEach(id => document.getElementById(id).src = '');
  // Limpiar campos de datos generales de la calicata
  document.getElementById('dm-calicata').value = '';
  document.getElementById('lado-calicata').value = '';
  document.getElementById('napa-agua').value = '';
  document.getElementById('espesor-capa').value = '';
  document.getElementById('confeccion-calicata').value = '';
  document.getElementById('forma-confeccion').value = '';

// Reset fecha y nombre
  document.getElementById('fecha-ensayo').textContent = 'Se completará al guardar';
  

  // Aquí más adelante se guardarán datos específicos de la calicata + fotos
  // Y se añadirá el código para exportar a Excel
  // Por ahora solo simulamos
}


function agregarEstratos() {
  const cantidadEstratos = parseInt(document.getElementById('cantidad-estratos').value);
  const container = document.getElementById('estratos-container');
  container.innerHTML = ''; // Limpiar estratos previos
  
  for (let i = 1; i <= cantidadEstratos; i++) {
    const estrato = document.createElement('fieldset');
    estrato.innerHTML = `
      <legend>Estrato ${i}</legend>
      
      <!-- Profundidad estratigráfica -->
      <div class="form-group">
        <label>Profundidad estratigráfica (m):</label>
        <input type="number" id="desde-estrato${i}" placeholder="Desde (m)" />
        <input type="number" id="hasta-estrato${i}" placeholder="Hasta (m)" />
      </div>
      
      <!-- Granulometría del suelo -->
      <h4>Granulometría del suelo</h4>
      <div>
        <h5>Total</h5>
        <div class="form-group">
          <label>T. Max. (pulg): <input type="number" id="tmax-estrato${i}" step="0.01" /></label>
          <label>Bolones (% > 80 mm): <input type="number" id="bolones-estrato${i}" step="0.01" /></label>
        </div>
        
        <h5>Fracción menor que tamiz 80 mm</h5>
        <div class="form-group">
          <label>Grava (%): <input type="number" id="grava-estrato${i}" step="0.01" /></label>
          <label>Arena (%): <input type="number" id="arena-estrato${i}" step="0.01" /></label>
          <label>Fino (%): <input type="number" id="fino-estrato${i}" step="0.01" /></label>
        </div>
      </div>
      
      <!-- Tipo de suelo fino -->
      <hr>
      <div class="form-group">
        <label>Tipo de suelo fino: 
          <select id="tipo-suelo-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Arcilla">Arcilla</option>
            <option value="Limo">Limo</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Color en estado natural: <input type="text" id="color-estado-natutral${i}" /></label>
      </div>
      
      <!-- Otros campos -->
      <div class="form-group">
        <label>Olor:
          <select id="olor-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Ninguno">Ninguno</option>
            <option value="Téreo">Téreo</option>
            <option value="Orgánico">Orgánico</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Graduación:
          <select id="graduacion-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Fina">Fina</option>
            <option value="Media">Media</option>
            <option value="Gruesa">Gruesa</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Plasticidad:
          <select id="plasticidad-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Ninguna">Ninguna</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Forma de partículas (Gravas):
          <select id="forma-particulas-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Redondeado">Redondeado</option>
            <option value="Sub-redondeado">Sub-redondeado</option>
            <option value="Angular">Angular</option>
            <option value="Sub-angular">Sub-angular</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Humedad:
          <select id="humedad-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Seco">Seco</option>
            <option value="Húmedo">Húmedo</option>
            <option value="Mojado">Mojado</option>
            <option value="Saturado">Saturado</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Compacidad:
          <select id="compacidad-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Densa">Densa</option>
            <option value="Suelta">Suelta</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Consistencia:
          <select id="consistencia-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Blanda">Blanda</option>
            <option value="Media">Media</option>
            <option value="Firme">Firme</option>
            <option value="Muy firme">Muy firme</option>
            <option value="Dura">Dura</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Estructura:
          <select id="estructura-estrato${i}" onchange="toggleEspecificar('estructura', ${i})">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Estratificado">Estratificado</option>
            <option value="Laminado">Laminado</option>
            <option value="Homogéneo">Homogéneo</option>
            <option value="Vesicular">Vesicular</option>
            <option value="Otros">Otros</option>
          </select>
        </label>
        <input type="text" id="otros-estructura-estrato${i}" placeholder="Especifique" style="display:none;" />
      </div>

      <div class="form-group">
        <label>Cementación:
          <select id="cementacion-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Débil">Débil</option>
            <option value="Fuerte">Fuerte</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Origen:
          <select id="origen-estrato${i}" onchange="toggleEspecificar('origen', ${i})">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Fluvial">Fluvial</option>
            <option value="Artificial">Artificial</option>
            <option value="Otros">Otros</option>
          </select>
        </label>
        <input type="text" id="otros-origen-estrato${i}" placeholder="Especifique" style="display:none;" />
      </div>

      <div class="form-group">
        <label>Materia orgánica o raíces:
          <select id="materia-organica-estrato${i}">
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="Sin indicios">Sin indicios</option>
            <option value="Mediana">Mediana</option>
            <option value="Abundante">Abundante</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>Nombre local del suelo (si existe): <input type="text" id="nombre-local-estrato${i}" /></label>
      </div>
    `;
    container.appendChild(estrato);
  }
  const observacionesContainer = document.getElementById('observaciones-container');
  observacionesContainer.innerHTML = '<h3>Observaciones</h3>';  // Resetear el contenedor

  for (let i = 1; i <= cantidadEstratos; i++) {
    const obsDiv = document.createElement('div');
    obsDiv.classList.add('form-group');
    obsDiv.innerHTML = `
      <label for="observacion-estrato${i}">Observación Estrato ${i}:</label>
      <textarea id="observacion-estrato${i}" rows="4" placeholder="Ingrese observaciones para el estrato ${i}"></textarea>
    `;
    observacionesContainer.appendChild(obsDiv);
  }

}


function mostrarOtroCampo(selectElement, numeroEstrato, tipo) {
  const valor = selectElement.value;
  const inputOtro = document.getElementById(`${tipo}_otro_${numeroEstrato}`);
  if (valor === "Otro") {
    inputOtro.style.display = "block";
  } else {
    inputOtro.style.display = "none";
    inputOtro.value = '';
  }
}



function iniciarNuevoProyecto() {
  const confirmar = confirm("⚠️ Esto eliminará el proyecto actual. ¿Deseas iniciar uno nuevo?");
  if (!confirmar) return;
  location.reload(); // Reinicia la página completamente
}

function toggleEspecificar(tipo, i) {
  const select = document.getElementById(`${tipo}-estrato${i}`);
  const inputEspecificar = document.getElementById(`otros-${tipo}-estrato${i}`);
  
  if (select.value === "Otros") {
    inputEspecificar.style.display = "block"; // Muestra el campo
  } else {
    inputEspecificar.style.display = "none"; // Oculta el campo
  }
}