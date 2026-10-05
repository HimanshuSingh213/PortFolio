import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Check, Copy } from 'lucide-react';
import { resolveUrl, anchorId } from '../../utils/readme';

const ALIGN = { center: 'text-center', right: 'text-right' };

const LINK_CLASS =
  'text-accent-3 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-xs';

const textOf = (node) => {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(textOf).join('');
  return node?.props ? textOf(node.props.children) : '';
};

// Code block with syntax highlighting and copy button
function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const lang = /language-([\w-]+)/.exec(children?.props?.className || '')?.[1];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(textOf(children?.props?.children).replace(/\n$/, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 transition-colors hover:border-neutral-700">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2 font-mono text-[11px] text-neutral-500">
        <span className="uppercase tracking-widest">{lang || 'text'}</span>
        <button
          onClick={copy}
          type="button"
          title={copied ? "Code copied to clipboard" : "Copy code"}
          aria-label={copied ? "Code copied to clipboard" : "Copy code"}
          className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1.5 py-0.5"
        >
          {copied ? <Check className="size-3.5 text-accent-3" /> : <Copy className="size-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="hljs overflow-x-auto p-4 text-[13px] leading-relaxed [&_code]:rounded-none [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
        {children}
      </pre>
    </div>
  );
}

// Headings with anchor id and scroll margin
const heading = (Tag, cls) =>
  function Heading({ align, children, id, ...props }) {
    const headingId = id || anchorId(textOf(children));
    return (
      <Tag id={headingId} {...props} className={`scroll-mt-24 font-space ${cls} ${ALIGN[align] ?? ''}`}>
        {children}
      </Tag>
    );
  };

// Smooth scroll to in-page anchor target
const goTo = (id) =>
  document
    .getElementById(decodeURIComponent(id))
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export function Markdown({ source, repoUrl }) {
  // Offset heading levels since modal title is h1
  const components = {
    h1: heading('h2', 'mt-8 mb-4 text-3xl font-bold text-neutral-100'),
    h2: heading(
      'h3',
      "mt-12 mb-4 border-b border-neutral-800 pb-2 text-2xl font-semibold text-neutral-100 before:mr-3 before:inline-block before:size-2 before:rounded-sm before:bg-accent before:align-middle before:content-['']"
    ),
    h3: heading('h4', 'mt-8 mb-3 text-xl font-medium text-neutral-200'),
    h4: heading('h5', 'mt-6 mb-2 text-base font-medium text-neutral-200'),

    p: ({ align, ...p }) => (
      <p {...p} className={`my-4 leading-7 text-neutral-400 ${ALIGN[align] ?? ''}`} />
    ),
    div: ({ align, ...p }) => <div {...p} className={ALIGN[align] ?? ''} />,
    strong: ({ ...p }) => <strong {...p} className="font-semibold text-neutral-100" />,

    a: ({ href, children }) =>
      href?.startsWith('#') ? (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            goTo(href.slice(1));
          }}
          className={LINK_CLASS}
        >
          {children}
        </a>
      ) : (
        <a
          href={resolveUrl(href, repoUrl, 'link')}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {children}
        </a>
      ),

    img: ({ src, alt, width }) => (
      <img
        src={resolveUrl(src, repoUrl, 'img')}
        alt={alt || ''}
        title={alt || ''}
        width={width}
        loading="lazy"
        className="inline-block h-auto max-w-full rounded-lg align-middle"
      />
    ),

    ul: ({ ...p }) => (
      <ul
        {...p}
        className="my-4 list-disc space-y-2 pl-5 text-neutral-400 marker:text-accent [&.contains-task-list]:list-none [&.contains-task-list]:pl-0"
      />
    ),
    ol: ({ ...p }) => (
      <ol {...p} className="my-4 list-decimal space-y-2 pl-5 text-neutral-400 marker:text-accent-2" />
    ),
    li: ({ ...p }) => <li {...p} className="pl-1 leading-7" />,
    input: ({ ...p }) => <input {...p} className="mr-2 accent-accent" />,

    blockquote: ({ ...p }) => (
      <blockquote
        {...p}
        className="my-5 rounded-r-lg border-l-2 border-accent-2 bg-neutral-900/40 px-4 py-1 text-neutral-300"
      />
    ),
    hr: () => <hr className="my-10 border-neutral-800" />,

    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
    code: ({ className, children, ...p }) => (
      <code
        {...p}
        className={`${className ?? ''} rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-geist text-[0.85em] text-accent`}
      >
        {children}
      </code>
    ),
    kbd: ({ ...p }) => (
      <kbd {...p} className="rounded border border-neutral-700 bg-neutral-900 px-1.5 font-mono text-xs" />
    ),

    table: ({ ...p }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-neutral-800">
        <table {...p} className="w-full text-left text-sm" />
      </div>
    ),
    tr: ({ ...p }) => <tr {...p} className="transition-colors hover:bg-neutral-900/50" />,
    th: ({ ...p }) => (
      <th
        {...p}
        className="bg-neutral-900/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-neutral-400"
      />
    ),
    td: ({ ...p }) => (
      <td {...p} className="border-t border-neutral-800 px-4 py-2 text-neutral-300" />
    ),

    details: ({ ...p }) => (
      <details {...p} className="my-4 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4" />
    ),
    summary: ({ ...p }) => (
      <summary {...p} className="cursor-pointer font-medium text-neutral-200" />
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkGemoji]}
      rehypePlugins={[rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  );
}

export default Markdown;
