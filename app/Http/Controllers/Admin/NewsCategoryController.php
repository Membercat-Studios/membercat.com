<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsCategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:news_categories,name',
        ]);
        
        $slug = Str::slug($request->name);
        $uniqueSlug = $slug;
        $counter = 1;
        
        while (NewsCategory::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }
        
        NewsCategory::create([
            'name' => $request->name,
            'slug' => $uniqueSlug,
        ]);
        
        return redirect()->back()->with('success', 'Category created successfully');
    }
    
    public function update(Request $request, NewsCategory $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:news_categories,name,' . $category->id,
        ]);
        
        $slug = Str::slug($request->name);
        $uniqueSlug = $slug;
        $counter = 1;
        
        while (NewsCategory::where('slug', $uniqueSlug)->where('id', '!=', $category->id)->exists()) {
            $uniqueSlug = $slug . '-' . $counter;
            $counter++;
        }
        
        $category->update([
            'name' => $request->name,
            'slug' => $uniqueSlug,
        ]);
        
        return redirect()->back()->with('success', 'Category updated successfully');
    }
    
    public function destroy(NewsCategory $category)
    {
        if ($category->news()->count() > 0) {
            return response()->json(['error' => 'Cannot delete category with associated news posts'], 422);
        }
        
        $category->delete();
        
        return response()->json(['success' => true]);
    }
} 