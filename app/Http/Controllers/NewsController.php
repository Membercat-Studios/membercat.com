<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::with(['author', 'category'])
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->paginate(9);
            
        $featuredNews = News::with(['author', 'category'])
            ->where('is_featured', true)
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
            
        $categories = NewsCategory::all();
        
        return Inertia::render('News', [
            'news' => $news,
            'featuredNews' => $featuredNews,
            'categories' => $categories,
        ]);
    }
    
    public function show($slug)
    {
        $newsItem = News::with(['author', 'category'])
            ->where('slug', $slug)
            ->where('published_at', '<=', now())
            ->firstOrFail();
            
        $relatedNews = News::with(['author', 'category'])
            ->where('id', '!=', $newsItem->id)
            ->where('category_id', $newsItem->category_id)
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
            
        return Inertia::render('News/Show', [
            'newsItem' => $newsItem,
            'relatedNews' => $relatedNews,
        ]);
    }
} 