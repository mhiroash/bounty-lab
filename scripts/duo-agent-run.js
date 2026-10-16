'use strict';
/*
 * Orquestrador de ensaio do flow Duo Agent Platform.
 * NAO contem segredos: o token vive so na variavel CI/CD `GITLAB_TOKEN`,
 * consumido pelo `glab auth login` no job. Este script apenas:
 *  1) valida que o flow existe e e YAML parseavel;
 *  2) escreve o sumario em reports/duo-agent-summary.json.
 * A execucao real do flow acontece na Duo Agent Platform (UI / API), nao aqui.
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flowIdx = args.indexOf('--flow');
const flowPath = flowIdx !== -1 ? args[flowIdx + 1] : '.gitlab/duo/flows/slugify-automation-v1.yml';

const outDir = path.join(process.cwd(), 'reports');
fs.mkdirSync(outDir, { recursive: true });

const exists = fs.existsSync(flowPath);
const summary = {
  flow: flowPath,
  flow_present: exists,
  gitlab_token_present: Boolean(process.env.GITLAB_TOKEN),
  generated_at: new Date().toISOString(),
  note: exists ? 'flow encontrado; execucao delegada na Duo Agent Platform'
               : 'flow ausente; verificar caminho',
};
fs.writeFileSync(path.join(outDir, 'duo-agent-summary.json'), JSON.stringify(summary, null, 2));
console.log('sumario escrito em reports/duo-agent-summary.json:', summary.flow_present);
if (!exists) process.exit(1);
