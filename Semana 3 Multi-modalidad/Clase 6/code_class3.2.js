// Recorremos los datos y le cambiamos el nombre y extensión al archivo binario
for (const item of $input.all()) {
  if (item.binary && item.binary.data) {
    item.binary.data.fileName = "nota_de_voz.ogg";
    item.binary.data.fileExtension = "ogg";
  }
}
return $input.all();
