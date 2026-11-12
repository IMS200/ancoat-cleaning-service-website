import { company } from './content.js';
const serviceList = document.querySelector('#service-list');
company.services.forEach((service, index) => {
  const row = document.createElement('article');
  row.className = 'service-row';
  row.innerHTML = `<span class="service-number">0${index + 1}</span><div><h3></h3><span class="service-tag"></span></div><p></p><a class="service-arrow" href="#contact"><span aria-hidden="true">↗</span></a>`;
  row.querySelector('h3').textContent = service.title;
  row.querySelector('.service-tag').textContent = service.tag;
  row.querySelector('p').textContent = service.detail;
  row.querySelector('a').ariaLabel = `Enquire about ${service.title.toLowerCase()}`;
  row.querySelector('a').addEventListener('click', () => { document.querySelector('#service').value = service.title; });
  serviceList.append(row);
  const option = new Option(service.title, service.title);
  document.querySelector('#service').add(option);
});
company.faqs.forEach(([question, answer]) => {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  const paragraph = document.createElement('p');
  summary.textContent = question; paragraph.textContent = answer;
  details.append(summary, paragraph); document.querySelector('#faq-list').append(details);
});
document.querySelector('#year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const form = document.querySelector('#quote-form');
const status = document.querySelector('#form-status');
const submit = form.querySelector('[type=submit]');
const fields = [...form.querySelectorAll('input, select, textarea')];
const demo = !company.formEndpoint;
if (!demo) {
  document.querySelector('#form-notice').hidden = true;
  document.querySelector('#form-help').textContent = 'Your details will be used to respond to this enquiry. Please avoid including sensitive information.';
  submit.firstChild.textContent = 'Send enquiry ';
}
function validate(field) {
  let message = '';
  const value = field.value.trim();
  if (field.required && !value) message = field.name === 'service' ? 'Please select a service.' : `Please enter ${ {name:'your name',email:'your email address',postcode:'your postcode',message:'a short message about your space'}[field.name] }.`;
  else if (field.name === 'email' && field.validity.typeMismatch) message = 'Enter an email address such as name@example.co.uk.';
  else if (field.name === 'postcode' && !/^(GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i.test(value)) message = 'Enter a UK postcode such as SW1A 1AA.';
  const error = document.querySelector(`#${field.id}-error`);
  error.textContent = message;
  if (message) { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', error.id); }
  else { field.removeAttribute('aria-invalid'); field.removeAttribute('aria-describedby'); }
  return !message;
}
fields.forEach(field => { field.addEventListener('input', () => { if (field.hasAttribute('aria-invalid')) validate(field); status.textContent = ''; }); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  const results = fields.map(validate);
  if (results.includes(false)) { status.textContent = 'Please check the highlighted fields.'; fields[results.indexOf(false)].focus(); return; }
  if (demo) { status.textContent = 'Your demo enquiry is complete. Nothing has been sent or saved; enquiry delivery is not connected yet.'; status.focus(); return; }
  submit.disabled = true; submit.firstChild.textContent = 'Sending… '; form.setAttribute('aria-busy', 'true'); status.textContent = '';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(company.formEndpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))), signal:controller.signal });
    if (!response.ok) throw new Error('Delivery failed');
    status.textContent = 'Thank you. Your enquiry has been sent.'; form.reset();
  } catch { status.textContent = 'Your enquiry could not be sent. Your details are still here; please try again.'; }
  finally { clearTimeout(timeout); submit.disabled = false; submit.firstChild.textContent = 'Send enquiry '; form.removeAttribute('aria-busy'); status.focus(); }
});
