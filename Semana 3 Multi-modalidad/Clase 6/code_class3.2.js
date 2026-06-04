// Telegram entrega la nota de voz como binario sin nombre ni extension.
// Whisper necesita un archivo con extension valida (.ogg) para procesarlo.
for (const item of $input.all()) {
  if (item.binary && item.binary.data) {
    item.binary.data.fileName = "nota_de_voz.ogg";
    item.binary.data.fileExtension = "ogg";
  }
}
return $input.all();
