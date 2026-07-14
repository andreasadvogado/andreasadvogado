/* ============================================================
   ANDREAS ZAVITSANOS ADVOCACIA — main.js
   Sem dependências. Interações mínimas e acessíveis.
   ============================================================ */
(() => {
  'use strict';

  /* ---------- Header: fundo sólido ao rolar ---------- */
  const topo = document.getElementById('topo');
  const aoRolar = () => topo.classList.toggle('rolou', window.scrollY > 40);
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ---------- Menu mobile ---------- */
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menuMobile');

  const alternarMenu = (abrir) => {
    const aberto = abrir ?? !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', aberto);
    hamburger.setAttribute('aria-expanded', String(aberto));
    hamburger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = aberto ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => alternarMenu());
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => alternarMenu(false))
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) alternarMenu(false);
  });

  /* ---------- Revelação ao entrar na tela ---------- */
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alvos = document.querySelectorAll('.reveal');

  if (reduzMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('em-tela'));
  } else {
    /* Atraso progressivo (stagger) dentro dos grids */
    ['.areas-grid', '.pilares', '.etapas-grid', '.faq-lista'].forEach((sel) => {
      document.querySelectorAll(sel).forEach((grid) => {
        [...grid.children].forEach((filho, i) => {
          const alvo = filho.classList.contains('reveal') ? filho : filho.querySelector('.reveal');
          if (alvo) alvo.style.setProperty('--atraso', `${i * 80}ms`);
        });
      });
    });

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('em-tela');
            obs.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    alvos.forEach((el) => obs.observe(el));
  }

  /* ---------- Ano no rodapé ---------- */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
