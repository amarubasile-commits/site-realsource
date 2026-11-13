const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('visible');
      observer.unobserve(target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
  document.documentElement.classList.add('ready');
}

const sky = document.querySelector('#sky');
const context = sky.getContext('2d');
const hero = document.querySelector('.hero');
const map = document.querySelector('.method');
const mapLinks = [...document.querySelectorAll('.map-progress a')];
const mapSteps = [...document.querySelectorAll('.map-step')];
document.querySelector('.replay').addEventListener('click', () => {
  document.querySelectorAll('.hero-symbol .logo,.hero-symbol .half,.hero-symbol .bolt').forEach(element => {
    element.style.animation = 'none';
    element.getBoundingClientRect();
    element.style.animation = '';
  });
});
function updateMap() {
  const target = innerHeight * .57;
  let active = 0;
  mapSteps.forEach((step, index) => {
    if (step.getBoundingClientRect().top <= target) active = index;
  });
  mapLinks.forEach((link, index) => {
    if (index === active) link.setAttribute('aria-current', 'step');
    else link.removeAttribute('aria-current');
    mapSteps[index].classList.toggle('active', index === active);
  });
  map.style.setProperty('--progress', active / (mapSteps.length - 1));
  document.querySelector('.map-caption').textContent = mapLinks[active].textContent;
  document.querySelectorAll('.map-nodes i').forEach((node, index) => {
    node.classList.toggle('complete', index <= active);
    node.classList.toggle('current', index === active);
  });
  map.style.setProperty('--sheet-angle', ((active - 2) * 1.4) + 'deg');
}
updateMap();
// Pre-render volumetric cloud banks once; scroll only composites the layers.
const cloudLayers = [];
let skyWidth = 0, skyHeight = 0;
function makeCloudLayer(seed, banks) {
  const canvas = document.createElement('canvas');
  canvas.width = skyWidth; canvas.height = skyHeight;
  const ctx = canvas.getContext('2d');
  let state = seed;
  const random = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
  banks.forEach(([x, y, size]) => {
    const radius = skyWidth * size;
    const puffs = Array.from({length:65}, () => {
      const angle = random() * Math.PI * 2;
      const spread = Math.sqrt(random());
      return {x:x*skyWidth+Math.cos(angle)*spread*radius,
        y:y*skyHeight+Math.sin(angle)*spread*radius*.36,
        r:radius*(.12+random()*.23)};
    }).sort((a,b)=>b.y-a.y);
    puffs.forEach(p => {
      const g=ctx.createRadialGradient(p.x-p.r*.2,p.y-p.r*.34,0,p.x,p.y,p.r);
      g.addColorStop(0,'rgba(255,255,250,.98)');
      g.addColorStop(.42,'rgba(250,252,249,.96)');
      g.addColorStop(.7,'rgba(218,231,233,.86)');
      g.addColorStop(.88,'rgba(205,222,229,.45)');
      g.addColorStop(1,'rgba(223,236,237,0)');
      ctx.fillStyle=g; ctx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2);
    });
  });
  return canvas;
}
function paint() {
  if (!context) return;
  const progress = motion.matches ? 0 : Math.min(1, Math.max(0,window.scrollY / hero.offsetHeight));
  context.clearRect(0,0,sky.width,sky.height);
  cloudLayers.forEach((layer,index) => {
    const scale=1+progress*(.08+index*.08);
    const drift=progress*(index===0 ? -35 : 95);
    context.save();
    context.translate(skyWidth/2,skyHeight/2+drift);
    context.scale(scale,scale);
    context.globalAlpha=index===0 ? .78 : 1;
    context.drawImage(layer,-skyWidth/2,-skyHeight/2);
    context.restore();
  });
}
function resize() {
  skyWidth=sky.width=Math.min(1800,Math.round(sky.clientWidth));
  skyHeight=sky.height=Math.round(sky.clientHeight*skyWidth/sky.clientWidth);
  cloudLayers.length=0;
  cloudLayers.push(makeCloudLayer(41,[[-.04,.28,.28],[.96,.24,.24],[.25,.98,.26],[.74,1.02,.32]]));
  cloudLayers.push(makeCloudLayer(87,[[-.10,.70,.34],[1.08,.63,.36],[.05,1.08,.35],[.50,1.17,.40],[1,1.08,.38]]));
  paint();
}
let pending = false;
addEventListener('scroll', () => {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    if (sky.getBoundingClientRect().bottom > 0) paint();
    const travel = Math.min(1, window.scrollY / hero.offsetHeight);
    hero.style.setProperty('--hero-lift', `${travel * -48}px`);
    hero.style.setProperty('--hero-scale', 1 + travel * .19);
    updateMap();
    pending = false;
  });
}, { passive: true });
addEventListener('resize', () => { resize(); updateMap(); });
motion.addEventListener('change', paint);
resize();
