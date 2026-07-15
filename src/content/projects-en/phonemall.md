---
name: PhoneMall
tagline: A self-hosted commerce platform with a RAG shopping assistant
summary: A Spring Cloud and Vue 3 commerce platform covering transactions, inventory, and merchant operations, with a RAG assistant grounded in the current product catalog.
category: application
tier: featured
order: 3
sourceVisibility: private
maturity: alpha
activity: active
demoStatus: unavailable
evidence: verified
license: null
githubUrl: null
demoUrl: null
tech: [Spring Cloud, Vue 3, RAG, MySQL, Docker]
evidenceStats:
  - value: '4'
    label: backend services
    measuredAt: 2026-07-15
  - value: '39'
    label: backend tests
    measuredAt: 2026-07-15
flow: [Customer need, Product retrieval, Candidate constraints, Streaming answer, Purchase decision]
relatedPosts: []
accent: '#b66b36'
---

## The problem

Traditional catalog filters make customers understand dozens of product parameters before they can choose. A generic chat model has the opposite problem: it may invent products, prices, or stock. PhoneMall places the full commerce workflow and a RAG shopping assistant in the same system, grounding recommendations in the current catalog.

## Solution

The system retrieves candidates from products that are currently available, then gives those candidates and the user's constraints to the model. Responses stream through SSE. The model helps explain trade-offs, while product, inventory, and transaction state remain under the control of the business services.

## Business workflow

- Customers, products, SKUs, cart, orders, inventory, payment, cancellation, and refunds.
- Merchant product management, fulfillment, and AI configuration.
- Spring Cloud service governance, MySQL persistence, Redis caching, and self-hosted Docker deployment.

## Verification

The review snapshot dated 2026-07-15 contains four backend services and 39 backend tests. Repository CI also checks the backend, frontend build, Compose and Nginx configuration, source scanning, and container image security. The repository remains private, so this page contains only sanitized case-study information.

## Trade-offs and limitations

The project is still in Alpha. In-memory vector search is best suited to small and medium catalogs. Frontend end-to-end coverage, retrieval evaluation, realistic load baselines, and a consistent demo media package still need work. This page does not claim that the system is a public demo or a production-ready service.

## Next steps

- Add sanitized interface captures, an architecture diagram, and an end-to-end demo video.
- Establish retrieval evaluation and performance baselines.
- Expand frontend end-to-end tests.
- Evaluate a persistent vector index.
