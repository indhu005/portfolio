import CaseStudyLayout from '@/components/CaseStudyLayout'
import MisinfoFeaturesContent from '@/components/MisinfoFeaturesContent'
import LatAlertToggle from '@/components/LatAlertToggle'
import LatTradeoffTable from '@/components/LatTradeoffTable'
import { Metadata } from 'next'

const caseStudies = {
  keye: {
    title: 'Keye',
    subtitle: 'Subscription Marketplace',
    description: 'From three static screens to a YC-backed company',
    heroVideo: '/videos/Keye/Keye%20hero%20cropped.mp4',
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
      impact: '0→20K MAUs | $1.5M raised | YC F24',
      skills: 'Product strategy · Design systems · User research · PRDs · Chrome extension · Credit economics',
      decisionAuthority: 'Owned: every shipped surface, the credit-cap mechanic, the product-card system, hiring the two designers who followed me. Founders owned vision and fundraising; I translated it into what shipped alongside the PM.'
    },
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/snapshot-mobile-grid-white.webp" alt="Eight screens of the Keye mobile product card system" style="width: 100%; max-width: 1040px; max-height: none; height: auto; object-fit: initial; box-shadow: none; display: block; margin: 40px auto 56px;" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';">

<p><span style="font-weight: 600;">Product</span><br/>A credit-based marketplace for flexible access to premium tools — Grammarly, Adobe, Otter.ai, MasterClass, Crunchbase, and 150+ others — without long-term subscriptions. ClassPass for digital tools.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> Founding (and for most of Keye's life, only) designer. Founders set vision and fundraising; the PM and I turned it into what shipped — I designed every surface, wrote PRDs, ran research, and hired the two designers who replaced me.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline.</span> 2 years (2021–2022): beta to credit system to marketplace to extension to seed funding. After the team dispersed, the company pivoted into YC F24 on the traction we built.</p>

<div style="background-color: #F9FAFB; padding: 24px 28px; border-radius: 0px; border-left: 3px solid #FF7C5F; margin-top: 32px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">My contribution</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">I owned the credit-system pivots that kept the product solvent as we learned from real usage, built the product-card system that scaled across every surface, and shipped the Chrome extension that cut onboarding friction by 63% in two days.</div>
</div>

<div style="background-color: #F9FAFB; padding: 24px 28px; border-radius: 0px; border-left: 3px solid #FF7C5F; margin-top: 20px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">Team leverage</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">I scoped the MVP alongside the founders from three static screens, then hired and ran point for the two designers who eventually replaced me — building design velocity the team didn't have before I joined, and didn't lose after I left, through seed funding and into YC F24.</div>
</div>

<div class="cs-laptop-mockup" style="width: 60%; margin: 120px auto 120px;">
  <div class="cs-laptop-lid">
    <div class="cs-laptop-camera"></div>
    <div class="cs-laptop-screen">
      <div class="cs-browser-chrome">
        <div class="cs-browser-dots"><span></span><span></span><span></span></div>
        <div class="cs-browser-url">🔒 unlockkeye.com</div>
      </div>
      <div class="cs-video-wrap" style="width: 100%; margin: 0; overflow: hidden;">
        <video autoplay loop muted playsinline preload="metadata" width="2304" height="1440" aria-label="Screen recording overview of the Keye product" style="display: block; width: 100%; height: auto; transform: scale(1.18); transform-origin: top center;" onloadedmetadata="this.playbackRate=0.6;" onplay="this.playbackRate=0.6;">
          <source src="/videos/Keye/Snapshot%2001%20video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
      </div>
    </div>
  </div>
  <div class="cs-laptop-hinge"></div>
  <div class="cs-laptop-base"><div class="cs-laptop-notch"></div></div>
</div>

<h4 class="case-study-subhead">Impact</h4>

<div class="metrics-grid metrics-grid--dark" style="margin-bottom: 48px;">
  <div class="metrics-cell metrics-cell--hero">
    <div class="metrics-num">0 → 20K+</div>
    <div class="metrics-label">Monthly active users in under 12 months</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+45%</div>
    <div class="metrics-label">Engagement, within 3 months</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+32%</div>
    <div class="metrics-label">Trial-to-paid conversion post monetization</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">150+ / 35+</div>
    <div class="metrics-label">Products · direct partnerships incl. Adobe, Grammarly, Otter.ai</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">+44%</div>
    <div class="metrics-label">Partner subscriptions, year over year</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">60%</div>
    <div class="metrics-label">Extension adoption, within 3 months</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">−63%</div>
    <div class="metrics-label">Login friction, via auto-login</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-funding">
    <span>$1.5M pre-seed</span><span class="metrics-sep">·</span>
    <span>$30K in grants &amp; competition wins</span><span class="metrics-sep">·</span>
    <span>Featured in Forbes, BulletPitch, UPenn Venture Lab</span><span class="metrics-sep">·</span>
    <span>Accepted to YC F24</span>
  </div>
</div>

<p style="font-size: 14px; color: #6B7280;">Engagement = weekly active users as a share of total registered users, tracked in product analytics. Trial-to-paid and extension adoption are measured the same way — share of eligible users converting within the stated window.</p>`
      },
      {
        id: 'context-problem',
        title: '02 — The Problem',
        headline: 'People were faking emails, sharing passwords, even paying for VPNs just to try a tool before committing to it',
        content: `<p>Users created fake emails for free trials, shared passwords in friend groups, even paid for a VPN for cheaper regional pricing. Premium tools were priced for committed subscribers, not curious explorers.</p>

<div class="cs-video-wrap" style="width: 100%; max-width: 960px; margin: 40px auto 40px; position: relative; overflow: hidden; aspect-ratio: 2304 / 432;">
  <video autoplay loop muted playsinline preload="metadata" width="2304" height="1440" aria-label="Screen recording of the Keye paywall" style="position: absolute; top: 0; left: 0; width: 100%; height: auto; transform: translateY(-70%); border-radius: 0px;">
    <source src="/videos/Keye/Paywall%20video.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 0px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"I keep creating new email accounts to get free trials. It's the only way to try things without committing."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>

<div style="display: flex; gap: 32px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap; align-items: center;">
  <div style="flex: 1; min-width: 280px; background-color: #F9FAFB; padding: 20px; border: 1px solid #E7E5E4;">
    <img loading="lazy" decoding="async" src="/images/keye/Sharing%20Subscription.jpg" alt="Screenshots of real group chat conversations across UPenn — students splitting and sharing subscription costs for MasterClass, Crunchbase, and Grammarly" style="width: 80%; max-width: 320px; margin: 0 auto; border-radius: 0px; display: block;" />
    <div style="font-size: 13px; color: #9CA3AF; margin-top: 12px; text-align: center;">Snippets from real conversations across UPenn.</div>
  </div>
  <div style="flex: 1; min-width: 280px;">
    <p>This wasn't rare. Group chats across campus were full of people splitting subscriptions, hunting for discount codes, asking if anyone had a shared login. The behavior already existed — Keye just gave it a legitimate home.</p>
  </div>
</div>

<p style="margin-top: 48px;">ClassPass proved flexible multi-provider access worked; Apple One bundled someone else's services. Neither filled the gap between free trial and full subscription — that gap was Keye's opportunity.</p>

<p style="margin-top: 28px;">The friction ran both directions. Users wanted to sample tools without committing; the tools themselves — especially the lesser-known ones without Grammarly-level brand pull — had no cheap way to get in front of people who'd never heard of them. A subscription funnel favors whoever's already trusted. Keye's credit system gave both sides a lower-cost way in: users got trial access without the VPN-and-fake-email workaround, and smaller tools got discovery they couldn't buy through a normal subscription paywall.</p>`
      },
      {
        id: 'started',
        title: '03 — Evidence Over Instinct',
        headline: "The founders were moving fast on instinct. I slowed things down just enough to check if the instinct was right",
        content: `<p>My first task was the purchase flow. Founders had baked in mandatory consent and a feedback survey at checkout — completion dropped 30% there. I moved consent to signup and tested the survey in three placements; only the post-access popup worked, because users had just used the product. Drop-off fell 20% in one sprint.</p>

<div class="cs-changelog">
  <div class="cs-changelog-row">
    <div class="cs-changelog-v">V1</div>
    <div class="cs-changelog-body">
      <img class="cs-changelog-zoomable" loading="lazy" decoding="async" width="1400" height="855" src="/images/keye/section-03-v1.webp" alt="Survey V1 — embedded directly in the purchase flow" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
      <p>Embedded directly in the purchase flow, shown before confirming access.</p>
      <p class="cs-changelog-signal">Signal: users were confused by the mandatory survey — drop-off hit 50%, and it drove a spike in customer service requests.</p>
    </div>
  </div>
  <div class="cs-changelog-row">
    <div class="cs-changelog-v">V2</div>
    <div class="cs-changelog-body">
      <img class="cs-changelog-zoomable" loading="lazy" decoding="async" width="1400" height="855" src="/images/keye/section-03-v2.webp" alt="Survey V2 — reframed as Step 3 of a numbered checkout flow" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
      <p>Reframed as Step 3 of a numbered checkout sequence.</p>
      <p class="cs-changelog-signal">Signal: only moved the needle 2–3% — founders wanted this data organically, but it was still a barrier to funnel growth.</p>
    </div>
  </div>
  <div class="cs-changelog-row">
    <div class="cs-changelog-v">V3</div>
    <div class="cs-changelog-body">
      <img class="cs-changelog-zoomable" loading="lazy" decoding="async" width="1400" height="855" src="/images/keye/section-03-v3.webp" alt="Survey V3 — rebuilt as its own page, shown right after product use" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
      <p>Rebuilt as its own page, shown right after the product was used.</p>
      <p class="cs-changelog-signal">Signal: consent moved to signup instead of repeating at every purchase — drop-off fell sharply once it stopped feeling repetitive.</p>
    </div>
  </div>
  <div class="cs-changelog-row">
    <div class="cs-changelog-v">V4</div>
    <div class="cs-changelog-body">
      <img class="cs-changelog-zoomable" loading="lazy" decoding="async" width="1400" height="855" src="/images/keye/section-03-v4.webp" alt="Survey V4 — folded back into the app as an in-context modal, the version that shipped" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
      <p>Folded back into the app as an in-context modal — the version that shipped.</p>
      <p class="cs-changelog-signal">Signal: the final version.</p>
    </div>
  </div>
</div>

<div id="cs-lightbox" class="cs-lightbox" onclick="this.style.display='none';">
  <button type="button" class="cs-lightbox-close" aria-label="Close" onclick="event.stopPropagation();document.getElementById('cs-lightbox').style.display='none';">✕</button>
  <img id="cs-lightbox-img" src="" alt="" onclick="event.stopPropagation();" />
</div>

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
</div>

<div id="credit-system" class="feature-block">
  <div class="feature-eyebrow">Feature 01</div>
  <h4 class="feature-heading">The Credit System</h4>
  <p class="feature-subheadline">Five pricing models, ten months</p>

  <p>Founders needed monetization before runway ran out — that direction was theirs. My role was testing each model against real usage and feeding what we learned back into the next one, together.</p>
  <p>The through-line: <b>price as a discovery lever</b> as much as a revenue one — every version a step closer to what made users try something they wouldn't have picked on their own.</p>

  <div class="feature-eyebrow" style="margin-top: 64px;">The mechanism</div>
  <h4 class="feature-heading">Why a cap creates discovery, not just a limit</h4>

  <div class="cs-mechanism-row" style="margin: 32px 0 88px;">
    <div class="cs-mechanism-cell">
      <div class="cs-mechanism-label">Uncapped</div>
      <div class="cs-mechanism-body">Spend freely on the brand you already trust — no reason to try anything else</div>
    </div>
    <div class="cs-mechanism-arrow">→</div>
    <div class="cs-mechanism-cell cs-mechanism-cell--dark">
      <div class="cs-mechanism-label">200 credits / mo</div>
      <div class="cs-mechanism-body">Budget runs out before habit does — every credit gets weighed</div>
    </div>
    <div class="cs-mechanism-arrow">→</div>
    <div class="cs-mechanism-cell">
      <div class="cs-mechanism-label">Result</div>
      <div class="cs-mechanism-body">Lesser-known products get tried because price, not preference, is the deciding factor</div>
    </div>
  </div>

  <div class="cs-credit-slider">
    <div class="cs-credit-slider-hint">Drag the slider to change the monthly credit budget</div>
    <div class="cs-credit-slider-inner">
      <div class="cs-credit-slider-labels">
        <span>Unlimited</span>
        <span>200 / mo</span>
      </div>
      <input type="range" min="0" max="100" value="0" class="cs-credit-slider-input" aria-label="Monthly credit budget, from unlimited to 200" oninput="var w=this.closest('.cs-credit-slider');var pct=(1.5+(this.value/100)*31);var tried=Math.round((pct/100)*24);var dots=w.querySelectorAll('.cs-credit-dot');for(var i=0;i<dots.length;i++){dots[i].style.backgroundColor=i<tried?'#1C1917':'#E7E5E4';}w.querySelector('.cs-credit-badge').textContent=pct.toFixed(1)+'% trying a product they would not have picked on their own';w.querySelector('.cs-credit-slider-value-num').textContent=this.value==0?'Unlimited':(this.value==100?'200':(Math.round(200+(1-this.value/100)*800)));" />
      <div class="cs-credit-slider-value">Budget: <b class="cs-credit-slider-value-num" style="color: #1C1917;">Unlimited</b> credits</div>
    </div>
    <div class="cs-credit-dots">
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
        <div class="cs-credit-dot"></div>
    </div>
    <div class="cs-credit-badge-row">
      <div class="cs-credit-badge">1.5% trying a product they would not have picked on their own</div>
    </div>
  </div>

  <div class="feature-eyebrow">The five versions</div>

  <div class="cs-stage" style="margin-top: 20px;">
    <div class="cs-stage-header"><span>v1 — Free</span><span class="cs-stage-tag">Goal: prove usage</span></div>
    <img class="cs-stage-img" loading="lazy" decoding="async" src="/images/keye/credit-system-v1b.webp" alt="v1 free flow, no monetization">
    <p>No monetization at all. The goal wasn't revenue — it was proving people would use the product before asking anyone to pay for it.</p>
  </div>

  <div class="cs-stage">
    <div class="cs-stage-header"><span>v2 — 10% flat fee</span><span class="cs-stage-tag">Trigger: founders' pricing direction</span></div>
    <img class="cs-stage-img" loading="lazy" decoding="async" src="/images/keye/credit-system-v2.webp" alt="v2 flat 10% fee flow">
    <p>Founders proposed a flat commission on every purchase. Survey data pointed to something closer to 5–6% users would actually tolerate — the direction stayed theirs, but that gap is what shaped the cap that eventually shipped.</p>
    <div class="pc-considered"><b>Tension:</b>&nbsp;10% shipped despite the 5–6% signal — evidence didn't override the founders' call, it informed the next version instead.</div>
  </div>

  <div class="cs-stage">
    <div class="cs-stage-header"><span>v3 — Uncapped credits</span><span class="cs-stage-tag">Signal: heavy users cost more than they generated</span></div>
    <img class="cs-stage-img" loading="lazy" decoding="async" src="/images/keye/credit-system-v3.webp" alt="v3 uncapped credits">
    <p>Closer to what users said they'd pay — but with no ceiling, the heaviest users consumed more value than the fee recovered. Fixing that meant a cap, not a bigger fee.</p>
  </div>

  <div class="cs-stage">
    <div class="cs-stage-header"><span>v4 — 200/mo cap</span><span class="cs-stage-tag">The version that changed behavior</span></div>
    <img class="cs-stage-img" loading="lazy" decoding="async" src="/images/keye/credit-system-v4.webp" alt="v4 200 credit monthly cap">
    <p>Capping credits at 200 a month turned scarcity into a discovery mechanic: with a limited budget, users started spending on products they'd have otherwise skipped in favor of the brand they already knew.</p>
    <div class="feature-stat" style="margin: 24px 0 0;">
      <div class="feature-stat-num" style="font-size: 40px;">1–2% → 30–35%</div>
      <div class="feature-stat-label">Lesser-known product activity, six weeks after the cap shipped</div>
    </div>
  </div>

  <div class="cs-stage" style="margin-bottom: 24px;">
    <div class="cs-stage-header"><span>v5 — Tiered plans</span><span class="cs-stage-tag">Trigger: power users wanted headroom</span></div>
    <img class="cs-stage-img" loading="lazy" decoding="async" src="/images/keye/credit-system-v5.webp" alt="v5 tiered plans">
    <p>The cap worked, but it also capped the highest-intent users. Tiered plans let them buy up without loosening the scarcity effect for everyone else — same mechanic, an escape valve for the edge case.</p>
  </div>

  <div class="feature-chip-row">
    <span class="feature-chip"><b>v1</b> Free</span>
    <span class="feature-chip"><b>v2</b> 10% flat fee</span>
    <span class="feature-chip"><b>v3</b> Uncapped credits</span>
    <span class="feature-chip"><b>v4</b> 200/mo cap</span>
    <span class="feature-chip"><b>v5</b> Tiered plans</span>
  </div>

  <div class="cs-laptop-mockup" style="width: 60%; margin: 64px auto 56px;">
    <div class="cs-laptop-lid">
      <div class="cs-laptop-camera"></div>
      <div class="cs-laptop-screen">
        <div class="cs-browser-chrome">
          <div class="cs-browser-dots"><span></span><span></span><span></span></div>
          <div class="cs-browser-url">🔒 unlockkeye.com</div>
        </div>
        <div class="cs-video-wrap" style="width: 100%; margin: 0; overflow: hidden; aspect-ratio: 16 / 10;">
          <video autoplay loop muted playsinline preload="metadata" width="1620" height="1440" aria-label="Screen recording of the v4 low-credit pop-up and notification" style="display: block; width: 100%; height: auto; position: absolute; top: 0; left: 0;">
            <source src="/videos/Keye/Credit%20system%20video%20cropped.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
        </div>
      </div>
    </div>
    <div class="cs-laptop-hinge"></div>
    <div class="cs-laptop-base"><div class="cs-laptop-notch"></div></div>
  </div>

  <div class="feature-eyebrow" style="margin-top: 8px;">What the credit system delivered</div>
  <div class="pc-metrics-strip" style="margin-top: 24px;">
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">5</div><div class="feature-stat-label">pricing models shipped in ten months</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">1–2%→30–35%</div><div class="feature-stat-label">lesser-known product activity, six weeks post-cap</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">87%</div><div class="feature-stat-label">of surveyed users avoided a purchase just to skip entering payment info</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">+32%</div><div class="feature-stat-label">trial-to-paid conversion post-monetization</div></div>
  </div>

  <div class="pc-patterns">
    <div class="pc-patterns-title">Why this mattered beyond revenue</div>
    <div class="pc-patterns-item">The cap did more than monetize the product — it generated the behavioral data that shaped the entire partnership strategy, evidence that price, not brand loyalty, was the lever moving trial activity on lesser-known tools.</div>
  </div>

  <div class="pull-quote">Every version of the credit system came from testing with the founders — five models, one team, ten months of learning together.</div>
</div>

<div id="product-card" class="feature-block">
  <div class="feature-eyebrow">Feature 02</div>
  <h4 class="feature-heading">The Product Card</h4>
  <p class="feature-subheadline">Five versions, one component</p>

  <p>The product card is the only surface every Keye user touches on every visit — credits, waitlists, requests, referrals, mobile, the extension, all eventually had to live inside it. Each version carried a new funnel job: <b>browse → status → merchandising → recovery → growth → cross-platform.</b></p>

  <div class="pc-stage" style="margin-top: 40px;">
    <div class="pc-stage-label">v1 — Inherited (before I joined)</div>
    <img class="pc-crop-img" loading="lazy" decoding="async" src="/images/keye/product-card-v1-inherited.webp" alt="Three hand-built subscription cards — Headspace, Smiling Mind, Crunchbase — with a stray duplicate description line on Crunchbase">
    <div class="pc-stage-title">Three products, each card built by hand. No system behind any of them.</div>
    <p>A single job — browse, then click access — with no component behind it, so any product-wide change meant editing every card by hand (visible in Crunchbase's stray duplicate line). At three products that's invisible; at forty it's a wall. I flagged this in my interview, before I had any stake in the outcome.</p>
  </div>

  <div class="pc-stage">
    <div class="pc-stage-label">v2 — Componentized, square shape, label system</div>
    <img class="pc-crop-img" loading="lazy" decoding="async" src="/images/keye/product-card-v3-square-labels.webp" alt="Featured Products row — square cards with a Leaving Soon label and on-card credit cost badges">
    <div class="pc-stage-title">Converted the card into a true component, then squared it off to fit more per scroll: a countdown timer, a Waitlisted state, and labels for Featured, Leaving Soon, Coming Soon. Credit cost moved onto the card face.</div>
    <p><b>Impact:</b> the card became a status object, not just an ad — Featured placement drove +18% trial activity, and visible pricing pre-qualified every click.</p>
    <p>The finding worth featuring: users tried PicMonkey over Adobe once both sat on equal visual footing with visible pricing — price and placement beat brand recognition, the direct ancestor of the credit system's 1–2% → 30–35% jump.</p>
    <div class="pc-considered"><b>Considered:</b>&nbsp;a separate "My Accounts" page, and keeping the full description on the card face. Rejected both — splitting status from discovery left the grid unable to explain a purchase, and the full description fought scanning and deciding into the same space.</div>
  </div>

  <div class="pc-stage">
    <div class="pc-stage-label">v3 — Request a Product, placed in the grid</div>
    <div class="cs-laptop-mockup" style="width: 60%; margin: 44px auto 52px;">
      <div class="cs-laptop-lid">
        <div class="cs-laptop-camera"></div>
        <div class="cs-laptop-screen">
          <div class="cs-video-wrap">
            <video autoplay loop muted playsinline preload="metadata" width="1640" height="970" aria-label="Screen recording of the Request a Product card in the Coming Soon grid" style="display: block; width: 100%; height: auto;">
              <source src="/videos/Keye/Request%20a%20product%20cropped.mp4" type="video/mp4">
            </video>
            <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
          </div>
        </div>
      </div>
      <div class="cs-laptop-hinge"></div>
      <div class="cs-laptop-base"><div class="cs-laptop-notch"></div></div>
    </div>
    <div class="pc-stage-title">A Request a Product card placed directly into the grid, at the moment a search comes up empty.</div>
    <p><b>Trigger:</b> direct emails asking whether specific products were coming — a signal straight from the support inbox.</p>
    <p><b>Impact:</b> closed the one unrecoverable exit in the browse flow — 34% fewer customer-care requests, plus demand data for partner prioritization.</p>
    <div class="pc-considered"><b>Considered:</b>&nbsp;a request form in settings. Rejected — nobody fills that. In the grid, it appears at the moment of failure.</div>
  </div>

  <div class="pc-stage">
    <div class="pc-stage-label">v4 — Buy Again + Refer a Friend</div>
    <img class="pc-crop-img" loading="lazy" decoding="async" src="/images/keye/product-card-v5-buy-again.webp" alt="Featured Products row with credit balance dropdown open">
    <div class="pc-stage-title">A Buy Again card for products already used, and Refer a Friend cards woven into the grid.</div>
    <p><b>Impact:</b> the grid became a retention and growth surface — one component now serves four funnel jobs, discover through acquire.</p>
  </div>

  <div class="pc-stage" style="margin-bottom: 24px;">
    <div class="pc-stage-label">v5 — Mobile design system, reused for the Chrome extension</div>
    <img class="pc-phone-mockup" loading="lazy" decoding="async" src="/images/keye/product-card-v5-mobile-mockup.webp" alt="Mobile product card system across four screens, reused for the extension">
    <div class="pc-stage-title">Rebuilt the card as part of a proper mobile system, then reused the same components inside the Chrome extension.</div>
    <p><b>Trigger:</b> mobile had been tabled early — sustained user requests changed that.</p>
    <p><b>Impact:</b> in the extension, the card appears on the partner's own site, collapsing discovery and activation into one moment.</p>
  </div>

  <div class="feature-chip-row">
    <span class="feature-chip"><b>v1</b> No system</span>
    <span class="feature-chip"><b>v2</b> Componentized + labels</span>
    <span class="feature-chip"><b>v3</b> Request added</span>
    <span class="feature-chip"><b>v4</b> Buy Again + Refer</span>
    <span class="feature-chip"><b>v5</b> Mobile system</span>
  </div>

  <div class="feature-eyebrow" style="margin-top: 56px;">The card, annotated</div>
  <h4 class="feature-heading">What the v2–v5 system converged on</h4>

  <div class="pc-annotated-grid">
    <div class="pc-annotated-img-wrap">
      <img loading="lazy" decoding="async" src="/images/keye/product-card-annotated-card.webp" alt="Annotated Crunchbase card">
      <div class="pc-dot" style="left: 29%; top: 33%;">1</div>
      <div class="pc-dot" style="left: 85%; top: 17%;">2</div>
      <div class="pc-dot" style="left: -2%; top: 74%;">3</div>
      <div class="pc-dot" style="left: 8%; top: 99%;">4</div>
      <div class="pc-dot" style="left: 96%; top: 76%;">5</div>
    </div>
    <div class="pc-annotated-list">
      <div class="pc-annotated-item"><div class="pc-dot-inline">1</div><p><b>Media, one fixed zone.</b> A real screenshot or a brand-color lockup, sized to fit cleanly.</p></div>
      <div class="pc-annotated-item"><div class="pc-dot-inline">2</div><p><b>Favorite, top-right on the media.</b> Lives outside the status/badge slot.</p></div>
      <div class="pc-annotated-item"><div class="pc-dot-inline">3</div><p><b>Title, always bold, first line below media.</b> Holds more visual weight than the category.</p></div>
      <div class="pc-annotated-item"><div class="pc-dot-inline">4</div><p><b>Category, plain colored text.</b> The pill shape stays reserved for the clickable filter chips above the grid.</p></div>
      <div class="pc-annotated-item"><div class="pc-dot-inline">5</div><p><b>Credit cost, bottom-right, same position every card.</b> Price-informed before the click.</p></div>
    </div>
  </div>

  <p><b>One badge slot, not visible in the crop above:</b> Leaving Soon, Coming Soon, Featured, and Waitlisted never stack — one lifecycle badge at a time, and the CTA color follows it — <b>green</b> for buying access, <b>blue</b> for waitlisted, <b>coral</b> for capture-intent (Notify Me, Request), <b>black</b> for a secondary action (Access, when owned).</p>

  <div class="feature-eyebrow" style="margin-top: 48px;">What the card carried</div>
  <div class="pc-metrics-strip">
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">6 → 0</div><div class="feature-stat-label">features shipped on this one card, zero new components</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">+18%</div><div class="feature-stat-label">trial activity on Featured vs. non-featured products, four weeks</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">−34%</div><div class="feature-stat-label">customer-care requests, after Request a Product shipped in-grid</div></div>
    <div class="pc-metrics-cell"><div class="feature-stat-num" style="font-size: 30px;">4 jobs</div><div class="feature-stat-label">discover, re-engage, recover, acquire — served by v4, one component</div></div>
  </div>

  <div class="pc-patterns">
    <div class="pc-patterns-title">Three patterns across all five versions</div>
    <div class="pc-patterns-item"><b>1.</b> Every state traces back to an external trigger — an interview observation, a support inbox, sustained user pressure.</div>
    <div class="pc-patterns-item"><b>2.</b> Each version's job count grew while its visual footprint stayed flat.</div>
    <div class="pc-patterns-item"><b>3.</b> The v2 componentization decision paid for the next three versions.</div>
  </div>

  <div class="pull-quote">Getting the component right early is what let six systems ship inside one card without rebuilding it five times.</div>
</div>

<div id="extension" class="feature-block">
  <div class="feature-eyebrow">Feature 03</div>
  <h4 class="feature-heading">The Chrome Extension</h4>
  <p class="feature-subheadline">A constraint the team couldn't engineer around — until the idea came from buying a rain jacket</p>

  <div class="cs-video-wrap cs-video-wrap--narrow" style="width: 60%; margin: 32px auto 40px; background: #000000; padding: 10px;">
    <video autoplay loop muted playsinline preload="metadata" width="1101" height="755" aria-label="Screen recording of the Keye Chrome extension — install, login, and auto-fill on a partner site" style="display: block; width: 100%; height: auto;">
      <source src="/videos/Keye/Chrome%20extension%20cropped.mp4" type="video/mp4">
    </video>
    <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
  </div>

  <div class="feature-stat">
    <div class="feature-stat-num">65%</div>
    <div class="feature-stat-label">Of users on the extension by the time I left — the fix for an 18-month-old unsolved problem</div>
  </div>

  <p>Partner integrations were the founders' original plan — each partner would build against our API. Then our technical co-founder left, taking backend capacity with him, and that plan stopped being possible. Watching Honey auto-fill codes at checkout, I realized we didn't need partner engineering at all — just to live where the user already is. Prototyped in two days, shipped that week.</p>

  <div class="feature-note"><span class="feature-note-label">Constraint</span> No backend engineer left on the team after the co-founder's exit — whatever shipped next had to be entirely client-side.</div>

  <div class="feature-chip-row">
    <span class="feature-chip"><b>2 days</b> to prototype</span>
    <span class="feature-chip"><b>22%</b> install rate in 2 weeks</span>
    <span class="feature-chip"><b>−63%</b> login friction</span>
  </div>

  <div class="pull-quote">The fix wasn't a partnership we finally got — it was a pattern that already existed somewhere else.</div>

  <div class="cs-changelog">
    <div class="cs-changelog-row">
      <div class="cs-changelog-v">Before</div>
      <div class="cs-changelog-body">
        <img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/chrome-ext-killed.webp" alt="The old flow — manually copying a username and password to paste into the partner site, with the Go to headspace.com button visible at the bottom" style="max-height: 320px;" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
        <p>The screen the extension made obsolete: copy a username and password here, then paste them in on the partner's site.</p>
      </div>
    </div>
    <div class="cs-changelog-row">
      <div class="cs-changelog-v">1</div>
      <div class="cs-changelog-body">
        <img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/chrome-ext-step1.webp" alt="Install prompt — Enable Keye quick access, Add to Chrome, it's free" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
        <p>Install, prompted right on the grid — no separate onboarding flow to build or maintain.</p>
      </div>
    </div>
    <div class="cs-changelog-row">
      <div class="cs-changelog-v">2</div>
      <div class="cs-changelog-body">
        <img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/chrome-ext-step2.webp" alt="Extension panel showing Active accesses with Autofill buttons for Tubi, Headspace, and Peloton" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
        <p>Every active access, one click from Autofill — the same credential list, now living in the browser toolbar.</p>
      </div>
    </div>
    <div class="cs-changelog-row">
      <div class="cs-changelog-v">3</div>
      <div class="cs-changelog-body">
        <img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/chrome-ext-step3.webp" alt="Extension panel open on Peloton's own site, prompting Autofill for the active Keye access" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
        <p>The moment that mattered: the panel follows the user onto the partner's own site, not just Keye's.</p>
      </div>
    </div>
    <div class="cs-changelog-row">
      <div class="cs-changelog-v">Final</div>
      <div class="cs-changelog-body">
        <img class="cs-changelog-zoomable" loading="lazy" decoding="async" src="/images/keye/chrome-ext-final.webp" alt="Final shipped version — personalized 'Welcome, Nidhi!' panel with an active access grid" onclick="document.getElementById('cs-lightbox-img').src=this.src;document.getElementById('cs-lightbox-img').alt=this.alt;document.getElementById('cs-lightbox').style.display='flex';" />
        <p>The version that shipped — personalized by name, active accesses laid out as a grid instead of a list.</p>
      </div>
    </div>
  </div>
</div>`
      },
      {
        id: 'tradeoffs',
        title: '05 — Tradeoffs & Hard Calls',
        headline: 'None of these were mine to decide alone — engineering, marketing, founders, and investors each pushed back, and the product was better for it',
        content: `<p>Every hard call below was negotiated, not dictated — my job was bringing evidence into rooms where other people had the final say.</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 32px;">
  <div>
    <div class="cs-card-title">The GIF Decision</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">I wanted animated onboarding characters; engineering flagged performance. I brought evidence on Lottie's lightweight format, and a better solution won over either original position.</div>
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
        title: '06 — Impact & Reflection',
        headline: "The most important thing a founding designer builds isn't the product. It's the foundation that lets the product grow without being rebuilt from scratch",
        content: `<p>By year three, the founding team dispersed. The company pivoted into YC F24 on financial analytics — the marketplace didn't survive, but the research, partnerships, and funding that made YC possible did.</p>

<div class="pull-quote" style="margin-top: 48px;">The credit cap wasn't valuable because it monetized the product. It was valuable because it generated the behavioral data that shaped the entire partnership strategy.</div>

<p style="margin-top: 48px;">Keye compressed the feedback loop between decision and consequence from months to days — and taught me to treat every decision as a hypothesis. The ones I never tested were the ones that broke in production.</p>

<img class="keye-closing-phone" loading="lazy" decoding="async" src="/images/keye/closing-phone-mockup.webp" alt="Keye product grid on mobile">`
      },
    ]
  },
  lat: {
    title: 'LAT',
    subtitle: 'Lifecycle Assessment Tracker',
    description: 'Designing an AI-assisted maintenance system people could trust with $180K decisions',
    brief: {
      context: 'Lead designer for an ML platform helping a university manage 60–80+ buildings across three campuses.',
      constraint: 'Legacy CMMS/ERP couldn\'t be disrupted, data had hard integrity boundaries, and capital decisions were political.',
      decision: 'Shipped as a modular API layer with human-in-the-loop AI: approval gates, visible reasoning, logged overrides.',
      tradeoff: 'Chose slower, trust-building decisions over speed — the boiler incident validated staying cautious.'
    },
    tldr: {
      role: 'Lead Product Designer (60% design, 40% strategy)',
      team: '1 PM, 1 designer (me), 2 external engineers, client stakeholders',
      timeline: '12 months (Jun 2023–May 2024)',
      impact: '95% pilot adoption | 70%→95% data accuracy | 25% cost reduction projected',
      skills: 'Enterprise UX · Trust-centered AI design · Stakeholder alignment · Field research · API-first architecture',
      decisionAuthority: 'Owned: workflow design, the human-in-the-loop approval model, and the alert-framing decisions that cut override rate from 61% to 19%. Client stakeholders owned data-integrity and political constraints I had to design within.'
    },
    preSnapshotHeadline: 'Fragmented data was forcing humans to do the work a system should have done',
    preSnapshotContent: `<p style="font-size: 14px; color: #6B7280;">70–75% of operational U.S. buildings predate 2000, and no vendor sells an integrated tool for a mixed-use portfolio like a university's (<a href="https://www.eia.gov/consumption/commercial/reports/" target="_blank" rel="noopener noreferrer" style="color: #6B7280; text-decoration: underline;">EIA.gov</a>).</p>

<p style="margin-top: 28px;">A technician underground can't access repair history. A manager stitches spreadsheets before planning. Leadership decides on partial data.</p>

<img loading="lazy" decoding="async" width="2000" height="1200" src="/images/lat/User%20Issues.webp" alt="Diagram of fragmented maintenance data flow" style="width: 100%; height: auto; border-radius: 0px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<div style="display: flex; align-items: flex-start; gap: 24px; margin-top: 8px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #1C1917; padding: 24px; border-radius: 0px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #FFFFFF; font-size: 23px; font-weight: 500; margin: 0;">"I do the physical work in 30 minutes, but reporting takes another 20."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #1C1917; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #1C1917; padding: 24px; border-radius: 0px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #FFFFFF; font-size: 23px; font-weight: 500; margin: 0;">"Each year I'm choosing between urgent-now and smart-long-term with partial data."</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #1C1917; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>`,
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<div style="border: 1px dashed #D1D5DB; background-color: #FAFAF9; padding: 28px 32px; margin-bottom: 40px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">Headline result</div>
  <div style="font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: #1C1917; line-height: 1.3; margin-bottom: 16px;">Adoption cleared the client's own bar for keeping a tool alive.</div>
  <div style="font-family: 'Fraunces', serif; font-size: 40px; font-weight: 700; color: #1C1917; line-height: 1.1;">95% pilot adoption</div>
  <div style="font-size: 14px; color: #6B7280; margin-top: 10px;">vs. UW IT's 70% threshold. Data accuracy rose 70%→95% over the same period.</div>
</div>

<p><span style="font-weight: 600;">Product</span><br/>A maintenance platform helping a Pacific Northwest university manage 60–80+ buildings — a modular API layer alongside their legacy CMMS/ERP, turning fragmented data into decisions people could act on.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> Product vision, workflows, and the design system — aligning technicians, managers, accountants, and executives.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Timeline: June 2023–May 2024, 12 months</span><br/>Discovery to pilot to release, continuing beyond my tenure.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Team</span><br/>1 PM, 1 designer (me), 2 external engineers, plus client-side CAPEX and data teams</p>

<div style="background-color: #F9FAFB; padding: 24px 28px; border-radius: 0px; border-left: 3px solid #FF7C5F; margin-top: 32px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">My contribution</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">I reframed the product from a shared facilities dashboard into role-specific decision surfaces, set the approval model that let managers act on AI recommendations without blind faith, and carried the offline-first field workflow from research through pilot.</div>
</div>

<div style="width: 100%; min-height: 450px; background-color: #E5E7EB; border-radius: 0px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">Hero — one asset rendered for a technician (mobile), a manager (priority queue), and an executive (summary). One data model, three surfaces.</div>

<h4 class="case-study-subhead">Impact</h4>

<div class="metrics-grid metrics-grid--dark" style="margin-bottom: 20px;">
  <div class="metrics-cell">
    <div class="metrics-num">95%</div>
    <div class="metrics-label">Pilot adoption, vs. UW IT's 70% threshold for keeping a tool live</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">70% → 95%</div>
    <div class="metrics-label">Data accuracy, pre/post canonical ID + sync validation</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
  <div class="metrics-cell">
    <div class="metrics-num">~20 → ~8 min</div>
    <div class="metrics-label">Reporting time per ticket, pre/post offline-first workflow</div>
    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #4ADE80; margin-top: 10px;">Observed</div>
  </div>
</div>

<p style="font-size: 14px; color: #6B7280;">All three observed directly from pilot usage. Budget, incident, and planning impact appear in context in the sections below.</p>`
      },
      {
        id: 'context-problem',
        title: '02 — Context & Problem',
        headline: 'Why existing tools failed the people managing this infrastructure',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 960px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" width="1882" height="1060" aria-label="Technician, manager, and leadership working from fragmented tools" style="display: block; width: 100%; height: auto; border-radius: 0px;">
    <source src="/videos/lat/Flow%2001.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p style="font-size: 14px; color: #6B7280;">Research base: 7–8 technicians and vendors, 4 project managers, 2 accountants, 5–6 executives, and the Director of Facilities — UW Seattle's primary sponsor.</p>

<div class="pull-quote" style="margin-top: 48px;">The institution wasn't lacking expertise. It was operating without a unified source of truth.</div>

<p style="margin-top: 48px;">CMMS platforms don't model asset lifespan or CapEx tradeoffs — preventive maintenance ran on time, not risk. Replacing the stack wasn't viable, and no vendor sells the integrated version at any price.</p>

<div style="margin-top: 40px; margin-bottom: 40px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 16px;">Fragmentation, by owner</div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div style="border-left: 3px solid #E7E5E4; padding-left: 16px;">
      <div style="font-weight: 600; color: #1C1917; margin-bottom: 4px;">Field conditions</div>
      <div style="font-size: 14px; color: #57534E; line-height: 1.6;">Technicians &amp; vendors — tracked on paper or memory, rarely reached managers</div>
    </div>
    <div style="border-left: 3px solid #E7E5E4; padding-left: 16px;">
      <div style="font-weight: 600; color: #1C1917; margin-bottom: 4px;">Maintenance scheduling</div>
      <div style="font-size: 14px; color: #57534E; line-height: 1.6;">Legacy CMMS/ERP, IT-owned — ran on fixed time intervals, not real risk</div>
    </div>
    <div style="border-left: 3px solid #E7E5E4; padding-left: 16px;">
      <div style="font-weight: 600; color: #1C1917; margin-bottom: 4px;">Capital requests</div>
      <div style="font-size: 14px; color: #57534E; line-height: 1.6;">Project managers &amp; accountants — manual spreadsheets stitched before each planning cycle</div>
    </div>
    <div style="border-left: 3px solid #E7E5E4; padding-left: 16px;">
      <div style="font-weight: 600; color: #1C1917; margin-bottom: 4px;">Final approval</div>
      <div style="font-size: 14px; color: #57534E; line-height: 1.6;">Executives &amp; the Director of Facilities — decided on whatever partial data reached them</div>
    </div>
  </div>
</div>

<div style="margin-top: 48px; margin-bottom: 40px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 20px;">What the research changed</div>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <p style="font-size: 15px; line-height: 1.6; margin: 0; padding-left: 16px; border-left: 3px solid #E7E5E4;"><span style="color: #78716C;">Technicians worked underground with no signal</span> <span style="color: #FF7C5F;">→</span> <span style="color: #44403C; font-style: italic;">connectivity isn't guaranteed</span> <span style="color: #FF7C5F;">→</span> <span style="color: #1C1917; font-weight: 600;">offline-first capture with queued auto-sync</span></p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0; padding-left: 16px; border-left: 3px solid #E7E5E4;"><span style="color: #78716C;">Managers scanned 8+ graphs before acting on anything</span> <span style="color: #FF7C5F;">→</span> <span style="color: #44403C; font-style: italic;">more information wasn't producing better decisions</span> <span style="color: #FF7C5F;">→</span> <span style="color: #1C1917; font-weight: 600;">a ranked priority queue replaced the dashboard</span></p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0; padding-left: 16px; border-left: 3px solid #E7E5E4;"><span style="color: #78716C;">Managers hesitated on a "68% failure risk" alert</span> <span style="color: #FF7C5F;">→</span> <span style="color: #44403C; font-style: italic;">a probability isn't actionable, a consequence is</span> <span style="color: #FF7C5F;">→</span> <span style="color: #1C1917; font-weight: 600;">consequence framing: cost and timeframe, not confidence</span></p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0; padding-left: 16px; border-left: 3px solid #E7E5E4;"><span style="color: #78716C;">Legacy records had inherited duplicates that inflated risk scores</span> <span style="color: #FF7C5F;">→</span> <span style="color: #44403C; font-style: italic;">an AI system inherits its data's quality problems</span> <span style="color: #FF7C5F;">→</span> <span style="color: #1C1917; font-weight: 600;">a "Needs Verification" state with mandatory human approval</span></p>
  </div>
</div>

<img loading="lazy" decoding="async" width="3300" height="2400" src="/images/lat/Market%20Gap.jpg" alt="Market Gap Analysis" style="width: 100%; height: auto; border-radius: 0px; margin-top: 40px; margin-bottom: 40px; display: block;" />`
      },
      {
        id: 'solution',
        title: '03 — Solution',
        headline: 'Three decisions: prioritize what matters, explain what it costs, verify before it acts',
        content: '',
        customComponent: (
          <div>
            <p style={{ fontSize: '15px', color: '#44403C', maxWidth: '680px', marginBottom: '56px' }}>Research showed the problem wasn't a lack of data — it was that each role had to translate raw numbers into a decision themselves. So the system did three things: <span style={{ fontWeight: 600 }}>prioritize</span> what needed attention, <span style={{ fontWeight: 600 }}>explain</span> what a prediction meant financially, and <span style={{ fontWeight: 600 }}>verify</span> it before it reached a budget. AI wasn't the product here — trustworthy decision-making was.</p>

            <div style={{ marginBottom: '96px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '20px' }}>One data model, three surfaces</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #E7E5E4' }}>
                <div style={{ padding: '18px 24px' }}>
                  <div style={{ fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>Technician — mobile, offline-first</div>
                  <div style={{ fontSize: '14px', color: '#57534E' }}>Field reports queue locally, voice-captured, and sync when connectivity returns</div>
                </div>
                <div style={{ textAlign: 'center', color: '#FF7C5F', fontSize: '18px', borderTop: '1px solid #E7E5E4', borderBottom: '1px solid #E7E5E4', padding: '6px' }}>↓ feeds shared data model ↓</div>
                <div style={{ padding: '18px 24px' }}>
                  <div style={{ fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>Manager — priority queue</div>
                  <div style={{ fontSize: '14px', color: '#57534E' }}>Same records, ranked by risk and consequence instead of raw graphs; approves or overrides flagged items</div>
                </div>
                <div style={{ textAlign: 'center', color: '#FF7C5F', fontSize: '18px', borderTop: '1px solid #E7E5E4', borderBottom: '1px solid #E7E5E4', padding: '6px' }}>↓ rolls up ↓</div>
                <div style={{ padding: '18px 24px' }}>
                  <div style={{ fontWeight: 600, color: '#1C1917', marginBottom: '4px' }}>Executive — summary</div>
                  <div style={{ fontSize: '14px', color: '#57534E' }}>Portfolio-level cost and risk, traceable back to the field report that drove it</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '20px' }}>Technician queue, three iterations</div>

              <p style={{ fontSize: '15px', color: '#44403C', maxWidth: '640px' }}>For field technicians, a completed action isn't complete if its update never reaches the system — so we made sync state visible on the work order itself.</p>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '24px', marginTop: '56px', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 1 230px', minWidth: '170px' }}>
                  <img loading="lazy" decoding="async" width={1206} height={2622} src="/images/lat/LAT%20Technician%20Work%20Orders%20V1.png" alt="Technician work order queue, version 1 — a long list with filter tabs and priority tags" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#A8A29E', marginTop: '16px' }}>Starting point</div>
                  <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Filtered list, tabs, priority tags</div>
                </div>

                <div style={{ flex: '0 0 100px', textAlign: 'center', marginTop: '112px' }}>
                  <div style={{ color: '#FF7C5F', fontSize: '24px' }}>→</div>
                  <div style={{ fontSize: '13px', color: '#78716C', marginTop: '10px', lineHeight: 1.5 }}>Technicians choose what to do, not which filter to use.</div>
                </div>

                <div style={{ flex: '0 1 230px', minWidth: '170px' }}>
                  <img loading="lazy" decoding="async" width={1206} height={2622} src="/images/lat/LAT%20Technician%20Work%20Orders%20V2.png" alt="Technician work order queue, version 2 — one sort control, due times, and sync state on every card" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FF7C5F', marginTop: '16px' }}>One queue, one switch</div>
                  <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Due time + sync state on every card</div>
                  <div style={{ fontSize: '13px', color: '#78716C', marginTop: '6px' }}>Technicians plan from the queue and can see their work is safe.</div>
                </div>

                <div style={{ flex: '0 0 100px', textAlign: 'center', marginTop: '112px' }}>
                  <div style={{ color: '#FF7C5F', fontSize: '24px' }}>→</div>
                  <div style={{ fontSize: '13px', color: '#78716C', marginTop: '10px', lineHeight: 1.5 }}>One shift-level status makes failures impossible to miss.</div>
                </div>

                <div style={{ flex: '0 1 230px', minWidth: '170px' }}>
                  <img loading="lazy" decoding="async" width={1206} height={3633} src="/images/lat/LAT%20%C2%B7%20Technician%20work%20orders%20V3.png" alt="Technician work order queue, version 3 — a summary banner showing unsent changes, including the failed Roof drain job with its Retry button" style={{ width: '100%', height: 'auto', borderRadius: '0px', display: 'block' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FF7C5F', marginTop: '16px' }}>One shift, one status</div>
                  <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Banner isolates failures</div>
                  <div style={{ fontSize: '13px', color: '#78716C', marginTop: '6px' }}>One status for the shift, so a stuck update can't hide.</div>
                </div>
              </div>

              <div style={{ marginTop: '64px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '20px' }}>The card became the source of truth for the shift</div>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '40px', rowGap: '48px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 240px', maxWidth: '260px', minWidth: '200px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E4', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: '16px' }}>
                      <img loading="lazy" decoding="async" width={1086} height={306} src="/images/lat/Work%20order-2.png" alt="Work order card, base state — priority badge, title, and location" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#A8A29E', marginTop: '14px' }}>01 — Identify the work</div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Priority + job + location. Enough to recognize the task at a glance.</div>
                  </div>

                  <div style={{ flex: '1 1 240px', maxWidth: '260px', minWidth: '200px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E4', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: '16px' }}>
                      <img loading="lazy" decoding="async" width={1086} height={429} src="/images/lat/Work%20order-1.png" alt="Work order card with due and scheduled times, and sync state added" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FF7C5F', marginTop: '14px' }}>02 — Plan the work</div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Due + scheduled time. Technicians can plan without opening the job.</div>
                  </div>

                  <div style={{ flex: '1 1 240px', maxWidth: '260px', minWidth: '200px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E4', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: '16px' }}>
                      <img loading="lazy" decoding="async" width={1086} height={504} src="/images/lat/Work%20order.png" alt="Work order card with an unread update badge added" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FF7C5F', marginTop: '14px' }}>03 — Know what changed</div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Unread update. Changes are visible before they become surprises.</div>
                  </div>

                  <div style={{ flex: '1 1 240px', maxWidth: '260px', minWidth: '200px' }}>
                    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E5E4', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: '16px' }}>
                      <img loading="lazy" decoding="async" width={1086} height={669} src="/images/lat/Sync%20failed.png" alt="Work order card showing a failed sync and the Retry sync button, for the Roof drain job reassigned by Maya" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FF7C5F', marginTop: '14px' }}>04 — Know what actually happened</div>
                    <div style={{ fontSize: '13px', color: '#57534E', marginTop: '4px' }}>Sync state + retry. The technician always knows whether the update reached the system.</div>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: '#44403C', marginTop: '32px', maxWidth: '640px' }}><span style={{ fontWeight: 600 }}>A failed sync shouldn't feel like lost work.</span> We kept the update safely on-device and made recovery one tap.</p>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FF7C5F', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Decision 01</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#1C1917', marginBottom: '16px' }}>Replace the "Everything Dashboard"</div>
              <p><span style={{ fontWeight: 600 }}>Problem.</span> Managers scanned 8+ graphs without acting on them.</p>
              <p style={{ marginTop: '12px' }}><span style={{ fontWeight: 600 }}>Design.</span> A ranked priority queue replaced the dashboard.</p>
              <p style={{ marginTop: '12px' }}><span style={{ fontWeight: 600 }}>Why.</span> Prioritization beat information density.</p>
              <p style={{ marginTop: '12px', color: '#78716C' }}><span style={{ fontWeight: 600, color: '#44403C' }}>Result.</span> Planning time dropped 60% and budget revisions fell 36% vs. the prior year — managers spent that time deciding instead of reconciling.</p>
            </div>

            <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px', marginTop: '40px', marginBottom: '48px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>IMAGE 2: Dashboard Before/After</div>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>8+ graphs → priority queue<br/>"Decision time: 14min → 4min"</div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #F3E8E2', borderTop: '4px solid #FF7C5F', borderRadius: '0px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', marginBottom: '48px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FF7C5F', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Decision 02 — the core insight</div>
              <div style={{ fontSize: '26px', fontWeight: 600, color: '#1C1917', marginBottom: '16px' }}>Turn predictions into consequences</div>
              <div className="pull-quote" style={{ marginBottom: '20px' }}>A probability isn't a decision. A consequence is.</div>
              <p>The question wasn't how confident the model was. It was what decision the manager actually needed to make.</p>
              <p style={{ marginTop: '12px' }}>Early alerts said <span style={{ fontStyle: 'italic' }}>"Boiler failure risk: 68%"</span> — a probability, not a decision. Managers hesitated on it. We shifted to consequence framing: <span style={{ fontStyle: 'italic' }}>"9 years in service → delaying replacement may cost $18K."</span> On the boiler alert, the manager requested an inspection and approved the replacement within a day.</p>

              <LatAlertToggle />

              <p style={{ marginTop: '24px' }}><span style={{ fontWeight: 600 }}>Why.</span> The alert didn't need to prove confidence — it needed to give managers enough to decide: what's at stake, and what happens if they wait.</p>

              <p style={{ marginTop: '12px' }}><span style={{ fontWeight: 600, color: '#44403C' }}>Result.</span> <span style={{ color: '#78716C' }}>Override rate fell from 61% to 19% as consequence framing rolled out, and emergency repair incidents dropped 12% during the pilot — managers weren't just agreeing with the model more, they were catching problems earlier.</span></p>

              <div style={{ backgroundColor: '#FFF9F5', padding: '24px', borderRadius: '0px', borderLeft: '3px solid #FF7C5F', marginTop: '32px' }}>
                <div className="cs-card-title cs-card-title--sm">Model behavior</div>
                <p style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7, margin: 0 }}>
                  Each asset gets a risk score from maintenance history, age, and inspections, routed into <span style={{ fontWeight: 600 }}>Critical / Monitor / Safe</span> — never a raw probability. Every override is logged and fed back in, so the score recalibrates against real outcomes.
                </p>
                <p style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7, marginTop: '12px', marginBottom: 0 }}>
                  <span style={{ fontWeight: 600 }}>The real design decision:</span> what the model was allowed to withhold. A confident wrong answer is worse than an uncertain one — so Critical alerts always show their risk drivers and need a human decision before touching a budget.
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#FF7C5F', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Decision 03</div>
              <div style={{ fontSize: '20px', fontWeight: 600, color: '#1C1917', marginBottom: '16px' }}>Design for AI failure, not the demo</div>
            </div>

            <div style={{ backgroundColor: '#FFF9F5', padding: '24px', borderRadius: '0px', borderLeft: '3px solid #FF7C5F', marginBottom: '32px' }}>
              <div className="cs-card-title cs-card-title--sm">The Boiler Incident</div>
              <p style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7, margin: 0 }}>
                <span style={{ fontWeight: 600 }}>Model said:</span> Critical — a $180K boiler flagged for replacement.<br/>
                <span style={{ fontWeight: 600 }}>Human found:</span> duplicated maintenance records had inflated the risk score.<br/>
                <span style={{ fontWeight: 600 }}>Design response:</span> a "Needs Verification" state, visible risk drivers, mandatory manager approval, and logged overrides.<br/>
                <span style={{ fontWeight: 600 }}>Result:</span> adoption held at 95%.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                <div style={{ backgroundColor: '#F3F4F6', padding: '24px', position: 'relative' }}>
                  <p style={{ fontStyle: 'italic', fontFamily: "'Fraunces', serif", color: '#1F2937', margin: 0 }}>"It's great that I can add my own opinion instead of just accepting or rejecting a flagged asset, and pulling up its history in one click instead of digging through folders has made decision-making a lot less stressful."</p>
                  <p style={{ marginTop: '12px', fontSize: '13px', color: '#6B7280' }}>— facilities manager, post-launch stakeholder interview</p>
                </div>
                <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '12px solid #F3F4F6', position: 'absolute', bottom: '-12px', left: '32px' }}></div>
              </div>
            </div>

            <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px', marginTop: '40px', marginBottom: '48px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>IMAGE 4: Boiler Incident Screen</div>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>Critical alert with drivers highlighted<br/>"Needs Verification" badge<br/>Override logged</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '32px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>Supporting workflows</div>
              <p style={{ fontSize: '14px', color: '#78716C', marginBottom: '20px' }}>Outside the core prioritize → explain → verify loop, two more workflows fed the same data model.</p>

              <div style={{ marginBottom: '24px' }}>
                <p><span style={{ fontWeight: 600 }}>Offline field reporting.</span> Work Orders, Asset DNA, and Cost-to-Date linked automatically — an offline queue with voice capture and auto-sync cut reporting time from 20 to 8 minutes.</p>
              </div>

              <div style={{ width: '100%', height: '320px', backgroundColor: '#E5E7EB', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px', marginBottom: '40px' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>IMAGE 1: Field Workflow Evolution</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.5 }}>Offline queue → voice capture → auto-sync</div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p><span style={{ fontWeight: 600 }}>Scenario simulation.</span> In-house cost/timeline comparisons replaced commissioned feasibility studies and drew interest from other universities.</p>
              </div>

              <div style={{ width: '100%', height: '320px', backgroundColor: '#E5E7EB', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>IMAGE 5: Scenario Comparison</div>
                  <div style={{ fontSize: '13px', lineHeight: 1.5 }}>"Repair" vs "Replace" side-by-side<br/>Cost, timeline, risk deltas</div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'turning-point',
        title: '04 — The Turning Point',
        headline: 'We weren\'t designing another dashboard — we were connecting decisions that used to happen in isolation',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" width="1882" height="1046" aria-label="Role-based dashboard surfaces over a shared data foundation" style="display: block; width: 100%; height: auto; border-radius: 0px;">
    <source src="/videos/lat/Flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p>We thought we were customizing a product. Research showed each role was making decisions in isolation, off the same data — what was missing wasn't data, it was shared context and trust.</p>

<p style="margin-top: 28px;">So instead of one dashboard for everyone, we built role-based surfaces over a shared foundation, surfacing only what was actionable.</p>

<img loading="lazy" decoding="async" width="2000" height="1146" src="/images/lat/pROBLEM.webp" alt="System architecture diagram" style="width: 100%; height: auto; border-radius: 0px; margin-top: 40px; margin-bottom: 40px; display: block;" />`
      },
      {
        id: 'constraints',
        title: '05 — Constraints & Design Responses',
        headline: "The legacy ecosystem couldn't be disrupted — LAT shipped as a modular layer alongside it",
        content: `<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Legacy Ecosystem Couldn't Be Disrupted</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">LAT shipped as a modular layer alongside the existing stack — no forced migration.</div>
  </div>

  <div>
    <div class="cs-card-title">Data Integrity Had Hard Boundaries</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Strict governance meant inherited, duplicated records — the source of the boiler incident (Decision 03). Validation states and confidence tiers became how managers learned to trust the score.</div>
  </div>

  <div>
    <div class="cs-card-title">Capital Decisions Were Political</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Layered approvals, donor influence — automation here is inherently political.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 0px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Approval Workflow</div>
    <div style="font-size: 13px; line-height: 1.5;">Review gate → reasoning display → override logging</div>
  </div>
</div>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Roles Had Wildly Different Needs</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians needed voice-to-text. Managers needed delegation. Executives needed two options. Role-based surfaces beat one universal view.</div>
  </div>

  <div>
    <div class="cs-card-title">Field Reality: Connectivity & Devices</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Technicians worked underground and on swing stages. We shipped offline-first capture with queued auto-sync.</div>
  </div>

  <div>
    <div class="cs-card-title">Twelve Months Forced Scope Discipline</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">AI auto-scheduling, ESG modeling, digital twins — all tempting, all cut. The filter: one north star, two drivers.</div>
  </div>
</div>

<div style="width: 100%; height: 450px; background-color: #E5E7EB; border-radius: 0px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; margin-top: 40px; margin-bottom: 40px;">
  <div style="text-align: center; padding: 20px;">
    <div style="font-weight: 600; margin-bottom: 8px;">IMAGE: Offline-First Architecture</div>
    <div style="font-size: 13px; line-height: 1.5;">Local queue → capture → auto-sync → retry</div>
  </div>
</div>

<h4 class="case-study-subhead" style="margin-top: 16px;">Design System Patterns</h4>

<div style="display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 24px; margin-bottom: 24px;">
  <div>
    <div class="cs-card-title">Tokens for two environments</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">The same component library had to work on a phone in direct sunlight underground and a dense desktop dashboard indoors. Technician mobile got a high-contrast, larger-type token set; manager and executive surfaces used a denser set built for longer indoor sessions.</div>
  </div>

  <div>
    <div class="cs-card-title">Reusable edge-case patterns</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Four patterns recurred across every surface instead of being built once each: an offline-status banner, a sync-conflict resolution state, the Critical/Monitor/Safe risk badge, and the human-override dialog — visible reasoning, mandatory comment, logged decision — that shipped after the boiler incident.</div>
  </div>

  <div>
    <div class="cs-card-title">Engineering handoff</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Each component shipped with its states spec'd against what the API actually returned — loading, stale-while-revalidating, offline-queued, error — not just the happy path. Latencies were set with the engineers so slow states got real skeletons, not spinners bolted on after.</div>
  </div>
</div>`
      },
      {
        id: 'tradeoffs',
        title: '06 — Tradeoffs',
        headline: 'We chose human-in-the-loop over speed, even where it cost us',
        content: '',
        customComponent: (
          <div>
            <p>Every feature mapped to one driver: <span style={{ fontWeight: 600 }}>cost, planning accuracy, or adoption.</span> Offline workflows and data integrity came before expanding AI scope — these three tradeoffs show where.</p>

            <LatTradeoffTable />

            <div style={{ backgroundColor: '#FFF9F5', padding: '28px', borderRadius: '0px', borderLeft: '3px solid #FF7C5F', marginTop: '8px', marginBottom: '24px' }}>
              <div className="cs-card-title cs-card-title--md">What we didn't build</div>
              <div style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7 }}>AI auto-scheduling, ESG modeling, and digital twins were all requested and all cut. Twelve months forced one north star — decision confidence — and two drivers, cost and adoption.</div>
            </div>

            <div style={{ backgroundColor: '#FFF9F5', padding: '28px', borderRadius: '0px', borderLeft: '3px solid #FF7C5F', marginTop: '8px', marginBottom: '40px' }}>
              <div className="cs-card-title cs-card-title--md">The model keeps learning</div>
              <div style={{ fontSize: '15px', color: '#57534E', lineHeight: 1.7 }}>Every override gets logged and fed back in, so the model recalibrates against real outcomes instead of staying static. The resulting lifecycle forecast: <span style={{ fontWeight: 600, color: '#44403C' }}>25% fewer unexpected maintenance costs</span> <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#B45309' }}>Projected</span>.</div>
            </div>

            <img loading="lazy" decoding="async" width={2000} height={1455} src="/images/lat/AB%20Testing.webp" alt="AB Testing comparison" style={{ width: '100%', height: 'auto', borderRadius: '0px', marginTop: '8px', marginBottom: '40px', display: 'block' }} />

            <div className="pull-quote">The failure mode is never the UI. It's adoption, trust, and behavior — once those break, the metrics follow.</div>

            <div style={{ width: '100%', height: '450px', backgroundColor: '#E5E7EB', borderRadius: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '14px', marginTop: '40px', marginBottom: '40px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>IMAGE: Trust Over Time Chart</div>
                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>Override rate: 61% → 19% | Adoption: climbing to 95%</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'impact',
        title: '07 — Impact',
        headline: "The biggest change wasn't cost savings — it was decision confidence",
        content: `<p><span style="font-weight: 600;">Operational.</span> Linking work orders to lifecycle cost made repair history visible in real time.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Decision-making.</span> Teams stopped entering meetings to reconcile facts, and started entering them to decide.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">Strategic.</span> Scenario simulation moved feasibility analysis in-house and drew interest from other universities.</p>`
      },
      {
        id: 'reflection',
        title: '08 — Reflection',
        headline: "Clarity drove action more than completeness — users didn't want more data, they wanted less to think about",
        content: `<p><span style="font-weight: 600;">What I got wrong.</span> I thought predictive accuracy would drive adoption. Data integrity mattered more — strong predictions failed when the data was messy.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What mattered more.</span> The lifecycle linkage, not the AI. Once work orders, asset history, and cost were reliably connected, decisions improved before the predictive layer even matured.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What I learned about AI in enterprise.</span> Adoption depends less on model sophistication than on whether people can see why it's wrong when it is. Design for the failure, not the demo.</p>`
      },
    ]
  },
  'misinformation-center': {
    title: 'Misinformation Center',
    subtitle: 'Media Literacy Tools for the AI Age',
    description: 'Research collaboration with TrueMedia.org',
    heroImage: '/images/misinformation-center/Hero.png',
    figmaPrototypeUrl: 'https://www.figma.com/proto/5SuxUGsaCvOVUiRdXa7uNl/Misinformation-Center?node-id=9-3238&page-id=0%3A1&starting-point-node-id=9%3A3186&t=bGz9ql6fLYb3HAKR-1',
    brief: {
      context: 'UW graduate capstone (solo after month two) asking whether people could be equipped to identify misinformation themselves, in research partnership with TrueMedia.org.',
      constraint: 'No engineering resourcing beyond a prototype, and testing showed users rejected any platform-integrated solution outright — the tool had to stand alone.',
      decision: 'Built four independent tools (Search, Scan, Quiz, Ask Us) that help people verify and learn, instead of another fact-check label.',
      tradeoff: 'Concept validated with ~1,800 testers, but TrueMedia shut down mid-collaboration — proof that sound design alone can\'t make a public good sustainable.'
    },
    tldr: {
      role: 'Sole Designer (Graduate Capstone)',
      team: 'Solo (post-February 2024) · Research collaboration with TrueMedia.org',
      timeline: '12 months (Jan–Dec 2024)',
      impact: '~1,800 testers at Misinfo Day | 2,000-respondent survey | Concept validation',
      skills: 'User research · Concept design · Gamification · Platform strategy · Academic rigor',
      decisionAuthority: 'Owned, solo after February 2024: research direction, all four tool concepts, and the pivot away from the original scan-and-verify design after 17 of 19 testers rejected it. TrueMedia.org set the research partnership scope.'
    },
    sections: [
      {
        id: 'snapshot',
        title: '01 — Snapshot',
        content: `<div class="snapshot-content-wrapper">
<div class="snapshot-text-content">

<div style="border: 1px dashed #D1D5DB; background-color: #FAFAF9; padding: 28px 32px; margin-bottom: 40px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">Headline result</div>
  <div style="font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: #1C1917; line-height: 1.3; margin-bottom: 16px;">Two hours of searching became a few minutes of checking.</div>
  <div style="font-family: 'Fraunces', serif; font-size: 40px; font-weight: 700; color: #1C1917; line-height: 1.1;">2h → 5m</div>
  <div style="font-size: 14px; color: #6B7280; margin-top: 10px;">Four participants at different life stages described spending around two hours verifying a claim on their own. In testing, they reached the same answer in about five minutes — baseline self-reported, outcome observed in session.</div>
</div>

<p>Platforms try to control misinformation, but users don't trust them. This capstone asked a different question: what if we equipped people to identify it themselves?</p>

<img loading="lazy" decoding="async" src="/images/misinformation-center/Truth.png" alt="Truth visual" style="width: 100%; border-radius: 0px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<p style="margin-top: 28px;"><span style="font-weight: 600;">Agency over authority.</span> People resist being told what's true, but respond well to tools that help them decide for themselves — not another fact-check label.</p>

<div class="cs-video-wrap" style="width: 100%; max-width: 700px; margin: 40px auto 0;">
  <video autoplay loop muted playsinline preload="metadata" width="2248" height="1388" aria-label="Screen recording of the verification tool embedded in trusted surfaces like the share sheet and lock screen widget" style="display: block; width: 100%; height: auto; border-radius: 0px;" onloadedmetadata="this.playbackRate=1.8;" onplay="this.playbackRate=1.8;">
    <source src="/videos/misinformationcenter/flow%2002.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p style="margin-top: 28px;"><span style="font-weight: 600;">My role.</span> Sole designer on this UW graduate capstone (Jan–Dec 2024), started as a team of four. After February, the research, archetypes, all four features, and testing with ~1,800 people at Misinfo Day were mine alone.</p>

<div style="background-color: #F9FAFB; padding: 24px 28px; border-radius: 0px; border-left: 3px solid #FF7C5F; margin-top: 28px;">
  <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #A8A29E; margin-bottom: 10px;">My contribution</div>
  <div style="font-size: 15px; color: #57534E; line-height: 1.7;">I owned the research direction, all four tool concepts, and the pivot away from the original scan-and-verify design after 17 of 19 testers rejected it — TrueMedia.org set the scope of the research partnership that fed into it.</div>
</div>

<p style="margin-top: 28px;">From March to May, I also collaborated with TrueMedia.org, a deepfake-detection nonprofit. They analyzed 60,000+ pieces of media and shut down in January 2025 — not from bad design, but because nobody profits from detection. That's this case study's throughline (section 06).</p>
</div>

<div class="snapshot-bottom-content">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 48px; margin-bottom: 48px;">
  <div style="background-color: #F3F4F6; border-radius: 0px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Literacy Quiz</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">A level-based game teaching users to spot manipulated content</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 0px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Search & Image Search</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">Verify links, headlines, and images with layered credibility ratings</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 0px; padding: 20px 24px;">
    <div class="cs-card-title cs-card-title--sm-tight">Scan</div>
    <div style="font-size: 14px; color: #57534E; line-height: 1.5;">Camera-based verification for printed content — flyers, newspapers, ads</div>
  </div>
  <div style="background-color: #F3F4F6; border-radius: 0px; padding: 20px 24px;">
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
  <img loading="lazy" decoding="async" src="/images/misinformation-center/User quote.png" alt="User quote" style="width: 100%; height: auto; border-radius: 0px; display: block;" />
</div>
</div>
</div>`
      },
      {
        id: 'problem',
        title: '02 — The Problem',
        headline: 'After AI, the same problem arrived at a different scale',
        content: `<p>Misinformation exploits human bias: believe what confirms your views, share before verifying. After AI, the same problem arrived at a different scale — more believable, more volume, same fragile ecosystem.</p>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-top: 64px; margin-bottom: 64px;">
  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 01.webp" alt="Survey Results" style="width: 100%; height: auto; border-radius: 0px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">Survey Results (n=2,000)</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">74% encountered misinformation weekly, 62% of parents felt overwhelmed, and <20% trusted existing fact-checkers.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 02.webp" alt="The Generational Sandwich" style="width: 100%; height: auto; border-radius: 0px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Generational Sandwich</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Mothers filtering misinformation for kids while protecting elderly parents from scams — shaped the archetype strategy.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 03.webp" alt="The Transparency Demand" style="width: 100%; height: auto; border-radius: 0px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Transparency Demand</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Users wanted to see who benefits from content, not just a fact-check label.</div>
  </div>

  <div>
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Problem 04.webp" alt="The Platform Trust Problem" style="width: 100%; height: auto; border-radius: 0px; margin-bottom: 24px; display: block;" />
    <div class="cs-card-title cs-card-title--xs">The Platform Trust Problem</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6;">Testing rejected a solution integrated into a major social platform immediately — the tool had to stand independent.</div>
  </div>
</div>

<div class="pull-quote" style="margin-top: 100px;">The platform that spread the problem was structurally incapable of being trusted as its solution.</div>`
      },
      {
        id: 'features',
        title: '03 — Features',
        headline: "The quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit",
        content: '',
        customComponent: <MisinfoFeaturesContent />,
        showPrototypeCta: true
      },
      {
        id: 'testing',
        title: '04 — Testing & Validation',
        headline: "The first version didn't fail on usability. It failed on who was asking.",
        content: `<p>Three rounds before the four tools settled — a platform-embedded concept, a format head-to-head, and the full build at the capstone showcase.</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; margin-top: 28px; align-items: start;">
  <div>
    <p style="margin-top: 0;"><span style="font-weight: 600;">What testing disproved.</span> Seventeen of nineteen people wouldn't engage with a version built inside a major social platform — they kept asking why it was there. Not a design problem; no interface would have fixed it. So I moved it out.</p>

    <p style="margin-top: 16px;"><span style="font-weight: 600;">What testing confirmed.</span> People skimmed the written guide but finished the interactive quiz, so the quiz became the backbone. At the showcase the flow held without help, with one gap: no exit from every screen.</p>

    <div style="display: flex; flex-wrap: wrap; gap: 32px; margin-top: 28px; padding: 24px 0; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB;">
      <div>
        <div style="font-size: 26px; font-weight: 700; color: #1C1917;">17/19</div>
        <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">wouldn't engage with the platform-embedded concept</div>
      </div>
      <div>
        <div style="font-size: 26px; font-weight: 700; color: #1C1917;">2</div>
        <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">formats tested head-to-head: written guide vs. interactive quiz</div>
      </div>
      <div>
        <div style="font-size: 26px; font-weight: 700; color: #1C1917;">2h → 5m</div>
        <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">verification time, participant-reported</div>
      </div>
    </div>
  </div>

  <div class="cs-video-wrap" style="width: 100%; max-width: 288px; margin: 0 auto; position: relative; overflow: hidden; aspect-ratio: 492 / 958; border-radius: 0px; background-color: #000000;">
    <video autoplay loop muted playsinline preload="metadata" aria-label="Screen recording of a user uploading an image for camera-based verification" style="position: absolute; top: 0; left: 0; width: 117.89%; aspect-ratio: 580 / 1040; border-radius: 0px; display: block; transform: translate(-9.31%, -4.62%);">
      <source src="/videos/misinformationcenter/Testing%20Image%20upload.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
  </div>
</div>`
      },
      {
        id: 'market',
        title: '05 — Market Research',
        headline: 'Verification had to live where misinformation spreads, but platform ownership destroyed trust',
        content: `<p>Snopes is monetized; the free alternatives are nonprofits with text-heavy resources people ignore — two categories, neither worked:</p>

<div style="display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 40px; margin-bottom: 48px;">
  <div>
    <div class="cs-card-title">Monetized Platforms — Credible but Compromised</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Snopes had trust, but ran ads. Platform labels and Community Notes had scale but read as biased.</div>
  </div>

  <div>
    <div class="cs-card-title">Nonprofit Resources — Trustworthy but Invisible</div>
    <div style="font-size: 15px; color: #57534E; line-height: 1.6;">Literacy initiatives had integrity but no engagement in a short-form-video era.</div>
  </div>
</div>

<p>The gap: users trusted established outlets, wanted multiple sources, inside apps they already used — leaving was fatal friction.</p>

<div class="pull-quote" style="margin-top: 48px; margin-bottom: 48px;">Verification had to live where misinformation spreads, but platform ownership destroyed trust.</div>

<p><span style="font-weight: 600;">The integration insight.</span> I brought this to all three professors — none engaged, waving it off as digging too deep. I worked it through instead with my husband, an AI scientist outside product: a trusted utility in trusted surfaces — Safari share sheet, Apple News, native camera — backed by verifiable institutions, owned by none of the platforms it lives in.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 0px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Great idea to bring in UI scenarios outside of the app itself, like the lock screen widget."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
</div>`
      },
      {
        id: 'research',
        title: '06 — User Research',
        headline: 'Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern',
        content: `<div class="cs-video-wrap" style="width: 100%; max-width: 1200px; margin: 0 auto 48px;">
  <video autoplay loop muted playsinline preload="metadata" width="2256" height="1384" aria-label="Screen recording of the color-coded rating system and unified search/image-search entry point" style="display: block; width: 100%; height: auto; border-radius: 0px;">
    <source src="/videos/misinformationcenter/Flow%2001%20Misinformation.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <button type="button" class="cs-video-toggle" aria-label="Pause video" onclick="var v=this.previousElementSibling;if(v.paused){v.play();this.textContent='⏸';this.setAttribute('aria-label','Pause video');}else{v.pause();this.textContent='▶';this.setAttribute('aria-label','Play video');}">⏸</button>
</div>

<p style="margin-top: 8px; font-size: 15px; color: #6B7280;">2,000 survey respondents · 28 interviews · 14 usability sessions · ~1,800 at Misinfo Day.</p>

<p style="margin-top: 28px;">Early testing — verify a headline in under 30 seconds — surfaced ambiguous labels and slow search, shaping the shift to color-coded ratings.</p>

<div class="pull-quote" style="margin-top: 48px; margin-bottom: 48px;">Misinformation moves through trust networks — families, WhatsApp groups, neighborhood pages — in a specific generational pattern.</div>

<p><span style="font-weight: 600;">The finding that changed the problem:</span> families argue over what's true, and it runs through specific channels: adults 55–80 scammed via WhatsApp groups from trusted contacts, teens 13–18 pressured into exposing personal data, and 25–40 caught managing both.</p>

<p style="margin-top: 28px;">The archetypes emerged from that chain:</p>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 32px; margin-bottom: 8px;">
  <div>
    <div style="width: 100%; aspect-ratio: 1 / 1; background-color: #000000; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 16px;">
      <img loading="lazy" decoding="async" src="/images/misinformation-center/Truth%20Seekers.gif" alt="Truth Seekers archetype" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
    </div>
    <div class="cs-card-title cs-card-title--xs">Truth Seekers (18–30)</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6; margin-top: 6px;">Already motivated, cross-referencing sources, want to be validators.</div>
  </div>
  <div>
    <div style="width: 100%; aspect-ratio: 1 / 1; background-color: #000000; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 16px;">
      <img loading="lazy" decoding="async" src="/images/misinformation-center/Overwhelmed%20Guardians.gif" alt="Overwhelmed Guardians archetype" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
    </div>
    <div class="cs-card-title cs-card-title--xs">Overwhelmed Guardians (25–40)</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6; margin-top: 6px;">Want verification tools, but any friction loses this group.</div>
  </div>
  <div>
    <div style="width: 100%; aspect-ratio: 1 / 1; background-color: #000000; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 16px;">
      <img loading="lazy" decoding="async" src="/images/misinformation-center/Vulnerable%20population.gif" alt="Vulnerable Believers archetype" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
    </div>
    <div class="cs-card-title cs-card-title--xs">Vulnerable Believers (55–80)</div>
    <div style="font-size: 13px; color: #57534E; line-height: 1.6; margin-top: 6px;">Trust what comes from people they know — design means meeting existing behavior.</div>
  </div>
</div>

<p style="margin-top: 28px;">The strategy: design for the first two — they become the human layer protecting the third, like a mother who verifies before forwarding to her parent.</p>

<img loading="lazy" decoding="async" src="/images/misinformation-center/User thinking.png" alt="The generational chain diagram and three archetype cards with real interview quotes" style="width: 100%; border-radius: 0px; margin-top: 40px; margin-bottom: 40px; display: block;" />

<p style="margin-top: 36px;"><span style="font-weight: 600;">What Misinfo Day revealed that recruited testing couldn't.</span> Live crowds show what people do, not what they say. Younger participants abandoned anything that felt like reading within seconds; older participants trusted Ask Us over automated ratings. Engagement spiked when detection was framed as a skill, not a correction.</p>

<p style="margin-top: 28px;">This was also when Scan got decided — attendees wanted to check something in front of them right now, not just what was on their phone.</p>

<div style="margin-top: 48px;">
  <div style="font-size: 13px; color: #6B7280; margin-bottom: 12px;">Misinfo Day — live testing with ~1,800 participants</div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%281%29.jpg" alt="Misinfo Day live testing, photo 1" style="width: 100%; height: 340px; object-fit: cover; border-radius: 0px; display: block;" />
    <img loading="lazy" decoding="async" src="/images/misinformation-center/Misinfo%20day%20%282%29.jpg" alt="Misinfo Day live testing, photo 2" style="width: 100%; height: 340px; object-fit: cover; border-radius: 0px; display: block;" />
  </div>
</div>`
      },
      {
        id: 'impact',
        title: '07 — Impact & Results',
        headline: "96% of 36 Gen Z and millennial testers said they'd use it. Older users needed a camera first.",
        content: `<p>Younger testers took to search and the quiz immediately. Older participants stayed out until Scan arrived — pointing a camera at a newspaper asked nothing of them they didn't already know, and it removed the part they disliked most: having to ask a younger relative for help.</p>

<div style="display: flex; flex-wrap: wrap; gap: 40px; margin-top: 40px; padding: 24px 0; border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB;">
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">96%</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">of 36 Gen Z and millennial testers said they'd use it</div>
  </div>
  <div>
    <div style="font-size: 26px; font-weight: 700; color: #1C1917;">2h → 5m</div>
    <div style="font-size: 13px; color: #6B7280; margin-top: 4px;">verification they described as taking two hours took about five minutes in testing</div>
  </div>
</div>

<p style="margin-top: 28px;">The final version was framed as a system utility — something that lives beside the compass and the calculator, not an app you remember to open.</p>`
      },
      {
        id: 'truemedia',
        title: '08 — TrueMedia',
        headline: 'Detection is the expensive end of the chain — authenticating content at creation is fundamentally more efficient, but nobody profits from implementing it',
        content: `<p>TrueMedia.org was a nonprofit building deepfake detection for the 2024 election. Through UW's partnership, I contributed research synthesis on what to prioritize. They shipped a dark, utilitarian tool for journalists; mine served a teenager asking "why should I care?" — two solutions to adjacent problems. Per later reporting on the shutdown, they analyzed 60,000+ pieces of media, launched in September 2024, and shut down in January 2025, open-sourcing the technology rather than chasing funding. Founder Oren Etzioni, quoted in that coverage: "We are not prepared for a large-scale, generative AI attack. It hasn't come yet. That doesn't mean it won't."</p>

<p style="margin-top: 28px;">TrueMedia's Head of Product reframed the market for me in two lessons: platforms are ambivalent about detection because it drives engagement, and the real unaddressed threat — personalized scams — never reaches a community to verify it. His critique: detection is the expensive end of the chain; authenticating content at creation is more efficient, but C2PA proposed exactly that and stalled on incentives.</p>`
      },
      {
        id: 'reflection',
        title: '09 — Reflection',
        showPrototypeCta: true,
        headline: 'A designer who thinks only about what users see is a UI designer. A designer who thinks about everything required to make that experience real and sustainable is a product leader',
        content: `<p><span style="font-weight: 600;">What this project taught me.</span> Design alone can't make a public good sustainable — TrueMedia was research-grounded and mission-complete, yet closed on economics, not design. The integration vision, embedded in trusted surfaces with no business model, is the answer. A designer who only sees the UI misses that; a product leader thinks about what makes it real.</p>

<p style="margin-top: 28px;"><span style="font-weight: 600;">What changed.</span> Feedback pushed the quiz to teach the why behind each answer, and credibility badges toward layered reveals — signal first, reasoning a tap away. By 2026, AI collapses the staffing this needed; the design question is answered, the ecosystem question isn't.</p>

<div style="display: flex; gap: 24px; margin-top: 48px; margin-bottom: 8px; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 250px; position: relative;">
    <div style="background-color: #F3F4F6; padding: 24px; border-radius: 0px; position: relative;">
      <p style="font-style: italic; font-family: 'Fraunces', serif; color: #1F2937; margin: 0;">"Demo was very well designed. Excited to see the next steps."</p>
      <p style="margin-top: 12px; font-size: 13px; color: #6B7280;">— capstone reviewer</p>
    </div>
    <div style="width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 12px solid #F3F4F6; position: absolute; bottom: -12px; left: 32px;"></div>
  </div>
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
      description: 'Founding Product Designer at Keye — from three static screens to YC F24. Built credit-based marketplace, Chrome extension, and design system. 0→20K MAUs, $1.5M raised.',
      keywords: ['YC startup designer', 'founding designer', 'startup product design', 'credit marketplace', 'Chrome extension design', 'design systems', 'subscription marketplace', 'SaaS design']
    },
    lat: {
      description: 'Lead Product Designer for LAT Platform — ML-driven lifecycle assessment for university campus maintenance. 95% pilot adoption, 70%→95% data accuracy, 25% cost reduction.',
      keywords: ['enterprise UX', 'trust-centered AI design', 'AI product design', 'university technology', 'predictive maintenance', 'lifecycle assessment', 'B2B design', 'decision intelligence']
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
