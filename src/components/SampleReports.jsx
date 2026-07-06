/**
 * Realistic sample deliverables for each project's "how it works" card.
 * All company names, contacts, and figures are fictional/illustrative —
 * standing in for the confidential client output described in projects.js.
 */

function Meta({ items }) {
  return (
    <div className="report-meta">
      {items.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

/* ---------- P3 · AI Business Analyzer — full competitor + SEO report ---------- */
export function AnalyzerSampleReport() {
  return (
    <>
      <Meta
        items={[
          ["Company", "Acme Robotics"],
          ["Site analyzed", "acme-robotics.com"],
          ["Industry", "Industrial automation & robotics"],
          ["Opportunity score", "82 / 100"],
        ]}
      />

      <section className="report-section">
        <h4>Executive summary</h4>
        <p>
          Acme Robotics ranks well for its brand name but is nearly invisible for the commercial,
          buying-intent searches its competitors own — pricing, comparison, and "how much does it
          cost" queries. The site is technically sound but slow (4.8s homepage LCP vs. a 2.1s
          competitor average), which is quietly suppressing both rankings and conversion rate. Seven
          fixes below would close most of the visible gap within a single quarter, at low-to-medium
          engineering effort.
        </p>
      </section>

      <section className="report-section">
        <h4>Competitor snapshot</h4>
        <div className="report-table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Acme Robotics</th>
                <th>RoboWorks Inc.</th>
                <th>Vantage Automation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Domain authority</td>
                <td>31</td>
                <td>44</td>
                <td>38</td>
              </tr>
              <tr>
                <td>Est. monthly organic traffic</td>
                <td>2,900</td>
                <td>11,400</td>
                <td>7,200</td>
              </tr>
              <tr>
                <td>Homepage LCP (speed)</td>
                <td>4.8s</td>
                <td>2.0s</td>
                <td>2.3s</td>
              </tr>
              <tr>
                <td>Referring domains</td>
                <td>86</td>
                <td>310</td>
                <td>205</td>
              </tr>
              <tr>
                <td>Blog cadence</td>
                <td>~1 / quarter</td>
                <td>~2 / week</td>
                <td>~1 / week</td>
              </tr>
              <tr>
                <td>Dedicated pricing page</td>
                <td>No</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="report-section">
        <h4>SEO audit findings</h4>
        <ul className="report-list">
          <li>Missing meta descriptions on 12 product pages</li>
          <li>Homepage LCP is 4.8s — competitor average is 2.1s</li>
          <li>No Product/Review schema markup, so no star ratings in search results</li>
          <li>5 category pages have thin content (under 150 words)</li>
          <li>8 broken internal links found during the crawl</li>
          <li>No pricing/quote page — losing every "cost" and "pricing" search</li>
          <li>Mobile nav has tap-target spacing flagged by Lighthouse</li>
        </ul>
      </section>

      <section className="report-section">
        <h4>Keyword gaps — competitors rank, Acme doesn't</h4>
        <div className="report-table-wrap">
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Monthly volume</th>
                <th>Ranking competitor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>collaborative robot arm cost</td>
                <td>880</td>
                <td>RoboWorks Inc. (#3)</td>
              </tr>
              <tr>
                <td>robotic palletizing system</td>
                <td>520</td>
                <td>Vantage Automation (#5)</td>
              </tr>
              <tr>
                <td>industrial automation roi calculator</td>
                <td>310</td>
                <td>RoboWorks Inc. (#7)</td>
              </tr>
              <tr>
                <td>robot arm safety certification</td>
                <td>260</td>
                <td>Vantage Automation (#4)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="report-section">
        <h4>Recommended actions</h4>
        <ul className="report-priority-list">
          <li>
            <span className="report-priority report-priority-high">High impact · low effort</span>
            Fix homepage speed — compress the hero video, lazy-load below-the-fold sections
          </li>
          <li>
            <span className="report-priority report-priority-high">High impact · medium effort</span>
            Publish a pricing/quote page targeting "cost" and "pricing" keywords
          </li>
          <li>
            <span className="report-priority report-priority-med">Medium impact · low effort</span>
            Add meta descriptions and Product/Review schema across product pages
          </li>
          <li>
            <span className="report-priority report-priority-med">Medium impact · medium effort</span>
            Publish 4 buyer-guide articles closing the keyword gaps above
          </li>
          <li>
            <span className="report-priority report-priority-low">Low impact · low effort</span>
            Fix the 8 broken internal links surfaced by the crawl
          </li>
        </ul>
      </section>

      <section className="report-section">
        <h4>Marketing kit — sample ad copy</h4>
        <div className="report-mail">
          <div>
            <b>Headline A</b> — Industrial Robot Arms, Built for Your Line
          </div>
          <div>
            <b>Headline B</b> — Get a Robotics Quote in 24 Hours
          </div>
          <div>
            <b>Headline C</b> — Automation ROI Calculator — See Your Payback Period
          </div>
          <div className="report-mail-body">
            Description: Custom collaborative robot arms with certified safety compliance and
            same-week engineering support. Compare pricing against your current manual line.
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- P1 · Freight AI Voice Agent — sample call transcript ---------- */
export function FreightSampleReport() {
  return (
    <>
      <Meta
        items={[
          ["Lead source", "Freight marketplace inbound"],
          ["Call duration", "00:47"],
          ["Outcome", "Qualified → CRM"],
          ["Lead score", "High"],
        ]}
      />

      <section className="report-section">
        <h4>Call transcript</h4>
        <div className="report-transcript">
          <p><b>AI:</b> Hi, this is Alex calling about the load you just posted — got a minute?</p>
          <p><b>Lead:</b> Yeah, go ahead.</p>
          <p><b>AI:</b> What are you shipping, and where is it headed?</p>
          <p><b>Lead:</b> 45,000 lbs, dry van — Chicago to Los Angeles.</p>
          <p><b>AI:</b> Got it. When do you need pickup?</p>
          <p><b>Lead:</b> Ideally Thursday morning.</p>
          <p><b>AI:</b> Understood — and what rate are you targeting for this lane?</p>
          <p><b>Lead:</b> Around $2.85 a mile, all-in.</p>
          <p><b>AI:</b> Perfect, I've got everything I need. Our team will call you back within the hour to confirm and lock in the rate.</p>
        </div>
      </section>

      <section className="report-section">
        <h4>CRM fields captured automatically</h4>
        <div className="report-table-wrap">
          <table className="report-table report-table-compact">
            <tbody>
              <tr><td>Origin</td><td>Chicago, IL</td></tr>
              <tr><td>Destination</td><td>Los Angeles, CA</td></tr>
              <tr><td>Weight</td><td>45,000 lbs</td></tr>
              <tr><td>Equipment</td><td>Dry van</td></tr>
              <tr><td>Pickup date</td><td>Thursday</td></tr>
              <tr><td>Rate target</td><td>$2.85 / mi</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="report-section">
        <h4>Auto-generated summary email</h4>
        <div className="report-mail">
          <div><b>Subject:</b> Qualified lead — Chicago → LA, dry van, pickup Thu</div>
          <div className="report-mail-body">
            New qualified freight lead ready for callback. 45,000 lbs dry van, Chicago to Los
            Angeles, pickup requested Thursday, target rate $2.85/mi. Full transcript and CRM
            record attached — no manual notes needed.
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- P2 · Lead Scraper — sample export ---------- */
const LEADS = [
  ["TechCorp Inc.", "Sarah M. — Head of Ops", "Hiring 3x Ops roles", "92"],
  ["Nova Logistics", "James R. — Founder", "Posted 5 driver roles", "88"],
  ["BrightHire Co.", "Alina K. — VP Sales", "New office opened", "81"],
  ["Vertex Retail", "Omar S. — COO", "Hiring warehouse manager", "77"],
  ["Fenwick Group", "Priya D. — Ops Director", "3 logistics job posts", "74"],
  ["Cascade Freight", "Marcus L. — Founder", "Fleet expansion announced", "70"],
];

export function ScraperSampleReport() {
  return (
    <>
      <Meta
        items={[
          ["Week of", "Jun 29 – Jul 5"],
          ["Boards scanned", "34"],
          ["Leads found", "3,412"],
          ["Passed quality filter", "812"],
        ]}
      />

      <section className="report-section">
        <h4>Sample lead export</h4>
        <div className="report-table-wrap">
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Signal</th>
                <th>Fit score</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="report-section">
        <h4>Personalized outreach — sample</h4>
        <div className="report-mail">
          <div><b>To:</b> Sarah M., TechCorp Inc.</div>
          <div><b>Subject:</b> Saw TechCorp is hiring 3 ops roles</div>
          <div className="report-mail-body">
            Hi Sarah — noticed TechCorp posted three operations roles this week, which usually
            means the team is stretched thin. We help companies in growth mode automate the
            repetitive parts of ops so new hires can focus on higher-value work. Worth a
            15-minute call?
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- P4 · n8n + Synthflow Suite — sample call log ---------- */
const CALL_LOG = [
  ["D. Carter", "+1 415 ···2231", "Done", "1", "—"],
  ["M. Alvarez", "+1 312 ···8890", "Calling…", "1", "—"],
  ["K. Osei", "+1 646 ···0417", "Queued", "0", "—"],
  ["R. Bianchi", "+1 212 ···5502", "Retry scheduled", "2", "Busy → retry in 2h"],
  ["S. Whitfield", "+1 917 ···7734", "Callback scheduled", "1", "No answer → callback tomorrow 9am"],
];

export function SuiteSampleReport() {
  return (
    <>
      <Meta
        items={[
          ["Date range", "Jul 1 – Jul 5"],
          ["Rows processed", "218"],
          ["Done", "164"],
          ["Retry / callback", "41"],
        ]}
      />

      <section className="report-section">
        <h4>Call log &amp; routing sheet</h4>
        <div className="report-table-wrap">
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Number</th>
                <th>Status</th>
                <th>Attempt</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {CALL_LOG.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="report-section">
        <h4>Routing logic</h4>
        <ul className="report-list">
          <li>Busy signal → automatic retry in 2 hours, up to 3 attempts</li>
          <li>No answer → callback scheduled for the next business day, 9am local time</li>
          <li>Answered → CRM synced and sheet row marked Done with a timestamp</li>
          <li>Every attempt is logged, so nothing falls through and any row's history is auditable</li>
        </ul>
      </section>
    </>
  );
}
