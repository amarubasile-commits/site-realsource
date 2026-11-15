const motion = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const map = document.querySelector('.method');
const mapLinks = [...map.querySelectorAll('.map-progress a')];
const mapSteps = [...map.querySelectorAll('.map-step')];
const nodes = [...map.querySelectorAll('.map-nodes i')];
const caption = map.querySelector('.map-caption');
let activeStage = -1;

function updateScene() {
  const heroBounds = hero.getBoundingClientRect();
  const progress = motion.matches ? 0 : Math.max(0, Math.min(1, -heroBounds.top / heroBounds.height));
  hero.style.setProperty('--travel', `${progress * 85}px`);
  hero.style.setProperty('--zoom', 1.04 + progress * .1);

  const readingLine = innerHeight * .54;
  let stage = 0;
  mapSteps.forEach((step, index) => {
    if (step.getBoundingClientRect().top <= readingLine) stage = index;
  });
  if (stage === activeStage) return;
  activeStage = stage;
  mapLinks.forEach((link, index) => {
    if (index === stage) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
    mapSteps[index].classList.toggle('active', index === stage);
    nodes[index].classList.toggle('complete', index <= stage);
    nodes[index].classList.toggle('current', index === stage);
  });
  map.style.setProperty('--progress', stage / (mapSteps.length - 1));
  caption.textContent = mapLinks[stage].textContent;
}

let frame = 0;
function scheduleUpdate() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    updateScene();
  });
}
addEventListener('scroll', scheduleUpdate, { passive: true });
addEventListener('resize', scheduleUpdate);
motion.addEventListener('change', scheduleUpdate);
updateScene();

const form = document.querySelector('.diagnostic');
const steps = [...form.querySelectorAll('fieldset')];
const progressLabel = form.querySelector('.form-progress');
const next = form.querySelector('.form-next');
const back = form.querySelector('.form-back');
const status = form.querySelector('.form-status');
let current = 0;
next.disabled = false;

function showStep(index) {
  current = index;
  steps.forEach((step, position) => {
    step.hidden = position !== index;
    step.disabled = position !== index;
  });
  progressLabel.textContent = index < 3 ? `Pregunta ${index + 1} de 3` : 'Orientación inicial';
  back.hidden = index === 0;
  next.textContent = index === 3 ? 'Probar envío' : 'Continuar';
  status.textContent = '';
  steps[index].querySelector('legend').focus({ preventScroll: true });
}

back.addEventListener('click', () => showStep(current - 1));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (current === 3) {
    status.textContent = 'Recorrido de prueba completado. El email no se guardó.';
    return;
  }
  if (current === 2) {
    const goal = form.querySelector('[name="goal"]:checked').value;
    const stage = form.querySelector('[name="stage"]:checked').value;
    form.querySelector('.diagnostic-result').textContent = goal === 'execution' && stage !== 'defining'
      ? 'Si tu estrategia ya está definida, conversemos sobre qué apoyo de ejecución necesita tu equipo.'
      : 'real map puede ayudarte a ordenar el mensaje, la identidad y los canales antes de avanzar.';
  }
  showStep(current + 1);
});
