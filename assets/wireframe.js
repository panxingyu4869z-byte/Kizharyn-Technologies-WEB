"use strict";

for (const viewer of document.querySelectorAll('.sample-viewer')) {
  const tabs = Array.from(viewer.querySelectorAll('[role="tab"]'));
  /** @param {number} index */
  const select = (index) => {
    tabs.forEach((tab, position) => {
      if (!(tab instanceof HTMLButtonElement)) return;
      tab.setAttribute('aria-selected', String(position === index));
      tab.tabIndex = position === index ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls') || '');
      if (panel instanceof HTMLElement) panel.hidden = position !== index;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      if (!(event instanceof KeyboardEvent)) return;
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      select(next);
      const selected = tabs[next];
      if (selected instanceof HTMLElement) selected.focus();
    });
  });
}

function revealContactInformation() {
  const information = document.querySelector('#privacy');
  if (window.location.hash === '#privacy' && information instanceof HTMLDetailsElement) {
    information.open = true;
  }
}
revealContactInformation();
window.addEventListener('hashchange', revealContactInformation);

// Language links keep the current page and the supported contact context.
function updateLanguageLinks() {
  for (const element of document.querySelectorAll('.language-nav a')) {
    if (!(element instanceof HTMLAnchorElement)) continue;
    const target = new URL(element.href);
    const intent = new URLSearchParams(window.location.search).get('intent');
    if (document.body.dataset.page === 'contact' && (intent === 'research' || intent === 'product')) {
      target.searchParams.set('intent', intent);
    }
    target.hash = window.location.hash;
    element.href = target.href;
  }
}
updateLanguageLinks();
window.addEventListener('hashchange', updateLanguageLinks);

const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');
const mailActions = document.querySelector('#mail-actions');
const mailLink = document.querySelector('#mail-link');
const copyButton = document.querySelector('#copy-mail');
const contactCopy = document.querySelector('#contact-copy');

if (contactForm instanceof HTMLFormElement && contactStatus instanceof HTMLElement && mailActions instanceof HTMLElement && mailLink instanceof HTMLAnchorElement && copyButton instanceof HTMLButtonElement && contactCopy instanceof HTMLScriptElement) {
  /** @type {typeof import('../content/locales/zh.mjs').default.form & {availableInput: string, expectedResult: string, acceptanceCriteria: string}} */
  const messages = JSON.parse(contactCopy.textContent || '{}');
  const form = contactForm;
  const status = contactStatus;
  const actions = mailActions;
  const link = mailLink;
  const copy = copyButton;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
  const messageField = form.elements.namedItem('message');
  const emailField = form.elements.namedItem('email');
  const recipient = link.href.replace(/^mailto:/, '').split('?')[0];
  let currentDraft = '';
  const requestedIntent = new URLSearchParams(window.location.search).get('intent');

  if (requestedIntent === 'research' || requestedIntent === 'product') {
    const choice = form.querySelector(`input[name="intent"][value="${requestedIntent}"]`);
    if (choice instanceof HTMLInputElement) choice.checked = true;
  }

  function resetDraft() {
    if (messageField instanceof HTMLTextAreaElement) messageField.setCustomValidity('');
    if (emailField instanceof HTMLInputElement) emailField.setCustomValidity('');
    if (!currentDraft) return;
    currentDraft = '';
    actions.hidden = true;
    link.href = `mailto:${recipient}`;
    status.textContent = messages.changed;
  }

  form.addEventListener('input', resetDraft);
  form.addEventListener('change', resetDraft);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!(messageField instanceof HTMLTextAreaElement) || !(emailField instanceof HTMLInputElement)) return;
    messageField.setCustomValidity(messageField.value.trim() ? '' : messages.messageRequired);
    emailField.setCustomValidity(emailField.value.trim() ? '' : messages.emailRequired);
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const intent = values.get('intent');
    if (intent !== 'research' && intent !== 'product') return;
    const subject = messages[intent];
    const email = String(values.get('email') ?? '').trim();
    const name = String(values.get('name') ?? '').trim();
    const organization = String(values.get('organization') ?? '').trim();
    const message = String(values.get('message') ?? '').trim();
    const body = [
      `${messages.intent}${messages.separator}${subject}`,
      `${messages.email}${messages.separator}${email}`,
      ...(name ? [`${messages.name}${messages.separator}${name}`] : []),
      ...(organization ? [`${messages.organization}${messages.separator}${organization}`] : []),
      '', `${messages.message}${messages.separator}`, message,
      ...(['availableInput', 'expectedResult', 'acceptanceCriteria']).flatMap(key => {
        const value = String(values.get(key) ?? '').trim();
        const label = key === 'availableInput' ? messages.availableInput : key === 'expectedResult' ? messages.expectedResult : messages.acceptanceCriteria;
        return value ? ['', `${label}${messages.separator}`, value] : [];
      }),
    ].join('\n');

    currentDraft = `${messages.recipient}${messages.separator}${recipient}\n${messages.subject}${messages.separator}${subject}\n\n${body}`;
    link.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    actions.hidden = false;
    status.textContent = messages.ready;
    link.focus({ preventScroll: true });
  });

  copy.addEventListener('click', async () => {
    if (!currentDraft) return;
    const copiedDraft = currentDraft;
    try {
      await navigator.clipboard.writeText(copiedDraft);
      if (copiedDraft === currentDraft) status.textContent = messages.copied;
    } catch {
      if (copiedDraft === currentDraft) status.textContent = messages.copyFailed;
    }
  });
}
