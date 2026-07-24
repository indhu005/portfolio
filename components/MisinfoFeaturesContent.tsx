'use client'
import MisinfoQuiz from './MisinfoQuiz'

export default function MisinfoFeaturesContent() {
  return (
    <div>
      <p>Each feature came from a specific gap the research exposed — not a feature list.</p>

      <p style={{ marginTop: '36px', fontSize: '20px', fontWeight: 600 }}>The pivot: from Facebook to standalone</p>

      <p style={{ marginTop: '20px' }}>The first iteration was a Facebook Misinformation Center — fact-check labels, community reporting, a hub in the feed.</p>

      <p style={{ marginTop: '16px' }}>Functional wireframes, sound logic, and dead on arrival: users wouldn't trust the vector of the problem as its solution.</p>

      <img src="/images/misinformation-center/Facebook misinformation center.png" alt="Facebook Misinformation Center wireframes — the killed direction" style={{ width: '100%', borderRadius: '8px', marginTop: '28px', marginBottom: '32px', display: 'block' }} />

      <p style={{ marginTop: '36px', fontSize: '20px', fontWeight: 600 }}>Feature 01 — Literacy Quiz</p>

      <p style={{ marginTop: '20px' }}>Tutorials and explainers weren't changing behavior. Testing on early "how to spot misinformation" modules showed users disengaging as if watching homework.</p>

      <p style={{ marginTop: '16px' }}>The first quiz format — read a claim, type a response — lost users by question four.</p>

      <p style={{ marginTop: '16px', fontWeight: 600 }}>The constraint became the feature:</p>

      <ul style={{ marginTop: '12px', paddingLeft: '24px', lineHeight: '1.8' }}>
        <li>Under 40 seconds per session</li>
        <li>One hand, on a train</li>
        <li>Real social media content (not sanitized examples)</li>
        <li>Swipe-based True/False interaction</li>
      </ul>

      {/* Interactive Quiz */}
      <div style={{ marginTop: '48px', marginBottom: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#FFF44F', borderRadius: '6px', fontSize: '14px', fontWeight: 600, color: '#1C1917' }}>
            Try it yourself ↓
          </div>
        </div>
        <MisinfoQuiz />
      </div>

      <div className="pull-quote" style={{ marginTop: '40px', marginBottom: '40px' }}>
        The quiz was designed in the visual register of the platforms where misinformation actually spreads, not the register of an educational tool.
      </div>

      <p style={{ marginTop: '20px' }}>After Misinfo Day, completion states were redesigned around skill progression rather than score — "You're getting better at spotting this" outperformed a percentage.</p>

      <p style={{ marginTop: '16px' }}>Users wanted to know why an item was false, which conflicted with the 40-second constraint. The resolution: speed for the question, depth for the reveal, sources one tap away.</p>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '32px auto 48px' }}>
        <video autoPlay loop muted playsInline preload="auto" style={{ display: 'block', width: '100%', height: 'auto', borderRadius: '8px' }}>
          <source src="/videos/misinformationcenter/Literacy quiz.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <p style={{ marginTop: '36px', fontSize: '20px', fontWeight: 600 }}>Feature 02 — Search & Image Search</p>

      <p style={{ marginTop: '20px' }}>Verification had to come to users, not the reverse. A unified entry point handled both links and images so users didn't have to choose a tool at the moment of uncertainty.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '28px', marginBottom: '28px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Four states, not two</div>
          <div style={{ fontSize: '15px', color: '#57534E' }}>True, Misleading, False, Satire. The Misleading state was critical: most misinformation isn't false, it's selectively true and context-stripped.</div>
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Badge + evidence</div>
          <div style={{ fontSize: '15px', color: '#57534E' }}>Fast badge upfront, one tap to reveal sources, fact-checkers, and reasoning. Users wanted the why, not just the verdict.</div>
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Multiple sources</div>
          <div style={{ fontSize: '15px', color: '#57534E' }}>Reuters, AP, a fact-check org side by side — institutional backing users could verify themselves.</div>
        </div>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '32px auto 48px', maxWidth: '1200px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
        <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
          <div>Video placeholder</div>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>Replace with: /videos/misinformationcenter/Search .webm</div>
        </div>
      </div>

      <p style={{ marginTop: '36px', fontSize: '20px', fontWeight: 600 }}>Feature 03 — Scan</p>

      <p style={{ marginTop: '20px' }}>Scan came from Misinfo Day: what happens when the misinformation is a printed flyer, a newspaper, a poster?</p>

      <p style={{ marginTop: '16px' }}>Older users hesitated and erred on forms, but scanned instantly and confidently — a behavior already learned from restaurant QR codes. OCR converted headlines to searchable text invisibly.</p>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '28px auto 48px', maxWidth: '1200px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
        <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
          <div>Video placeholder</div>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>Replace with: /videos/misinformationcenter/Scan.webm</div>
        </div>
      </div>

      <p style={{ marginTop: '36px', fontSize: '20px', fontWeight: 600 }}>Feature 04 — Ask Us</p>

      <p style={{ marginTop: '20px' }}>Some misinformation exists in no database — private WhatsApp forwards, local rumors, freshly manipulated images.</p>

      <p style={{ marginTop: '16px' }}>Automated systems can't catch what they've never seen. Users who distrusted platform verdicts wouldn't trust an AI verdict on emotionally charged content either.</p>

      <p style={{ marginTop: '16px', fontWeight: 600 }}>Human judgment backed by journalistic expertise was the only answer.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '28px', marginBottom: '28px' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Clear response-time expectations</div>
          <div style={{ fontSize: '15px', color: '#57534E' }}>Pending / Under Review / Responded status system so users knew what to expect.</div>
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Three-step simplification</div>
          <div style={{ fontSize: '15px', color: '#57534E' }}>After Misinfo Day, the multi-field form was reduced to three steps because older participants were struggling with entry.</div>
        </div>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '28px auto 48px', maxWidth: '1200px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
        <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
          <div>Video placeholder</div>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>Replace with: /videos/misinformationcenter/Submit.webm</div>
        </div>
      </div>

      <div className="pull-quote" style={{ marginTop: '48px', marginBottom: '32px' }}>
        The quiz builds the skill, Search and Scan provide the tool at the moment of need, Ask Us is the human fallback at the tool's limit. None of them tell users what to think.
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <div style={{ backgroundColor: '#F3F4F6', padding: '24px', borderRadius: '16px', position: 'relative' }}>
            <p style={{ fontStyle: 'italic', fontFamily: 'var(--font-fraunces), serif', color: '#1F2937', margin: 0 }}>"The prototype is very well crafted… the experience looks easy and also fun."</p>
            <p style={{ marginTop: '12px', fontSize: '13px', color: '#6B7280' }}>— capstone reviewer</p>
          </div>
          <div style={{ width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '12px solid #F3F4F6', position: 'absolute', bottom: '-12px', left: '32px' }}></div>
        </div>
      </div>

      <div style={{ width: '100%', height: '400px', backgroundColor: '#E5E7EB', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '48px auto 0', maxWidth: '1200px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📹</div>
        <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
          <div>Video placeholder</div>
          <div style={{ marginTop: '8px', fontSize: '12px' }}>Replace with: /videos/misinformationcenter/Notifications.webm</div>
        </div>
      </div>
    </div>
  )
}
