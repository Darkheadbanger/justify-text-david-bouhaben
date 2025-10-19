import express from 'express';
import type { Request, Response } from 'express';
import { authenticate } from './src/middlewares/auth.middleware.js';
import { saveToken } from './src/services/storage.service.js';

const app = express();

// Middleware pour parser JSON
app.use(express.json());

// Créer un token de test pour pouvoir tester
saveToken('test@example.com', 'mon-token-de-test-123');
console.log('✅ Token de test créé: mon-token-de-test-123');

// Route de test avec le middleware authenticate
app.get('/test-auth', authenticate, (req: Request, res: Response) => {
  console.log('✅ Authentification réussie !');
  console.log('Token dans req.token:', req.token);
  res.json({ 
    message: 'Authentification réussie !',
    token: req.token 
  });
});

// Route sans auth pour tester
app.get('/test-no-auth', (req: Request, res: Response) => {
  res.json({ message: 'Route sans authentification' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur de test lancé sur http://localhost:${PORT}`);
  console.log('\n📝 Tests à faire:');
  console.log('1. Sans token:');
  console.log(`   curl http://localhost:${PORT}/test-auth`);
  console.log('\n2. Avec mauvais format:');
  console.log(`   curl -H "Authorization: InvalidFormat" http://localhost:${PORT}/test-auth`);
  console.log('\n3. Avec token invalide:');
  console.log(`   curl -H "Authorization: Bearer token-invalide" http://localhost:${PORT}/test-auth`);
  console.log('\n4. Avec token VALIDE:');
  console.log(`   curl -H "Authorization: Bearer mon-token-de-test-123" http://localhost:${PORT}/test-auth`);
  console.log('\n');
});
