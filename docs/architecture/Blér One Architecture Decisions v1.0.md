Status: APROVADO
Versão: 1.0
Fase: Encerramento da Fase 1 (Arquitetura)
Objetivo: Registrar as decisões arquitetônicas permanentes do Blér One.

ADR-001 — O Blér One é uma Plataforma, não um Sistema
Decisão

O Blér One será desenvolvido como uma plataforma modular de gestão empresarial.

Consequências
novos módulos poderão ser adicionados futuramente;
empresas utilizarão apenas os módulos necessários;
funcionalidades opcionais não impactarão empresas que não as utilizam.
ADR-002 — Multi-Tenant por padrão
Decisão

Todo dado pertence obrigatoriamente a um Tenant.

Nenhuma entidade de negócio poderá existir sem isolamento de tenant.

Estrutura
Tenant
    ↓
Company
    ↓
Unit
ADR-003 — Empresa e Unidade são conceitos diferentes

Empresa representa a organização.

Unidade representa o local operacional.

Nunca misturar os dois conceitos.

ADR-004 — Crescimento sem troca de sistema

O crescimento da empresa nunca poderá exigir reescrita do ERP.

O mesmo sistema deve atender desde:

uma única unidade;

até:

grupos empresariais;
redes;
franquias;
centenas de unidades.
ADR-005 — Recursos opcionais

Toda funcionalidade poderá assumir um dos estados.

Ativa
Inativa
Não se aplica

O estado Não se aplica remove a funcionalidade da experiência da empresa.

ADR-006 — Configuração acima de Customização

Sempre que possível.

Resolver diferenças através de:

parâmetros;
políticas;
configurações.

Nunca criar versões específicas do sistema para clientes.

ADR-007 — Arquitetura Modular

Os módulos oficiais são.

Kernel
CRM
Catálogo
Agenda
Operação
Financeiro
Estoque
Compras
Comissões
Fiscal
Comunicação
BI
IA
Automações
Integrações
Portal Cliente
Portal Colaborador
ADR-008 — DDD

Cada módulo possui seu próprio domínio.

Nenhum módulo implementa regras de negócio pertencentes a outro domínio.

ADR-009 — Comunicação por Eventos

Módulos não chamam diretamente outros módulos.

Eles publicam eventos.

Exemplo.

CommandFinished

↓

Financeiro

↓

Estoque

↓

CRM

↓

Comissões

↓

BI
ADR-010 — Monólito Modular

A primeira arquitetura será um Monólito Modular.

A separação entre módulos permitirá futura migração para microsserviços caso necessário.

ADR-011 — PostgreSQL

O banco oficial será PostgreSQL.

Utilizar apenas um banco lógico.

A separação ocorrerá pelos domínios da aplicação.

ADR-012 — Prisma ORM

Toda persistência será implementada utilizando Prisma.

O Schema Prisma será a referência oficial da estrutura de dados.

ADR-013 — UUID

Todas as entidades utilizarão UUID como identificador principal.

ADR-014 — Auditoria Obrigatória

Toda alteração relevante deverá registrar.

antes;
depois;
usuário;
data;
motivo (quando exigido).
ADR-015 — Soft Delete

Nenhum dado importante será removido fisicamente.

Utilizar:

active
deletedAt
deletedBy
ADR-016 — Capabilities

Autorização nunca dependerá do nome da Role.

Sempre verificar Capabilities.

Exemplo.

customer.create

financial.view

appointment.cancel

Roles apenas agrupam capabilities.

ADR-017 — Pessoa Separada do Usuário

Modelagem oficial.

Person

↓

User

↓

Collaborator

↓

Customer

↓

Supplier

Pessoa representa identidade.

Usuário representa acesso.

ADR-018 — Comanda é o Centro da Operação

Toda execução operacional ocorre através da Comanda.

Agenda não substitui Comanda.

Financeiro não substitui Comanda.

ADR-019 — Catálogo Universal

Todo item comercial pertence ao Catálogo.

Tipos oficiais.

Serviço
Produto
Pacote
Assinatura
Gift Card
Evento
Curso
Bônus
Cortesia
Ajuste
ADR-020 — Agenda Inteligente

Agenda reserva recursos.

Nunca apenas horários.

Recursos incluem.

profissional;
ambiente;
equipamento;
auxiliar.
ADR-021 — Financeiro registra fatos econômicos

Operação executa.

Financeiro registra.

Jamais misturar responsabilidades.

ADR-022 — Comissão baseada em Snapshot

A comissão nunca será recalculada retroativamente por alteração de regras.

Cada cálculo gera um snapshot permanente.

ADR-023 — Fiscal desacoplado

O Blér One não emite documentos fiscais diretamente.

Toda emissão ocorre através de provedores integrados.

ADR-024 — BI somente leitura

Business Intelligence nunca altera dados operacionais.

ADR-025 — IA como apoio

A Inteligência Artificial.

Pode:

recomendar;
prever;
resumir;
sugerir.

Não decide automaticamente, salvo quando uma automação autorizada pela empresa permitir.

ADR-026 — Central de Relacionamento

Toda comunicação da empresa passa por um único módulo.

Independentemente do canal.

WhatsApp
Email
SMS
Push
Chat
ADR-027 — Portais reutilizam o ERP

Portal do Cliente.

Portal do Colaborador.

Nunca possuem regras próprias.

Ambos utilizam os mesmos serviços do ERP.

ADR-028 — Kernel independente

O Kernel jamais dependerá de módulos de negócio.

Contém apenas.

autenticação;
usuários;
empresas;
permissões;
auditoria;
eventos;
configurações;
storage.
ADR-029 — Configuração Empresarial

Cada empresa poderá configurar.

módulos;
recursos;
IA;
automações;
integrações;
layouts;
branding;
preferências.
ADR-030 — Evolução Permanente

Toda nova funcionalidade deverá respeitar obrigatoriamente os ADRs anteriores.

Nenhum desenvolvimento poderá violar uma decisão arquitetônica aprovada sem criação de um novo ADR que substitua formalmente a decisão anterior.

Estado Oficial da Arquitetura

Com a aprovação deste documento, ficam oficialmente congeladas as seguintes decisões:

Arquitetura da plataforma.
Organização dos módulos.
Modelo Multi-Tenant.
Estrutura Empresa → Unidade.
Filosofia de funcionalidades opcionais.
Modelo de permissões baseado em Capabilities.
Arquitetura orientada a eventos.
Monólito Modular como arquitetura inicial.
PostgreSQL + Prisma como base de persistência.
Padrões de auditoria e Soft Delete.
Kernel como núcleo independente.
IA como apoio à decisão.
Configuração acima de customização.

Qualquer alteração futura deverá ser registrada por meio de um novo ADR, preservando o histórico das decisões arquitetônicas.

Minha sugestão antes da Sprint 66

Eu criaria um repositório docs na raiz do projeto e este documento seria o primeiro arquivo:

/docs
│
├── architecture/
│   ├── Bler-One-Architecture-Decisions-v1.0.md
│   ├── ADR-Index.md
│   └── Glossary.md
│
├── modules/
├── api/
├── database/
└── diagrams/