import Script from 'next/script';

interface StructuredDataProps {
  data: object | object[];
}

/**
* Renders provided structured data as JSON-LD script tags within a fragment.
* @example
* StructuredData([{ "@context": "https://schema.org", "@type": "NewsArticle" }])
* <>
*   <script type="application/ld+json">{...}</script>
* </>
* @param {{StructuredDataProps}} {{data}} - Data to render as JSON-LD structured data.
* @returns {{React.JSX.Element}} Return a fragment containing JSON-LD script elements.
**/
export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

