/**
 * ============================================================================
 * DIGITAL NOIR ARCHIVE - GEGA SANTANA
 * Application Logic & Micro-Interactions (Vanilla JS)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSystemClock();
  initNavigation();
  initCopyEmail();
  initContactForm();
  initSortVisualizer();
  initStudyTracker();
  initArchivalPortrait();
  initRadarVisualization();
  initScrollReveal();
});

/* ----------------------------------------------------------------------------
   1. Live UTC+7 System Clock
   ---------------------------------------------------------------------------- */
function initSystemClock() {
  const clockElement = document.getElementById('utc-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Compute UTC+7 (Jakarta Time)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const jakartaTime = new Date(utc + 3600000 * 7);

    const hours = String(jakartaTime.getHours()).padStart(2, '0');
    const minutes = String(jakartaTime.getMinutes()).padStart(2, '0');
    const seconds = String(jakartaTime.getSeconds()).padStart(2, '0');

    clockElement.textContent = `SYS: IDN [UTC+7] ${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ----------------------------------------------------------------------------
   2. Navigation, Scroll Spy & Mobile Drawer
   ---------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.classList.toggle('open', isOpen);
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll Spy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        setActiveNavLink(activeId);
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  function setActiveNavLink(id) {
    desktopLinks.forEach(link => {
      if (link.getAttribute('data-nav') === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      if (link.getAttribute('data-nav') === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* ----------------------------------------------------------------------------
   3. Copy Email & Phone Interaction
   ---------------------------------------------------------------------------- */
function initCopyEmail() {
  function setupCopyBtn(btnId, textGetter) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      const text = typeof textGetter === 'function' ? textGetter() : textGetter;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const originalText = btn.innerText;
        btn.innerText = 'COPIED [✓]';
        btn.style.color = 'var(--color-primary)';
        btn.style.borderColor = 'var(--color-primary)';

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2500);
      } catch (err) {
        console.warn('Failed to copy to clipboard', err);
      }
    });
  }

  // Copy Email Button
  setupCopyBtn('copy-email-btn', () => {
    const mailLink = document.querySelector('a[href^="mailto:"]');
    return mailLink ? mailLink.getAttribute('href').replace('mailto:', '').trim() : 'gegasantana73@gmail.com';
  });

  // Copy Phone Button
  setupCopyBtn('copy-phone-btn', () => {
    const phoneLink = document.getElementById('phone-link');
    return phoneLink ? phoneLink.textContent.replace('↗', '').trim() : '+62 812-3456-7890';
  });
}

/* ----------------------------------------------------------------------------
   4. Dispatch Terminal Form
   ---------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const ackBox = document.getElementById('dispatch-ack');
  const submitBtn = document.getElementById('dispatch-btn');

  if (!form || !ackBox || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name')?.value || 'Transmitter';
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>TRANSMITTING...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>DISPATCH TRANSMISSION</span><span class="material-symbols-outlined" style="font-size: 16px;">send</span>`;
      
      ackBox.textContent = `SIGNAL RECEIVED [200 OK]: Thank you, ${name}. Your message has been encrypted and logged into the queue.`;
      ackBox.classList.add('visible');

      form.reset();

      setTimeout(() => {
        ackBox.classList.remove('visible');
      }, 7000);
    }, 800);
  });
}

/* ----------------------------------------------------------------------------
   5. Interactive Sorting Visualizer Simulation
   ---------------------------------------------------------------------------- */
function initSortVisualizer() {
  const runBtn = document.getElementById('run-sort-btn');
  const container = document.getElementById('bar-graph-container');
  const stateIndicator = document.getElementById('sort-state-indicator');
  const stepCount = document.getElementById('sort-step-count');

  if (!runBtn || !container) return;

  let isSorting = false;

  runBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isSorting) return;
    isSorting = true;

    stateIndicator.textContent = 'STATE: SORTING_ACTIVE';
    stateIndicator.style.color = 'var(--color-primary)';

    const heights = [20, 45, 85, 30, 65, 15, 90, 50, 35, 75];
    // Randomize initial heights
    for (let i = heights.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [heights[i], heights[j]] = [heights[j], heights[i]];
    }

    renderBars(heights, -1, -1);

    let step = 0;
    const maxSteps = 12;
    const interval = setInterval(() => {
      step++;
      stepCount.textContent = `STEP: ${step * 25}/${maxSteps * 25}`;

      // Pick two random indices to compare and swap
      const idx1 = Math.floor(Math.random() * heights.length);
      const idx2 = (idx1 + 1) % heights.length;

      if (heights[idx1] > heights[idx2]) {
        [heights[idx1], heights[idx2]] = [heights[idx2], heights[idx1]];
      }

      renderBars(heights, idx1, idx2);

      if (step >= maxSteps) {
        clearInterval(interval);
        heights.sort((a, b) => a - b);
        renderBars(heights, -1, -1, true);
        stateIndicator.textContent = 'STATE: SORT_COMPLETE [PASS]';
        stateIndicator.style.color = 'var(--color-primary)';
        isSorting = false;
      }
    }, 180);
  });

  function renderBars(arr, activeIdx, pivotIdx, isDone = false) {
    container.innerHTML = '';
    arr.forEach((val, i) => {
      const bar = document.createElement('div');
      bar.className = 'sort-bar';
      bar.style.height = `${val}%`;

      if (isDone) {
        bar.style.backgroundColor = 'var(--color-primary)';
      } else if (i === activeIdx) {
        bar.classList.add('active');
        const ptr = document.createElement('span');
        ptr.className = 'ptr-label';
        ptr.textContent = 'PTR';
        bar.appendChild(ptr);
      } else if (i === pivotIdx) {
        bar.classList.add('pivot');
      }

      container.appendChild(bar);
    });
  }
}

/* ----------------------------------------------------------------------------
   6. Interactive Study Tracker Checkboxes & Progress Bar
   ---------------------------------------------------------------------------- */
function initStudyTracker() {
  const taskRows = document.querySelectorAll('.task-row-item');
  const progressLabel = document.getElementById('progress-percentage-label');
  const progressBar = document.getElementById('study-progress-bar');
  const taskCount = document.getElementById('tracker-task-count');

  if (!taskRows.length) return;

  function updateProgress() {
    const total = taskRows.length;
    let completed = 0;

    taskRows.forEach(row => {
      const check = row.querySelector('.task-checkbox-mock');
      if (check && check.classList.contains('checked')) {
        completed++;
      }
    });

    const percent = Math.round((completed / total) * 100);
    if (progressLabel) progressLabel.textContent = `PROGRESSION: ${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (taskCount) taskCount.textContent = `TASKS: ${completed}/${total} COMPLETED`;
  }

  taskRows.forEach(row => {
    row.addEventListener('click', () => {
      const check = row.querySelector('.task-checkbox-mock');
      const badge = row.querySelector('span:last-child');

      if (!check) return;

      const isChecked = check.classList.toggle('checked');
      if (isChecked) {
        check.textContent = '✓';
        if (badge) {
          badge.textContent = 'DONE';
          badge.style.color = 'var(--color-primary)';
        }
      } else {
        check.textContent = '';
        if (badge) {
          badge.textContent = 'PENDING';
          badge.style.color = 'var(--color-outline)';
        }
      }

      updateProgress();
    });
  });

  updateProgress();
}

/* ----------------------------------------------------------------------------
   7. Archival Portrait Specimen & Instant Visual Preview Workflow
   ---------------------------------------------------------------------------- */
function initArchivalPortrait() {
  const photo = document.getElementById('portrait-photo');
  const fallback = document.getElementById('portrait-fallback');
  const filePicker = document.getElementById('portrait-file-picker');
  const resetBtn = document.getElementById('portrait-reset-btn');

  if (!photo || !fallback) return;

  // Check if a persistent user-uploaded preview avatar is saved in localStorage
  const savedAvatar = localStorage.getItem('gega_portfolio_custom_avatar');
  if (savedAvatar) {
    photo.src = savedAvatar;
    if (resetBtn) resetBtn.style.display = 'inline-flex';
  }

  // Handle successful image load
  photo.addEventListener('load', () => {
    photo.classList.remove('is-hidden');
    fallback.classList.add('is-hidden');
  });

  // Handle image error / 404 (falls back gracefully to architectural silhouette)
  photo.addEventListener('error', () => {
    photo.classList.add('is-hidden');
    fallback.classList.remove('is-hidden');
  });

  // Instant visual file picker workflow (Zero-backend, instant browser preview & persistent)
  if (filePicker) {
    filePicker.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        photo.src = dataUrl;
        photo.classList.remove('is-hidden');
        fallback.classList.add('is-hidden');
        try {
          localStorage.setItem('gega_portfolio_custom_avatar', dataUrl);
        } catch (err) {
          console.warn('LocalStorage quota exceeded or unavailable:', err);
        }
        if (resetBtn) resetBtn.style.display = 'inline-flex';
      };
      reader.readAsDataURL(file);
    });
  }

  // Reset to default photo path
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        localStorage.removeItem('gega_portfolio_custom_avatar');
      } catch (err) {
        console.warn('LocalStorage unavailable:', err);
      }
      photo.src = 'assets/images/gega-profile.jpg';
      resetBtn.style.display = 'none';
      if (filePicker) filePicker.value = '';
    });
  }
}

/* ----------------------------------------------------------------------------
   8. Live Interactive Radar Visualization Centerpiece
   ---------------------------------------------------------------------------- */
function initRadarVisualization() {
  const telemetryText = document.getElementById('radar-telemetry-text');
  const box = document.getElementById('vector-matrix-box');
  const wrapper = document.getElementById('vector-matrix-wrapper');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // 1. Subtle 3D Perspective Tilt on Hover
  if (wrapper && box && !prefersReduced.matches) {
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let isHovering = false;

    wrapper.addEventListener('mousemove', (e) => {
      isHovering = true;
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width - 0.5) * 2;
      const ny = (y / rect.height - 0.5) * 2;
      targetTiltX = -ny * 6;
      targetTiltY = nx * 6;
    });

    wrapper.addEventListener('mouseleave', () => {
      isHovering = false;
      targetTiltX = 0;
      targetTiltY = 0;
    });

    function tiltLoop() {
      if (isHovering || Math.abs(currentTiltX) > 0.05 || Math.abs(currentTiltY) > 0.05) {
        currentTiltX += (targetTiltX - currentTiltX) * 0.1;
        currentTiltY += (targetTiltY - currentTiltY) * 0.1;
        box.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      } else {
        box.style.transform = '';
      }
      requestAnimationFrame(tiltLoop);
    }
    requestAnimationFrame(tiltLoop);
  }

  // 2. Continuous Real-time Radar Telemetry Sweep Readout (4.0s period)
  if (telemetryText) {
    const startTime = performance.now();
    const SWEEP_PERIOD_MS = 4000;

    function updateTelemetry(now) {
      const elapsed = (now - startTime) % SWEEP_PERIOD_MS;
      const deg = Math.floor((elapsed / SWEEP_PERIOD_MS) * 360);
      const degStr = String(deg).padStart(3, '0');
      telemetryText.textContent = `SWEEP: ${degStr}° // RADAR: ACTIVE SURVEILLANCE // TARGETS: 04`;
      requestAnimationFrame(updateTelemetry);
    }
    requestAnimationFrame(updateTelemetry);
  }
}

/* ----------------------------------------------------------------------------
   9. Scroll Reveal Animations (IntersectionObserver)
   ---------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

