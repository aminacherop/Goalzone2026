// ── AD SLOT COMPONENT ────────────────────────────────────
// Replace the placeholder divs with real AdSense code
// once your site is approved by Google AdSense

// HOW TO USE:
// import AdSlot from '../components/AdSlot'
// <AdSlot type="leaderboard" />   → 728×90  (top/bottom of page)
// <AdSlot type="rectangle" />     → 300×250 (middle of content)
// <AdSlot type="mobile" />        → 320×50  (mobile banner)

const AD_SIZES = {
  leaderboard: { w: '728px', h: '90px',  label: '728×90 Leaderboard' },
  rectangle:   { w: '300px', h: '250px', label: '300×250 Rectangle' },
  mobile:      { w: '320px', h: '50px',  label: '320×50 Mobile Banner' },
  large:       { w: '336px', h: '280px', label: '336×280 Large Rectangle' },
}

// ── YOUR ADSENSE CLIENT ID ────────────────────────────────
// Replace with your real AdSense publisher ID
// Format: ca-pub-XXXXXXXXXXXXXXXXX
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXXX'

// ── YOUR AD SLOT IDs ──────────────────────────────────────
// Get these from your AdSense dashboard after approval
const SLOT_IDS = {
  leaderboard: 'XXXXXXXXXX',
  rectangle:   'XXXXXXXXXX',
  mobile:      'XXXXXXXXXX',
  large:       'XXXXXXXXXX',
}

// Set to true once AdSense is approved
const ADSENSE_APPROVED = false

export default function AdSlot({ type = 'leaderboard', className = '' }) {
  const size = AD_SIZES[type] || AD_SIZES.leaderboard

  // ── REAL ADSENSE AD ──────────────────────────────────────
  if (ADSENSE_APPROVED) {
    return (
      <div className={`flex justify-center my-4 ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: size.w, height: size.h }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={SLOT_IDS[type]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // ── PLACEHOLDER (shown before AdSense approval) ──────────
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div
        className="border-2 border-dashed border-gray-200 bg-white rounded-xl flex flex-col items-center justify-center text-gray-400 text-xs"
        style={{ width: size.w, maxWidth: '100%', height: size.h }}
      >
        <span className="text-lg mb-1">📢</span>
        <span className="font-semibold uppercase tracking-wider">Advertisement</span>
        <span className="text-gray-300">{size.label}</span>
      </div>
    </div>
  )
}