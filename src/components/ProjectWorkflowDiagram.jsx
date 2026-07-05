import { useEffect, useRef } from "react";

const FREIGHT_VOICE_SVG = `<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="p1bg" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#1e1b16"/>
      <stop offset="100%" stop-color="#0d0b09"/>
    </radialGradient>
    <radialGradient id="p1glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff5b1d" stop-opacity=".06"/>
      <stop offset="100%" stop-color="#ff5b1d" stop-opacity="0"/>
    </radialGradient>
    <pattern id="p1dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r=".7" fill="rgba(240,233,216,.07)"/>
    </pattern>
  </defs>
  <rect width="960" height="540" fill="url(#p1bg)"/>
  <rect width="960" height="540" fill="url(#p1dots)"/>
  <rect width="960" height="540" fill="url(#p1glow)"/>
  <rect x="28" y="18" width="196" height="22" rx="5" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.11)" stroke-width="1"/>
  <circle cx="43" cy="29" r="3.5" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="53" y="33.5" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">FREIGHT VOICE AGENT</text>
  <rect x="618" y="18" width="72" height="22" rx="5" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.22)" stroke-width="1"/>
  <text x="654" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">INTAKE</text>
  <rect x="698" y="18" width="64" height="22" rx="5" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.22)" stroke-width="1"/>
  <text x="730" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">VOICE</text>
  <rect x="770" y="18" width="82" height="22" rx="5" fill="rgba(130,201,142,.06)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="811" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">HANDOFF</text>
  <text x="932" y="33.5" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="8" fill="#3d3a35" letter-spacing=".06em">LIVE SYSTEM</text>
  <rect x="28" y="52" width="152" height="106" rx="11" fill="rgba(240,233,216,.045)" stroke="rgba(240,233,216,.13)" stroke-width="1"/>
  <text x="40" y="70" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">01 · INTAKE</text>
  <rect x="144" y="57" width="27" height="27" rx="7" fill="rgba(240,233,216,.06)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <rect x="149" y="62" width="17" height="17" rx="2" stroke="#a39d8c" fill="none" stroke-width="1.4"/>
  <line x1="149" y1="67" x2="166" y2="67" stroke="#a39d8c" stroke-width="1"/>
  <line x1="154" y1="62" x2="154" y2="79" stroke="#a39d8c" stroke-width="1"/>
  <text x="40" y="96" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">CRM Lead Queue</text>
  <text x="40" y="113" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">GoHighLevel CRM</text>
  <text x="40" y="127" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">New rows trigger flow</text>
  <rect x="40" y="138" width="80" height="14" rx="3" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="80" y="148" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c" letter-spacing=".07em">GOHIGHLEVEL</text>
  <text x="200" y="95" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Lead data</text>
  <line x1="183" y1="105" x2="208" y2="105" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="210,102 217,105 210,108" fill="rgba(255,91,29,.5)"/>
  <circle r="3" fill="#ff5b1d"><animate attributeName="cx" values="184;209;184" dur="1.8s" repeatCount="indefinite"/><animate attributeName="cy" values="105;105;105" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite"/></circle>
  <rect x="216" y="52" width="152" height="106" rx="11" fill="rgba(240,233,216,.045)" stroke="rgba(240,233,216,.13)" stroke-width="1"/>
  <text x="228" y="70" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">02 · VALIDATE</text>
  <rect x="332" y="57" width="27" height="27" rx="7" fill="rgba(240,233,216,.06)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <polyline points="337,71 342,76 352,66" stroke="#a39d8c" fill="none" stroke-width="1.6" stroke-linecap="round"/>
  <text x="228" y="96" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Lead Validation</text>
  <text x="228" y="113" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Verify Lead ID</text>
  <text x="228" y="127" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Clean phone format</text>
  <rect x="228" y="138" width="66" height="14" rx="3" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="261" y="148" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c" letter-spacing=".07em">N8N FILTER</text>
  <text x="388" y="95" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Verified</text>
  <line x1="371" y1="105" x2="396" y2="105" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="398,102 405,105 398,108" fill="rgba(255,91,29,.5)"/>
  <circle r="3" fill="#ff5b1d"><animate attributeName="cx" values="372;397;372" dur="2s" begin=".5s" repeatCount="indefinite"/><animate attributeName="cy" values="105;105;105" dur="2s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" begin=".5s" repeatCount="indefinite"/></circle>
  <rect x="404" y="46" width="152" height="118" rx="11" fill="rgba(255,91,29,.09)" stroke="rgba(255,91,29,.5)" stroke-width="1.5"/>
  <rect x="404" y="46" width="152" height="118" rx="11" fill="none" stroke="rgba(255,91,29,.15)" stroke-width="8"/>
  <text x="416" y="66" font-family="JetBrains Mono,monospace" font-size="9" fill="#ff5b1d" letter-spacing=".12em">03 · VOICE AI</text>
  <rect x="520" y="50" width="27" height="27" rx="7" fill="rgba(255,91,29,.15)" stroke="rgba(255,91,29,.3)" stroke-width="1"/>
  <path d="M530,58 Q527,57 526,59 L525,62 Q525,64 527,65 Q531,69 535,70 Q537,70 537,68 L536,65 Q535,63 534,64 L533,63 Q530,60 531,59 Z" stroke="#ff5b1d" fill="none" stroke-width="1.4" stroke-linecap="round"/>
  <text x="416" y="100" font-family="Bricolage Grotesque,sans-serif" font-size="15" fill="#f0e9d8" font-weight="600">Synthflow AI Call</text>
  <text x="416" y="119" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">AI-powered conversation</text>
  <text x="416" y="133" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">Handles objections live</text>
  <rect x="416" y="146" width="84" height="14" rx="3" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.28)" stroke-width="1"/>
  <text x="458" y="156" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ff5b1d" letter-spacing=".07em">SYNTHFLOW AI</text>
  <text x="576" y="95" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Transcript</text>
  <line x1="559" y1="105" x2="584" y2="105" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="586,102 593,105 586,108" fill="rgba(255,91,29,.5)"/>
  <circle r="3" fill="#e9c46a"><animate attributeName="cx" values="560;585;560" dur="1.8s" begin="1s" repeatCount="indefinite"/><animate attributeName="cy" values="105;105;105" dur="1.8s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin="1s" repeatCount="indefinite"/></circle>
  <rect x="592" y="52" width="152" height="106" rx="11" fill="rgba(233,196,106,.06)" stroke="rgba(233,196,106,.28)" stroke-width="1"/>
  <text x="604" y="70" font-family="JetBrains Mono,monospace" font-size="9" fill="#e9c46a" letter-spacing=".12em">04 · CAPTURE</text>
  <rect x="708" y="57" width="27" height="27" rx="7" fill="rgba(233,196,106,.1)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <rect x="713" y="62" width="12" height="16" rx="1.5" stroke="#e9c46a" fill="none" stroke-width="1.4"/>
  <line x1="713" y1="67" x2="725" y2="67" stroke="#e9c46a" stroke-width="1"/>
  <line x1="713" y1="71" x2="725" y2="71" stroke="#e9c46a" stroke-width="1"/>
  <line x1="713" y1="75" x2="721" y2="75" stroke="#e9c46a" stroke-width="1"/>
  <text x="604" y="96" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Freight Data Capture</text>
  <text x="604" y="113" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Weight · Lane · Cargo</text>
  <text x="604" y="127" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">LLM structured extract</text>
  <rect x="604" y="138" width="80" height="14" rx="3" fill="rgba(233,196,106,.08)" stroke="rgba(233,196,106,.2)" stroke-width="1"/>
  <text x="644" y="148" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#e9c46a" letter-spacing=".07em">LLM EXTRACT</text>
  <text x="764" y="95" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Details</text>
  <line x1="747" y1="105" x2="772" y2="105" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="774,102 781,105 774,108" fill="rgba(255,91,29,.5)"/>
  <circle r="3" fill="#82c98e"><animate attributeName="cx" values="748;773;748" dur="2s" begin="1.5s" repeatCount="indefinite"/><animate attributeName="cy" values="105;105;105" dur="2s" begin="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" begin="1.5s" repeatCount="indefinite"/></circle>
  <rect x="780" y="52" width="152" height="106" rx="11" fill="rgba(130,201,142,.05)" stroke="rgba(130,201,142,.26)" stroke-width="1"/>
  <text x="792" y="70" font-family="JetBrains Mono,monospace" font-size="9" fill="#82c98e" letter-spacing=".12em">05 · HANDOFF</text>
  <rect x="896" y="57" width="27" height="27" rx="7" fill="rgba(130,201,142,.1)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <rect x="901" y="63" width="17" height="13" rx="2" stroke="#82c98e" fill="none" stroke-width="1.4"/>
  <polyline points="901,65 909.5,71 918,65" stroke="#82c98e" fill="none" stroke-width="1.2" stroke-linecap="round"/>
  <text x="792" y="96" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Email Handoff</text>
  <text x="792" y="113" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Sales team notified</text>
  <text x="792" y="127" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">CRM stage updated</text>
  <rect x="792" y="138" width="76" height="14" rx="3" fill="rgba(130,201,142,.08)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="830" y="148" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#82c98e" letter-spacing=".07em">AUTO EMAIL</text>
  <rect x="28" y="172" width="278" height="122" rx="10" fill="rgba(255,91,29,.04)" stroke="rgba(255,91,29,.14)" stroke-width="1"/>
  <text x="40" y="190" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(255,91,29,.6)" letter-spacing=".14em">LIVE CALL STATE</text>
  <rect x="40" y="196" width="3" height="10" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="4;16;4" dur=".75s" repeatCount="indefinite"/><animate attributeName="y" values="202;196;202" dur=".75s" repeatCount="indefinite"/></rect>
  <rect x="46" y="196" width="3" height="16" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="16;5;16" dur=".7s" begin=".1s" repeatCount="indefinite"/><animate attributeName="y" values="196;202;196" dur=".7s" begin=".1s" repeatCount="indefinite"/></rect>
  <rect x="52" y="196" width="3" height="12" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="12;20;12" dur=".85s" begin=".2s" repeatCount="indefinite"/><animate attributeName="y" values="198;194;198" dur=".85s" begin=".2s" repeatCount="indefinite"/></rect>
  <rect x="58" y="196" width="3" height="20" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="20;6;20" dur=".65s" begin=".15s" repeatCount="indefinite"/><animate attributeName="y" values="193;199;193" dur=".65s" begin=".15s" repeatCount="indefinite"/></rect>
  <rect x="64" y="196" width="3" height="8" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="8;18;8" dur=".8s" begin=".3s" repeatCount="indefinite"/><animate attributeName="y" values="200;195;200" dur=".8s" begin=".3s" repeatCount="indefinite"/></rect>
  <rect x="70" y="196" width="3" height="14" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="14;4;14" dur=".72s" begin=".08s" repeatCount="indefinite"/><animate attributeName="y" values="196;202;196" dur=".72s" begin=".08s" repeatCount="indefinite"/></rect>
  <rect x="76" y="196" width="3" height="18" rx="1.5" fill="#ff5b1d" opacity=".7"><animate attributeName="height" values="18;8;18" dur=".88s" begin=".25s" repeatCount="indefinite"/><animate attributeName="y" values="194;198;194" dur=".88s" begin=".25s" repeatCount="indefinite"/></rect>
  <text x="88" y="210" font-family="JetBrains Mono,monospace" font-size="9" fill="#ff5b1d" letter-spacing=".07em">AI SPEAKING</text>
  <rect x="40" y="219" width="7" height="7" rx="1.5" fill="rgba(130,201,142,.15)" stroke="rgba(130,201,142,.4)" stroke-width="1"/>
  <polyline points="41.5,222.5 43.5,224.5 46.5,220.5" stroke="#82c98e" fill="none" stroke-width="1.2"/>
  <text x="53" y="227" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#82c98e">Interest verified</text>
  <rect x="40" y="234" width="7" height="7" rx="1.5" fill="rgba(130,201,142,.15)" stroke="rgba(130,201,142,.4)" stroke-width="1"/>
  <polyline points="41.5,237.5 43.5,239.5 46.5,235.5" stroke="#82c98e" fill="none" stroke-width="1.2"/>
  <text x="53" y="242" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#82c98e">Freight need confirmed</text>
  <circle cx="43.5" cy="253" r="3" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <text x="53" y="257" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#f0e9d8">Capturing freight details now</text>
  <rect x="40" y="265" width="7" height="7" rx="1.5" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.14)" stroke-width="1"/>
  <text x="53" y="273" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Qualify special requirements</text>
  <rect x="318" y="172" width="326" height="122" rx="10" fill="rgba(233,196,106,.04)" stroke="rgba(233,196,106,.14)" stroke-width="1"/>
  <text x="330" y="190" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(233,196,106,.6)" letter-spacing=".14em">CAPTURED FREIGHT DATA</text>
  <line x1="330" y1="195" x2="632" y2="195" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="330" y="213" font-family="JetBrains Mono,monospace" font-size="10" fill="#6e6757">Origin</text>
  <text x="480" y="213" font-family="JetBrains Mono,monospace" font-size="10" fill="#e9c46a">Chicago, IL</text>
  <line x1="330" y1="218" x2="632" y2="218" stroke="rgba(240,233,216,.05)" stroke-width="1"/>
  <text x="330" y="234" font-family="JetBrains Mono,monospace" font-size="10" fill="#6e6757">Destination</text>
  <text x="480" y="234" font-family="JetBrains Mono,monospace" font-size="10" fill="#f0e9d8">Los Angeles, CA</text>
  <line x1="330" y1="239" x2="632" y2="239" stroke="rgba(240,233,216,.05)" stroke-width="1"/>
  <text x="330" y="255" font-family="JetBrains Mono,monospace" font-size="10" fill="#6e6757">Weight</text>
  <text x="480" y="255" font-family="JetBrains Mono,monospace" font-size="10" fill="#e9c46a">45,000 lbs</text>
  <line x1="330" y1="260" x2="632" y2="260" stroke="rgba(240,233,216,.05)" stroke-width="1"/>
  <text x="330" y="276" font-family="JetBrains Mono,monospace" font-size="10" fill="#6e6757">Cargo Type</text>
  <text x="480" y="276" font-family="JetBrains Mono,monospace" font-size="10" fill="#f0e9d8">Dry Van — FTL</text>
  <line x1="330" y1="281" x2="632" y2="281" stroke="rgba(240,233,216,.05)" stroke-width="1"/>
  <text x="330" y="286" font-family="JetBrains Mono,monospace" font-size="10" fill="#6e6757">Status</text>
  <rect x="479" y="277" width="82" height="14" rx="3" fill="rgba(130,201,142,.12)" stroke="rgba(130,201,142,.35)" stroke-width="1"/>
  <text x="520" y="287" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#82c98e">QUALIFIED ✓</text>
  <rect x="656" y="172" width="276" height="122" rx="10" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.08)" stroke-width="1"/>
  <text x="668" y="190" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".14em">RETRY LOGIC</text>
  <line x1="668" y1="195" x2="920" y2="195" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="668" y="214" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#82c98e">▸  Connected → qualify immediately</text>
  <text x="668" y="232" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Busy / no answer → retry +2h</text>
  <text x="668" y="250" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Voicemail → retry next day</text>
  <text x="668" y="268" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">▸  3× exceeded → mark cold</text>
  <text x="668" y="286" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#82c98e">▸  Deduplication active</text>
  <rect x="28" y="304" width="904" height="48" rx="8" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <circle cx="90" cy="328" r="13" fill="rgba(130,201,142,.1)" stroke="rgba(130,201,142,.35)" stroke-width="1"/>
  <polyline points="83,328 88,333 97,323" stroke="#82c98e" fill="none" stroke-width="1.5" stroke-linecap="round"/>
  <text x="90" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#82c98e">Imported</text>
  <line x1="103" y1="328" x2="197" y2="328" stroke="rgba(130,201,142,.3)" stroke-width="1"/>
  <circle cx="210" cy="328" r="13" fill="rgba(130,201,142,.1)" stroke="rgba(130,201,142,.35)" stroke-width="1"/>
  <polyline points="203,328 208,333 217,323" stroke="#82c98e" fill="none" stroke-width="1.5" stroke-linecap="round"/>
  <text x="210" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#82c98e">Validated</text>
  <line x1="223" y1="328" x2="317" y2="328" stroke="rgba(130,201,142,.25)" stroke-width="1"/>
  <circle cx="330" cy="328" r="13" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.4)" stroke-width="1.5"><animate attributeName="stroke-opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="330" cy="328" r="4.5" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <text x="330" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ff5b1d">Calling</text>
  <line x1="343" y1="328" x2="437" y2="328" stroke="rgba(240,233,216,.1)" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="450" cy="328" r="13" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="450" y="332" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">4</text>
  <text x="450" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Qualified</text>
  <line x1="463" y1="328" x2="557" y2="328" stroke="rgba(240,233,216,.07)" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="570" cy="328" r="13" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="570" y="332" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">5</text>
  <text x="570" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Emailed</text>
  <line x1="583" y1="328" x2="677" y2="328" stroke="rgba(240,233,216,.07)" stroke-width="1" stroke-dasharray="3,3"/>
  <circle cx="690" cy="328" r="13" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="690" y="332" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">6</text>
  <text x="690" y="348" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#6e6757">Won</text>
  <rect x="28" y="362" width="904" height="48" rx="8" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="209" y1="366" x2="209" y2="406" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="390" y1="366" x2="390" y2="406" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="571" y1="366" x2="571" y2="406" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="752" y1="366" x2="752" y2="406" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <text x="118" y="382" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="19" fill="#ff5b1d" font-weight="700">0</text>
  <text x="118" y="400" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">MANUAL STEPS</text>
  <text x="299" y="382" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="19" fill="#82c98e" font-weight="700">100%</text>
  <text x="299" y="400" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">AUTO-QUALIFIED</text>
  <text x="480" y="382" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="19" fill="#e9c46a" font-weight="700">24/7</text>
  <text x="480" y="400" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">OUTBOUND COVERAGE</text>
  <text x="661" y="382" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="19" fill="#f0e9d8" font-weight="700">3×</text>
  <text x="661" y="400" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">RETRY MAX</text>
  <text x="842" y="382" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="19" fill="#f0e9d8" font-weight="700">~2 min</text>
  <text x="842" y="400" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">AVG QUALIFICATION</text>
  <rect x="28" y="420" width="904" height="22" rx="5" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="40" y="435" font-family="JetBrains Mono,monospace" font-size="9" fill="#3d3a35" letter-spacing=".08em">STACK  ·  Synthflow AI  ·  GoHighLevel  ·  n8n  ·  Webhooks  ·  CRM Automation  ·  Retry Logic  ·  Email Handoff</text>
  <text x="480" y="477" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#2a2720" letter-spacing=".1em">CONFIDENTIAL · FREIGHT &amp; LOGISTICS CLIENT · PRODUCTION SYSTEM · ZERO SDR KEYSTROKES</text>
</svg>`;

const LEAD_SCRAPER_SVG = `<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="p2bg" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#1c1915"/><stop offset="100%" stop-color="#0d0b09"/></radialGradient>
    <radialGradient id="p2glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff5b1d" stop-opacity=".05"/><stop offset="100%" stop-color="#ff5b1d" stop-opacity="0"/></radialGradient>
    <pattern id="p2dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r=".7" fill="rgba(240,233,216,.07)"/></pattern>
  </defs>
  <rect width="960" height="540" fill="url(#p2bg)"/>
  <rect width="960" height="540" fill="url(#p2dots)"/>
  <rect width="960" height="540" fill="url(#p2glow)"/>
  <rect x="28" y="18" width="168" height="22" rx="5" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.11)" stroke-width="1"/>
  <circle cx="43" cy="29" r="3.5" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="53" y="33.5" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">LEAD ENGINE</text>
  <rect x="636" y="18" width="84" height="22" rx="5" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.22)" stroke-width="1"/>
  <text x="678" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">SCRAPE</text>
  <rect x="728" y="18" width="80" height="22" rx="5" fill="rgba(233,196,106,.07)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="768" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".1em">ENRICH</text>
  <rect x="816" y="18" width="96" height="22" rx="5" fill="rgba(130,201,142,.06)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="864" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">OUTREACH</text>
  <text x="28" y="57" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757" letter-spacing=".1em">01 ──</text>
  <text x="60" y="57" font-family="JetBrains Mono,monospace" font-size="10" fill="#ff5b1d" font-weight="500" letter-spacing=".14em">SCRAPE JOBS</text>
  <line x1="28" y1="62" x2="310" y2="62" stroke="rgba(255,91,29,.25)" stroke-width="1"/>
  <text x="338" y="57" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757" letter-spacing=".1em">02 ──</text>
  <text x="370" y="57" font-family="JetBrains Mono,monospace" font-size="10" fill="#e9c46a" font-weight="500" letter-spacing=".14em">ENRICH CONTACTS</text>
  <line x1="338" y1="62" x2="620" y2="62" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="648" y="57" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757" letter-spacing=".1em">03 ──</text>
  <text x="680" y="57" font-family="JetBrains Mono,monospace" font-size="10" fill="#82c98e" font-weight="500" letter-spacing=".14em">LAUNCH OUTREACH</text>
  <line x1="648" y1="62" x2="932" y2="62" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <line x1="325" y1="50" x2="325" y2="395" stroke="rgba(240,233,216,.07)" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="635" y1="50" x2="635" y2="395" stroke="rgba(240,233,216,.07)" stroke-width="1" stroke-dasharray="4,4"/>
  <rect x="28" y="72" width="285" height="62" rx="9" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.28)" stroke-width="1"/>
  <rect x="272" y="77" width="26" height="26" rx="7" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.25)" stroke-width="1"/>
  <circle cx="285" cy="90" r="7" stroke="#ff5b1d" fill="none" stroke-width="1.4"/>
  <line x1="285" y1="86" x2="285" y2="90" stroke="#ff5b1d" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="285" y1="90" x2="288" y2="93" stroke="#ff5b1d" stroke-width="1.5" stroke-linecap="round"/>
  <text x="40" y="89" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">TRIGGER</text>
  <text x="40" y="105" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Cron Trigger</text>
  <text x="40" y="126" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Runs every 6 hours · n8n scheduler</text>
  <line x1="170" y1="134" x2="170" y2="148" stroke="rgba(255,91,29,.35)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="170" cy="134" r="2.5" fill="#ff5b1d"><animate attributeName="cy" values="134;147;134" dur="1.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite"/></circle>
  <rect x="28" y="148" width="285" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="40" y="165" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">SCRAPE</text>
  <text x="40" y="181" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Apify Actor</text>
  <text x="40" y="202" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">LinkedIn jobs · search filters applied</text>
  <line x1="170" y1="210" x2="170" y2="224" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="170" cy="210" r="2.5" fill="#e9c46a"><animate attributeName="cy" values="210;223;210" dur="1.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".3s" repeatCount="indefinite"/></circle>
  <rect x="28" y="224" width="285" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="40" y="241" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">FILTER</text>
  <text x="40" y="257" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">ICP Filter</text>
  <text x="40" y="278" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Role · seniority · company size</text>
  <line x1="170" y1="286" x2="170" y2="300" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="170" cy="286" r="2.5" fill="#ff5b1d"><animate attributeName="cy" values="286;299;286" dur="1.5s" begin=".6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin=".6s" repeatCount="indefinite"/></circle>
  <rect x="28" y="300" width="285" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="40" y="317" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">OUTPUT</text>
  <text x="40" y="333" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Structured Records</text>
  <text x="40" y="354" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Company · title · contact · location</text>
  <rect x="338" y="72" width="285" height="62" rx="9" fill="rgba(233,196,106,.07)" stroke="rgba(233,196,106,.28)" stroke-width="1"/>
  <text x="350" y="89" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".1em">ENRICH</text>
  <text x="350" y="105" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Clay Table</text>
  <text x="350" y="126" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Waterfall enrichment · 15+ sources</text>
  <line x1="480" y1="134" x2="480" y2="148" stroke="rgba(233,196,106,.35)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="480" cy="134" r="2.5" fill="#e9c46a"><animate attributeName="cy" values="134;147;134" dur="1.6s" begin=".2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".2s" repeatCount="indefinite"/></circle>
  <rect x="338" y="148" width="285" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="350" y="165" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">FIRMOGRAPHICS</text>
  <text x="350" y="181" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Company Intelligence</text>
  <text x="350" y="202" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Industry · headcount · revenue · tech stack</text>
  <line x1="480" y1="210" x2="480" y2="224" stroke="rgba(233,196,106,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="480" cy="210" r="2.5" fill="#e9c46a"><animate attributeName="cy" values="210;223;210" dur="1.4s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin=".5s" repeatCount="indefinite"/></circle>
  <rect x="338" y="224" width="285" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="350" y="241" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">TECH INTEL</text>
  <text x="350" y="257" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Tech Stack Signal</text>
  <text x="350" y="278" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Tools used · buying signals detected</text>
  <line x1="480" y1="286" x2="480" y2="300" stroke="rgba(233,196,106,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="480" cy="286" r="2.5" fill="#e9c46a"><animate attributeName="cy" values="286;299;286" dur="1.5s" begin=".8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin=".8s" repeatCount="indefinite"/></circle>
  <rect x="338" y="300" width="285" height="62" rx="9" fill="rgba(233,196,106,.05)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="350" y="317" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".1em">VERIFY</text>
  <text x="350" y="333" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Email Verification</text>
  <text x="350" y="354" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Validated · deliverable · low-bounce</text>
  <rect x="648" y="72" width="284" height="62" rx="9" fill="rgba(130,201,142,.06)" stroke="rgba(130,201,142,.26)" stroke-width="1"/>
  <text x="660" y="89" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">CAMPAIGN</text>
  <text x="660" y="105" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Instantly Campaign</text>
  <text x="660" y="126" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Personalized via Clay tokens · A/B test</text>
  <line x1="790" y1="134" x2="790" y2="148" stroke="rgba(130,201,142,.35)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="790" cy="134" r="2.5" fill="#82c98e"><animate attributeName="cy" values="134;147;134" dur="1.6s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".4s" repeatCount="indefinite"/></circle>
  <rect x="648" y="148" width="284" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <rect x="882" y="152" width="42" height="18" rx="4" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="903" y="165" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c">DAY 0</text>
  <text x="660" y="165" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">STEP 1</text>
  <text x="660" y="181" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Cold Intro Email</text>
  <text x="660" y="202" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Personalized hook · value prop</text>
  <line x1="790" y1="210" x2="790" y2="224" stroke="rgba(130,201,142,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="790" cy="210" r="2.5" fill="#82c98e"><animate attributeName="cy" values="210;223;210" dur="1.4s" begin=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin=".7s" repeatCount="indefinite"/></circle>
  <rect x="648" y="224" width="284" height="62" rx="9" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <rect x="882" y="228" width="42" height="18" rx="4" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="903" y="241" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c">DAY 3</text>
  <text x="660" y="241" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">STEP 2</text>
  <text x="660" y="257" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Value Follow-up</text>
  <text x="660" y="278" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Use case fit · social proof</text>
  <line x1="790" y1="286" x2="790" y2="300" stroke="rgba(130,201,142,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <circle cx="790" cy="286" r="2.5" fill="#82c98e"><animate attributeName="cy" values="286;299;286" dur="1.5s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.5s" begin="1s" repeatCount="indefinite"/></circle>
  <rect x="648" y="300" width="284" height="62" rx="9" fill="rgba(130,201,142,.04)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <rect x="882" y="304" width="42" height="18" rx="4" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="903" y="317" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c">DAY 7</text>
  <text x="660" y="317" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">STEP 3</text>
  <text x="660" y="333" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Break-up + Reply Det.</text>
  <text x="660" y="354" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Smart detection · route to CRM</text>
  <rect x="28" y="377" width="904" height="54" rx="10" fill="rgba(255,91,29,.05)" stroke="rgba(255,91,29,.18)" stroke-width="1"/>
  <rect x="28" y="377" width="904" height="54" rx="10" fill="none" stroke="rgba(255,91,29,.08)" stroke-width="6"/>
  <text x="56" y="397" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(255,91,29,.6)" letter-spacing=".14em">ORCHESTRATION LAYER</text>
  <text x="56" y="416" font-family="Bricolage Grotesque,sans-serif" font-size="16" fill="#f0e9d8" font-weight="600">n8n — Central Automation Engine</text>
  <text x="340" y="416" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">  Coordinates all phases · deduplication · error handling · audit trail → Postgres</text>
  <rect x="856" y="388" width="60" height="22" rx="5" fill="rgba(255,91,29,.1)" stroke="rgba(255,91,29,.28)" stroke-width="1"/>
  <text x="886" y="403" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#ff5b1d" letter-spacing=".06em">n8n</text>
  <rect x="28" y="443" width="904" height="46" rx="8" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="209" y1="447" x2="209" y2="485" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="390" y1="447" x2="390" y2="485" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="571" y1="447" x2="571" y2="485" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="752" y1="447" x2="752" y2="485" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <text x="118" y="461" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#ff5b1d" font-weight="700">3.4k</text>
  <text x="118" y="479" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">LEADS / WEEK</text>
  <text x="299" y="461" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#e9c46a" font-weight="700">11.2%</text>
  <text x="299" y="479" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">REPLY RATE</text>
  <text x="480" y="461" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#82c98e" font-weight="700">22 hrs</text>
  <text x="480" y="479" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">SAVED / WEEK</text>
  <text x="661" y="461" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">28</text>
  <text x="661" y="479" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">RUNS / WEEK</text>
  <text x="842" y="461" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">15+</text>
  <text x="842" y="479" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">DATA SOURCES</text>
  <rect x="28" y="499" width="904" height="22" rx="5" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="40" y="514" font-family="JetBrains Mono,monospace" font-size="9" fill="#3d3a35" letter-spacing=".08em">STACK  ·  n8n  ·  Apify  ·  LinkedIn  ·  Clay  ·  Clearbit  ·  Hunter.io  ·  Instantly  ·  Postgres  ·  Webhooks</text>
</svg>`;

const BUSINESS_ANALYZER_SVG = `<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="p3bg" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#1c1915"/><stop offset="100%" stop-color="#0d0b09"/></radialGradient>
    <radialGradient id="p3glow" cx="50%" cy="30%" r="40%"><stop offset="0%" stop-color="#a855f7" stop-opacity=".04"/><stop offset="100%" stop-color="#a855f7" stop-opacity="0"/></radialGradient>
    <pattern id="p3dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r=".7" fill="rgba(240,233,216,.07)"/></pattern>
  </defs>
  <rect width="960" height="540" fill="url(#p3bg)"/>
  <rect width="960" height="540" fill="url(#p3dots)"/>
  <rect width="960" height="540" fill="url(#p3glow)"/>
  <rect x="28" y="18" width="218" height="22" rx="5" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.11)" stroke-width="1"/>
  <circle cx="43" cy="29" r="3.5" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="53" y="33.5" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">BUSINESS INTELLIGENCE</text>
  <rect x="622" y="18" width="82" height="22" rx="5" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.22)" stroke-width="1"/>
  <text x="663" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">AUDIT</text>
  <rect x="712" y="18" width="82" height="22" rx="5" fill="rgba(233,196,106,.07)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="753" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".1em">ANALYZE</text>
  <rect x="802" y="18" width="90" height="22" rx="5" fill="rgba(130,201,142,.06)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="847" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">GENERATE</text>
  <rect x="28" y="50" width="904" height="32" rx="8" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.14)" stroke-width="1"/>
  <circle cx="50" cy="66" r="7" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.35)" stroke-width="1"/>
  <circle cx="50" cy="66" r="3" fill="#ff5b1d"><animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="66" y="70.5" font-family="JetBrains Mono,monospace" font-size="11" fill="#a39d8c" letter-spacing=".02em">https://acme-robotics.com</text>
  <rect x="824" y="55" width="98" height="22" rx="5" fill="rgba(255,91,29,.14)" stroke="rgba(255,91,29,.4)" stroke-width="1"/>
  <text x="873" y="70.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#ff5b1d" letter-spacing=".1em">ANALYZE →</text>
  <rect x="28" y="96" width="130" height="148" rx="10" fill="rgba(255,91,29,.07)" stroke="rgba(255,91,29,.24)" stroke-width="1"/>
  <text x="93" y="113" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(255,91,29,.6)" letter-spacing=".12em">AI SCORE</text>
  <circle cx="93" cy="154" r="38" fill="none" stroke="rgba(240,233,216,.08)" stroke-width="6"/>
  <circle cx="93" cy="154" r="38" fill="none" stroke="#ff5b1d" stroke-width="6" stroke-dasharray="200 39" transform="rotate(-90 93 154)" stroke-linecap="round"/>
  <text x="93" y="149" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="26" fill="#f0e9d8" font-weight="700">82</text>
  <text x="93" y="166" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".08em">/ 100 pts</text>
  <text x="93" y="200" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">100-point audit</text>
  <text x="93" y="214" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">full site analysis</text>
  <text x="93" y="235" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e">READY ✓</text>
  <line x1="158" y1="170" x2="178" y2="170" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <polygon points="180,167 187,170 180,173" fill="rgba(255,91,29,.45)"/>
  <rect x="188" y="96" width="236" height="148" rx="10" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="200" y="115" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".12em">01 · CRAWL</text>
  <text x="200" y="135" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Playwright Crawl</text>
  <text x="200" y="153" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Full site scrape · JS-rendered</text>
  <line x1="200" y1="160" x2="412" y2="160" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="200" y="177" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Sitemap discovery</text>
  <text x="200" y="193" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Meta + heading analysis</text>
  <text x="200" y="209" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Page speed scoring</text>
  <text x="200" y="225" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Core Web Vitals check</text>
  <rect x="200" y="232" width="78" height="14" rx="3" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="239" y="242" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c" letter-spacing=".06em">PLAYWRIGHT</text>
  <line x1="424" y1="170" x2="444" y2="170" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <polygon points="446,167 453,170 446,173" fill="rgba(255,91,29,.45)"/>
  <circle r="2.5" fill="#ff5b1d"><animateMotion dur="1.8s" begin=".5s" repeatCount="indefinite" path="M188,170 L424,170"/></circle>
  <rect x="454" y="96" width="220" height="148" rx="10" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="466" y="115" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".12em">02 · MARKET</text>
  <text x="466" y="135" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Competitor Scan</text>
  <text x="466" y="153" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Top-5 SERP analysis</text>
  <line x1="466" y1="160" x2="662" y2="160" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="466" y="177" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Competitor offers</text>
  <text x="466" y="193" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Content gaps identified</text>
  <text x="466" y="209" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Positioning analysis</text>
  <text x="466" y="225" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Keyword opportunities</text>
  <rect x="466" y="232" width="82" height="14" rx="3" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="507" y="242" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c" letter-spacing=".06em">LLM ANALYSIS</text>
  <line x1="674" y1="170" x2="694" y2="170" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <polygon points="696,167 703,170 696,173" fill="rgba(255,91,29,.45)"/>
  <circle r="2.5" fill="#e9c46a"><animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M454,170 L674,170"/></circle>
  <rect x="704" y="96" width="228" height="148" rx="10" fill="rgba(233,196,106,.05)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="716" y="115" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".12em">03 · LLM SCORE</text>
  <text x="716" y="135" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">LangChain Report</text>
  <text x="716" y="153" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">GPT-4 ranked by revenue</text>
  <line x1="716" y1="160" x2="920" y2="160" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="716" y="177" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Revenue-impact ranking</text>
  <text x="716" y="193" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Action-ranked fixes</text>
  <text x="716" y="209" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Est. conversion uplift</text>
  <text x="716" y="225" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">▸  Vector embeddings</text>
  <rect x="716" y="232" width="78" height="14" rx="3" fill="rgba(233,196,106,.08)" stroke="rgba(233,196,106,.2)" stroke-width="1"/>
  <text x="755" y="242" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#e9c46a" letter-spacing=".06em">LANGCHAIN</text>
  <line x1="480" y1="244" x2="480" y2="264" stroke="rgba(255,91,29,.3)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <polygon points="477,266 480,274 483,266" fill="rgba(255,91,29,.4)"/>
  <rect x="28" y="274" width="440" height="118" rx="10" fill="rgba(233,196,106,.05)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="42" y="292" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(233,196,106,.6)" letter-spacing=".14em">IMPROVEMENT REPORT — RANKED BY REVENUE IMPACT</text>
  <line x1="42" y1="298" x2="456" y2="298" stroke="rgba(233,196,106,.1)" stroke-width="1"/>
  <rect x="42" y="305" width="26" height="14" rx="3" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.25)" stroke-width="1"/>
  <text x="55" y="315" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ff5b1d">#1</text>
  <text x="75" y="315" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#f0e9d8">Fix slow LCP (4.2s → 1.8s)</text>
  <text x="400" y="315" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#e9c46a">+12% conv.</text>
  <rect x="42" y="323" width="904" height="1" rx="0" fill="rgba(240,233,216,.05)"/>
  <rect x="42" y="326" width="26" height="14" rx="3" fill="rgba(233,196,106,.1)" stroke="rgba(233,196,106,.22)" stroke-width="1"/>
  <text x="55" y="336" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#e9c46a">#2</text>
  <text x="75" y="336" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#f0e9d8">Add trust signals above fold</text>
  <text x="400" y="336" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#e9c46a">+4% conv.</text>
  <line x1="42" y1="343" x2="456" y2="343" stroke="rgba(240,233,216,.05)" stroke-width="1"/>
  <rect x="42" y="347" width="26" height="14" rx="3" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="55" y="357" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#a39d8c">#3</text>
  <text x="75" y="357" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">Rewrite CTA copy with benefit</text>
  <text x="400" y="357" text-anchor="end" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">+2% conv.</text>
  <rect x="42" y="370" width="88" height="16" rx="4" fill="rgba(130,201,142,.1)" stroke="rgba(130,201,142,.3)" stroke-width="1"/>
  <text x="86" y="381" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="#82c98e">+18% EST. TOTAL</text>
  <rect x="484" y="274" width="448" height="118" rx="10" fill="rgba(130,201,142,.04)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="498" y="292" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(130,201,142,.6)" letter-spacing=".14em">CONTENT ENGINE + OUTPUT ARTIFACTS</text>
  <line x1="498" y1="298" x2="920" y2="298" stroke="rgba(130,201,142,.1)" stroke-width="1"/>
  <rect x="498" y="306" width="126" height="70" rx="8" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="561" y="325" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">VIDEO SCRIPT</text>
  <text x="561" y="345" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Ad Creative</text>
  <text x="561" y="362" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757">FFmpeg render</text>
  <text x="561" y="374" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757">GCP deploy</text>
  <rect x="634" y="306" width="126" height="70" rx="8" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="697" y="325" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">PDF REPORT</text>
  <text x="697" y="345" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Exec Summary</text>
  <text x="697" y="362" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757">Full audit deck</text>
  <text x="697" y="374" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757">Client handoff</text>
  <rect x="770" y="306" width="126" height="70" rx="8" fill="rgba(130,201,142,.05)" stroke="rgba(130,201,142,.18)" stroke-width="1"/>
  <text x="833" y="325" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">DELIVERED</text>
  <text x="833" y="345" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Full Asset Kit</text>
  <text x="833" y="362" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757">Video · PDF · Ads</text>
  <text x="833" y="374" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e">Ready ✓</text>
  <rect x="28" y="404" width="904" height="48" rx="8" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="209" y1="408" x2="209" y2="448" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="390" y1="408" x2="390" y2="448" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="571" y1="408" x2="571" y2="448" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="752" y1="408" x2="752" y2="448" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <text x="118" y="424" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#ff5b1d" font-weight="700">82</text>
  <text x="118" y="442" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">AVG AI SCORE</text>
  <text x="299" y="424" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#82c98e" font-weight="700">+18%</text>
  <text x="299" y="442" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">EST. CONV. LIFT</text>
  <text x="480" y="424" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#e9c46a" font-weight="700">&lt;5 min</text>
  <text x="480" y="442" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">URL → REPORT</text>
  <text x="661" y="424" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">4</text>
  <text x="661" y="442" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">PIPELINE STAGES</text>
  <text x="842" y="424" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">3</text>
  <text x="842" y="442" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">OUTPUT ARTIFACTS</text>
  <rect x="28" y="462" width="904" height="22" rx="5" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="40" y="477" font-family="JetBrains Mono,monospace" font-size="9" fill="#3d3a35" letter-spacing=".08em">STACK  ·  Python  ·  OpenAI API  ·  LangChain  ·  Playwright  ·  Beautiful Soup  ·  FFmpeg  ·  GCP  ·  Vector Embeddings</text>
  <text x="480" y="512" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#2a2720" letter-spacing=".1em">CONFIDENTIAL · COMPANY-FACING SaaS · FROM URL TO RANKED REPORT + VIDEO KIT IN &lt;5 MINUTES</text>
</svg>`;

const VOICE_SUITE_SVG = `<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="p4bg" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#1c1915"/><stop offset="100%" stop-color="#0d0b09"/></radialGradient>
    <pattern id="p4dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="14" cy="14" r=".7" fill="rgba(240,233,216,.07)"/></pattern>
  </defs>
  <rect width="960" height="540" fill="url(#p4bg)"/>
  <rect width="960" height="540" fill="url(#p4dots)"/>
  <rect x="28" y="18" width="172" height="22" rx="5" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.11)" stroke-width="1"/>
  <circle cx="43" cy="29" r="3.5" fill="#ff5b1d"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/></circle>
  <text x="53" y="33.5" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".12em">VOICE OPS SUITE</text>
  <rect x="650" y="18" width="100" height="22" rx="5" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.22)" stroke-width="1"/>
  <text x="700" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">PRE-CALL</text>
  <rect x="758" y="18" width="104" height="22" rx="5" fill="rgba(240,233,216,.05)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="810" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">POST-CALL</text>
  <rect x="870" y="18" width="62" height="22" rx="5" fill="rgba(130,201,142,.06)" stroke="rgba(130,201,142,.2)" stroke-width="1"/>
  <text x="901" y="33.5" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">AUDIT</text>
  <rect x="28" y="46" width="904" height="20" rx="5" fill="rgba(255,91,29,.06)" stroke="rgba(255,91,29,.2)" stroke-width="1"/>
  <text x="40" y="60" font-family="JetBrains Mono,monospace" font-size="9" fill="#ff5b1d" letter-spacing=".16em">PRE-CALL WORKFLOW  ─  Lead intake → validation → trigger outbound AI call</text>
  <rect x="28" y="74" width="192" height="88" rx="10" fill="rgba(255,91,29,.08)" stroke="rgba(255,91,29,.3)" stroke-width="1"/>
  <text x="40" y="91" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">01 · SHEETS</text>
  <rect x="178" y="79" width="27" height="27" rx="7" fill="rgba(255,91,29,.12)" stroke="rgba(255,91,29,.25)" stroke-width="1"/>
  <rect x="183" y="84" width="17" height="17" rx="2" stroke="#ff5b1d" fill="none" stroke-width="1.4"/>
  <line x1="183" y1="89" x2="200" y2="89" stroke="#ff5b1d" stroke-width="1"/>
  <line x1="188" y1="84" x2="188" y2="101" stroke="#ff5b1d" stroke-width="1"/>
  <text x="40" y="112" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">New Row Detected</text>
  <text x="40" y="129" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Google Sheets watch</text>
  <text x="40" y="143" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">trigger on new lead</text>
  <line x1="220" y1="118" x2="248" y2="118" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="250,115 257,118 250,121" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#ff5b1d"><animate attributeName="cx" values="221;249;221" dur="1.6s" repeatCount="indefinite"/><animate attributeName="cy" values="118;118;118" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite"/></circle>
  <rect x="258" y="74" width="192" height="88" rx="10" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="270" y="91" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">02 · FILTER</text>
  <text x="270" y="112" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Lead Gate</text>
  <text x="270" y="129" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Validate Lead ID</text>
  <text x="270" y="143" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Skip if processed</text>
  <line x1="450" y1="118" x2="478" y2="118" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="480,115 487,118 480,121" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#ff5b1d"><animate attributeName="cx" values="451;479;451" dur="1.8s" begin=".4s" repeatCount="indefinite"/><animate attributeName="cy" values="118;118;118" dur="1.8s" begin=".4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin=".4s" repeatCount="indefinite"/></circle>
  <rect x="488" y="74" width="192" height="88" rx="10" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="500" y="91" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">03 · PHONE</text>
  <text x="500" y="112" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Phone Dedupe</text>
  <text x="500" y="129" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">P1 · P2 · mobile</text>
  <text x="500" y="143" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Per-number limits</text>
  <line x1="680" y1="118" x2="708" y2="118" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="710,115 717,118 710,121" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#ff5b1d"><animate attributeName="cx" values="681;709;681" dur="1.6s" begin=".8s" repeatCount="indefinite"/><animate attributeName="cy" values="118;118;118" dur="1.6s" begin=".8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".8s" repeatCount="indefinite"/></circle>
  <rect x="718" y="70" width="214" height="96" rx="10" fill="rgba(255,91,29,.09)" stroke="rgba(255,91,29,.5)" stroke-width="1.5"/>
  <rect x="718" y="70" width="214" height="96" rx="10" fill="none" stroke="rgba(255,91,29,.15)" stroke-width="8"/>
  <text x="730" y="89" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">04 · VOICE AI</text>
  <text x="730" y="112" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Synthflow AI Call</text>
  <text x="730" y="129" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">Trigger outbound call</text>
  <text x="730" y="145" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#a39d8c">AI voice agent active</text>
  <line x1="825" y1="166" x2="825" y2="196" stroke="rgba(255,91,29,.4)" stroke-dasharray="4,3" stroke-width="1.5"/>
  <polygon points="822,198 825,206 828,198" fill="rgba(255,91,29,.5)"/>
  <circle cx="825" r="2.8" fill="#ff5b1d"><animate attributeName="cy" values="167;195;167" dur="1.4s" repeatCount="indefinite" begin="1s"/><animate attributeName="opacity" values="0;1;1;0" dur="1.4s" repeatCount="indefinite" begin="1s"/></circle>
  <rect x="28" y="186" width="904" height="20" rx="5" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.1)" stroke-width="1"/>
  <text x="40" y="200" font-family="JetBrains Mono,monospace" font-size="9" fill="#a39d8c" letter-spacing=".16em">POST-CALL WORKFLOW  ─  Receive result → match lead → route outcome → audit writeback</text>
  <rect x="718" y="214" width="214" height="88" rx="10" fill="rgba(255,91,29,.07)" stroke="rgba(255,91,29,.26)" stroke-width="1"/>
  <text x="730" y="231" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#ff5b1d" letter-spacing=".1em">05 · WEBHOOK</text>
  <text x="730" y="252" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Call Result</text>
  <text x="730" y="269" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Synthflow fires result</text>
  <text x="730" y="283" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Status + transcript</text>
  <line x1="714" y1="258" x2="686" y2="258" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="684,255 677,258 684,261" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#ff5b1d"><animate attributeName="cx" values="713;679;713" dur="1.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="cy" values="258;258;258" dur="1.6s" begin=".3s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin=".3s" repeatCount="indefinite"/></circle>
  <rect x="488" y="214" width="192" height="88" rx="10" fill="rgba(240,233,216,.04)" stroke="rgba(240,233,216,.12)" stroke-width="1"/>
  <text x="500" y="231" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#a39d8c" letter-spacing=".1em">06 · LOOKUP</text>
  <text x="500" y="252" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Match Lead</text>
  <text x="500" y="269" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Find source row</text>
  <text x="500" y="283" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Which number called?</text>
  <line x1="484" y1="258" x2="456" y2="258" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="454,255 447,258 454,261" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#e9c46a"><animate attributeName="cx" values="483;449;483" dur="1.8s" begin=".7s" repeatCount="indefinite"/><animate attributeName="cy" values="258;258;258" dur="1.8s" begin=".7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.8s" begin=".7s" repeatCount="indefinite"/></circle>
  <rect x="258" y="214" width="192" height="88" rx="10" fill="rgba(233,196,106,.06)" stroke="rgba(233,196,106,.3)" stroke-width="1"/>
  <text x="270" y="231" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#e9c46a" letter-spacing=".1em">07 · ROUTER</text>
  <text x="270" y="252" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Outcome Router</text>
  <text x="270" y="269" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Classify call result</text>
  <text x="270" y="283" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Branch to handler</text>
  <line x1="254" y1="258" x2="226" y2="258" stroke="rgba(255,91,29,.35)" stroke-dasharray="4,2.5" stroke-width="1.4"/>
  <polygon points="224,255 217,258 224,261" fill="rgba(255,91,29,.5)"/>
  <circle r="2.8" fill="#82c98e"><animate attributeName="cx" values="253;219;253" dur="1.6s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="cy" values="258;258;258" dur="1.6s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.6s" begin="1.1s" repeatCount="indefinite"/></circle>
  <rect x="28" y="214" width="192" height="88" rx="10" fill="rgba(130,201,142,.05)" stroke="rgba(130,201,142,.26)" stroke-width="1"/>
  <text x="40" y="231" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#82c98e" letter-spacing=".1em">08 · WRITEBACK</text>
  <text x="40" y="252" font-family="Bricolage Grotesque,sans-serif" font-size="14" fill="#f0e9d8" font-weight="600">Sheets Writeback</text>
  <text x="40" y="269" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Update row status</text>
  <text x="40" y="283" font-family="JetBrains Mono,monospace" font-size="9.5" fill="#6e6757">Full audit trail</text>
  <line x1="354" y1="302" x2="354" y2="318" stroke="rgba(233,196,106,.4)" stroke-dasharray="3,2" stroke-width="1.3"/>
  <line x1="108" y1="318" x2="870" y2="318" stroke="rgba(240,233,216,.08)" stroke-width="1"/>
  <rect x="28" y="322" width="205" height="60" rx="8" fill="rgba(130,201,142,.05)" stroke="rgba(130,201,142,.24)" stroke-width="1"/>
  <line x1="28" y1="322" x2="233" y2="322" stroke="#82c98e" stroke-width="2" stroke-linecap="round"/>
  <rect x="36" y="330" width="56" height="14" rx="3" fill="rgba(130,201,142,.12)" stroke="rgba(130,201,142,.3)" stroke-width="1"/>
  <text x="64" y="340" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#82c98e">QUALIFIED</text>
  <text x="36" y="360" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Lead Won</text>
  <text x="36" y="374" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Notify sales · mark won</text>
  <rect x="244" y="322" width="205" height="60" rx="8" fill="rgba(255,91,29,.04)" stroke="rgba(255,91,29,.2)" stroke-width="1"/>
  <line x1="244" y1="322" x2="449" y2="322" stroke="#ff5b1d" stroke-width="2" stroke-linecap="round"/>
  <rect x="252" y="330" width="38" height="14" rx="3" fill="rgba(255,91,29,.1)" stroke="rgba(255,91,29,.25)" stroke-width="1"/>
  <text x="271" y="340" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ff5b1d">RETRY</text>
  <text x="252" y="360" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Wait + Retry</text>
  <text x="252" y="374" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Busy · wait 2h · retry 3×</text>
  <rect x="460" y="322" width="205" height="60" rx="8" fill="rgba(233,196,106,.04)" stroke="rgba(233,196,106,.2)" stroke-width="1"/>
  <line x1="460" y1="322" x2="665" y2="322" stroke="#e9c46a" stroke-width="2" stroke-linecap="round"/>
  <rect x="468" y="330" width="64" height="14" rx="3" fill="rgba(233,196,106,.1)" stroke="rgba(233,196,106,.24)" stroke-width="1"/>
  <text x="500" y="340" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#e9c46a">CALLBACK</text>
  <text x="468" y="360" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Schedule Callback</text>
  <text x="468" y="374" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Add to calendar queue</text>
  <rect x="676" y="322" width="256" height="60" rx="8" fill="rgba(239,68,68,.04)" stroke="rgba(239,68,68,.2)" stroke-width="1"/>
  <line x1="676" y1="322" x2="932" y2="322" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
  <rect x="684" y="330" width="84" height="14" rx="3" fill="rgba(239,68,68,.1)" stroke="rgba(239,68,68,.22)" stroke-width="1"/>
  <text x="726" y="340" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#ef4444">NEXT NUMBER</text>
  <text x="684" y="360" font-family="Bricolage Grotesque,sans-serif" font-size="13" fill="#f0e9d8" font-weight="600">Escalate</text>
  <text x="684" y="374" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">Try P2 · mobile · per-number limits</text>
  <rect x="28" y="394" width="904" height="38" rx="8" fill="rgba(255,91,29,.04)" stroke="rgba(255,91,29,.14)" stroke-width="1"/>
  <text x="42" y="408" font-family="JetBrains Mono,monospace" font-size="8.5" fill="rgba(255,91,29,.6)" letter-spacing=".14em">AUDIT WRITEBACK</text>
  <text x="148" y="408" font-family="JetBrains Mono,monospace" font-size="9" fill="#6e6757">  Sync status  →  Selected number  →  Call started  →  Duration  →  Outcome code  →  Row updated ✓</text>
  <rect x="620" y="416" width="292" height="12" rx="3" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <text x="766" y="425" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#3d3a35" letter-spacing=".08em">Retry Logic  ·  Deduplication  ·  Per-Number Limits  ·  Smart Scheduling</text>
  <rect x="28" y="444" width="904" height="46" rx="8" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="209" y1="448" x2="209" y2="486" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="390" y1="448" x2="390" y2="486" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="571" y1="448" x2="571" y2="486" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <line x1="752" y1="448" x2="752" y2="486" stroke="rgba(240,233,216,.07)" stroke-width="1"/>
  <text x="118" y="462" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#ff5b1d" font-weight="700">2</text>
  <text x="118" y="480" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">N8N FLOWS</text>
  <text x="299" y="462" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#82c98e" font-weight="700">8</text>
  <text x="299" y="480" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">AUTOMATED STEPS</text>
  <text x="480" y="462" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#e9c46a" font-weight="700">4</text>
  <text x="480" y="480" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">OUTCOME BRANCHES</text>
  <text x="661" y="462" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">3×</text>
  <text x="661" y="480" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">RETRY MAX</text>
  <text x="842" y="462" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-size="18" fill="#f0e9d8" font-weight="700">100%</text>
  <text x="842" y="480" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#6e6757" letter-spacing=".08em">AUDIT COVERAGE</text>
  <rect x="28" y="500" width="904" height="22" rx="5" fill="rgba(240,233,216,.03)" stroke="rgba(240,233,216,.06)" stroke-width="1"/>
  <text x="40" y="515" font-family="JetBrains Mono,monospace" font-size="9" fill="#3d3a35" letter-spacing=".08em">STACK  ·  n8n  ·  Synthflow AI  ·  Google Sheets  ·  Webhooks  ·  JavaScript  ·  REST API  ·  Retry Logic  ·  Deduplication</text>
</svg>`;

/* ── Electric theme recolor ─────────────────────────────────────
   The SVGs above were authored in the legacy warm palette. Rather
   than hand-editing hundreds of attributes, remap every color to
   the site's Electric dark tokens at module load. */
const PALETTE_MAP = [
  // primary: orange → electric cyan
  ["#ff5b1d", "#22d3ee"],
  ["rgba(255,91,29,", "rgba(34,211,238,"],
  // secondary: gold → blue
  ["#e9c46a", "#3b82f6"],
  ["rgba(233,196,106,", "rgba(59,130,246,"],
  // success green → electric green
  ["#82c98e", "#34d399"],
  ["rgba(130,201,142,", "rgba(52,211,153,"],
  // cream ink → cool ink
  ["#f0e9d8", "#e9edf5"],
  ["rgba(240,233,216,", "rgba(233,237,245,"],
  ["#a39d8c", "#9aa3b8"],
  ["#6e6757", "#6f7a95"],
  ["#3d3a35", "#3f4966"],
  ["#2a2720", "#2b3350"],
  // warm blacks → navy blacks
  ["#0d0b09", "#070a12"],
  ["#1c1915", "#121828"],
  ["#1e1b16", "#141b2c"],
  // purple glow → violet
  ["#a855f7", "#818cf8"],
  // display font
  ["Bricolage Grotesque,sans-serif", "Space Grotesk,sans-serif"],
];

function recolor(svg) {
  return PALETTE_MAP.reduce((out, [from, to]) => out.split(from).join(to), svg);
}

/* SMIL <animate> loops ignore the prefers-reduced-motion media query,
   so strip them from the markup entirely for those users. */
function stripAnimations(svg) {
  return svg.replace(/<animate\b[^>]*\/>/g, "").replace(/<animate\b[^>]*>[\s\S]*?<\/animate>/g, "");
}

const DIAGRAMS = {
  "freight-voice": recolor(FREIGHT_VOICE_SVG),
  "lead-scraper": recolor(LEAD_SCRAPER_SVG),
  "business-analyzer": recolor(BUSINESS_ANALYZER_SVG),
  "voice-suite": recolor(VOICE_SUITE_SVG),
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pauses the SVG's SMIL animation clock whenever the diagram is out of
 * view — dozens of always-running <animate> loops are a real
 * scroll-perf cost otherwise. The markup itself always renders.
 */
export default function ProjectWorkflowDiagram({ project }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const svg = el.querySelector("svg");
    if (!svg || typeof svg.pauseAnimations !== "function") return undefined;
    svg.pauseAnimations(); // start paused; unpause on first intersection
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let svg = DIAGRAMS[project.diagramId] || DIAGRAMS["freight-voice"];
  if (prefersReducedMotion()) svg = stripAnimations(svg);

  return (
    <div
      ref={ref}
      className="pvis"
      role="img"
      aria-label={`${project.title} workflow diagram`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
