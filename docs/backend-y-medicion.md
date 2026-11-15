# Backend y medición de realsource

## Arquitectura recomendada

Mantener la landing ligera. Agregar un endpoint de servidor para el diagnóstico, Supabase para contactos y eventos, y Resend para la confirmación y la notificación interna. Administrar inicialmente desde Supabase con acceso restringido. Construir un panel con login cuando el flujo de seguimiento lo requiera. Si elegimos desplegar frontend y backend juntos en Vercel, el ejemplo oficial [Next.js con Supabase](https://github.com/vercel/next.js/tree/canary/examples/with-supabase) da una base de autenticación y sesiones. El formulario, las tablas de leads, las reglas y el envío de email se implementan para este proyecto. Si el sitio continúa en Sites, se puede alojar el endpoint aparte y restringir los orígenes que lo usan.

## Flujo mínimo

1. El visitante responde tres preguntas y recibe una orientación. Deja el email si quiere seguimiento.
2. El servidor valida opciones y email, normaliza UTMs, limita abuso y guarda el lead con un identificador único de envío. Las claves privadas viven en el servidor.
3. El guardado confirmado habilita el mensaje de éxito y el evento de conversión. Si falla el guardado, conservar las respuestas y permitir reintentar.
4. Una tarea de envío procesa la confirmación y el aviso interno con una clave estable por envío y destinatario. Registrar errores de envío y reintentos por separado para conservar el lead aunque falle Resend. [Idempotencia de Resend](https://resend.com/changelog/idempotency-keys).
5. El equipo ve fecha, email, respuestas, orientación, fuente y estado (nuevo, contactado, calificado, cerrado). Un webhook hacia n8n puede agregarse si necesitamos asignaciones o seguimientos en otro sistema.

## Eventos y atribución

| Evento | Cuándo se registra | Uso |
| --- | --- | --- |
| page_view | Visita | Sesiones por fuente y dispositivo |
| real_map_view | El bloque entra en vista | Alcance de la oferta |
| diagnostic_start | Primer avance | Tasa de inicio |
| diagnostic_step | Pregunta confirmada | Abandono por paso |
| diagnostic_complete | Se muestra la orientación | Tasa de finalización |
| lead_saved | El servidor confirma el guardado | Conversión y calidad posterior |

Enviar `Lead` a Meta Pixel después de confirmar el guardado, sujeto al consentimiento que corresponda. Si sumamos Conversions API, usar el mismo nombre y el mismo identificador para el evento del navegador y del servidor. No incluir respuestas ni emails en los eventos de navegación. Empezar con UTMs y estos eventos; evaluar analítica adicional cuando haga falta responder una pregunta concreta.

## Qué falta para activar producción

- Proyecto de Supabase y usuarios que administrarán contactos.
- Dominio de envío verificado en Resend, remitente y destinatario interno.
- ID del píxel y acceso a Events Manager para probar el evento.
- Destino de hosting, dominio final y política de seguimiento/consentimiento.
- Validar con casos reales las preguntas, la recomendación y el texto del email.

Prueba de aceptación: un envío válido crea un contacto y una conversión, y un reintento del mismo envío no duplica ninguno. Verificar también el error de guardado, el fallo de correo y un envío en móvil.
