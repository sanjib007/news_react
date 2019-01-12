<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('react');
});

Route::get('/country', 'CountryController@index');
Route::get('/category', 'CategoryController@index');
Route::get('/news/{country_id?}/{category_id?}', 'NewsController@getDataByValue');
