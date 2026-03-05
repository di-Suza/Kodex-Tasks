  const log = document.getElementById('logBox');
  const nodeInfo = document.getElementById('nodeInfo');

  function addLog(msg, type = '') {
    const p = document.createElement('p');
    p.className = type;
    p.textContent = `> ${msg}`;
    log.prepend(p);
  }

  // querySelectorAll — select all cards
  const allCards = document.querySelectorAll('.card');

  // Add click event to every card using querySelectorAll
  allCards.forEach(card => {
    card.addEventListener('click', () => {
      allCards.forEach(c => c.classList.remove('clicked'));
      card.classList.toggle('highlighted');
      card.classList.add('clicked');
      const title = card.querySelector('.card-title').textContent;
      addLog(`Card clicked: "${title}" — topic: ${card.dataset.topic}`, 'click-log');
    });

    card.addEventListener('mouseenter', () => {
      const title = card.querySelector('.card-title').textContent;
      addLog(`Hovered: ${title}`, 'hover-log');
    });
  });

  // Highlight all titles using querySelectorAll
  document.getElementById('btnHighlight').addEventListener('click', () => {
    const titles = document.querySelectorAll('.card-title');
    titles.forEach(t => t.style.color = 'var(--accent)');
    addLog(`querySelectorAll('.card-title') → ${titles.length} elements found & highlighted`, 'click-log');
  });

  // Flash all tags
  document.getElementById('btnTags').addEventListener('click', () => {
    const tags = document.querySelectorAll('.card-tag');
    tags.forEach(tag => {
      tag.style.background = 'var(--accent2)';
      tag.style.color = '#fff';
      tag.style.borderColor = 'var(--accent2)';
    });
    addLog(`querySelectorAll('.card-tag') → ${tags.length} tags styled`, 'tag-log');
  });

  // Reset
  document.getElementById('btnReset').addEventListener('click', () => {
    allCards.forEach(c => {
      c.classList.remove('highlighted', 'clicked');
    });
    document.querySelectorAll('.card-title').forEach(t => t.style.color = '');
    document.querySelectorAll('.card-tag').forEach(t => {
      t.style.background = '';
      t.style.color = '';
      t.style.borderColor = '';
    });
    addLog('Reset all card states', '');
  });

  // Count childNodes of each card
  document.getElementById('btnCount').addEventListener('click', () => {
    let summary = [];
    allCards.forEach((card, i) => {
      // childNodes includes text nodes, element nodes etc.
      const allChildNodes = card.childNodes;
      const elementNodes = [...allChildNodes].filter(n => n.nodeType === 1);
      const textNodes = [...allChildNodes].filter(n => n.nodeType === 3 && n.textContent.trim());
      const title = card.querySelector('.card-title').textContent;
      summary.push(`Card "${title}": ${allChildNodes.length} childNodes total (${elementNodes.length} elements, ${textNodes.length} text)`);
    });

    nodeInfo.innerHTML = summary.map(s =>
      `<span style="color:var(--accent3)">${s}</span>`
    ).join(' &nbsp;|&nbsp; ');

    addLog(`childNodes counted across ${allCards.length} cards`, 'tag-log');
    summary.forEach(s => addLog(s, 'tag-log'));
  });