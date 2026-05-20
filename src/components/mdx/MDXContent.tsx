import { MDXRemote } from 'next-mdx-remote/rsc'
import { Chapter } from './Chapter'
import { Decision } from './Decision'
import { ConfidentialBlock } from './ConfidentialBlock'
import type { MDXComponents } from 'mdx/types'

const defaultComponents: MDXComponents = {
  Chapter,
  Decision,
  ConfidentialBlock,
  h1: (props) => <h1 className="text-3xl font-bold text-fg mt-12 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold text-fg mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold text-fg mt-8 mb-3" {...props} />,
  p: (props) => <p className="text-fg-muted leading-relaxed mb-4" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 space-y-1 mb-4 text-fg-muted" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 space-y-1 mb-4 text-fg-muted" {...props} />,
  li: (props) => <li className="text-fg-muted" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-fg-muted" {...props} />
  ),
  code: (props) => (
    <code
      className="bg-surface-raised text-accent px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface rounded-xl p-4 overflow-x-auto mb-6 border border-border text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
}

interface MDXContentProps {
  source: string
  components?: MDXComponents
}

export async function MDXContent({ source, components = {} }: MDXContentProps) {
  return <MDXRemote source={source} components={{ ...defaultComponents, ...components }} />
}
