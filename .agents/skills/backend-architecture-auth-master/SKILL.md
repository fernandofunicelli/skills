---
name: backend-architecture-auth-master
description: Módulo Elite de Backend e Autenticação. Padrões de API, Segurança OWASP e gestão de identidade.
category: backend
risk: safe
---

# 🛠️ Backend Architecture & Auth (Elite Module)

Construção de servidores robustos, seguros e escaláveis.

## 1. API Design & Patterns
- **RESTful Best Practices:** Uso correto de verbos HTTP, status codes e HATEOAS.
- **GraphQL:** Esquemas fortemente tipados e resolução eficiente de dados.
- **Service Layer Pattern:** Desacoplamento da lógica de negócio do transporte da API.

## 2. Segurança & Auth
- **OWASP Top 10:** Proteção contra SQL Injection, XSS, CSRF e Broken Auth.
- **Authentication:** Integração com Clerk, Auth.js ou JWT customizado com rotação de chaves.
- **Validation:** Uso obrigatório de Zod para sanitização de todos os inputs e outputs.

## 3. Performance & Resilience
- **Caching Strategies:** Redis para dados voláteis e Cache-Control headers.
- **Rate Limiting:** Proteção contra ataques de negação de serviço e abuso de API.
- **Error Handling:** Tratamento global de exceções e logs estruturados.
