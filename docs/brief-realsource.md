# Brief del sitio de realsource

Actualizado el 13 de noviembre de 2026 · Documento de trabajo

## 1. Objetivo y jerarquía comercial

realsource es una **consultora de marca y crecimiento**. La página tiene que explicar qué hacemos, por qué conviene diagnosticar antes de comunicar y cuál es el primer paso para trabajar con nosotros.

**Problema que abre la conversación:** una empresa puede tener un buen negocio y aun así no tener claro qué decir, a quién ni por dónde empezar. El diagnóstico ordena esas decisiones antes de invertir en producción, canales o pauta.

**Oferta principal: real map.** Es el trabajo de diagnóstico y posicionamiento que termina en un mapa de marca que el equipo puede usar para dirigir su comunicación. El borrador de producto describe cinco áreas: diagnóstico, estrategia y posicionamiento, identidad, distribución y gobernanza. También indica ocho llamadas y una presentación del mapa con el equipo. Validar ese alcance antes de publicarlo.

**Continuidad opcional:** real content y real growth se presentan como posibilidades de ejecución, según lo que revele el mapa y lo que necesite el cliente. Mencionarlos brevemente, sin convertirlos en tres ofertas equivalentes.

**Acción principal:** «Empezá por el diagnóstico». Lleva al cuestionario breve de la web. El cuestionario orienta el primer paso; el diagnóstico de marca en profundidad forma parte de real map.

## 2. Arquitectura de la información

Propuesta de cinco bloques para una página corta. El texto entre comillas es borrador.

| Bloque | Pregunta que responde | Contenido y movimiento |
| --- | --- | --- |
| 1. Apertura | ¿Quiénes son y qué hacen? | «Consultora de marca y crecimiento». Propuesta de titular: «Antes de comunicar, definí qué querés que tu marca signifique». Rayo original, cielo y un CTA al diagnóstico. Probar una transición breve del cielo al hacer scroll. |
| 2. El problema | ¿Por qué empezar por un diagnóstico? | Explicar en pocas líneas cómo la falta de dirección dispersa decisiones de contenido, canales e inversión. Una aparición suave puede acompañar la lectura. |
| 3. real map | ¿Qué construimos y qué me llevo? | Mostrar las cinco áreas como un mapa que se arma con el scroll. Cerrar con el entregable concreto y para qué le sirve al equipo. |
| 4. Después del mapa | ¿También pueden acompañar la ejecución? | Una mención breve de real content y real growth como continuidades opcionales. Puede integrarse al final de real map si la página se siente larga. |
| 5. Diagnóstico y contacto | ¿Cuál es el siguiente paso? | Tres preguntas, una orientación breve y un campo de email para pedir seguimiento. Mostrar confirmación después de guardar el envío. |

Presupuesto de movimiento: tres a cinco momentos como máximo. Priorizar apertura, transición y real map. El contacto tiene que sentirse inmediato. En móvil, comprobar legibilidad, alcance del CTA, scroll y uso del teclado del formulario.

## 3. Moodboard y referencias

La fuente visual es **B2 de identidad de marca**. Usar el moodboard como criterio para seleccionar imágenes, texturas, color y tipografía. En SITE RS están `brand-book-v2.md`, `realsource brand book v2.pdf`, `simbolos.md` y `isotipo-animaciones.html`, además de los videos del isotipo. El manual describe cielo y tierra, una zona de calma detrás del texto y cobre para real map. Verificar visualmente el moodboard antes de cerrar el arte del sitio.

| Referencia | Qué estudiar |
| --- | --- |
| [Air](https://air.inc/) | Solo el inicio: composición de nubes, capas del fondo y transición durante el primer scroll. |
| [Premotio](https://premotio.com/) | Cómo el scroll marca el avance de una historia. Aplicación: construcción del real map por etapas. |
| [Shopify Editions](https://www.shopify.com/editions/winter2026) | Profundidad, ritmo y continuidad de las escenas sobre fondo gris. |
| [Kinso](https://www.kinso.ai/) | Navegación limpia y jerarquía clara del contenido. |
| [Daiki Fujita](https://daikifujita.com/) | Referencia secundaria para transiciones puntuales. |

Para cada efecto elegido, guardar un clip con el estado inicial, una pausa durante el scroll y el estado final. Si hay HTML exportado, adjuntarlo como apoyo. Definir qué se mueve y qué queda fijo, probar ese fragmento con los activos de realsource y revisarlo en escritorio y móvil antes de integrarlo. El movimiento exacto de Air queda pendiente de una referencia observable.

## 4. Diagnóstico de tres preguntas

Borrador para validar:

1. **¿En qué momento está tu marca?** Estamos definiéndola / Tenemos una oferta validada / Ya comunicamos y queremos ordenar o crecer.
2. **¿Qué necesitás resolver primero?** Aclarar qué decir y a quién / Ordenar cómo comunicamos / Mejorar la ejecución de una estrategia que ya tenemos.
3. **¿Con qué contás hoy para hacerlo?** Lo lleva el founder / Tenemos equipo interno / Trabajamos con apoyo externo.

Mostrar una orientación según las respuestas. Si falta claridad de mensaje o posicionamiento, presentar real map como siguiente paso. Si la dirección ya existe, invitar a conversar sobre qué apoyo de ejecución encaja. Dejar el email como único dato de contacto en el primer paso. Validar la redacción, las opciones y las reglas de recomendación con ejemplos de clientes antes de implementarlas.

## 5. Backend y medición

Primera versión propuesta: guardar fecha, respuestas, orientación y email cuando se confirme el envío. Vincular la fuente de la visita si hay UTMs. Validar el email en servidor y mostrar un estado de error recuperable sin perder las respuestas. Mantener los correos en el registro de contactos y usar un identificador de sesión en los eventos de navegación.

| Evento | Qué permite medir |
| --- | --- |
| Visita y llegada a real map | Tráfico y alcance del bloque principal por fuente y dispositivo. |
| Clic en el CTA e inicio del diagnóstico | Cuántas sesiones muestran intención y pasan al formulario. |
| Respuesta por paso y diagnóstico completo | Dónde se pierde gente y qué proporción completa las tres preguntas. |
| Email guardado por el servidor | Conversión final y contactos captados. |

**Dashboard inicial:** sesiones, inicios, diagnósticos completos y contactos guardados. Comparar por fuente/UTM y dispositivo. Medir inicios sobre sesiones, diagnósticos completos sobre inicios y contactos guardados sobre sesiones. Usar el embudo para decidir qué bloque o pregunta ajustar. Queda por definir la plataforma de datos, quién recibe los contactos y cómo se hará el seguimiento.

## 6. Orden de trabajo y fuentes

1. Revisar B2 y seleccionar los activos de marca que entran al sitio.
2. Validar la arquitectura, el mensaje de apertura y el alcance de real map usando `copy-site.md` como base.
3. Validar las tres preguntas y la salida del diagnóstico. Armar el recorrido y el formulario.
4. Probar las escenas de movimiento de forma aislada e integrarlas al recorrido.
5. Conectar el backend y verificar que un envío de prueba se guarde y se refleje en el dashboard.
6. Revisar la experiencia completa en escritorio y móvil antes de publicar.

**GitHub:** el código está vinculado al repositorio [site-realsource](https://github.com/amarubasile-commits/site-realsource). El histórico de diseño, las decisiones y la guía de trabajo se mantienen en `docs/`.
