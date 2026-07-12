import CaseStudyLayout from '@/components/CaseStudyLayout'

const caseStudies = {
  keye: {
    title: 'Keye',
    subtitle: 'Subscription Marketplace',
    description: 'From three static screens to a YC-backed company',
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
        content: `<p><span style="font-weight: 600;">Product</span><br/>A credit-based B2C marketplace giving users flexible, low-commitment access to premium digital tools — Grammarly, Adobe, Otter.ai, MasterClass, Crunchbase, and a 150+ product catalog — without long-term subscriptions. ClassPass, but for digital tools.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role — Founding Product Designer.</span> Keye's first and only designer for most of its life. When I joined, the product was three static screens — no flows, no credit architecture, no design system. I designed every user-facing surface across web, mobile web, and a Chrome extension; authored PRDs; ran continuous research and QA; contributed to VC pitch materials; and hired and mentored the two designers who succeeded me.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline</span> — 2 years (2021–2022): beta → credit system → marketplace expansion → Chrome extension → seed funding. The traction, research, and funding built during this period carried the company into Y Combinator (W2024) after the founding team dispersed and the remaining founder pivoted the business.</p>

<div style="width: 100%; min-height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Metrics table placeholder</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Impact</span></p>

<p style="margin-top: 16px;">• User growth: 0 → 20K+ MAUs in under 12 months<br/>
• Engagement: +45% within 3 months<br/>
• Trial-to-paid conversion: +32% post monetization<br/>
• Catalog & partnerships: 150+ products; 35+ direct partnerships incl. Adobe, Grammarly, Otter.ai<br/>
• Partner subscriptions: +44% YoY<br/>
• Extension adoption: 60% of users within 3 months<br/>
• Login friction: −63% via auto-login</p>

<p style="margin-top: 28px;">$1.5M pre-seed · $30K in grants and competition wins · Featured in Forbes, BulletPitch, UPenn Venture Lab · Company accepted to YC W2024</p>

<div style="width: 100%; min-height: 500px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Hero — the original three Wharton screens beside the final marketplace, mobile web, and extension</div>`
      },
      {
        id: 'context-problem',
        title: '02 — The Problem',
        headline: 'Premium tools were priced for committed subscribers, not curious explorers',
        content: `<p>Users were creating fake email addresses to get free trials. Friend groups shared passwords. One research participant paid for a VPN just to access cheaper regional pricing. The market was telling us something directly: premium tools — Grammarly at $180/year, Crunchbase at $600 — were priced for committed subscribers, not curious explorers. Free trials demanded a card, were easy to forget, and painful to cancel, so users grew suspicious of the entire category.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I keep creating new email accounts to get free trials. It's the only way to try things without committing."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 40px;">ClassPass proved flexible multi-provider access could work; Apple One bundled services into someone else's package. Neither served the space between free trial and full subscription. That gap was the entire Keye opportunity.</p>`
      },
      {
        id: 'started',
        title: '03 — Where I Started: Evidence over Instinct',
        headline: "My job wasn't to execute the founders' instincts but to introduce user evidence into a team moving on momentum",
        content: `<p>My first task — the purchase flow — arrived with the founders' assumptions baked in: mandatory consent and a feedback survey embedded in checkout. Completion dropped 30% at those steps. I moved consent to signup, tested the survey in three placements (email: 80% ignored; in-checkout: confused buyers; post-access popup: finally right — users had just used the product and had something real to say). Drop-off fell 20% in one sprint.</p>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Before/after checkout + the price-comparison product page</div>

<p style="margin-top: 28px;">The hardest early call was removing product descriptions. Testing showed users scanning, not reading — so I led with imagery and a side-by-side price comparison ($4.99 access vs. $10.99/month subscription), pre-selecting the Keye option. Some users went on to buy full subscriptions through Keye after seeing the comparison — behavior we hadn't designed for but kept.</p>

<div class="pull-quote" style="margin-top: 28px;">With no research budget, I worked by signal saturation: once the same friction appeared across five or six independent users, it was real enough to act on.</div>`
      },
      {
        id: 'credit-system',
        title: '04 — The Credit System: From Constraint to Intelligence',
        headline: 'The credit cap turned price into a discovery mechanic and shaped the entire partnership strategy',
        content: `<p>The most important design decision in Keye's history — not for how it looked, but for what it revealed.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Unlimited credits (MVP)</span> removed all friction — and all intentionality. FullStory showed users activating HBO, Hulu, and Tubi the same day, exhausting access before people who genuinely wanted a product could reach it.</p>

<div style="width: 100%; height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Unlimited usage behavior</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">A 200-credit cap</span> changed behavior immediately. The week it launched, a friend messaged me, frustrated her boyfriend had spent their credits on Hulu before she could watch HBO. Users now had a stake in their choices. The cap also turned <span style="font-weight: 600;">price into a discovery mechanic</span>: when credits ran low, users explored cheaper unfamiliar products they'd never have clicked.</p>

<div style="width: 100%; height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Credit cap interface</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The data shaped our partnership strategy.</span> Weekdays skewed professional (Crunchbase, Grammarly, Adobe); weekends, entertainment. Spotify sold out daily — yet Spotify, Netflix, and YouTube all declined to partner, seeing us as a threat to their funnels. Hulu partnered early but didn't stay. Adobe, Grammarly, and emerging brands needing discovery said yes. The cap revealed exactly which partners Keye could win and why.</p>

<div style="width: 100%; height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Four-stage credit evolution + weekday/weekend usage chart</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Monetization followed the evidence:</span> $20/month for 200 credits, launched only once the mental model was established. Conversion improved 32% over the beta cohort. Alongside, we taught the model deliberately — persistent credit balance in the header, onboarding pop-ups, a How Keye Works page — cutting support requests 74%.</p>`
      },
      {
        id: 'features',
        title: '05 — Features Built from Signal',
        headline: 'Every feature solved friction that users had already shown us, not friction we imagined',
        content: `<p><span style="font-weight: 600;">Buy Again</span> collapsed a three-step repurchase into one tap for returning users, keeping the full flow for first-timers. The friction wasn't stopping decisions — it was re-litigating ones already made.</p>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 24px; margin-bottom: 32px;">Buy Again feature</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Coming Soon + Request a Product.</span> In live testing I watched a user scroll four times looking for a product, give up, and ask me if it existed. We placed a Request card at that exact scroll depth, in the same visual unit as every product card. Requests became verified demand data for partnership pitches; partner subscriptions grew 44% YoY as that pipeline strengthened. Coming Soon gave unknown products the spotlight they couldn't generate alone.</p>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 24px; margin-bottom: 32px;">Request + Coming Soon cards</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Featured</span> deliberately mixed products we needed behavioral data on with products users had requested — research and reward in one slot. Every alternative we tested at the top of the marketplace (ads, surveys, prompts) reduced engagement: the top had one job — get users to a product fast.</p>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 24px; margin-bottom: 32px;">Featured slot</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Referrals</span> launched ahead of the winter holidays to ride natural gifting behavior and became one of our fastest-growing loops with zero paid spend.</p>

<div style="width: 100%; height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 24px; margin-bottom: 32px;">Referrals</div>`
      },
      {
        id: 'extension',
        title: '06 — The Chrome Extension: An 18-Month Problem Solved in Ten Days',
        headline: 'The breakthrough was recognizing we should live where the user already is',
        content: `<p>Users had to copy-paste credentials from Keye into partner sites. The plan was that partner integrations would solve it — but each required real engineering investment partners couldn't prioritize. Then our technical co-founder left, taking the backend capacity for a one-click login with him.</p>

<p style="margin-top: 28px;">One evening, watching Honey apply coupons contextually at checkout, I saw the answer: <span style="font-weight: 600;">live where the user already is.</span> Engineering confirmed the effort was minimal. That weekend I built a Figma prototype with a walkthrough — visit a partner site, extension detects it, offers access, auto-fills credentials — and showed it at all-hands. We shipped in under ten days.</p>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Three-frame extension flow — detection → access → auto-login</div>

<p style="margin-top: 28px;">The MVP was deliberately narrow: only purchased products, only auto-fill — validation before features. 60% of users installed within three months, login friction dropped 63%, repeat sessions rose 41%. V2 added in-extension purchasing, earned by that data rather than assumed.</p>`
      },
      {
        id: 'design-system',
        title: "07 — Design System: Built for a Team That Didn't Exist Yet",
        headline: "The true measure of the system was that users couldn't tell where my work ended and the next designer's began",
        content: `<p>I came from architecture, where everything in Revit is a parametric component — change the object, every instance updates. I treated the product card the same way from day one. It evolved from a long-description carousel card to a compact, partner-neutral frame (Otter.ai's branding feedback taught us the card should be a frame, not a canvas), and engineering's constant question — <span style="font-style: italic;">can this be a state of the existing component rather than a new one?</span> — kept us reducing instead of adding. The mature card supported eight states — browseable, active with countdown and credentials, disabled, Buy Again, Featured, Coming Soon, Leaving Soon — all derived from behavioral signals, none speculative.</p>

<div style="width: 100%; height: 500px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">One component, eight states — MVP → launch evolution</div>

<p style="margin-top: 28px;">Frontend engineering sat twelve hours away in Asia; a bug found Thursday in Seattle wasn't fixed until Friday evening — once leaving a broken sticky nav visible through a weekend of VC testing. I rebuilt my handoff practice: annotated documents, precisely named assets, pre-answered edge cases, and Saturday-morning sessions overlapping their day. That documentation discipline later became the onboarding foundation for the junior designer I hired — and the true measure of the system was that when she took over my features, users couldn't tell where my work ended and hers began.</p>`
      },
      {
        id: 'tradeoffs',
        title: '08 — Tradeoffs & Hard Calls',
        headline: 'Founding-designer roles expand to fill whatever you give them — I learned to define boundaries before the product demanded more than one person could sustainably give',
        content: `<p><span style="font-weight: 600;">The GIF decision.</span> I wanted animated characters for onboarding; engineering pushed back on performance. The resolution was research, not compromise — I brought evidence on Lottie's lightweight format, we learned it together, and the objection dissolved. Neither original position won; a better one did.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The influencer debate.</span> Marketing wanted trend-borrowed features — influencer streams, social mechanics. I reframed: Keye's users were intentional, coming to access tools, not to be entertained. Building for behavior we didn't have would distract from behavior we did. The founders agreed.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The mobile app concession.</span> I believed in a native app; founders and investors disagreed on cost grounds pre-funding. I conceded — and made the mobile web experience thorough enough that the concession cost users almost nothing.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The mid-growth rebrand.</span> Changing palette and typography while the funnel was working was a real risk. We shipped it live rather than A/B testing — and it coincided with a 34% single-month growth spike, one of our strongest periods.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What I'd do differently</span> isn't a product decision — it's role design. Founding-designer roles expand to fill whatever you give them; I learned to define boundaries around scope before the product demands more than one person can sustainably give. That lesson now shapes how I'd structure any 0→1 role.</p>`
      },
      {
        id: 'impact',
        title: '09 — Impact & Reflection',
        headline: "The most important thing a founding designer builds isn't the product — it's the foundation that lets the product grow without being rebuilt from scratch",
        content: `<p>Keye grew from three static screens to a funded, validated company during my two years as sole designer: 0 → 20K+ MAUs in under a year, 150+ products with 35+ direct partnerships, an extension shipped in ten days, and a design team built from scratch. By the company's third year the founding team had dispersed; the remaining founder took the company into YC W2024 and pivoted to financial analytics. The marketplace didn't survive the pivot — but the research, the partnerships, and the funding that made YC possible came from the product we built.</p>

<p style="margin-top: 48px; font-weight: 600;">What mattered more than expected</p>

<p style="margin-top: 16px;">The credit cap wasn't valuable because it monetized the product. It was valuable because it generated the behavioral data that shaped the entire partnership strategy. Constraints aren't always about user experience — sometimes they create the conditions for a product to learn.</p>

<p style="margin-top: 28px;">Keye compressed the feedback loop between design decision and consequence from months to days, and taught me to treat every decision as a hypothesis. The ones confirmed without testing are the ones that break in production.</p>

<div class="pull-quote" style="margin-top: 48px;">Constraints aren't always about user experience — sometimes they create the conditions for a product to learn.</div>`
      },
    ]
  },
  lat: {
    title: 'LAT',
    subtitle: 'Lifecycle Assessment Tracker',
    description: 'Turning fragmented campus maintenance into a trusted financial decision system',
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
        content: `<p><span style="font-weight: 600;">Product</span><br/>An ML-driven platform that helped a major Pacific Northwest university manage 60–80+ buildings across three campuses. LAT shipped as a modular API layer alongside their legacy CMMS/ERP — turning fragmented operational data into financial intelligence without forcing a system replacement.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My Role — Lead Product Designer</span><br/>I owned product vision, workflows, and the design system. Led alignment across field technicians, project managers, accountants, and executives. Because the PM was non-technical, I translated institutional needs into functional requirements and made the case for field research when stakeholders wanted to skip it.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline — 8 months</span><br/>Discovery → data consolidation → ML framework → pilot → beta → release. The platform continued beyond my tenure.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Team</span><br/>1 PM · 1 designer (me) · 2 external engineers · client-side CAPEX, data science, accounting, and property management teams</p>

<div style="width: 100%; min-height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Hero — role-based dashboard split: the same asset rendered for a technician (mobile, offline-first), a manager (priority queue), and an executive (filtered summary). One data model, three cognitive surfaces.</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Impact</span></p>

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

<p style="font-size: 14px; color: #6B7280;">Adoption, data accuracy, and reporting time are the numbers I'm most confident in — they were directly observed. The cost figures came from the platform's own forecasting layer, so I hold them more loosely and say so when asked.</p>`
      },
      {
        id: 'context-problem',
        title: '02 — Context & Problem',
        headline: 'Fragmented data was forcing humans to do the work a system should have done',
        content: `<p>Universities manage billions in infrastructure with fragmented tools. A technician underground can't access repair history. A project manager stitches together spreadsheets, vendor calls, and invoices before capital planning meetings. Leadership makes decisions on partial data.</p>

<img src="/images/lat/User%20Issues.webp" alt="User Issues" style="width: 100%; border-radius: 8px; margin-top: 32px; margin-bottom: 32px; display: block;" />

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
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

<p style="margin-top: 48px;"><span style="font-weight: 600;">Why existing tools failed</span></p>

<p style="margin-top: 20px;">CMMS platforms handle tickets and leases but don't model asset lifespan or portfolio-level CapEx tradeoffs. Preventive maintenance ran on time-based schedules, not risk — producing over-maintenance and surprise failures. Field tools assumed stable connectivity; when digital reporting is slower than paper, adoption fails. And replacing the legacy stack wasn't viable — it was wired into procurement, accounting, and budgeting. They didn't need another silo; they needed a layer that worked with what existed.</p>

<img src="/images/lat/Market%20Gap.webp" alt="Market Gap Analysis" style="width: 100%; border-radius: 8px; margin-top: 40px; margin-bottom: 32px; display: block;" />`
      },
      {
        id: 'turning-point',
        title: '03 — The Turning Point',
        headline: 'Research revealed we were redesigning a system of coordination',
        content: `<p>We thought we were customizing a product. Research showed we were redesigning <span style="font-weight: 600;">a system of coordination.</span></p>

<p style="margin-top: 28px;">The breakthrough wasn't the AI. It was recognizing that fragmented data was forcing humans to do system work. Everyone had access to data. What they lacked was context, prioritization, and trust.</p>

<p style="margin-top: 28px;">That reframed everything. Instead of one dashboard for everyone, we built role-based surfaces over a shared foundation — surfacing only what was actionable, turning operational signals into financial intelligence.</p>

<img src="/images/lat/pROBLEM.webp" alt="System architecture diagram — modular API layer, role-based surfaces, shared data foundation" style="width: 100%; border-radius: 8px; margin-top: 32px; margin-bottom: 32px; display: block;" />`
      },
      {
        id: 'constraints',
        title: '04 — Constraints & Design Responses',
        headline: "The legacy ecosystem couldn't be disrupted, so LAT shipped as a modular layer alongside it",
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Legacy Ecosystem Couldn't Be Disrupted</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">LAT shipped as a modular API layer alongside existing CMMS/ERP stack — no forced migration, no workflow replacement. Incremental transparency without triggering organizational resistance.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Data Integrity Had Hard Boundaries</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">University enforced strict governance; we inherited duplicated, inconsistent records. This constraint produced the defining incident of the project (§07). The response — validation states, multi-signal checks, confidence tiers — became the product's trust architecture.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Capital Decisions Were Political</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Layered approvals, public accountability, donor influence. In that environment automation isn't neutral — it's political. We kept managers as approval gatekeepers, made AI show its reasoning (not just scores), and logged every override.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 48px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Approval Workflow</div>
    <div style="font-size: 13px; line-height: 1.5;">Manager review gates → AI reasoning display → Override logging<br/>Shows human-in-the-loop design</div>
  </div>
</div>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Roles Had Wildly Different Needs</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians wanted to finish on site and go home — voice-to-text, big touch targets, no forms designed for a desk. Managers ran 15 jobs a day and needed delegation, not dashboards. Accountants managed 20–30 stakeholders and needed brief-with-drill-down. Executives needed two options, not a back-study. Role-based surfaces over one universal view.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Field Reality: Connectivity & Devices</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians worked underground and on swing stages with unstable connections. We shipped offline-first capture with queued auto-sync, and staged phone-first refinement to a later phase — a real tradeoff, since field users wanted it sooner, but organizational trust had to come first.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Eight Months Forced Scope Discipline</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">AI auto-scheduling, deep ESG modeling, digital twins, and a live multi-campus map were all tempting. The filter: one north star (reduce unexpected maintenance costs) plus two supporting drivers (planning accuracy and adoption velocity). If a feature didn't serve one of the three, it moved to the roadmap. The sequence: data unification → offline field workflows → lifecycle visibility → predictive modeling → scenario simulation. AI credibility depends on data quality.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 32px;">
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

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 40px; margin-bottom: 48px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Trust Precedes Automation</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">AI as decision support, not authority. Human approval gates, logged overrides, confidence-aware outputs.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Adoption Before Expansion</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Offline workflows and repair clarity first. AI auto-scheduling and ESG modules second.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Data Integrity Before AI</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Stabilized data foundation first, predictive sophistication second.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Reduce Cognitive Load</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Role-tailored surfaces surfacing signals, not noise.</div>
  </div>
</div>

<div style="background-color: #F9FAFB; padding: 28px; border-radius: 12px; border-left: 3px solid #7EB3F5;">
  <div style="font-weight: 600; font-size: 16px; color: #1C1917; margin-bottom: 12px;">Platform Thinking</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">The predictive engine improves as override data accumulates. More campuses → more lifecycle data → smarter predictions → higher switching cost. LAT compounds intelligence through use.</div>
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

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 48px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 1: Field Workflow Evolution</div>
    <div style="font-size: 13px; line-height: 1.5;">Mobile interface showing: offline queue → capture with voice input → auto-sync confirmation<br/>Annotation: "Reporting time: 20min → 8min"</div>
  </div>
</div>

<div style="background-color: #FFF9F5; padding: 24px; border-radius: 12px; border-left: 3px solid #FF6B35; margin-bottom: 48px;">
  <div style="font-weight: 600; font-size: 15px; color: #1C1917; margin-bottom: 12px;">The "Everything Dashboard" Failed</div>
  <p style="font-size: 15px; color: #57534E; line-height: 1.6; margin: 0;">Multiple graphs looked impressive; managers scanned without acting. We replaced it with a ranked priority queue — action first, analysis second.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 64px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 2: Dashboard Before/After</div>
    <div style="font-size: 13px; line-height: 1.5;">Left: Dense "Everything Dashboard" with 8+ graphs<br/>Right: Clean priority queue with contextual side panels<br/>Annotation: "Decision time: 14min → 4min"</div>
  </div>
</div>

<div style="margin-bottom: 48px;">
  <div style="font-size: 20px; font-weight: 600; color: #1C1917; margin-bottom: 16px;">Pillar 2 — Predictive Lifecycle Intelligence</div>
  <p>Turn predictive signals into ranked, decision-oriented alerts. Early alerts said <span style="font-style: italic;">"Boiler failure risk: 68%."</span> Managers hesitated. We shifted to consequence framing: <span style="font-style: italic;">"High vibration + 9 years in service → delaying replacement may cost $18K."</span></p>
  <p style="margin-top: 16px; color: #57534E;">Humans act on consequences, not probabilities.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 48px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 3: Alert Card Before/After ⭐</div>
    <div style="font-size: 13px; line-height: 1.5;">Left: "Boiler failure risk: 68%" (probability framing)<br/>Right: "High vibration + 9yr service → $18K savings if replaced now" (consequence framing)<br/>Shows: Critical/Monitor/Safe tiers + top 3 drivers</div>
  </div>
</div>

<div style="background-color: #FFF9F5; padding: 24px; border-radius: 12px; border-left: 3px solid #FF6B35; margin-bottom: 32px;">
  <div style="font-weight: 600; font-size: 15px; color: #1C1917; margin-bottom: 12px;">The Boiler Incident — When AI Was Wrong</div>
  <p style="font-size: 15px; color: #57534E; line-height: 1.6; margin: 0;">Month 2: Engine flagged a $180K boiler replacement as Critical. Inspection showed duplicated repair entries inflated the risk. Three guardrails contained it: manager review gate, visible drivers (manager spotted duplicates), no auto-procurement. We added "Needs Verification" state and multi-signal validation. Adoption held at 95%.</p>
</div>

<div class="pull-quote">The real AI risk in enterprise isn't model sophistication — it's dirty upstream data influencing downstream capital decisions.</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 64px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE 4: Boiler Incident Screen</div>
    <div style="font-size: 13px; line-height: 1.5;">Critical alert showing visible contributing drivers (with duplicate entries highlighted)<br/>"Needs Verification" state badge<br/>Manager override logged in timeline</div>
  </div>
</div>

<div style="margin-bottom: 32px;">
  <div style="font-size: 20px; font-weight: 600; color: #1C1917; margin-bottom: 16px;">Pillar 3 — Strategic Simulation & Governance</div>
  <p>In-house scenario comparison with side-by-side cost/timeline deltas. Before LAT, feasibility questions meant commissioning external studies. After, teams ran three scenarios instantly and exported board-ready outputs.</p>
  <p style="margin-top: 16px; color: #57534E;">Decision velocity over spectacle.</p>
</div>

<div style="width: 100%; height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 32px;">
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
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Automation vs. Trust</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">The engine could have auto-escalated failures and auto-scheduled maintenance. We chose human-in-the-loop. Result: 95% adoption, override frequency falling over time. Pushing automation early would have collapsed adoption after the first visible mistake.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Signal Richness vs. Decision Speed</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Engineering wanted 10+ predictive inputs visible per asset. Testing showed the opposite: users focused on risk, time-to-impact, and cost. Everything else created hesitation. We showed the top drivers and moved depth to drill-down.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Transparency vs. Organizational Comfort</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Some stakeholders wanted curated weekly summaries. Real-time visibility exposed inefficiencies and shifted narrative control. I pushed for role-based dashboards with threshold-based notifications. Meetings became strategic, not status-driven.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">AI Expansion vs. Data Integrity</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">After early results, there was momentum to widen predictive coverage fast. We slowed it — validation states, inventory checks, override logging first. Data accuracy: 70% → 95%.</div>
  </div>
</div>

<img src="/images/lat/AB%20Testing.webp" alt="AB Testing comparison showing simplified vs detailed alert views" style="width: 100%; border-radius: 8px; margin-bottom: 48px; display: block;" />

<div class="pull-quote">The failure mode is never the UI. It's adoption, trust, and behavior — once those break, the metrics follow.</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">
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
        content: `<p><span style="font-weight: 600;">Operational.</span> Linking work orders to lifecycle cost made repair history visible in real time. Managers started reviewing repair frequency before approving repeat fixes. Reporting per ticket: 20min → 8min. Emergency incidents: ↓12%. Projected cost reduction: 25%.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Decision-making.</span> Teams stopped entering meetings to reconcile facts and started entering them to decide. Budget revisions: ↓36%. Planning time: ↓60%. Pilot adoption: 95% (vs. 70% benchmark).</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Strategic.</span> Scenario simulation moved feasibility analysis in-house (↓4% consultant spend). Generated expansion interest from other universities — signaling a path from consulting project to scalable platform.</p>

<div class="pull-quote" style="margin-top: 48px;">The biggest change wasn't cost savings. It was decision confidence.</div>`
      },
      {
        id: 'reflection',
        title: '09 — Reflection',
        headline: "Clarity drove action more than completeness — users didn't want more data, they wanted less to think about",
        content: `<p><span style="font-weight: 600;">What I got wrong.</span> I thought predictive accuracy would drive adoption. It didn't. Data integrity and clarity mattered more. Strong predictions failed when the underlying data was messy or the framing was hard to act on. Next time: run a data audit before any predictive expansion, and lead with consequence framing from day one.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What mattered more than expected.</span> The lifecycle linkage, not the AI. Once work orders, asset history, and cost-over-time were reliably connected, decision-making improved before the predictive layer even matured.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The design lesson.</span> Users didn't want more data — they wanted less to think about. Clarity drove action more than completeness. Sophistication doesn't build trust; clarity does.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What I learned about AI in enterprise.</span> Adoption depends less on model sophistication than on trust architecture: visible reasoning, human control, confidence-aware outputs, failure containment designed in from the start. One wrong high-visibility alert can undo months of adoption. Design for the failure, not the demo.</p>`
      },
    ]
  },
  'misinformation-center': {
    title: 'Misinformation Center',
    subtitle: 'Media Literacy Tools for the AI Age',
    description: 'University of Washington graduate capstone · Research collaboration with TrueMedia.org',
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
        content: `<p>Misinformation spreads faster than most people can verify it. It shapes health decisions, voting behavior, and how much people trust anything they read. Platforms have attempted interventions — and those efforts are routinely met with distrust and accusations of bias.</p>

<p style="margin-top: 28px;">This capstone started from a different question: instead of controlling content for users, how might we equip people with the literacy and tools to identify misinformation themselves?</p>

<p style="margin-top: 28px;">The design philosophy — <span style="font-weight: 600;">agency over authority.</span> People resist being told what's true. They respond better when given tools to decide for themselves and shown why something is flagged. The goal wasn't another fact-check label. It was tools that help people pause, verify, and learn — folded into small daily habits rather than assigned as homework.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"She took us along on her journey of learning from users as she went."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<div style="width: 100%; min-height: 500px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 48px; margin-bottom: 32px;">Hero — the four features as a connected system on one screen, in final visual polish</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role — sole designer.</span> This was my graduate capstone at the University of Washington, January–July 2024, refined through late 2024. The project began as a team of four during initial research; after the team split into individual directions in early February, the product, design, and direction were entirely my own. I conducted the research, defined the archetypes, designed all four features, built the visual system, and tested the work at scale.</p>

<p style="margin-top: 28px;">From late March to May I collaborated with TrueMedia.org, a deepfake-detection nonprofit founded by Oren Etzioni, contributing user research and market assessment that informed their product direction. The collaboration was research-based, conducted through UW's Center for an Informed Public; TrueMedia built their own product with their in-house team, and no design assets were shared between the projects. Everything shown here is my own work — and what I learned from their market reality reshaped how I think about this entire product category (§06).</p>

<div style="margin-top: 40px; margin-bottom: 40px;">
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 16px 0; font-weight: 600; width: 35%;">Feature</td>
      <td style="padding: 16px 0; font-weight: 600;">Purpose</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 16px 0;">Search & Image Search</td>
      <td style="padding: 16px 0;">Verify links, headlines, and images with layered credibility ratings</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 16px 0;">Scan</td>
      <td style="padding: 16px 0;">Camera-based verification for printed content — flyers, newspapers, ads</td>
    </tr>
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 16px 0;">Literacy Quiz</td>
      <td style="padding: 16px 0;">A level-based game teaching users to spot manipulated content</td>
    </tr>
    <tr>
      <td style="padding: 16px 0;">Ask Us</td>
      <td style="padding: 16px 0;">Human-backed fact-checking for gray-area content algorithms miss</td>
    </tr>
  </table>
</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Testing</span> — ~1,800 participants at Misinfo Day (April 2024), co-hosted with UW's Center for an Informed Public, plus two interview phases, a 2,000-respondent discovery survey, and moderated usability rounds.</p>`
      },
      {
        id: 'problem',
        title: '02 — The Problem',
        headline: 'After AI, the same problem arrived at a different scale — believability and volume in a fragile ecosystem',
        content: `<p>Before AI, misinformation was a human psychology problem. It thrived on speed, virality, and how people process information under social pressure — vaccine myths eroding trust in science, election conspiracies driving polarization, doctored disaster images misallocating resources, everyday scams creating "everything feels fake" fatigue. The common thread was never the content. It was the exploitation of human bias: believe what confirms your views, trust what feels familiar, share before verifying.</p>

<p style="margin-top: 28px;">After AI, the same problem arrived at a different scale. Generative AI added believability and volume to a fragile ecosystem — while platform incentives still favored engagement over accuracy, and misinformation drives engagement.</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 100px; margin-top: 60px;">
  <div>
    <div style="width: 100%; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 24px;">Image placeholder</div>
    <p style="margin-top: 0;"><span style="font-weight: 600;">What the discovery survey showed</span></p>
    <p style="margin-top: 12px;">(n = 2,000): 74% encountered misinformation weekly. 62% of parents aged 25–40 felt overwhelmed by having to educate their kids about false content. 41% of seniors admitted unknowingly sharing misinformation at least once. And fewer than 20% trusted existing fact-checking platforms — too slow, too technical, too detached from where they actually consume information. Users didn't just want the truth. They wanted peace of mind.</p>
  </div>

  <div>
    <div style="width: 100%; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 24px;">Image placeholder</div>
    <p style="margin-top: 0;"><span style="font-weight: 600;">The generational sandwich.</span></p>
    <p style="margin-top: 12px;">The most surprising interview finding wasn't about technology. Young mothers were educating their children about misinformation while simultaneously managing elderly parents who were the primary victims of scams — fielding chain messages from relatives who trusted everything they received, exhausted by filtering manipulative media on behalf of two generations at once. This wasn't an edge case; it was a consistent pattern that fundamentally shaped the archetypes.</p>
  </div>

  <div>
    <div style="width: 100%; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 24px;">Image placeholder</div>
    <p style="margin-top: 0;"><span style="font-weight: 600;">The transparency demand.</span></p>
    <p style="margin-top: 12px;">Multiple participants independently said that when they hit suspicious content, they wanted to know who was paying for it — not just whether it was true, but what agenda sat behind it. One participant put it precisely: media portrayed San Francisco as a hellscape while she lived there experiencing something completely different. She didn't want a fact-check label. She wanted to see the incentive structure. That insight became the transparency principle running through every feature.</p>
  </div>

  <div>
    <div style="width: 100%; height: 200px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 24px;">Image placeholder</div>
    <p style="margin-top: 0;"><span style="font-weight: 600;">The platform trust problem.</span></p>
    <p style="margin-top: 12px;">My first concept embedded a misinformation center inside Facebook — the platform where research showed the most misinformation spirals, so verification should live at the point of exposure. Testing with 20+ users rejected it immediately and specifically: they would not trust Facebook to tell them the truth about misinformation. The platform that spread the problem was structurally incapable of being trusted as its solution. That wasn't a UX finding — it was a product-market-fit finding, and it forced the harder question: if platform-embedded won't work, how does a standalone tool survive without a platform's distribution?</p>
  </div>
</div>

<div class="pull-quote" style="margin-top: 100px;">The platform that spread the problem was structurally incapable of being trusted as its solution.</div>`
      },
      {
        id: 'market',
        title: '03 — Market Research',
        headline: 'Verification had to live where misinformation spreads, but platform ownership destroyed trust',
        content: `<p>The existing landscape fell into two categories, and neither worked.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Monetized platforms — credible but compromised.</span> Snopes had real trust and rigor, but ran ads and operated as a business, raising editorial-independence questions users were increasingly aware of. Facebook's labels and Twitter's Community Notes had scale but were perceived as politically biased by large portions of their audiences. Platform-owned verification carried a structural credibility problem: the entity profiting from misinformation's spread can't also be trusted to flag it.</p>

<div style="width: 100%; min-height: 300px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Image placeholder</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Nonprofit resources — trustworthy but invisible.</span> Literacy initiatives had integrity and no engagement: text-heavy resources in a short-form-video era, requiring users to seek them out. Browser extensions like NewsGuard were friction-heavy and desktop-bound.</p>

<p style="margin-top: 28px;">The gap between them was exactly where users lived — people who trusted Reuters and the Guardian, wanted multiple sources rather than a single verdict, and consumed news on phones inside apps they already trusted. Every existing tool asked them to leave, open something else, and do extra work. In an environment already demanding constant attention, that friction was fatal.</p>

<p style="margin-top: 36px;"><span style="font-weight: 600;">The integration insight — the hardest question in the project.</span> Verification had to live where misinformation spreads, but platform ownership destroyed trust. I brought this to all three of my professors; none could resolve it, and they thought I was digging too deep for an academic project. The resolution came from the compass: a trusted utility embedded in trusted surfaces, backed by institutions whose independence users can verify, owned by none of the platforms it lives in. Inside Safari as a share-sheet action. Inside Apple News as a story-verification option. Inside the native camera as scan-to-verify. Not another app competing for attention — infrastructure that makes verification a natural step in what users are already doing.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Great idea to bring in UI scenarios outside of the app itself, like the lock screen widget."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<div style="width: 100%; min-height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">The integration vision — the same verification layer shown living in Safari's share sheet, Apple News, and the native camera</div>`
      },
      {
        id: 'research',
        title: '04 — User Research',
        headline: 'Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern',
        content: `<p>Methods, phased deliberately rather than repeated at different scales: a 2,000-respondent discovery survey mapping habits across demographics; 16 team-phase interviews (four each; I recruited mine independently, paying participants and recruiting across channels to avoid a biased sample); a second solo phase of 12 interviews validating early design directions; a 14-participant moderated usability round that drove the rating-system iteration (§05); and Misinfo Day — ~1,800 attendees moving through sessions on viral misinformation, deepfakes, and escape rooms, where my booth put prototypes in front of unrecruited participants from high schoolers to seniors, alongside UW faculty and the creator of the SIFT methodology.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The finding that changed the problem:</span> misinformation moves through a chain, not between strangers. It travels through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern. Adults 55–80 receive it from people they trust deeply, in communities where belonging is tied to sharing the group's narratives. Teens 13–18 encounter it through peer dynamics where sharing signals belonging, and questioning carries social cost. Adults 25–40 sit between both — the most exhausted users in the research, not because they saw more misinformation but because they managed it for multiple generations at once.</p>

<div style="width: 100%; min-height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">Image placeholder</div>

<p style="margin-top: 28px;">The archetypes emerged from the chain, not from a persona template:</p>

<p style="margin-top: 20px;"><span style="font-weight: 600;">Truth Seekers (18–30)</span> — already motivated, cross-referencing sources, wanting to be community validators rather than just skeptics.</p>

<p style="margin-top: 16px;"><span style="font-weight: 600;">Overwhelmed Guardians (25–40)</span> — desperately want verification tools; their constraint is time and cognitive load. Any added friction fails with this group regardless of quality.</p>

<p style="margin-top: 16px;"><span style="font-weight: 600;">Vulnerable Believers (55–80)</span> — trust what they receive precisely because it comes from people they know. Designing for them means meeting existing behavior, not demanding new habits.</p>

<p style="margin-top: 28px;">The strategy was specific: design primarily for the first two, because they become the human layer that protects the third. A mother who learns to verify a suspicious link becomes the person her 70-year-old parent calls before forwarding a WhatsApp message.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I loved that you used the quotes from interviews. It gave it a lot of meaning."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<div style="width: 100%; min-height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">The generational chain diagram + three archetype cards with real interview quotes</div>

<p style="margin-top: 36px;"><span style="font-weight: 600;">What Misinfo Day revealed that recruited testing couldn't.</span> Small-scale testing shows what people say; live testing with unrecruited crowds shows what they do. Younger participants abandoned any flow that felt like reading within seconds. Older participants trusted Ask Us over automated ratings — a person's judgment over an algorithm's output. Both loved the quiz for different reasons: younger users competitively, older users because it felt like learning rather than being corrected. The parallel escape-room sessions surfaced the sharpest insight: engagement spiked when detection was framed as a skill, not a correction. People didn't want to be told they were wrong. They wanted to feel smart for getting it right.</p>`
      },
      {
        id: 'features',
        title: '05 — Features',
        headline: "The quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit",
        content: `<p>Each feature came from a specific gap the research exposed — not a feature list.</p>

<p style="margin-top: 36px; font-size: 20px; font-weight: 600;">The pivot: from Facebook to standalone</p>

<p style="margin-top: 20px;">The first iteration was a Facebook Misinformation Center — fact-check labels, community reporting, a hub in the feed. Functional wireframes, sound logic, and dead on arrival: users wouldn't trust the vector of the problem as its solution. The wireframes got a diagonal line through them and the project started over, toward something independent and institutionally backed. That reframe opened every decision that followed.</p>

<div style="width: 100%; min-height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">The crossed-out Facebook wireframes — the killed direction, shown as it was killed</div>

<p style="margin-top: 36px; font-size: 20px; font-weight: 600;">Feature 01 — Literacy Quiz</p>

<p style="margin-top: 20px;">Tutorials and explainers weren't changing behavior; testing on early "how to spot misinformation" modules showed users disengaging as if watching homework. The first quiz format — read a claim, type a response — lost users by question four. The constraint became the feature: under 40 seconds per session, one hand, something you'd pick up on a train. That produced a swipe-based True/False interaction using real social media content — a deliberate risk, because sanitized hypotheticals don't build recognition of the actual formats people encounter (in production this would need editorial oversight, which I documented explicitly). Level progression kept it a living resource, because misinformation formats never stop evolving.</p>

<div style="display: flex; gap: 24px; margin-top: 32px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I like the way you use TikTok language to create the UI experience."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 32px;">That quote captured the intent precisely: the quiz was designed in the visual register of the platforms where misinformation actually spreads, not the register of an educational tool.</p>

<p style="margin-top: 28px;">After Misinfo Day, completion states were redesigned around skill progression rather than score — "You're getting better at spotting this" outperformed a percentage. Reviewer feedback pushed one more iteration: users wanted to know why an item was false, which conflicted with the 40-second constraint. The resolution was a post-answer reveal — speed for the question, depth for the reveal, sources one tap away.</p>

<div style="width: 100%; min-height: 400px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">Quiz progression — swipe interaction, level map, and the post-answer reveal state</div>

<p style="margin-top: 36px; font-size: 20px; font-weight: 600;">Feature 02 — Search & Image Search</p>

<p style="margin-top: 20px;">Verification had to come to users, not the reverse. A unified entry point handled both links and images so users didn't have to choose a tool at the moment of uncertainty. The rating system used four states — True, Misleading, False, Satire — because the Misleading state was the most important call in the feature: most misinformation isn't false, it's selectively true and context-stripped, and a binary would validate it. In the 14-participant usability round, users loved the color-coded clarity but feared "just red/green could feel like policing truth" — they wanted the why. That produced the layered approach: a fast badge upfront, one tap to reveal sources, fact-checkers, and reasoning. Results always showed multiple sources — Reuters, AP, a fact-check org side by side — because the research said users wanted institutional backing they could verify, not a verdict.</p>

<div style="width: 100%; min-height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">Rating iteration before/after — flat color verdict vs. layered badge-plus-evidence</div>

<p style="margin-top: 36px; font-size: 20px; font-weight: 600;">Feature 03 — Scan</p>

<p style="margin-top: 20px;">Scan came from Misinfo Day rather than preceding it: what happens when the misinformation is a printed flyer, a newspaper, a poster? The offline vector was real and completely unaddressed. The camera interaction came from observing older users — they hesitated and erred on forms, but scanned instantly and confidently, a behavior already learned from restaurant QR codes. OCR converted headlines to searchable text invisibly; the experience was point-and-get-an-answer. The same four-state rating kept the system coherent across features.</p>

<div style="width: 100%; min-height: 350px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">Image placeholder</div>

<p style="margin-top: 36px; font-size: 20px; font-weight: 600;">Feature 04 — Ask Us</p>

<p style="margin-top: 20px;">Some misinformation exists in no database — private WhatsApp forwards, local rumors, freshly manipulated images. Automated systems can't catch what they've never seen, and users who distrusted platform verdicts wouldn't trust an AI verdict on emotionally charged content either. Human judgment backed by journalistic expertise was the only answer matching what users said they'd trust. Testing exposed two trust gaps: people didn't know whether a human or a machine would answer, and didn't know how long it would take. The fixes were structural — a clear response-time expectation, a Pending / Under Review / Responded status system, and after Misinfo Day, a simplification from a multi-field form to three steps, because older participants were struggling with entry. I didn't pretend to resolve the staffing economics cleanly: the feature was explicitly conceived to live inside an existing news ecosystem where moderation infrastructure already exists. (In 2026, AI would handle triage with human editors on contested content — the trust benefit at viable economics.)</p>

<p style="margin-top: 36px;">What connects all four: the quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit. None of them tell users what to think. They give users what they need to think better.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"The prototype is very well crafted… the experience looks easy and also fun."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>`
      },
      {
        id: 'truemedia',
        title: '06 — TrueMedia',
        headline: 'Detection is the expensive end of the chain — authenticating content at creation is fundamentally more efficient, but nobody profits from implementing it',
        content: `<p>TrueMedia.org at the time had a direction and a small team building deepfake detection for the 2024 election cycle — a nonprofit chasing traction and data simultaneously. Through UW's partnership structure I contributed research synthesis: what features to prioritize, what user behaviors to design for. Their product shipped later in 2024, built by their in-house team for journalists and researchers — a dark, utilitarian interface for URL-based manipulation detection. My capstone served the opposite audience: a teenager at Ballard High asking "why should I care?" Two valid solutions to adjacent problems.</p>

<p style="margin-top: 28px;">What happened to TrueMedia matters more than the collaboration itself. They analyzed 60,000+ pieces of media in under a year, launched publicly in September 2024, and shut down in January 2025 — open-sourcing the technology rather than chasing funding. Founder Oren Etzioni's closing assessment: "As a society, we are not prepared for a large-scale, concerted, generative AI attack. It did not materialize in 2024. That doesn't mean it's not coming."</p>

<p style="margin-top: 28px;">Their head of product's post-mortem reframed everything I'd assumed about this market. When TrueMedia piloted with a leading social platform, the budget allocated was strikingly modest — nothing like what enterprises spend on training data for self-driving or LLMs. The reason was structural: platforms are ambivalent about deepfake detection because deepfakes drive engagement, and community fact-checking (Notes, flagging) is nearly free and good enough for most visible cases. The genuinely unaddressed threat was personalized scams — fake emergency calls, targeted deepfakes of family members — content community verification can never reach because it never reaches a community. The scary problem wasn't the visible one.</p>

<p style="margin-top: 28px;">The second lesson: detection is the expensive end of the chain. Authenticating content at creation — watermarking, provenance — is fundamentally more efficient. C2PA proposed exactly this and has stalled: founding members disengaged, no incentives, no champions. A technically sound solution nobody implements because nobody profits from implementing it. That gap isn't a technology problem or a design problem. It's an organizational and economic one. Design can't solve it. Policy might.</p>`
      },
      {
        id: 'reflection',
        title: '07 — Reflection',
        headline: 'A designer who thinks only about what users see is a UI designer — a designer who thinks about everything required to make that experience real and sustainable is a product leader',
        content: `<p><span style="font-weight: 600;">What this project taught me that comfortable work couldn't.</span> Keye taught me to treat design decisions as hypotheses. This project taught me something harder: no matter how well-designed a product is, design alone cannot make a public good sustainable. TrueMedia was research-grounded, mission-complete, and it still closed — the design wasn't the problem; the economics were. The most important design question for any public good isn't "what should this look like." It's "what does this attach to that keeps it viable?" The compass is trusted because it has no business model — and it exists because the phone manufacturer absorbs the cost. Finding the attachment is as much a design problem as any interaction pattern. That's why the integration vision — Apple News, the share sheet, the native camera — isn't a nice-to-have in this case study. It's the sustainability answer.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">The builder mindset.</span> Coming back to school after working in the real market, my mind couldn't stay inside the boundaries of a class project. Every design decision triggered questions about moderation staffing, hosting costs, who updates the quiz when new manipulation formats emerge, who pays for all of it. My professors thought I was overcomplicating an academic exercise. I've come to see that instinct as the point: a designer who thinks only about what users see is a UI designer. A designer who thinks about everything required to make that experience real and sustainable is a product leader. This project clarified which one I intend to be.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What reviewers pushed on, and what changed.</span> The showcase feedback was strong on craft and narrative — and the critical notes mattered more. Reviewers wanted the quiz to teach the why behind each answer; that tension with the 40-second constraint produced the post-answer reveal. Two flagged visual issues — background/content contrast merging, a couple of busy screens — were fixed in the post-showcase refinement pass, along with missing back-navigation on several screens. Presenting the critique alongside the fixes is deliberate: the work improved because people pushed on it.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Demo was very well designed. Excited to see the next steps."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 48px;"><span style="font-weight: 600;">If I built this in 2026.</span> In early 2024, this product required an organization — human moderators, institutional funding, a maintenance team. By 2026, AI infrastructure collapses that requirement: AI triage with editorial guardrails for Ask Us, AI monitoring to keep quiz content current, AI-augmented synthesis on research at scale. The sustainability problem remains, but the resources needed to attack it have shrunk from a fifteen-person nonprofit to a determined individual with the right tools. The problem Etzioni warned about hasn't gone away — it's grown more urgent while consumer-level defenses have stood still. The capstone answered the design question: what should a media literacy tool look like for an everyday person. The ecosystem question — how it reaches people at scale, in a form that outlives a funding cycle — is still open.</p>

<div class="pull-quote" style="margin-top: 48px;">The capstone answered the design question: what should a media literacy tool look like for an everyday person. The ecosystem question — how it reaches people at scale, in a form that outlives a funding cycle — is still open.</div>`
      },
    ]
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
