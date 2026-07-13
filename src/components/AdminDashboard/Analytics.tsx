import React, { useState } from "react";
import { 
  TrendingUp, Eye, Laptop, Globe, ArrowUpRight, BarChart3, Clock, HelpCircle, Sparkles
} from "lucide-react";
import { motion } from "motion/react";

export default function Analytics() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "12m">("7d");

  // Mock static granular analytics data
  const weeklyData = [
    { label: "Senin", visitors: 1200, pageviews: 2400 },
    { label: "Selasa", visitors: 1850, pageviews: 3900 },
    { label: "Rabu", visitors: 1600, pageviews: 3100 },
    { label: "Kamis", visitors: 2100, pageviews: 4500 },
    { label: "Jumat", visitors: 2450, pageviews: 5200 },
    { label: "Sabtu", visitors: 1900, pageviews: 3800 },
    { label: "Minggu", visitors: 2800, pageviews: 6100 }
  ];

  const deviceData = [
    { device: "Mobile", percentage: 58, count: "7,221", color: "bg-cyan-500 text-cyan-400" },
    { device: "Desktop", percentage: 35, count: "4,357", color: "bg-blue-500 text-blue-400" },
    { device: "Tablet", percentage: 7, count: "872", color: "bg-indigo-500 text-indigo-400" }
  ];

  const browserData = [
    { browser: "Google Chrome", share: "64.2%", visitors: "7,992" },
    { browser: "Apple Safari", share: "18.5%", visitors: "2,303" },
    { browser: "Mozilla Firefox", share: "8.1%", visitors: "1,008" },
    { browser: "Microsoft Edge", share: "6.4%", visitors: "796" },
    { browser: "Lainnya", share: "2.8%", visitors: "351" }
  ];

  const topPages = [
    { path: "/", name: "Landing Page Utama", views: "14,890", bounce: "38.2%" },
    { path: "/#services", name: "Layanan & Bento Grid", views: "4,320", bounce: "24.5%" },
    { path: "/#estimator", name: "Kalkulator Estimasi AI", views: "3,890", bounce: "15.1%" },
    { path: "/#portfolio", name: "Studi Kasus & Hasil Kerja", views: "2,980", bounce: "29.8%" },
    { path: "/blog/react-19", name: "Blog: Memilih React 19", views: "1,120", bounce: "42.0%" }
  ];

  const trafficSources = [
    { source: "Google Search (SEO)", value: 45, count: "5,602", trend: "+12.4%" },
    { source: "Direct Traffic", value: 25, count: "3,112", trend: "+5.1%" },
    { source: "LinkedIn & Social", value: 18, count: "2,241", trend: "+28.2%" },
    { source: "GitHub Referrals", value: 8, count: "996", trend: "+18.0%" },
    { source: "Newsletter Email", value: 4, count: "499", trend: "-2.3%" }
  ];

  // SVG dimensions for elegant Line Chart plotting
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = 40;

  // Find max value to auto-scale chart
  const maxVal = 7000; // max scale for pageviews

  // Helper to map coordinate values to SVG bounds
  const getCoordinates = (index: number, val: number) => {
    const x = padding + (index * (svgWidth - padding * 2)) / (weeklyData.length - 1);
    const y = svgHeight - padding - (val * (svgHeight - padding * 2)) / maxVal;
    return `${x},${y}`;
  };

  // Generate path string for Line Chart
  const visitorPath = weeklyData.map((d, idx) => getCoordinates(idx, d.visitors)).join(" ");
  const pageviewPath = weeklyData.map((d, idx) => getCoordinates(idx, d.pageviews)).join(" ");

  return (
    <div className="space-y-8 text-left">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            ANALYTICS SYSTEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>Performa Website Real-time</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Statistik keterbacaan, durasi sesi, alat browser, perangkat, dan rujukan lalu lintas Google SEO.
          </p>
        </div>

        {/* Range select buttons */}
        <div className="flex rounded-lg border border-slate-800 p-1 bg-slate-900/40 text-[10px] font-mono">
          <button
            onClick={() => setActiveRange("7d")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${activeRange === "7d" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"}`}
          >
            7 Hari
          </button>
          <button
            onClick={() => setActiveRange("30d")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${activeRange === "30d" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"}`}
          >
            30 Hari
          </button>
          <button
            onClick={() => setActiveRange("12m")}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${activeRange === "12m" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"}`}
          >
            12 Bulan
          </button>
        </div>
      </div>

      {/* Main Stats Graph */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6 font-sans">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 block">TOTAL VISITORS</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-1.5">
                <span>15,800</span>
                <span className="text-xs font-mono text-emerald-400">+18.5%</span>
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 block">TOTAL PAGE VIEWS</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-1.5">
                <span>32,492</span>
                <span className="text-xs font-mono text-emerald-400">+12.1%</span>
              </span>
            </div>
          </div>

          <div className="flex gap-4 text-[10px] font-mono font-bold uppercase">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-cyan-400" />
              <span className="text-slate-400">Unique Visitors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-blue-600" />
              <span className="text-slate-400">Page Views</span>
            </div>
          </div>
        </div>

        {/* Custom SVG Responsive Line Chart */}
        <div className="w-full overflow-x-auto">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full min-w-[500px] h-auto overflow-visible select-none"
          >
            {/* Grids */}
            <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#1E293B" strokeDasharray="3,3" />
            <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="#1E293B" strokeDasharray="3,3" />
            <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#1E293B" strokeDasharray="3,3" />

            {/* Area gradients */}
            <defs>
              <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="pageviewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Fills under lines */}
            <path 
              d={`M ${padding},${svgHeight - padding} L ${pageviewPath} L ${svgWidth - padding},${svgHeight - padding} Z`} 
              fill="url(#pageviewGrad)" 
            />
            <path 
              d={`M ${padding},${svgHeight - padding} L ${visitorPath} L ${svgWidth - padding},${svgHeight - padding} Z`} 
              fill="url(#visitorGrad)" 
            />

            {/* Line Plots */}
            <polyline fill="none" stroke="#2563eb" strokeWidth="2.5" points={pageviewPath} />
            <polyline fill="none" stroke="#06b6d4" strokeWidth="2.5" points={visitorPath} />

            {/* Interactive node circles */}
            {weeklyData.map((d, idx) => {
              const coordsV = getCoordinates(idx, d.visitors).split(",");
              const coordsP = getCoordinates(idx, d.pageviews).split(",");
              return (
                <g key={idx}>
                  <circle cx={coordsV[0]} cy={coordsV[1]} r="4" fill="#06b6d4" stroke="#070C15" strokeWidth="1.5" className="hover:r-5 transition-all cursor-pointer" />
                  <circle cx={coordsP[0]} cy={coordsP[1]} r="4" fill="#2563eb" stroke="#070C15" strokeWidth="1.5" className="hover:r-5 transition-all cursor-pointer" />
                </g>
              );
            })}

            {/* Labels */}
            {weeklyData.map((d, idx) => {
              const x = padding + (idx * (svgWidth - padding * 2)) / (weeklyData.length - 1);
              return (
                <text 
                  key={idx} 
                  x={x} 
                  y={svgHeight - 15} 
                  fill="#64748B" 
                  fontSize="10" 
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Grid: Devices, Traffic Sources, Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card: Devices */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Laptop className="w-4 h-4 text-cyan-400" />
            <span>PENGGUNA PERANGKAT</span>
          </h3>

          <div className="space-y-4">
            {/* Visual breakdown bar */}
            <div className="h-4 rounded-lg overflow-hidden flex bg-slate-800">
              {deviceData.map((d, idx) => (
                <div 
                  key={idx} 
                  style={{ width: `${d.percentage}%` }} 
                  className={d.color.split(" ")[0]} 
                  title={`${d.device}: ${d.percentage}%`}
                />
              ))}
            </div>

            <div className="space-y-3 pt-2 font-sans">
              {deviceData.map((d, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${d.color.split(" ")[0]}`} />
                    <span className="text-white font-semibold">{d.device}</span>
                  </div>
                  <div className="text-right space-x-2 font-mono">
                    <span className="text-slate-400">{d.count} sessions</span>
                    <span className={`font-bold ${d.color.split(" ")[1]}`}>{d.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card: Traffic Sources */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>RUJUKAN LALU LINTAS</span>
          </h3>

          <div className="space-y-4 font-sans">
            {trafficSources.map((source, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">{source.source}</span>
                  <div className="font-mono text-[10px] space-x-2">
                    <span className="text-slate-400">{source.count}</span>
                    <span className={source.trend.startsWith("+") ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                      {source.trend}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded bg-slate-800 overflow-hidden">
                  <div style={{ width: `${source.value}%` }} className="h-full bg-cyan-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Browser distribution */}
        <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>PENGGUNA BROWSER</span>
          </h3>

          <div className="space-y-4 font-sans">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 font-mono text-[9px] uppercase tracking-wider text-left">
                  <th className="pb-2">Browser</th>
                  <th className="pb-2 text-right">Sesi</th>
                  <th className="pb-2 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {browserData.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/25">
                    <td className="py-2.5 text-white font-semibold">{b.browser}</td>
                    <td className="py-2.5 text-right text-slate-400 font-mono">{b.visitors}</td>
                    <td className="py-2.5 text-right text-cyan-400 font-mono font-bold">{b.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Table: Top Visited Pages */}
      <div className="bg-[#0F1626]/45 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>HALAMAN POPULER DIKUNJUNGI</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                <th className="pb-3 pl-4">Path URL Halaman</th>
                <th className="pb-3">Judul Halaman</th>
                <th className="pb-3 text-right">Views</th>
                <th className="pb-3 text-right pr-4">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {topPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30">
                  <td className="py-3.5 pl-4 font-mono text-cyan-300 font-medium">{page.path}</td>
                  <td className="py-3.5 text-slate-300 font-semibold">{page.name}</td>
                  <td className="py-3.5 text-right text-white font-mono font-bold">{page.views}</td>
                  <td className="py-3.5 text-right pr-4 text-slate-400 font-mono">{page.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
