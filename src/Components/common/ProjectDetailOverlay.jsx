import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion, AnimatePresence, useScroll } from 'motion/react';
import {
  ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BookOpen, Check, Github, Link2, X,
} from 'lucide-react';
import { projects } from '../../data/projects';
import { slugify } from '../../utils/slug';
import { fetchReadme, indexHeadings } from '../../utils/readme';

const Markdown = lazy(() => import('./Markdown'));

// Previous / next project link
function NavLink({ project, next, onClick }) {
  const label = next ? 'Next' : 'Previous';
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${label} project: ${project.title}`}
      aria-label={`${label} project: ${project.title}`}
      className={`group flex cursor-pointer flex-col gap-1 border-t border-neutral-800 py-6 transition-colors hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-2 ${
        next ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
        {!next && <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />}
        {label}
        {next && <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
      <span className="font-space text-xl text-neutral-300 transition-colors group-hover:text-white">
        {project.title}
      </span>
    </button>
  );
}

export function ProjectDetailOverlay({ project, onClose, onNavigate }) {
  const [readme, setReadme] = useState(undefined);
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Reset detail state when switching to another project
  const [prevTitle, setPrevTitle] = useState(project.title);
  if (prevTitle !== project.title) {
    setPrevTitle(project.title);
    setReadme(undefined);
    setToc([]);
    setActiveId(null);
  }

  const scrollRef = useRef(null);
  const readmeRef = useRef(null);
  const rafRef = useRef(0);

  const slug = slugify(project.title);
  const index = projects.findIndex((p) => p.title === project.title);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const { scrollYProgress } = useScroll({ container: scrollRef });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(next);
      if (e.key === 'ArrowLeft') onNavigate(prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, onClose, onNavigate]);

  // Lock main page scrolling and hide main page scrollbar
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Load project README and update document title
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);

    const originalTitle = document.title;
    document.title = `${project.title} — Himanshu Singh Dangi`;

    const controller = new AbortController();
    fetchReadme(project.code, controller.signal)
      .then(setReadme)
      .catch((err) => {
        if (err.name !== 'AbortError') setReadme(null);
      });

    return () => {
      document.title = originalTitle;
      controller.abort();
    };
  }, [project.code, project.title]);

  // Build table of contents when README renders
  useEffect(() => {
    const box = readmeRef.current;
    if (!readme || !box) return;

    const buildToc = () => {
      const list = indexHeadings(box);
      if (list.length > 0) {
        setToc((prev) => (prev.map((i) => i.id).join() === list.map((i) => i.id).join() ? prev : list));
      }
    };

    buildToc();
    const observer = new MutationObserver(buildToc);
    observer.observe(box, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [readme]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const top = el.scrollTop;
    setIsScrolled(top > 60);
    setShowTop(top > 600);

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (toc.length > 0) {
        let current = null;
        for (const item of toc) {
          const headingEl = document.getElementById(item.id);
          if (headingEl && headingEl.getBoundingClientRect().top < 150) {
            current = item.id;
          }
        }
        setActiveId(current);
      }
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/projects/${slug}/`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard fallback
    }
  };

  const iconBtnClass =
    'grid size-8 cursor-pointer place-items-center rounded-full text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95';

  const host = project.live ? project.live.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  return createPortal(
    <Motion.div
      ref={scrollRef}
      onScroll={handleScroll}
      // Modal-only neon gold token for details view
      style={{ '--color-accent': '#fbbf24' }}
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      className="fixed inset-0 z-95 overflow-y-auto overscroll-contain bg-neutral-950 font-inter text-neutral-300"
    >
      {/* Sticky top navigation bar */}
      <div className="pointer-events-none sticky top-0 z-30 h-0">
        <div
          className={`absolute inset-x-0 top-0 transition-all duration-300 ${
            isScrolled ? 'px-4 pt-4' : 'px-0 pt-0'
          }`}
        >
          <div
            className={`pointer-events-auto relative mx-auto flex items-center justify-between gap-3 border bg-neutral-950/80 backdrop-blur-xl transition-all duration-300 ${
              isScrolled
                ? 'w-[min(56rem,100%)] rounded-full border-neutral-800 px-4 py-2 shadow-2xl shadow-black/80'
                : 'w-full rounded-none border-x-0 border-t-0 border-neutral-800 px-4 py-3 md:px-8'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              title="Back to projects"
              aria-label="Back to projects"
              className="group flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-2 py-1 font-mono text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back</span>
            </button>

            <span className="truncate font-space text-sm font-semibold text-neutral-100">
              {project.title}
            </span>

            <div className="flex shrink-0 items-center gap-1">
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                title="View source code on GitHub"
                aria-label="View source code on GitHub"
                className={iconBtnClass}
              >
                <Github className="size-4" />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open live demo"
                  aria-label="Open live demo"
                  className={iconBtnClass}
                >
                  <ArrowUpRight className="size-4" />
                </a>
              )}
              <button
                type="button"
                onClick={copyLink}
                title={copied ? "Link copied!" : "Copy project link"}
                aria-label={copied ? "Link copied" : "Copy project link"}
                className={iconBtnClass}
              >
                {copied ? <Check className="size-4 text-accent-3" /> : <Link2 className="size-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close details (Esc)"
                aria-label="Close details"
                className={iconBtnClass}
              >
                <X className="size-4" />
              </button>
            </div>

            <Motion.span
              style={{ scaleX: scrollYProgress }}
              aria-hidden="true"
              className="absolute inset-x-4 -bottom-px h-0.5 origin-left rounded-full bg-white/80"
            />
          </div>
        </div>
      </div>

      <main className="pb-24">
        {/* Project hero header */}
        <section className="relative overflow-hidden border-b border-neutral-900 px-4 pt-32 pb-16 md:px-8 md:pt-40">
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0">
              <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
                <span className="text-accent drop-shadow-[0_0_10px_rgba(251,191,36,0.55)] font-semibold">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-neutral-700" />
                <span>{project.category}</span>
                {project.status === 'wip' && (
                  <span className="rounded-md border border-accent-2/40 bg-accent-2/10 px-1.5 py-0.5 text-[10px] text-accent-2 font-semibold">
                    WIP
                  </span>
                )}
              </div>

              <h1
                id="project-title"
                className="max-w-4xl font-space text-5xl font-bold leading-[1.08] tracking-tight text-neutral-100 md:text-7xl"
              >
                {project.title}
              </h1>

              <p className="mt-6 max-w-2xl font-space text-lg font-light leading-relaxed text-neutral-400">
                {project.description.replace(/\*/g, '')}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open live demo in new tab"
                    aria-label="Open live demo"
                    className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-space text-sm font-bold text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>LIVE DEMO</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View source code on GitHub"
                  aria-label="View source code on GitHub"
                  className="flex items-center gap-2 rounded-xl border border-neutral-800 px-6 py-3 font-space text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Github className="size-4" />
                  <span>CODE</span>
                </a>
              </div>

              <div className="mt-10 max-w-3xl font-geist text-sm leading-7 text-neutral-500">
                {project.tech.join('  ·  ')}
              </div>
            </div>

            {/* Screenshot preview */}
            <div>
              <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/30 shadow-2xl transition-colors duration-300 hover:border-neutral-600">
                <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 flex-1 truncate rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[11px] text-neutral-500">
                    {host}
                  </span>
                </div>
                <div className="aspect-video overflow-hidden bg-neutral-950">
                  <img
                    src={project.shot ?? project.image}
                    alt={`${project.title} screenshot`}
                    title={`${project.title} screenshot`}
                    width="1600"
                    height="900"
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-neutral-500">
                <span className="flex items-center gap-2 text-neutral-300">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <span>{project.live ? 'Live' : 'Source'}</span>
                </span>
                <span className="truncate">{host}</span>
                <span>{project.tech.length} technologies</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Logo showcase */}
          <div className="mt-10 flex h-60 items-center justify-center overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/30 transition-colors duration-300 hover:border-neutral-700 md:h-80">
            <img
              src={project.image}
              alt={`${project.title} logo`}
              title={`${project.title} logo`}
              className="h-36 w-auto max-w-[80%] object-contain transition-transform duration-500 ease-out hover:scale-105 md:h-52"
            />
          </div>

          {/* Table of contents and README */}
          <div
            className={`mt-14 grid gap-10 ${
              toc.length > 0 ? 'lg:grid-cols-[15rem_minmax(0,1fr)]' : ''
            }`}
          >
            {toc.length > 0 && (
              <nav aria-label="On this page" className="hidden self-start lg:sticky lg:top-24 lg:block">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  On this page
                </p>
                <ul className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        title={`Jump to ${item.label}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`block border-l-2 py-1.5 text-sm transition-all duration-200 hover:pl-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-r ${
                          item.level === 3 ? 'pl-6' : 'pl-3'
                        } ${
                          activeId === item.id
                            ? 'border-accent text-neutral-100 [text-shadow:0_0_18px_rgba(251,191,36,0.4)] font-medium'
                            : 'border-neutral-800 text-neutral-500 hover:border-neutral-500 hover:text-neutral-200'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="min-w-0 overflow-hidden rounded-3xl border border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-3 font-mono text-xs text-neutral-500 md:px-8">
                <span className="flex items-center gap-2">
                  <BookOpen className="size-4 text-accent-2" />
                  <span>README.md</span>
                </span>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View repository on GitHub"
                  aria-label="View repository on GitHub"
                  className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1"
                >
                  synced from GitHub ↗
                </a>
              </div>

              <div ref={readmeRef} className="p-5 md:p-10">
                {readme === undefined && (
                  <div className="space-y-3" aria-label="Loading README">
                    {['w-3/4', 'w-full', 'w-5/6', 'w-2/3'].map((w) => (
                      <div key={w} className={`h-4 animate-pulse rounded bg-neutral-800/70 ${w}`} />
                    ))}
                  </div>
                )}

                {readme && (
                  <Suspense fallback={<div className="h-40 animate-pulse rounded bg-neutral-900" />}>
                    <Markdown source={readme} repoUrl={project.code} />
                  </Suspense>
                )}

                {readme === null && (
                  <p className="font-space text-lg font-light leading-relaxed text-neutral-300">
                    {project.description.replace(/\*/g, '')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom project navigation */}
          <div className="mt-16 grid gap-x-8 sm:grid-cols-2">
            <NavLink project={prev} onClick={() => onNavigate(prev)} />
            <NavLink project={next} next onClick={() => onNavigate(next)} />
          </div>
        </div>
      </main>

      {/* Floating back-to-top button */}
      <div className="pointer-events-none sticky bottom-6 z-30 flex justify-end px-6">
        <AnimatePresence>
          {showTop && (
            <Motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Back to top"
              aria-label="Back to top"
              className="pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-300 backdrop-blur transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              <ArrowUp className="size-5" />
            </Motion.button>
          )}
        </AnimatePresence>
      </div>
    </Motion.div>,
    document.body
  );
}

export default ProjectDetailOverlay;
