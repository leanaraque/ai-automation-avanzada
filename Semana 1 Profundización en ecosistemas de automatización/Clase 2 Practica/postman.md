# Casos de Prueba: Webhook de Triage Médico

Este documento contiene los datos de prueba para enviar a nuestro flujo de n8n mediante Postman (o cualquier cliente HTTP). El objetivo es validar cómo el modelo de IA razona y ajusta el nivel de urgencia (`triage_level`) basándose en el protocolo clínico que inyectamos en el sistema.

## Opción 1: Caso de Urgencia (Nivel Alto)

Este paciente cumple con las condiciones del protocolo de riesgo (mayor de 60 años con dificultad respiratoria). Al enviar este caso, el sistema debería forzar al LLM a clasificar la urgencia y asignar un nivel de triage **Alto**.

```json
{
  "paciente_id": "P-102",
  "sintomas": "Fiebre alta, tos seca y dificultad respiratoria constante",
  "edad": 65,
  "Mail": "mail@gmail.com"
}
```

## Opción 2: Caso de Rutina (Nivel Bajo/Medio)

Este paciente es joven y presenta síntomas leves que no activan el protocolo de emergencia. Al enviar este caso, el LLM demostrará su capacidad de análisis contextual y debería asignar un nivel de triage **Bajo** o **Medio**.

```json
{
  "paciente_id": "P-405",
  "sintomas": "Dolor de cabeza leve, algo de cansancio y mucosidad desde ayer",
  "edad": 32,
  "Mail": "mail@gmail.com"
  
}
```

### Instrucciones para probar en Postman:
1. Abre una nueva pestaña de petición en Postman.
2. Selecciona el método **POST**.
3. Pega la URL de tu Webhook de n8n (asegúrate de usar la URL de *Test* para ver la ejecución en vivo).
4. Ve a la pestaña **Body**, selecciona **raw** y cambia el formato de *Text* a **JSON**.
5. Pega uno de los bloques de código JSON y presiona **Send**.