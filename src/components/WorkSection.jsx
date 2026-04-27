import { useEffect } from 'react';
import RawHtml from './RawHtml';

const voiceCrmDiagram = `
  <div class="interactive-diagram voice-crm-diagram" data-state="booked">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive freight outbound AI voice agent workflow">
      <defs>
        <linearGradient id="voiceGrad" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <linearGradient id="voiceGreen" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.78 0.14 155)"></stop><stop offset="1" stop-color="oklch(0.82 0.14 210)"></stop></linearGradient>
        <filter id="voiceDepth" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000" flood-opacity=".34"></feDropShadow></filter>
      </defs>

      <g class="workflow-floor" opacity=".28">
        <path d="M34 230 L270 148 L560 218 L325 304 Z" fill="oklch(0.82 0.14 210 / .07)" stroke="rgba(255,255,255,.12)"></path>
        <path d="M78 214 L368 284" stroke="rgba(255,255,255,.08)"></path>
        <path d="M154 188 L446 256" stroke="rgba(255,255,255,.08)"></path>
      </g>

      <g class="voice-main-links" fill="none" stroke-linecap="round">
        <path class="voice-link link-capture link-qualify link-booked link-won link-follow" d="M92 176 C132 132 184 132 224 176"></path>
        <path class="voice-link link-qualify link-booked link-won link-follow" d="M310 176 C340 144 374 145 405 176"></path>
        <path class="voice-link link-booked link-won link-follow" d="M445 176 C470 172 493 169 518 164"></path>
      </g>

      <g font-family="JetBrains Mono" font-size="9">
        <g class="voice-node" transform="translate(38,132)" data-option="capture" role="button" tabindex="0" aria-label="Show lead capture state">
          <rect class="node-panel" width="96" height="86" rx="13" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.18)" filter="url(#voiceDepth)"></rect>
          <circle cx="48" cy="32" r="14" fill="none" stroke="#e7ebf3" stroke-width="1.4"></circle>
          <path d="M29 62 Q48 45 67 62" fill="none" stroke="#e7ebf3" stroke-width="1.4"></path>
          <text x="48" y="103" text-anchor="middle" fill="#8a93a8">CALLER</text>
        </g>

        <g class="voice-node" transform="translate(206,116)" data-option="qualify" role="button" tabindex="0" aria-label="Show qualification state">
          <polygon class="node-top" points="0,20 84,0 132,26 48,48" fill="oklch(0.82 0.14 210 / .2)" stroke="oklch(0.82 0.14 210)"></polygon>
          <polygon class="node-face" points="48,48 132,26 132,92 48,114" fill="rgba(255,255,255,.052)" stroke="rgba(255,255,255,.16)"></polygon>
          <polygon class="node-side" points="0,20 48,48 48,114 0,80" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
          <rect class="diagram-label-plate" x="27" y="44" width="82" height="48" rx="7"></rect>
          <text x="68" y="59" text-anchor="middle" fill="oklch(0.82 0.14 210)" font-size="8">FREIGHT CALL</text>
          <text x="68" y="75" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Intent + Fit</text>
          <text x="68" y="88" text-anchor="middle" fill="#8a93a8" font-size="8">lane + timing</text>
        </g>

        <g class="voice-node" transform="translate(386,120)" data-option="booked" role="button" tabindex="0" aria-label="Show booked state">
          <rect class="node-panel" width="104" height="82" rx="13" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.18)" filter="url(#voiceDepth)"></rect>
          <rect class="diagram-label-plate" x="10" y="14" width="84" height="54" rx="8"></rect>
          <text x="52" y="29" text-anchor="middle" fill="oklch(0.78 0.14 155)" font-size="8">GHL FLOW</text>
          <text x="52" y="47" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Qualify + Mail</text>
          <text x="52" y="62" text-anchor="middle" fill="#8a93a8" font-size="8">client inbox</text>
        </g>
      </g>

      <g transform="translate(514,72)" font-family="JetBrains Mono" font-size="9">
        <text x="34" y="-10" text-anchor="middle" fill="#8a93a8">FREIGHT CRM</text>
        <g class="voice-pipeline-step" data-option="capture" role="button" tabindex="0" transform="translate(0,0)"><rect class="step-box" width="70" height="28" rx="7"></rect><text x="35" y="18" text-anchor="middle">CRM Lead</text></g>
        <g class="voice-pipeline-step" data-option="qualify" role="button" tabindex="0" transform="translate(0,38)"><rect class="step-box" width="70" height="28" rx="7"></rect><text x="35" y="18" text-anchor="middle">Interested</text></g>
        <g class="voice-pipeline-step" data-option="booked" role="button" tabindex="0" transform="translate(0,76)"><rect class="step-box" width="70" height="28" rx="7"></rect><text x="35" y="18" text-anchor="middle">Qualified</text></g>
        <g class="voice-pipeline-step" data-option="won" role="button" tabindex="0" transform="translate(0,114)"><rect class="step-box" width="70" height="28" rx="7"></rect><text x="35" y="18" text-anchor="middle">Emailed</text></g>
        <g class="voice-pipeline-step" data-option="follow" role="button" tabindex="0" transform="translate(0,152)"><rect class="step-box" width="70" height="28" rx="7"></rect><text x="35" y="18" text-anchor="middle">Retry</text></g>
      </g>

      <g transform="translate(36,286)" font-family="JetBrains Mono" font-size="9">
        <rect class="voice-state-panel" width="528" height="92" rx="12" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></rect>
        <text x="14" y="20" fill="#5c6478">CALL_STATE</text>
        <text x="14" y="42" fill="oklch(0.82 0.14 210)" data-dynamic="voice-title">Qualified freight details captured</text>
        <text x="14" y="60" fill="#e7ebf3" data-dynamic="voice-line">Weight, load size and lane details are ready for handoff.</text>
        <text x="14" y="78" fill="#8a93a8" data-dynamic="voice-meta">Action: collect freight data -> email client</text>
        <g class="voice-action-chip" data-option="won" role="button" tabindex="0" transform="translate(382,13)"><rect width="54" height="24" rx="7"></rect><text x="27" y="16" text-anchor="middle">Won</text></g>
        <g class="voice-action-chip" data-option="follow" role="button" tabindex="0" transform="translate(446,13)"><rect width="68" height="24" rx="7"></rect><text x="34" y="16" text-anchor="middle">Follow-up</text></g>
      </g>
    </svg>
  </div>`;

const analyzerDiagram = `
  <div class="interactive-diagram analyzer-diagram structured-analyzer" data-state="overview">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive AI business analyzer workflow">
      <defs>
        <linearGradient id="analyzerGrad" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <filter id="analyzerDepth" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000" flood-opacity=".28"></feDropShadow></filter>
      </defs>
      <g opacity=".3">
        <path d="M42 220 L286 136 L556 220 L318 306 Z" fill="oklch(0.82 0.14 210 / .055)" stroke="rgba(255,255,255,.1)"></path>
      </g>

      <g font-family="JetBrains Mono" font-size="9">
        <rect class="analyzer-url" x="34" y="28" width="532" height="38" rx="11"></rect>
        <circle cx="52" cy="47" r="6" fill="none" stroke="oklch(0.82 0.14 210)" stroke-width="1.5"></circle>
        <text x="70" y="51" fill="#e7ebf3">https://acme-robotics.com</text>
        <g class="analyzer-control" data-option="overview" role="button" tabindex="0" transform="translate(458,34)">
          <rect class="control-box" width="92" height="26" rx="8"></rect>
          <text class="analyzer-button-label" x="46" y="17" text-anchor="middle">ANALYZE</text>
        </g>
      </g>

      <g class="analyzer-rails" fill="none" stroke="url(#analyzerGrad)" stroke-linecap="round">
        <path d="M108 140 H172"></path>
        <path d="M278 140 H342"></path>
        <path d="M448 140 H500"></path>
        <path d="M222 180 V220"></path>
        <path d="M392 180 V220"></path>
        <path d="M108 284 H500"></path>
      </g>
      <g class="moving-packets">
        <circle r="3" fill="oklch(0.82 0.14 210)"><animateMotion dur="4.8s" repeatCount="indefinite" path="M108 140 H500"></animateMotion></circle>
        <circle r="3" fill="oklch(0.72 0.18 290)"><animateMotion dur="4.8s" begin="1.2s" repeatCount="indefinite" path="M108 284 H500"></animateMotion></circle>
      </g>

      <g class="analyzer-score-card" transform="translate(36,96)" font-family="JetBrains Mono" font-size="9" data-option="overview" role="button" tabindex="0">
        <rect class="analyzer-card-bg" width="130" height="94" rx="13" filter="url(#analyzerDepth)"></rect>
        <circle class="gauge-bg" cx="36" cy="45" r="26"></circle>
        <circle class="gauge-ring" cx="36" cy="45" r="26" fill="none" stroke="url(#analyzerGrad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="164" stroke-dashoffset="46" transform="rotate(-90 36 45)"></circle>
        <text x="36" y="49" text-anchor="middle" font-family="Space Grotesk" font-size="18" fill="#e7ebf3" data-dynamic="score">82</text>
        <text class="label-kicker" x="72" y="32">AI SCORE</text>
        <text class="label-copy" x="72" y="50" data-dynamic="status">analysis ready</text>
        <text class="label-copy" x="72" y="65">100-point</text>
        <text class="label-copy" x="72" y="78">audit</text>
      </g>

      <g font-family="JetBrains Mono" font-size="9">
        <g class="analyzer-card" data-option="seo" role="button" tabindex="0" transform="translate(184,100)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="118" height="82" rx="12"></rect>
          <text class="label-kicker" x="14" y="24">01 CRAWL</text>
          <text class="label-title" x="14" y="48">SEO Audit</text>
          <text class="label-copy" x="14" y="66">meta, speed, pages</text>
        </g>
        <g class="analyzer-card" data-option="competitor" role="button" tabindex="0" transform="translate(342,100)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="118" height="82" rx="12"></rect>
          <text class="label-kicker" x="14" y="24">02 MARKET</text>
          <text class="label-title" x="14" y="48">Competitors</text>
          <text class="label-copy" x="14" y="66">offers + gaps</text>
        </g>
        <g class="analyzer-card" data-option="report" role="button" tabindex="0" transform="translate(480,100)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="82" height="82" rx="12"></rect>
          <text class="label-kicker" x="12" y="24">03 LLM</text>
          <text class="label-title" x="12" y="48">Report</text>
          <text class="label-copy" x="12" y="66">ranked fixes</text>
        </g>

        <g class="analyzer-output" data-option="video" role="button" tabindex="0" transform="translate(172,220)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="288" height="78" rx="13"></rect>
          <text class="label-kicker" x="16" y="24">04 CONTENT ENGINE</text>
          <text class="label-title" x="16" y="48">Video + Ad Kit</text>
          <text class="label-copy" x="16" y="65">script, palette and render queue</text>
          <rect class="video-pill" x="218" y="18" width="54" height="24" rx="8"></rect>
          <text x="245" y="34" text-anchor="middle" fill="oklch(0.78 0.14 155)" font-size="8">READY</text>
        </g>
        <g class="analyzer-output" data-option="overview" role="button" tabindex="0" transform="translate(36,248)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="106" height="50" rx="12"></rect>
          <text class="label-kicker" x="14" y="21">INPUTS</text>
          <text class="label-copy" x="14" y="38">URL + sitemap</text>
        </g>
        <g class="analyzer-output" data-option="report" role="button" tabindex="0" transform="translate(480,220)" filter="url(#analyzerDepth)">
          <rect class="analyzer-card-bg" width="82" height="78" rx="12"></rect>
          <text class="label-kicker" x="12" y="24">OUTPUT</text>
          <text class="label-title" x="12" y="48">PDF Deck</text>
          <text class="label-copy" x="12" y="65">handoff</text>
        </g>
      </g>

      <g class="analyzer-insight-panel" transform="translate(36,336)" font-family="JetBrains Mono" font-size="9">
        <rect class="analyzer-card-bg" width="526" height="42" rx="12"></rect>
        <text class="label-kicker" x="16" y="17">SELECTED DELIVERABLE</text>
        <text class="state-meta" x="16" y="32" data-dynamic="preview-label">FULL_AUDIT_RUN.json</text>
        <text x="382" y="26" fill="#5c6478">Impact ranked</text>
        <text x="472" y="26" fill="oklch(0.82 0.14 210)">+18% est.</text>
      </g>
    </svg>
  </div>`;

const confidentialWorkflowDiagram = `
  <div class="interactive-diagram workflow-3d" data-state="pre">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive n8n voice workflow diagram">
      <defs>
        <linearGradient id="g4cyan" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <linearGradient id="g4green" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.78 0.14 155)"></stop><stop offset="1" stop-color="oklch(0.82 0.14 210)"></stop></linearGradient>
        <linearGradient id="g4amber" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 80)"></stop><stop offset="1" stop-color="oklch(0.78 0.14 155)"></stop></linearGradient>
        <filter id="nodeDepth4" x="-20%" y="-18%" width="140%" height="150%"><feDropShadow dx="0" dy="13" stdDeviation="9" flood-color="#000" flood-opacity=".34"></feDropShadow></filter>
      </defs>
      <g class="workflow-floor" opacity=".32">
        <path d="M38 138 L284 66 L558 132 L312 206 Z" fill="oklch(0.82 0.14 210 / .055)" stroke="rgba(255,255,255,.12)"></path>
        <path d="M40 306 L284 232 L558 300 L314 374 Z" fill="oklch(0.72 0.18 290 / .055)" stroke="rgba(255,255,255,.12)"></path>
      </g>
      <g font-family="JetBrains Mono" font-size="9">
        <text x="34" y="28" fill="#5c6478">CONFIDENTIAL_CLIENT.voice_ops</text>
        <text x="360" y="28" fill="oklch(0.82 0.14 210)" data-dynamic="workflow-caption">pre-call intake path selected</text>
        <g class="workflow-toggle" data-option="pre" role="button" tabindex="0" transform="translate(32,46)"><rect width="116" height="22" rx="6"></rect><text x="58" y="15" text-anchor="middle">PRE-CALL FLOW</text></g>
        <g class="workflow-toggle" data-option="post" role="button" tabindex="0" transform="translate(160,46)"><rect width="122" height="22" rx="6"></rect><text x="61" y="15" text-anchor="middle">POST-CALL FLOW</text></g>
      </g>
      <g class="workflow-links" fill="none" stroke-linecap="round">
        <path class="workflow-link route-pre" d="M112 115 C150 105 162 101 198 91 C315 101 330 105 367 115 C482 126 497 130 532 141"></path>
        <path class="workflow-link route-post" d="M535 183 C552 216 535 242 495 253 C363 257 349 254 307 244 C184 255 170 258 127 268"></path>
        <path class="workflow-link route-retry" d="M85 304 C120 334 198 347 266 324"></path>
        <path class="workflow-link route-next" d="M85 304 C138 294 181 294 226 308"></path>
        <path class="workflow-link route-callback" d="M85 304 C137 367 298 376 394 330"></path>
      </g>
      <g font-family="JetBrains Mono" font-size="10">
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(34,82)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><rect class="diagram-label-plate" x="22" y="38" width="78" height="46" rx="7"></rect><text x="61" y="52" text-anchor="middle" font-size="8">SHEETS</text><text x="61" y="68" text-anchor="middle" font-family="Space Grotesk" font-size="12">New Lead</text><text x="61" y="81" text-anchor="middle" font-size="8">sync empty</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(199,58)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><rect class="diagram-label-plate" x="22" y="38" width="78" height="46" rx="7"></rect><text x="61" y="52" text-anchor="middle" font-size="8">LEAD GATE</text><text x="61" y="68" text-anchor="middle" font-family="Space Grotesk" font-size="12">Filter</text><text x="61" y="81" text-anchor="middle" font-size="8">dedupe</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(368,82)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><rect class="diagram-label-plate" x="22" y="38" width="78" height="46" rx="7"></rect><text x="61" y="52" text-anchor="middle" font-size="8">PHONE</text><text x="61" y="68" text-anchor="middle" font-family="Space Grotesk" font-size="12">Dedupe</text><text x="61" y="81" text-anchor="middle" font-size="8">P1 / P2 / mobile</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(484,117)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 58,2 96,20 38,38"></polygon><polygon class="node-face" points="38,38 96,20 96,72 38,92"></polygon><polygon class="node-side" points="0,18 38,38 38,92 0,66"></polygon><rect class="diagram-label-plate" x="16" y="36" width="68" height="42" rx="7"></rect><text x="50" y="49" text-anchor="middle" font-size="8">SYNTHFLOW</text><text x="50" y="64" text-anchor="middle" font-family="Space Grotesk" font-size="12">AI Call</text><text x="50" y="76" text-anchor="middle" font-size="8">REST v2</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(406,230)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><rect class="diagram-label-plate" x="24" y="42" width="78" height="44" rx="7"></rect><text x="63" y="55" text-anchor="middle" font-size="8">WEBHOOK</text><text x="63" y="70" text-anchor="middle" font-family="Space Grotesk" font-size="12">Result</text><text x="63" y="83" text-anchor="middle" font-size="8">status + time</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(228,218)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><rect class="diagram-label-plate" x="24" y="42" width="78" height="44" rx="7"></rect><text x="63" y="55" text-anchor="middle" font-size="8">LOOKUP</text><text x="63" y="70" text-anchor="middle" font-family="Space Grotesk" font-size="12">Match ID</text><text x="63" y="83" text-anchor="middle" font-size="8">which number?</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(50,242)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><rect class="diagram-label-plate" x="24" y="42" width="78" height="44" rx="7"></rect><text x="63" y="55" text-anchor="middle" font-size="8">OUTCOME</text><text x="63" y="70" text-anchor="middle" font-family="Space Grotesk" font-size="12">Route</text><text x="63" y="83" text-anchor="middle" font-size="8">done / retry</text></g>
      </g>
      <g class="workflow-actions" font-family="JetBrains Mono" font-size="9">
        <g data-option="retry" role="button" tabindex="0" transform="translate(202,330)"><rect class="action-chip" width="86" height="24" rx="8"></rect><text x="43" y="16" text-anchor="middle">Wait + Retry</text></g>
        <g data-option="next" role="button" tabindex="0" transform="translate(304,330)"><rect class="action-chip" width="86" height="24" rx="8"></rect><text x="43" y="16" text-anchor="middle">Try Next #</text></g>
        <g data-option="callback" role="button" tabindex="0" transform="translate(406,330)"><rect class="action-chip" width="96" height="24" rx="8"></rect><text x="48" y="16" text-anchor="middle">Callback Flag</text></g>
      </g>
      <g transform="translate(42,362)" font-family="JetBrains Mono" font-size="9">
        <rect class="workflow-audit" width="516" height="38" rx="10"></rect>
        <text x="14" y="15" fill="#5c6478">GOOGLE_SHEETS_WRITEBACK</text>
        <text x="14" y="29" fill="#e7ebf3" data-dynamic="workflow-audit">sync status -> selected number -> call started -> row updated</text>
      </g>
    </svg>
  </div>`;


const voiceAutomationProject = `

    <!-- P04: Confidential n8n + Synthflow Voice Automation -->
    <div class="project reverse reveal workflow-project">
      <div>
        <div class="p-head"><span class="num">P/04</span><span>Confidential Client Project &middot; Voice Automation</span><span class="bar"></span></div>
        <h3 class="p-title">n8n + Synthflow Voice Agent<br>Automation Suite</h3>
        <p class="p-desc">A production voice-agent automation built for a confidential client engagement, with identifying details intentionally omitted. The system replaced a fragile CRM workflow with two n8n flows that intake leads from Google Sheets, trigger Synthflow AI calls, and process every post-call outcome through retry, callback and audit logic.</p>
        <ul class="p-bullets">
          <li><b>Pre-call workflow</b> watches new sheet rows, validates lead IDs, cleans phone fields and dials the first unique available number through Synthflow.</li>
          <li><b>Post-call workflow</b> receives Synthflow webhooks, identifies which number was contacted, then routes success, retries, callbacks and next-number escalation.</li>
          <li><b>Operational controls</b> include per-number retry limits, callback flags, deduplication and real-time Google Sheets write-back for a clean audit trail.</li>
        </ul>
        <div class="p-stack"><span>n8n</span><span>Synthflow AI</span><span>Google Sheets</span><span>Webhooks</span><span>JavaScript</span><span>REST API</span></div>
      </div>
      <div class="p-diagram workflow-3d">
        <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="3D n8n voice workflow diagram">
          <defs>
            <linearGradient id="g4cyan" x1="0" x2="1">
              <stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop>
              <stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop>
            </linearGradient>
            <linearGradient id="g4green" x1="0" x2="1">
              <stop offset="0" stop-color="oklch(0.78 0.14 155)"></stop>
              <stop offset="1" stop-color="oklch(0.82 0.14 210)"></stop>
            </linearGradient>
            <linearGradient id="g4amber" x1="0" x2="1">
              <stop offset="0" stop-color="oklch(0.82 0.14 80)"></stop>
              <stop offset="1" stop-color="oklch(0.78 0.14 155)"></stop>
            </linearGradient>
            <filter id="nodeDepth4" x="-20%" y="-18%" width="140%" height="150%">
              <feDropShadow dx="0" dy="13" stdDeviation="9" flood-color="#000000" flood-opacity=".34"></feDropShadow>
            </filter>
            <marker id="arrow4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 Z" fill="oklch(0.82 0.14 210)"></path>
            </marker>
          </defs>

          <g class="workflow-floor" opacity=".32">
            <path d="M38 138 L284 66 L558 132 L312 206 Z" fill="oklch(0.82 0.14 210 / .055)" stroke="rgba(255,255,255,.12)"></path>
            <path d="M40 306 L284 232 L558 300 L314 374 Z" fill="oklch(0.72 0.18 290 / .055)" stroke="rgba(255,255,255,.12)"></path>
            <path d="M84 126 L356 192" stroke="rgba(255,255,255,.08)"></path>
            <path d="M166 102 L438 168" stroke="rgba(255,255,255,.08)"></path>
            <path d="M86 294 L356 360" stroke="rgba(255,255,255,.08)"></path>
            <path d="M166 270 L438 336" stroke="rgba(255,255,255,.08)"></path>
          </g>

          <g font-family="JetBrains Mono" font-size="9">
            <text x="34" y="28" fill="#5c6478">CONFIDENTIAL_CLIENT.voice_ops</text>
            <text x="358" y="28" fill="oklch(0.82 0.14 210)">pre-call + post-call orchestration</text>
            <rect x="32" y="46" width="116" height="22" rx="6" fill="oklch(0.82 0.14 210 / .1)" stroke="oklch(0.82 0.14 210 / .45)"></rect>
            <text x="90" y="61" text-anchor="middle" fill="oklch(0.82 0.14 210)">PRE-CALL FLOW</text>
            <rect x="32" y="214" width="122" height="22" rx="6" fill="oklch(0.82 0.14 80 / .1)" stroke="oklch(0.82 0.14 80 / .45)"></rect>
            <text x="93" y="229" text-anchor="middle" fill="oklch(0.82 0.14 80)">POST-CALL FLOW</text>
          </g>

          <g class="workflow-links" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path class="workflow-link main" d="M112 115 C150 105 162 101 198 91" marker-end="url(#arrow4)"></path>
            <path class="workflow-link main" d="M278 91 C315 101 330 105 367 115" marker-end="url(#arrow4)"></path>
            <path class="workflow-link main" d="M447 116 C482 126 497 130 532 141" marker-end="url(#arrow4)"></path>
            <path class="workflow-link return" d="M535 183 C552 216 535 242 495 253" marker-end="url(#arrow4)"></path>
            <path class="workflow-link post" d="M405 267 C363 257 349 254 307 244" marker-end="url(#arrow4)"></path>
            <path class="workflow-link post" d="M227 244 C184 255 170 258 127 268" marker-end="url(#arrow4)"></path>
            <path class="workflow-link branch" d="M85 304 C120 334 198 347 266 324" marker-end="url(#arrow4)"></path>
            <path class="workflow-link branch" d="M85 304 C138 294 181 294 226 308" marker-end="url(#arrow4)"></path>
            <path class="workflow-link branch" d="M85 304 C137 367 298 376 394 330" marker-end="url(#arrow4)"></path>
          </g>

          <g class="workflow-packets">
            <circle r="4" fill="oklch(0.82 0.14 210)">
              <animateMotion dur="5s" repeatCount="indefinite" path="M112 115 C150 105 162 101 198 91 C315 101 330 105 367 115 C482 126 497 130 532 141"></animateMotion>
            </circle>
            <circle r="4" fill="oklch(0.82 0.14 80)">
              <animateMotion dur="5s" begin="1.2s" repeatCount="indefinite" path="M535 183 C552 216 535 242 495 253 C363 257 349 254 307 244 C184 255 170 258 127 268"></animateMotion>
            </circle>
          </g>

          <g font-family="JetBrains Mono" font-size="10">
            <g class="workflow-node pre" transform="translate(34,82)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 68,0 114,20 46,40" fill="oklch(0.82 0.14 210 / .22)" stroke="oklch(0.82 0.14 210)"></polygon>
              <polygon class="node-face" points="46,40 114,20 114,74 46,96" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,40 46,96 0,68" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="57" y="36" text-anchor="middle" fill="oklch(0.82 0.14 210)" font-size="8">SHEETS TRIGGER</text>
              <text x="57" y="55" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">New Lead</text>
              <text x="57" y="72" text-anchor="middle" fill="#8a93a8">Sync empty</text>
            </g>

            <g class="workflow-node pre" transform="translate(199,58)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 68,0 114,20 46,40" fill="oklch(0.72 0.18 290 / .2)" stroke="oklch(0.72 0.18 290)"></polygon>
              <polygon class="node-face" points="46,40 114,20 114,74 46,96" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,40 46,96 0,68" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="57" y="36" text-anchor="middle" fill="oklch(0.72 0.18 290)" font-size="8">FILTER</text>
              <text x="57" y="55" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Lead ID Gate</text>
              <text x="57" y="72" text-anchor="middle" fill="#8a93a8">skip duplicates</text>
            </g>

            <g class="workflow-node pre" transform="translate(368,82)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 68,0 114,20 46,40" fill="oklch(0.82 0.14 210 / .18)" stroke="oklch(0.82 0.14 210)"></polygon>
              <polygon class="node-face" points="46,40 114,20 114,74 46,96" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,40 46,96 0,68" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="57" y="36" text-anchor="middle" fill="oklch(0.82 0.14 210)" font-size="8">NORMALIZE</text>
              <text x="57" y="55" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Phone Dedupe</text>
              <text x="57" y="72" text-anchor="middle" fill="#8a93a8">P1 / P2 / mobile</text>
            </g>

            <g class="workflow-node voice" transform="translate(484,117)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 58,2 96,20 38,38" fill="oklch(0.78 0.14 155 / .2)" stroke="oklch(0.78 0.14 155)"></polygon>
              <polygon class="node-face" points="38,38 96,20 96,72 38,92" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 38,38 38,92 0,66" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="48" y="35" text-anchor="middle" fill="oklch(0.78 0.14 155)" font-size="8">SYNTHFLOW</text>
              <text x="48" y="54" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">AI Call</text>
              <text x="48" y="70" text-anchor="middle" fill="#8a93a8">REST v2</text>
            </g>

            <g class="workflow-node post" transform="translate(406,230)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 70,0 116,22 46,42" fill="oklch(0.82 0.14 80 / .18)" stroke="oklch(0.82 0.14 80)"></polygon>
              <polygon class="node-face" points="46,42 116,22 116,76 46,98" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,42 46,98 0,70" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="58" y="38" text-anchor="middle" fill="oklch(0.82 0.14 80)" font-size="8">WEBHOOK</text>
              <text x="58" y="57" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Call Result</text>
              <text x="58" y="74" text-anchor="middle" fill="#8a93a8">status + duration</text>
            </g>

            <g class="workflow-node post" transform="translate(228,218)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 70,0 116,22 46,42" fill="oklch(0.72 0.18 290 / .18)" stroke="oklch(0.72 0.18 290)"></polygon>
              <polygon class="node-face" points="46,42 116,22 116,76 46,98" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,42 46,98 0,70" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="58" y="38" text-anchor="middle" fill="oklch(0.72 0.18 290)" font-size="8">LOOKUP + SWITCH</text>
              <text x="58" y="57" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Match Lead ID</text>
              <text x="58" y="74" text-anchor="middle" fill="#8a93a8">which number?</text>
            </g>

            <g class="workflow-node post" transform="translate(50,242)" filter="url(#nodeDepth4)">
              <polygon class="node-top" points="0,18 70,0 116,22 46,42" fill="url(#g4cyan)" opacity=".32" stroke="oklch(0.82 0.14 210)"></polygon>
              <polygon class="node-face" points="46,42 116,22 116,76 46,98" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"></polygon>
              <polygon class="node-side" points="0,18 46,42 46,98 0,70" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></polygon>
              <text x="58" y="38" text-anchor="middle" fill="oklch(0.82 0.14 210)" font-size="8">OUTCOME GATE</text>
              <text x="58" y="57" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">Decide Route</text>
              <text x="58" y="74" text-anchor="middle" fill="#8a93a8">complete / retry</text>
            </g>
          </g>

          <g class="workflow-actions" font-family="JetBrains Mono" font-size="9">
            <g transform="translate(236,304)">
              <rect class="action-chip" width="76" height="28" rx="8" fill="oklch(0.82 0.14 80 / .11)" stroke="oklch(0.82 0.14 80 / .45)"></rect>
              <text x="38" y="18" text-anchor="middle" fill="#e7ebf3">Wait + Retry</text>
            </g>
            <g transform="translate(318,294)">
              <rect class="action-chip" width="86" height="28" rx="8" fill="oklch(0.72 0.18 290 / .11)" stroke="oklch(0.72 0.18 290 / .45)"></rect>
              <text x="43" y="18" text-anchor="middle" fill="#e7ebf3">Try Next #</text>
            </g>
            <g transform="translate(416,304)">
              <rect class="action-chip" width="92" height="28" rx="8" fill="oklch(0.78 0.14 155 / .11)" stroke="oklch(0.78 0.14 155 / .45)"></rect>
              <text x="46" y="18" text-anchor="middle" fill="#e7ebf3">Callback Flag</text>
            </g>
          </g>

          <g transform="translate(42,362)" font-family="JetBrains Mono" font-size="9">
            <rect class="workflow-audit" width="516" height="38" rx="10" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.12)"></rect>
            <text x="14" y="15" fill="#5c6478">GOOGLE_SHEETS_WRITEBACK</text>
            <text x="14" y="29" fill="#e7ebf3">sync status &#8226; verified number &#8226; callback state &#8226; retry count &#8226; final disposition</text>
            <circle cx="492" cy="20" r="5" fill="url(#g4green)" class="workflow-pulse"></circle>
          </g>
        </svg>
      </div>
    </div>`;

const freightWorkflowDiagram = `
  <div class="interactive-diagram voice-crm-diagram clean-workflow-diagram" data-state="booked">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive freight outbound AI voice workflow">
      <defs>
        <linearGradient id="freightLine" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <linearGradient id="freightGreen" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.78 0.14 155)"></stop><stop offset="1" stop-color="oklch(0.82 0.14 210)"></stop></linearGradient>
        <filter id="cleanDepth" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="11" flood-color="#000" flood-opacity=".3"></feDropShadow></filter>
      </defs>

      <g opacity=".34">
        <path d="M42 236 L280 156 L556 226 L320 314 Z" fill="oklch(0.82 0.14 210 / .06)" stroke="rgba(255,255,255,.11)"></path>
        <path d="M84 222 L360 300" stroke="rgba(255,255,255,.08)"></path>
        <path d="M160 196 L438 272" stroke="rgba(255,255,255,.08)"></path>
      </g>

      <g class="voice-main-links clean-links" fill="none" stroke-linecap="round">
        <path class="voice-link link-capture link-qualify link-booked link-won link-follow" d="M112 138 C148 118 170 118 206 138"></path>
        <path class="voice-link link-qualify link-booked link-won link-follow" d="M322 138 C352 118 376 118 406 138"></path>
        <path class="voice-link link-booked link-won link-follow" d="M502 138 C522 138 536 138 556 138"></path>
      </g>

      <g font-family="JetBrains Mono" font-size="9">
        <g class="voice-node clean-node" transform="translate(40,86)" data-option="capture" role="button" tabindex="0" aria-label="Show lead capture state">
          <rect class="flow-card node-panel" width="110" height="94" rx="12" filter="url(#cleanDepth)"></rect>
          <text class="label-kicker" x="16" y="24">01 CRM</text>
          <text class="label-title" x="16" y="48">Lead Queue</text>
          <text class="label-copy" x="16" y="66">freight prospects</text>
          <text class="label-copy" x="16" y="80">ready to dial</text>
        </g>

        <g class="voice-node clean-node" transform="translate(206,86)" data-option="qualify" role="button" tabindex="0" aria-label="Show qualification state">
          <rect class="flow-card node-panel" width="130" height="94" rx="12" filter="url(#cleanDepth)"></rect>
          <text class="label-kicker" x="16" y="24">02 SYNTHFLOW</text>
          <text class="label-title" x="16" y="48">Outbound Call</text>
          <text class="label-copy" x="16" y="66">interest + freight</text>
          <text class="label-copy" x="16" y="80">requirements</text>
        </g>

        <g class="voice-node clean-node" transform="translate(406,86)" data-option="booked" role="button" tabindex="0" aria-label="Show qualified handoff state">
          <rect class="flow-card node-panel" width="122" height="94" rx="12" filter="url(#cleanDepth)"></rect>
          <text class="label-kicker" x="16" y="24">03 GHL FLOW</text>
          <text class="label-title" x="16" y="48">Qualify + Mail</text>
          <text class="label-copy" x="16" y="66">lane, weight, size</text>
          <text class="label-copy" x="16" y="80">sent to client</text>
        </g>
      </g>

      <g class="pipeline-panel" transform="translate(456,205)" font-family="JetBrains Mono" font-size="9">
        <text class="label-kicker" x="0" y="-12">FREIGHT CRM</text>
        <g class="voice-pipeline-step" data-option="capture" role="button" tabindex="0" transform="translate(0,0)"><rect class="step-box" width="96" height="28" rx="8"></rect><text x="48" y="18" text-anchor="middle">Imported</text></g>
        <g class="voice-pipeline-step" data-option="qualify" role="button" tabindex="0" transform="translate(0,36)"><rect class="step-box" width="96" height="28" rx="8"></rect><text x="48" y="18" text-anchor="middle">Interested</text></g>
        <g class="voice-pipeline-step" data-option="booked" role="button" tabindex="0" transform="translate(0,72)"><rect class="step-box" width="96" height="28" rx="8"></rect><text x="48" y="18" text-anchor="middle">Qualified</text></g>
        <g class="voice-pipeline-step" data-option="won" role="button" tabindex="0" transform="translate(0,108)"><rect class="step-box" width="96" height="28" rx="8"></rect><text x="48" y="18" text-anchor="middle">Client emailed</text></g>
        <g class="voice-pipeline-step" data-option="follow" role="button" tabindex="0" transform="translate(0,144)"><rect class="step-box" width="96" height="28" rx="8"></rect><text x="48" y="18" text-anchor="middle">Retry branch</text></g>
      </g>

      <g transform="translate(40,222)" font-family="JetBrains Mono" font-size="9">
        <rect class="state-card voice-state-panel" width="382" height="126" rx="14"></rect>
        <text class="label-kicker" x="18" y="26">LIVE CALL STATE</text>
        <text class="state-title" x="18" y="52" data-dynamic="voice-title">Qualified freight details captured</text>
        <text class="state-copy" x="18" y="75" data-dynamic="voice-line">Weight, load size and lane details are ready for handoff.</text>
        <text class="state-meta" x="18" y="98" data-dynamic="voice-meta">Action: collect freight data -> email client</text>
        <g class="voice-action-chip" data-option="won" role="button" tabindex="0" transform="translate(260,20)"><rect width="48" height="24" rx="8"></rect><text x="24" y="16" text-anchor="middle">Won</text></g>
        <g class="voice-action-chip" data-option="follow" role="button" tabindex="0" transform="translate(316,20)"><rect width="54" height="24" rx="8"></rect><text x="27" y="16" text-anchor="middle">Retry</text></g>
      </g>
    </svg>
  </div>`;

const leadScraperDiagram = `
  <div class="professional-workflow lead-scraper-diagram">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Lead generation workflow diagram">
      <defs>
        <linearGradient id="leadLine" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <filter id="leadDepth" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000" flood-opacity=".28"></feDropShadow></filter>
      </defs>
      <g opacity=".32">
        <path d="M48 235 L288 146 L552 232 L316 322 Z" fill="oklch(0.82 0.14 210 / .055)" stroke="rgba(255,255,255,.1)"></path>
      </g>
      <g class="clean-links" fill="none" stroke="url(#leadLine)" stroke-linecap="round">
        <path d="M132 116 C164 116 178 146 204 178"></path>
        <path d="M132 304 C164 304 178 268 204 232"></path>
        <path d="M304 205 L344 205"></path>
        <path d="M444 190 C474 168 496 146 520 122"></path>
        <path d="M444 220 C474 248 496 276 520 304"></path>
      </g>
      <g class="moving-packets">
        <circle r="3" fill="oklch(0.82 0.14 210)"><animateMotion dur="4s" repeatCount="indefinite" path="M132 116 C164 116 178 146 204 178 L304 205 L344 205"></animateMotion></circle>
        <circle r="3" fill="oklch(0.72 0.18 290)"><animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M444 190 C474 168 496 146 520 122"></animateMotion></circle>
      </g>
      <g font-family="JetBrains Mono" font-size="9">
        <g class="clean-node" transform="translate(44,72)"><rect class="flow-card" width="96" height="72" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="16" y="23">TRIGGER</text><text class="label-title" x="16" y="47">Cron Run</text><text class="label-copy" x="16" y="62">every 6h</text></g>
        <g class="clean-node" transform="translate(44,276)"><rect class="flow-card" width="96" height="72" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="16" y="23">INPUT</text><text class="label-title" x="16" y="47">ICP List</text><text class="label-copy" x="16" y="62">filters + roles</text></g>
        <g class="clean-node" transform="translate(204,166)"><rect class="flow-card" width="118" height="82" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="16" y="24">SCRAPE</text><text class="label-title" x="16" y="48">Apify Actor</text><text class="label-copy" x="16" y="66">LinkedIn jobs</text></g>
        <g class="clean-node" transform="translate(344,166)"><rect class="flow-card" width="118" height="82" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="16" y="24">ENRICH</text><text class="label-title" x="16" y="48">Clay Table</text><text class="label-copy" x="16" y="66">firmographics</text></g>
        <g class="clean-node" transform="translate(488,76)"><rect class="flow-card" width="88" height="72" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="14" y="23">OUTREACH</text><text class="label-title" x="14" y="47">Instantly</text><text class="label-copy" x="14" y="62">sequence</text></g>
        <g class="clean-node" transform="translate(488,276)"><rect class="flow-card" width="88" height="72" rx="12" filter="url(#leadDepth)"></rect><text class="label-kicker" x="14" y="23">AUDIT</text><text class="label-title" x="14" y="47">Postgres</text><text class="label-copy" x="14" y="62">events</text></g>
      </g>
      <g class="metric-ribbon" transform="translate(48,374)" font-family="JetBrains Mono" font-size="9">
        <text x="0" y="0">RUNS/WK <tspan>28</tspan></text>
        <text x="126" y="0">LEADS <tspan>3.4k</tspan></text>
        <text x="246" y="0">REPLIES <tspan>11.2%</tspan></text>
        <text x="386" y="0">TIME SAVED <tspan>22 hrs</tspan></text>
      </g>
    </svg>
  </div>`;

const cleanConfidentialWorkflowDiagram = `
  <div class="interactive-diagram workflow-3d clean-workflow-diagram" data-state="pre">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive n8n and Synthflow workflow diagram">
      <defs>
        <linearGradient id="cleanWfLine" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
        <linearGradient id="cleanWfGreen" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.78 0.14 155)"></stop><stop offset="1" stop-color="oklch(0.82 0.14 210)"></stop></linearGradient>
        <filter id="wfCleanDepth" x="-15%" y="-20%" width="130%" height="150%"><feDropShadow dx="0" dy="12" stdDeviation="11" flood-color="#000" flood-opacity=".3"></feDropShadow></filter>
      </defs>
      <g opacity=".32">
        <path d="M40 155 L288 82 L558 156 L316 236 Z" fill="oklch(0.82 0.14 210 / .055)" stroke="rgba(255,255,255,.1)"></path>
        <path d="M40 300 L288 228 L558 300 L316 380 Z" fill="oklch(0.72 0.18 290 / .045)" stroke="rgba(255,255,255,.09)"></path>
      </g>
      <g font-family="JetBrains Mono" font-size="9">
        <text class="label-kicker" x="42" y="30">CONFIDENTIAL_CLIENT.voice_ops</text>
        <text class="state-title" x="344" y="30" data-dynamic="workflow-caption">pre-call intake path selected</text>
        <g class="workflow-toggle" data-option="pre" role="button" tabindex="0" transform="translate(42,48)"><rect width="112" height="24" rx="8"></rect><text x="56" y="16" text-anchor="middle">PRE-CALL</text></g>
        <g class="workflow-toggle" data-option="post" role="button" tabindex="0" transform="translate(164,48)"><rect width="112" height="24" rx="8"></rect><text x="56" y="16" text-anchor="middle">POST-CALL</text></g>
      </g>
      <g class="workflow-links clean-links rail-links" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path class="workflow-link route-pre" d="M94 160 V178 H496 V160"></path>
        <path class="workflow-link route-post" d="M496 204 V190 H94 V204"></path>
        <path class="workflow-link route-retry" d="M228 276 V290 H223 V300"></path>
        <path class="workflow-link route-next" d="M228 276 V290 H335 V300"></path>
        <path class="workflow-link route-callback" d="M228 276 V290 H447 V300"></path>
      </g>
      <g class="workflow-rail-joints">
        <circle cx="94" cy="178" r="3"></circle>
        <circle cx="228" cy="178" r="3"></circle>
        <circle cx="362" cy="178" r="3"></circle>
        <circle cx="496" cy="178" r="3"></circle>
        <circle cx="496" cy="190" r="3"></circle>
        <circle cx="362" cy="190" r="3"></circle>
        <circle cx="228" cy="190" r="3"></circle>
        <circle cx="94" cy="190" r="3"></circle>
      </g>
      <g class="workflow-rail-packets">
        <circle r="3.4" fill="oklch(0.82 0.14 210)"><animateMotion dur="4.8s" repeatCount="indefinite" path="M94 160 V178 H496 V160"></animateMotion></circle>
        <circle r="3.4" fill="oklch(0.72 0.18 290)"><animateMotion dur="4.8s" begin="1.2s" repeatCount="indefinite" path="M496 204 V190 H94 V204"></animateMotion></circle>
        <circle r="3.2" fill="oklch(0.78 0.14 155)"><animateMotion dur="4.4s" begin=".6s" repeatCount="indefinite" path="M228 276 V290 H447 V300"></animateMotion></circle>
      </g>
      <g font-family="JetBrains Mono" font-size="9">
        <g class="workflow-node clean-node" data-option="pre" role="button" tabindex="0" transform="translate(40,88)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">01 SHEETS</text><text class="label-title" x="14" y="47">New Lead</text><text class="label-copy" x="14" y="62">empty sync row</text></g>
        <g class="workflow-node clean-node" data-option="pre" role="button" tabindex="0" transform="translate(174,88)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">02 FILTER</text><text class="label-title" x="14" y="47">Lead Gate</text><text class="label-copy" x="14" y="62">valid ID only</text></g>
        <g class="workflow-node clean-node" data-option="pre" role="button" tabindex="0" transform="translate(308,88)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">03 PHONE</text><text class="label-title" x="14" y="47">Dedupe</text><text class="label-copy" x="14" y="62">P1 / P2 / mobile</text></g>
        <g class="workflow-node clean-node" data-option="pre" role="button" tabindex="0" transform="translate(442,88)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">04 VOICE</text><text class="label-title" x="14" y="47">Synthflow</text><text class="label-copy" x="14" y="62">outbound call</text></g>
        <g class="workflow-node clean-node" data-option="post" role="button" tabindex="0" transform="translate(442,204)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">05 WEBHOOK</text><text class="label-title" x="14" y="47">Call Result</text><text class="label-copy" x="14" y="62">status + time</text></g>
        <g class="workflow-node clean-node" data-option="post" role="button" tabindex="0" transform="translate(308,204)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">06 LOOKUP</text><text class="label-title" x="14" y="47">Match Lead</text><text class="label-copy" x="14" y="62">which number?</text></g>
        <g class="workflow-node clean-node" data-option="post" role="button" tabindex="0" transform="translate(174,204)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">07 ROUTER</text><text class="label-title" x="14" y="47">Outcome</text><text class="label-copy" x="14" y="62">done or retry</text></g>
        <g class="workflow-node clean-node" data-option="post" role="button" tabindex="0" transform="translate(40,204)" filter="url(#wfCleanDepth)"><rect class="flow-card" width="108" height="72" rx="12"></rect><text class="label-kicker" x="14" y="23">08 SHEETS</text><text class="label-title" x="14" y="47">Writeback</text><text class="label-copy" x="14" y="62">audit trail</text></g>
      </g>
      <g class="workflow-actions clean-actions" font-family="JetBrains Mono" font-size="9">
        <g data-option="retry" role="button" tabindex="0" transform="translate(174,300)"><rect class="action-chip" width="98" height="28" rx="9"></rect><text x="49" y="18" text-anchor="middle">Wait + Retry</text></g>
        <g data-option="next" role="button" tabindex="0" transform="translate(286,300)"><rect class="action-chip" width="98" height="28" rx="9"></rect><text x="49" y="18" text-anchor="middle">Next Number</text></g>
        <g data-option="callback" role="button" tabindex="0" transform="translate(398,300)"><rect class="action-chip" width="98" height="28" rx="9"></rect><text x="49" y="18" text-anchor="middle">Callback</text></g>
      </g>
      <g transform="translate(40,350)" font-family="JetBrains Mono" font-size="9">
        <rect class="workflow-audit state-card" width="510" height="42" rx="12"></rect>
        <text class="label-kicker" x="16" y="17">AUDIT WRITEBACK</text>
        <text class="state-meta" x="16" y="32" data-dynamic="workflow-audit">sync status -> selected number -> call started -> row updated</text>
      </g>
    </svg>
  </div>`;

const enhancedHtml = `
<!-- PROJECTS -->
<section id="work">
  <div class="section-head reveal">
    <div>
      <div class="section-num">/ 04 &mdash; selected work</div>
      <h2 class="section-title">Things I've <span class="outline">shipped</span></h2>
    </div>
    <p class="section-desc">Confidential client and company work, presented as crisp system stories: what entered the pipeline, how the automation moved, and what the handoff produced.</p>
  </div>

  <div class="case-study-strip reveal">
    <div class="case-study-note">
      <span class="case-dot"></span>
      <span>Interactive diagrams are simplified from production workflows for confidentiality.</span>
    </div>
    <div class="case-study-stats">
      <span><b>4</b> AI systems</span>
      <span><b>3</b> automation stacks</span>
      <span><b>Live</b> workflow logic</span>
    </div>
  </div>

  <div class="projects">
    <div class="project reveal">
      <div class="p-copy">
        <div class="p-head"><span class="num">P/01</span><span>Confidential Client Project &middot; Freight Voice AI</span><span class="bar"></span></div>
        <h3 class="p-title">Freight AI Voice Agent<br>for outbound lead qualification</h3>
        <p class="p-desc">A confidential freight and logistics client project built with <b>GoHighLevel workflow automation</b> and <b>Synthflow AI</b>. The agent calls CRM leads, asks whether they need container or freight shipping, qualifies interested prospects, captures shipment details, and emails the qualified lead summary to the client inbox.</p>
        <div class="p-metrics"><span><b>CRM</b> lead intake</span><span><b>Voice</b> qualification</span><span><b>Email</b> handoff</span></div>
        <ul class="p-bullets">
          <li><b>Synthflow</b> runs the outbound voice call and asks freight qualification questions in a natural call flow.</li>
          <li><b>GoHighLevel</b> orchestrates CRM lead intake, call routing, retry logic, status updates and handoff automation.</li>
          <li>Captures weight, shipment size, pickup country/location and destination country/location, then emails qualified lead details to the client.</li>
        </ul>
        <div class="p-stack"><span>Synthflow AI</span><span>GoHighLevel</span><span>CRM Automation</span><span>Webhooks</span><span>Email Handoff</span><span>Retry Logic</span></div>
      </div>
      <div class="p-diagram" data-label="Freight Voice Flow"></div>
    </div>

    <div class="project reverse reveal">
      <div class="p-copy">
        <div class="p-head"><span class="num">P/02</span><span>Confidential Client Project &middot; Lead Generation</span><span class="bar"></span></div>
        <h3 class="p-title">Automated Job &amp; Lead Scraper<br>with enrichment + outreach</h3>
        <p class="p-desc">A confidential client automation project: an end-to-end n8n pipeline that scrapes fresh job postings from LinkedIn, enriches company and candidate data, and launches personalized outreach while keeping client-specific sources and targeting details private.</p>
        <div class="p-metrics"><span><b>Scrape</b> jobs</span><span><b>Enrich</b> contacts</span><span><b>Launch</b> outreach</span></div>
        <ul class="p-bullets">
          <li><b>Apify actors</b> pull targeted job listings and company signals from LinkedIn at scale.</li>
          <li><b>Clay</b> enriches rows with firmographics, tech stack and verified contact info.</li>
          <li><b>Instantly</b> sends sequenced, personalized outreach &mdash; all orchestrated inside an <b>n8n</b> graph.</li>
        </ul>
        <div class="p-stack"><span>n8n</span><span>Apify</span><span>Clay</span><span>Instantly</span><span>LinkedIn</span><span>Postgres</span></div>
      </div>
      <div class="p-diagram" data-label="Lead Engine"></div>
    </div>

    <div class="project reveal">
      <div class="p-copy">
        <div class="p-head"><span class="num">P/03</span><span>Confidential Company Project &middot; Business Intelligence</span><span class="bar"></span></div>
        <h3 class="p-title">AI Business Analyzer<br>&amp; Content Generator</h3>
        <p class="p-desc">A confidential company-facing AI system that audits a business URL for services, SEO and competitive positioning, then produces an improvement report and AI-generated marketing video calibrated to the brand voice and identified growth gaps.</p>
        <div class="p-metrics"><span><b>Audit</b> website</span><span><b>Score</b> gaps</span><span><b>Generate</b> assets</span></div>
        <ul class="p-bullets">
          <li>Scrapes sitemap + page content, runs SEO &amp; competitor checks with LLM-scored ratings.</li>
          <li>Produces an <b>actionable improvement report</b> ranked by revenue impact.</li>
          <li>Generative <b>video module</b> spins up tailored marketing assets from the audit output.</li>
        </ul>
        <div class="p-stack"><span>Python</span><span>OpenAI API</span><span>LangChain</span><span>Playwright</span><span>FFmpeg</span><span>GCP</span></div>
      </div>
      <div class="p-diagram" data-label="Business Intelligence"></div>
    </div>

    <div class="project reverse reveal workflow-project">
      <div class="p-copy">
        <div class="p-head"><span class="num">P/04</span><span>Confidential Client Project &middot; Voice Automation</span><span class="bar"></span></div>
        <h3 class="p-title">n8n + Synthflow Voice Agent<br>Automation Suite</h3>
        <p class="p-desc">A production voice-agent automation built for a confidential client engagement, with identifying details intentionally omitted. The system replaced a fragile CRM workflow with two n8n flows that intake leads from Google Sheets, trigger Synthflow AI calls, and process every post-call outcome through retry, callback and audit logic.</p>
        <div class="p-metrics"><span><b>Pre-call</b> routing</span><span><b>Webhook</b> results</span><span><b>Audit</b> writeback</span></div>
        <ul class="p-bullets">
          <li><b>Pre-call workflow</b> watches new sheet rows, validates lead IDs, cleans phone fields and dials the first unique available number through Synthflow.</li>
          <li><b>Post-call workflow</b> receives Synthflow webhooks, identifies which number was contacted, then routes success, retries, callbacks and next-number escalation.</li>
          <li><b>Operational controls</b> include per-number retry limits, callback flags, deduplication and real-time Google Sheets write-back for a clean audit trail.</li>
        </ul>
        <div class="p-stack"><span>n8n</span><span>Synthflow AI</span><span>Google Sheets</span><span>Webhooks</span><span>JavaScript</span><span>REST API</span></div>
      </div>
      <div class="p-diagram workflow-3d" data-label="Voice Ops Suite"></div>
    </div>
  </div>
</section>`;

const voiceStates = {
  capture: {
    title: 'Freight lead imported from CRM',
    line: 'GHL selects the freight lead and sends context into Synthflow.',
    meta: 'Action: CRM lead -> outbound call',
  },
  qualify: {
    title: 'Shipping interest confirmed',
    line: 'The agent confirms container or freight shipping interest.',
    meta: 'Action: yes intent -> freight script',
  },
  booked: {
    title: 'Qualified freight details captured',
    line: 'Weight, load size and lane details are ready for handoff.',
    meta: 'Action: collect freight data -> email client',
  },
  won: {
    title: 'Qualified lead emailed to client',
    line: 'The freight lead summary is sent to the client inbox.',
    meta: 'Action: format summary -> update CRM',
  },
  follow: {
    title: 'Retry branch activated',
    line: 'Busy, voicemail and failed calls move into retry logic.',
    meta: 'Action: call error -> wait -> redial',
  },
};

const analyzerStates = {
  overview: { score: '82', offset: '30', status: 'analysis refreshed', label: 'FULL_AUDIT_RUN.json' },
  seo: { score: '68', offset: '52', status: 'SEO priority selected', label: 'SEO_FIX_QUEUE.md' },
  competitor: { score: '74', offset: '43', status: 'competitor gap selected', label: 'POSITIONING_DRAFT.md' },
  video: { score: '88', offset: '20', status: 'video render selected', label: 'RENDER_PREVIEW.mp4' },
  report: { score: '91', offset: '15', status: 'executive report selected', label: 'IMPACT_REPORT.pdf' },
};

const workflowStates = {
  pre: {
    caption: 'pre-call intake path selected',
    audit: 'sync status -> selected number -> call started -> row updated',
  },
  post: {
    caption: 'post-call webhook path selected',
    audit: 'lead_id lookup -> number matched -> outcome evaluated -> sheet updated',
  },
  retry: {
    caption: 'retry branch selected',
    audit: 'no answer -> wait node -> retry limit checked -> Synthflow redial',
  },
  next: {
    caption: 'next-number escalation selected',
    audit: 'phone 1 exhausted -> phone 2 check -> mobile fallback -> status logged',
  },
  callback: {
    caption: 'callback management selected',
    audit: 'callback intent -> flag set -> contact stays active -> future dial scheduled',
  },
};

function setText(root, key, value) {
  const node = root.querySelector(`[data-dynamic="${key}"]`);
  if (node) node.textContent = value;
}

function bindStatefulDiagram(root, states, initial, onApply) {
  if (!root) return () => {};
  const controls = [...root.querySelectorAll('[data-option]')];
  const card = root.closest('.p-diagram');
  let engageTimer = 0;
  const apply = (state) => {
    root.dataset.state = state;
    controls.forEach((control) => {
      const active = control.dataset.option === state;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    onApply(root, state, states[state]);
  };
  const cleanups = controls.map((control) => {
    control.setAttribute('role', control.getAttribute('role') || 'button');
    control.setAttribute('tabindex', control.getAttribute('tabindex') || '0');
    const handler = (event) => {
      const isKeyboard = event.type === 'keydown';
      if (isKeyboard && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      card?.classList.add('is-engaged');
      if (engageTimer) window.clearTimeout(engageTimer);
      engageTimer = window.setTimeout(() => card?.classList.remove('is-engaged'), 1400);
      apply(control.dataset.option);
    };
    control.addEventListener('click', handler);
    control.addEventListener('keydown', handler);
    return () => {
      control.removeEventListener('click', handler);
      control.removeEventListener('keydown', handler);
    };
  });
  apply(initial);
  return () => {
    if (engageTimer) window.clearTimeout(engageTimer);
    cleanups.forEach((cleanup) => cleanup());
  };
}

export default function WorkSection() {
  useEffect(() => {
    const projects = [...document.querySelectorAll('#work .project')];
    const voiceDiagram = projects[0]?.querySelector('.p-diagram');
    const scraperDiagram = projects[1]?.querySelector('.p-diagram');
    const analyzerRoot = projects[2]?.querySelector('.p-diagram');
    const workflowDiagram = document.querySelector('.workflow-project .p-diagram');
    let analyzerFlashTimer = 0;

    if (voiceDiagram) voiceDiagram.innerHTML = freightWorkflowDiagram;
    if (scraperDiagram) scraperDiagram.innerHTML = leadScraperDiagram;
    if (analyzerRoot) analyzerRoot.innerHTML = analyzerDiagram;
    if (workflowDiagram) workflowDiagram.innerHTML = cleanConfidentialWorkflowDiagram;

    const voiceRoot = voiceDiagram?.querySelector('.voice-crm-diagram');
    const analyzerDiagramRoot = analyzerRoot?.querySelector('.analyzer-diagram');
    const workflowDiagramRoot = workflowDiagram?.querySelector('.workflow-3d');

    const cleanups = [
      bindStatefulDiagram(
        voiceRoot,
        voiceStates,
        'booked',
        (root, state, data) => {
          setText(root, 'voice-title', data.title);
          setText(root, 'voice-line', data.line);
          setText(root, 'voice-meta', data.meta);
          root.querySelectorAll('.voice-link').forEach((path) => {
            path.classList.toggle('is-lit', path.classList.contains(`link-${state}`));
          });
        }
      ),
      bindStatefulDiagram(
        analyzerDiagramRoot,
        analyzerStates,
        'overview',
        (root, state, data) => {
          setText(root, 'score', data.score);
          setText(root, 'status', data.status);
          setText(root, 'preview-label', data.label);
          root.querySelector('.gauge-ring')?.setAttribute('stroke-dashoffset', data.offset);
          if (analyzerFlashTimer) window.clearTimeout(analyzerFlashTimer);
          root.classList.add('is-processing');
          analyzerFlashTimer = window.setTimeout(() => root.classList.remove('is-processing'), 520);
        }
      ),
      bindStatefulDiagram(
        workflowDiagramRoot,
        workflowStates,
        'pre',
        (root, state, data) => {
          setText(root, 'workflow-caption', data.caption);
          setText(root, 'workflow-audit', data.audit);
          root.querySelectorAll('.workflow-link').forEach((path) => {
            path.classList.toggle('is-lit', path.classList.contains(`route-${state}`));
          });
        }
      ),
    ];

    return () => {
      if (analyzerFlashTimer) window.clearTimeout(analyzerFlashTimer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <RawHtml html={enhancedHtml} />;
}
