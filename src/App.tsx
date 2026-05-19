import { useState } from "react";
import { Droplet, Stethoscope, Activity, ChevronRight, ChevronLeft, Menu, X, Check } from "lucide-react";
import { supabase } from "./lib/supabase";

const RED = "#C62828";

// ── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED }}>
            <Droplet className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">LifeLine</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "About"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#waitlist" className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90" style={{ backgroundColor: RED }}>
            Download App
          </a>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 px-4 py-4 space-y-3 bg-white">
          {["Features", "How It Works", "About"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-600 py-1">
              {l}
            </a>
          ))}
          <a href="#waitlist" onClick={() => setOpen(false)} className="block text-sm font-semibold text-white text-center px-4 py-2.5 rounded-lg mt-2" style={{ backgroundColor: RED }}>
            Download App
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${RED} 0%, #b71c1c 100%)` }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-medium">Available across India</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Save a life.<br />Find a doctor.<br />
          <span className="text-white/80">Right now.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          LifeLine connects blood donors with people who need them — and makes booking a doctor appointment effortless. One platform for India's real healthcare emergencies.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#waitlist" className="inline-flex items-center justify-center gap-2 bg-white font-bold px-8 py-4 rounded-xl text-base transition-opacity hover:opacity-90" style={{ color: RED }}>
            Join the Waitlist <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features" className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-8 py-4 rounded-xl text-base border border-white/30 hover:bg-white/25 transition-colors">
            See How It Works
          </a>
        </div>
        <p className="mt-6 text-white/60 text-sm">Free for donors · Verified doctors · Trusted platform</p>
      </div>
    </section>
  );
}

// ── Health Camp Carousel ──────────────────────────────────────────────────────

const CAMPS = [
  { label: "Free Blood Camp", loc: "Apollo Hospital, Mumbai", date: "Jun 15", color: "from-red-700 to-red-900" },
  { label: "Health Screening Camp", loc: "KEM Hospital, Pune", date: "Jun 22", color: "from-rose-700 to-rose-900" },
  { label: "Thalassemia Awareness Drive", loc: "AIIMS, New Delhi", date: "Jul 1", color: "from-red-800 to-pink-900" },
];

function CampCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + CAMPS.length) % CAMPS.length);
  const next = () => setIdx((i) => (i + 1) % CAMPS.length);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Upcoming Health Camps</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className={`bg-gradient-to-br ${CAMPS[idx].color} rounded-2xl p-8 text-white min-h-[160px] flex flex-col justify-between`}>
            <div>
              <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Health Camp</span>
              <h3 className="text-2xl font-bold mt-2">{CAMPS[idx].label}</h3>
              <p className="text-white/80 mt-1">{CAMPS[idx].loc}</p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-medium">{CAMPS[idx].date}</span>
              <span className="text-white/60 text-sm">Register Free →</span>
            </div>
          </div>
          <button onClick={prev} className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={next} className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex gap-2 justify-center mt-5">
            {CAMPS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-2 bg-red-600" : "w-2 h-2 bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Feature Cards ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <Droplet className="w-7 h-7" style={{ color: RED }} />,
    title: "Blood Donation Matching",
    desc: "Geo-location matching connects requesters with nearby verified donors in hours — not days. Emergency wave alerts reach all available donors in your city instantly.",
  },
  {
    icon: <Stethoscope className="w-7 h-7" style={{ color: RED }} />,
    title: "Doctor Appointments",
    desc: "Browse verified doctors by specialty and city. Book same-day appointments with transparent fees. No middlemen, no hidden costs.",
  },
  {
    icon: <Activity className="w-7 h-7" style={{ color: RED }} />,
    title: "Health Tracking",
    desc: "Track your donation history, eligibility countdown, and health milestones. Earn rewards for every life you help save.",
  },
];

function FeatureCards() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need</h2>
          <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">One app for blood emergencies, doctor bookings, and your health journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: "#FFF5F5" }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

const STEPS = [
  { num: "01", title: "Sign up with your phone", desc: "Create your account in 60 seconds using just your phone number. No paperwork." },
  { num: "02", title: "Request blood or book a doctor", desc: "Raise a blood request with your blood group and location, or browse verified doctors near you." },
  { num: "03", title: "Get matched instantly", desc: "Our wave alert system notifies available donors in expanding radius. You get a confirmed match fast." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-3 text-lg">Up and running in under 2 minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-red-100" />
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white mb-5 z-10 shadow-lg" style={{ backgroundColor: RED }}>
                {s.num}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Waitlist Form ─────────────────────────────────────────────────────────────

function WaitlistForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setStatus("loading");
    setError("");
    const { error: sbError } = await supabase.from("waitlist").insert({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    if (sbError) {
      setStatus("error");
      setError(sbError.code === "23505" ? "You're already on the waitlist!" : "Something went wrong. Please try again.");
    } else {
      setStatus("success");
    }
  };

  return (
    <section id="waitlist" className="py-20 bg-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: RED }}>
          <Droplet className="w-7 h-7 text-white fill-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Join the Waitlist</h2>
        <p className="text-gray-500 mt-3 mb-10 text-lg">Be the first to know when LifeLine launches in your city.</p>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800">You're on the list!</h3>
            <p className="text-green-700 mt-2">We'll reach out when LifeLine launches near you.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-red-400 transition-colors"
            />
            <input
              type="tel" placeholder="Phone Number (+91...)" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-red-400 transition-colors"
            />
            <input
              type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm outline-none focus:border-red-400 transition-colors"
            />
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            <button
              type="submit" disabled={status === "loading"}
              className="w-full h-12 font-bold text-white rounded-xl text-base transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: RED }}
            >
              {status === "loading" ? "Joining…" : "Join Waitlist →"}
            </button>
            <p className="text-gray-400 text-xs">No spam. Just a launch notification.</p>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: RED }}>
            <Droplet className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-bold text-gray-900">LifeLine</span>
        </div>
        <p className="text-xs text-gray-400 text-center">
          LifeLine is a voluntary donor matching platform — not a blood bank or medical service provider.
        </p>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} LifeLine</p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <CampCarousel />
      <FeatureCards />
      <HowItWorks />
      <WaitlistForm />
      <Footer />
    </>
  );
}
