# 📝 Text Justification API

A REST API that justifies text to 80 characters per line with rate limiting (80,000 words per day per user).

## 🌐 Live Demo

**API URL:** https://justify-text-david-bouhaben.onrender.com

**Quick Test:**
```bash
# Generate a token
curl -X POST https://justify-text-david-bouhaben.onrender.com/api/token \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' 
```

## 🚀 Features

- ✅ **Text Justification**: Justifies text to exactly 80 characters per line
- ✅ **Token-based Authentication**: Secure Bearer token authentication
- ✅ **Rate Limiting**: 80,000 words per day per user with automatic 24h reset
- ✅ **TypeScript**: Full type safety and modern ES modules
- ✅ **Comprehensive Testing**: Unit and integration tests with Vitest

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies](#technologies)

## 🔧 Installation

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Darkheadbanger/justify-text-david-bouhaben.git

# Navigate to project directory
cd justify-text-david-bouhaben

# Install dependencies
npm install

# Build the project
npm run build
```

## 🎯 Usage

### Development Mode

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### Production Mode

```bash
npm run build
npm start
```

## 📡 API Endpoints

### 1. Generate Token

**Endpoint:** `POST /api/token`

**Description:** Generates or retrieves an authentication token for a given email.

**Request:**
```http
POST /api/token HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/plain

d4f5e6a7-8b9c-1d2e-3f4a-5b6c7d8e9f0a
```

**Status Codes:**
- `200` - Token generated or retrieved successfully
- `400` - Invalid email format

---

### 2. Justify Text

**Endpoint:** `POST /api/justify`

**Description:** Justifies the provided text to 80 characters per line.

**Request:**
```http
POST /api/justify HTTP/1.1
Content-Type: text/plain
Authorization: Bearer d4f5e6a7-8b9c-1d2e-3f4a-5b6c7d8e9f0a

Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire: Je m'endors.
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/plain

Longtemps,  je  me  suis  couché  de  bonne heure. Parfois, à peine ma
bougie  éteinte,  mes  yeux  se  fermaient  si  vite  que je n'avais pas
le temps de me dire: Je m'endors.
```

**Status Codes:**
- `200` - Text justified successfully
- `400` - Empty or invalid text
- `401` - Missing or invalid authentication token
- `402` - Daily word limit exceeded (80,000 words)

## 💡 Examples

### Using cURL

#### Generate Token
```bash
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### Justify Text
```bash
curl -X POST http://localhost:3000/api/justify \
  -H "Content-Type: text/plain" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "Your text to justify here. It should be long enough to span multiple lines when justified to 80 characters."
```

### Using JavaScript (fetch)

```javascript
// Generate token
const tokenResponse = await fetch('http://localhost:3000/api/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
const token = await tokenResponse.text();

// Justify text
const justifyResponse = await fetch('http://localhost:3000/api/justify', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Authorization': `Bearer ${token}`
  },
  body: 'Your long text to justify goes here...'
});
const justifiedText = await justifyResponse.text();
console.log(justifiedText);
```

### Using Insomnia/Postman

1. **Create Token Request:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/token`
   - Headers: `Content-Type: application/json`
   - Body: `{"email": "test@example.com"}`

2. **Create Justify Request:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/justify`
   - Headers: 
     - `Content-Type: text/plain`
     - `Authorization: Bearer {token-from-step-1}`
   - Body: Your text to justify

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Test UI (Interactive)
```bash
npm run test:ui
```

### Test Structure
- ✅ **11 tests** - Storage service (rate limiting, token management)
- ✅ **7 tests** - Justify service (text justification algorithm)
- ✅ **4 tests** - Word counter service
- ✅ **7 tests** - Authentication middleware
- ✅ **8 tests** - CORS middleware
- ✅ **16 tests** - Integration tests (full API flow)
- ✅ **5 tests** - Justify controller
- ✅ **4 tests** - Token controller

**Total: 60+ tests with full coverage**

## 📁 Project Structure

```
justify-text-david-bouhaben/
├── src/
│   ├── __tests__/           # Integration tests
│   │   ├── app.test.ts
│   │   └── normalizePort.test.ts
│   ├── controllers/         # Request handlers
│   │   ├── __tests__/
│   │   │   └── justify.test.ts
│   │   ├── justify.controller.ts
│   │   └── token.controller.ts
│   ├── middlewares/         # Express middlewares
│   │   ├── __tests__/
│   │   │   ├── auth.test.ts
│   │   │   └── cors.test.ts
│   │   ├── auth.middleware.ts
│   │   └── cors.middleware.ts
│   ├── routes/              # API routes
│   │   ├── justify.route.ts
│   │   └── tokens.route.ts
│   ├── services/            # Business logic
│   │   ├── __tests__/
│   │   │   ├── justify.test.ts
│   │   │   ├── storage.test.ts
│   │   │   └── words-counter.test.ts
│   │   ├── interfaces/
│   │   │   ├── justify.interface.ts
│   │   │   └── storage.interface.ts
│   │   ├── justify.service.ts
│   │   ├── storage.service.ts
│   │   └── word-counter.service.ts
│   ├── types/               # TypeScript types
│   │   ├── express/
│   │   │   └── index.d.ts
│   │   └── interfaces/
│   │       └── server.interfaces.ts
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## 🛠 Technologies

- **Runtime:** Node.js
- **Framework:** Express.js v5.1.0
- **Language:** TypeScript v5.9.3
- **Testing:** Vitest v3.2.4 + Supertest
- **Architecture:** MVC (Model-View-Controller)
- **Storage:** In-memory Maps (tokens, rate limiting)
- **Auth:** Bearer Token

## 🧮 Algorithm Details

### Text Justification Algorithm

The justification algorithm works in three steps:

1. **Split into lines**: Divide text into lines that don't exceed 80 characters
2. **Justify each line**: Distribute spaces evenly between words
3. **Keep last line left-aligned**: The final line is not justified

#### Space Distribution

For a line with `n` words and `totalSpaces` to distribute:
- **Base spaces per gap**: `Math.floor(totalSpaces / (n-1))`
- **Extra spaces**: `totalSpaces % (n-1)` distributed left to right

**Example:**
```
Input:  "Longtemps, je me suis couché de bonne heure."
Output: "Longtemps,  je  me  suis  couché  de  bonne heure."
         ^         ^^  ^^    ^^      ^^  ^     (80 chars exactly)
```

### Rate Limiting Algorithm

- **Limit:** 80,000 words per 24 hours per token
- **Storage:** `Map<token, {wordCount, lastReset}>`
- **Auto-reset:** Counter resets after 24h (86,400,000 ms)
- **Check:** Before justification, verify: `currentCount + newWords ≤ 80,000`
- **Record:** After successful justification, increment counter

## 🔐 Security Notes

- Tokens are UUIDs generated with `crypto.randomUUID()`
- Bearer token authentication required for `/api/justify`
- Email validation with regex pattern
- CORS enabled for cross-origin requests
- Rate limiting prevents abuse

## 📝 License

ISC License - Copyright (c) 2025 David Bouhaben

## 👤 Author

**David Bouhaben**
- GitHub: [@Darkheadbanger](https://github.com/Darkheadbanger)
- Project: [justify-text-david-bouhaben](https://github.com/Darkheadbanger/justify-text-david-bouhaben)

## 🤝 Contributing

This is a technical test project. Feel free to fork and experiment!

---

**Made with ❤️ for TicTacTrip technical test**