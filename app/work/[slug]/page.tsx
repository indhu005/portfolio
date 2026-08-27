import CaseStudyLayout from '@/components/CaseStudyLayout'
import MisinfoFeaturesContent from '@/components/MisinfoFeaturesContent'
import { Metadata } from 'next'

const caseStudies = {
  keye: {
    title: 'Keye',
    subtitle: 'Subscription Marketplace',
    description: 'From three static screens to a YC-backed company',
    heroImage: '/images/keye/HERO.webp',
    brief: {
      context: 'Founding designer on a credit-based marketplace for premium tools — seed-stage budget, team dispersed mid-build.',
      constraint: 'Engineering was 12 time zones away; a co-founder\'s exit erased backend capacity for the planned partner integrations.',
      decision: 'Capped credits at 200/month to turn price into discovery — then built a Chrome extension instead of the integrations we couldn\'t staff.',
      tradeoff: 'Conceded a native app to protect runway; made mobile web good enough that it barely cost users anything.'
    },
    tldr: {
      role: 'Founding Product Designer',
      team: '5 (2 engineers, 1 PM, 2 designers I hired)',
      timeline: '2 years (2021–2022)',
      impact: '0→20K MAUs | $1.5M raised | YC W2024',
      skills: 'Product strategy · Design systems · User research · PRDs · Chrome extension · Credit economics'
    },
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<p><span style="font-weight: 600;">Product</span><br/>A credit-based marketplace for flexible access to premium tools — Grammarly, Adobe, Otter.ai, MasterClass, Crunchbase, and 150+ others — without long-term subscriptions. ClassPass for digital tools.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> Founding (and for most of Keye's life, only) designer. Founders set product vision and fundraising strategy; the PM and I turned it into what shipped. I designed every surface — web, mobile web, Chrome extension — wrote PRDs, ran research, and hired the two designers who replaced me.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline.</span> 2 years (2021–2022): beta to credit system to marketplace to extension to seed funding. After the founding team dispersed, the company pivoted into YC W2024 on the traction we built.</p>

<h4 class="case-study-subhead">Impact</h4>

<div class="metrics-grid metrics-grid--dark" style="margin-bottom: 48px;">
  <div class="metrics-cell metrics-cell--hero">
    <div class="metrics-num">0 → 20K+</div>
    <div class="metrics-label">Monthly active users in under 12 months</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+45%</div>
    <div class="metrics-label">Engagement, within 3 months</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+32%</div>
    <div class="metrics-label">Trial-to-paid conversion post monetization</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">150+ / 35+</div>
    <div class="metrics-label">Products · direct partnerships incl. Adobe, Grammarly, Otter.ai</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+44%</div>
    <div class="metrics-label">Partner subscriptions, year over year</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">60%</div>
    <div class="metrics-label">Extension adoption, within 3 months</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">−63%</div>
    <div class="metrics-label">Login friction, via auto-login</div>
  </div>
  <div class="metrics-funding">
    <span>$1.5M pre-seed</span><span class="metrics-sep">·</span>
    <span>$30K in grants &amp; competition wins</span><span class="metrics-sep">·</span>
    <span>Featured in Forbes, BulletPitch, UPenn Venture Lab</span><span class="metrics-sep">·</span>
    <span>Accepted to YC W2024</span>
  </div>
</div>`
      },
      {
        id: 'context-problem',
        title: '02 — The Problem',
        headline: 'Premium tools were priced for committed subscribers, not curious explorers',
        content: `<p>Users created fake emails for free trials, shared passwords in friend groups, even paid for a VPN to unlock cheaper regional pricing. Premium tools like Grammarly ($180/year) and Crunchbase ($600) were priced for committed subscribers, not curious explorers.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I keep creating new email accounts to get free trials. It's the only way to try things without committing."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<img loading="lazy" decoding="async" src="/images/keye/Sharing%20Subscription.png" alt="Screenshots of real group chat conversations across UPenn — students splitting and sharing subscription costs for MasterClass, Crunchbase, Grammarly, and streaming services" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 16px; display: block;" />

<div style="font-size: 13px; color: #9CA3AF; margin-bottom: 40px;">Snippets from real conversations across UPenn.</div>

<p style="margin-top: 48px;">ClassPass proved flexible multi-provider access worked; Apple One bundled someone else's services. Neither filled the gap between free trial and full subscription — that gap was Keye's opportunity.</p>`
      },
      {
        id: 'started',
        title: '03 — Where I Started: Evidence over Instinct',
        headline: "My job wasn't to execute the founders' instincts but to introduce user evidence into a team moving on momentum",
        content: `<p>My first task was the purchase flow. Founders had baked in mandatory consent and a feedback survey at checkout — completion dropped 30% there. I moved consent to signup and tested the survey in three placements: email (80% ignored), in-checkout (confused buyers), and a post-access popup, which worked because users had just used the product. Drop-off fell 20% in one sprint.</p>

<p style="margin-top: 28px;">The hardest call was removing product descriptions after testing showed users scanning, not reading. I led with imagery and a side-by-side price comparison, pre-selecting Keye — some users then bought full subscriptions through us, a behavior we hadn't designed for but kept.</p>

<div class="pull-quote" style="margin-top: 28px;">On a seed-stage startup budget, I worked by signal saturation: once the same friction appeared across five or six users, it was real enough to act on.</div>`
      },
      {
        id: 'feature-index',
        title: '04 — Features',
        headline: 'Three systems that carried the rest of the product',
        content: `<div class="feature-index">
  <a href="#credit-system" class="feature-index-item">
    <div class="feature-index-num">01</div>
    <div class="feature-index-title">The Credit System</div>
    <div class="feature-index-hook">Five pricing models in ten months — the cap that turned price into discovery.</div>
  </a>
  <a href="#product-card" class="feature-index-item">
    <div class="feature-index-num">02</div>
    <div class="feature-index-title">The Product Card</div>
    <div class="feature-index-hook">Six versions of the one component every other feature had to live inside.</div>
  </a>
  <a href="#extension" class="feature-index-item">
    <div class="feature-index-num">03</div>
    <div class="feature-index-title">The Chrome Extension</div>
    <div class="feature-index-hook">An 18-month problem solved in ten days, inspired by a rain jacket.</div>
  </a>
</div>`
      },
      {
        id: 'credit-system',
        title: '05 — Feature 01: The Credit System',
        headline: 'Designed with the founders and PM, proven by users — five pricing models in ten months',
        content: `<div style="width: 100%; height: 480px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: 5-Frame Version Timeline</div>
    <div style="font-size: 13px; line-height: 1.5;">One icon-driven frame per version, v1 → v5<br/>Credit counter animating ∞ → 200 → tier badges</div>
  </div>
</div>

<div class="feature-stat">
  <div class="feature-stat-num">1–2% → 30–35%</div>
  <div class="feature-stat-label">Lesser-known product activity, six weeks after the 200-credit cap shipped</div>
</div>

<p>Founders needed monetization before runway ran out — that direction was theirs. What shipped was five real pricing models in ten months, each one killed by evidence the PM and I brought back from users, not opinion.</p>

<div class="feature-note"><span class="feature-note-label">Direction</span> Founders proposed a flat 10% fee. Survey data I ran said users would pay 5–6%, not 10% — the cap that eventually shipped came from closing that gap with them, not overriding it.</div>

<div class="feature-chip-row">
  <span class="feature-chip"><b>v1</b> Free</span>
  <span class="feature-chip"><b>v2</b> 10% flat fee</span>
  <span class="feature-chip"><b>v3</b> Uncapped credits</span>
  <span class="feature-chip"><b>v4</b> 200/mo cap</span>
  <span class="feature-chip"><b>v5</b> Tiered plans</span>
</div>

<div class="pull-quote">We didn't design the credit system. We discovered it — together, one killed model at a time.</div>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Low-Credit Pop-up + Notification</div>
    <div style="font-size: 13px; line-height: 1.5;">v4 low-credit pop-up banner shown alongside the matching push notification/email</div>
  </div>
</div>

<div style="border-left: 3px solid #E7E5E4; padding-left: 16px; font-size: 13px; color: #78716C; line-height: 1.6;">
  <span style="font-weight: 600; color: #57534E;">87%</span> of surveyed users said they'd avoided purchasing a product specifically to skip entering payment info — early signal behind the credit model.
</div>`
      },
      {
        id: 'product-card',
        title: '06 — Feature 02: The Product Card',
        headline: "Shaped as much by engineering's constraint as by design intent",
        content: `<div style="width: 100%; height: 480px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: 6-Frame Evolution Strip</div>
    <div style="font-size: 13px; line-height: 1.5;">Visual diff per version, each tagged with its one-word trigger:<br/>system → states → scale → support → growth → mobile</div>
  </div>
</div>

<div class="feature-stat">
  <div class="feature-stat-num">6 → 0</div>
  <div class="feature-stat-label">Features shipped on this one component, zero redesigns needed</div>
</div>

<p>Six versions, because every other system eventually had to live inside this one card — from an inherited layout with no system to a mobile design system reused for the Chrome extension. Engineering kept asking one question: <em>can this be a state of the existing component, not a new one?</em> That constraint, not a personal design philosophy, is what kept the card reducing instead of sprawling.</p>

<div class="feature-note"><span class="feature-note-label">Constraint</span> Frontend engineering was 12 hours away in Asia — every new state had to be justified before a single ticket got written, or it wouldn't ship for days.</div>

<div class="feature-chip-row">
  <span class="feature-chip"><b>v1</b> No system</span>
  <span class="feature-chip"><b>v2</b> Componentized</span>
  <span class="feature-chip"><b>v3</b> Label system</span>
  <span class="feature-chip"><b>v4</b> Request added</span>
  <span class="feature-chip"><b>v5</b> Buy Again + Refer</span>
  <span class="feature-chip"><b>v6</b> Mobile system</span>
</div>

<div class="pull-quote">Getting the component right early is what let six features ship without six redesigns.</div>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">VIDEO: Morph/Motion Version</div>
    <div style="font-size: 13px; line-height: 1.5;">Same six frames, shape and content shifting version to version</div>
  </div>
</div>

<div style="display: flex; gap: 16px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 13px;">
    <div style="text-align: center; padding: 16px;">IMAGE: Credit-cost badge (v3) close-up</div>
  </div>
  <div style="flex: 1; min-width: 200px; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 13px;">
    <div style="text-align: center; padding: 16px;">IMAGE: Countdown timer (v2) close-up</div>
  </div>
</div>`
      },
      {
        id: 'extension',
        title: '07 — Feature 03: The Chrome Extension',
        headline: "A constraint the team couldn't engineer around — until the idea came from buying a rain jacket",
        content: `<div style="width: 100%; height: 480px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Before/After Split</div>
    <div style="font-size: 13px; line-height: 1.5;">Old copy-paste flow (7+ steps, tab switches) vs. extension auto-fill (1 motion)<br/>Annotate step count to make −63% concrete</div>
  </div>
</div>

<div class="feature-stat">
  <div class="feature-stat-num">65%</div>
  <div class="feature-stat-label">Of users on the extension by the time I left — the fix for an 18-month-old unsolved problem</div>
</div>

<p>Partner integrations were the founders' original plan — the roadmap called for each partner to build against our API. Then our technical co-founder left, taking backend capacity with him, and that plan stopped being possible. Watching Honey auto-fill codes at checkout, I saw a fix that needed no partner engineering at all. Prototyped in two days, shipped that week with the remaining team.</p>

<div class="feature-note"><span class="feature-note-label">Constraint</span> No backend engineer left on the team after the co-founder's exit — whatever shipped next had to be entirely client-side.</div>

<div class="feature-chip-row">
  <span class="feature-chip"><b>2 days</b> to prototype</span>
  <span class="feature-chip"><b>22%</b> install rate in 2 weeks</span>
  <span class="feature-chip"><b>−63%</b> login friction</span>
</div>

<div class="pull-quote">The fix wasn't a partnership we finally got — it was a pattern that already existed somewhere else.</div>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">VIDEO: Split-Screen Motion</div>
    <div style="font-size: 13px; line-height: 1.5;">Same before/after playing in real time side by side — pacing contrast sells the stat better than a caption</div>
  </div>
</div>

<div style="width: 100%; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 13px;">
  <div style="text-align: center; padding: 16px;">IMAGE: 3-step evolution strip — auto-fill → suggestion → in-context purchase</div>
</div>`
      },
      {
        id: 'tradeoffs',
        title: '08 — Tradeoffs & Hard Calls',
        headline: 'None of these were mine to decide alone — engineering, marketing, founders, and investors each pushed back, and the product was better for it',
        content: `<p>Every hard call below was negotiated, not dictated — my job was bringing evidence into rooms where other people had the final say.</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 32px;">
  <div>
    <div class="cs-card-title">The GIF Decision</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">I wanted animated onboarding characters; engineering flagged performance. I brought evidence on Lottie's lightweight format — we learned it together, and a better solution won over either original position.</div>
  </div>

  <div>
    <div class="cs-card-title">The Influencer Debate</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Marketing wanted influencer streams and social mechanics. I reframed it: users came to access tools, not to be entertained. Founders agreed.</div>
  </div>

  <div>
    <div class="cs-card-title">The Mobile App Concession</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">I believed in a native app; founders and investors disagreed on cost. I conceded, and made mobile web thorough enough that it barely cost users anything.</div>
  </div>

  <div>
    <div class="cs-card-title">The Mid-Growth Rebrand</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Changing palette and typography mid-funnel was risky. We shipped it live — it coincided with a 34% single-month growth spike.</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 48px;">What I'd do differently isn't a product decision — it's role design. Founding-designer roles expand to fill whatever you give them. I learned to define boundaries before the product demands more than one person can sustainably give.</div>`
      },
      {
        id: 'impact',
        title: '09 — Impact & Reflection',
        headline: "The most important thing a founding designer builds isn't the product. It's the foundation that lets the product grow without being rebuilt from scratch",
        content: `<p>By year three, the founding team dispersed. The company pivoted into YC W2024 on financial analytics — the marketplace didn't survive, but the research, partnerships, and funding that made YC possible came from what we built.</p>

<div class="pull-quote" style="margin-top: 48px;">The credit cap wasn't valuable because it monetized the product. It was valuable because it generated the behavioral data that shaped the entire partnership strategy.</div>

<p style="margin-top: 48px;">Keye compressed the feedback loop between decision and consequence from months to days. It taught me to treat every decision as a hypothesis — the ones I confirmed without testing were the ones that broke in production.</p>`
      },
    ]
  },
  lat: {
    title: 'LAT',
    subtitle: 'Lifecycle Assessment Tracker',
    description: 'Turning fragmented campus maintenance into a trusted financial decision system',
    brief: {
      context: 'Lead designer for an ML-driven platform helping a university manage 60–80+ buildings across three campuses — layered onto their existing tools, not replacing them.',
      constraint: 'The legacy CMMS/ERP stack couldn\'t be disrupted, data integrity had hard boundaries from duplicated records, and capital decisions were politically sensitive.',
      decision: 'Shipped as a modular API layer with human-in-the-loop AI — approval gates, visible reasoning, logged overrides — instead of full automation.',
      tradeoff: 'Chose slower, trust-building decisions over speed; a wrong high-visibility alert (the boiler incident) validated staying cautious.'
    },
    tldr: {
      role: 'Lead Product Designer (60% design, 40% strategy)',
      team: '1 PM, 1 designer (me), 2 external engineers, client stakeholders',
      timeline: '8 months',
      impact: '95% pilot adoption | 70%→95% data accuracy | 25% cost reduction projected',
      skills: 'Enterprise UX · ML/AI design · Stakeholder alignment · Field research · API-first architecture'
    },
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<p><span style="font-weight: 600;">Product</span><br/>An ML-driven platform helping a Pacific Northwest university manage 60–80+ buildings across three campuses. LAT shipped as a modular API layer alongside their legacy CMMS/ERP, turning fragmented data into financial intelligence without a system replacement.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> I owned product vision, workflows, and the design system, aligning field technicians, managers, accountants, and executives — translating institutional needs into requirements and pushing for field research when stakeholders wanted to skip it.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline was 8 months</span><br/>Discovery to data consolidation to ML framework to pilot to beta to release. The platform continued beyond my tenure.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Team</span><br/>1 PM, 1 designer (me), 2 external engineers, plus client-side CAPEX, data science, accounting, and property management teams</p>

<div style="width: 100%; min-height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">Hero — role-based dashboard split: the same asset rendered for a technician (mobile, offline-first), a manager (priority queue), and an executive (filtered summary). One data model, three cognitive surfaces.</div>

<h4 class="case-study-subhead">Impact</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; margin-bottom: 32px;">
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Pilot adoption</span><br/>95% of property managers (vs. 70% benchmark)<br/><span style="font-size: 13px; color: #6B7280;">Usage tracking during pilot — most rigorously measured</span></p>
  </div>
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Data accuracy</span><br/>70% → 95%<br/><span style="font-size: 13px; color: #6B7280;">Audit of asset records pre/post canonical ID + sync validation</span></p>
  </div>
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Reporting time per ticket</span><br/>~20 min → ~8 min<br/><span style="font-size: 13px; color: #6B7280;">Observed field timing, pre/post offline-first workflow</span></p>
  </div>
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Budget revisions</span><br/>↓ 36%<br/><span style="font-size: 13px; color: #6B7280;">Planning-cycle comparison vs. prior year</span></p>
  </div>
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Emergency repair incidents</span><br/>↓ 12%<br/><span style="font-size: 13px; color: #6B7280;">Work-order classification during pilot period</span></p>
  </div>
  <div>
    <p style="margin: 0;"><span style="font-weight: 600;">Unexpected maintenance costs</span><br/>↓ 25% projected<br/><span style="font-size: 13px; color: #6B7280;">Lifecycle model forecast validated against pilot repair data</span></p>
  </div>
</div>

<p style="font-size: 14px; color: #6B7280;">Adoption, data accuracy, and reporting time are the numbers I'm most confident in because they were directly observed. The cost figures came from the platform's own forecasting layer, so I hold them more loosely and say so when asked.</p>`
      },
      {
        id: 'context-problem',
        title: '02 — Context & Problem',
        headline: 'Fragmented data was forcing humans to do the work a system should have done',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording demonstrating a technician, manager, and leadership each working from fragmented, disconnected tools" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2001.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p>Universities manage billions in infrastructure with fragmented tools: a technician underground can't access repair history, a project manager stitches together spreadsheets and invoices before planning meetings, leadership decides on partial data.</p>

<p style="margin-top: 28px;">Without a unified system, everyone operates in their own flow with no common path:</p>

<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 48px auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording showing each role's separate, uncoordinated workflow path through the old tools" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2003.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<img loading="lazy" decoding="async" src="/images/lat/User%20Issues.webp" alt="User Issues" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<div style="display: flex; gap: 24px; margin-top: 8px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I do the physical work in 30 minutes, but reporting takes another 20."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Each year I'm choosing between urgent-now and smart-long-term with partial data."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 48px;">The institution wasn't lacking expertise. It was operating without a unified source of truth.</div>

<h4 class="case-study-subhead">Why existing tools failed</h4>

<p style="margin-top: 20px;">CMMS platforms handle tickets and leases but don't model asset lifespan or CapEx tradeoffs. Preventive maintenance ran on time, not risk, causing over-maintenance and surprise failures. Field tools assumed stable connectivity, so slow digital reporting killed adoption. And replacing the legacy stack wasn't viable — it was wired into procurement and budgeting. They didn't need another silo; they needed a layer that worked with what existed.</p>

<img loading="lazy" decoding="async" src="/images/lat/Market%20Gap.webp" alt="Market Gap Analysis" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />`
      },
      {
        id: 'turning-point',
        title: '03 — The Turning Point',
        headline: 'Research revealed we were redesigning a system of coordination',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording of the role-based dashboard surfaces built over a shared data foundation" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p>We thought we were customizing a product. Research showed we were redesigning <span style="font-weight: 600;">a system of coordination.</span></p>

<p style="margin-top: 28px;">The breakthrough wasn't the AI — it was recognizing that fragmented data was forcing humans to do system work. Everyone had access to data; what they lacked was context, prioritization, and trust.</p>

<p style="margin-top: 28px;">That reframed everything. Instead of one dashboard for everyone, we built role-based surfaces over a shared foundation, surfacing only what was actionable.</p>

<img loading="lazy" decoding="async" src="/images/lat/pROBLEM.webp" alt="System architecture diagram — modular API layer, role-based surfaces, shared data foundation" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />`
      },
      {
        id: 'constraints',
        title: '04 — Constraints & Design Responses',
        headline: "The legacy ecosystem couldn't be disrupted, so LAT shipped as a modular layer alongside it",
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Legacy Ecosystem Couldn't Be Disrupted</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">LAT shipped as a modular API layer alongside the existing CMMS/ERP stack — no forced migration, no workflow replacement, incremental transparency without triggering resistance.</div>
  </div>

  <div>
    <div class="cs-card-title">Data Integrity Had Hard Boundaries</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Strict governance meant we inherited duplicated, inconsistent records. That constraint produced the project's defining incident (section 07); the response — validation states, multi-signal checks, confidence tiers — became the product's trust architecture.</div>
  </div>

  <div>
    <div class="cs-card-title">Capital Decisions Were Political</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Layered approvals, public accountability, donor influence — automation there isn't neutral, it's political. We kept managers as approval gatekeepers, made AI show its reasoning, and logged every override.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Approval Workflow</div>
    <div style="font-size: 13px; line-height: 1.5;">Manager review gates → AI reasoning display → Override logging<br/>Shows human-in-the-loop design</div>
  </div>
</div>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Roles Had Wildly Different Needs</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians needed voice-to-text and big touch targets, not desk-built forms. Managers running 15 jobs a day needed delegation, not dashboards. Accountants needed brief-with-drill-down; executives needed two options, not a back-study. Role-based surfaces beat one universal view.</div>
  </div>

  <div>
    <div class="cs-card-title">Field Reality: Connectivity & Devices</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians worked underground and on swing stages with unstable connections. We shipped offline-first capture with queued auto-sync, and pushed phone-first refinement to a later phase — field users wanted it sooner, but organizational trust had to come first.</div>
  </div>

  <div>
    <div class="cs-card-title">Eight Months Forced Scope Discipline</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">AI auto-scheduling, ESG modeling, digital twins, a live campus map — all tempting. The filter: one north star (reduce unexpected costs) plus two drivers (planning accuracy, adoption velocity). Anything that didn't serve those moved to the roadmap: data unification → offline workflows → lifecycle visibility → predictive modeling → simulation.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Offline-First Architecture</div>
    <div style="font-size: 13px; line-height: 1.5;">Mobile workflow: Local queue → Capture → Auto-sync → Retry logic<br/>Shows connectivity resilience design</div>
  </div>
</div>`
      },
      {
        id: 'strategy',
        title: '05 — Strategy',
        headline: 'One north star: reduce unexpected maintenance costs by 25%',
        content: `<p>Every feature mapped to one of three drivers: <span style="font-weight: 600;">cost reduction, planning accuracy, or adoption velocity.</span> If it didn't serve one, it didn't ship.</p>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 48px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Trust Precedes Automation</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">AI as decision support, not authority — approval gates, logged overrides, confidence-aware outputs.</div>
  </div>

  <div>
    <div class="cs-card-title">Adoption Before Expansion</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Offline workflows and repair clarity first; AI auto-scheduling and ESG modules second.</div>
  </div>

  <div>
    <div class="cs-card-title">Data Integrity Before AI</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Stabilized data foundation first, predictive sophistication second.</div>
  </div>

  <div>
    <div class="cs-card-title">Reduce Cognitive Load</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Role-tailored surfaces, signals not noise.</div>
  </div>
</div>

<div style="background-color: #F9FAFB; padding: 28px; border-radius: 12px; border-left: 3px solid #7EB3F5;">
  <div class="cs-card-title cs-card-title--md">Platform Thinking</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">The predictive engine improves as override data accumulates: more campuses → more lifecycle data → smarter predictions → higher switching cost. LAT compounds intelligence through use.</div>
</div>`
      },
      {
        id: 'solution',
        title: '06 — Solution',
        headline: 'Three pillars turned operational signals into financial intelligence',
        content: `<div style="margin-top: 32px; margin-bottom: 48px;">
  <div style="font-size: 20px; font-weight: 600; color: #1C1917; margin-bottom: 16px;">Pillar 1 — Reliable Field Intelligence</div>
  <p>Automatically link <span style="font-weight: 600;">Work Orders ↔ Asset DNA ↔ Cost-to-Date</span>. The conversation shifted from "we'll fix it again" to "this unit cost $42K in three years; replacing now saves $18K."</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 1: Field Workflow Evolution</div>
    <div style="font-size: 13px; line-height: 1.5;">Mobile interface showing: offline queue → capture with voice input → auto-sync confirmation<br/>Annotation: "Reporting time: 20min → 8min"</div>
  </div>
</div>

<div style="background-color: #FFF9F5; padding: 24px; border-radius: 12px; border-left: 3px solid #FF6B35; margin-bottom: 48px;">
  <div class="cs-card-title cs-card-title--sm">The "Everything Dashboard" Failed</div>
  <p style="font-size: 15px; color: #57534E; line-height: 1.6; margin: 0;">Multiple graphs looked impressive; managers scanned without acting. We replaced it with a ranked priority queue — action first, analysis second.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 2: Dashboard Before/After</div>
    <div style="font-size: 13px; line-height: 1.5;">Left: Dense "Everything Dashboard" with 8+ graphs<br/>Right: Clean priority queue with contextual side panels<br/>Annotation: "Decision time: 14min → 4min"</div>
  </div>
</div>

<div style="margin-bottom: 48px;">
  <div style="font-size: 20px; font-weight: 600; color: #1C1917; margin-bottom: 16px;">Pillar 2 — Predictive Lifecycle Intelligence</div>
  <p>Turn predictive signals into ranked alerts. Early alerts said <span style="font-style: italic;">"Boiler failure risk: 68%"</span> — managers hesitated. We shifted to consequence framing: <span style="font-style: italic;">"High vibration + 9 years in service → delaying replacement may cost $18K."</span> Humans act on consequences, not probabilities.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 3: Alert Card Before/After ⭐</div>
    <div style="font-size: 13px; line-height: 1.5;">Left: "Boiler failure risk: 68%" (probability framing)<br/>Right: "High vibration + 9yr service → $18K savings if replaced now" (consequence framing)<br/>Shows: Critical/Monitor/Safe tiers + top 3 drivers</div>
  </div>
</div>

<div style="background-color: #FFF9F5; padding: 24px; border-radius: 12px; border-left: 3px solid #FF6B35; margin-bottom: 32px;">
  <div class="cs-card-title cs-card-title--sm">The Boiler Incident — When AI Was Wrong</div>
  <p style="font-size: 15px; color: #57534E; line-height: 1.6; margin: 0;">Month 2: the engine flagged a $180K boiler replacement as Critical. Inspection showed duplicated repair entries had inflated the risk. Three guardrails contained it — manager review gate, visible drivers, no auto-procurement. We added a "Needs Verification" state and multi-signal validation. Adoption held at 95%.</p>
</div>

<div class="pull-quote">The real AI risk in enterprise isn't model sophistication — it's dirty upstream data influencing downstream capital decisions.</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 4: Boiler Incident Screen</div>
    <div style="font-size: 13px; line-height: 1.5;">Critical alert showing visible contributing drivers (with duplicate entries highlighted)<br/>"Needs Verification" state badge<br/>Manager override logged in timeline</div>
  </div>
</div>

<div style="margin-bottom: 48px;">
  <div style="font-size: 20px; font-weight: 600; color: #1C1917; margin-bottom: 16px;">Pillar 3 — Strategic Simulation & Governance</div>
  <p>In-house scenario comparison with side-by-side cost/timeline deltas. Before LAT, feasibility questions meant commissioning external studies; after, teams ran three scenarios instantly and exported board-ready outputs. Decision velocity over spectacle.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 5: Scenario Comparison</div>
    <div style="font-size: 13px; line-height: 1.5;">Two scenarios side-by-side: "Repair" vs "Replace"<br/>Shows: Cost delta, timeline delta, risk comparison<br/>Export button for board-ready CapEx reports</div>
  </div>
</div>`
      },
      {
        id: 'tradeoffs',
        title: '07 — Tradeoffs',
        headline: 'We chose human-in-the-loop over speed, accepting slower decisions to build trust',
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 32px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Automation vs. Trust</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">The engine could have auto-escalated and auto-scheduled maintenance. We chose human-in-the-loop instead — 95% adoption, with override frequency falling over time. Early automation would have collapsed adoption after the first visible mistake.</div>
  </div>

  <div>
    <div class="cs-card-title">Signal Richness vs. Decision Speed</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Engineering wanted 10+ predictive inputs visible per asset. Testing showed users focused on risk, time-to-impact, and cost — everything else created hesitation. We showed top drivers and moved depth to drill-down.</div>
  </div>

  <div>
    <div class="cs-card-title">Transparency vs. Organizational Comfort</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Some stakeholders wanted curated weekly summaries; real-time visibility exposed inefficiencies and shifted narrative control. I pushed for role-based dashboards with threshold notifications — meetings became strategic, not status-driven.</div>
  </div>

  <div>
    <div class="cs-card-title">AI Expansion vs. Data Integrity</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">There was momentum to widen predictive coverage fast after early results. We slowed it — validation states, inventory checks, override logging first. Data accuracy: 70% → 95%.</div>
  </div>
</div>

<img loading="lazy" decoding="async" src="/images/lat/AB%20Testing.webp" alt="AB Testing comparison showing simplified vs detailed alert views" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<div class="pull-quote">The failure mode is never the UI. It's adoption, trust, and behavior — once those break, the metrics follow.</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Trust Over Time Chart</div>
    <div style="font-size: 13px; line-height: 1.5;">Override rate: 61% → 19% | Decision time: 14min → 4min | Adoption: climbing to 95%<br/>Interventions marked: Boiler incident (Mo 2), Confidence tiers (Mo 3), Consequence framing (Mo 5), Feedback loop (Mo 7)</div>
  </div>
</div>`
      },
      {
        id: 'impact',
        title: '08 — Impact',
        headline: "The biggest change wasn't cost savings — it was decision confidence",
        content: `<p><span style="font-weight: 600;">Operational.</span> Linking work orders to lifecycle cost made repair history visible in real time — managers began reviewing repair frequency before approving repeat fixes.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Decision-making.</span> Teams stopped entering meetings to reconcile facts and started entering them to decide.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Strategic.</span> Scenario simulation moved feasibility analysis in-house and drew expansion interest from other universities — a path from consulting project to scalable platform.</p>

<h4 class="case-study-subhead">Impact</h4>

<div class="metrics-grid metrics-grid--dark" style="margin-bottom: 48px;">
  <div class="metrics-cell metrics-cell--hero">
    <div class="metrics-num">70% → 95%</div>
    <div class="metrics-label">Data accuracy across the pilot</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">95%</div>
    <div class="metrics-label">Pilot adoption, vs. a 70% benchmark</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">25%</div>
    <div class="metrics-label">Projected maintenance cost reduction</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">20min → 8min</div>
    <div class="metrics-label">Reporting time, per ticket</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">−36%</div>
    <div class="metrics-label">Budget revisions</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">−60%</div>
    <div class="metrics-label">Planning time</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">−12%</div>
    <div class="metrics-label">Emergency incidents</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 48px;">The biggest change wasn't cost savings. It was decision confidence.</div>`
      },
      {
        id: 'reflection',
        title: '09 — Reflection',
        headline: "Clarity drove action more than completeness — users didn't want more data, they wanted less to think about",
        content: `<p><span style="font-weight: 600;">What I got wrong.</span> I thought predictive accuracy would drive adoption — it didn't. Data integrity and clarity mattered more; strong predictions failed when the underlying data was messy or hard to act on. Next time: audit data before any predictive expansion, and lead with consequence framing from day one.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What mattered more than expected.</span> The lifecycle linkage, not the AI. Once work orders, asset history, and cost-over-time were reliably connected, decisions improved before the predictive layer even matured — users didn't want more data, they wanted less to think about.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What I learned about AI in enterprise.</span> Adoption depends less on model sophistication than on trust architecture — visible reasoning, human control, confidence-aware outputs, failure containment built in from the start. One wrong high-visibility alert can undo months of adoption. Design for the failure, not the demo.</p>`
      },
    ]
  },
  'misinformation-center': {
    title: 'Misinformation Center',
    subtitle: 'Media Literacy Tools for the AI Age',
    description: 'Research collaboration with TrueMedia.org',
    heroImage: '/images/misinformation-center/Hero.png',
    brief: {
      context: 'UW graduate capstone (solo after month two) asking whether people could be equipped to identify misinformation themselves, in research partnership with TrueMedia.org.',
      constraint: 'No engineering resourcing beyond a prototype, and testing showed users rejected any platform-integrated solution outright — the tool had to stand alone.',
      decision: 'Built four independent tools (Search, Scan, Quiz, Ask Us) that help people verify and learn, instead of another fact-check label.',
      tradeoff: 'Concept validated with ~1,800 testers, but TrueMedia shut down mid-collaboration — proof that sound design alone can\'t make a public good sustainable.'
    },
    tldr: {
      role: 'Sole Designer (Graduate Capstone)',
      team: 'Solo (post-February 2024) · Research collaboration with TrueMedia.org',
      timeline: '7 months (Jan–July 2024)',
      impact: '~1,800 testers at Misinfo Day | 2,000-respondent survey | Concept validation',
      skills: 'User research · Concept design · Gamification · Platform strategy · Academic rigor'
    },
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<div class="snapshot-content-wrapper">
<div class="snapshot-text-content">
<p>Platforms try to control misinformation, but users don't trust them. This capstone asked a different question: what if we equipped people to identify it themselves?</p>

<img loading="lazy" decoding="async" src="/images/misinformation-center/Truth.png" alt="Truth visual" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<p style="margin-top: 28px;"><span style="font-weight: 600;">Agency over authority.</span> People resist being told what's true, but respond better when given tools to decide for themselves. Not another fact-check label — tools that help people pause, verify, and learn, folded into daily habits.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"She took us along on her journey of learning from users as she went."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> Sole designer on a UW graduate capstone (Jan–July 2024), started as a team of four. After February, the product, design, and direction were entirely mine — research, archetypes, all four features, and testing with ~1,800 people at Misinfo Day.</p>

<p style="margin-top: 28px;">From March to May, I collaborated with TrueMedia.org, a deepfake-detection nonprofit, on research and market assessment. They analyzed 60,000+ pieces of media and shut down in January 2025 — not from bad design, but because nobody profits from deepfake detection. That's this case study's throughline: design alone can't make a public good sustainable (section 06).</p>
</div>

<div class="snapshot-bottom-content">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 48px; margin-bottom: 48px;">
  <div style="background-color: #F3F4F6; border-radius: 12px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Search & Image Search</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">Verify links, headlines, and images with layered credibility ratings</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 12px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Scan</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">Camera-based verification for printed content — flyers, newspapers, ads</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 12px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Literacy Quiz</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">A level-based game teaching users to spot manipulated content</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 12px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Ask Us</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">Human-backed fact-checking for gray-area content algorithms miss</div>
  </div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 40px; margin-top: 28px; padding: 24px 0; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB;">
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">2,000</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">survey respondents</div>
  </div>
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">28</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">interview participants, two phases</div>
  </div>
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">14</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">moderated usability participants</div>
  </div>
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">~1,800</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">tested live at Misinfo Day</div>
  </div>
</div>

<div style="width: 100%; margin-top: 40px; margin-bottom: 40px;">
  <img loading="lazy" decoding="async" src="/images/misinformation-center/User quote.png" alt="User quote" style="width: 100%; height: auto; border-radius: 8px; display: block;" />
</div>
</div>
</div>`
      },
      {
        id: 'problem',
        title: '02 — The Problem',
        headline: 'After AI, the same problem arrived at a different scale',
        content: `<p>Misinformation exploits human bias: believe what confirms your views, trust what feels familiar, share before verifying. After AI, the same problem arrived at a different scale — more believable, more volume, same fragile ecosystem.</p>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-top: 64px; margin-bottom: 64px;">
  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 01.webp" alt="Survey Results" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">Survey Results (n=2,000)</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">74% encountered misinformation weekly. 62% of parents felt overwhelmed. <20% trusted existing fact-checkers. Users wanted peace of mind, not just truth.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 02.webp" alt="The Generational Sandwich" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Generational Sandwich</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Mothers filtering misinformation for kids while protecting elderly parents from scams. Managing media literacy for two generations at once shaped the archetype strategy.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 03.webp" alt="The Transparency Demand" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Transparency Demand</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Users wanted to see the incentive structure behind content, not just fact-check labels. Understanding who benefits mattered as much as knowing what's true.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 04.webp" alt="The Platform Trust Problem" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Platform Trust Problem</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Testing rejected a Facebook-integrated solution immediately. Users wouldn't trust the platform spreading misinformation to also solve it. The tool had to be independent.</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 100px;">The platform that spread the problem was structurally incapable of being trusted as its solution.</div>

<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 60px auto 0;">
  <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording of the verification tool embedded in trusted surfaces like the share sheet and lock screen widget" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/misinformationcenter/flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>`
      },
      {
        id: 'features',
        title: '03 — Features',
        headline: "The quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit",
        content: '',
        customComponent: <MisinfoFeaturesContent />
      },
      {
        id: 'market',
        title: '04 — Market Research',
        headline: 'Verification had to live where misinformation spreads, but platform ownership destroyed trust',
        content: `<p>Existing tools fell into two categories, neither worked:</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Monetized Platforms — Credible but Compromised</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Snopes had trust and rigor, but ran ads. Facebook labels and Twitter Community Notes had scale but were seen as biased. The entity profiting from misinformation's spread can't be trusted to flag it.</div>
  </div>

  <div>
    <div class="cs-card-title">Nonprofit Resources — Trustworthy but Invisible</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Literacy initiatives had integrity but no engagement — text-heavy resources in a short-form-video era, browser extensions desktop-bound and friction-heavy.</div>
  </div>
</div>

<p>The gap: users who trusted Reuters and the Guardian, wanted multiple sources, and read news on phones inside apps they already trusted. Every existing tool asked them to leave and do extra work — friction that was fatal.</p>

<div class="pull-quote" style="margin-top: 48px; margin-bottom: 48px;">Verification had to live where misinformation spreads, but platform ownership destroyed trust.</div>

<p><span style="font-weight: 600;">The integration insight.</span> I brought this paradox to my professors, who thought I was digging too deep for an academic project. The answer: a trusted utility embedded in trusted surfaces — Safari share sheet, Apple News, native camera — backed by institutions users can verify, owned by none of the platforms it lives in. Not another app; infrastructure that makes verification a natural step.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Great idea to bring in UI scenarios outside of the app itself, like the lock screen widget."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>`
      },
      {
        id: 'research',
        title: '05 — User Research',
        headline: 'Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording of the color-coded rating system and unified search/image-search entry point" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/misinformationcenter/Flow%2001%20Misinformation.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p style="margin-top: 8px; font-size: 15px; color: #6B7280;">2,000 survey respondents · 28 paid interviews · 14 usability sessions · ~1,800 tested live at Misinfo Day, from high schoolers to the creator of the SIFT methodology.</p>

<p style="margin-top: 28px;">Early task-based testing — verify a headline in under 30 seconds — surfaced ambiguous labels and slow search response times, which shaped a later shift to color-coded ratings and a single, unified search/image-search entry point.</p>

<div class="pull-quote" style="margin-top: 48px; margin-bottom: 48px;">Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern.</div>

<p><span style="font-weight: 600;">The finding that changed the problem:</span> Adults 55–80 receive misinformation from people they trust deeply. Teens 13–18 encounter it through peer dynamics where questioning carries social cost. Adults 25–40 sit between both — the most exhausted, managing it for two generations at once.</p>

<p style="margin-top: 28px;">The archetypes emerged from that chain, not a persona template:</p>

<p style="margin-top: 20px;"><span style="font-weight: 600;">Truth Seekers (18–30)</span> — already motivated, cross-referencing sources, wanting to be community validators, not just skeptics.</p>

<p style="margin-top: 16px;"><span style="font-weight: 600;">Overwhelmed Guardians (25–40)</span> — desperately want verification tools, but any added friction fails with this group regardless of quality.</p>

<p style="margin-top: 16px;"><span style="font-weight: 600;">Vulnerable Believers (55–80)</span> — trust what they receive because it comes from people they know. Design for them means meeting existing behavior, not demanding new habits.</p>

<p style="margin-top: 28px;">The strategy: design primarily for the first two, since they become the human layer protecting the third — a mother who learns to verify a link becomes the person her parent calls before forwarding it.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I loved that you used the quotes from interviews. It gave it a lot of meaning."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<img loading="lazy" decoding="async" src="/images/misinformation-center/User thinking.png" alt="The generational chain diagram and three archetype cards with real interview quotes" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<p style="margin-top: 36px;"><span style="font-weight: 600;">What Misinfo Day revealed that recruited testing couldn't.</span> Small-scale testing shows what people say; live testing with unrecruited crowds shows what they do. Younger participants abandoned any flow that felt like reading within seconds. Older participants trusted Ask Us over automated ratings — a person's judgment over an algorithm's output. The sharpest insight: engagement spiked when detection was framed as a skill, not a correction — people wanted to feel smart for getting it right, not told they were wrong.</p>

<p style="margin-top: 28px;">This was also the moment Scan got decided. Attendees kept asking whether it only worked on stuff already on their phone, or could check something in front of them right now — a flyer, a printed article. That gap became Scan: camera-based verification for printed and in-person content a purely digital tool would have missed.</p>

<div style="margin-top: 48px;">
  <div style="font-size: 13px; color: #6B7280; margin-bottom: 12px;">Misinfo Day — live testing with ~1,800 participants · scroll to see more →</div>
  <div style="display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 8px;">
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%281%29.jpg" alt="Misinfo Day live testing, photo 1" style="flex: 0 0 auto; scroll-snap-align: start; width: 85%; max-width: 460px; height: 340px; object-fit: cover; border-radius: 8px; display: block;" />
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%282%29.jpg" alt="Misinfo Day live testing, photo 2" style="flex: 0 0 auto; scroll-snap-align: start; width: 85%; max-width: 460px; height: 340px; object-fit: cover; border-radius: 8px; display: block;" />
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%283%29.jpg" alt="Misinfo Day live testing, photo 3" style="flex: 0 0 auto; scroll-snap-align: start; width: 85%; max-width: 460px; height: 340px; object-fit: cover; border-radius: 8px; display: block;" />
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%284%29.jpg" alt="Misinfo Day live testing, photo 4" style="flex: 0 0 auto; scroll-snap-align: start; width: 85%; max-width: 460px; height: 340px; object-fit: cover; border-radius: 8px; display: block;" />
  </div>
</div>

<div style="background-color: #000000; border-radius: 8px; padding: 40px 24px; margin-top: 40px; display: flex; justify-content: center;">
  <div class="cs-video-wrap" style="width: 100%; max-width: 300px;">
    <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording of a user uploading an image for camera-based verification" style="width: 100%; aspect-ratio: 580 / 1040; border-radius: 8px; display: block; object-fit: cover;">
      <source src="/videos/misinformationcenter/Testing%20Image%20upload.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
  </div>
</div>`
      },
      {
        id: 'truemedia',
        title: '06 — TrueMedia',
        headline: 'Detection is the expensive end of the chain — authenticating content at creation is fundamentally more efficient, but nobody profits from implementing it',
        content: `<p>TrueMedia.org was a nonprofit building deepfake detection for the 2024 election. Through UW's partnership, I contributed research synthesis on what to prioritize. They shipped a dark, utilitarian tool for journalists; mine served a teenager asking "why should I care?" — two solutions to adjacent problems. They analyzed 60,000+ pieces of media, launched in September 2024, and shut down in January 2025, open-sourcing the technology rather than chasing funding. Founder Oren Etzioni: "We are not prepared for a large-scale, generative AI attack. It hasn't come yet. That doesn't mean it won't."</p>

<p style="margin-top: 28px;">Two lessons reframed the market for me: platforms are ambivalent about detection because it drives engagement, and the real unaddressed threat — personalized scams — never reaches a community to verify it. Detection is also the expensive end of the chain; authenticating content at creation is more efficient, but C2PA proposed exactly that and stalled on incentives. A third came from testing: participants rejected a Facebook-embedded concept as too platform-tied and easy to dismiss as biased, settling the case for the integration vision over a standalone app.</p>`
      },
      {
        id: 'reflection',
        title: '07 — Reflection',
        headline: 'A designer who thinks only about what users see is a UI designer. A designer who thinks about everything required to make that experience real and sustainable is a product leader',
        content: `<p><span style="font-weight: 600;">What this project taught me.</span> Design alone cannot make a public good sustainable — TrueMedia was research-grounded and mission-complete, and it still closed on economics, not design. The compass is trusted because it has no business model; the phone manufacturer absorbs the cost. That's why the integration vision — Apple News, the share sheet, the native camera — is the sustainability answer, not a nice-to-have. Coming back to school after industry, I couldn't stay inside a class project's boundaries; every decision triggered questions about moderation staffing and who pays. My professors thought I was overcomplicating an exercise. I've come to see that instinct as the point: a designer who thinks only about what users see is a UI designer; one who thinks about what makes it real and sustainable is a product leader.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What changed from feedback and testing.</span> Reviewers pushed the quiz to teach the why behind each answer, producing the post-answer reveal, and flagged visual and navigation issues fixed in the refinement pass. Usability testing showed people liked the clarity of color-coded credibility badges but wanted to know why — pushing the rating system from a flat badge into a layered one: quick signal upfront, reasoning a tap away.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Demo was very well designed. Excited to see the next steps."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 48px;"><span style="font-weight: 600;">If I built this in 2026.</span> In 2024 this needed an organization — moderators, funding, a maintenance team. By 2026, AI collapses that requirement: triage for Ask Us, monitoring to keep quiz content current, AI-augmented research at scale. What took a fifteen-person nonprofit now takes a determined individual. The capstone answered the design question; the ecosystem question — reaching people at scale, outliving a funding cycle — is still open.</p>

<div id="prototype" class="figma-embed-container" style="margin-top: 48px;">
  <iframe style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px;" width="100%" class="figma-embed-iframe" src="https://embed.figma.com/proto/5SuxUGsaCvOVUiRdXa7uNl/Misinformation-Center?page-id=12%3A7585&node-id=20-3800&p=f&viewport=1079%2C560%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=20%3A3748&show-proto-sidebar=1&embed-host=share" allowfullscreen loading="lazy"></iframe>
</div>`
      },
    ]
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = caseStudies[slug as keyof typeof caseStudies]

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const metadataMap: Record<string, { description: string; keywords: string[] }> = {
    keye: {
      description: 'Founding Product Designer at Keye — from three static screens to YC W2024. Built credit-based marketplace, Chrome extension, and design system. 0→20K MAUs, $1.5M raised.',
      keywords: ['YC startup designer', 'founding designer', 'startup product design', 'credit marketplace', 'Chrome extension design', 'design systems', 'subscription marketplace', 'SaaS design']
    },
    lat: {
      description: 'Lead Product Designer for LAT Platform — ML-driven lifecycle assessment for university campus maintenance. 95% pilot adoption, 70%→95% data accuracy, 25% cost reduction.',
      keywords: ['enterprise UX', 'ML product design', 'AI design', 'university technology', 'predictive maintenance', 'lifecycle assessment', 'B2B design', 'decision intelligence']
    },
    'misinformation-center': {
      description: 'UW graduate capstone on media literacy tools for the AI age. Research collaboration with TrueMedia.org. Tested with ~1,800 people at Misinfo Day.',
      keywords: ['media literacy', 'misinformation design', 'AI ethics', 'fact-checking UX', 'educational design', 'UW capstone', 'civic tech design', 'deepfake detection']
    }
  }

  const meta = metadataMap[slug] || { description: caseStudy.description, keywords: [] }

  return {
    title: `${caseStudy.title} — ${caseStudy.subtitle}`,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${caseStudy.title} — ${caseStudy.subtitle}`,
      description: meta.description,
      url: `https://indhu.design/work/${slug}`,
      images: [
        {
          url: `/og-${slug}.png`,
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} case study`,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} — ${caseStudy.subtitle}`,
      description: meta.description,
      images: [`/og-${slug}.png`],
    }
  }
}

export default async function CaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const caseStudy = caseStudies[slug as keyof typeof caseStudies]

  if (!caseStudy) {
    return (
      <div style={{ padding: '60px', color: '#1C1917' }}>
        Case study not found
      </div>
    )
  }

  return <CaseStudyLayout caseStudy={caseStudy} slug={slug} />
}

export async function generateStaticParams() {
  return [
    { slug: 'keye' },
    { slug: 'lat' },
    { slug: 'misinformation-center' },
  ]
}
