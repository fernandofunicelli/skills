---
name: software-architecture-ddd-master
description: Módulo Elite de Arquitetura de Software. DDD, Clean Architecture e padrões de design para sistemas de alta escala.
category: architecture
risk: safe
---

# 🛠️ Software Architecture & DDD (Elite Module)

Práticas avançadas para garantir a modularidade e a evolução sustentável do software.

## 1. Domain-Driven Design (DDD)
- **Bounded Contexts:** Delimitação de fronteiras e Context Mapping.
- **Ubiquitous Language:** Unificação da linguagem entre técnicos e especialistas de negócio.
- **Tactical Patterns:**
    - **Aggregates:** Unidades de consistência de dados.
    - **Value Objects:** Objetos definidos por seus atributos, sem identidade própria.
    - **Domain Services:** Lógica que não pertence a uma entidade específica.

## 2. Clean Architecture
- **Dependency Rule:** Dependências devem apontar para dentro (em direção às regras de negócio).
- **Adapters & Ports:** Desacoplamento de UI, DB e Frameworks.
- **Entities & Use Cases:** O núcleo puro da aplicação.

## 3. Design Patterns
- **Creational:** Factory, Singleton, Builder.
- **Structural:** Adapter, Composite, Proxy.
- **Behavioral:** Observer, Strategy, Command.
- **SOLID:** S (Responsabilidade Única), O (Aberto/Fechado), L (Substituição de Liskov), I (Segregação de Interface), D (Inversão de Dependência).
