import { useState } from "react";
import {
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Code,
  CheckCircle,
  Copy,
  Github,
  Award,
  Book,
  Maximize2,
  Sparkles,
  ArrowUpRight,
  Eye,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HANDBOOK_DETAILS, HandbookDetails, Chapter } from "../data/handbookChapters";

export default function InteractiveHandbooks() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  // Find the currently active handbook
  const activeBook = HANDBOOK_DETAILS.find((b) => b.id === selectedBookId);
  const currentChapter = activeBook?.chapters[activeChapterIndex];

  // Handle task check/uncheck
  const toggleTask = (bookId: string, chapIndex: number, taskIndex: number) => {
    const key = `${bookId}-${chapIndex}-${taskIndex}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Copy code to clipboard helper
  const handleCopyCode = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check how many chapters are completed
  const calculateProgress = (book: HandbookDetails) => {
    let totalTasks = 0;
    let completedCount = 0;
    book.chapters.forEach((chap, cIdx) => {
      chap.checklist.forEach((_, tIdx) => {
        totalTasks++;
        if (completedTasks[`${book.id}-${cIdx}-${tIdx}`]) {
          completedCount++;
        }
      });
    });
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  };

  return (
    <div id="interactive-handbooks-container" className="space-y-8">
      <AnimatePresence mode="wait">
        {!selectedBookId ? (
          /* ========================================================
             GALLERY/CATALOG VIEW
             ======================================================== */
          <motion.div
            key="gallery-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          >
            {HANDBOOK_DETAILS.map((book) => {
              const progress = calculateProgress(book);
              return (
                <div
                  key={book.id}
                  onClick={() => {
                    setSelectedBookId(book.id);
                    setActiveChapterIndex(0);
                  }}
                  id={`handbook-card-${book.id}`}
                  className="group relative glass-panel rounded-3xl p-6 flex flex-col justify-between hover:border-violet-500/40 transition-all cursor-pointer bg-zinc-950/40 hover:bg-zinc-900/40 border border-zinc-200/10 shadow-xl overflow-hidden"
                >
                  {/* Subtle hover backlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-6">
                    {/* Visual Book Cover Element */}
                    <div className={`aspect-[16/10] w-full rounded-2xl bg-gradient-to-br ${book.coverColor} p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-violet-600/10`}>
                      {/* Paper lines overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Spine / Binding simulation line */}
                      <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20 border-r border-white/5" />

                      <div className="flex items-center justify-between text-white/80 font-mono text-[9px] tracking-widest pl-3">
                        <span className="flex items-center gap-1.5">
                          <Terminal size={10} />
                          SYSTEM HANDBOOKS
                        </span>
                        <BookOpen size={13} />
                      </div>

                      <div className="space-y-2.5 pl-3">
                        <h4 className="font-display font-extrabold text-white text-lg tracking-tight leading-snug drop-shadow-md">
                          {book.title}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {book.tech.split(",").slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono text-zinc-100 bg-white/10 border border-white/10 px-2 py-0.5 rounded-md">
                              {t.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-white/60 pl-3 border-t border-white/10 pt-2.5">
                        <span className="font-semibold">{book.chaptersCount} Advanced Units</span>
                        <span>© BURHAN .DEV</span>
                      </div>
                    </div>

                    {/* Book Metadata details */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-violet-400 font-semibold bg-violet-400/5 px-2 py-1 rounded-md border border-violet-500/10 uppercase tracking-wider">
                          Interactive Handbook
                        </span>
                        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                          <Eye size={12} /> Live Reader
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-zinc-100 group-hover:text-violet-400 transition-colors">
                        {book.title}
                      </h3>
                      
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Interactive status row */}
                  <div className="mt-6 pt-5 border-t border-zinc-200/5">
                    {progress > 0 ? (
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-mono">Module Progress</span>
                          <span className="text-emerald-400 font-mono font-bold">{progress}% Completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500">
                          Primary: <span className="text-zinc-300 font-semibold">{book.tech.split(",")[0]}</span>
                        </span>
                        <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-violet-400 group-hover:text-violet-300 transition-all transform group-hover:translate-x-1">
                          <span>Open Guide & Read</span>
                          <ArrowLeft className="rotate-180" size={14} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* ========================================================
             ACTIVE INTERACTIVE E-READER VIEW
             ======================================================== */
          <motion.div
            key="reader-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-3xl bg-zinc-950/80 border border-zinc-200/10 shadow-2xl p-6 lg:p-8 text-left space-y-8 relative overflow-hidden"
          >
            {/* Header Navigation Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200/5 pb-6">
              <button
                onClick={() => setSelectedBookId(null)}
                id="back-to-library-btn"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-850 px-4 py-2.5 rounded-xl border border-zinc-200/5 transition-all cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to Manuals Gallery</span>
              </button>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-mono text-zinc-500">
                  {activeChapterIndex + 1} of {activeBook.chapters.length} Units
                </span>
                <a
                  href={activeBook.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 px-3.5 py-2.5 rounded-xl border border-zinc-200/5 transition-colors"
                >
                  <Github size={14} />
                  <span>View Source</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

            {/* Main Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive 3D Book Graphic + Chapters Index */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                {/* 3D styled Mini Book Element */}
                <div className="relative group perspective-1000 flex justify-center py-6">
                  <div className="relative w-56 h-72 rounded-r-2xl shadow-2xl transition-transform duration-500 preserve-3d rotate-y-[-10deg] group-hover:rotate-y-[0deg]">
                    {/* Left Spine Overlay shadow */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent z-10" />

                    {/* Book Cover Face */}
                    <div className={`absolute inset-0 rounded-r-xl bg-gradient-to-br ${activeBook.coverColor} p-6 flex flex-col justify-between overflow-hidden shadow-inner`}>
                      {/* Inner Paper Page stacks visual borders */}
                      <div className="absolute right-0 top-2 bottom-2 w-1.5 bg-zinc-200/90 rounded-r shadow-sm border-l border-zinc-300" />
                      
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

                      <div className="flex items-center justify-between text-white/80 font-mono text-[9px]">
                        <span>CORE BLUEPRINT</span>
                        <Award size={14} />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-display font-extrabold text-white text-base tracking-tight leading-snug drop-shadow">
                          {activeBook.title}
                        </h4>
                        <p className="text-[10px] text-zinc-300 font-mono uppercase tracking-widest">
                          Burhan Shaheen
                        </p>
                      </div>

                      <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[8px] text-white/50">
                        <span>active module</span>
                        <span>v1.4</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter Selection Tab List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
                    Table of Contents ({activeBook.chapters.length} chapters)
                  </span>

                  <div className="space-y-2">
                    {activeBook.chapters.map((chap, idx) => {
                      const isActive = idx === activeChapterIndex;
                      const hasCompletedTasks = chap.checklist.some((_, tIdx) => 
                        completedTasks[`${activeBook.id}-${idx}-${tIdx}`]
                      );

                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveChapterIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isActive
                              ? "bg-violet-500/10 border-violet-500/30 text-violet-400 shadow-md shadow-violet-500/5"
                              : "bg-zinc-900/40 border-zinc-200/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/70"
                          }`}
                        >
                          <span className="truncate pr-2">{chap.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {hasCompletedTasks && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Progress started" />
                            )}
                            <ChevronRight size={14} className={isActive ? "text-violet-400" : "text-zinc-600"} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Handbook Global Progress Card */}
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200/5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono">Book Progress</span>
                    <span className="text-emerald-400 font-bold font-mono">
                      {calculateProgress(activeBook)}% Done
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(activeBook)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    Interactive checklists below help log implementation steps. Complete tasks to increase progress.
                  </p>
                </div>
              </div>

              {/* Right Column: Active Chapter Content Display */}
              <div className="lg:col-span-8 space-y-6">
                {/* Chapter Headers */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-violet-400 uppercase tracking-widest font-semibold">
                    Currently Reading • Module Unit {activeChapterIndex + 1}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
                    {currentChapter?.title}
                  </h2>
                  <p className="text-sm text-zinc-400 font-medium">
                    {currentChapter?.subtitle}
                  </p>
                </div>

                {/* Key Takeaway Card */}
                <div className="bg-gradient-to-r from-violet-950/10 to-indigo-950/10 border border-violet-500/20 p-5 rounded-2xl flex items-start space-x-4">
                  <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl shrink-0">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-zinc-200 text-xs sm:text-sm">Architectural Core Takeaway</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                      "{currentChapter?.takeaway}"
                    </p>
                  </div>
                </div>

                {/* Conceptual Breakdowns */}
                <div className="space-y-4 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {currentChapter?.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Interactive IDE Terminal Mockup */}
                {currentChapter?.codeSnippet && (
                  <div className="bg-zinc-950 border border-zinc-200/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* IDE Header bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-200/5">
                      <div className="flex items-center space-x-2">
                        {/* Windows controls */}
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                        <span className="text-[11px] font-mono text-zinc-500 pl-2">
                          {activeBook.id === "angular-handbook" ? "facade.service.ts" : activeBook.id === "nextjs-handbook" ? "action-route.js" : "middleware.js"}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 rounded border border-zinc-200/5">
                          {currentChapter.codeLanguage}
                        </span>
                        <button
                          onClick={() => handleCopyCode(currentChapter.codeSnippet)}
                          className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                          title="Copy Code Snippet"
                        >
                          {copied ? (
                            <span className="text-[10px] font-mono text-emerald-400 font-bold px-1.5">Copied!</span>
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Code Container */}
                    <div className="p-5 font-mono text-xs overflow-x-auto text-left leading-relaxed max-h-[350px] bg-zinc-950 scrollbar-thin">
                      <pre className="text-zinc-300">
                        <code>{currentChapter.codeSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Interactive Implementation Checklist */}
                {currentChapter?.checklist && currentChapter.checklist.length > 0 && (
                  <div className="glass-panel p-5 rounded-2xl border border-zinc-200/5 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-zinc-200/5 pb-3">
                      <CheckCircle size={16} className="text-emerald-400" />
                      <h4 className="font-display font-semibold text-zinc-200 text-xs sm:text-sm">
                        Chapter Implementation Steps Checklist
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {currentChapter.checklist.map((task, idx) => {
                        const isChecked = !!completedTasks[`${activeBook.id}-${activeChapterIndex}-${idx}`];

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleTask(activeBook.id, activeChapterIndex, idx)}
                            className={`p-3 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer text-xs sm:text-sm ${
                              isChecked
                                ? "bg-emerald-500/5 border-emerald-500/20 text-zinc-300"
                                : "bg-zinc-900/30 border-zinc-200/5 text-zinc-400 hover:bg-zinc-900/60"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all shrink-0 ${
                                isChecked
                                  ? "bg-emerald-500 border-emerald-500 text-zinc-950"
                                  : "border-zinc-700 bg-zinc-950"
                              }`}
                            >
                              {isChecked && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                            <span className={isChecked ? "line-through text-zinc-500" : ""}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Footer Navigation Buttons inside Reader */}
                <div className="flex items-center justify-between border-t border-zinc-200/5 pt-6 mt-8">
                  <button
                    onClick={() => setActiveChapterIndex((p) => Math.max(0, p - 1))}
                    disabled={activeChapterIndex === 0}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous Unit</span>
                  </button>

                  <button
                    onClick={() => {
                      if (activeChapterIndex < activeBook.chapters.length - 1) {
                        setActiveChapterIndex((p) => p + 1);
                      } else {
                        setSelectedBookId(null); // Back to catalog if completed
                      }
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <span>
                      {activeChapterIndex === activeBook.chapters.length - 1
                        ? "Finish Blueprint"
                        : "Next Unit"}
                    </span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
