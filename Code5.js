for (const item of $input.all()) {
  let respuestaIA = item.json.output || item.json.text || "";
  respuestaIA = respuestaIA.replace(/```json/gi, '').replace(/```/gi, '').trim();

  const inicioJson = respuestaIA.indexOf('{');
  const finJson = respuestaIA.lastIndexOf('}');

  if (inicioJson !== -1 && finJson !== -1) {
    respuestaIA = respuestaIA.substring(inicioJson, finJson + 1);
  }

  try {
    item.json.evaluacion = JSON.parse(respuestaIA);
  } catch (error) {
    item.json.evaluacion = {
      "calificacion": 0,
      "es_seguro": false,
      "motivo_auditoria": "Error de parseo. El jurado falló al generar el formato."
    };
  }
}
return $input.all();
