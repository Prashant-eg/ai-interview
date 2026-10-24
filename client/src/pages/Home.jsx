
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   ArrowDownRight,
//   ArrowRight,
//   ArrowUpRight,
//   AudioLines,
//   BrainCircuit,
//   Check,
//   ChevronDown,
//   CirclePlay,
//   Clock3,
//   Code2,
//   FileText,
//   Menu,
//   MessageSquareText,
//   Mic2,
//   ShieldCheck,
//   Sparkles,
//   Target,
//   TrendingUp,
//   Users,
//   X,
//   Zap,
// } from "lucide-react";
// import "../index.css";

// const features = [
//   {
//     icon: BrainCircuit,
//     title: "AI-powered questions",
//     text: "Practice with role-specific questions that adapt to your experience and goals.",
//     tone: "violet",
//   },
//   {
//     icon: MessageSquareText,
//     title: "Real-time feedback",
//     text: "Understand what you did well and where you can make your answers stronger.",
//     tone: "blue",
//   },
//   {
//     icon: TrendingUp,
//     title: "Track your progress",
//     text: "See your scores, identify patterns, and turn every practice into progress.",
//     tone: "green",
//   },
//   {
//     icon: Mic2,
//     title: "Practice your way",
//     text: "Prepare for technical, behavioral, HR, and role-specific interviews.",
//     tone: "orange",
//   },
// ];

// const steps = [
//   {
//     number: "01",
//     title: "Choose your role",
//     text: "Tell us your target job, experience level, and the skills you want to practice.",
//   },
//   {
//     number: "02",
//     title: "Start your interview",
//     text: "Answer realistic interview questions at your own pace in a focused environment.",
//   },
//   {
//     number: "03",
//     title: "Learn and improve",
//     text: "Review your feedback and build a smarter plan for your next interview.",
//   },
// ];

// const faqs = [
//   {
//     question: "What is InterviewAI?",
//     answer:
//       "InterviewAI is an interview practice platform designed to help you prepare for job interviews, review your answers, and identify areas for improvement.",
//   },
//   {
//     question: "Can I practice for different job roles?",
//     answer:
//       "Yes. You can prepare for technical, HR, behavioral, and other role-specific interviews.",
//   },
//   {
//     question: "Do I need interview experience?",
//     answer:
//       "Not at all. Students, freshers, and experienced professionals can all use practice sessions to build confidence.",
//   },
//   {
//     question: "Are AI feedback and reports available now?",
//     answer:
//       "AI feedback and reports depend on your backend and AI service configuration. This landing page itself is the website frontend.",
//   },
// ];

// function Logo() {
//   return (
//     <a className="brand" href="#home" aria-label="InterviewAI home">
//       <span className="brand-mark">
//         <AudioLines size={21} strokeWidth={2.4} />
//       </span>
//       <span>
//         interview<span className="brand-accent">ai</span>
//       </span>
//     </a>
//   );
// }

// function SectionHeading({ eyebrow, title, text, center = false }) {
//   return (
//     <div className={`section-heading ${center ? "center" : ""}`}>
//       <span className="eyebrow">
//         <Sparkles size={14} /> {eyebrow}
//       </span>
//       <h2>{title}</h2>
//       <p>{text}</p>
//     </div>
//   );
// }

// function DashboardPreview() {
//   const bars = [32, 46, 39, 59, 48, 68, 57, 77, 62, 88, 73, 96];

//   return (
//     <div className="preview-shell">
//       <div className="preview-top">
//         <div className="window-dots">
//           <i />
//           <i />
//           <i />
//         </div>
//         <span className="preview-label">YOUR PRACTICE SPACE</span>
//         <span className="live-pill">
//           <span /> Preview
//         </span>
//       </div>

//       <div className="preview-body">
//         <aside className="preview-sidebar">
//           <div className="mini-brand">
//             <AudioLines size={19} />
//           </div>
//           <span className="side-active">
//             <Target size={17} />
//           </span>
//           <span>
//             <TrendingUp size={17} />
//           </span>
//           <span>
//             <FileText size={17} />
//           </span>
//         </aside>

//         <div className="preview-content">
//           <div className="preview-welcome">
//             <div>
//               <span className="muted-label">YOUR WORKSPACE</span>
//               <h3>Keep getting better.</h3>
//               <p>Every practice is a step forward.</p>
//             </div>
//             <span className="avatar">P</span>
//           </div>

//           <div className="preview-stats">
//             <div className="stat-card">
//               <span>Practice sessions</span>
//               <strong>
//                 08 <ArrowUpRight size={15} />
//               </strong>
//               <small>Keep the momentum going</small>
//             </div>
//             <div className="stat-card">
//               <span>Latest score</span>
//               <strong>
//                 82<span className="score-unit">/100</span>
//               </strong>
//               <small className="positive">
//                 <TrendingUp size={12} /> Example score
//               </small>
//             </div>
//           </div>

//           <div className="chart-card">
//             <div className="chart-header">
//               <div>
//                 <strong>Your practice journey</strong>
//                 <p>Illustrative chart preview</p>
//               </div>
//               <span className="chart-filter">
//                 Last 12 sessions <ChevronDown size={13} />
//               </span>
//             </div>

//             <div
//               className="bar-chart"
//               aria-label="Illustrative practice progress chart"
//             >
//               {bars.map((height, index) => (
//                 <div className="bar-column" key={index}>
//                   <span
//                     className={`chart-bar ${
//                       index === bars.length - 1 ? "highlight-bar" : ""
//                     }`}
//                     style={{ height: `${height}%` }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="chart-axis">
//               <span>Session 1</span>
//               <span>Session 12</span>
//             </div>
//           </div>

//           <div className="preview-bottom">
//             <div className="mini-tip-icon">
//               <Sparkles size={16} />
//             </div>
//             <div>
//               <strong>Your next step</strong>
//               <p>Practice explaining your problem-solving process.</p>
//             </div>
//             <ArrowRight size={17} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openFaq, setOpenFaq] = useState(0);
//   const [selectedPlan, setSelectedPlan] = useState("Monthly");
//   const [notice, setNotice] = useState("");

//   function handleStart() {
//     navigate("/register");
//   }

//   function showNotice(message) {
//     setNotice(message);
//     window.setTimeout(() => setNotice(""), 3500);
//   }

//   function closeMenu() {
//     setMenuOpen(false);
//   }

//   return (
//     <div className="site-wrapper" id="home">
//       <div className="announcement">
//         <Sparkles size={14} />
//         <span>A better way to prepare for your next interview.</span>
//         <a href="#how-it-works">
//           See how it works <ArrowRight size={13} />
//         </a>
//       </div>

//       <header className="site-header">
//         <div className="container nav-inner">
//           <Logo />

//           <button
//             className="mobile-menu-button"
//             aria-label={menuOpen ? "Close menu" : "Open menu"}
//             aria-expanded={menuOpen}
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={23} /> : <Menu size={23} />}
//           </button>

//           <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
//             <a href="#features" onClick={closeMenu}>Features</a>
//             <a href="#how-it-works" onClick={closeMenu}>How it works</a>
//             <a href="#pricing" onClick={closeMenu}>Pricing</a>
//             <a href="#faq" onClick={closeMenu}>FAQ</a>

//             <div className="mobile-nav-actions">
//               <button
//                 className="button button-light"
//                 onClick={() => {
//                   closeMenu();
//                   navigate("/login");
//                 }}
//               >
//                 Log in
//               </button>
//               <button
//                 className="button button-primary"
//                 onClick={() => {
//                   closeMenu();
//                   handleStart();
//                 }}
//               >
//                 Get started <ArrowRight size={16} />
//               </button>
//             </div>
//           </nav>

//           <div className="nav-actions">
//             <button
//               className="login-link"
//               onClick={() => navigate("/login")}
//             >
//               Log in
//             </button>
//             <button
//               className="button button-primary nav-cta"
//               onClick={handleStart}
//             >
//               Get started <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </header>

//       <main>
//         <section className="hero-section">
//           <div className="hero-orb orb-one" />
//           <div className="hero-orb orb-two" />

//           <div className="container hero-grid">
//             <div className="hero-copy">
//               <div className="hero-badge">
//                 <span className="badge-sparkle">
//                   <Sparkles size={14} />
//                 </span>
//                 YOUR NEXT OPPORTUNITY STARTS HERE
//               </div>

//               <h1>
//                 Practice smarter.
//                 <br />
//                 Interview <span>better.</span>
//               </h1>

//               <p className="hero-description">
//                 Show up with confidence. Practice realistic interviews,
//                 sharpen your answers, and get ready for the opportunity you
//                 deserve.
//               </p>

//               <div className="hero-actions">
//                 <button
//                   className="button button-primary button-large"
//                   onClick={handleStart}
//                 >
//                   Start practicing <ArrowUpRight size={18} />
//                 </button>

//                 <a className="text-link" href="#how-it-works">
//                   <CirclePlay size={19} /> See how it works
//                 </a>
//               </div>

//               <div className="hero-trust">
//                 <div className="trust-icons">
//                   <span>P</span>
//                   <span>A</span>
//                   <span>J</span>
//                   <span>+</span>
//                 </div>
//                 <div>
//                   <strong>Built for your growth</strong>
//                   <small>Students, freshers & professionals</small>
//                 </div>
//               </div>

//               <div className="hero-divider" />

//               <div className="hero-benefits">
//                 <span><Check size={15} /> Practice at your pace</span>
//                 <span><Check size={15} /> Actionable feedback</span>
//                 <span><Check size={15} /> Clear next steps</span>
//               </div>
//             </div>

//             <div className="hero-visual">
//               <div className="visual-glow" />

//               <div className="floating-note note-top">
//                 <span className="note-icon"><Zap size={16} /></span>
//                 <span>
//                   <strong>Practice with purpose</strong>
//                   <small>One step at a time</small>
//                 </span>
//               </div>

//               <DashboardPreview />

//               <div className="floating-note note-bottom">
//                 <span className="note-score">82</span>
//                 <span>
//                   <strong>Keep improving</strong>
//                   <small>Illustrative score preview</small>
//                 </span>
//                 <ArrowUpRight size={17} />
//               </div>
//             </div>
//           </div>

//           <div className="container hero-bottom">
//             <span>YOUR PREPARATION TOOLKIT</span>
//             <div><Code2 size={17} /> Technical interviews</div>
//             <div><Users size={17} /> Behavioral rounds</div>
//             <div><MessageSquareText size={17} /> HR conversations</div>
//             <div><Target size={17} /> Role-specific practice</div>
//           </div>
//         </section>

//         <section className="features-section section-pad" id="features">
//           <div className="container">
//             <SectionHeading
//               eyebrow="MADE FOR YOUR NEXT STEP"
//               title={<>Less guessing.<br /><span className="text-gradient">More growing.</span></>}
//               text="A focused space to prepare, practice, and understand how to improve — without the pressure of a real interview."
//               center
//             />

//             <div className="feature-grid">
//               {features.map(({ icon: Icon, title, text, tone }, index) => (
//                 <article className="feature-card" key={title}>
//                   <div className={`feature-icon ${tone}`}>
//                     <Icon size={22} />
//                   </div>
//                   <span className="feature-number">0{index + 1}</span>
//                   <h3>{title}</h3>
//                   <p>{text}</p>
//                   <a href="#how-it-works" className="feature-link">
//                     Explore feature <ArrowUpRight size={15} />
//                   </a>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="how-section section-pad" id="how-it-works">
//           <div className="container how-grid">
//             <div className="how-copy">
//               <SectionHeading
//                 eyebrow="SIMPLE BY DESIGN"
//                 title={<>From preparation<br />to <span className="text-gradient">confidence.</span></>}
//                 text="A clear process that helps you spend less time wondering what to do and more time getting ready."
//               />

//               <div className="steps-list">
//                 {steps.map((step) => (
//                   <div className="step-row" key={step.number}>
//                     <div className="step-number">{step.number}</div>
//                     <div>
//                       <h3>{step.title}</h3>
//                       <p>{step.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 className="button button-primary"
//                 onClick={handleStart}
//               >
//                 Try the practice flow <ArrowRight size={16} />
//               </button>
//             </div>

//             <div className="interview-card-wrap">
//               <div className="interview-decoration decoration-one" />
//               <div className="interview-decoration decoration-two" />

//               <div className="interview-card">
//                 <div className="interview-card-head">
//                   <span className="interview-status"><span /> PRACTICE SESSION</span>
//                   <span className="session-time"><Clock3 size={14} /> Self-paced</span>
//                 </div>

//                 <div className="interview-person">
//                   <div className="person-avatar"><BrainCircuit size={29} /></div>
//                   <span className="person-wave wave-one" />
//                   <span className="person-wave wave-two" />
//                 </div>

//                 <div className="interview-question-label">
//                   QUESTION 01 · BEHAVIORAL
//                 </div>

//                 <h3>
//                   Tell me about a challenge you solved and what you learned
//                   from it.
//                 </h3>

//                 <p className="question-hint">
//                   <Sparkles size={15} /> Take a moment to organize your
//                   thoughts before answering.
//                 </p>

//                 <div className="answer-placeholder">
//                   <span>Structure your answer here...</span>
//                   <Mic2 size={17} />
//                 </div>

//                 <div className="interview-card-footer">
//                   <span>Practice example</span>
//                   <span>Question 1 of 5</span>
//                 </div>
//               </div>

//               <div className="floating-feedback">
//                 <div className="feedback-check"><Check size={16} /></div>
//                 <div>
//                   <strong>Reflect. Refine. Repeat.</strong>
//                   <small>Make every attempt count.</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="pricing-section section-pad" id="pricing">
//           <div className="container">
//             <SectionHeading
//               eyebrow="STRAIGHTFORWARD PLANS"
//               title={<>Invest in your <span className="text-gradient">next opportunity.</span></>}
//               text="Start with a free experience and choose a plan that fits your preparation needs."
//               center
//             />

//             <div className="billing-switch" role="group" aria-label="Billing period">
//               <button
//                 className={selectedPlan === "Monthly" ? "billing-active" : ""}
//                 onClick={() => setSelectedPlan("Monthly")}
//               >
//                 Monthly
//               </button>
//               <button
//                 className={selectedPlan === "Yearly" ? "billing-active" : ""}
//                 onClick={() => setSelectedPlan("Yearly")}
//               >
//                 Yearly <span>Save more</span>
//               </button>
//             </div>

//             <div className="pricing-grid">
//               <article className="price-card">
//                 <span className="plan-tag">GET STARTED</span>
//                 <h3>Free</h3>
//                 <p>Build a steady practice habit.</p>
//                 <div className="price-value">₹0 <span>/ forever</span></div>

//                 <button className="button button-outline" onClick={handleStart}>
//                   Start for free <ArrowRight size={16} />
//                 </button>

//                 <div className="plan-divider" />
//                 <span className="included-label">WHAT'S INCLUDED</span>

//                 {[
//                   "Interview practice demo",
//                   "Basic preparation guidance",
//                   "Personal practice space",
//                 ].map((item) => (
//                   <div className="plan-feature" key={item}>
//                     <Check size={16} /> {item}
//                   </div>
//                 ))}
//               </article>

//               <article className="price-card price-featured">
//                 <div className="popular-ribbon">
//                   <Sparkles size={13} /> MOST FLEXIBLE
//                 </div>
//                 <span className="plan-tag">FOR SERIOUS PREPARATION</span>
//                 <h3>Pro</h3>
//                 <p>Make each practice count.</p>

//                 <div className="price-value">
//                   {selectedPlan === "Monthly" ? "₹199" : "₹299"}
//                   <span> / month*</span>
//                 </div>

//                 <button
//                   className="button button-primary"
//                   onClick={() =>
//                     showNotice("Paid plans will be activated after billing is implemented.")
//                   }
//                 >
//                   Explore Pro <ArrowRight size={16} />
//                 </button>

//                 <div className="plan-divider" />
//                 <span className="included-label">PLANNED FEATURES</span>

//                 {[
//                   "Expanded interview practice",
//                   "Detailed AI feedback",
//                   "Progress and skill reports",
//                   "Interview history",
//                 ].map((item) => (
//                   <div className="plan-feature" key={item}>
//                     <Check size={16} /> {item}
//                   </div>
//                 ))}

//                 <small className="price-disclaimer">
//                   *Illustrative pricing, not an active offer.
//                 </small>
//               </article>

//               <article className="price-card">
//                 <span className="plan-tag">FOR TEAMS</span>
//                 <h3>Teams</h3>
//                 <p>Support preparation across your team.</p>
//                 <div className="price-value custom-price">Let's talk</div>

//                 <button
//                   className="button button-outline"
//                   onClick={() =>
//                     showNotice("Team enquiries will be enabled when contact functionality is built.")
//                   }
//                 >
//                   Contact us <ArrowRight size={16} />
//                 </button>

//                 <div className="plan-divider" />
//                 <span className="included-label">PLANNED FEATURES</span>

//                 {[
//                   "Team practice workflows",
//                   "Shared progress overview",
//                   "Flexible team onboarding",
//                 ].map((item) => (
//                   <div className="plan-feature" key={item}>
//                     <Check size={16} /> {item}
//                   </div>
//                 ))}
//               </article>
//             </div>

//             <p className="pricing-footnote">
//               <ShieldCheck size={15} /> No payment is processed on this demo landing page.
//             </p>
//           </div>
//         </section>

//         <section className="faq-section section-pad" id="faq">
//           <div className="container faq-grid">
//             <div>
//               <SectionHeading
//                 eyebrow="GOOD QUESTIONS"
//                 title={<>A little more<br /><span className="text-gradient">clarity.</span></>}
//                 text="Here's what you might want to know before getting started."
//               />

//               <div className="faq-contact">
//                 Still have questions?{" "}
//                 <a href="mailto:hello@example.com">
//                   Contact our team <ArrowUpRight size={14} />
//                 </a>
//                 <small>Replace this demo email before launch.</small>
//               </div>
//             </div>

//             <div className="faq-list">
//               {faqs.map((faq, index) => (
//                 <div
//                   className={`faq-item ${openFaq === index ? "faq-open" : ""}`}
//                   key={faq.question}
//                 >
//                   <button
//                     className="faq-question"
//                     onClick={() =>
//                       setOpenFaq(openFaq === index ? -1 : index)
//                     }
//                     aria-expanded={openFaq === index}
//                   >
//                     <span>{faq.question}</span>
//                     <ChevronDown size={19} />
//                   </button>

//                   {openFaq === index && (
//                     <p className="faq-answer">{faq.answer}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="final-cta-section">
//           <div className="container">
//             <div className="final-cta">
//               <div className="cta-orb" />
//               <div className="cta-content">
//                 <span className="cta-eyebrow">
//                   <Sparkles size={14} /> YOUR NEXT CHAPTER
//                 </span>

//                 <h2>
//                   Your next interview
//                   <br />
//                   starts with <span>practice.</span>
//                 </h2>

//                 <p>
//                   Take the first step today. You don't need to be perfect —
//                   you just need to begin.
//                 </p>

//                 <button
//                   className="button button-white"
//                   onClick={handleStart}
//                 >
//                   Start preparing <ArrowUpRight size={17} />
//                 </button>
//               </div>

//               <div className="cta-art" aria-hidden="true">
//                 <BrainCircuit size={118} strokeWidth={0.9} />
//                 <span />
//                 <i />
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="site-footer">
//         <div className="container">
//           <div className="footer-main">
//             <div className="footer-brand-col">
//               <Logo />
//               <p>
//                 A thoughtful space to practice, learn, and show up with
//                 confidence.
//               </p>
//             </div>

//             <div className="footer-col">
//               <strong>Explore</strong>
//               <a href="#features">Features</a>
//               <a href="#how-it-works">How it works</a>
//               <a href="#pricing">Pricing</a>
//             </div>

//             <div className="footer-col">
//               <strong>Resources</strong>
//               <a href="#faq">FAQs</a>
//               <a href="#how-it-works">Getting started</a>
//               <a href="mailto:hello@example.com">
//                 Contact <small>(demo email)</small>
//               </a>
//             </div>

//             <div className="footer-col">
//               <strong>Account</strong>
//               <button onClick={() => navigate("/login")}>Log in</button>
//               <button onClick={handleStart}>Get started</button>
//             </div>
//           </div>

//           <div className="footer-bottom">
//             <span>
//               © {new Date().getFullYear()} InterviewAI. Built for your next step.
//             </span>
//             <span className="footer-note">
//               <ShieldCheck size={14} /> Practice with purpose.
//             </span>
//           </div>
//         </div>
//       </footer>

//       {notice && (
//         <div className="toast-message" role="status">
//           <Sparkles size={17} />
//           <span>{notice}</span>
//           <button
//             aria-label="Dismiss message"
//             onClick={() => setNotice("")}
//           >
//             <X size={16} />
//           </button>
//         </div>
//       )}

//       <a className="back-to-top" href="#home" aria-label="Back to top">
//         <ArrowDownRight size={18} />
//       </a>
//     </div>
//   );
// }
































import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  BrainCircuit,
  Check,
  ChevronDown,
  CirclePlay,
  Clock3,
  Code2,
  FileText,
  Menu,
  MessageSquareText,
  Mic2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import "../index.css";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-powered questions",
    text: "Practice with role-specific questions that adapt to your experience and goals.",
    tone: "violet",
  },
  {
    icon: MessageSquareText,
    title: "Real-time feedback",
    text: "Understand what you did well and where you can make your answers stronger.",
    tone: "blue",
  },
  {
    icon: TrendingUp,
    title: "Track your progress",
    text: "See your scores, identify patterns, and turn every practice into progress.",
    tone: "green",
  },
  {
    icon: Mic2,
    title: "Practice your way",
    text: "Prepare for technical, behavioral, HR, and role-specific interviews.",
    tone: "orange",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your role",
    text: "Tell us your target job, experience level, and the skills you want to practice.",
  },
  {
    number: "02",
    title: "Start your interview",
    text: "Answer realistic interview questions at your own pace in a focused environment.",
  },
  {
    number: "03",
    title: "Learn and improve",
    text: "Review your feedback and build a smarter plan for your next interview.",
  },
];

const faqs = [
  {
    question: "What is InterviewAI?",
    answer:
      "InterviewAI is an interview practice platform designed to help you prepare for job interviews, review your answers, and identify areas for improvement.",
  },
  {
    question: "Can I practice for different job roles?",
    answer:
      "Yes. You can prepare for technical, HR, behavioral, and other role-specific interviews.",
  },
  {
    question: "Do I need interview experience?",
    answer:
      "Not at all. Students, freshers, and experienced professionals can all use practice sessions to build confidence.",
  },
  {
    question: "Are AI feedback and reports available now?",
    answer:
      "AI feedback and reports depend on your backend and AI service configuration. This landing page itself is the website frontend.",
  },
];

function Logo() {
  return (
    <a className="brand" href="#home" aria-label="InterviewAI home">
      <span className="brand-mark">
        <AudioLines size={21} strokeWidth={2.4} />
      </span>
      <span>
        interview<span className="brand-accent">ai</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, text, center = false }) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <span className="eyebrow">
        <Sparkles size={14} /> {eyebrow}
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function DashboardPreview() {
  const bars = [32, 46, 39, 59, 48, 68, 57, 77, 62, 88, 73, 96];

  return (
    <div className="preview-shell">
      <div className="preview-top">
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span className="preview-label">YOUR PRACTICE SPACE</span>
        <span className="live-pill">
          <span /> Preview
        </span>
      </div>

      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="mini-brand">
            <AudioLines size={19} />
          </div>
          <span className="side-active">
            <Target size={17} />
          </span>
          <span>
            <TrendingUp size={17} />
          </span>
          <span>
            <FileText size={17} />
          </span>
        </aside>

        <div className="preview-content">
          <div className="preview-welcome">
            <div>
              <span className="muted-label">YOUR WORKSPACE</span>
              <h3>Keep getting better.</h3>
              <p>Every practice is a step forward.</p>
            </div>
            <span className="avatar">P</span>
          </div>

          <div className="preview-stats">
            <div className="stat-card">
              <span>Practice sessions</span>
              <strong>
                08 <ArrowUpRight size={15} />
              </strong>
              <small>Keep the momentum going</small>
            </div>
            <div className="stat-card">
              <span>Latest score</span>
              <strong>
                82<span className="score-unit">/100</span>
              </strong>
              <small className="positive">
                <TrendingUp size={12} /> Example score
              </small>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <div>
                <strong>Your practice journey</strong>
                <p>Illustrative chart preview</p>
              </div>
              <span className="chart-filter">
                Last 12 sessions <ChevronDown size={13} />
              </span>
            </div>

            <div
              className="bar-chart"
              aria-label="Illustrative practice progress chart"
            >
              {bars.map((height, index) => (
                <div className="bar-column" key={index}>
                  <span
                    className={`chart-bar ${
                      index === bars.length - 1 ? "highlight-bar" : ""
                    }`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="chart-axis">
              <span>Session 1</span>
              <span>Session 12</span>
            </div>
          </div>

          <div className="preview-bottom">
            <div className="mini-tip-icon">
              <Sparkles size={16} />
            </div>
            <div>
              <strong>Your next step</strong>
              <p>Practice explaining your problem-solving process.</p>
            </div>
            <ArrowRight size={17} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [notice, setNotice] = useState("");

  function handleStart() {
    navigate(token ? "/dashboard" : "/register");
  }

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-wrapper" id="home">
      <div className="announcement">
        <Sparkles size={14} />
        <span>A better way to prepare for your next interview.</span>
        <a href="#how-it-works">
          See how it works <ArrowRight size={13} />
        </a>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <Logo />

          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
            <a href="#features" onClick={closeMenu}>Features</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#pricing" onClick={closeMenu}>Pricing</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            {token && (
              <button
                className="login-link"
                onClick={() => {
                  closeMenu();
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </button>
            )}

            <div className="mobile-nav-actions">
              {token ? (
                <button
                  className="button button-primary"
                  onClick={() => {
                    closeMenu();
                    navigate("/dashboard");
                  }}
                >
                  Dashboard <ArrowRight size={16} />
                </button>
              ) : (
                <>
                  <button
                    className="button button-light"
                    onClick={() => {
                      closeMenu();
                      navigate("/login");
                    }}
                  >
                    Log in
                  </button>
                  <button
                    className="button button-primary"
                    onClick={() => {
                      closeMenu();
                      handleStart();
                    }}
                  >
                    Get started <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>
          </nav>

          <div className="nav-actions">
            {token ? (
              <button
                className="button button-primary nav-cta"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard <ArrowRight size={16} />
              </button>
            ) : (
              <>
                <button
                  className="login-link"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button
                  className="button button-primary nav-cta"
                  onClick={handleStart}
                >
                  Get started <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="badge-sparkle">
                  <Sparkles size={14} />
                </span>
                YOUR NEXT OPPORTUNITY STARTS HERE
              </div>

              <h1>
                Practice smarter.
                <br />
                Interview <span>better.</span>
              </h1>

              <p className="hero-description">
                Show up with confidence. Practice realistic interviews,
                sharpen your answers, and get ready for the opportunity you
                deserve.
              </p>

              <div className="hero-actions">
                <button
                  className="button button-primary button-large"
                  onClick={handleStart}
                >
                  Start practicing <ArrowUpRight size={18} />
                </button>

                <a className="text-link" href="#how-it-works">
                  <CirclePlay size={19} /> See how it works
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-icons">
                  <span>P</span>
                  <span>A</span>
                  <span>J</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Built for your growth</strong>
                  <small>Students, freshers & professionals</small>
                </div>
              </div>

              <div className="hero-divider" />

              <div className="hero-benefits">
                <span><Check size={15} /> Practice at your pace</span>
                <span><Check size={15} /> Actionable feedback</span>
                <span><Check size={15} /> Clear next steps</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-glow" />

              <div className="floating-note note-top">
                <span className="note-icon"><Zap size={16} /></span>
                <span>
                  <strong>Practice with purpose</strong>
                  <small>One step at a time</small>
                </span>
              </div>

              <DashboardPreview />

              <div className="floating-note note-bottom">
                <span className="note-score">82</span>
                <span>
                  <strong>Keep improving</strong>
                  <small>Illustrative score preview</small>
                </span>
                <ArrowUpRight size={17} />
              </div>
            </div>
          </div>

          <div className="container hero-bottom">
            <span>YOUR PREPARATION TOOLKIT</span>
            <div><Code2 size={17} /> Technical interviews</div>
            <div><Users size={17} /> Behavioral rounds</div>
            <div><MessageSquareText size={17} /> HR conversations</div>
            <div><Target size={17} /> Role-specific practice</div>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="container">
            <SectionHeading
              eyebrow="MADE FOR YOUR NEXT STEP"
              title={<>Less guessing.<br /><span className="text-gradient">More growing.</span></>}
              text="A focused space to prepare, practice, and understand how to improve — without the pressure of a real interview."
              center
            />

            <div className="feature-grid">
              {features.map(({ icon: Icon, title, text, tone }, index) => (
                <article className="feature-card" key={title}>
                  <div className={`feature-icon ${tone}`}>
                    <Icon size={22} />
                  </div>
                  <span className="feature-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href="#how-it-works" className="feature-link">
                    Explore feature <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="container how-grid">
            <div className="how-copy">
              <SectionHeading
                eyebrow="SIMPLE BY DESIGN"
                title={<>From preparation<br />to <span className="text-gradient">confidence.</span></>}
                text="A clear process that helps you spend less time wondering what to do and more time getting ready."
              />

              <div className="steps-list">
                {steps.map((step) => (
                  <div className="step-row" key={step.number}>
                    <div className="step-number">{step.number}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="button button-primary"
                onClick={handleStart}
              >
                Try the practice flow <ArrowRight size={16} />
              </button>
            </div>

            <div className="interview-card-wrap">
              <div className="interview-decoration decoration-one" />
              <div className="interview-decoration decoration-two" />

              <div className="interview-card">
                <div className="interview-card-head">
                  <span className="interview-status"><span /> PRACTICE SESSION</span>
                  <span className="session-time"><Clock3 size={14} /> Self-paced</span>
                </div>

                <div className="interview-person">
                  <div className="person-avatar"><BrainCircuit size={29} /></div>
                  <span className="person-wave wave-one" />
                  <span className="person-wave wave-two" />
                </div>

                <div className="interview-question-label">
                  QUESTION 01 · BEHAVIORAL
                </div>

                <h3>
                  Tell me about a challenge you solved and what you learned
                  from it.
                </h3>

                <p className="question-hint">
                  <Sparkles size={15} /> Take a moment to organize your
                  thoughts before answering.
                </p>

                <div className="answer-placeholder">
                  <span>Structure your answer here...</span>
                  <Mic2 size={17} />
                </div>

                <div className="interview-card-footer">
                  <span>Practice example</span>
                  <span>Question 1 of 5</span>
                </div>
              </div>

              <div className="floating-feedback">
                <div className="feedback-check"><Check size={16} /></div>
                <div>
                  <strong>Reflect. Refine. Repeat.</strong>
                  <small>Make every attempt count.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section section-pad" id="pricing">
          <div className="container">
            <SectionHeading
              eyebrow="STRAIGHTFORWARD PLANS"
              title={<>Invest in your <span className="text-gradient">next opportunity.</span></>}
              text="Start with a free experience and choose a plan that fits your preparation needs."
              center
            />

            <div className="billing-switch" role="group" aria-label="Billing period">
              <button
                className={selectedPlan === "Monthly" ? "billing-active" : ""}
                onClick={() => setSelectedPlan("Monthly")}
              >
                Monthly
              </button>
              <button
                className={selectedPlan === "Yearly" ? "billing-active" : ""}
                onClick={() => setSelectedPlan("Yearly")}
              >
                Yearly <span>Save more</span>
              </button>
            </div>

            <div className="pricing-grid">
              <article className="price-card">
                <span className="plan-tag">GET STARTED</span>
                <h3>Free</h3>
                <p>Build a steady practice habit.</p>
                <div className="price-value">₹0 <span>/ forever</span></div>

                <button className="button button-outline" onClick={handleStart}>
                  Start for free <ArrowRight size={16} />
                </button>

                <div className="plan-divider" />
                <span className="included-label">WHAT'S INCLUDED</span>

                {[
                  "Interview practice demo",
                  "Basic preparation guidance",
                  "Personal practice space",
                ].map((item) => (
                  <div className="plan-feature" key={item}>
                    <Check size={16} /> {item}
                  </div>
                ))}
              </article>

              <article className="price-card price-featured">
                <div className="popular-ribbon">
                  <Sparkles size={13} /> MOST FLEXIBLE
                </div>
                <span className="plan-tag">FOR SERIOUS PREPARATION</span>
                <h3>Pro</h3>
                <p>Make each practice count.</p>

                <div className="price-value">
                  {selectedPlan === "Monthly" ? "₹199" : "₹299"}
                  <span> / month*</span>
                </div>

                <button
                  className="button button-primary"
                  onClick={() =>
                    showNotice("Paid plans will be activated after billing is implemented.")
                  }
                >
                  Explore Pro <ArrowRight size={16} />
                </button>

                <div className="plan-divider" />
                <span className="included-label">PLANNED FEATURES</span>

                {[
                  "Expanded interview practice",
                  "Detailed AI feedback",
                  "Progress and skill reports",
                  "Interview history",
                ].map((item) => (
                  <div className="plan-feature" key={item}>
                    <Check size={16} /> {item}
                  </div>
                ))}

                <small className="price-disclaimer">
                  *Illustrative pricing, not an active offer.
                </small>
              </article>

              <article className="price-card">
                <span className="plan-tag">FOR TEAMS</span>
                <h3>Teams</h3>
                <p>Support preparation across your team.</p>
                <div className="price-value custom-price">Let's talk</div>

                <button
                  className="button button-outline"
                  onClick={() =>
                    showNotice("Team enquiries will be enabled when contact functionality is built.")
                  }
                >
                  Contact us <ArrowRight size={16} />
                </button>

                <div className="plan-divider" />
                <span className="included-label">PLANNED FEATURES</span>

                {[
                  "Team practice workflows",
                  "Shared progress overview",
                  "Flexible team onboarding",
                ].map((item) => (
                  <div className="plan-feature" key={item}>
                    <Check size={16} /> {item}
                  </div>
                ))}
              </article>
            </div>

            <p className="pricing-footnote">
              <ShieldCheck size={15} /> No payment is processed on this demo landing page.
            </p>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="container faq-grid">
            <div>
              <SectionHeading
                eyebrow="GOOD QUESTIONS"
                title={<>A little more<br /><span className="text-gradient">clarity.</span></>}
                text="Here's what you might want to know before getting started."
              />

              <div className="faq-contact">
                Still have questions?{" "}
                <a href="mailto:hello@example.com">
                  Contact our team <ArrowUpRight size={14} />
                </a>
                <small>Replace this demo email before launch.</small>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={`faq-item ${openFaq === index ? "faq-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    className="faq-question"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={19} />
                  </button>

                  {openFaq === index && (
                    <p className="faq-answer">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta">
              <div className="cta-orb" />
              <div className="cta-content">
                <span className="cta-eyebrow">
                  <Sparkles size={14} /> YOUR NEXT CHAPTER
                </span>

                <h2>
                  Your next interview
                  <br />
                  starts with <span>practice.</span>
                </h2>

                <p>
                  Take the first step today. You don't need to be perfect —
                  you just need to begin.
                </p>

                <button
                  className="button button-white"
                  onClick={handleStart}
                >
                  Start preparing <ArrowUpRight size={17} />
                </button>
              </div>

              <div className="cta-art" aria-hidden="true">
                <BrainCircuit size={118} strokeWidth={0.9} />
                <span />
                <i />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-col">
              <Logo />
              <p>
                A thoughtful space to practice, learn, and show up with
                confidence.
              </p>
            </div>

            <div className="footer-col">
              <strong>Explore</strong>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>

            <div className="footer-col">
              <strong>Resources</strong>
              <a href="#faq">FAQs</a>
              <a href="#how-it-works">Getting started</a>
              <a href="mailto:hello@example.com">
                Contact <small>(demo email)</small>
              </a>
            </div>

            <div className="footer-col">
              <strong>Account</strong>
              <button onClick={() => navigate("/login")}>Log in</button>
              <button onClick={handleStart}>Get started</button>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} InterviewAI. Built for your next step.
            </span>
            <span className="footer-note">
              <ShieldCheck size={14} /> Practice with purpose.
            </span>
          </div>
        </div>
      </footer>

      {notice && (
        <div className="toast-message" role="status">
          <Sparkles size={17} />
          <span>{notice}</span>
          <button
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <a className="back-to-top" href="#home" aria-label="Back to top">
        <ArrowDownRight size={18} />
      </a>
    </div>
  );
}































