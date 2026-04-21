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
          <text x="66" y="46" text-anchor="middle" fill="oklch(0.82 0.14 210)">FREIGHT VOICE AI</text>
          <text x="66" y="66" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="13">Intent + Fit</text>
          <text x="66" y="84" text-anchor="middle" fill="#8a93a8">ship? lane? timing?</text>
        </g>

        <g class="voice-node" transform="translate(386,120)" data-option="booked" role="button" tabindex="0" aria-label="Show booked state">
          <rect class="node-panel" width="104" height="82" rx="13" fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.18)" filter="url(#voiceDepth)"></rect>
          <text x="52" y="25" text-anchor="middle" fill="oklch(0.78 0.14 155)">GHL WORKFLOW</text>
          <text x="52" y="47" text-anchor="middle" fill="#e7ebf3" font-family="Space Grotesk" font-size="13">Qualify + Email</text>
          <text x="52" y="65" text-anchor="middle" fill="#8a93a8">client inbox</text>
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
        <text x="14" y="20" fill="#5c6478">LIVE_CALL_STATE</text>
        <text x="14" y="42" fill="oklch(0.82 0.14 210)" data-dynamic="voice-title">Qualified freight details captured</text>
        <text x="14" y="60" fill="#e7ebf3" data-dynamic="voice-line">Weight, load size, pickup country and delivery destination are structured for handoff.</text>
        <text x="14" y="78" fill="#8a93a8" data-dynamic="voice-meta">Action: update_ghl -> format_lead -> email_client</text>
        <g class="voice-action-chip" data-option="won" role="button" tabindex="0" transform="translate(382,13)"><rect width="54" height="24" rx="7"></rect><text x="27" y="16" text-anchor="middle">Won</text></g>
        <g class="voice-action-chip" data-option="follow" role="button" tabindex="0" transform="translate(446,13)"><rect width="68" height="24" rx="7"></rect><text x="34" y="16" text-anchor="middle">Follow-up</text></g>
      </g>
    </svg>
  </div>`;

const analyzerDiagram = `
  <div class="interactive-diagram analyzer-diagram" data-state="overview">
    <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive business analyzer workflow">
      <defs>
        <linearGradient id="analyzerGrad" x1="0" x2="1"><stop offset="0" stop-color="oklch(0.82 0.14 210)"></stop><stop offset="1" stop-color="oklch(0.72 0.18 290)"></stop></linearGradient>
      </defs>
      <g font-family="JetBrains Mono" font-size="10">
        <rect x="22" y="22" width="556" height="40" rx="11" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.16)"></rect>
        <circle cx="42" cy="42" r="7" fill="none" stroke="oklch(0.82 0.14 210)" stroke-width="1.5"></circle>
        <text x="62" y="46" fill="#e7ebf3">https://acme-robotics.com</text>
        <g class="analyzer-control" data-option="overview" role="button" tabindex="0" transform="translate(480,30)">
          <rect class="control-box" width="82" height="24" rx="7" fill="url(#analyzerGrad)"></rect>
          <text x="41" y="16" text-anchor="middle" fill="#05060a" font-weight="700">ANALYZE</text>
        </g>
      </g>

      <g class="analyzer-gauge" transform="translate(150,185)">
        <circle r="74" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="10"></circle>
        <circle class="gauge-ring" r="74" fill="none" stroke="url(#analyzerGrad)" stroke-width="10" stroke-linecap="round" stroke-dasharray="465" stroke-dashoffset="130" transform="rotate(-90)"></circle>
        <text y="-8" text-anchor="middle" font-family="Space Grotesk" font-size="34" fill="#e7ebf3" data-dynamic="score">72</text>
        <text y="14" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="#8a93a8">AI SCORE / 100</text>
        <text y="38" text-anchor="middle" font-family="JetBrains Mono" font-size="9" fill="oklch(0.82 0.14 210)" data-dynamic="status">brand audit ready</text>
      </g>

      <g transform="translate(280,94)" font-family="JetBrains Mono" font-size="10">
        <g class="analyzer-card" data-option="seo" role="button" tabindex="0" transform="translate(0,0)">
          <rect width="280" height="58" rx="10"></rect>
          <text x="14" y="21" fill="#5c6478" font-size="8">SEO AUDIT</text>
          <text x="14" y="39" fill="#e7ebf3" font-family="Space Grotesk" font-size="12" data-dynamic="seo-title">Missing meta on 14 pages</text>
          <text x="14" y="52" fill="#8a93a8" data-dynamic="seo-sub">Fix -> +18% organic est.</text>
          <text x="248" y="35" text-anchor="middle" fill="oklch(0.82 0.14 80)">WARN</text>
        </g>
        <g class="analyzer-card" data-option="competitor" role="button" tabindex="0" transform="translate(0,74)">
          <rect width="280" height="58" rx="10"></rect>
          <text x="14" y="21" fill="#5c6478" font-size="8">COMPETITOR GAP</text>
          <text x="14" y="39" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">No pricing page vs. 4 rivals</text>
          <text x="14" y="52" fill="#8a93a8">Draft copy auto-generated</text>
          <text x="248" y="35" text-anchor="middle" fill="oklch(0.82 0.14 210)">DRAFT</text>
        </g>
        <g class="analyzer-card" data-option="video" role="button" tabindex="0" transform="translate(0,148)">
          <rect width="280" height="58" rx="10"></rect>
          <text x="14" y="21" fill="#5c6478" font-size="8">VIDEO GEN</text>
          <text x="14" y="39" fill="#e7ebf3" font-family="Space Grotesk" font-size="12">30s ad - brand palette locked</text>
          <text x="14" y="52" fill="#8a93a8">Render queued - est. 4m</text>
          <text x="248" y="35" text-anchor="middle" fill="oklch(0.78 0.14 155)">READY</text>
        </g>
      </g>

      <g transform="translate(38,320)" font-family="JetBrains Mono" font-size="9">
        <text fill="#5c6478" data-dynamic="preview-label">RENDER_PREVIEW.mp4</text>
        <g transform="translate(0,13)">
          <g class="analyzer-thumb" data-option="seo" role="button" tabindex="0"><rect width="92" height="52" rx="7"></rect><circle cx="46" cy="26" r="10" fill="oklch(0.72 0.18 290 / .5)"></circle></g>
          <g class="analyzer-thumb" data-option="competitor" role="button" tabindex="0" transform="translate(104,0)"><rect width="92" height="52" rx="7"></rect><rect x="18" y="19" width="56" height="14" rx="3" fill="oklch(0.82 0.14 210 / .35)"></rect></g>
          <g class="analyzer-thumb" data-option="overview" role="button" tabindex="0" transform="translate(208,0)"><rect width="92" height="52" rx="7"></rect><polygon points="38,17 62,26 38,36" fill="oklch(0.82 0.14 210)"></polygon></g>
          <g class="analyzer-thumb" data-option="video" role="button" tabindex="0" transform="translate(312,0)"><rect width="92" height="52" rx="7"></rect><rect x="18" y="16" width="56" height="20" rx="3" fill="oklch(0.78 0.14 155 / .38)"></rect></g>
          <g class="analyzer-thumb" data-option="report" role="button" tabindex="0" transform="translate(416,0)"><rect width="92" height="52" rx="7"></rect><path d="M24 39 L38 22 L52 30 L70 16 L82 39 Z" fill="oklch(0.82 0.14 80 / .38)"></path></g>
        </g>
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
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(34,82)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><text x="57" y="36" text-anchor="middle">SHEETS TRIGGER</text><text x="57" y="56" text-anchor="middle" font-family="Space Grotesk" font-size="12">New Lead</text><text x="57" y="73" text-anchor="middle">Sync empty</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(199,58)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><text x="57" y="36" text-anchor="middle">LEAD ID GATE</text><text x="57" y="56" text-anchor="middle" font-family="Space Grotesk" font-size="12">Filter</text><text x="57" y="73" text-anchor="middle">skip duplicates</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(368,82)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 68,0 114,20 46,40"></polygon><polygon class="node-face" points="46,40 114,20 114,74 46,96"></polygon><polygon class="node-side" points="0,18 46,40 46,96 0,68"></polygon><text x="57" y="36" text-anchor="middle">PHONE DEDUPE</text><text x="57" y="56" text-anchor="middle" font-family="Space Grotesk" font-size="12">Clean Numbers</text><text x="57" y="73" text-anchor="middle">P1 / P2 / mobile</text></g>
        <g class="workflow-node" data-option="pre" role="button" tabindex="0" transform="translate(484,117)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 58,2 96,20 38,38"></polygon><polygon class="node-face" points="38,38 96,20 96,72 38,92"></polygon><polygon class="node-side" points="0,18 38,38 38,92 0,66"></polygon><text x="48" y="35" text-anchor="middle">SYNTHFLOW</text><text x="48" y="54" text-anchor="middle" font-family="Space Grotesk" font-size="12">AI Call</text><text x="48" y="70" text-anchor="middle">REST v2</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(406,230)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><text x="58" y="38" text-anchor="middle">WEBHOOK</text><text x="58" y="57" text-anchor="middle" font-family="Space Grotesk" font-size="12">Call Result</text><text x="58" y="74" text-anchor="middle">status + duration</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(228,218)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><text x="58" y="38" text-anchor="middle">LOOKUP + SWITCH</text><text x="58" y="57" text-anchor="middle" font-family="Space Grotesk" font-size="12">Match Lead ID</text><text x="58" y="74" text-anchor="middle">which number?</text></g>
        <g class="workflow-node" data-option="post" role="button" tabindex="0" transform="translate(50,242)" filter="url(#nodeDepth4)"><polygon class="node-top" points="0,18 70,0 116,22 46,42"></polygon><polygon class="node-face" points="46,42 116,22 116,76 46,98"></polygon><polygon class="node-side" points="0,18 46,42 46,98 0,70"></polygon><text x="58" y="38" text-anchor="middle">OUTCOME GATE</text><text x="58" y="57" text-anchor="middle" font-family="Space Grotesk" font-size="12">Decide Route</text><text x="58" y="74" text-anchor="middle">complete / retry</text></g>
      </g>
      <g class="workflow-actions" font-family="JetBrains Mono" font-size="9">
        <g data-option="retry" role="button" tabindex="0" transform="translate(236,304)"><rect class="action-chip" width="76" height="28" rx="8"></rect><text x="38" y="18" text-anchor="middle">Wait + Retry</text></g>
        <g data-option="next" role="button" tabindex="0" transform="translate(318,294)"><rect class="action-chip" width="86" height="28" rx="8"></rect><text x="43" y="18" text-anchor="middle">Try Next #</text></g>
        <g data-option="callback" role="button" tabindex="0" transform="translate(416,304)"><rect class="action-chip" width="92" height="28" rx="8"></rect><text x="46" y="18" text-anchor="middle">Callback Flag</text></g>
      </g>
      <g transform="translate(42,362)" font-family="JetBrains Mono" font-size="9">
        <rect class="workflow-audit" width="516" height="38" rx="10"></rect>
        <text x="14" y="15" fill="#5c6478">GOOGLE_SHEETS_WRITEBACK</text>
        <text x="14" y="29" fill="#e7ebf3" data-dynamic="workflow-audit">sync status -> selected number -> call started -> row updated</text>
      </g>
    </svg>
  </div>`;

const html = "<!-- PROJECTS -->\r\n<section id=\"work\">\r\n  <div class=\"section-head reveal\">\r\n    <div>\r\n      <div class=\"section-num\">/ 04 &mdash; selected work</div>\r\n      <h2 class=\"section-title\">Things I've <span class=\"outline\">shipped</span></h2>\r\n    </div>\r\n    <p class=\"section-desc\">Three production systems that span voice AI, lead-gen automation and generative business intelligence.</p>\r\n  </div>\r\n\r\n  <div class=\"projects\">\r\n\r\n    <!-- P01: Voice Agent -->\r\n    <div class=\"project reveal\">\r\n      <div>\r\n        <div class=\"p-head\"><span class=\"num\">P/01</span><span>Voice AI &middot; CRM Automation</span><span class=\"bar\"></span></div>\r\n        <h3 class=\"p-title\">AI Voice Agent<br>for end-to-end customer calls</h3>\r\n        <p class=\"p-desc\">A conversational voice agent that handles natural-language phone calls from prospects and hands the rest of the funnel off to a CRM &mdash; lead qualification, pipeline moves and appointment booking happen without a human dialer.</p>\r\n        <ul class=\"p-bullets\">\r\n          <li><b>Synthflow</b> powers the real-time voice model &mdash; barge-in, turn-taking, natural prosody.</li>\r\n          <li><b>GoHighLevel</b> runs the post-call automation: tags, stages, calendar booking, SMS follow-ups.</li>\r\n          <li>Full loop from cold phone ring to booked demo, zero SDR keystrokes.</li>\r\n        </ul>\r\n        <div class=\"p-stack\"><span>Synthflow</span><span>GoHighLevel</span><span>OpenAI</span><span>Webhooks</span><span>Twilio</span></div>\r\n      </div>\r\n      <div class=\"p-diagram\">\r\n        <!-- SVG: call -> voice agent -> CRM pipeline -->\r\n        <svg viewBox=\"0 0 600 420\" xmlns=\"http://www.w3.org/2000/svg\">\r\n          <defs>\r\n            <linearGradient id=\"g1\" x1=\"0\" x2=\"1\">\r\n              <stop offset=\"0\" stop-color=\"oklch(0.82 0.14 210)\"></stop>\r\n              <stop offset=\"1\" stop-color=\"oklch(0.72 0.18 290)\"></stop>\r\n            </linearGradient>\r\n            <filter id=\"glow\"><feGaussianBlur stdDeviation=\"3\" result=\"b\"></feGaussianBlur><feMerge><feMergeNode in=\"b\"></feMergeNode><feMergeNode in=\"SourceGraphic\"></feMergeNode></feMerge></filter>\r\n          </defs>\r\n          <!-- caller -->\r\n          <g>\r\n            <rect x=\"20\" y=\"170\" width=\"100\" height=\"80\" rx=\"12\" fill=\"rgba(255,255,255,0.03)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n            <circle cx=\"70\" cy=\"200\" r=\"14\" fill=\"none\" stroke=\"#e7ebf3\" stroke-width=\"1.5\"></circle>\r\n            <path d=\"M52 232 q18 -16 36 0\" fill=\"none\" stroke=\"#e7ebf3\" stroke-width=\"1.5\"></path>\r\n            <text x=\"70\" y=\"265\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#8a93a8\">CALLER</text>\r\n          </g>\r\n          <!-- wave line -->\r\n          <path d=\"M120 210 Q 160 180, 200 210 T 280 210\" fill=\"none\" stroke=\"url(#g1)\" stroke-width=\"2\" filter=\"url(#glow)\"></path>\r\n          <circle cx=\"200\" cy=\"210\" r=\"3\" fill=\"oklch(0.82 0.14 210)\"><animate attributeName=\"cx\" values=\"130;280;130\" dur=\"3s\" repeatCount=\"indefinite\"></animate></circle>\r\n\r\n          <!-- synthflow orb -->\r\n          <g transform=\"translate(340,210)\">\r\n            <circle r=\"70\" fill=\"none\" stroke=\"url(#g1)\" stroke-width=\"1\" opacity=\".4\"></circle>\r\n            <circle r=\"54\" fill=\"none\" stroke=\"url(#g1)\" stroke-width=\"1\" opacity=\".6\"></circle>\r\n            <circle r=\"38\" fill=\"rgba(255,255,255,0.02)\" stroke=\"url(#g1)\" stroke-width=\"1.5\" filter=\"url(#glow)\"></circle>\r\n            <g stroke=\"url(#g1)\" stroke-width=\"1.2\" fill=\"none\" opacity=\".9\">\r\n              <path d=\"M-20 0 V-14\"></path><path d=\"M-12 0 V-22\"></path><path d=\"M-4 0 V-28\"></path><path d=\"M4 0 V-22\"></path><path d=\"M12 0 V-16\"></path><path d=\"M20 0 V-10\"></path>\r\n              <path d=\"M-20 0 V14\"></path><path d=\"M-12 0 V22\"></path><path d=\"M-4 0 V28\"></path><path d=\"M4 0 V22\"></path><path d=\"M12 0 V16\"></path><path d=\"M20 0 V10\"></path>\r\n            </g>\r\n            <text y=\"60\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"oklch(0.82 0.14 210)\">SYNTHFLOW &middot; VOICE LLM</text>\r\n          </g>\r\n\r\n          <!-- arrow -->\r\n          <path d=\"M410 210 H 470\" stroke=\"url(#g1)\" stroke-width=\"1.5\" fill=\"none\"></path>\r\n          <path d=\"M465 206 L 472 210 L 465 214\" stroke=\"url(#g1)\" stroke-width=\"1.5\" fill=\"none\"></path>\r\n\r\n          <!-- CRM pipeline -->\r\n          <g transform=\"translate(480,100)\">\r\n            <text x=\"50\" y=\"-10\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#8a93a8\">GHL &middot; PIPELINE</text>\r\n            <rect width=\"100\" height=\"32\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n            <text x=\"50\" y=\"21\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#e7ebf3\">Lead capture</text>\r\n\r\n            <rect y=\"42\" width=\"100\" height=\"32\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n            <text x=\"50\" y=\"63\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#e7ebf3\">Qualified</text>\r\n\r\n            <rect y=\"84\" width=\"100\" height=\"32\" rx=\"6\" fill=\"oklch(0.82 0.14 210 / .15)\" stroke=\"oklch(0.82 0.14 210)\"></rect>\r\n            <text x=\"50\" y=\"105\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"oklch(0.82 0.14 210)\">Booked</text>\r\n\r\n            <rect y=\"126\" width=\"100\" height=\"32\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n            <text x=\"50\" y=\"147\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#e7ebf3\">Won</text>\r\n\r\n            <rect y=\"168\" width=\"100\" height=\"32\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n            <text x=\"50\" y=\"189\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#e7ebf3\">Follow-up</text>\r\n          </g>\r\n\r\n          <!-- transcript panel -->\r\n          <g transform=\"translate(40,310)\">\r\n            <rect width=\"520\" height=\"80\" rx=\"10\" fill=\"rgba(255,255,255,0.02)\" stroke=\"rgba(255,255,255,0.12)\"></rect>\r\n            <text x=\"12\" y=\"18\" font-family=\"JetBrains Mono\" font-size=\"9\" fill=\"#5c6478\">LIVE_TRANSCRIPT.log</text>\r\n            <text x=\"12\" y=\"38\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"oklch(0.82 0.14 210)\">&#9656; agent: \"Hi, this is Aria from the clinic &mdash; is now a good time&copy;\"</text>\r\n            <text x=\"12\" y=\"54\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#e7ebf3\">&#9656; caller: \"Yeah, I wanted to book a consult for next Tuesday.\"</text>\r\n            <text x=\"12\" y=\"70\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#8a93a8\">&#9656; action_taken: calendar.create_event &rarr; GHL stage=Booked &#10003;</text>\r\n          </g>\r\n        </svg>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- P02: Job & Lead Scraper -->\r\n    <div class=\"project reverse reveal\">\r\n      <div>\r\n        <div class=\"p-head\"><span class=\"num\">P/02</span><span>Workflow Automation &middot; Lead Gen</span><span class=\"bar\"></span></div>\r\n        <h3 class=\"p-title\">Automated Job &amp; Lead Scraper<br>with enrichment + outreach</h3>\r\n        <p class=\"p-desc\">An end-to-end n8n pipeline that scrapes fresh job postings from LinkedIn, enriches company + candidate data, and fires personalized cold emails &mdash; replacing a team of researchers with a graph that runs on a cron.</p>\r\n        <ul class=\"p-bullets\">\r\n          <li><b>Apify actors</b> pull targeted job listings and company signals from LinkedIn at scale.</li>\r\n          <li><b>Clay</b> enriches rows with firmographics, tech stack and verified contact info.</li>\r\n          <li><b>Instantly</b> sends sequenced, personalized outreach &mdash; all orchestrated inside an <b>n8n</b> graph.</li>\r\n        </ul>\r\n        <div class=\"p-stack\"><span>n8n</span><span>Apify</span><span>Clay</span><span>Instantly</span><span>LinkedIn</span><span>Postgres</span></div>\r\n      </div>\r\n      <div class=\"p-diagram\">\r\n        <!-- SVG: n8n-style node graph -->\r\n        <svg viewBox=\"0 0 600 420\" xmlns=\"http://www.w3.org/2000/svg\">\r\n          <defs>\r\n            <linearGradient id=\"g2\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"oklch(0.82 0.14 210)\"></stop><stop offset=\"1\" stop-color=\"oklch(0.72 0.18 290)\"></stop></linearGradient>\r\n          </defs>\r\n          <!-- connectors -->\r\n          <g stroke=\"url(#g2)\" stroke-width=\"1.5\" fill=\"none\" opacity=\".8\">\r\n            <path d=\"M120 90 C 180 90, 180 210, 240 210\"></path>\r\n            <path d=\"M240 210 H 360\"></path>\r\n            <path d=\"M360 210 C 420 210, 420 110, 480 110\"></path>\r\n            <path d=\"M360 210 C 420 210, 420 310, 480 310\"></path>\r\n            <path d=\"M120 330 C 180 330, 180 210, 240 210\"></path>\r\n          </g>\r\n          <!-- moving packets -->\r\n          <circle r=\"3\" fill=\"oklch(0.82 0.14 210)\"><animateMotion dur=\"3s\" repeatCount=\"indefinite\" path=\"M120 90 C 180 90, 180 210, 240 210 H 360\"></animateMotion></circle>\r\n          <circle r=\"3\" fill=\"oklch(0.72 0.18 290)\"><animateMotion dur=\"3s\" begin=\"1s\" repeatCount=\"indefinite\" path=\"M360 210 C 420 210, 420 110, 480 110\"></animateMotion></circle>\r\n\r\n          <!-- Nodes -->\r\n          <g font-family=\"JetBrains Mono\" font-size=\"10\">\r\n            <!-- trigger -->\r\n            <g transform=\"translate(40,60)\">\r\n              <rect width=\"80\" height=\"60\" rx=\"12\" fill=\"rgba(255,255,255,0.04)\" stroke=\"oklch(0.82 0.14 210)\"></rect>\r\n              <text x=\"40\" y=\"22\" text-anchor=\"middle\" fill=\"#5c6478\" font-size=\"8\">TRIGGER</text>\r\n              <text x=\"40\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">CRON</text>\r\n              <text x=\"40\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">every 6h</text>\r\n            </g>\r\n            <g transform=\"translate(40,300)\">\r\n              <rect width=\"80\" height=\"60\" rx=\"12\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n              <text x=\"40\" y=\"22\" text-anchor=\"middle\" fill=\"#5c6478\" font-size=\"8\">INPUT</text>\r\n              <text x=\"40\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">ICP list</text>\r\n              <text x=\"40\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">Sheets</text>\r\n            </g>\r\n\r\n            <!-- Apify scraper -->\r\n            <g transform=\"translate(240,180)\">\r\n              <rect x=\"-60\" y=\"0\" width=\"120\" height=\"60\" rx=\"12\" fill=\"oklch(0.82 0.14 210 / .1)\" stroke=\"oklch(0.82 0.14 210)\"></rect>\r\n              <text x=\"0\" y=\"22\" text-anchor=\"middle\" fill=\"oklch(0.82 0.14 210)\" font-size=\"8\">SCRAPE</text>\r\n              <text x=\"0\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">Apify &middot; LinkedIn</text>\r\n              <text x=\"0\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">actor.run()</text>\r\n            </g>\r\n\r\n            <!-- Clay enrich -->\r\n            <g transform=\"translate(360,180)\">\r\n              <rect x=\"-60\" y=\"0\" width=\"120\" height=\"60\" rx=\"12\" fill=\"oklch(0.72 0.18 290 / .1)\" stroke=\"oklch(0.72 0.18 290)\"></rect>\r\n              <text x=\"0\" y=\"22\" text-anchor=\"middle\" fill=\"oklch(0.72 0.18 290)\" font-size=\"8\">ENRICH</text>\r\n              <text x=\"0\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">Clay tables</text>\r\n              <text x=\"0\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">+ firmographics</text>\r\n            </g>\r\n\r\n            <!-- Instantly send -->\r\n            <g transform=\"translate(480,80)\">\r\n              <rect width=\"80\" height=\"60\" rx=\"12\" fill=\"rgba(255,255,255,0.04)\" stroke=\"oklch(0.78 0.14 155)\"></rect>\r\n              <text x=\"40\" y=\"22\" text-anchor=\"middle\" fill=\"oklch(0.78 0.14 155)\" font-size=\"8\">SEND</text>\r\n              <text x=\"40\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">Instantly</text>\r\n              <text x=\"40\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">sequence #3</text>\r\n            </g>\r\n\r\n            <!-- Postgres store -->\r\n            <g transform=\"translate(480,280)\">\r\n              <rect width=\"80\" height=\"60\" rx=\"12\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.2)\"></rect>\r\n              <text x=\"40\" y=\"22\" text-anchor=\"middle\" fill=\"#5c6478\" font-size=\"8\">STORE</text>\r\n              <text x=\"40\" y=\"40\" text-anchor=\"middle\" fill=\"#e7ebf3\">Postgres</text>\r\n              <text x=\"40\" y=\"53\" text-anchor=\"middle\" fill=\"#8a93a8\" font-size=\"8\">leads.events</text>\r\n            </g>\r\n          </g>\r\n\r\n          <!-- Stats ribbon -->\r\n          <g transform=\"translate(40,380)\">\r\n            <text font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#5c6478\">\r\n              <tspan x=\"0\">RUNS/WK &#9656; <tspan fill=\"#e7ebf3\">28</tspan></tspan>\r\n              <tspan x=\"130\">LEADS &#9656; <tspan fill=\"#e7ebf3\">3.4k</tspan></tspan>\r\n              <tspan x=\"230\">REPLIES &#9656; <tspan fill=\"oklch(0.82 0.14 210)\">11.2%</tspan></tspan>\r\n              <tspan x=\"370\">TIME SAVED &#9656; <tspan fill=\"oklch(0.78 0.14 155)\">~22 hrs</tspan></tspan>\r\n            </text>\r\n          </g>\r\n        </svg>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- P03: Business Analyzer -->\r\n    <div class=\"project reveal\">\r\n      <div>\r\n        <div class=\"p-head\"><span class=\"num\">P/03</span><span>Generative AI &middot; Business Intelligence</span><span class=\"bar\"></span></div>\r\n        <h3 class=\"p-title\">AI Business Analyzer<br>&amp; Content Generator</h3>\r\n        <p class=\"p-desc\">Point it at a company URL and it audits services, SEO and competitive positioning &mdash; then drops an AI-generated marketing video calibrated to the brand's voice and the gaps it found.</p>\r\n        <ul class=\"p-bullets\">\r\n          <li>Scrapes sitemap + page content, runs SEO &amp; competitor checks with LLM-scored ratings.</li>\r\n          <li>Produces an <b>actionable improvement report</b> ranked by revenue impact.</li>\r\n          <li>Generative <b>video module</b> spins up tailored marketing assets from the audit output.</li>\r\n        </ul>\r\n        <div class=\"p-stack\"><span>Python</span><span>OpenAI API</span><span>LangChain</span><span>Playwright</span><span>FFmpeg</span><span>GCP</span></div>\r\n      </div>\r\n      <div class=\"p-diagram\">\r\n        <!-- SVG: dashboard mock with score gauge + modules -->\r\n        <svg viewBox=\"0 0 600 420\" xmlns=\"http://www.w3.org/2000/svg\">\r\n          <defs>\r\n            <linearGradient id=\"g3\" x1=\"0\" x2=\"1\"><stop offset=\"0\" stop-color=\"oklch(0.82 0.14 210)\"></stop><stop offset=\"1\" stop-color=\"oklch(0.72 0.18 290)\"></stop></linearGradient>\r\n          </defs>\r\n          <!-- URL bar -->\r\n          <g>\r\n            <rect x=\"20\" y=\"20\" width=\"560\" height=\"36\" rx=\"10\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n            <circle cx=\"40\" cy=\"38\" r=\"6\" fill=\"none\" stroke=\"oklch(0.82 0.14 210)\" stroke-width=\"1.5\"></circle>\r\n            <text x=\"60\" y=\"42\" font-family=\"JetBrains Mono\" font-size=\"11\" fill=\"#e7ebf3\">https://acme-robotics.com</text>\r\n            <rect x=\"480\" y=\"28\" width=\"90\" height=\"20\" rx=\"6\" fill=\"url(#g3)\"></rect>\r\n            <text x=\"525\" y=\"42\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"10\" fill=\"#05060a\" font-weight=\"600\">ANALYZE</text>\r\n          </g>\r\n\r\n          <!-- Score gauge -->\r\n          <g transform=\"translate(140,180)\">\r\n            <circle r=\"70\" fill=\"none\" stroke=\"rgba(255,255,255,0.08)\" stroke-width=\"10\"></circle>\r\n            <circle r=\"70\" fill=\"none\" stroke=\"url(#g3)\" stroke-width=\"10\" stroke-linecap=\"round\" stroke-dasharray=\"440\" stroke-dashoffset=\"140\" transform=\"rotate(-90)\"></circle>\r\n            <text y=\"-6\" text-anchor=\"middle\" font-family=\"Space Grotesk\" font-size=\"34\" fill=\"#e7ebf3\" font-weight=\"500\">72</text>\r\n            <text y=\"14\" text-anchor=\"middle\" font-family=\"JetBrains Mono\" font-size=\"9\" fill=\"#8a93a8\">AI SCORE / 100</text>\r\n          </g>\r\n\r\n          <!-- Module cards -->\r\n          <g font-family=\"JetBrains Mono\" font-size=\"10\" transform=\"translate(260,80)\">\r\n            <g transform=\"translate(0,0)\">\r\n              <rect width=\"300\" height=\"64\" rx=\"10\" fill=\"rgba(255,255,255,0.03)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <text x=\"14\" y=\"24\" fill=\"#5c6478\" font-size=\"9\">SEO AUDIT</text>\r\n              <text x=\"14\" y=\"42\" fill=\"#e7ebf3\" font-size=\"12\" font-family=\"Space Grotesk\">Missing meta on 14 pages</text>\r\n              <text x=\"14\" y=\"56\" fill=\"#8a93a8\">Fix &rarr; +18% organic est.</text>\r\n              <rect x=\"240\" y=\"22\" width=\"44\" height=\"20\" rx=\"4\" fill=\"oklch(0.82 0.14 80 / .2)\" stroke=\"oklch(0.82 0.14 80)\"></rect>\r\n              <text x=\"262\" y=\"36\" text-anchor=\"middle\" fill=\"oklch(0.82 0.14 80)\" font-size=\"9\">WARN</text>\r\n            </g>\r\n            <g transform=\"translate(0,78)\">\r\n              <rect width=\"300\" height=\"64\" rx=\"10\" fill=\"rgba(255,255,255,0.03)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <text x=\"14\" y=\"24\" fill=\"#5c6478\" font-size=\"9\">COMPETITOR GAP</text>\r\n              <text x=\"14\" y=\"42\" fill=\"#e7ebf3\" font-size=\"12\" font-family=\"Space Grotesk\">No pricing page vs. 4 rivals</text>\r\n              <text x=\"14\" y=\"56\" fill=\"#8a93a8\">Draft copy auto-generated</text>\r\n              <rect x=\"240\" y=\"22\" width=\"44\" height=\"20\" rx=\"4\" fill=\"oklch(0.82 0.14 210 / .2)\" stroke=\"oklch(0.82 0.14 210)\"></rect>\r\n              <text x=\"262\" y=\"36\" text-anchor=\"middle\" fill=\"oklch(0.82 0.14 210)\" font-size=\"9\">DRAFT</text>\r\n            </g>\r\n            <g transform=\"translate(0,156)\">\r\n              <rect width=\"300\" height=\"64\" rx=\"10\" fill=\"rgba(255,255,255,0.03)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <text x=\"14\" y=\"24\" fill=\"#5c6478\" font-size=\"9\">VIDEO GEN</text>\r\n              <text x=\"14\" y=\"42\" fill=\"#e7ebf3\" font-size=\"12\" font-family=\"Space Grotesk\">30s ad &middot; brand palette locked</text>\r\n              <text x=\"14\" y=\"56\" fill=\"#8a93a8\">Render queued &middot; est. 4m</text>\r\n              <rect x=\"240\" y=\"22\" width=\"44\" height=\"20\" rx=\"4\" fill=\"oklch(0.78 0.14 155 / .2)\" stroke=\"oklch(0.78 0.14 155)\"></rect>\r\n              <text x=\"262\" y=\"36\" text-anchor=\"middle\" fill=\"oklch(0.78 0.14 155)\" font-size=\"9\">READY</text>\r\n            </g>\r\n          </g>\r\n\r\n          <!-- video filmstrip -->\r\n          <g transform=\"translate(40,320)\">\r\n            <text font-family=\"JetBrains Mono\" font-size=\"9\" fill=\"#5c6478\">RENDER_PREVIEW.mp4</text>\r\n            <g transform=\"translate(0,10)\">\r\n              <rect x=\"0\" y=\"0\" width=\"90\" height=\"60\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <rect x=\"100\" y=\"0\" width=\"90\" height=\"60\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <rect x=\"200\" y=\"0\" width=\"90\" height=\"60\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"oklch(0.82 0.14 210)\"></rect>\r\n              <rect x=\"300\" y=\"0\" width=\"90\" height=\"60\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <rect x=\"400\" y=\"0\" width=\"90\" height=\"60\" rx=\"6\" fill=\"rgba(255,255,255,0.04)\" stroke=\"rgba(255,255,255,0.15)\"></rect>\r\n              <!-- play icon on middle -->\r\n              <polygon points=\"238,20 260,30 238,40\" fill=\"oklch(0.82 0.14 210)\"></polygon>\r\n              <!-- mock thumbnails: simple geometric -->\r\n              <circle cx=\"45\" cy=\"30\" r=\"10\" fill=\"oklch(0.72 0.18 290 / .4)\"></circle>\r\n              <rect x=\"115\" y=\"20\" width=\"60\" height=\"20\" rx=\"3\" fill=\"oklch(0.82 0.14 210 / .3)\"></rect>\r\n              <rect x=\"315\" y=\"15\" width=\"60\" height=\"30\" rx=\"3\" fill=\"oklch(0.78 0.14 155 / .3)\"></rect>\r\n              <path d=\"M420 45 L435 25 L450 35 L470 20 L480 45 Z\" fill=\"oklch(0.82 0.14 80 / .3)\"></path>\r\n            </g>\r\n          </g>\r\n        </svg>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</section>";

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

const enhancedHtml = html
  .replace(
    "Three production systems that span voice AI, lead-gen automation and generative business intelligence.",
    "Four confidential client and company projects spanning voice AI, workflow automation, lead generation and generative business intelligence."
  )
  .replace(
    '<div class="p-head"><span class="num">P/01</span><span>Voice AI &middot; CRM Automation</span><span class="bar"></span></div>',
    '<div class="p-head"><span class="num">P/01</span><span>Confidential Client Project &middot; Freight Voice AI</span><span class="bar"></span></div>'
  )
  .replace(
    '<h3 class="p-title">AI Voice Agent<br>for end-to-end customer calls</h3>',
    '<h3 class="p-title">Freight AI Voice Agent<br>for outbound lead qualification</h3>'
  )
  .replace(
    '<p class="p-desc">A conversational voice agent that handles natural-language phone calls from prospects and hands the rest of the funnel off to a CRM &mdash; lead qualification, pipeline moves and appointment booking happen without a human dialer.</p>',
    '<p class="p-desc">A confidential freight and logistics client project built with <b>GoHighLevel workflow automation</b> and <b>Synthflow AI</b>. The agent calls CRM leads, asks whether they need container or freight shipping, qualifies interested prospects, captures shipment details, and emails the qualified lead summary to the client inbox.</p>'
  )
  .replace(
    '<li><b>Synthflow</b> powers the real-time voice model &mdash; barge-in, turn-taking, natural prosody.</li>\r\n          <li><b>GoHighLevel</b> runs the post-call automation: tags, stages, calendar booking, SMS follow-ups.</li>\r\n          <li>Full loop from cold phone ring to booked demo, zero SDR keystrokes.</li>',
    '<li><b>Synthflow</b> runs the outbound voice call and asks freight qualification questions in a natural call flow.</li>\r\n          <li><b>GoHighLevel</b> orchestrates CRM lead intake, call routing, retry logic, status updates and handoff automation.</li>\r\n          <li>Captures weight, shipment size, pickup country/location and destination country/location, then emails qualified lead details to the client.</li>'
  )
  .replace(
    '<div class="p-stack"><span>Synthflow</span><span>GoHighLevel</span><span>OpenAI</span><span>Webhooks</span><span>Twilio</span></div>',
    '<div class="p-stack"><span>Synthflow AI</span><span>GoHighLevel</span><span>CRM Automation</span><span>Webhooks</span><span>Email Handoff</span><span>Retry Logic</span></div>'
  )
  .replace(
    '<div class="p-head"><span class="num">P/02</span><span>Workflow Automation &middot; Lead Gen</span><span class="bar"></span></div>',
    '<div class="p-head"><span class="num">P/02</span><span>Confidential Client Project &middot; Lead Generation</span><span class="bar"></span></div>'
  )
  .replace(
    '<p class="p-desc">An end-to-end n8n pipeline that scrapes fresh job postings from LinkedIn, enriches company + candidate data, and fires personalized cold emails &mdash; replacing a team of researchers with a graph that runs on a cron.</p>',
    '<p class="p-desc">A confidential client automation project: an end-to-end n8n pipeline that scrapes fresh job postings from LinkedIn, enriches company and candidate data, and launches personalized outreach while keeping client-specific sources and targeting details private.</p>'
  )
  .replace(
    '<div class="p-head"><span class="num">P/03</span><span>Generative AI &middot; Business Intelligence</span><span class="bar"></span></div>',
    '<div class="p-head"><span class="num">P/03</span><span>Confidential Company Project &middot; Business Intelligence</span><span class="bar"></span></div>'
  )
  .replace(
    '<p class="p-desc">Point it at a company URL and it audits services, SEO and competitive positioning &mdash; then drops an AI-generated marketing video calibrated to the brand\'s voice and the gaps it found.</p>',
    '<p class="p-desc">A confidential company-facing AI system that audits a business URL for services, SEO and competitive positioning, then produces an improvement report and AI-generated marketing video calibrated to the brand voice and identified growth gaps.</p>'
  )
  .replace("\r\n\r\n  </div>\r\n</section>", `${voiceAutomationProject}\r\n\r\n  </div>\r\n</section>`);

const voiceStates = {
  capture: {
    title: 'Freight lead imported from CRM',
    line: 'GHL workflow selects an outbound freight lead and sends contact context into Synthflow.',
    meta: 'Action: CRM lead -> GHL trigger -> Synthflow outbound call',
  },
  qualify: {
    title: 'Shipping interest confirmed',
    line: 'The agent asks whether the prospect needs container or freight shipping support.',
    meta: 'Action: detect_yes -> qualify_intent -> continue freight script',
  },
  booked: {
    title: 'Qualified freight details captured',
    line: 'Weight, load size, pickup country and delivery destination are structured for handoff.',
    meta: 'Action: collect_weight_size -> pickup_location -> destination_location',
  },
  won: {
    title: 'Qualified lead emailed to client',
    line: 'The completed freight lead summary is sent to the client inbox for sales follow-up.',
    meta: 'Action: format_summary -> send_email -> update CRM stage',
  },
  follow: {
    title: 'Retry branch activated',
    line: 'Busy lines, voicemail, failed calls, or first-call errors are routed into wait-and-redial logic.',
    meta: 'Action: detect_call_error -> wait -> retry outbound call',
  },
};

const analyzerStates = {
  overview: { score: '82', offset: '85', status: 'analysis refreshed', label: 'FULL_AUDIT_RUN.json' },
  seo: { score: '68', offset: '150', status: 'SEO priority selected', label: 'SEO_FIX_QUEUE.md' },
  competitor: { score: '74', offset: '122', status: 'competitor gap selected', label: 'POSITIONING_DRAFT.md' },
  video: { score: '88', offset: '58', status: 'video render selected', label: 'RENDER_PREVIEW.mp4' },
  report: { score: '91', offset: '40', status: 'executive report selected', label: 'IMPACT_REPORT.pdf' },
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
    const analyzerRoot = projects[2]?.querySelector('.p-diagram');
    const workflowDiagram = document.querySelector('.workflow-project .p-diagram');

    if (voiceDiagram) voiceDiagram.innerHTML = voiceCrmDiagram;
    if (analyzerRoot) analyzerRoot.innerHTML = analyzerDiagram;
    if (workflowDiagram) workflowDiagram.innerHTML = confidentialWorkflowDiagram;

    const cleanups = [
      bindStatefulDiagram(
        document.querySelector('.voice-crm-diagram'),
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
        document.querySelector('.analyzer-diagram'),
        analyzerStates,
        'overview',
        (root, state, data) => {
          setText(root, 'score', data.score);
          setText(root, 'status', data.status);
          setText(root, 'preview-label', data.label);
          root.querySelector('.gauge-ring')?.setAttribute('stroke-dashoffset', data.offset);
          root.classList.add('is-processing');
          window.setTimeout(() => root.classList.remove('is-processing'), 520);
        }
      ),
      bindStatefulDiagram(
        document.querySelector('.workflow-3d'),
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

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <RawHtml html={enhancedHtml} />;
}
