/** Renders one or more JSON-LD blocks. Pass null entries freely; they're skipped. */
export default function JsonLd({ data }: { data: (object | null)[] | object }) {
  const items = (Array.isArray(data) ? data : [data]).filter((d): d is object => d !== null);
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
