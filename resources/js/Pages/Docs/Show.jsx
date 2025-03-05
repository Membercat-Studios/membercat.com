import { Head } from "@inertiajs/react";
import DocsLayout from "@/Layouts/DocsLayout";
import { useEffect } from "react";

export default function Show({
    content,
    metadata,
    sections,
    currentSection,
    currentPage,
    tableOfContents,
}) {
    useEffect(() => {
        // Add click feedback for copy buttons
        const copyButtons = document.querySelectorAll(".copy-feedback");
        copyButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const icon = button.querySelector("i");
                const originalClass = icon.className;
                icon.className = "fas fa-check";
                setTimeout(() => {
                    icon.className = originalClass;
                }, 1000);
            });
        });
    }, [content]);

    return (
        <DocsLayout
            sections={sections}
            currentSection={currentSection}
            currentPage={currentPage}
            tableOfContents={tableOfContents}
        >
            <Head title={metadata.title} />

            <div className="mb-12">
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {metadata.title}
                    </h1>
                    {metadata.description && (
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {metadata.description}
                        </p>
                    )}
                </div>
            </div>

            <div
                className="prose prose-invert prose-lg max-w-none
                    prose-headings:scroll-mt-24 prose-headings:font-semibold
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-zinc-300 prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white/90 prose-strong:font-medium
                    prose-code:text-primary/90 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 
                    prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-['']
                    prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5
                    prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:p-4
                    prose-ul:my-6 prose-ul:list-disc prose-ul:marker:text-primary/50
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:marker:text-primary/50
                    prose-li:my-2
                    prose-blockquote:border-l-2 prose-blockquote:border-primary/30 
                    prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg 
                    prose-blockquote:py-2 prose-blockquote:pl-6 prose-blockquote:pr-4
                    prose-blockquote:not-italic prose-blockquote:text-zinc-300
                    prose-hr:my-12 prose-hr:border-white/5
                    [&_pre]:relative
                    [&_pre]:scrollbar-thin [&_pre]:scrollbar-track-black/5 [&_pre]:scrollbar-thumb-white/10
                    [&_.heading-permalink]:ml-2 [&_.heading-permalink]:text-zinc-500 hover:[&_.heading-permalink]:text-primary
                    [&_.table-of-contents]:bg-white/5 [&_.table-of-contents]:rounded-xl 
                    [&_.table-of-contents]:p-6 [&_.table-of-contents]:my-8 
                    [&_.table-of-contents]:border [&_.table-of-contents]:border-white/10
                    prose-pre:relative
                    [&_pre_.copy-feedback]:absolute [&_pre_.copy-feedback]:top-3 [&_pre_.copy-feedback]:right-3
                    [&_pre_.copy-feedback]:opacity-0 [&_pre_.copy-feedback:hover]:opacity-100"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </DocsLayout>
    );
}
