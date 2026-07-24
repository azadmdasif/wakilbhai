export default function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center sm:mb-12">
      <h1 className="mb-3 font-display text-3xl font-extrabold text-white sm:mb-4 sm:text-4xl md:text-5xl">{title}</h1>
      {subtitle && <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
