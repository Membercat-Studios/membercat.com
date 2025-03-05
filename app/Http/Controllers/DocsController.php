<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use League\CommonMark\GithubFlavoredMarkdownConverter;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class DocsController extends Controller
{
    protected $docsPath;
    protected $converter;

    public function __construct()
    {
        $this->docsPath = resource_path('docs');
        $this->converter = new GithubFlavoredMarkdownConverter([
            'html_input' => 'allow',
            'allow_unsafe_links' => false,
            'heading_permalink' => [
                'html_class' => 'heading-permalink',
                'symbol' => '#',
                'insert' => 'after'
            ],
            'table_of_contents' => [
                'html_class' => 'table-of-contents',
                'position' => 'top',
            ],
            'github_flavored_markdown' => [
                'enable_tables' => true,
                'enable_tasklists' => true,
                'enable_strikethrough' => true,
            ],
        ]);
    }

    public function index()
    {
        return Inertia::render('Docs/Home', [
            'sections' => $this->getDocsSections(),
        ]);
    }

    public function show($section, $page = 'index')
    {
        $singleFilePath = "{$this->docsPath}/{$section}.md";
        $categoryFilePath = "{$this->docsPath}/{$section}/{$page}.md";
        
        if (File::exists($singleFilePath)) {
            $filePath = $singleFilePath;
        } elseif (File::exists($categoryFilePath)) {
            $filePath = $categoryFilePath;
        } else {
            abort(404);
        }

        $document = YamlFrontMatter::parse(File::get($filePath));
        $metadata = $document->matter();
        $html = $this->converter->convert($document->body())->getContent();
        
        $html = preg_replace_callback('/<pre><code class="language-([^"]+)">(.*?)\n?<\/code><\/pre>/s', function($matches) {
            $language = $matches[1];
            $code = rtrim($matches[2]);
            
            return sprintf(
                '<div class="relative group">
                    <button 
                        onclick="navigator.clipboard.writeText(this.parentElement.querySelector(\'code\').textContent).then(() => { 
                            const icon = this.querySelector(\'i\');
                            icon.className = \'fas fa-check\';
                            setTimeout(() => icon.className = \'fas fa-copy\', 1000);
                        })" 
                        class="copy-feedback absolute top-3 right-3 p-2 rounded-lg bg-white/5 text-zinc-400 
                               opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-200"
                        title="Copy to clipboard"
                    >
                        <i class="fa-solid fa-clipboard"></i>
                    </button>
                    <pre><code class="language-%s">%s</code></pre>
                </div>',
                $language,
                $code
            );
        }, $html);

        return Inertia::render('Docs/Show', [
            'sections' => $this->getDocsSections(),
            'currentSection' => $section,
            'currentPage' => $page,
            'content' => $html,
            'metadata' => $metadata,
            'tableOfContents' => $this->generateTableOfContents($html),
        ]);
    }

    protected function getDocsSections()
    {
        if (!File::exists($this->docsPath)) {
            return [];
        }

        $sections = [];

        $singleFiles = collect(File::files($this->docsPath))
            ->filter(fn($file) => $file->getExtension() === 'md')
            ->map(function ($file) {
                $content = File::get($file->getPathname());
                $document = YamlFrontMatter::parse($content);
                $metadata = $document->matter();

                return [
                    'name' => $file->getFilenameWithoutExtension(),
                    'title' => $metadata['title'] ?? ucfirst(str_replace('-', ' ', $file->getFilenameWithoutExtension())),
                    'description' => $metadata['description'] ?? '',
                    'position' => $metadata['position'] ?? 0,
                    'type' => 'single',
                ];
            })
            ->sortBy('position')
            ->values()
            ->all();

        foreach ($singleFiles as $file) {
            $sections[] = [
                'name' => $file['title'],
                'title' => $file['title'],
                'description' => $file['description'],
                'directory' => $file['name'],
                'position' => $file['position'],
                'type' => 'single',
            ];
        }

        $categorizedSections = collect(File::directories($this->docsPath))
            ->map(function ($dir) {
                $categoryFile = $dir . '/category.json';
                $metadata = File::exists($categoryFile) 
                    ? json_decode(File::get($categoryFile), true)
                    : [
                        'name' => ucfirst(str_replace('-', ' ', basename($dir))),
                        'position' => 999,
                    ];

                $pages = collect(File::files($dir))
                    ->filter(fn($file) => $file->getExtension() === 'md')
                    ->map(function ($file) {
                        $content = File::get($file->getPathname());
                        $document = YamlFrontMatter::parse($content);
                        $metadata = $document->matter();

                        return [
                            'name' => $file->getFilenameWithoutExtension(),
                            'title' => $metadata['title'] ?? ucfirst(str_replace('-', ' ', $file->getFilenameWithoutExtension())),
                            'description' => $metadata['description'] ?? '',
                            'position' => $metadata['position'] ?? 999,
                        ];
                    })
                    ->sortBy('position')
                    ->values()
                    ->all();

                return array_merge($metadata, [
                    'name' => $metadata['name'],
                    'pages' => $pages,
                    'directory' => basename($dir),
                    'type' => 'category',
                    'position' => $metadata['position'] ?? 999,
                ]);
            })
            ->sortBy('position')
            ->values()
            ->all();

        return collect(array_merge($sections, $categorizedSections))
            ->sortBy('position')
            ->values()
            ->all();
    }

    protected function generateTableOfContents($html)
    {
        preg_match_all('/<h([2-3])\s+id="(.+?)">(.+?)<\/h[2-3]>/', $html, $matches, PREG_SET_ORDER);
        
        $toc = [];
        foreach ($matches as $match) {
            $level = (int)$match[1];
            $id = $match[2];
            $title = strip_tags($match[3]);
            
            $toc[] = [
                'level' => $level,
                'id' => $id,
                'title' => $title
            ];
        }
        
        return $toc;
    }
} 