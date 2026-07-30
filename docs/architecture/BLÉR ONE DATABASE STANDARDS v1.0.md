BLÉR ONE DATABASE STANDARDS v1.0

Versão: 1.0
Status: Aprovado
Projeto: Blér One ERP SaaS
Objetivo: Definir os padrões oficiais para modelagem do banco de dados do Blér One.

1. Princípios

Toda modelagem do banco deverá seguir os princípios abaixo:

Multi-Tenant por padrão.
DDD (Domain Driven Design).
Modular Monolith.
PostgreSQL.
Prisma ORM.
UUID como chave primária.
Soft Delete.
Auditoria completa.
Alta legibilidade.
Baixo acoplamento.
Evolução sem quebra de compatibilidade.
2. Hierarquia Oficial
Platform
│
└── Tenant
      │
      └── Organization
             │
             ├── Company
             │      │
             │      ├── Unit
             │      └── Unit
             │
             └── Company

Definições:

Tenant → Cliente da plataforma.
Organization → Grupo empresarial.
Company → Empresa jurídica (CNPJ).
Unit → Filial, loja, clínica, escritório, unidade operacional.
3. Chaves Primárias

Todas as entidades utilizarão UUID.

Padrão:

id String @id @default(uuid()) @db.Uuid

Nunca utilizar:

Int
BigInt
Auto Increment
4. Multi-Tenant

Toda entidade de negócio deverá possuir:

tenantId String @db.Uuid

tenant Tenant @relation(...)

Mesmo quando existir outro relacionamento que permita descobrir o Tenant.

Objetivos:

isolamento dos dados;
performance;
segurança;
Row-Level Security;
consultas simplificadas.
5. Soft Delete

É proibido excluir registros fisicamente.

Toda entidade deverá possuir:

deletedAt DateTime?
6. Auditoria

Toda entidade deverá possuir:

createdAt DateTime @default(now())

updatedAt DateTime @updatedAt

Posteriormente:

createdById String?

updatedById String?

deletedById String?
7. Controle de Concorrência

Toda entidade deverá possuir:

version Int @default(1)
8. Status

Toda entidade deverá possuir:

active Boolean @default(true)
9. Ordem Oficial dos Campos

Todos os models seguirão exatamente esta ordem:

1. Primary Key

2. Tenant

3. Foreign Keys

4. Relacionamentos principais

5. Identificação

6. Dados do domínio

7. Status

8. Auditoria

9. Relacionamentos filhos

10. Índices

11. @@map()

Nenhuma exceção.

10. Nome das Tabelas

Sempre plural.

Exemplos:

tenants
organizations
companies
units
users
people
customers
products
appointments
11. Nome dos Campos FK

Sempre:

tenantId

organizationId

companyId

unitId

userId

personId

Nunca:

tenant

company

organization

para armazenar o identificador.

12. Índices

Toda chave estrangeira deverá possuir índice.

Exemplo:

@@index([tenantId])

@@index([companyId])

@@index([organizationId])
13. Constraints

Sempre que possível:

@@unique([...])

em vez de validações apenas na aplicação.

14. Convenção de Nomes

Model:

Company

Tabela:

companies

Campo:

tradeName

Nunca utilizar:

trade_name

O banco utilizará camelCase através do Prisma.

15. Convenção de Comentários

Cada model deverá iniciar com:

////////////////////////////////////////////////////////////
/// COMPANY
////////////////////////////////////////////////////////////

Cada seção deverá possuir comentários claros.

16. Relacionamentos

Sempre declarar:

fields
references
onUpdate
onDelete

Exemplo:

@relation(
  fields: [companyId],
  references: [id],
  onUpdate: Cascade,
  onDelete: Restrict
)

Nunca utilizar relações implícitas quando houver chave estrangeira explícita.

17. Normalização

Evitar duplicação de dados.

A única redundância permitida por padrão será:

tenantId

para otimização de consultas e isolamento multi-tenant.

18. Evolução

Novos módulos deverão seguir obrigatoriamente este documento.

Qualquer alteração neste padrão deverá gerar uma nova versão do documento.

Aprovação

Versão: 1.0

Status: Aprovado

Aplicação: Obrigatória para todo o banco de dados do Blér One.