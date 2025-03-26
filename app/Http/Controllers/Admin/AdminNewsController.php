<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\User;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
    public function index()
    {
        $news = News::with(['author', 'category'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            
        $categories = NewsCategory::withCount('news')->get();
        
        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'categories' => $categories,
            'success' => session('success')
        ]);
    }
    
    public function create()
    {
        $categories = NewsCategory::all();
        
        return Inertia::render('Admin/News/Create', [
            'categories' => $categories
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:2048',
            'category_id' => 'nullable|exists:news_categories,id',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date'
        ]);
        
        $slug = Str::slug($request->title);
        $uniqueSlug = $slug;
        $counter = 1;
        
        while (News::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }
        
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news', 'public');
        }
        
        News::create([
            'title' => $request->title,
            'slug' => $uniqueSlug,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'image' => $imagePath ? '/storage/' . $imagePath : null,
            'category_id' => $request->category_id,
            'is_featured' => $request->is_featured ?? false,
            'published_at' => $request->published_at ?? now(),
            'author_id' => auth()->id()
        ]);
        
        return redirect()->route('admin.news.index')->with('success', 'News post created successfully');
    }
    
    public function edit(News $news)
    {
        $news->load(['author', 'category']);
        $categories = NewsCategory::all();
        
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
            'categories' => $categories
        ]);
    }
    
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|image|max:2048',
            'category_id' => 'nullable|exists:news_categories,id',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date'
        ]);
        
        if ($request->title !== $news->title) {
            $slug = Str::slug($request->title);
            $uniqueSlug = $slug;
            $counter = 1;
            
            while (News::where('slug', $uniqueSlug)->where('id', '!=', $news->id)->exists()) {
                $uniqueSlug = $slug . '-' . $counter;
                $counter++;
            }
            
            $news->slug = $uniqueSlug;
        }
        
        if ($request->hasFile('image')) {
            if ($news->image && Storage::disk('public')->exists(str_replace('/storage/', '', $news->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $news->image));
            }
            
            $imagePath = $request->file('image')->store('news', 'public');
            $news->image = '/storage/' . $imagePath;
        }
        
        $news->title = $request->title;
        $news->content = $request->content;
        $news->excerpt = $request->excerpt;
        $news->category_id = $request->category_id;
        $news->is_featured = $request->is_featured ?? false;
        $news->published_at = $request->published_at ?? now();
        $news->save();
        
        return redirect()->route('admin.news.index')->with('success', 'News post updated successfully');
    }
    
    public function destroy(News $news)
    {
        if ($news->image && Storage::disk('public')->exists(str_replace('/storage/', '', $news->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $news->image));
        }
        
        $news->delete();
        
        return redirect()->route('admin.news.index')->with('success', 'News post deleted successfully');
    }
} 