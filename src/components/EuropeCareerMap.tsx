import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
// @ts-ignore
import worldData from "world-atlas/countries-110m.json"
import { geoMercator, geoPath, geoInterpolate } from "d3-geo"

// ---- THEME ---------------------------------------------------------------
const THEME = {
  ocean: "#1e40af",       // blue-700
  land: "#f1f5f9",        // slate-100
  landStroke: "#0ea5e9",  // sky-500
  marker: "#f97316",      // orange-500
  markerHalo: "#3b82f6",  // blue-500
  text: "#1e293b",        // slate-800
  subtext: "#64748b",     // slate-500
}

// Canvas size used by ComposableMap AND the custom d3 projection
const WIDTH = 960
const HEIGHT = 520
const ZOOM_MULTIPLIER = 16
// Center override (lon, lat)
const OVERRIDE_CENTER: [number, number] | null = [21.560541, 45.820926]
// Avatar image URL
const AVATAR_SRC: string = "/src/assets/pic.jpg"

// ---- Types ---------------------------------------------------------------
type Place = {
  type: "job" | "school"
  name: string
  role?: string
  city: string
  country: string
  period?: string
  coords: [number, number] // [lon, lat]
  notes?: string
}

type Dated = { start?: Date; end?: Date }

// ---- Period parsing ------------------------------------------------------
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

function endOfMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0)
}

function parseSingle(token: string): { y?: number; m?: number } {
  const t = token.trim()
  const m = t.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/i)
  if (m) return { y: +m[2], m: MONTHS[m[1].toLowerCase()] }
  const y = t.match(/^(\d{4})$/)
  if (y) return { y: +y[1] }
  return {}
}

function parsePeriodString(period?: string): Dated {
  if (!period) return {}
  const norm = period.replace(/\u2014/g, "–").replace(/\s*-\s*/g, " – ")
  const parts = norm.split(/–/).map((s) => s.trim()).filter(Boolean)

  if (parts.length === 1) {
    const a = parseSingle(parts[0])
    if (!a.y) return {}
    const start = new Date(a.y, a.m ?? 0, 1)
    const end = a.m != null ? endOfMonth(a.y, a.m) : new Date(a.y, 11, 31)
    return { start, end }
  }

  // Range like "Dec 2018 – May 2019" or "2016 – 2017"
  const a = parseSingle(parts[0])
  const b = parseSingle(parts[1])
  if (!a.y || !b.y) return {}
  const start = new Date(a.y, a.m ?? 0, 1)
  const end = b.m != null ? endOfMonth(b.y, b.m) : new Date(b.y, 11, 31)
  return { start, end }
}

// ---- Data from your CV ---------------------------------------------------
const PLACES: Place[] = [
  // Jobs
  { type: "job", name: "CARFAX Europe", role: "Product Manager, Data Quality & UX", city: "Munich", country: "Germany", period: "Nov 2023 – Dec 2024", coords: [11.5761, 48.1374], notes: "Led global SaaS team of 7; roadmap to OKRs." },
  { type: "job", name: "AUTO1 Group", role: "Product Manager, Last Mile Delivery", city: "Berlin", country: "Germany", period: "Jan 2023 – Oct 2023", coords: [13.405, 52.52], notes: "Last‑mile delivery; 87% tool adoption; +11% speed." },
  { type: "job", name: "AUTO1 Group", role: "Junior Product Manager, Last Mile Delivery", city: "Berlin", country: "Germany", period: "May 2022 – Dec 2022", coords: [13.405, 52.52], notes: "Pay‑on‑delivery MVP; +11% units sold." },
  { type: "job", name: "ING Bank", role: "Product Owner, Investments & Savings", city: "Istanbul", country: "Turkey", period: "Sep 2021 – Mar 2022", coords: [28.9784, 41.0082], notes: "Remote Advisory; +40% revenue; 90% adoption; €300M deposit MVP." },
  { type: "job", name: "METRO AG", role: "Product Owner Intern, Global CRM", city: "Düsseldorf", country: "Germany", period: "Dec 2018 – May 2019", coords: [6.7735, 51.2277], notes: "NPS rollout to 40k users in 24 countries." },
  // Schools
  { type: "school", name: "Sabancı University", role: "Master of Business Administration", city: "Istanbul", country: "Turkey", period: "2022", coords: [29.2321, 40.897], notes: "GPA 3.5/4.0; New Venture Creation, IWM." },
  { type: "school", name: "Kocaeli University", role: "Bachelor's degree in Industrial Engineering", city: "Kocaeli (İzmit)", country: "Turkey", period: "2020", coords: [29.942, 40.7666], notes: "" },
  { type: "school", name: "Deggendorf Institute of Technology", role: "Exchange Semester, General Engineering", city: "Deggendorf", country: "Germany", period: "2016–2017", coords: [12.963, 48.8406], notes: "Erasmus" },
]

const PLACES_DATED = PLACES.map((p) => ({ ...p, ...parsePeriodString(p.period) })) as (Place & Dated)[]

// ---- Logos (optional) ----------------------------------------------------
// Put logo files under /public/logos and update URLs below.
// If a logo is missing, a fallback briefcase / graduation-cap icon is shown.
const LOGO_BY_NAME: Record<string, string> = {
  "CARFAX Europe": "/logos/carfax.svg",
  "AUTO1 Group": "/logos/auto1.svg",
  "ING Bank": "/logos/ing.svg",
  "METRO AG": "/logos/metro.svg",
  "Sabancı University": "/logos/sabanci.svg",
  "Kocaeli University": "/logos/kocaeli.svg",
  "Deggendorf Institute of Technology": "/logos/dit.png",
}

function getLogoFor(p: Place) {
  return LOGO_BY_NAME[p.name]
}

// Minimal inline fallback icons (no deps)
function BriefcaseIcon(props: { size?: number; color?: string }) {
  const s = props.size ?? 20; const c = props.color ?? THEME.text
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden>
      <path fill={c} d="M9 6V5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3Zm2 0h2V5a1 1 0 0 0-1-1h0a1 1 0 0 0-1 1v1Zm-5 5h12v2H6v-2Z"/>
    </svg>
  )
}
function CapIcon(props: { size?: number; color?: string }) {
  const s = props.size ?? 20; const c = props.color ?? THEME.text
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden>
      <path fill={c} d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13L6 12v3c0 1.66 2.69 3 6 3s6-1.34 6-3v-3l-6 4Z"/>
    </svg>
  )
}
function LogoCircle({ place }: { place: Place }) {
  const logo = getLogoFor(place)
  const SIZE = 36
  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }} className="shrink-0 rounded-lg overflow-hidden" aria-hidden>
      {/* fallback bg + icon (shows if logo fails) */}
      <div style={{ position: 'absolute', inset: 0, background: place.type === 'job' ? THEME.landStroke : '#8b5cf6', opacity: 0.9 }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        {place.type === 'job' ? <BriefcaseIcon size={18} /> : <CapIcon size={18} />}
      </div>
      {logo && (
        <img
          src={logo}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', padding: 6, background: '#fff' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}
    </div>
  )
}

// Dedupe map markers by name+city+coords so AUTO1 doesn't render twice at Berlin
const UNIQUE_MARKERS: Place[] = Array.from(
  new Map(
    PLACES.map((p) => [
      `${p.name}|${p.city}|${p.coords[0]},${p.coords[1]}`,
      p,
    ])
  ).values()
)

// Journey order requested:
const JOURNEY_ORDER = [
  "Kocaeli University", // start
  "Deggendorf Institute of Technology", // Erasmus exchange to Germany
  "METRO AG", // Düsseldorf
  "ING Bank", // Istanbul
  "Sabancı University", // back to Istanbul
  "AUTO1 Group", // Berlin
  "CARFAX Europe", // Munich
]

function findPlaceByName(name: string, hintRole?: string) {
  const matches = PLACES_DATED.filter((p) => p.name === name)
  if (matches.length <= 1) return matches[0]
  if (hintRole) return matches.find((m) => m.role?.includes(hintRole)) || matches[0]
  return matches[0]
}

const JOURNEY = [
  findPlaceByName("Kocaeli University"),
  findPlaceByName("Deggendorf Institute of Technology"),
  findPlaceByName("METRO AG"),
  findPlaceByName("ING Bank"),
  findPlaceByName("Sabancı University"),
  findPlaceByName("AUTO1 Group"), // Auto1 Berlin – Junior→PM (flip within stop)
  findPlaceByName("CARFAX Europe"),
] as (Place & Dated)[]

const YEAR_OVERRIDE: Record<string, number> = { "Kocaeli University": 2013 }
const YEAR_RANGE_OVERRIDE: Record<string, [number, number]> = {
  "ING Bank": [2020, 2021],
  "AUTO1 Group": [2022, 2023],
}
const INITIAL_YEAR = YEAR_OVERRIDE[JOURNEY[0].name] ?? (JOURNEY[0].start?.getFullYear() ?? JOURNEY[0].end?.getFullYear() ?? 0)

// ---- Viewbox/Projection helper ------------------------------------------
function computeView(points: [number, number][]) {
  // Lock the camera to Turkey + Germany region
  const BOUNDS = { minLon: 6.0, maxLon: 33.5, minLat: 38.5, maxLat: 55.8 }
  const feature = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [BOUNDS.minLon, BOUNDS.minLat],
        [BOUNDS.maxLon, BOUNDS.minLat],
        [BOUNDS.maxLon, BOUNDS.maxLat],
        [BOUNDS.minLon, BOUNDS.maxLat],
        [BOUNDS.minLon, BOUNDS.minLat],
      ]],
    },
  } as any

  const proj = geoMercator().fitExtent([[0, 0], [WIDTH, HEIGHT]], feature)
  let center = proj.invert([WIDTH / 2, HEIGHT / 2]) as [number, number]
  let scale = proj.scale() * ZOOM_MULTIPLIER * 0.95 // zoom out 5%

  if (!Number.isFinite(center[0]) || !Number.isFinite(center[1]) || !Number.isFinite(scale)) {
    center = [20, 48] as [number, number]
    scale = 1600 * ZOOM_MULTIPLIER
  }
  if (OVERRIDE_CENTER) {
    center = OVERRIDE_CENTER as [number, number]
  }
  return { center, scale }
}

export default function EuropeCareerMap() {
  const points = useMemo(() => JOURNEY.map((p) => p.coords), [])
  const { center, scale } = useMemo(() => computeView(points), [points])

  // d3 projection to match ComposableMap; used for animation math
  const projection = useMemo(() => geoMercator().center(center).scale(scale).translate([WIDTH / 2, HEIGHT / 2]), [center, scale])
  const pathGen = useMemo(() => geoPath(projection), [projection])

  // Build curved segments using geodesic interpolation (for a nice arc)
  const segments = useMemo(() => {
    return JOURNEY.slice(0, -1).map((from, i) => {
      const to = JOURNEY[i + 1]
      const interp = geoInterpolate([from.coords[0], from.coords[1]], [to.coords[0], to.coords[1]])
      const pts = Array.from({ length: 40 }, (_, k) => interp(k / 39)) as [number, number][]
      return { from, to, lineString: { type: "LineString", coordinates: pts } as const }
    })
  }, [])

  // -------- Runtime checks (dev) -----------------------------------------
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return
    const missing = JOURNEY_ORDER.filter((name) => !PLACES.find((p) => p.name === name))
    if (missing.length) console.warn("Missing places for", missing)
    JOURNEY.forEach((p, idx) => {
      console.assert(p && Array.isArray(p.coords) && p.coords.length === 2, "Invalid journey step", idx, p)
    })
    const v = computeView(JOURNEY.map((p) => p.coords))
    console.assert(Number.isFinite(v.center[0]) && Number.isFinite(v.center[1]) && Number.isFinite(v.scale), "computeView returned bad values", v)

    // --- Unit tests for period parsing ---
    const t = (label: string, cond: boolean) => console.assert(cond, `Test failed: ${label}`)
    const d1 = parsePeriodString("2016–2017")
    t("range with years only", d1.start?.getFullYear() === 2016 && d1.end?.getFullYear() === 2017)
    const d2 = parsePeriodString("Dec 2018 – May 2019")
    t("range with months", d2.start?.getMonth() === 11 && d2.start?.getFullYear() === 2018 && d2.end?.getMonth() === 4 && d2.end?.getFullYear() === 2019)
    const d3 = parsePeriodString("2022")
    t("single year full span", d3.start?.getFullYear() === 2022 && d3.end?.getFullYear() === 2022)
    const d4 = parsePeriodString("2016 - 2017")
    t("hyphen with spaces normalizes", d4.start?.getFullYear() === 2016 && d4.end?.getFullYear() === 2017)
    const d5 = parsePeriodString("Nov 2023 - Dec 2024")
    t("month hyphen variant", d5.start?.getMonth() === 10 && d5.end?.getMonth() === 11 && d5.start?.getFullYear() === 2023 && d5.end?.getFullYear() === 2024)
    const d6 = parsePeriodString("May 2019")
    t("single month treated as month span", d6.start?.getMonth() === 4 && d6.end?.getMonth() === 4 && d6.start?.getFullYear() === 2019 && d6.end?.getFullYear() === 2019)

    // Added sanity tests for year logic
    console.assert(INITIAL_YEAR === 2013, "Initial year starts at 2013")
    console.assert((YEAR_RANGE_OVERRIDE["AUTO1 Group"][0] as number) === 2022, "AUTO1 start year = 2022")

    // uniqueness
    const uniqKeys = new Set(PLACES.map(p => `${p.name}|${p.city}|${p.coords[0]},${p.coords[1]}`))
    console.assert(UNIQUE_MARKERS.length === uniqKeys.size, "UNIQUE_MARKERS count should equal unique keys")
    console.assert(JOURNEY.filter(p => p.name === "AUTO1 Group").length === 1, "JOURNEY should include AUTO1 exactly once")
  }, [])

  // Animation state
  const [segIndex, setSegIndex] = useState(0) // which segment we're animating
  const [t, setT] = useState(0) // 0..1 progress along current segment
  const [phase, setPhase] = useState<"pre" | "animating" | "post">("pre")
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [userHold, setUserHold] = useState(false)
  const [frozenRole, setFrozenRole] = useState<string | undefined>(undefined)
  const pathRef = useRef<SVGPathElement | null>(null)
  const pathLenRef = useRef(0)
  const [avatarFailed, setAvatarFailed] = useState(false)
  const [ended, setEnded] = useState(false)
  const [heldYear, setHeldYear] = useState<number | undefined>(undefined)
  const [maxSeenYear, setMaxSeenYear] = useState<number>(INITIAL_YEAR)

  // During each pause, if a stop spans two years, show first year then flip to second year
  const [pauseFlip, setPauseFlip] = useState(false)
  useEffect(() => {
    if (userHold) return // don't flip while user manually paused
    // Flip only on ARRIVAL (post). Never flip during pre to avoid double rounds.
    setPauseFlip(false)
    if (phase === 'post') {
      const toName = segments[segIndex]?.to?.name
      const isAuto1 = toName === "AUTO1 Group"
      const delay = isAuto1 ? 1500 : 1000 // +0.5s extra at AUTO1 between Junior → PM
      const flip = setTimeout(() => setPauseFlip(true), delay)
      return () => clearTimeout(flip)
    }
  }, [phase, segIndex, segments, userHold])

  useEffect(() => {
    if (!playing) return
    let raf = 0
    let timer: any
    let start: number | null = null
    const HOP_MS = 1000 // 1s per hop
    const PAUSE_MS = 1600 // ~1.6s per stop

    if (phase === "pre") {
      timer = setTimeout(() => {
        setT(0)
        setPhase("animating")
      }, PAUSE_MS)
      return () => clearTimeout(timer)
    }

    if (phase === "animating") {
      const step = (now: number) => {
        if (start == null) start = now
        const elapsed = now - start
        const nt = Math.min(1, elapsed / HOP_MS)
        setT(nt)
        if (nt < 1) {
          raf = requestAnimationFrame(step)
        } else {
          setPhase("post")
        }
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }

    if (phase === "post") {
      const toName = segments[segIndex]?.to?.name
      const isAuto1 = toName === "AUTO1 Group"
      const wait = isAuto1 ? PAUSE_MS + 500 : PAUSE_MS // keep ~0.6s after flip visible
      timer = setTimeout(() => {
        if (segIndex < segments.length - 1) {
          setSegIndex((i) => i + 1)
          setPhase("pre")
        } else {
          setPlaying(false)
          setEnded(true)
        }
      }, wait)
      return () => clearTimeout(timer)
    }
  }, [playing, phase, segIndex, segments.length])

  const d = useMemo(() => pathGen(segments[segIndex].lineString) || "", [pathGen, segIndex, segments])

  // measure path length once per segment
  useEffect(() => {
    if (pathRef.current) pathLenRef.current = pathRef.current.getTotalLength()
  }, [d])

  // Compute head position and angle along current path
  const head = useMemo(() => {
    const seg = segments[segIndex]
    const from = seg?.from
    const to = seg?.to
    const projectPt = (coords?: [number, number]) => {
      if (!coords) return { x: 0, y: 0 }
      const p = projection(coords) as [number, number] | null
      return p ? { x: p[0], y: p[1] } : { x: 0, y: 0 }
    }
    // In pre/post, pin avatar exactly on stop (no path sampling)
    if (phase !== 'animating') {
      const base = phase === 'post' ? to?.coords : from?.coords
      const proj = projectPt(base)
      return { ...proj, len: 0 }
    }
    // Animating along path
    if (!pathRef.current) {
      const proj = projectPt(from?.coords)
      return { ...proj, len: 0 }
    }
    const len = pathLenRef.current
    const pt = pathRef.current.getPointAtLength(len * t)
    return { x: pt.x, y: pt.y, len }
  }, [phase, segIndex, t, projection, segments, d])

  const angle = useMemo(() => {
    if (!pathRef.current || head.len === 0) return 0
    const delta = 2
    const a = pathRef.current.getPointAtLength(Math.max(0, head.len * t - delta))
    const b = pathRef.current.getPointAtLength(Math.min(head.len, head.len * t + delta))
    const rad = Math.atan2(b.y - a.y, b.x - a.x)
    return (rad * 180) / Math.PI
  }, [t, d, head.len])

  const current = segments[segIndex]
  const showPlace = !ended ? (phase === "pre" ? current.from : phase === "post" ? current.to : undefined) : undefined
  const showAbove = !!showPlace && (showPlace.city.includes("Istanbul") || showPlace.city.includes("Kocaeli"))

  // Dynamic role display (smooth flip within AUTO1 pause)
  const AUTO1_ROLES = useMemo(() => PLACES.filter(p => p.name === "AUTO1 Group" && p.type === "job"), [])
  const auto1JrRole = useMemo(() => AUTO1_ROLES.find(r => r.role?.toLowerCase().includes("junior"))?.role, [AUTO1_ROLES])
  const auto1PmRole = useMemo(() => AUTO1_ROLES.find(r => r.role?.toLowerCase() === "product manager" || (r.role?.toLowerCase().includes("product manager") && !r.role?.toLowerCase().includes("junior")))?.role, [AUTO1_ROLES])
  const displayedRole = useMemo(() => {
    if (!showPlace) return undefined
    if (userHold && frozenRole && showPlace.name === "AUTO1 Group") return frozenRole
    if (showPlace.name === "AUTO1 Group") {
      const jr = AUTO1_ROLES.find(r => r.role?.toLowerCase().includes("junior"))
      const pm = AUTO1_ROLES.find(r => r.role?.toLowerCase() === "product manager" || (r.role?.toLowerCase().includes("product manager") && !r.role?.toLowerCase().includes("junior")))
      // During pre at AUTO1, lock to PM (final state) to avoid a second round.
      if (phase === 'pre') return pm?.role ?? showPlace.role
      // During post (arrival), do the smooth flip Jr -> PM once.
      return (pauseFlip ? pm?.role : jr?.role) ?? showPlace.role
    }
    return showPlace.role
  }, [showPlace, pauseFlip, AUTO1_ROLES, phase, userHold, frozenRole])

  // Click navigation helpers -------------------------------------------------
  const indexForPlace = (p: Place) => JOURNEY.findIndex(j => j.name === p.name && j.city === p.city)
  const jumpToStop = (stopIndex: number) => {
    if (stopIndex < 0 || stopIndex >= JOURNEY.length) return
    // Ensure we're in interactive state
    setStarted(true)
    setEnded(false)
    // Decide phase so the avatar pins exactly on the clicked stop
    if (stopIndex === JOURNEY.length - 1) {
      setSegIndex(JOURNEY.length - 2)
      setPhase("post")
    } else {
      setSegIndex(stopIndex)
      setPhase("pre")
    }
    setT(0)
    setPlaying(false)
    setUserHold(true)
    setPauseFlip(false)
    const target = JOURNEY[stopIndex] as Place & Dated
    // Freeze role at AUTO1 to Junior on click
    if (target?.name === "AUTO1 Group") {
      setFrozenRole(auto1JrRole ?? target.role)
    } else {
      setFrozenRole(undefined)
    }
    // Freeze year to the start year (or override start) for the clicked stop
    const yearFor = (p: Place & Dated) => {
      const o = YEAR_OVERRIDE[p.name]; if (o !== undefined) return o
      const r = YEAR_RANGE_OVERRIDE[p.name]; if (r) return r[0]
      const sy = p.start?.getFullYear(); const ey = p.end?.getFullYear()
      return sy ?? ey ?? INITIAL_YEAR
    }
    const newYear = yearFor(target)
    setHeldYear(newYear)
    if (typeof newYear === 'number') setMaxSeenYear(newYear)
  }

  const handleContinue = useCallback(() => {
    setUserHold(false)
    setFrozenRole(undefined)
    setHeldYear(undefined)
    if (ended) return
    if (phase === 'post' && segIndex < segments.length - 1) {
      setSegIndex(segIndex + 1)
    }
    setPhase('animating')
    setT(0)
    setPlaying(true)
  }, [ended, phase, segIndex, segments.length])

  const handleReplay = useCallback(() => {
    setSegIndex(0); setT(0); setPhase('pre'); setPlaying(true);
    setEnded(false); setStarted(true); setUserHold(false);
    setHeldYear(undefined); setMaxSeenYear(INITIAL_YEAR);
  }, [])

  const handleMarkerClick = useCallback((idx: number) => { jumpToStop(idx) }, [])

  // ---- Timeline helpers --------------------------------------------------
  const stopsCount = JOURNEY.length
  const activeIndex = phase === "post" ? segIndex + 1 : segIndex
  const progressStops = segIndex + (phase === "animating" ? t : phase === "post" ? 1 : 0)
  const railProgress = Math.max(0, Math.min(1, progressStops / (stopsCount - 1)))

  function lerpDate(a: Date, b: Date, t: number) {
    const at = a.getTime()
    const bt = b.getTime()
    return new Date(at + (bt - at) * t)
  }

  const currentDate: Date | undefined = useMemo(() => {
    const from = current.from as Place & Dated
    const to = current.to as Place & Dated
    const fromStart = from.start ?? from.end
    const fromEnd = from.end ?? from.start
    const toStart = to.start ?? to.end

    if (!fromStart && !toStart) return undefined

    if (phase === "pre") return fromStart
    if (phase === "post") return toStart
    if (fromEnd && toStart) return lerpDate(fromEnd, toStart, t)
    return fromStart ?? toStart
  }, [current, phase, t])

  // Year display logic (monotonic forward only)
  const candidateYear = useMemo(() => {
    if (ended) return 2025
    const from = current.from as Place & Dated
    const to = current.to as Place & Dated

    const displayFor = (p: Place & Dated): number | undefined => {
      const override = YEAR_OVERRIDE[p.name]
      if (override !== undefined) return override
      const range = YEAR_RANGE_OVERRIDE[p.name]
      if (range) {
        const [sy, ey] = range
        return phase === 'post' ? (pauseFlip ? ey : sy) : sy
      }
      const sy = p.start?.getFullYear()
      const ey = p.end?.getFullYear()
      if (sy && ey && sy !== ey) return phase === 'post' ? (pauseFlip ? ey : sy) : sy
      return sy ?? ey
    }

    if (phase === "pre" || phase === "post") {
      const p = phase === "pre" ? from : to
      return displayFor(p)
    }
    return displayFor(from)
  }, [current, phase, pauseFlip, ended])

  // Session-bounded monotonic year: while playing, never decrease.
  useEffect(() => {
    if (!userHold && candidateYear !== undefined && candidateYear > maxSeenYear) {
      setMaxSeenYear(candidateYear)
    }
  }, [candidateYear, userHold, maxSeenYear])

  const displayYear = useMemo(() => {
    // When the user holds on a stop, show that stop's year (can be earlier).
    if (userHold) return heldYear ?? maxSeenYear
    // Otherwise show monotonic non-decreasing year for this session.
    return maxSeenYear
  }, [userHold, heldYear, maxSeenYear])

  // Avatar size (px)
  const AV_SIZE = 40

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="relative rounded-2xl overflow-hidden shadow-xl group" style={{ background: THEME.ocean, border: `1px solid ${THEME.landStroke}` }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* LOCKED SIZE to keep avatar aligned */}
        <ComposableMap width={WIDTH} height={HEIGHT} projection="geoMercator" projectionConfig={{ center, scale }} style={{ width: WIDTH, height: HEIGHT }}>
          <Geographies geography={worldData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: THEME.land, stroke: THEME.landStroke, strokeWidth: 0.8, outline: "none" },
                    hover: { fill: THEME.land, stroke: THEME.landStroke, strokeWidth: 0.8, outline: "none" },
                    pressed: { fill: THEME.land, outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Static markers for all places */}
          {UNIQUE_MARKERS.map((p) => (
            <Marker key={`${p.type}-${p.name}-${p.city}-${p.period}`} coordinates={p.coords} onClick={() => handleMarkerClick(indexForPlace(p))} style={{ cursor: 'pointer' }}>
              <circle r={6} fill="none" stroke={p.type === "job" ? THEME.markerHalo : "#fb7185"} strokeWidth={2} opacity={0.4} />
              <circle r={3.8} fill={p.type === "job" ? THEME.marker : "#f59e0b"} opacity={0.95} />
              <title>{p.city}</title>
            </Marker>
          ))}
        </ComposableMap>

        {/* Animated segment path */}
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path ref={pathRef} d={d} fill="none" stroke={THEME.marker} strokeWidth={2} strokeDasharray="6 6" filter="url(#glow)" />
        </svg>

        {/* Hover play/pause + Replay controls */}
        {started && (
          <div
            className="absolute bottom-3 left-3 flex items-center gap-2"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 150ms ease', pointerEvents: hovered ? 'auto' : 'none' }}
          >
            <button
              onClick={() => (playing ? (setPlaying(false), setUserHold(true), setFrozenRole(displayedRole)) : handleContinue())}
              className="rounded-lg px-3 py-1 border text-sm"
              style={{ borderColor: THEME.landStroke, color: THEME.text, background: THEME.land }}
            >
              {playing ? 'Pause' : 'Continue'}
            </button>
            <button
              onClick={handleReplay}
              className="rounded-lg px-3 py-1 border text-sm"
              style={{ borderColor: THEME.landStroke, color: THEME.text, background: THEME.land }}
            >
              Replay
            </button>
          </div>
        )}

        {/* Start CTA overlay */}
        {!started && (
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.35)' }}
          >
            <button
              onClick={() => { setStarted(true); setPlaying(true); setPhase('pre'); setUserHold(false); setFrozenRole(undefined); setMaxSeenYear(INITIAL_YEAR); }}
              className="rounded-2xl px-6 py-3 md:px-8 md:py-4 border text-lg md:text-2xl font-semibold shadow-lg"
              style={{ borderColor: THEME.landStroke, color: THEME.text, background: THEME.land }}
            >
              Click to see my journey
            </button>
          </div>
        )}

        {/* Avatar image overlay */}
        {avatarFailed ? (
          <div
            style={{
              position: 'absolute',
              left: head.x - AV_SIZE / 2,
              top: head.y - AV_SIZE / 2,
              width: AV_SIZE,
              height: AV_SIZE,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${THEME.marker} 0%, ${THEME.markerHalo} 100%)`,
              boxShadow: `0 0 0 2px ${THEME.marker}, 0 0 12px ${THEME.markerHalo}`,
              pointerEvents: 'none',
              willChange: 'left, top',
              zIndex: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: THEME.land,
              fontWeight: 700,
            }}
          >
            CK
          </div>
        ) : (
          <img
            src={AVATAR_SRC}
            onError={() => setAvatarFailed(true)}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: head.x - AV_SIZE / 2,
              top: head.y - AV_SIZE / 2,
              width: AV_SIZE,
              height: AV_SIZE,
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: `0 0 0 2px ${THEME.marker}, 0 0 12px ${THEME.markerHalo}`,
              pointerEvents: 'none',
              willChange: 'left, top',
              zIndex: 12,
            }}
          />
        )}

        {/* Bubble tooltip that shows at stops (now with logos, no years) */}
        {showPlace && (
          <div
            className="pointer-events-none absolute z-10 rounded-xl p-3 text-sm shadow-lg"
            style={{
              left: showAbove ? head.x : Math.min(head.x + 14, WIDTH - 320),
              top: showAbove ? head.y : head.y + 14,
              transform: showAbove ? "translate(-50%, -120%)" : undefined,
              background: THEME.land,
              border: `1px solid ${THEME.landStroke}`,
              color: THEME.text,
              maxWidth: 320,
            }}
          >
            <div className="flex items-start gap-3">
              <LogoCircle place={showPlace as Place} />
              <div className="min-w-0">
                <div className="font-medium truncate">{showPlace.name}</div>
                <div className="truncate" style={{ color: THEME.subtext }}>{showPlace.city}, {showPlace.country}</div>
                {displayedRole && <div className="mt-1 transition-opacity duration-300" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{displayedRole}</div>}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT-SIDE TIMELINE PANEL ------------------------------------- */}
        <div className="absolute top-0 right-0 h-full" style={{ width: 150, pointerEvents: 'none' }}>
          <div className="h-full flex flex-col" style={{ background: `${THEME.land}ee`, borderLeft: `1px solid ${THEME.landStroke}`, color: THEME.text }}>
            <div className="px-3 pt-3 pb-1">
              <div className="text-xs" style={{ color: THEME.subtext }}>Year</div>
              <div className="mt-0.5 text-xl font-semibold leading-tight">{String(displayYear ?? INITIAL_YEAR)}</div>
            </div>

            {/* rail + fill + dots in the same container to keep alignment */}
            <div className="relative flex-1 px-4 pb-4">
              <div className="absolute inset-y-6 left-0 right-0" style={{ pointerEvents: 'auto' }}>
                <div className="absolute inset-0">
                  {/* vertical rail */}
                  <div className="absolute" style={{ left: 24, top: 0, bottom: 0, width: 1, background: THEME.landStroke, opacity: 0.7 }} />
                  {/* progress fill (relative to this container's height) */}
                  <div className="absolute" style={{ left: 24, top: 0, width: 1, height: `${Math.max(0, Math.min(100, railProgress * 100))}%`, background: THEME.marker, boxShadow: `0 0 8px ${THEME.marker}` }} />
                </div>

                {/* Dots and labels */}
                {JOURNEY.map((p, idx) => {
                  const pos = (idx / (stopsCount - 1)) * 100
                  const state: 'past' | 'active' | 'future' = idx < activeIndex ? 'past' : idx === activeIndex ? 'active' : 'future'
                  const dotBg = state === 'past' ? THEME.landStroke : state === 'active' ? THEME.marker : THEME.landStroke
                  const dotRing = state === 'active' ? THEME.markerHalo : THEME.landStroke
                  const textCol = state === 'active' ? THEME.text : THEME.subtext
                  return (
                    <div key={`${p.name}-${p.city}-${idx}`} className="absolute" style={{ top: `${pos}%`, left: 0, right: 0, transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => handleMarkerClick(idx)}>
                      {/* dot centered on rail at x=24px (dot center at 24 via left:20 + size 8) */}
                      <span style={{ position: 'absolute', left: 20, display: 'block', width: 8, height: 8, borderRadius: '9999px', background: dotBg, boxShadow: state === 'active' ? `0 0 0 2px ${dotRing}` : undefined }} />
                      <div className="text-xs leading-tight" style={{ color: textCol, paddingLeft: 36 }}>
                        <div className="font-medium truncate">{p.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* END TIMELINE --------------------------------------------------- */}
      </div>
    </div>
  )
}
