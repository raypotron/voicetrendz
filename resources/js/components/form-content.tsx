import React from 'react';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';

type Props = {
  html: string;
};

export const FormatContent: React.FC<Props> = ({ html }) => {
  const rendered = parse(html, {
    replace: (domNode: DOMNode) => {
      if (domNode.type !== 'tag') return undefined;
      const el = domNode as Element;

      switch (el.name) {
        case 'h1':
          return <h1 className="text-3xl font-semibold mb-4">{domToReact(el.children)}</h1>;

        case 'h2':
          return <h2 className="text-2xl font-semibold mt-6 mb-3">{domToReact(el.children)}</h2>;

        case 'h3':
          return <h3 className="text-xl font-semibold mt-5 mb-2">{domToReact(el.children)}</h3>;

        case 'p':
          return <p className="mb-4 leading-relaxed">{domToReact(el.children)}</p>;

        case 'strong':
          return <strong className="font-semibold">{domToReact(el.children)}</strong>;

        case 'em':
          return <em className="italic">{domToReact(el.children)}</em>;

        case 'a': {
          const href = (el.attribs && el.attribs.href) || '#';
          const isExternal = href.startsWith('http') || href.startsWith('//');
          return (
            <a
              href={href}
              className="underline text-emerald-600 hover:text-emerald-700"
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {domToReact(el.children)}
            </a>
          );
        }

        case 'ul':
          return <ul className="list-disc pl-6 mb-4 space-y-1">{domToReact(el.children)}</ul>;

        case 'ol':
          return <ol className="list-decimal pl-6 mb-4 space-y-1">{domToReact(el.children)}</ol>;

        case 'li':
          // keep inner structure (links/strong/etc.) intact
          return <li className="mb-1">{domToReact(el.children)}</li>;

        case 'img': {
          const src = el.attribs?.src ?? '/placeholder.svg';
          const alt = el.attribs?.alt ?? 'image';
          return (
            <figure className="my-4">
              {/* img responsive */}
              <img src={src} alt={alt} className="max-w-full h-auto rounded" />
              {alt && <figcaption className="text-sm mt-1 text-gray-500">{alt}</figcaption>}
            </figure>
          );
        }

        case 'blockquote':
          return <blockquote className="border-l-4 pl-4 italic text-gray-700 my-4">{domToReact(el.children)}</blockquote>;

        case 'br':
          return <br />;

        case 'hr':
          return <hr className="my-6 border-gray-200" />;

        case 'span':
          return <span>{domToReact(el.children)}</span>;

        default:
          // Let unhandled tags render normally
          return undefined;
      }
    },
  });

  return <div className="blog-content prose prose-lg dark:prose-invert max-w-none">{rendered}</div>;
};

export default FormatContent;
