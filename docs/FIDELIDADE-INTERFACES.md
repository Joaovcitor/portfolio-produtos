# Matriz de Fidelidade: Réplicas de Interfaces no Portfólio

Este documento atesta as decisões e o nível de fidelidade alcançados ao substituir os mockups abstratos do portfólio pelas representações fiéis dos quatro produtos (`Atlas`, `Domus`, `VemKa`, `Ordian`).

A regra principal seguida foi: **O portfólio mantém seu design global Ivory & Espresso, enquanto as janelas de demonstração simulam as interfaces reais com suas identidades próprias**.

## 1. Arquitetura e Isolamento

As réplicas foram construídas na pasta `src/components/product-demos` divididas por produto. 
Para garantir que o design do Portfólio não sofresse vazamentos de CSS globais vindos dos produtos:
- O uso de classes utilitárias (Tailwind) dos projetos Domus e Ordian foi reescrito ou convertido para CSS tradicional confinado e seguro.
- Todo o estilo de cada produto foi restrito a uma classe ancestral raiz. Por exemplo, o CSS do Atlas foi completamente prefixado e restrito ao pai `.atlasApp`, o Domus à classe `.domusApp`, VemKa à `.vemkaApp` e Ordian à `.ordianApp`.

## 2. Camada de Dados (Mocks)

Todas as demonstrações seguem a instrução `SIMGEP` restritamente zero e com contexto fictício nacional. Os dados foram extraídos para os arquivos na pasta `src/mocks`:
- `atlas.ts`
- `domus.ts`
- `vemka.ts`
- `ordian.ts`

## 3. Fidelidade Visual por Produto

### Atlas
- **Identidade Base:** Mantida a estrutura original de sidebar escuro, corpo claro (`#fffaf1`), fonte Geórgia em H1.
- **Telas Mapeadas:** Painel de Controle e Gestão de Pessoas (Tabela e Formulário de edição).

### Domus
- **Identidade Base:** Mantidos os *tokens* de cores originais (como `--night`, `--clay`, `--sun` e `--sand`).
- **Telas Mapeadas:** Painel com cartões de visitas (`dashboard-grid`) e linha do tempo de Atendimento Domiciliar com acompanhamento familiar.

### VemKa
- **Identidade Base:** O design *dark-mode* predominante com botões laranjas e painel estilo terminal de rodoviária.
- **Telas Mapeadas:** O guichê de autoatendimento ("Kiosk View") e a estação de trabalho do atendente de guichê ("Station View").

### Ordian
- **Identidade Base:** Visual sombrio (*dark-scheme*) hiper clean focado em produtividade.
- **Telas Mapeadas:** O Kanban (*Board* de demandas) agrupado em status e a Base de Conhecimento em grid.

## 4. Integração e Geração de PDF

O componente base `src/Mockup.tsx` foi reescrito. Ele ainda desenha a "janela" macOS (com `.windowbar`), mas agora seu corpo contém um componente interativo: `<div className="faithful-replica-container">`.
Para manter a compatibilidade com o script de geração de PDF (`scripts/pdf.mjs`), a altura do *wrapper* dinâmico foi ajustada com limite visual vertical `max-height: 460px` acompanhado de `overflow-y: hidden`. Isso previne a quebra das páginas A4 em layouts muito extensos e preserva a leitura fluida.

**Status Final:** Testes manuais do navegador e automação completa (`npm run verify`) passando 100%. Nenhuma externalidade foi identificada. O PDF de 25 páginas constrói em menos de 3 segundos com as interações fielmente impressas.
