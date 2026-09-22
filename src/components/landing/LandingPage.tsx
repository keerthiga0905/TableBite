import React, { useState } from 'react';
import {
  QrCode,
  Smartphone,
  ChefHat,
  Sparkles,
  Utensils,
  ArrowRight,
  Grid,
  ChevronRight,
  School,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import heroQrScanImg from '../../assets/qr_scan_hero.jpg';

interface LandingPageProps {
  onLaunchCustomer: (tableNumber?: string) => void;
  onLaunchKitchen: () => void;
  onLaunchAdmin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchCustomer,
  onLaunchKitchen,
  onLaunchAdmin,
}) => {
  const [demoStep, setDemoStep] = useState(0);
  const [heroViewMode, setHeroViewMode] = useState<'illustration' | 'simulator'>('illustration');

  const demoSteps = [
    { title: '01 SCAN TABLE QR', desc: 'Customer sits at Table 04 and scans the QR code on the table stand.', tag: 'Instant Context' },
    { title: '02 DIGITAL MENU OPENS', desc: 'Menu automatically knows Table 04. Browses 26 dishes & Hostel Mess Thalis.', tag: 'No App Install' },
    { title: '03 DIRECT KITCHEN ORDER', desc: 'Order sent instantly to Kitchen/Mess display with preferences ("Less spicy").', tag: '0 Waiter Delay' },
    { title: '04 LIVE PREPARATION TRACKING', desc: 'Customer tracks status (Preparing → Ready → Served) & requests staff/bill with 1 tap.', tag: 'Full Transparency' },
  ];

  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden relative bg-[#FAF7F2]">
      {/* Background Picture with Ambient Light Overlay & High Transparency */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-[0.06] scale-105 transform animate-fade-in"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-white/80 to-[#FAF7F2] pointer-events-none z-0" />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100/80 shadow-xs animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-600 via-amber-600 to-terracotta text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                TB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight text-slate-900">TABLEBITE</span>
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                    Cafes & Hostel Mess
                  </span>
                </div>
                <p className="text-[11px] font-bold text-orange-600 tracking-wider">Sit. Order. Enjoy.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLaunchCustomer('04')}
                className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-950 font-bold text-xs border border-orange-200 flex items-center gap-1.5 transition-all shadow-2xs hover:scale-105 active:scale-95"
              >
                <Smartphone className="w-4 h-4 text-orange-600" />
                <span>Customer App (Table 04)</span>
              </button>

              <button
                onClick={onLaunchKitchen}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <ChefHat className="w-4 h-4 text-amber-400" />
                <span>Kitchen Display</span>
              </button>

              <button
                onClick={onLaunchAdmin}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 flex items-center gap-1.5 transition-all hidden sm:flex hover:scale-105 active:scale-95"
              >
                <Grid className="w-4 h-4 text-purple-600" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </header>

        <section className="relative pt-10 pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 animate-slide-up">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 font-extrabold text-xs shadow-xs">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>Cafe & Hostel Mess QR Ordering</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-xs border border-purple-200">
                  <School className="w-3.5 h-3.5 text-purple-600" />
                  <span>Hostel Canteen Ready</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
                Your Table. <br />
                <span className="text-orange-600">Your Menu.</span> <br />
                Your Order.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                Let customers & hostel students sit at their table or mess bench, scan a QR code, customize food, and place orders directly to the kitchen — without waiting for waiters or standing in long counter queues.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onLaunchCustomer('04')}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-terracotta text-white font-extrabold text-sm shadow-xl shadow-orange-600/30 hover:opacity-95 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Try TableBite Demo</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => onLaunchKitchen()}
                  className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>Open Kitchen Kanban</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-xs">
                <div>
                  <span className="block font-black text-xl text-slate-900">0 Mins</span>
                  <span className="text-slate-500 font-semibold">Waiter Wait Time</span>
                </div>
                <div>
                  <span className="block font-black text-xl text-slate-900">Cafes + Hostels</span>
                  <span className="text-slate-500 font-semibold">Multi-Tenant Setup</span>
                </div>
                <div>
                  <span className="block font-black text-xl text-slate-900">Realtime</span>
                  <span className="text-slate-500 font-semibold">Kitchen & Mess Sync</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Image Showcase & Interactive Simulator */}
            <div className="lg:col-span-6 relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-tr from-orange-400/20 via-amber-300/20 to-rose-400/20 rounded-[3rem] blur-2xl -z-10 animate-pulse-slow"></div>

              <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-2xl space-y-4 relative overflow-hidden">
                {/* View Switcher Tabs */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
                    <button
                      onClick={() => setHeroViewMode('illustration')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        heroViewMode === 'illustration'
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR Dining View</span>
                    </button>

                    <button
                      onClick={() => setHeroViewMode('simulator')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        heroViewMode === 'simulator'
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Table 04 Simulator</span>
                    </button>
                  </div>

                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Experience
                  </span>
                </div>

                {heroViewMode === 'illustration' ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="relative rounded-2xl overflow-hidden group shadow-lg border border-slate-100">
                      <img
                        src={heroQrScanImg}
                        alt="Customers scanning table QR stand"
                        className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                            Instant QR Table Context
                          </span>
                          <span className="bg-amber-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            No App Install Required
                          </span>
                        </div>
                        <h4 className="font-black text-lg text-white">Sit. Scan. Order directly from Table.</h4>
                        <p className="text-slate-200 text-xs">Customer scans QR stand → Menu opens instantly → Sent to Kitchen/Mess display</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200/80 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                          <Coffee className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">Cafe & Bistros</span>
                          <span className="text-slate-500 text-[11px]">Table QR ordering</span>
                        </div>
                      </div>

                      <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-200/80 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                          <School className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">Hostels & Mess</span>
                          <span className="text-slate-500 text-[11px]">Mess thali & late canteen</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-slate-950 text-white p-5 rounded-2xl space-y-4 shadow-inner">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-amber-400 font-black tracking-wider uppercase">{demoSteps[demoStep].tag}</span>
                        <span className="text-slate-400 font-mono">Step {demoStep + 1} of 4</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-white">{demoSteps[demoStep].title}</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">{demoSteps[demoStep].desc}</p>
                      </div>

                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                          style={{ width: `${((demoStep + 1) / 4) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => setDemoStep((prev) => (prev > 0 ? prev - 1 : 3))}
                          className="text-xs text-slate-400 hover:text-white font-bold transition-colors"
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={() => setDemoStep((prev) => (prev < 3 ? prev + 1 : 0))}
                          className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"
                          alt="Hostel Special Thali"
                          className="w-14 h-14 rounded-2xl object-cover shadow-sm transition-transform hover:scale-105"
                        />
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">Hostel Mess Deluxe Thali</h5>
                          <p className="text-slate-500 text-xs">Paneer • Dal • 3 Roti • Jamun</p>
                          <span className="text-orange-600 font-extrabold text-xs">₹120</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onLaunchCustomer('04')}
                        className="px-3 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
                      >
                        Test Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white/95 backdrop-blur-xl border-y border-amber-100 px-6 animate-fade-in">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">WHY TABLEBITE?</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Transforming Cafe Dining Experience</h2>
              <p className="text-slate-500 text-sm">
                Eliminate order bottlenecks, waiter delays, miscommunication, and counter long queues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-rose-50/80 backdrop-blur-sm p-6 rounded-3xl border border-rose-200/80 space-y-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                  <span className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-black">✕</span>
                  <span>Traditional Cafe Ordering Problems</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Customers wait repeatedly for waiters to take or modify orders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Waiters frequently forget or misunderstand special dietary requests.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Counter queues become overwhelming during peak rush hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>Customers have zero visibility into order preparation progress.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50/80 backdrop-blur-sm p-6 rounded-3xl border border-emerald-200/80 space-y-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black">✓</span>
                  <span>The TABLEBITE Solution</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Instant QR scan auto-identifies table context without app downloads.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Precise customization options and special instructions sent directly to kitchen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Real-time Kitchen Kanban board ensures zero order mix-ups.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>Live visual order timeline keeps customers relaxed and updated.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">SIMPLE 4-STEP WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-sm">How TABLEBITE Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'SCAN', desc: 'Scan the unique QR code on your cafe table stand.', icon: QrCode },
              { step: '02', title: 'BROWSE', desc: 'Explore rich photos, categories, and dietary tags.', icon: Smartphone },
              { step: '03', title: 'ORDER', desc: 'Customize toppings, portions & send directly to kitchen.', icon: Utensils },
              { step: '04', title: 'ENJOY', desc: 'Track live cooking status and receive fresh hot food.', icon: Sparkles },
            ].map((s, idx) => {
              const Icon = s.icon;
              return (
                <div 
                  key={s.step} 
                  className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-lg space-y-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-orange-600 font-mono">{s.step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{s.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white px-6 border-t border-slate-800">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider animate-pulse">
                Live Interactive Demo Suite
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">Experience All Three Roles Live</h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Test end-to-end ordering across Customer Table 04, Kitchen Kanban Display, and Cafe Owner Admin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div
                onClick={() => onLaunchCustomer('04')}
                className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-orange-500 cursor-pointer transition-all hover:-translate-y-1.5 duration-300 group space-y-3 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-600/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white group-hover:text-orange-400 transition-colors">
                  1. Customer Experience
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Simulate Table 04 scan, browse 26 dishes, customize, place order, and track status.</p>
                <span className="text-xs text-orange-400 font-bold flex items-center gap-1 pt-2">
                  Launch Table 04 Customer App →
                </span>
              </div>

              <div
                onClick={() => onLaunchKitchen()}
                className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-amber-500 cursor-pointer transition-all hover:-translate-y-1.5 duration-300 group space-y-3 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
                  2. Kitchen Display (KDS)
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Realtime Kanban (New → Preparing → Ready → Served), sound alerts, and staff requests.</p>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1 pt-2">
                  Launch Kitchen Kanban →
                </span>
              </div>

              <div
                onClick={() => onLaunchAdmin()}
                className="bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-slate-800 hover:border-purple-500 cursor-pointer transition-all hover:-translate-y-1.5 duration-300 group space-y-3 shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Grid className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-white group-hover:text-purple-400 transition-colors">
                  3. Admin & QR Generator
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Analytics charts, table QR card generator, batch printable sheets, and menu CRUD.</p>
                <span className="text-xs text-purple-400 font-bold flex items-center gap-1 pt-2">
                  Launch Admin Panel →
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-white/90 backdrop-blur-md border-t border-slate-200 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900">TABLEBITE</span>
              <span>• Sit. Order. Enjoy.</span>
            </div>
            <p>© 2026 TABLEBITE Digital Cafe Platform. Multi-Tenant Table Context Aware System.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

