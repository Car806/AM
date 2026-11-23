import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildProjectWhatsAppMessage,
  buildWhatsAppUrl,
  isValidWhatsAppNumber,
  sanitizeWhatsAppNumber,
} from './whatsapp';
import { getVisibleProjects, hasRenderableProjects, REAL_PROJECTS } from '../data/projects';

test('sanitizeWhatsAppNumber strips formatting and rejects placeholder values', () => {
  assert.equal(sanitizeWhatsAppNumber('+52 3333040082'), '523333040082');
  assert.equal(sanitizeWhatsAppNumber('523333040082'), '523333040082');
  assert.equal(sanitizeWhatsAppNumber('TU_NUMERO_AQUI'), '');
  assert.equal(sanitizeWhatsAppNumber('123'), '');
  assert.equal(isValidWhatsAppNumber('523333040082'), true);
  assert.equal(isValidWhatsAppNumber('TU_NUMERO_AQUI'), false);
});

test('buildWhatsAppUrl encodes text properly and returns null on invalid number', () => {
  const url = buildWhatsAppUrl('523333040082', 'Hola, quiero una página web!');
  assert.equal(
    url,
    'https://wa.me/523333040082?text=Hola%2C%20quiero%20una%20p%C3%A1gina%20web!'
  );
  assert.equal(buildWhatsAppUrl('TU_NUMERO_AQUI', 'Hola'), null);
});

test('buildProjectWhatsAppMessage includes exact project name', () => {
  const msg = buildProjectWhatsAppMessage('Black Heaven');
  assert.ok(msg.includes('Black Heaven'));
});

test('portfolio visibility helpers respect initial limit, expansion, and empty state', () => {
  assert.equal(hasRenderableProjects(REAL_PROJECTS), true);
  assert.equal(hasRenderableProjects([]), false);
  assert.equal(getVisibleProjects(REAL_PROJECTS, false, 4).length, 4);
  assert.equal(getVisibleProjects(REAL_PROJECTS, true, 4).length, REAL_PROJECTS.length);
  assert.equal(getVisibleProjects([], false, 4).length, 0);
});
