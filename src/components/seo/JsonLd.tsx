import { FC, useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

export const JsonLd: FC<JsonLdProps> = ({ data, id = 'json-ld' }) => {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);

    return () => {
      // Clean up script on unmount
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    };
  }, [data, id]);

  return null;
};

export default JsonLd;
