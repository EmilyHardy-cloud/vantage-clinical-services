'use client'

import { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck,
  Scale,
  Gavel,
  Users,
  Activity,
  TrendingDown,
  Newspaper,
  FolderArchive,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

const NAV = [
  { href: "#legal-anchor", label: "Legal Position" },
  { href: "#risk-map", label: "Board Risk Map" },
  { href: "#services", label: "Services" },
  { href: "#roi", label: "Commercial ROI" },
  { href: "#challenges", label: "Buyer Questions" },
  { href: "#briefing", label: "Contact" },
]

const RISKS = [
  {
    n: "01",
    icon: Gavel,
    title: "Legal and tribunal exposure",
    risk:
      "An employee alleges that workplace conditions caused or worsened stress, anxiety, depression, burnout, trauma, harassment impact, disability-related deterioration, or psychiatric injury.",
    consequences: [
      "Employment tribunal claim",
      "Civil personal-injury claim",
      "Discrimination claim (disability, sex, pregnancy, menopause, neurodivergence, race, age or other protected characteristics)",
      "Constructive dismissal claim",
      "Whistleblowing or grievance escalation",
      "Uncapped exposure in discrimination — and, from January 2027, uncapped compensatory awards for unfair dismissal",
    ],
    audit: [
      "Evidence that risks were considered before harm escalated",
      "A documented trail of reasonable steps",
      "Clear manager guidance",
      "Reduced \u201Cwe did nothing\u201D vulnerability",
      "A stronger defence if an employee later says concerns were ignored",
    ],
    quote:
      "This is not a wellbeing initiative. It is a legal defensibility exercise.",
  },
  {
    n: "02",
    icon: Users,
    title: "Director and senior-leadership risk",
    risk:
      "Senior leaders assume mental-health risk is an HR issue, when in practice it may sit across health and safety, employment law, culture, operational design and governance.",
    consequences: [
      "Board blindsided by a claim",
      "HR blamed for operational failures it did not control",
      "Managers acting inconsistently",
      "Weak evidence that senior leadership took reasonable steps",
      "Insurers, auditors or regulators asking for evidence after the event",
    ],
    audit: [
      "A leadership-level risk register",
      "Clear ownership: board, HR, line managers, occupational health, legal, operations",
      "Escalation triggers",
      "Evidence that senior management understood foreseeable psychosocial risks",
    ],
    quote:
      "The question is no longer whether you care about mental health. The question is whether your governance can prove you managed foreseeable risk.",
  },
  {
    n: "03",
    icon: Activity,
    title: "Absence, presenteeism and productivity leakage",
    risk:
      "Psychosocial risk quietly turns into absence, low output, disengagement and performance-management conflict.",
    consequences: [
      "Rising sickness absence",
      "Employees working while unwell but underperforming",
      "More grievances around workload, bullying, pressure, role ambiguity or poor management",
      "Performance processes becoming legally risky because underlying health risks were not assessed",
    ],
    audit: [
      "Early identification of risk hotspots",
      "Manager capability to intervene earlier",
      "Better distinction between conduct, capability, workload, health and culture issues",
      "Reduced hidden productivity loss",
    ],
    quote:
      "The expensive cases are rarely sudden. They usually start as unmanaged workload, poor communication, weak supervision, ignored grievances or unclear role expectations.",
  },
  {
    n: "04",
    icon: TrendingDown,
    title: "Staff turnover and replacement cost",
    risk:
      "Employees leave because the organisation failed to manage pressure, conflict, trauma exposure, workload, bullying, uncertainty or poor leadership behaviour.",
    consequences: [
      "Recruitment costs",
      "Agency / interim cover",
      "Lost institutional knowledge",
      "Longer onboarding",
      "Morale damage among remaining staff",
      "Reputational drag in the labour market",
    ],
    audit: [
      "Identification of departments, managers or job roles generating avoidable attrition",
      "Leadership interventions before exit becomes the only employee option",
      "Better retention of experienced people",
      "Reduced repeat recruitment spend",
    ],
    quote:
      "Turnover is often treated as a recruitment problem. In many organisations it is a risk-control failure.",
  },
  {
    n: "05",
    icon: Newspaper,
    title: "Reputation and employer-brand risk",
    risk:
      "A tribunal, grievance leak, Glassdoor pattern, social-media escalation, union involvement or press story frames the organisation as unsafe, negligent or hostile.",
    consequences: [
      "Loss of candidate trust",
      "Customer / client concern",
      "Investor or board scrutiny",
      "Internal fear and cynicism",
      "Difficulty defending values statements",
    ],
    audit: [
      "Independent evidence of proactive control",
      "Better incident response",
      "Safer wording for policies, manager scripts and employee communications",
      "Reduced gap between stated values and actual practice",
    ],
    quote:
      "Reputational damage comes from the gap between what the organisation says publicly and what employees can evidence privately.",
  },
  {
    n: "06",
    icon: FolderArchive,
    title: "Insurance and claims defensibility",
    risk:
      "The organisation has policies, but cannot evidence implementation, manager training, risk assessment, review, or individual support.",
    consequences: [
      "Weak defence file",
      "Higher settlement pressure",
      "Insurer concern",
      "Legal costs even where the employer ultimately wins",
      "Increased likelihood of early settlement because documentation is poor",
    ],
    audit: [
      "A defensibility pack",
      "Audit trail",
      "Risk-assessment record",
      "Training record",
      "Action plan",
      "Evidence of review and escalation",
    ],
    quote:
      "In a claim, good intentions are not evidence. Records, actions and review points are evidence.",
  },
]

const SERVICES = [
  {
    n: "01",
    tag: "Offer 1",
    title: "Psychosocial Legal Defensibility Audit",
    promise: "We identify where your organisation is exposed before an employee, tribunal, insurer or lawyer does.",
    audience: "HR Director, People Director, COO, CEO, Risk Committee, Board.",
    deliverables: [
      "Review of stress / psychosocial risk-assessment process",
      "Review of mental-health, absence, grievance, bullying, harassment, performance and reasonable-adjustment policies",
      "Evidence-gap analysis",
      "Manager practice review",
      "Risk register",
      "Defensibility rating",
      "Prioritised remediation plan",
    ],
  },
  {
    n: "02",
    tag: "Offer 2",
    title: "Leadership Risk Upskilling",
    promise: "We turn policy into consistent management behaviour.",
    audience: "Senior management, operational leaders, HR business partners.",
    deliverables: [
      "Training for board / senior leaders",
      "Training for line managers",
      "Case-based exercises",
      "Scripts for difficult conversations",
      "Escalation thresholds",
      "Documentation standards",
      "Practical manager playbook",
    ],
  },
  {
    n: "03",
    tag: "Offer 3",
    title: "Defensible Action Plan and Review Cycle",
    promise: "We help you move from awareness to evidence-backed control.",
    audience: "Organisations that already know they have risk exposure.",
    deliverables: [
      "30 / 60 / 90-day action plan",
      "Risk-control owners",
      "Review cadence",
      "Evidence tracker",
      "Board reporting template",
      "Follow-up audit",
    ],
  },
]

const RISK_TABLE = [
  {
    risk: "Legal non-compliance",
    wrong: "No suitable stress / psychosocial risk assessment",
    fix: "Forensic audit and documented action plan",
  },
  {
    risk: "Uncapped financial exposure",
    wrong: "Discrimination or future uncapped unfair-dismissal compensation",
    fix: "Defensible evidence and early controls",
  },
  {
    risk: "Manager inconsistency",
    wrong: "Managers improvise around stress, absence, conflict or workload",
    fix: "Senior-leader and manager upskilling",
  },
  {
    risk: "Absence and presenteeism",
    wrong: "People are off sick or underperforming while unwell",
    fix: "Early risk detection and practical controls",
  },
  {
    risk: "Attrition",
    wrong: "Staff leave because risks are normalised",
    fix: "Leadership and system changes",
  },
  {
    risk: "Culture toxicity",
    wrong: "Bullying, poor communication, overload, fear or unresolved conflict",
    fix: "Psychosocial risk mapping",
  },
  {
    risk: "Reputation",
    wrong: "Tribunal, grievance or social proof damages trust",
    fix: "Governance, audit trail and remedial action",
  },
  {
    risk: "Operational disruption",
    wrong: "Teams become dependent on fragile individuals or unsafe norms",
    fix: "System-level risk controls",
  },
]

const CHALLENGES = [
  {
    q: "\u201CIs this really a legal requirement?\u201D",
    a: "The legal duty to assess and manage work-related stress already exists under health and safety law. Employment-law reforms increase the practical exposure because claims may become easier to bring and more expensive to lose. This service is designed to help you evidence reasonable steps.",
  },
  {
    q: "\u201CDon\u2019t we already have policies?\u201D",
    a: "Policies are only useful if they are implemented, understood by managers, reviewed, and evidenced. A tribunal or claimant lawyer will not only ask whether a policy existed. They will ask what happened in practice.",
  },
  {
    q: "\u201CIsn\u2019t this just wellbeing?\u201D",
    a: "No. Wellbeing is part of it, but this is a risk-management and legal-defensibility exercise. It connects health and safety, employment law, leadership behaviour, absence, performance, turnover and claims exposure.",
  },
  {
    q: "\u201CCan you guarantee we won\u2019t be sued?\u201D",
    a: "No. No credible adviser can guarantee that. What we can do is reduce foreseeable risk, improve management practice, and strengthen the evidence that the organisation acted reasonably.",
  },
  {
    q: "\u201CWhy you?\u201D",
    a: "Our background is in complex health and social care, where unmanaged psychosocial risk has real human, operational and regulatory consequences. We have led services through major quality improvement, seen the impact of poor leadership on mental health, and understand how robust systems, documentation and leadership behaviour protect both people and organisations.",
  },
]

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: "Briefing request received",
        description:
          "Thank you. A member of the Vantage Clinical Strategy team will be in touch within two working days.",
      })
      ;(e.target as HTMLFormElement).reset()
    }, 900)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1">
        <Hero />
        <Reframe />
        <LegalAnchor />
        <RiskMap />
        <Services />
        <RiskTable />
        <Roi />
        <Challenges />
        <OnePageMessage />
        <Founder />
        <Briefing handleSubmit={handleSubmit} submitting={submitting} />
      </main>
      <SiteFooter />
    </div>
  )
}

/* ---------- Header ---------- */

function SiteHeader({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80 text-ivory border-b border-ink-line">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#top" className="flex items-center gap-3 group">
            <span className="flex h-9 w-9 items-center justify-center border border-gold/60 text-gold-soft font-serif text-lg">
              V
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-[15px] tracking-wide">Vantage</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/60">
                Clinical Strategy Ltd
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] uppercase tracking-[0.14em] text-ivory/70 hover:text-gold-soft transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              size="sm"
              className="bg-gold text-ink hover:bg-gold-soft rounded-none font-sans uppercase tracking-[0.14em] text-[12px]"
            >
              <Link href="#briefing">Request a Board Briefing</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-ivory"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-line bg-ink">
          <div className="px-5 py-4 flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.14em] text-ivory/80 py-2 border-b border-ink-line/60"
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-gold text-ink hover:bg-gold-soft rounded-none"
              onClick={() => setMobileOpen(false)}
            >
              <Link href="#briefing">Request a Board Briefing</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative bg-ink text-ivory bg-grain overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 80% -10%, rgba(176,139,79,0.18), transparent), radial-gradient(600px 300px at 0% 100%, rgba(122,31,43,0.22), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
                For CEOs, HRDs and Board Risk Owners
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
              Psychosocial Risk Audit.
              <span className="block text-ivory/85 mt-3">
                Making workplace mental-health risk
              </span>
              <span className="block text-gold-soft">
                legally defensible, commercially visible and managerially controllable.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-ivory/75 leading-relaxed text-pretty">
              We do not sell wellbeing. We deliver a forensic audit of how your organisation
              identifies, assesses and controls foreseeable psychosocial risk — and we hand the
              board a defensible record of action before a tribunal, insurer or claimant lawyer
              asks for it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gold text-ink hover:bg-gold-soft rounded-none uppercase tracking-[0.14em] text-[13px] font-medium"
              >
                <Link href="#briefing">
                  Request a Board Briefing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-ivory/30 text-ivory hover:bg-ivory/5 hover:text-ivory uppercase tracking-[0.14em] text-[13px] font-medium"
              >
                <Link href="#risk-map">View the Board Risk Map</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-ink-line bg-ink-soft/60 p-7">
              <div className="text-[11px] uppercase tracking-[0.24em] text-gold-soft mb-4">
                Why this matters now
              </div>
              <ul className="space-y-4 text-sm text-ivory/80 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-gold-soft mt-1">—</span>
                  <span>
                    HSE states employers have a legal duty to protect workers from work-related
                    stress by doing a risk assessment and acting on it.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-soft mt-1">—</span>
                  <span>
                    Employers with five or more people must record significant risk-assessment
                    findings.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-soft mt-1">—</span>
                  <span>
                    From January 2027, unfair-dismissal qualifying periods reduce to six months and
                    compensatory awards are uncapped.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold-soft mt-1">—</span>
                  <span>
                    Poor mental health costs UK employers around <span className="stat-num text-ivory">£51bn</span> a
                    year — presenteeism alone is <span className="stat-num text-ivory">£24bn</span>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Reframe ---------- */

function Reframe() {
  return (
    <section className="bg-ivory-deep border-y border-border">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16 lg:py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-oxblood mb-6">
          The reframe
        </p>
        <p className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-snug text-ink text-balance">
          &ldquo;This is not a wellbeing initiative. It is a legal defensibility exercise.&rdquo;
        </p>
        <div className="mt-8 max-w-3xl mx-auto text-[15px] text-muted-foreground leading-relaxed">
          The direction of travel is clear: lower barriers to claims, higher potential awards, and
          greater scrutiny of whether employers can evidence that they identified, assessed and
          controlled psychosocial risks. Boards that treat this as optional wellbeing spend are
          holding unpriced liability.
        </div>
      </div>
    </section>
  )
}

/* ---------- Legal Anchor ---------- */

function LegalAnchor() {
  const facts = [
    {
      stat: "5+",
      label: "employees",
      detail:
        "Where an employer has five or more employees, significant risk-assessment findings must be recorded.",
    },
    {
      stat: "Oct 2026",
      label: "earliest",
      detail:
        "UK government April 2026 implementation update: tribunal time-limit changes take effect no earlier than October 2026.",
    },
    {
      stat: "Jan 2027",
      label: "in force",
      detail:
        "From 1 January 2027, unfair-dismissal qualifying periods reduce to six months and compensatory awards are uncapped.",
    },
    {
      stat: "No cap",
      label: "discrimination",
      detail:
        "There is no limit on compensation in discrimination cases at employment tribunal.",
    },
  ]
  return (
    <section id="legal-anchor" className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>The legal position</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
              The duty already exists. The exposure is widening.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
              Employers already have a legal duty to assess and manage work-related stress and
              mental-health risks. Where an employer has five or more employees, significant
              risk-assessment findings must be recorded. The Employment Rights Act reforms increase
              the employment-litigation exposure from 2026&ndash;27, including changes to tribunal
              time limits and, from January 2027, reduced unfair-dismissal qualifying periods and
              uncapped compensatory awards.
            </p>
            <div className="mt-8 border-l-2 border-oxblood pl-5">
              <p className="font-serif text-lg text-ink leading-snug">
                &ldquo;The direction of travel is clear: lower barriers to claims, higher potential
                awards, and greater scrutiny of whether employers can evidence that they
                identified, assessed and controlled psychosocial risks.&rdquo;
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Vantage Clinical Strategy &mdash; defensible framing
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic">
              We do not say day-one rights allow any employee to sue from day one for psychosocial
              risk. That framing is too loose and would undermine credibility with HR directors,
              employment lawyers, insurers and boards.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-border">
              {facts.map((f) => (
                <div key={f.label} className="bg-background p-7">
                  <div className="flex items-baseline gap-2">
                    <span className="stat-num text-4xl text-oxblood">{f.stat}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {f.label}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-ink/80 leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-px bg-ink text-ivory p-7 grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-gold-soft mb-2">
                  Annual cost to UK employers
                </div>
                <div className="stat-num text-3xl">£51bn</div>
                <p className="text-xs text-ivory/70 mt-2 leading-relaxed">
                  Deloitte estimate of the annual cost of poor mental health to UK employers.
                </p>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-gold-soft mb-2">
                  Presenteeism component
                </div>
                <div className="stat-num text-3xl">£24bn</div>
                <p className="text-xs text-ivory/70 mt-2 leading-relaxed">
                  The single largest cost bucket &mdash; people at work but underperforming because
                  of unmanaged psychosocial risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Risk Map ---------- */

function RiskMap() {
  return (
    <section id="risk-map" className="bg-ivory-deep border-y border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel>Board-level risk map</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
            Six exposures a Psychosocial Risk Audit is designed to manage.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
            Each risk is what the board is exposed to. Each consequence is what happens when it is
            left unmanaged. Each audit output is what the board can show afterwards. The corporate
            language in italics is how we recommend framing it in board papers.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-px bg-border">
          {RISKS.map((r) => {
            const Icon = r.icon
            return (
              <article key={r.n} className="bg-background p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="stat-num text-2xl text-oxblood">{r.n}</span>
                    <div>
                      <h3 className="font-serif text-xl text-ink leading-tight">{r.title}</h3>
                    </div>
                  </div>
                  <Icon className="h-6 w-6 text-gold shrink-0" />
                </div>

                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-oxblood mb-2">
                    Risk managed
                  </div>
                  <p className="text-sm text-ink/80 leading-relaxed">{r.risk}</p>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      Corporate consequence
                    </div>
                    <ul className="space-y-2">
                      {r.consequences.map((c) => (
                        <li key={c} className="flex gap-2 text-[13px] text-ink/75 leading-snug">
                          <AlertTriangle className="h-3.5 w-3.5 text-oxblood mt-0.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      What the audit gives you
                    </div>
                    <ul className="space-y-2">
                      {r.audit.map((a) => (
                        <li key={a} className="flex gap-2 text-[13px] text-ink/75 leading-snug">
                          <CheckCircle2 className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-border">
                  <p className="font-serif text-[15px] italic text-ink/85 leading-snug">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Services ---------- */

function Services() {
  return (
    <section id="services" className="bg-ink text-ivory bg-grain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel light>Service architecture</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-4 text-balance">
            Three offers. One defensible record of action.
          </h2>
          <p className="mt-6 text-ivory/70 leading-relaxed text-pretty">
            Each engagement is scoped to a clear deliverable list and a board-readable promise. We
            do not begin work we cannot evidence.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article
              key={s.n}
              className="border border-ink-line bg-ink-soft/40 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="stat-num text-2xl text-gold-soft">{s.n}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ivory/50 border border-ivory/20 px-2 py-1">
                  {s.tag}
                </span>
              </div>
              <h3 className="font-serif text-xl leading-tight">{s.title}</h3>
              <p className="mt-4 text-sm text-ivory/75 leading-relaxed italic">
                &ldquo;{s.promise}&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-ink-line">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold-soft mb-3">
                  Deliverables
                </div>
                <ul className="space-y-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2 text-[13px] text-ivory/75 leading-snug">
                      <span className="text-gold-soft mt-0.5">&mdash;</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-ink-line mt-auto">
                <div className="text-[10px] uppercase tracking-[0.2em] text-ivory/50 mb-2">
                  Best audience
                </div>
                <p className="text-[13px] text-ivory/80 leading-relaxed">{s.audience}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 border border-gold/30 bg-ink-soft/40 p-8 grid lg:grid-cols-[auto_1fr_auto] items-center gap-6">
          <Scale className="h-8 w-8 text-gold-soft" />
          <p className="text-sm text-ivory/85 leading-relaxed">
            <span className="text-gold-soft uppercase tracking-[0.18em] text-[11px] block mb-1">
              Safest commercial model
            </span>
            Clinical and operational psychosocial risk audit, delivered with employment-law review
            where required. We do not provide legal advice as a solicitor; we partner with
            employment-law specialists where a formal legal review is needed.
          </p>
          <Button
            asChild
            className="bg-gold text-ink hover:bg-gold-soft rounded-none uppercase tracking-[0.14em] text-[12px]"
          >
            <Link href="#briefing">Scope an engagement</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ---------- Risk Table ---------- */

function RiskTable() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel>Risks we actually manage</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
            From legal non-compliance to operational disruption.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
            A single map of what goes wrong, and the intervention that closes the gap.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-ink text-ivory">
              <tr>
                <th className="text-left p-4 text-[11px] uppercase tracking-[0.18em] text-gold-soft font-medium">
                  Risk
                </th>
                <th className="text-left p-4 text-[11px] uppercase tracking-[0.18em] text-gold-soft font-medium">
                  What goes wrong
                </th>
                <th className="text-left p-4 text-[11px] uppercase tracking-[0.18em] text-gold-soft font-medium">
                  Your intervention
                </th>
              </tr>
            </thead>
            <tbody>
              {RISK_TABLE.map((r, i) => (
                <tr key={r.risk} className={i % 2 ? "bg-ivory-deep/40" : "bg-background"}>
                  <td className="p-4 font-serif text-ink align-top whitespace-nowrap">{r.risk}</td>
                  <td className="p-4 text-muted-foreground align-top leading-relaxed">{r.wrong}</td>
                  <td className="p-4 text-ink align-top leading-relaxed">
                    <span className="text-oxblood font-medium">{r.fix}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ---------- ROI ---------- */

function Roi() {
  const buckets = [
    {
      icon: Gavel,
      title: "Claims cost",
      items: [
        "Tribunal defence and claimant representation",
        "Settlement pressure",
        "Legal fees &mdash; even where the employer ultimately wins",
        "Compensation (uncapped in discrimination; uncapped for unfair dismissal from January 2027)",
      ],
    },
    {
      icon: Activity,
      title: "Workforce cost",
      items: [
        "Sickness absence",
        "Presenteeism &mdash; the largest single bucket at around £24bn nationally",
        "Attrition and lost institutional knowledge",
        "Recruitment, agency cover and longer onboarding",
      ],
    },
    {
      icon: Newspaper,
      title: "Reputation cost",
      items: [
        "Loss of employee trust",
        "Candidate attraction drag",
        "Stakeholder and investor scrutiny",
        "Gap between stated values and provable practice",
      ],
    },
  ]
  return (
    <section id="roi" className="bg-ivory-deep border-y border-border">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel>Commercial ROI</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
            The cost of getting this wrong is not limited to sickness absence.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
            We frame return on investment in three cost buckets. Boards rarely see these aggregated
            on a single page; that is part of the problem.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          {buckets.map((b) => {
            const Icon = b.icon
            return (
              <div key={b.title} className="bg-background border border-border p-8">
                <Icon className="h-7 w-7 text-oxblood" />
                <h3 className="mt-5 font-serif text-xl text-ink">{b.title}</h3>
                <ul className="mt-4 space-y-3">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-2 text-[13px] text-ink/75 leading-snug"
                      dangerouslySetInnerHTML={{ __html: `<span class='text-gold mt-0.5'>&mdash;</span><span>${it}</span>` }}
                    />
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Challenges ---------- */

function Challenges() {
  return (
    <section id="challenges" className="bg-background">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <SectionLabel>What corporate buyers challenge</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
            The five questions a board will ask. The five answers we stand behind.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 border-t border-border">
          {CHALLENGES.map((c, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left font-serif text-lg text-ink hover:no-underline py-6">
                {c.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-6 pr-8">
                {c.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

/* ---------- One-page corporate message ---------- */

function OnePageMessage() {
  return (
    <section className="bg-ink text-ivory bg-grain">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-20 lg:py-28">
        <SectionLabel light>One-page corporate message</SectionLabel>
        <h2 className="font-serif text-3xl sm:text-4xl leading-tight mt-4 text-balance">
          The brief, in one screen.
        </h2>

        <div className="mt-12 grid gap-px bg-ink-line">
          <MessageRow label="The risk">
            Employers are exposed when workplace stress, poor leadership, bullying, unmanaged
            workload, trauma exposure, role ambiguity or poor communication are not assessed and
            controlled.
          </MessageRow>
          <MessageRow label="The cost">
            Tribunal and legal claims. Uncapped compensation in relevant discrimination claims and,
            from January 2027, uncapped compensatory awards for unfair dismissal. Absence and
            presenteeism. Staff turnover and re-recruitment cost. Reputational harm. Productivity
            loss. Leadership and governance scrutiny.
          </MessageRow>
          <MessageRow label="The problem">
            Most organisations have policies. Many cannot prove those policies are working in
            practice.
          </MessageRow>
          <MessageRow label="The solution">
            <span className="block mb-2">A forensic audit that tests whether the organisation can evidence that it:</span>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ivory/80">
              <li>&mdash; Identified psychosocial risks</li>
              <li>&mdash; Assessed who may be harmed and how</li>
              <li>&mdash; Took reasonable steps to reduce risk</li>
              <li>&mdash; Trained managers</li>
              <li>&mdash; Supported affected employees</li>
              <li>&mdash; Recorded decisions</li>
              <li>&mdash; Reviewed controls</li>
              <li>&mdash; Escalated concerns appropriately</li>
            </ul>
          </MessageRow>
          <MessageRow label="The outcome" highlight>
            A legally defensible, operationally practical risk-control system that protects
            employees, leaders and the organisation.
          </MessageRow>
        </div>
      </div>
    </section>
  )
}

function MessageRow({
  label,
  children,
  highlight,
}: {
  label: string
  children: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={`grid lg:grid-cols-[200px_1fr] gap-2 lg:gap-8 p-7 ${
        highlight ? "bg-oxblood/20" : "bg-ink-soft/40"
      }`}
    >
      <div
        className={`text-[11px] uppercase tracking-[0.22em] ${
          highlight ? "text-gold-soft" : "text-ivory/50"
        }`}
      >
        {label}
      </div>
      <div className={`text-[15px] leading-relaxed ${highlight ? "text-ivory" : "text-ivory/85"}`}>
        {children}
      </div>
    </div>
  )
}

/* ---------- Founder / Why us ---------- */

function Founder() {
  return (
    <section className="bg-ivory-deep border-y border-border">
      <div className="mx-auto max-w-5xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionLabel>Why Vantage</SectionLabel>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center border-2 border-gold text-gold-soft font-serif text-2xl">
                V
              </div>
              <div>
                <div className="font-serif text-xl text-ink">Vantage Clinical Strategy Ltd</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  Clinical. Operational. Defensible.
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink text-balance">
              A clinical pedigree, applied to corporate psychosocial risk.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] text-muted-foreground leading-relaxed text-pretty">
              <p>
                Our background is in complex health and social care, where unmanaged psychosocial
                risk has real human, operational and regulatory consequences. We have led services
                through major quality improvement, seen the impact of poor leadership on mental
                health, and understand how robust systems, documentation and leadership behaviour
                protect both people and organisations.
              </p>
              <p>
                We do not guarantee that an employer will never be sued &mdash; no credible adviser
                can. What we do is reduce foreseeable risk, improve management practice, and
                strengthen the evidence that the organisation acted reasonably. The corporate
                language we use is deliberate: <span className="text-ink font-medium">legal
                defensibility, foreseeable risk, evidence trail, manager capability, tribunal
                exposure, operational leakage, board assurance, risk controls.</span>
              </p>
              <p>
                We deliberately avoid softer framing &mdash; &ldquo;mental-health training,&rdquo;
                &ldquo;wellbeing support,&rdquo; &ldquo;helping people feel better,&rdquo;
                &ldquo;reducing stress in the workplace&rdquo; &mdash; because in a board context
                those words sound optional, soft and budget-cuttable. The work is the same. The
                framing is what gets it funded and defended.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <Pillar icon={ShieldCheck} title="Forensic" detail="Audit methodology built around evidence gaps and defensibility ratings." />
              <Pillar icon={FileCheck2} title="Documented" detail="Risk register, action plan, evidence tracker, board reporting template." />
              <Pillar icon={RefreshCw} title="Reviewed" detail="30 / 60 / 90-day cycle with follow-up audit and clear ownership." />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pillar({
  icon: Icon,
  title,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  detail: string
}) {
  return (
    <div className="border border-border bg-background p-5">
      <Icon className="h-6 w-6 text-oxblood" />
      <div className="mt-3 font-serif text-base text-ink">{title}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{detail}</div>
    </div>
  )
}

/* ---------- Briefing / Contact ---------- */

function Briefing({
  handleSubmit,
  submitting,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitting: boolean
}) {
  return (
    <section id="briefing" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Request a board briefing</SectionLabel>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight text-ink mt-4 text-balance">
              The output is a defensible record of action.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-pretty">
              A briefing is a 45-minute confidential conversation scoped to your sector, headcount
              and current risk posture. You will leave with a clear view of where your organisation
              is exposed and what an audit would test.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink/80">
              <li className="flex gap-3">
                <ChevronDown className="h-4 w-4 text-gold mt-0.5 rotate-[-90deg]" />
                <span>Scoped to HR Director, CEO, COO or Risk Committee.</span>
              </li>
              <li className="flex gap-3">
                <ChevronDown className="h-4 w-4 text-gold mt-0.5 rotate-[-90deg]" />
                <span>No obligation. No jargon. A clear deliverable list.</span>
              </li>
              <li className="flex gap-3">
                <ChevronDown className="h-4 w-4 text-gold mt-0.5 rotate-[-90deg]" />
                <span>Employment-law review arranged where required.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border border-border bg-ivory-deep/40 p-7 lg:p-9 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.16em]">
                    Full name
                  </Label>
                  <Input id="name" name="name" required className="mt-2 bg-background rounded-none" />
                </div>
                <div>
                  <Label htmlFor="role" className="text-xs uppercase tracking-[0.16em]">
                    Role / title
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    required
                    placeholder="e.g. HR Director, CEO"
                    className="mt-2 bg-background rounded-none"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="org" className="text-xs uppercase tracking-[0.16em]">
                    Organisation
                  </Label>
                  <Input id="org" name="org" required className="mt-2 bg-background rounded-none" />
                </div>
                <div>
                  <Label htmlFor="headcount" className="text-xs uppercase tracking-[0.16em]">
                    Headcount band
                  </Label>
                  <select
                    id="headcount"
                    name="headcount"
                    className="mt-2 w-full h-10 rounded-none border border-input bg-background px-3 text-sm"
                  >
                    <option>1&ndash;4 employees</option>
                    <option>5&ndash;49 employees</option>
                    <option>50&ndash;249 employees</option>
                    <option>250&ndash;999 employees</option>
                    <option>1,000+ employees</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-xs uppercase tracking-[0.16em]">
                  Work email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 bg-background rounded-none"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-xs uppercase tracking-[0.16em]">
                  What would you like the briefing to cover?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="e.g. upcoming tribunal exposure, board assurance on psychosocial risk, manager capability gap&hellip;"
                  className="mt-2 bg-background rounded-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="text-[11px] text-muted-foreground max-w-sm leading-relaxed">
                  By submitting you agree to be contacted by Vantage Clinical Strategy Ltd. We do
                  not provide legal advice as a solicitor; legal review is arranged separately.
                </p>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-ink text-ivory hover:bg-ink-soft rounded-none uppercase tracking-[0.14em] text-[13px] font-medium"
                >
                  {submitting ? "Sending&hellip;" : "Request briefing"}
                  {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */

function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory border-t border-ink-line mt-auto">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-gold/60 text-gold-soft font-serif text-xl">
                V
              </span>
              <div>
                <div className="font-serif text-lg">Vantage Clinical Strategy Ltd</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/60">
                  Psychosocial Risk Audit &middot; Legal Defensibility
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-ivory/65 leading-relaxed max-w-md">
              We reduce exposure, improve compliance evidence, and strengthen defensibility.
              Clinical and operational psychosocial risk audit, delivered with employment-law
              review where required.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft mb-4">
              Site
            </div>
            <ul className="space-y-2 text-sm text-ivory/75">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-gold-soft transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-gold-soft mb-4">
              Important
            </div>
            <p className="text-xs text-ivory/55 leading-relaxed">
              Vantage Clinical Strategy Ltd provides clinical and operational psychosocial risk
              audit services. We do not provide legal advice as a solicitor and we do not guarantee
              that any organisation will not be sued. References to legislation (including the
              Employment Rights Act reforms, tribunal time-limit changes taking effect no earlier
              than October 2026, and from 1 January 2027 reduced unfair-dismissal qualifying
              periods and uncapped compensatory awards) reflect the UK government&rsquo;s April 2026
              implementation update and are provided for general information only. Where formal
              legal review is required we work alongside qualified employment-law partners.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink-line flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-ivory/50">
          <div>&copy; {new Date().getFullYear()} Vantage Clinical Strategy Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <span>Registered in England &amp; Wales</span>
            <span>UK employers only</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Small shared ---------- */

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${light ? "bg-gold" : "bg-oxblood"}`} />
      <span
        className={`text-[11px] uppercase tracking-[0.24em] ${
          light ? "text-gold-soft" : "text-oxblood"
        }`}
      >
        {children}
      </span>
    </div>
  )
}
