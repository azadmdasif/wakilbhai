import { MDXRemote } from 'next-mdx-remote/rsc';

const baseComponents = {
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

/**
 * Server-rendered MDX body for guides and other long-form content.
 * Tables must scroll on small screens, hence the wrapper.
 *
 * `ctaLadder` and `deadlineTimeline` are pre-configured nodes exposed to MDX as
 * `<CtaLadder />` and `<DeadlineTimeline />`, so a guide can drop them into the
 * right section (conversion block after costs; clock in the timeline section).
 */
export default function MdxContent({
  source,
  ctaLadder,
  deadlineTimeline,
}: {
  source: string;
  ctaLadder?: React.ReactNode;
  deadlineTimeline?: React.ReactNode;
}) {
  const components = {
    ...baseComponents,
    CtaLadder: () => <>{ctaLadder ?? null}</>,
    DeadlineTimeline: () => <>{deadlineTimeline ?? null}</>,
  };
  return (
    <div className="prose prose-invert prose-headings:font-display prose-headings:text-white prose-a:text-brand-gold prose-strong:text-white prose-li:marker:text-brand-gold max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
