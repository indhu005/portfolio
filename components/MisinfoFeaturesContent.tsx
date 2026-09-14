'use client'
import MisinfoQuiz from './MisinfoQuiz'

export default function MisinfoFeaturesContent() {
  return (
    <div>
      <p>Each feature came from a specific gap the research exposed — not a feature list.</p>

      <p style={{ marginTop: '48px', fontSize: '20px', fontWeight: 600 }}>The pivot: from platform-embedded to standalone</p>

      <p style={{ marginTop: '20px' }}>Before any interface work, I'd already concluded a standalone public-interest tool couldn't fund itself — so the first iteration met people where the infrastructure and users already existed: a Misinformation Center embedded in a major social platform, with fact-check labels, community reporting, a hub in the feed. Dead on arrival for two independent reasons: users wouldn't trust the platform spreading misinformation to also solve it, and that platform's own base skews older, missing the audience most active in verification. That reopened the exact funding question I'd tried to design around, and I sat stuck on it for weeks while teammates moved to easier scopes — a Snopes-style news app, a game, a city website redesign.</p>

      <img src="/images/misinformation-center/Facebook misinformation center.png" alt="Misinformation Center wireframes embedded in a major social platform — the killed direction" width={2999} height={1210} style={{ width: '100%', height: 'auto', borderRadius: '0px', marginTop: '32px', marginBottom: '48px', display: 'block' }} />

      <div style={{ marginTop: '120px' }}>
        <p style={{ fontSize: '20px', fontWeight: 600 }}>Feature 01 — Literacy Quiz</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginTop: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ marginTop: 0 }}>Tutorials and explainers weren't changing behavior — early "how to spot misinformation" modules had users disengaging like it was homework. The first quiz format, read a claim and type a response, lost users by question four.</p>

            <p style={{ marginTop: '16px', fontWeight: 600 }}>The constraint became the feature:</p>

            <ul style={{ marginTop: '12px', paddingLeft: '24px', lineHeight: '1.8' }}>
              <li>Under 40 seconds per session</li>
              <li>One hand, on a train</li>
              <li>Real social media content (not sanitized examples)</li>
              <li>Swipe-based True/False interaction</li>
            </ul>
          </div>

          <div style={{ width: '100%', maxWidth: '288px', margin: '0 auto' }}>
            <video autoPlay loop muted playsInline preload="auto" style={{ display: 'block', width: '100%', aspectRatio: '456 / 910', borderRadius: '0px' }}>
              <source src="/videos/misinformationcenter/Literacyquiz.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Interactive Quiz */}
        <div style={{ marginTop: '48px', marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#FFF44F', borderRadius: '0px', fontSize: '14px', fontWeight: 600, color: '#1C1917' }}>
              Try it yourself ↓
            </div>
          </div>
          <MisinfoQuiz />
        </div>

        <div className="pull-quote" style={{ marginTop: '40px', marginBottom: '40px' }}>
          The quiz was designed in the visual register of the platforms where misinformation actually spreads, not the register of an educational tool.
        </div>

        <p style={{ marginTop: '20px' }}>After Misinfo Day, completion states were redesigned around skill progression rather than score — "You're getting better at spotting this" outperformed a percentage. Users also wanted to know why an item was false, which conflicted with the 40-second constraint; the resolution was speed for the question, depth for the reveal, sources one tap away.</p>
      </div>

      <div style={{ marginTop: '120px' }}>
        <p style={{ fontSize: '20px', fontWeight: 600 }}>Feature 02 — Search & Image Search</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginTop: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ marginTop: 0 }}>Verification had to come to users, not the reverse — one entry point for both links and images.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Four states, not two</div>
                <div style={{ fontSize: '15px', color: '#57534E' }}>True, Misleading, False, Satire. Misleading was critical: most misinformation isn't false, it's selectively true.</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Badge + evidence</div>
                <div style={{ fontSize: '15px', color: '#57534E' }}>Fast badge upfront, one tap to reveal sources and reasoning — users wanted the why, not just the verdict.</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Multiple sources</div>
                <div style={{ fontSize: '15px', color: '#57534E' }}>Reuters, AP, a fact-check org side by side — institutional backing users could verify themselves.</div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '288px', margin: '0 auto' }}>
            <video autoPlay loop muted playsInline preload="auto" style={{ display: 'block', width: '100%', aspectRatio: '458 / 900', borderRadius: '0px' }}>
              <source src="/videos/misinformationcenter/Search .mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '120px' }}>
        <p style={{ fontSize: '20px', fontWeight: 600 }}>Feature 03 — Scan</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginTop: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ marginTop: 0 }}>Scan came from Misinfo Day: what happens when the misinformation is a printed flyer, a newspaper, a poster? Older users hesitated and erred on forms, but scanned instantly — a behavior already learned from restaurant QR codes.</p>
          </div>

          <div style={{ width: '100%', maxWidth: '288px', margin: '0 auto' }}>
            <video autoPlay loop muted playsInline preload="auto" style={{ display: 'block', width: '100%', aspectRatio: '448 / 906', borderRadius: '0px' }}>
              <source src="/videos/misinformationcenter/Scan.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '120px' }}>
        <p style={{ fontSize: '20px', fontWeight: 600 }}>Feature 04 — Ask Us</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', marginTop: '20px', alignItems: 'start' }}>
          <div>
            <p style={{ marginTop: 0 }}>Some misinformation exists in no database — private WhatsApp forwards, local rumors, freshly manipulated images. Automated systems can't catch what they've never seen, and users who distrusted platform verdicts wouldn't trust an AI verdict either.</p>

            <p style={{ marginTop: '16px', fontWeight: 600 }}>Human judgment backed by journalistic expertise was the only answer.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '20px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Clear response-time expectations</div>
                <div style={{ fontSize: '15px', color: '#57534E' }}>Pending / Under Review / Responded, so users knew what to expect.</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Three-step simplification</div>
                <div style={{ fontSize: '15px', color: '#57534E' }}>After Misinfo Day, the multi-field form dropped to three steps — older participants were struggling with entry.</div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '288px', margin: '0 auto' }}>
            <video autoPlay loop muted playsInline preload="auto" style={{ display: 'block', width: '100%', aspectRatio: '444 / 906', borderRadius: '0px' }}>
              <source src="/videos/misinformationcenter/Submit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div className="pull-quote" style={{ marginTop: '96px', marginBottom: '32px' }}>
        The quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit. None of them tell users what to think.
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <div style={{ backgroundColor: '#F3F4F6', padding: '24px', borderRadius: '0px', position: 'relative' }}>
            <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-fraunces), serif', color: '#1F2937', margin: 0 }}>"The prototype is very well crafted… the experience looks easy and also fun."</p>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#6B7280' }}>— capstone reviewer</p>
          </div>
          <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '12px solid #F3F4F6', position: 'absolute', bottom: '-12px', left: '32px' }}></div>
        </div>
      </div>

      <p style={{ marginTop: '64px', fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic', fontSize: '22px', color: '#1C1917', textAlign: 'center' }}>
        Let&apos;s get into the details now.
      </p>
    </div>
  )
}
