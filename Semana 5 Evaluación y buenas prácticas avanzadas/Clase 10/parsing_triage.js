for (const item of $input.all()) {
  // 1. Capturamos la respuesta de la IA (cambia 'output' por 'text' si tu nodo usa ese nombre)
  let respuestaIA = item.json.output || item.json.text || "";

  // 2. LIMPIEZA: Eliminamos las comillas invertidas de markdown que la IA suele agregar
  respuestaIA = respuestaIA.replace(/```json/gi, '').replace(/```/gi, '').trim();

  // 3. Extracción segura: Intentamos encontrar el primer '{' y el último '}' por si la IA agregó texto extra antes o después
  const inicioJson = respuestaIA.indexOf('{');
  const finJson = respuestaIA.lastIndexOf('}');

  if (inicioJson !== -1 && finJson !== -1) {
    respuestaIA = respuestaIA.substring(inicioJson, finJson + 1);
  }

  try {
    // 4. La magia: Convertimos el texto limpio en un objeto JSON real
    let datosParseados = JSON.parse(respuestaIA);

    // 5. Guardamos el resultado en una nueva variable limpia llamada "triage"
    item.json.triage = datosParseados;

  } catch (error) {
    // FALLBACK DE SEGURIDAD: Si la IA alucina y el JSON es ilegible, forzamos ruta segura
    item.json.triage = {
      "sintoma_principal": "Error de procesamiento de IA. Requiere lectura manual.",
      "nivel_gravedad": "ALTA", // Ante la duda, siempre derivamos al médico
      "requiere_medico": true
    };
    item.json.error_tecnico = error.message;
  }
}

return $input.all();
