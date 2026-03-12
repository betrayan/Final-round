import React, { useState, useEffect } from "react";
import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip as ChartTooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from "chart.js";
import { useGlobal } from "../context/GlobalContext";

// Register Chart.js elements
ChartJS.register(
  RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend,
  CategoryScale, LinearScale, BarElement
);

// ─── Mock API (replace BASE_URL with your FastAPI server) ───────────────
const BASE_URL = "http://localhost:8000";

async function callPredict(formData) {
  // For demo purposes, simulate the Random Forest prediction locally
  // In production, replace with: const res = await fetch(`${BASE_URL}/predict`, {...})
  await new Promise(r => setTimeout(r, 1400));

  const w = [4.0, 4.0, 3.0, 0.0025, 0.003, 0.002, 0.002];
  const vals = [
    formData.projects, formData.coding_practice, formData.internship,
    formData.resume_score, formData.interview_score,
    formData.aptitude_score, formData.communication_score,
  ];
  const raw = vals.reduce((s, v, i) => s + v * w[i], 0);
  const maxRaw = 10 * 4 + 10 * 4 + 12 * 3 + 100 * 0.0025 + 100 * 0.003 + 100 * 0.002 + 100 * 0.002;
  const score = Math.min(100, Math.max(0, Math.round((raw / maxRaw) * 100 * 10) / 10));

  let label = score < 40 ? "Low" : score < 70 ? "Moderate" : "High";
  let lowP = score < 40 ? 65 + Math.random() * 20 : Math.random() * 20;
  let highP = score >= 70 ? 55 + Math.random() * 30 : Math.random() * 15;
  let modP = 100 - lowP - highP;

  const featureNames = ["projects", "coding_practice", "internship", "resume_score", "interview_score", "aptitude_score", "communication_score"];
  const maxVals = [10, 10, 12, 100, 100, 100, 100];
  const normalized = vals.map((v, i) => v / maxVals[i]);
  const sorted = featureNames.map((n, i) => [n, normalized[i]]).sort((a, b) => a[1] - b[1]);
  const weakAreas = sorted.slice(0, 3).map(x => x[0]);

  const tipMap = {
    projects: "Build 2–3 more portfolio projects to demonstrate hands-on skills.",
    coding_practice: "Increase daily coding practice — try LeetCode or HackerRank.",
    internship: "Seek internship or freelance opportunities for real-world exposure.",
    resume_score: "Improve your resume: quantify achievements, use action verbs.",
    interview_score: "Practice mock technical & HR sessions to boost confidence.",
    aptitude_score: "Work through timed aptitude exercises daily to improve speed.",
    communication_score: "Join speaking clubs or do voice-based practice sessions.",
  };

  const badge = score >= 80 ? "🏆 Career Ready" : score >= 60 ? "⚡ Almost There" : score >= 40 ? "📈 Progressing" : "🌱 Just Starting";

  return {
    label, score,
    badge,
    probabilities: {
      Low: Math.round(lowP * 10) / 10,
      Moderate: Math.round(modP * 10) / 10,
      High: Math.round(highP * 10) / 10,
    },
    feature_importance: {
      projects: 0.18, coding_practice: 0.17, internship: 0.15,
      resume_score: 0.14, interview_score: 0.16,
      aptitude_score: 0.10, communication_score: 0.10,
    },
    weak_areas: weakAreas,
    improvement_tips: weakAreas.map(a => tipMap[a]),

    // Explicitly returning the values we used to calculate for easy comparison
    currentScores: {
      projects: formData.projects,
      coding_practice: formData.coding_practice,
      internship: formData.internship,
      resume_score: formData.resume_score,
      interview_score: formData.interview_score,
      aptitude_score: formData.aptitude_score,
      communication_score: formData.communication_score
    }
  };
}

// ─── Color System ────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0B0F1A",
  card: "#111827",
  border: "#1E2D3D",
  accent: "#00D4FF",
  accentGlow: "rgba(0,212,255,0.15)",
  gold: "#FFB800",
  green: "#00E5A0",
  red: "#FF4B6E",
  text: "#E2EBF0",
  muted: "#6B7F9E",
};

const LABEL_COLORS = { Low: "#FF4B6E", Moderate: "#FFB800", High: "#00E5A0" };

const FEATURE_LABELS = {
  projects: "Projects",
  coding_practice: "Coding Practice",
  internship: "Internship",
  resume_score: "Resume Score",
  interview_score: "Interview Score",
  aptitude_score: "Aptitude Score",
  communication_score: "Communication",
};

// ─── Gauge Component ─────────────────────────────────────────────────────
function ScoreGauge({ score, label }) {
  const angle = (score / 100) * 180 - 90;
  const color = score >= 70 ? COLORS.green : score >= 40 ? COLORS.gold : COLORS.red;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width="220" height="120" viewBox="0 0 220 120">
        <defs>
          <linearGradient id="gaugeBg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4B6E" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#00E5A0" />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="#1E2D3D" strokeWidth="14" strokeLinecap="round" />
        {/* Colored arc */}
        <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="url(#gaugeBg)" strokeWidth="14"
          strokeLinecap="round" strokeDasharray="283" strokeDashoffset={283 - (score / 100) * 283}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
        {/* Needle */}
        <g transform={`rotate(${angle}, 110, 110)`} style={{ transition: "transform 1.2s cubic-bezier(.4,0,.2,1)" }}>
          <line x1="110" y1="110" x2="110" y2="28" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <circle cx="110" cy="110" r="6" fill={color} />
        </g>
        {/* Center score */}
        <text x="110" y="100" textAnchor="middle" fill={color} fontSize="28" fontWeight="bold" fontFamily="'Courier New', monospace">
          {score}%
        </text>
      </svg>
      <span style={{ fontSize: 13, color: COLORS.muted, letterSpacing: 2, textTransform: "uppercase" }}>
        Professional Readiness Score
      </span>
      <span style={{
        fontSize: 22, fontWeight: 700, color,
        textShadow: `0 0 20px ${color}60`,
        fontFamily: "'Courier New', monospace"
      }}>
        {label} Readiness
      </span>
    </div>
  );
}

// ─── Slider Input ────────────────────────────────────────────────────────
function SliderInput({ name, label, value, max, onChange }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <label style={{ fontSize: 13, color: COLORS.muted, fontFamily: "'Courier New', monospace" }}>{label}</label>
        <span style={{ fontSize: 13, color: COLORS.accent, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
          {value}{max > 12 ? "%" : ""}
        </span>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 3, background: "#1E2D3D" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, borderRadius: 3,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.green})`,
          transition: "width 0.2s ease"
        }} />
      </div>
      <input
        type="range" min={0} max={max} value={value}
        onChange={e => onChange(name, Number(e.target.value))}
        style={{ width: "100%", cursor: "pointer", opacity: 0, position: "relative", top: -10, height: 20, margin: 0 }}
      />
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────
export default function MLReadiness() {
  const { currentScore, stats } = useGlobal(); // Pulling actual realtime data

  const [form, setForm] = useState({
    projects: 5, coding_practice: 7, internship: 4,
    resume_score: currentScore?.technical || 82, // Seed with global scores if they exist
    interview_score: currentScore?.communication || 75,
    aptitude_score: currentScore?.problemSolving || 80,
    communication_score: currentScore?.communication || 72,
  });

  // Pull baseline stats - or mock if brand new user
  const [previousScores] = useState({
    projects: 3, coding_practice: 4, internship: 2,
    resume_score: stats?.avgScore ? Math.max(0, stats.avgScore - 15) : 65,
    interview_score: stats?.avgScore ? Math.max(0, stats.avgScore - 20) : 55,
    aptitude_score: stats?.avgScore ? Math.max(0, stats.avgScore - 12) : 68,
    communication_score: stats?.avgScore ? Math.max(0, stats.avgScore - 15) : 60,
  });

  // Sync contextual scores if they update externally
  useEffect(() => {
    if (currentScore) {
      setForm(prev => ({
        ...prev,
        resume_score: currentScore.technical || prev.resume_score,
        interview_score: currentScore.communication || prev.interview_score,
        aptitude_score: currentScore.problemSolving || prev.aptitude_score,
        communication_score: currentScore.confidence || prev.communication_score
      }));
    }
  }, [currentScore]);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  const handleChange = (name, val) => setForm(f => ({ ...f, [name]: val }));

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await callPredict(form);
      setResult(res);
      setActiveTab("result");
    } catch (e) {
      alert("Prediction failed: " + e.message);
    }
    setLoading(false);
  };

  // ─── Chart.js Formulations ───
  const radarDataArr = Object.entries(form).map(([key, val]) => ({
    subject: FEATURE_LABELS[key],
    value: key === "internship" ? (val / 12) * 100 : key === "projects" || key === "coding_practice" ? (val / 10) * 100 : val,
  }));

  const radarChartData = {
    labels: radarDataArr.map(d => d.subject),
    datasets: [{
      label: 'Score',
      data: radarDataArr.map(d => d.value),
      backgroundColor: 'rgba(0, 212, 255, 0.15)',
      borderColor: '#00D4FF',
      borderWidth: 2,
      pointBackgroundColor: '#00D4FF',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#00D4FF'
    }]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: '#1E2D3D' },
        grid: { color: '#1E2D3D' },
        pointLabels: { color: '#6B7F9E', font: { size: 11, family: "'Segoe UI', sans-serif" } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    maintainAspectRatio: false,
  };

  const barDataArr = result ? Object.entries(result.probabilities).map(([name, val]) => ({ name, value: val })) : [];

  const barChartData = {
    labels: barDataArr.map(d => d.name),
    datasets: [{
      data: barDataArr.map(d => d.value),
      backgroundColor: barDataArr.map(d => LABEL_COLORS[d.name]),
      borderRadius: { topLeft: 6, topRight: 6 },
      borderSkipped: false
    }]
  };

  const barOptions = {
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#6B7F9E', font: { size: 12 } } },
      y: { display: false, min: 0, max: 100 }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (ctx) => ` ${ctx.raw}%` }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{
      minHeight: "100%", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Segoe UI', system-ui, sans-serif", padding: "0 0 40px",
      overflowY: "auto", width: "100%", height: "100%", borderRadius: "12px"
    }}>
      {/* ── Header ── */}
      <div style={{
        borderBottom: `1px solid ${COLORS.border}`,
        borderTopLeftRadius: "12px", borderTopRightRadius: "12px",
        background: "linear-gradient(135deg, #0B0F1A 0%, #0F1F30 100%)",
        padding: "24px 40px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent}, #0062FF)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: `0 0 20px ${COLORS.accentGlow}`
          }}>🎯</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>
              Readiness Prediction
            </div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2, letterSpacing: 1 }}>
              AI-DRIVEN PLATFORM FOR SKILL ASSESSMENT &amp; PROFESSIONAL READINESS
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {["input", "result"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  background: activeTab === tab ? COLORS.accent : "#1E2D3D",
                  color: activeTab === tab ? "#000" : COLORS.muted,
                  transition: "all 0.2s",
                }}>
                {tab === "input" ? "📋 Input" : "📊 Results"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── INPUT TAB ── */}
        {activeTab === "input" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 }}>

            {/* Left: Sliders */}
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: 28
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 24, color: COLORS.accent }}>
                🧑💻 Student Profile Input
              </div>

              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 16, letterSpacing: 1 }}>EXPERIENCE METRICS</div>
              <SliderInput name="projects" label="Projects Completed" value={form.projects} max={10} onChange={handleChange} />
              <SliderInput name="coding_practice" label="Coding Practice (hrs/week)" value={form.coding_practice} max={10} onChange={handleChange} />
              <SliderInput name="internship" label="Internship Experience (months)" value={form.internship} max={12} onChange={handleChange} />

              <div style={{ fontSize: 12, color: COLORS.green, margin: "20px 0 16px", letterSpacing: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                LIVE PLATFORM SCORES (0–100) <span style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(0, 229, 160, 0.2)', borderRadius: '4px' }}>Synced via Context</span>
              </div>
              <SliderInput name="resume_score" label="Resume Score" value={form.resume_score} max={100} onChange={handleChange} />
              <SliderInput name="interview_score" label="Interview Score" value={form.interview_score} max={100} onChange={handleChange} />
              <SliderInput name="aptitude_score" label="Aptitude Score" value={form.aptitude_score} max={100} onChange={handleChange} />
              <SliderInput name="communication_score" label="Communication Score" value={form.communication_score} max={100} onChange={handleChange} />

              <button
                onClick={handlePredict} disabled={loading}
                style={{
                  width: "100%", marginTop: 24, padding: "14px 0",
                  borderRadius: 10, border: "none", cursor: loading ? "wait" : "pointer",
                  fontSize: 15, fontWeight: 700, letterSpacing: 1,
                  background: loading ? "#1E2D3D" : `linear-gradient(135deg, ${COLORS.accent}, #0062FF)`,
                  color: loading ? COLORS.muted : "#000",
                  boxShadow: loading ? "none" : `0 4px 20px ${COLORS.accentGlow}`,
                  transition: "all 0.3s",
                }}>
                {loading ? "⚙️  Analyzing with Random Forest..." : "🚀  Predict Readiness"}
              </button>
            </div>

            {/* Right: Radar Preview */}
            <div style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: 28
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: COLORS.accent }}>
                📡 Skill Radar Preview
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 16 }}>
                Real-time visualization of your input scores
              </div>
              <div style={{ width: "100%", height: 340, position: "relative" }}>
                <Radar data={radarChartData} options={radarOptions} />
              </div>

              {/* Feature importance hint */}
              <div style={{ marginTop: 8, padding: 14, background: "#0B1929", borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>🌲 Random Forest — Top Feature Weights</div>
                {[["Projects & Coding", "35%"], ["Interview Score", "16%"], ["Internship", "15%"], ["Resume", "14%"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: COLORS.text }}>{k}</span>
                    <span style={{ color: COLORS.accent, fontFamily: "monospace" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS TAB ── */}
        {activeTab === "result" && result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Top row: Score + Badge + Probabilities */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>

              {/* Gauge */}
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 28, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}>
                <ScoreGauge score={result.score} label={result.label} />
              </div>

              {/* Badge + Probabilities bar */}
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 28
              }}>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{
                    fontSize: 36, marginBottom: 6,
                    filter: "drop-shadow(0 0 12px rgba(255,184,0,0.4))"
                  }}>{result.badge.split(" ")[0]}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.gold }}>
                    {result.badge.split(" ").slice(1).join(" ")}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12, letterSpacing: 1 }}>CLASS PROBABILITIES</div>
                <div style={{ width: "100%", height: 120, position: "relative" }}>
                  <Bar data={barChartData} options={barOptions} />
                </div>
              </div>

              {/* Score breakdown & Comparison */}
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 28, gridColumn: "1 / -1", // span full width on bottom of this grid
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 16 }}>
                  📈 Progress vs Previous Assessment
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                  {[
                    ["Resume Score", form.resume_score, previousScores.resume_score],
                    ["Interview Score", form.interview_score, previousScores.interview_score],
                    ["Aptitude Score", form.aptitude_score, previousScores.aptitude_score],
                    ["Communication", form.communication_score, previousScores.communication_score],
                  ].map(([label, currentVal, prevVal]) => {
                    const diff = currentVal - prevVal;
                    const isPositive = diff >= 0;

                    return (
                      <div key={label} style={{ background: "#0B1929", padding: "16px", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
                        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8, letterSpacing: 0.5 }}>{label.toUpperCase()}</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                          <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.text, fontFamily: "monospace" }}>{currentVal}%</span>
                          <span style={{
                            fontSize: 13, fontWeight: 600, padding: "2px 8px", borderRadius: 4, marginBottom: 4,
                            background: isPositive ? "rgba(0, 229, 160, 0.1)" : "rgba(255, 75, 110, 0.1)",
                            color: isPositive ? COLORS.green : COLORS.red
                          }}>
                            {isPositive ? "+" : ""}{diff}%
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>
                          Previous Score: {prevVal}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom row: Weak Areas + Tips + Radar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 20 }}>

              {/* Improvement Tips */}
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 28
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 16 }}>
                  🔍 Weak Areas &amp; Improvement Tips
                </div>
                {result.improvement_tips.map((tip, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, marginBottom: 16,
                    padding: 14, background: "#0B1929",
                    borderRadius: 10, border: `1px solid ${COLORS.border}`,
                    borderLeft: `3px solid ${COLORS.red}`
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%",
                      background: COLORS.red, display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 11, fontWeight: 700,
                      color: "#000", flexShrink: 0
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ fontSize: 12, color: COLORS.gold, fontWeight: 600, marginBottom: 3 }}>
                        {FEATURE_LABELS[result.weak_areas[i]]}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>{tip}</div>
                    </div>
                  </div>
                ))}

                {/* Learning path hint */}
                <div style={{
                  marginTop: 8, padding: 12,
                  background: "rgba(0,212,255,0.05)",
                  borderRadius: 10, border: `1px solid rgba(0,212,255,0.2)`
                }}>
                  <div style={{ fontSize: 12, color: COLORS.accent }}>
                    ✨ Your personalized learning path has been generated based on these weak areas.
                    Head to the Post-Session Learning Path module to view recommendations.
                  </div>
                </div>
              </div>

              {/* Skill Radar (result) */}
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: 28
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>
                  📡 Skill Radar Analysis
                </div>
                <div style={{ width: "100%", height: 280, position: "relative" }}>
                  <Radar data={radarChartData} options={radarOptions} />
                </div>

                {/* Feature importance */}
                <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 10, marginTop: 4 }}>
                  🌲 RANDOM FOREST FEATURE IMPORTANCE
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {Object.entries(result.feature_importance)
                    .sort((a, b) => b[1] - a[1])
                    .map(([feat, imp]) => (
                      <div key={feat} style={{
                        padding: "4px 10px", borderRadius: 20,
                        background: "#0B1929", border: `1px solid ${COLORS.border}`,
                        fontSize: 11, color: COLORS.muted
                      }}>
                        {FEATURE_LABELS[feat]}: <span style={{ color: COLORS.accent }}>{(imp * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setActiveTab("input")} style={{
                flex: 1, padding: "14px 0", borderRadius: 10, border: `1px solid ${COLORS.border}`,
                cursor: "pointer", fontSize: 14, fontWeight: 600,
                background: "transparent", color: COLORS.muted,
              }}>← Adjust Inputs</button>
              <button onClick={() => { setResult(null); setActiveTab("input"); }} style={{
                flex: 1, padding: "14px 0", borderRadius: 10, border: "none",
                cursor: "pointer", fontSize: 14, fontWeight: 600,
                background: `linear-gradient(135deg, ${COLORS.accent}, #0062FF)`,
                color: "#000",
              }}>🔄 New Assessment</button>
            </div>
          </div>
        )}

        {/* No result yet on results tab */}
        {activeTab === "result" && !result && (
          <div style={{
            textAlign: "center", padding: "80px 0",
            color: COLORS.muted, fontSize: 15
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
            <div>No prediction yet. Go to the <strong style={{ color: COLORS.accent }}>Input</strong> tab and click Predict Readiness.</div>
          </div>
        )}
      </div>
    </div>
  );
}
