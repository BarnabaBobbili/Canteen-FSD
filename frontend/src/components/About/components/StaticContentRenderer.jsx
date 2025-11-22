import React, { useEffect, useRef } from 'react';

/**
 * StaticContentRenderer Component
 * Renders content from data objects into JSX
 *
 * Supported content types:
 * - header: Page title
 * - heading: Section heading (h2, h3)
 * - paragraph: Text paragraph
 * - list: Bullet or numbered list
 * - link: Internal navigation link
 * - code: Code block
 */
const StaticContentRenderer = ({ content, setActiveSection, darkMode }) => {
  const containerRef = useRef(null);

  // Attach click handlers to all link elements after render
  useEffect(() => {
    if (!containerRef.current) return;

    const handleLinkClick = (e) => {
      const target = e.target;
      if (target.classList.contains('link') || target.closest('.link')) {
        const linkElement = target.classList.contains('link') ? target : target.closest('.link');
        const sectionId = linkElement.getAttribute('data-section');
        if (sectionId) {
          e.preventDefault();
          setActiveSection(sectionId);
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('click', handleLinkClick);

    return () => {
      container.removeEventListener('click', handleLinkClick);
    };
  }, [content, setActiveSection]);

  const renderElement = (element, index) => {
    switch (element.type) {
      case 'header':
        return (
          <header key={index}>
            <h1>{element.content}</h1>
          </header>
        );

      case 'heading':
        const HeadingTag = `h${element.level || 2}`;
        return <HeadingTag key={index}>{element.content}</HeadingTag>;

      case 'paragraph':
        return (
          <p key={index} dangerouslySetInnerHTML={{ __html: element.content }} />
        );

      case 'list':
        const ListTag = element.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={index}>
            {element.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );

      case 'link':
        return (
          <p key={index}>
            {element.prefix && <span>{element.prefix} </span>}
            <span
              className="link"
              onClick={() => setActiveSection(element.target)}
            >
              {element.text}
            </span>
            {element.suffix && <span> {element.suffix}</span>}
          </p>
        );

      case 'steps':
        return (
          <div key={index}>
            {element.items.map((step, i) => (
              <p key={i}>
                {step.emoji && <span>{step.emoji} </span>}
                <strong>
                  {step.code && <code>{step.code}</code>}
                  {step.label && `: ${step.label}`}
                </strong>
                {' - '}
                {step.linkText ? (
                  <>
                    <span
                      className="link"
                      onClick={() => setActiveSection(step.linkTarget)}
                    >
                      {step.linkText}
                    </span>
                    {step.description && <span> {step.description}</span>}
                  </>
                ) : (
                  <span>{step.description}</span>
                )}
              </p>
            ))}
          </div>
        );

      case 'code':
        return (
          <pre key={index}>
            <code>{element.content}</code>
          </pre>
        );

      case 'section':
        return (
          <div key={index} className={element.className}>
            {element.children.map((child, i) => renderElement(child, `${index}-${i}`))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef}>
      {content.map((element, index) => renderElement(element, index))}
    </div>
  );
};

export default StaticContentRenderer;
