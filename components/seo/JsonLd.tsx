/**
 * Renders one or more JSON-LD blocks inside <script type="application/ld+json">.
 *
 * Safety: `<` is escaped to `<` so a stray "</script>" inside any string
 * value can never break out of the script element. `null` entries are dropped,
 * so builders that return null (e.g. an empty FAQ list) can be passed inline.
 */
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
