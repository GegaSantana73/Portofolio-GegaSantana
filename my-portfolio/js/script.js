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
   3. Copy Email Interaction
   ---------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'gega.santana@example.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const originalText = copyBtn.innerText;
      copyBtn.innerText = 'COPIED [✓]';
      copyBtn.style.color = 'var(--color-primary)';
      copyBtn.style.borderColor = 'var(--color-primary)';

      setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.style.color = '';
        copyBtn.style.borderColor = '';
      }, 2500);
    } catch (err) {
      console.warn('Failed to copy to clipboard', err);
    }
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
