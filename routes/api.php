<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::middleware('api', 'throttle:60,1')->group(function () {
    Route::get('/country', 'CountryController@index');
    Route::get('/category', 'CategoryController@index');
    Route::get('/news/{country_id?}/{category_id?}', 'NewsController@getDataByValue');
});

