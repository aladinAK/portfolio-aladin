"use client"

import { Cpu, Zap, Globe, Shield, ChevronRight } from "lucide-react"

export function TechSection() {
  return (
    <div className="section-tech min-h-[300vh]" style={{ backgroundColor: "var(--section-bg)", color: "var(--section-fg)" }}>
      {/* Hero */}
      <section className="h-screen flex flex-col justify-between p-6 md:p-12 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(var(--section-accent) 1px, transparent 1px), linear-gradient(90deg, var(--section-accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--section-accent)" }}>
              <Cpu className="w-5 h-5" style={{ color: "var(--section-bg)" }} />
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="hover:text-[var(--section-accent)] transition-colors">Products</a>
            <a href="#" className="hover:text-[var(--section-accent)] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[var(--section-accent)] transition-colors">Developers</a>
            <a href="#" className="hover:text-[var(--section-accent)] transition-colors">About</a>
          </div>
          <button className="px-4 py-2 text-sm font-medium rounded-lg transition-colors" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
            Get Started
          </button>
        </nav>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6" style={{ backgroundColor: "var(--section-muted)", color: "var(--section-accent)" }}>
              <Zap className="w-3 h-3" />
              <span>Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              THE FUTURE
              <br />
              IS <span style={{ color: "var(--section-accent)" }}>NOW</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-xl opacity-70">
              Cutting-edge technology solutions that transform how businesses operate. Scale faster. Build smarter.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <button className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-transform hover:scale-105" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
                Start Building <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 rounded-lg font-medium border transition-colors hover:bg-[var(--section-muted)]" style={{ borderColor: "var(--section-accent)", color: "var(--section-accent)" }}>
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {["99.9% Uptime", "50ms Latency", "256-bit Encryption"].map((stat, i) => (
              <div key={i} className="text-sm opacity-70 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--section-accent)" }}></div>
                {stat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="min-h-screen p-6 md:p-12">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--section-accent)" }}>Platform</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Built for Scale</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Cpu, title: "AI-Powered", desc: "Machine learning at the core of every decision" },
            { icon: Zap, title: "Lightning Fast", desc: "Sub-millisecond response times globally" },
            { icon: Globe, title: "Global Edge", desc: "Deployed across 200+ data centers" },
            { icon: Shield, title: "Enterprise Security", desc: "SOC 2 Type II compliant infrastructure" },
          ].map((feature, i) => (
            <div key={i} className="group p-6 rounded-xl transition-all hover:scale-105" style={{ backgroundColor: "var(--section-muted)" }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-[var(--section-accent)]" style={{ backgroundColor: "rgba(0, 212, 255, 0.1)" }}>
                <feature.icon className="w-6 h-6 group-hover:text-[var(--section-bg)]" style={{ color: "var(--section-accent)" }} />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-70">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { value: "10M+", label: "API Requests/day" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "500+", label: "Enterprise Clients" },
            { value: "<50ms", label: "Global Latency" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--section-muted)" }}>
              <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--section-accent)" }}>{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Code Preview */}
      <section className="min-h-screen p-6 md:p-12 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: "var(--section-accent)" }}>Developer Experience</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Build in Minutes</h2>
            <p className="text-lg opacity-70 mb-8">
              Our intuitive APIs and SDKs let you integrate powerful AI capabilities with just a few lines of code.
            </p>
            <ul className="space-y-4">
              {["RESTful & GraphQL APIs", "SDKs for all major languages", "Real-time webhooks", "Comprehensive documentation"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--section-accent)", color: "var(--section-bg)" }}>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6 font-mono text-sm overflow-hidden" style={{ backgroundColor: "var(--section-muted)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="text-xs md:text-sm overflow-x-auto">
              <code>
{`import { Nexus } from '@nexus/sdk'

const client = new Nexus({
  apiKey: process.env.NEXUS_API_KEY
})

// Generate AI-powered insights
const result = await client.analyze({
  data: userBehavior,
  model: 'insight-v2'
})

console.log(result.predictions)`}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm opacity-50 mb-4">SWIPE RIGHT FOR NEXT SECTION</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--section-accent)" }}></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
