<?php

namespace App\CommonMark;

use League\CommonMark\Renderer\NodeRendererInterface;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Node\Node;

class CodeWithCopyButtonRenderer implements NodeRendererInterface
{
    protected $baseRenderer;

    public function __construct(NodeRendererInterface $baseRenderer)
    {
        $this->baseRenderer = $baseRenderer;
    }

    public function render(Node $node, ChildNodeRendererInterface $childRenderer)
    {
        $element = $this->baseRenderer->render($node, $childRenderer);
        $contents = $element->getContents();

        // Don't show the copy button on code blocks smaller than 2 lines
        if (count(explode("\n", $contents)) > 2) {
            $element->setContents(
                sprintf('<div class="relative group"><button
                        onclick="navigator.clipboard.writeText(this.parentElement.querySelector(\'code\').textContent).then(() => { 
                            const icon = this.querySelector(\'i\');
                            icon.className = \'fas fa-check\';
                            setTimeout(() => icon.className = \'fas fa-copy\', 1000);
                        })" 
                        class="copy-feedback absolute w-12 h-12 top-3 right-3 p-2 rounded-lg bg-white/5 text-zinc-400 
                               opacity-0 group-hover:opacity-100 hover:text-white transition-all duration-200"
                        title="Copy to clipboard"
                    ><i class="fa-solid fa-clipboard"></i></button>%s</div>', $contents)
            );
        }

        return $element;
    }
}
