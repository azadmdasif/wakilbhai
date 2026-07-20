import { MDXRemote } from 'next-mdx-remote/rsc';

const baseComponents = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

const darkProse =
  'prose prose-invert prose-headings:font-display prose-headings:text-white prose-a:text-brand-gold prose-strong:text-white prose-li:marker:text-brand-gold max-w-none';
const paperProse =
  'prose prose-headings:font-display prose-headings:text-[#1A1D23] prose-p:text-[#1A1D23] prose-li:text-[#1A1D23] prose-a:text-brand-red prose-strong:text-[#1A1D23] prose-li:marker:text-brand-red max-w-none';

/**
 * Server-rendered MDX body for long-form content. `paper` switches from the
 * dark reading surface (tools) to the warm paper surface (guides).
 */
export default function MdxContent({ source, paper = false }: { source: string; paper?: boolean }) {
  return (
    <div className={paper ? paperProse : darkProse}>
      <MDXRemote source={source} components={baseComponents} />
    </div>
  );
}
