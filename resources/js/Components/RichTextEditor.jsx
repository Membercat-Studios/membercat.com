import { useEffect, useRef, useState } from "react";

export default function RichTextEditor({
    value,
    onChange,
    minHeight = "250px",
}) {
    const editorRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && !window.ClassicEditor) {
            const script = document.createElement("script");
            script.src =
                "https://cdn.ckeditor.com/ckeditor5/38.1.0/classic/ckeditor.js";
            script.async = true;
            script.onload = () => {
                setIsLoaded(true);
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else if (window.ClassicEditor) {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded && editorRef.current && !editorInstance) {
            window.ClassicEditor.create(editorRef.current, {
                toolbar: {
                    items: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "outdent",
                        "indent",
                        "|",
                        "blockQuote",
                        "insertTable",
                        "undo",
                        "redo",
                    ],
                },
                placeholder: "Write your content here...",
                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                    ],
                },
            })
                .then((editor) => {
                    setEditorInstance(editor);
                    editor.setData(value || "");

                    const editorElement = editor.ui.view.editable.element;
                    editorElement.style.minHeight = minHeight;
                    editorElement.style.maxHeight = "600px";
                    editorElement.style.overflowY = "auto";

                    editorElement.style.padding = "16px";

                    editor.model.document.on("change:data", () => {
                        onChange(editor.getData());
                    });

                    editor.editing.view.document.on("focus", () => {
                        setIsFocused(true);
                    });

                    editor.editing.view.document.on("blur", () => {
                        setIsFocused(false);
                    });
                })
                .catch((error) => {
                    console.error(error);
                });

            return () => {
                if (editorInstance) {
                    editorInstance.destroy();
                    setEditorInstance(null);
                }
            };
        }
    }, [isLoaded, minHeight]);

    useEffect(() => {
        if (
            editorInstance &&
            value !== undefined &&
            editorInstance.getData() !== value
        ) {
            editorInstance.setData(value || "");
        }
    }, [value, editorInstance]);

    return (
        <div
            className={`bg-zinc-900 rounded-md border ${
                isFocused ? "border-primary" : "border-zinc-700"
            } transition-colors duration-200 overflow-hidden`}
        >
            {!isLoaded && (
                <div className="p-4 text-zinc-400 animate-pulse min-h-[300px] flex items-center justify-center">
                    <div className="flex items-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Loading editor...
                    </div>
                </div>
            )}
            <div
                ref={editorRef}
                className="prose prose-invert max-w-none"
                style={{ minHeight: minHeight }}
            ></div>
        </div>
    );
}
