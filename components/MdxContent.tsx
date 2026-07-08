import { MDXRemote } from 'next-mdx-remote/rsc';

/**
 * Server-rendered MDX body for guides and other long-form content.
 * Tables must scroll on small screens, hence the wrapper.
 */
const components = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-invert prose-headings:font-display prose-headings:text-white prose-a:text-brand-gold prose-strong:text-white prose-li:marker:text-brand-gold max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
