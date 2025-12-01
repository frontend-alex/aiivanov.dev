import React from 'react';

const JsonLd = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Aleksandar Ivanov",
        url: "https://aiivanov.dev",
        image: "https://aiivanov.dev/images/og-image.png",
        sameAs: [
            "https://twitter.com/aiivanov",
            "https://github.com/frontend-alex",
            "https://www.linkedin.com/in/aleksandar-ivanov-0356a8274/",
        ],
        jobTitle: "Creative Software Engineer",
        worksFor: {
            "@type": "Organization",
            name: "AI Ivanov",
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "AI Ivanov Portfolio",
        url: "https://aiivanov.dev",
        potentialAction: {
            "@type": "SearchAction",
            target: "https://aiivanov.dev/?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </section>
    );
};

export default JsonLd;
