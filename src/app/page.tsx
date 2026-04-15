import React from 'react';
import Link from 'next/link';
import {
  FiEdit3,
  FiEye,
  FiDownload,
  FiLayout,
  FiZap,
  FiSmartphone,
  FiArrowRight,
  FiGithub,
} from 'react-icons/fi';

const features = [
  {
    icon: <FiEdit3 size={24} />,
    title: 'Smart Form Builder',
    desc: 'Fill in your details through an intuitive multi-step form with real-time validation.',
  },
  {
    icon: <FiEye size={24} />,
    title: 'Live Preview',
    desc: 'See your resume come to life as you type — instant visual feedback.',
  },
  {
    icon: <FiLayout size={24} />,
    title: '3 Pro Templates',
    desc: 'Choose from Modern, Professional, or Minimal — each crafted to impress.',
  },
  {
    icon: <FiDownload size={24} />,
    title: 'PDF Download',
    desc: 'Download your polished resume as a high-quality PDF in one click.',
  },
  {
    icon: <FiZap size={24} />,
    title: 'Auto-Save Drafts',
    desc: 'Your progress is automatically saved locally. Pick up right where you left off.',
  },
  {
    icon: <FiSmartphone size={24} />,
    title: 'Fully Responsive',
    desc: 'Build your resume on any device — desktop, tablet, or mobile.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* ─── Animated Background ─── */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[128px] animate-pulse-slow animation-delay-4000" />
      </div>

      {/* ─── Navbar ─── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/25">
            R
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            ResumeForge
          </span>
        </div>
        <Link
          href="/builder"
          className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
        >
          Get Started
        </Link>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 md:pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 mb-8 backdrop-blur-sm">
          <FiZap className="text-yellow-400" />
          <span>Free & Open Source Resume Builder by Anesh Developer</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl">
          <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
            Build Your Perfect
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Resume in Minutes
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Create stunning, professional resumes with our intuitive builder. Choose from beautiful
          templates, customize colors, and download your resume as a PDF — all for free.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Building
            <FiArrowRight />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            Learn More
          </a>
        </div>

        {/* Mock preview */}
        <div className="mt-20 w-full max-w-5xl">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-slate-500">resumeforge.app/builder</span>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Form mockup */}
              <div className="space-y-4">
                <div className="h-3 w-24 bg-white/10 rounded" />
                <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                  <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
                </div>
                <div className="h-20 bg-white/5 rounded-xl border border-white/10" />
                <div className="h-3 w-16 bg-white/10 rounded" />
                <div className="h-10 bg-white/5 rounded-xl border border-white/10" />
              </div>
              {/* Resume mockup */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="h-6 w-32 bg-indigo-100 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-100 rounded mb-4" />
                <div className="space-y-3">
                  <div className="h-2.5 bg-gray-100 rounded w-full" />
                  <div className="h-2.5 bg-gray-100 rounded w-4/5" />
                  <div className="h-2.5 bg-gray-100 rounded w-3/5" />
                </div>
                <div className="mt-6 h-3 w-20 bg-indigo-100 rounded mb-2" />
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="mt-4 flex gap-1.5">
                  <div className="h-5 w-12 bg-indigo-100 rounded-full" />
                  <div className="h-5 w-14 bg-indigo-100 rounded-full" />
                  <div className="h-5 w-10 bg-indigo-100 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Stand Out
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            A powerful set of features designed to make resume building effortless and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-pink-600/20 border border-white/10 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join thousands who&apos;ve already created their perfect resume. It&apos;s free, fast, and
            incredibly easy.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl text-lg shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Now — It&apos;s Free
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/10 px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              R
            </div>
            <span className="font-semibold">ResumeForge</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ResumeForge. Developed by Anesh Developer with ❤️ using Next.js
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <FiGithub size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
