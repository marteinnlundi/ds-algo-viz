/**
 * Hub: category navigation and iframe viewer.
 */
(function () {
  'use strict';

  var categoryNames = {
    'data-structures': 'Data structures',
    'searching': 'Searching algorithms',
    'sorting': 'Sorting algorithms',
    'trees': 'Trees',
    'hashing': 'Hashing',
    'recursive': 'Recursive & classic'
  };

  var currentCategory = null;
  var grid = document.getElementById('grid');
  var home = document.getElementById('home');
  var categories = document.getElementById('categories');
  var gridWrap = document.getElementById('gridWrap');
  var gridTitle = document.getElementById('gridTitle');
  var gridSubtitle = document.getElementById('gridSubtitle');
  var viewer = document.getElementById('viewer');
  var frame = document.getElementById('frame');
  var backBtn = document.getElementById('backBtn');
  var backCategoriesBtn = document.getElementById('backCategoriesBtn');

  function showCategories() {
    currentCategory = null;
    categories.classList.remove('hidden');
    categories.classList.add('visible');
    gridWrap.style.display = 'none';
    backCategoriesBtn.classList.remove('visible');
  }

  function showCategory(catId) {
    currentCategory = catId;
    categories.classList.add('hidden');
    categories.classList.remove('visible');
    gridWrap.style.display = 'block';
    grid.classList.add('visible');
    backCategoriesBtn.classList.add('visible');
    gridTitle.textContent = categoryNames[catId] || catId;
    gridSubtitle.textContent = 'Click a visualization to run it step-by-step.';
    var cards = grid.querySelectorAll('.card');
    cards.forEach(function (card) {
      var cats = (card.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
      card.style.display = cats.indexOf(catId) !== -1 ? '' : 'none';
    });
  }

  var categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(function (catCard) {
    catCard.addEventListener('click', function (e) {
      e.preventDefault();
      var cat = catCard.getAttribute('data-category');
      if (cat) showCategory(cat);
    });
  });

  backCategoriesBtn.addEventListener('click', function (e) {
    e.preventDefault();
    showCategories();
  });

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card');
    if (!card || !card.dataset.src) return;
    if (card.style.display === 'none') return;
    frame.src = card.dataset.src;
    viewer.classList.add('visible');
    backBtn.classList.add('visible');
    home.style.display = 'none';
  });

  backBtn.addEventListener('click', function (e) {
    e.preventDefault();
    frame.src = 'about:blank';
    viewer.classList.remove('visible');
    backBtn.classList.remove('visible');
    home.style.display = '';
    if (currentCategory) {
      showCategory(currentCategory);
    } else {
      showCategories();
    }
  });
})();
