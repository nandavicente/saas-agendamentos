# SaaS de Agendamentos Multi‑Tenant

Plataforma SaaS para gestão de estúdios e serviços profissionais (clínicas, barbearias, salões, estúdios etc.) com suporte multi‑tenant, controle de usuários com papéis, agendamentos, pagamentos e auditoria.

## ✅ Principais Funcionalidades

* Multi‑tenant (cada negócio isolado por `tenantId`)
* Usuários com papéis (`CLIENT`, `PROFESSIONAL`, `ADMIN`, `RECEPTION`)
* Gestão de serviços e agenda por profissional
* Agendamentos com histórico e status
* Pagamentos (PIX, cartão, parcelado)
* Produtos e pacotes de sessões
* Auditoria (`AuditLog`)

---

## 🧱 Stack Técnica

* **API** — Node.js + TypeScript + Express/Fastify
* **ORM** — Prisma + PostgreSQL
* **Auth** — JWT + RBAC por Role + Tenant Isolation
* **Padronização** — ESLint + Prettier + Commit lint
* **Infra** — Docker, CI/CD, Deploy

---

## 📦 Estrutura de Diretórios

```txt
backend/
├── src/
│   ├── modules/
│   ├── middlewares/
│   ├── core/
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── README.md
```

---

## 🗄️ Modelagem (Prisma)

O schema completo com relacionamentos, enum de roles e multi‑tenant está em `prisma/schema.prisma`.

---

## 🚀 Execução

```bash
npm install
npm run db:push        # prisma migrate/ push
npm run seed           # popula base
npm run dev            # inicia api
```

---

## 📡 Exemplos de Rotas HTTP (REST)

### 🔐 Autenticação

```http
POST /auth/register
{
  "name": "João",
  "email": "joao@mail.com",
  "password": "123456",
  "role": "TENANT_ADMIN"
}
```

```http
POST /auth/login
{
  "email": "joao@mail.com",
  "password": "123456"
}
→ 200 { "access_token": "..." }
```

### 👤 Usuários

```http
GET /users
POST /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

### 💈 Serviços

```http
POST /services
{
  "name": "Corte Feminino",
  "price": 120,
  "durationMin": 45,
  "professionalId": 8
}
```

```http
GET /services?professionalId=8
```

### 📆 Agendamentos

```http
POST /appointments
{
  "scheduledAt": "2025-09-20T10:00:00Z",
  "clientId": 2,
  "professionalId": 5,
  "serviceId": 4
}
```

```http
GET /appointments?date=2025-09-20&professionalId=5
```

### 💳 Pagamentos

```http
POST /payments
{
  "appointmentId": 10,
  "amount": 100,
  "method": "PIX"
}
```

### 🕵️ Audit Logs

```http
GET /audit-logs?userId=5&action=DELETE
```

---

## 🐳 Docker

```bash
docker compose up -d --build
```

Serviços esperados no compose:

* postgres (db)
* api (node)
* adminer/pgadmin (opcional)

---

## 🧭 Arquitetura (Visão Geral)

```
[ Client (Web/Mobile) ]
            |
         (HTTP)
            |
      [ API NestJS ] —— JWT/RBAC ——> Auth
            |
        Prisma ORM
            |
        PostgreSQL
            |
       Multi‑Tenant
```

---

## 📌 Próximas Etapas

* Painel Web (React) para admin / recepção / profissional
* Exportação CSV
* Dashboard de métricas
* Integração com gateway de pagamento real
* Multi‑lingual & branding por tenant

---

## 📝 Licença

Projeto em desenvolvimento — licença a definir.

