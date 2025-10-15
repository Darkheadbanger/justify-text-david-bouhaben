import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('App Tests', () => {
  describe('GET /', () => {
    it('should return Hello World message', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        message: 'Hello, World!'
      });
    });
  });

  describe('GET /unknown', () => {
    it('should return 404 for unknown routes', async () => {
      await request(app)
        .get('/unknown')
        .expect(404);
    });
  });
});