# bounty-lab

Automacao hands-off de DevSecOps com **GitLab Duo Agent Platform**, submetida ao
hackathon **GitLab Transcend - Life After Code** (categoria *Best Hands-off Agent*,
**Path A: Start Fresh**).

## O que fazo

Um push ou uma merge request dispara uma cadeia de agentes que corre o ciclo
pos-codigo **sem intervencao humana**:

1. **Revisao de codigo** - o agente `review_mr` le os ficheiros alterados da MR e
   responde com findings concretos: correcao, seguranca e testes em falta.
2. **Abertura de merge request** - o agente `open_mr` abre a MR para `main` com o
   resumo da revisao como descricao.

O humano recebe apenas o sumario final. E exatamente o padrao descrito no
regulamento do hackathon:

> _"You push code. Agents handle code review, fix a failing pipeline, remediate a
> security finding, and deploy to staging. You get a summary and approve the
> production deployment."_

## Estrutura

| Ficheiro | Descricao |
| --- | --- |
| `.gitlab/duo/flows/slugify-automation-v1.yml` | Flow em **flow registry v1** (2 componentes, 2 routers, 2 prompts). |
| `.gitlab/duo/agent-config.yml` | Definicao dos agentes e das politicas. |
| `.gitlab-ci.yml` | Pipeline: `verify` -> `test` -> `automate`. |
| `src/slugify.js` | Logica de negocio testada. |
| `test/slugify.test.js` | Testes. |
| `scripts/duo-agent-run.js` | Invoca o flow a partir do job de automacao. |
| `LICENSE` | MIT. |

## O flow

`slugify-automation-v1.yml` segue a especificacao **flow registry v1**, a sintaxe
exigida pelos custom flows da Duo Agent Platform:

- `version: "v1"`, `environment: ambient`, `coding_environment: full`
- `components`: `review_mr` (AgentComponent) -> `open_mr` (AgentComponent)
- `routers`: `review_mr` -> `open_mr` -> `end`
- `flow.entry_point: review_mr`
- `prompts`: dois prompts locais (`review_mr_prompt`, `open_mr_prompt`)

Campos como `steps:`, `on_success:`/`on_failure:` ou `uses:` **nao existem** no
schema v1 e seriam rejeitados na validacao. O scan de seguranca, o deploy e a
monitorizacao vivem no `.gitlab-ci.yml`; o gate de aprovacao para producao e
configurado na UI (environments protegidos).

O flow publica-se em **AI -> Flows** (a Duo Agent Platform nao descobre flows a
partir de um ficheiro do repositorio).

## Seguranca

O token entra **exclusivamente** pela variavel CI/CD mascarada `GITLAB_TOKEN`
(Settings -> CI/CD -> Variables -> _Masked_), consumida por:

```bash
glab auth login --hostname gitlab.com --token "$GITLAB_TOKEN"
```

O pipeline **nao** usa `--stdin <<< "$GITLAB_TOKEN"`: um heredoc dessa forma
escreve o valor expandido no log do job, e como o regulamento exige historico de
CI/CD publico, isso exporia o token publicamente.

O binario `glab` e verificado por SHA256 antes de ser extraido.

## Licenca

MIT - ver [LICENSE](./LICENSE).
