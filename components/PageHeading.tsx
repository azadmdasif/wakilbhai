export default function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-4">{title}</h1>
      {subtitle && <p className="max-w-2xl mx-auto text-lg text-gray-400">{subtitle}</p>}
    </div>
  );
}
