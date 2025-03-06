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
            'sectionData' => $this->getDocsSection(),
        ]);
    }

    public function show($path)
    {
        $sectionData = $this->getDocsSection();
        $section = $sectionData['sections'][$path] ?? abort(404);

        if ($section['type'] === 'category') {
            return $this->show($section['firstSection']);
        }

        $html = $this->converter->convert($section['content'])->getContent();
        $html = preg_replace_callback('/<pre><code class="language-([^"]+)">(.*?)\n?<\/code><\/pre>/s', function ($matches) {
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

        $section['content'] = $html;
        return Inertia::render('Docs/Show', [
            'sectionData' => $sectionData,
            'currentSection' => $section,
            'tableOfContents' => $this->generateTableOfContents($html),
        ]);
    }

    protected function getDocsSection($path = '')
    {
        $actualPath = $this->docsPath . '/' . $path;
        if (!File::exists($actualPath)) {
            return [];
        }

        $subSections = [];
        $singleFiles = collect(File::files($actualPath))
            ->filter(fn($file) => $file->getExtension() === 'md')
            ->map(fn($file) => $this->parseFileData($file, $path));

        foreach ($singleFiles as $file) {
            $sections[$file['path']] = $file;
            $subSections[] = $file['path'];
        }

        foreach (File::directories($actualPath) as $dir) {
            $subPath = $this->path($path, basename($dir));
            $result = $this->getDocsSection($subPath);
            $sections[$subPath] = $result['this'];
            $subSections[] = $subPath;
            foreach ($result['sections'] as $sect) {
                $sections[$sect['path']] = $sect;
            }
        }

        $categoryFile = $actualPath . '/category.json';
        $metadata = File::exists($categoryFile) ? json_decode(File::get($categoryFile), true) : [];
        $firstSection = !empty($subSections) ? $subSections[0] : NULL;
        $section = array_merge($metadata, [
            'type' => 'category',
            'name' => $metadata['name'] ?? ucfirst(str_replace('-', ' ', basename($actualPath))),
            'path' => $path,
            'firstSection' => array_key_exists('first_section', $metadata) ? $this->path($path, $metadata['first_section']) : $firstSection,
            'subSections' => $subSections,
            'position' => $metadata['position'] ?? 999,
        ]);

        return ['sections' => $sections ?? [], 'this' => $section];
    }

    protected function parseFileData($file, $path)
    {
        $content = File::get($file->getPathname());
        $document = YamlFrontMatter::parse($content);
        $metadata = $document->matter();
        $filename = $file->getFilenameWithoutExtension();

        return [
            'type' => 'single',
            'path' => $this->path($path, $filename),
            'title' => $metadata['title'] ?? ucfirst(str_replace('-', ' ', $filename)),
            'description' => $metadata['description'] ?? '',
            'content' => $document->body(),
            'position' => $metadata['position'] ?? 999,
        ];
    }

    protected function path($base, $nextElement)
    {
        return empty($base) ? $nextElement : $base . '/' . $nextElement;
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
