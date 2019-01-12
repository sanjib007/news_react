<?php

namespace App\Http\Controllers;

use App\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $category =  \App\Category::all();
        return response()->json($category);
    }

    public function getDataByValue($country_id = null, $category_id = null)
    {
        if($country_id == null && $category_id == null){
            $news = News::paginate(20);
        }else if($country_id != null && $category_id == null){
            $news = News::where('country_id', $country_id)
                ->paginate(20);
        }else if($country_id == null && $category_id != null){
            $news = News::where('category_id', $category_id)
                ->paginate(20);
        }else{
            $news = News::where('category_id', $category_id)
                ->where('country_id', $country_id)
                ->paginate(20);
        }

        return response()->json($news);
    }
}
