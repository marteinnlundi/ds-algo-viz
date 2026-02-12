/**
 * Shared logic for step-by-step visualizations.
 * Provides: playback (autoplay / step), pseudocode display, step timing.
 * Each page must: set STEP_MS, call setupPlayback(STEP_MS, getAnimating, setBtns), use step() and showPseudo().
 */
(function (global) {
  'use strict';

  var STEP_MS = 900;
  var _resolveStep = null;

  function getAutoplay() {
    var el = document.getElementById('modeAutoplay');
    return el ? el.checked : true;
  }

  function waitForStep() {
    return new Promise(function (resolve) {
      global._resolveStep = resolve;
    });
  }

  function step() {
    return getAutoplay()
      ? new Promise(function (r) { setTimeout(r, STEP_MS); })
      : waitForStep();
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   * Show pseudocode lines with one active line and an optional message.
   * @param {string} logId - ID of the log element (default 'log')
   * @param {string[]} lines - Array of pseudocode lines
   * @param {number} activeIndex - Index of the current line (-1 for none)
   * @param {string} [message] - Optional message below the code
   */
  function showPseudo(logId, lines, activeIndex, message) {
    if (typeof logId !== 'string') {
      message = activeIndex;
      activeIndex = lines;
      lines = logId;
      logId = 'log';
    }
    var el = document.getElementById(logId);
    if (!el) return;
    var codeHtml = (lines && lines.length)
      ? lines.map(function (line, i) {
          var active = i === activeIndex ? ' active' : '';
          return '<span class="pseudo-line' + active + '">' + esc(line) + '</span>';
        }).join('')
      : '';
    el.innerHTML = codeHtml + (message ? '<span class="message">' + esc(message) + '</span>' : '');
  }

  /**
   * Wire playback controls and store step duration.
   * @param {number} stepMs - Delay in ms for autoplay
   * @param {function(): boolean} getAnimating - Returns true when an animation is running
   * @param {function(boolean)} setBtns - Called with true to enable buttons, false when animating
   */
  function setupPlayback(stepMs, getAnimating, setBtns) {
    STEP_MS = stepMs;
    var nextBtn = document.getElementById('btnNextStep');
    var modeAutoplay = document.getElementById('modeAutoplay');
    var modeStep = document.getElementById('modeStep');

    if (modeAutoplay) {
      modeAutoplay.addEventListener('change', function () {
        if (nextBtn) nextBtn.disabled = true;
      });
    }
    if (modeStep) {
      modeStep.addEventListener('change', function () {
        if (nextBtn && getAnimating && getAnimating()) nextBtn.disabled = false;
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (global._resolveStep) {
          global._resolveStep();
          global._resolveStep = null;
        }
      });
    }
  }

  global.VizCommon = {
    step: step,
    waitForStep: waitForStep,
    getAutoplay: getAutoplay,
    showPseudo: showPseudo,
    esc: esc,
    setupPlayback: setupPlayback,
    get STEP_MS() { return STEP_MS; }
  };
})(typeof window !== 'undefined' ? window : this);
