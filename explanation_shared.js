/* Shared explanation display helpers for choice & exam pages */

function getExplanation(q) {
  if (typeof QUESTION_EXPLANATIONS === 'undefined') return null;
  return QUESTION_EXPLANATIONS[q.id] || QUESTION_EXPLANATIONS[String(q.id)] || null;
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSteps(steps) {
  if (!steps) return '';
  if (Array.isArray(steps)) {
    const items = steps.map((step, index) => {
      const text = String(step).replace(/^\d+[\.、\)]\s*/, '');
      return `<li><span class="exp-step-num">${index + 1}</span><span class="exp-step-text">${escapeHtml(text)}</span></li>`;
    }).join('');
    return `<ol class="exp-steps">${items}</ol>`;
  }
  return `<p>${escapeHtml(steps)}</p>`;
}

function normalizeMermaid(code) {
  if (!code) return '';
  let text = String(code).trim();
  // Allow storing without diagram type prefix
  if (!/^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|quadrantChart|gitGraph|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment)\b/i.test(text)) {
    text = 'flowchart TB\n' + text;
  }
  return text;
}

function renderDiagramBlock(title, mermaidCode, variant) {
  if (!mermaidCode || !String(mermaidCode).trim()) {
    return `
      <div class="exp-diagram exp-diagram-${variant}">
        <div class="exp-diagram-title">${escapeHtml(title)}</div>
        <p class="exp-diagram-missing">此题暂无架构图。</p>
      </div>
    `;
  }
  const code = normalizeMermaid(mermaidCode);
  return `
    <div class="exp-diagram exp-diagram-${variant}">
      <div class="exp-diagram-title">${escapeHtml(title)}</div>
      <div class="exp-diagram-canvas">
        <pre class="mermaid">${escapeHtml(code)}</pre>
      </div>
    </div>
  `;
}

function renderArchitectureSection(exp) {
  const before = exp.diagram_before || exp.diagramBefore || '';
  const after = exp.diagram_after || exp.diagramAfter || '';
  if (!before && !after) return '';
  return `
    <div class="exp-section exp-diagrams-section">
      <h4>🖼️ 架构对比图</h4>
      <p class="exp-diagram-hint">上为题目现况（Before），下为正确答案架构（After）。</p>
      <div class="exp-diagrams-grid">
        ${renderDiagramBlock('题目现况（Before）', before, 'before')}
        ${renderDiagramBlock('答案架构（After）', after, 'after')}
      </div>
    </div>
  `;
}

async function renderMermaidIn(container) {
  if (!container) return;
  const nodes = container.querySelectorAll('pre.mermaid');
  if (!nodes.length) return;

  if (typeof mermaid === 'undefined') {
    nodes.forEach((node) => {
      const fallback = document.createElement('pre');
      fallback.className = 'exp-diagram-fallback';
      fallback.textContent = node.textContent;
      node.replaceWith(fallback);
    });
    return;
  }

  try {
    // Mermaid v10+: initialize once, then run on new nodes
    if (!window.__sapMermaidReady) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'dark',
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
          nodeSpacing: 30,
          rankSpacing: 40,
        },
      });
      window.__sapMermaidReady = true;
    }
    await mermaid.run({ nodes: Array.from(nodes) });
  } catch (err) {
    console.warn('Mermaid render failed:', err);
    nodes.forEach((node) => {
      if (node.querySelector('svg')) return;
      const fallback = document.createElement('pre');
      fallback.className = 'exp-diagram-fallback';
      fallback.textContent = node.textContent + '\n\n（架构图渲染失败，显示原始文字）';
      node.replaceWith(fallback);
    });
  }
}

function buildFullExplanationHtml(q) {
  const exp = getExplanation(q);
  if (!exp) {
    return '<p class="exp-missing">此题暂无详细解释，稍后会补充。</p>';
  }

  const correct = (q.correct_answers || []).join(', ');
  let optionsHtml = '';
  const letters = Object.keys(exp.options || {}).sort();
  for (const letter of letters) {
    const isCorrect = (q.correct_answers || []).includes(letter);
    const tag = isCorrect ? '<span class="exp-correct-tag">✓ 正确</span>' : '';
    optionsHtml += `
      <div class="exp-option${isCorrect ? ' exp-option-correct' : ''}">
        <div class="exp-option-header"><strong>${letter}.</strong> ${tag}</div>
        <div class="exp-option-body">${escapeHtml(exp.options[letter])}</div>
      </div>
    `;
  }

  // New structured format: blocker → requirements → steps → solutions → result_flow
  const hasNewFormat = exp.blocker || exp.steps || exp.solutions || exp.result_flow;
  const diagramsHtml = renderArchitectureSection(exp);

  if (hasNewFormat) {
    return `
      <div class="exp-section">
        <h4>🚧 1. 目前阻滞</h4>
        <p>${escapeHtml(exp.blocker || '（本题未特别描述现况问题，主要是新需求设计。）')}</p>
      </div>
      ${diagramsHtml}
      <div class="exp-section">
        <h4>📋 2. 提出的要求</h4>
        <p>${escapeHtml(exp.requirements || '')}</p>
      </div>
      <div class="exp-section">
        <h4>🔢 3. 达成步骤</h4>
        ${renderSteps(exp.steps)}
      </div>
      <div class="exp-section">
        <h4>💡 4. 用到的解决方案</h4>
        <p>正确答案：<strong>${correct}</strong></p>
        <p>${escapeHtml(exp.solutions || exp.solution || '')}</p>
      </div>
      <div class="exp-section">
        <h4>🔄 5. 最终结果流程</h4>
        <p>${escapeHtml(exp.result_flow || '')}</p>
      </div>
      <div class="exp-section">
        <h4>🔍 6. 各选项分析</h4>
        ${optionsHtml}
      </div>
    `;
  }

  // Legacy format fallback
  return `
    ${diagramsHtml}
    <div class="exp-section">
      <h4>📋 题目要求</h4>
      <p>${escapeHtml(exp.requirements)}</p>
    </div>
    <div class="exp-section">
      <h4>💡 解题思路</h4>
      <p>${escapeHtml(exp.approach)}</p>
    </div>
    <div class="exp-section">
      <h4>✅ 解决方案</h4>
      <p>正确答案：<strong>${correct}</strong></p>
      <p>${escapeHtml(exp.solution)}</p>
    </div>
    <div class="exp-section">
      <h4>🔍 各选项分析</h4>
      ${optionsHtml}
    </div>
  `;
}

function ensureExplanationModal() {
  if (document.getElementById('explanationModal')) return;
  const modal = document.createElement('div');
  modal.id = 'explanationModal';
  modal.className = 'exp-modal hidden';
  modal.innerHTML = `
    <div class="exp-modal-backdrop" onclick="closeExplanation()"></div>
    <div class="exp-modal-content" role="dialog" aria-labelledby="expModalTitle">
      <div class="exp-modal-header">
        <h3 id="expModalTitle">题目详解</h3>
        <button class="exp-modal-close" onclick="closeExplanation()" aria-label="关闭">×</button>
      </div>
      <div class="exp-modal-body" id="explanationBody"></div>
      <div class="exp-modal-footer">
        <button class="btn btn-primary" onclick="closeExplanation()">关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showExplanation(q) {
  ensureExplanationModal();
  const modal = document.getElementById('explanationModal');
  const body = document.getElementById('explanationBody');
  const title = document.getElementById('expModalTitle');
  title.textContent = `题目 ${q.id} 详解`;
  body.innerHTML = buildExplanationHtml(q);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  // Mermaid needs nodes in DOM first
  renderMermaidIn(body);
}

function closeExplanation() {
  const modal = document.getElementById('explanationModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function buildExplanationHtml(q) {
  const full = buildFullExplanationHtml(q);
  if (typeof buildTwentyReview !== 'function') return full;
  return buildTwentyReview(q) + `<details><summary style="cursor:pointer;padding:12px">需要时再看原始完整解析</summary>${full}</details>`;
}
