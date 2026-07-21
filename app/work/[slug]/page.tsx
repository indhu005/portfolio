import CaseStudyLayout from '@/components/CaseStudyLayout'
import MisinfoFeaturesContent from '@/components/MisinfoFeaturesContent'
import { Metadata } from 'next'

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
        content: `<p><span style="font-weight: 600;">Product</span><br/>A credit-based marketplace giving users flexible access to premium tools — Grammarly, Adobe, Otter.ai, MasterClass, Crunchbase, and 150+ products — without long-term subscriptions. ClassPass for digital tools.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role — Founding Product Designer.</span> Keye's only designer for most of its life. When I joined: three static screens, no flows, no credit architecture, no design system. I designed every surface (web, mobile web, Chrome extension), authored PRDs, ran research and QA, contributed to VC pitches, and hired the two designers who succeeded me.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline</span> — 2 years (2021–2022): beta → credit system → marketplace expansion → extension → seed funding. After the founding team dispersed, the remaining founder took the company into YC W2024 and pivoted to financial analytics. The marketplace didn't survive the pivot — but the traction we built made YC possible.</p>

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
        content: `<p>Users created fake emails for free trials. Friend groups shared passwords. One participant paid for a VPN to access cheaper regional pricing. The market was telling us: premium tools — Grammarly at $180/year, Crunchbase at $600 — were priced for committed subscribers, not curious explorers.</p>

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
        content: `<p>My first task: the purchase flow. Founders had baked in mandatory consent and a feedback survey at checkout. Completion dropped 30% at those steps. I moved consent to signup, tested the survey in three placements. Email: 80% ignored. In-checkout: confused buyers. Post-access popup: users had just used the product and had something real to say. Drop-off fell 20% in one sprint.</p>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Checkout Before/After</div>
    <div style="font-size: 13px; line-height: 1.5;">Left: Checkout with consent + survey (30% drop-off)<br/>Right: Streamlined checkout (20% improvement)<br/>+ Price comparison card: $4.99 access vs $10.99/month subscription</div>
  </div>
</div>

<p style="margin-top: 28px;">Hardest early call: removing product descriptions. Testing showed users scanning, not reading. I led with imagery and side-by-side price comparison, pre-selecting the Keye option. Some users bought full subscriptions through Keye after seeing the comparison — behavior we hadn't designed for but kept.</p>

<div class="pull-quote" style="margin-top: 28px;">With no research budget, I worked by signal saturation: once the same friction appeared across five or six users, it was real enough to act on.</div>`
      },
      {
        id: 'credit-system',
        title: '04 — The Credit System: From Constraint to Intelligence',
        headline: 'The credit cap turned price into a discovery mechanic and shaped the entire partnership strategy',
        content: `<p>The most important design decision in Keye's history — not for how it looked, but for what it revealed.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Unlimited credits (MVP)</span> removed all friction — and all intentionality. Users activated HBO, Hulu, and Tubi the same day, exhausting access before people who actually wanted those products could reach them.</p>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Unlimited Usage Behavior</div>
    <div style="font-size: 13px; line-height: 1.5;">FullStory heatmap showing 3+ activations per user same day<br/>Timeline: HBO → Hulu → Tubi within hours</div>
  </div>
</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">A 200-credit cap</span> changed behavior immediately. The week it launched, a friend messaged me, frustrated her boyfriend had spent their credits on Hulu before she could watch HBO. Users now had a stake. The cap turned <span style="font-weight: 600;">price into a discovery mechanic</span>: when credits ran low, users explored cheaper unfamiliar products they'd never have clicked.</p>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Credit Cap Interface + Usage Chart</div>
    <div style="font-size: 13px; line-height: 1.5;">Header showing persistent credit balance (87/200)<br/>Chart: Weekday (professional tools) vs Weekend (entertainment)<br/>Discovery pattern: Low credits → explore cheaper products</div>
  </div>
</div>

<div class="pull-quote">The cap revealed exactly which partners Keye could win and why. Spotify, Netflix, YouTube declined — seeing us as a threat. Adobe, Grammarly, emerging brands said yes.</div>

<p style="margin-top: 48px;"><span style="font-weight: 600;">Monetization followed the evidence:</span> $20/month for 200 credits, launched only once the mental model was established. Conversion: +32% over beta cohort. We taught the model deliberately — credit balance in header, onboarding pop-ups, How Keye Works page. Support requests: ↓74%.</p>`
      },
      {
        id: 'features',
        title: '05 — Features Built from Signal',
        headline: 'Every feature solved friction that users had already shown us, not friction we imagined',
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 32px; margin-bottom: 48px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Buy Again</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Collapsed three-step repurchase into one tap for returning users. The friction wasn't stopping decisions — it was re-litigating ones already made.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Request a Product</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">In live testing, I watched a user scroll four times looking for a product, give up, and ask me if it existed. We placed a Request card at that exact scroll depth. Requests became verified demand data for partnership pitches. Partner subscriptions: +44% YoY.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Featured</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Mixed products we needed data on with products users requested — research and reward in one slot. Every alternative (ads, surveys, prompts) reduced engagement. The top had one job: get users to a product fast.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Referrals</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Launched ahead of winter holidays to ride natural gifting behavior. Became one of our fastest-growing loops with zero paid spend.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-bottom: 32px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Four Feature Cards</div>
    <div style="font-size: 13px; line-height: 1.5;">Buy Again (one-tap) | Request (at scroll depth) | Featured (top slot) | Referrals (gift flow)</div>
  </div>
</div>`
      },
      {
        id: 'extension',
        title: '06 — The Chrome Extension: An 18-Month Problem Solved in Ten Days',
        headline: 'The breakthrough was recognizing we should live where the user already is',
        content: `<p>Users copy-pasted credentials from Keye into partner sites. The plan: partner integrations would solve it. Reality: each required engineering investment partners couldn't prioritize. Then our technical co-founder left, taking the backend capacity with him.</p>

<p style="margin-top: 28px;">One evening, watching Honey apply coupons at checkout, I saw it: <span style="font-weight: 600;">live where the user already is.</span> Engineering confirmed the effort was minimal. That weekend I built a Figma prototype — visit partner site, extension detects it, offers access, auto-fills credentials. Showed it at all-hands. Shipped in ten days.</p>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 32px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Extension Flow (3 frames)</div>
    <div style="font-size: 13px; line-height: 1.5;">1. User visits Grammarly.com<br/>2. Extension detects site, shows access popup<br/>3. Auto-fills credentials, user logged in</div>
  </div>
</div>

<p style="margin-top: 28px;">MVP was deliberately narrow: only purchased products, only auto-fill. Validation before features. Results: 60% installed within 3 months, login friction ↓63%, repeat sessions ↑41%. V2 added in-extension purchasing, earned by that data.</p>`
      },
      {
        id: 'design-system',
        title: "07 — Design System: Built for a Team That Didn't Exist Yet",
        headline: "The true measure of the system was that users couldn't tell where my work ended and the next designer's began",
        content: `<p>I came from architecture, where everything in Revit is a parametric component — change the object, every instance updates. I treated the product card the same way. It evolved from a long-description carousel to a compact, partner-neutral frame. Otter.ai's branding feedback taught us: the card should be a frame, not a canvas. Engineering's constant question — <span style="font-style: italic;">can this be a state of the existing component rather than a new one?</span> — kept us reducing instead of adding.</p>

<p style="margin-top: 28px;">The mature card supported eight states — browseable, active (with countdown and credentials), disabled, Buy Again, Featured, Coming Soon, Leaving Soon — all derived from behavioral signals, none speculative.</p>

<div style="width: 100%; height: 500px; background-color: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 32px; margin-bottom: 48px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Product Card Evolution</div>
    <div style="font-size: 13px; line-height: 1.5;">One component, eight states shown side-by-side<br/>MVP carousel → Launch compact frame<br/>States: Browseable | Active | Disabled | Buy Again | Featured | Coming Soon | Leaving Soon</div>
  </div>
</div>

<div class="pull-quote">Frontend engineering was twelve hours away in Asia. A bug found Thursday in Seattle wasn't fixed until Friday evening — once leaving a broken sticky nav visible through a weekend of VC testing.</div>

<p style="margin-top: 48px;">I rebuilt my handoff: annotated documents, precisely named assets, pre-answered edge cases, Saturday-morning sessions overlapping their day. That discipline became the onboarding foundation for the junior designer I hired. The true measure: when she took over my features, users couldn't tell where my work ended and hers began.</p>`
      },
      {
        id: 'tradeoffs',
        title: '08 — Tradeoffs & Hard Calls',
        headline: 'Founding-designer roles expand to fill whatever you give them — I learned to define boundaries before the product demanded more than one person could sustainably give',
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 28px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The GIF Decision</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">I wanted animated characters for onboarding; engineering pushed back on performance. Resolution: I brought evidence on Lottie's lightweight format, we learned it together, objection dissolved. Neither original position won; a better one did.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Influencer Debate</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Marketing wanted influencer streams, social mechanics. I reframed: Keye's users came to access tools, not to be entertained. Building for behavior we didn't have would distract from behavior we did. Founders agreed.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Mobile App Concession</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">I believed in a native app; founders and investors disagreed on cost grounds. I conceded — and made the mobile web experience thorough enough that the concession cost users almost nothing.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Mid-Growth Rebrand</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Changing palette and typography while the funnel was working was a real risk. We shipped it live. It coincided with a 34% single-month growth spike, one of our strongest periods.</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 48px;">What I'd do differently isn't a product decision — it's role design. Founding-designer roles expand to fill whatever you give them. I learned to define boundaries before the product demands more than one person can sustainably give.</div>`
      },
      {
        id: 'impact',
        title: '09 — Impact & Reflection',
        headline: "The most important thing a founding designer builds isn't the product — it's the foundation that lets the product grow without being rebuilt from scratch",
        content: `<p>Keye grew from three static screens to a funded company during my two years: 0 → 20K+ MAUs in under a year, 150+ products with 35+ direct partnerships, an extension shipped in ten days, a design team built from scratch.</p>

<p style="margin-top: 28px;">By year three, the founding team dispersed. The remaining founder took the company into YC W2024 and pivoted to financial analytics. The marketplace didn't survive — but the research, partnerships, and funding that made YC possible came from the product we built.</p>

<div class="pull-quote" style="margin-top: 48px;">The credit cap wasn't valuable because it monetized the product. It was valuable because it generated the behavioral data that shaped the entire partnership strategy.</div>

<p style="margin-top: 48px;">Keye compressed the feedback loop between design decision and consequence from months to days. It taught me to treat every decision as a hypothesis. The ones confirmed without testing are the ones that break in production.</p>`
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
        content: `<div style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="auto" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2001.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<p>Universities manage billions in infrastructure with fragmented tools. A technician underground can't access repair history. A project manager stitches together spreadsheets, vendor calls, and invoices before capital planning meetings. Leadership makes decisions on partial data.</p>

<p style="margin-top: 28px;">Without a unified system, everyone operates in their own flow with no common path:</p>

<div style="width: 100%; max-width: 1200px; margin: 0 auto 48px; margin-top: 32px;">
  <video autoplay loop muted playsinline preload="auto" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2003.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

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
        content: `<div style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="auto" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/lat/Flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<p>We thought we were customizing a product. Research showed we were redesigning <span style="font-weight: 600;">a system of coordination.</span></p>

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
    description: 'Research collaboration with TrueMedia.org',
    heroImage: '/images/misinformation-center/Hero.png',
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
        content: `<p>Platforms try to control misinformation. Users don't trust them. This capstone asked a different question: what if we equipped people to identify misinformation themselves?</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Agency over authority.</span> People resist being told what's true. They respond better when given tools to decide for themselves. The goal wasn't another fact-check label — it was tools that help people pause, verify, and learn, folded into daily habits.</p>

<div style="display: flex; gap: 24px; margin-top: 40px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 16px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"She took us along on her journey of learning from users as she went."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role — sole designer.</span> Graduate capstone at University of Washington (Jan–July 2024). Started as a team of four; after February, the product, design, and direction were entirely mine. I ran the research, defined archetypes, designed all four features, and tested with ~1,800 people at Misinfo Day.</p>

<p style="margin-top: 28px;">From March to May, I collaborated with TrueMedia.org (deepfake-detection nonprofit) on user research and market assessment. They built their own product; no design assets were shared. What I learned from their shutdown in Jan 2025 reshaped how I think about public-good products (§06).</p>

<div style="width: 100%; max-width: 600px; margin: 48px auto;">
  <iframe style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px;" width="100%" height="800" src="https://embed.figma.com/proto/5SuxUGsaCvOVUiRdXa7uNl/Misinformation-Center?page-id=12%3A7585&node-id=20-3800&p=f&viewport=1079%2C560%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=20%3A3748&show-proto-sidebar=1&embed-host=share" allowfullscreen></iframe>
</div>

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

<p style="margin-top: 28px;"><span style="font-weight: 600;">Testing</span> — 2,000-respondent survey, two interview phases (28 participants), moderated usability (14 participants), Misinfo Day live testing (~1,800 people).</p>

<div style="width: 100%; margin-top: 48px; margin-bottom: 0;">
  <img src="/images/misinformation-center/User quote.png" alt="User quote" style="width: 100%; height: auto; border-radius: 8px; display: block;" />
</div>`
      },
      {
        id: 'problem',
        title: '02 — The Problem',
        headline: 'After AI, the same problem arrived at a different scale — believability and volume in a fragile ecosystem',
        content: `<p>Misinformation exploits human bias: believe what confirms your views, trust what feels familiar, share before verifying. After AI, the same problem arrived at a different scale — more believable, more volume, same fragile ecosystem.</p>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 40px; margin-bottom: 48px;">
  <div>
    <div style="width: 100%; min-height: 200px; background-color: #E5E7EB; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px;">Survey Results Image</div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Survey Results (n=2,000)</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">74% encountered misinformation weekly. 62% of parents (25–40) felt overwhelmed educating their kids. 41% of seniors unknowingly shared false content. <20% trusted existing fact-checkers. Users didn't just want truth — they wanted peace of mind.</div>
  </div>

  <div>
    <div style="width: 100%; min-height: 200px; background-color: #E5E7EB; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px;">Generational Sandwich Image</div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Generational Sandwich</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Young mothers educating their kids about misinformation while managing elderly parents falling for scams. Filtering manipulative media for two generations at once. This pattern shaped the entire archetype strategy.</div>
  </div>

  <div>
    <div style="width: 100%; min-height: 200px; background-color: #E5E7EB; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px;">Transparency Demand Image</div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Transparency Demand</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">When participants hit suspicious content, they wanted to know who was paying for it — not just whether it was true, but what agenda sat behind it. One user put it bluntly: "I didn't want a fact-check label. I wanted to see the incentive structure." This became the transparency principle.</div>
  </div>

  <div>
    <div style="width: 100%; min-height: 200px; background-color: #E5E7EB; border-radius: 8px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px;">Platform Trust Problem Image</div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">The Platform Trust Problem</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">My first concept: a misinformation center inside Facebook. Testing rejected it immediately. Users wouldn't trust the platform spreading the problem to solve it. That wasn't a UX finding — it was product-market-fit. It forced the harder question: how does a standalone tool survive without platform distribution?</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 100px;">The platform that spread the problem was structurally incapable of being trusted as its solution.</div>

<div style="width: 100%; max-width: 1200px; margin: 60px auto 0;">
  <video autoplay loop muted playsinline preload="auto" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/misinformationcenter/flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>`
      },
      {
        id: 'market',
        title: '03 — Market Research',
        headline: 'Verification had to live where misinformation spreads, but platform ownership destroyed trust',
        content: `<p>Existing tools fell into two categories, neither worked:</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 32px; margin-bottom: 48px;">
  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Monetized Platforms — Credible but Compromised</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Snopes had trust and rigor, but ran ads. Facebook labels and Twitter Community Notes had scale but were perceived as biased. The entity profiting from misinformation's spread can't be trusted to flag it.</div>
  </div>

  <div>
    <div style="font-weight: 600; font-size: 17px; color: #1C1917; margin-bottom: 8px;">Nonprofit Resources — Trustworthy but Invisible</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Literacy initiatives had integrity but no engagement. Text-heavy resources in a short-form-video era. Browser extensions were desktop-bound and friction-heavy.</div>
  </div>
</div>

<p>The gap: users who trusted Reuters and the Guardian, wanted multiple sources, and consumed news on phones inside apps they already trusted. Every existing tool asked them to leave, open something else, and do extra work. That friction was fatal.</p>

<div class="pull-quote" style="margin-top: 48px; margin-bottom: 48px;">Verification had to live where misinformation spreads, but platform ownership destroyed trust.</div>

<p><span style="font-weight: 600;">The integration insight.</span> I brought this paradox to my professors. None could resolve it; they thought I was digging too deep for an academic project. The answer came from the compass: a trusted utility embedded in trusted surfaces, backed by institutions users can verify, owned by none of the platforms it lives in. Safari share sheet. Apple News. Native camera. Not another app — infrastructure that makes verification a natural step.</p>

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
        content: `<div style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="auto" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/misinformationcenter/Flow%2001%20Misinformation.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<p><span style="font-weight: 600;">Methods:</span> 2,000-respondent survey, 28 interviews (paid, cross-channel recruitment), 14-participant usability testing, Misinfo Day with ~1,800 attendees (high schoolers to seniors, UW faculty, SIFT methodology creator).</p>

<div class="pull-quote" style="margin-top: 40px; margin-bottom: 40px;">Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern.</div>

<p><span style="font-weight: 600;">The finding that changed the problem:</span> Adults 55–80 receive misinformation from people they trust deeply. Teens 13–18 encounter it through peer dynamics where questioning carries social cost. Adults 25–40 sit between both — the most exhausted users, managing it for two generations at once.</p>

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
        content: '',
        customComponent: <MisinfoFeaturesContent />
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
