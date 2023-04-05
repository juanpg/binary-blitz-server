<?php

use App\Http\Controllers\ScoreController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Main', [

    ]);
});

Route::group(['controller' => ScoreController::class], function() {
    Route::get('/scores', 'list')->name('scores.getTop50');
    Route::post('/scores', 'submit')->middleware('google.recaptcha')->name('scores.submitHighScore');
    Route::get('/scores/approve/{score}', 'approve')->middleware('signed')->name('scores.approve');
    Route::get('/scores/disapprove/{score}', 'disapprove')->middleware('signed')->name('scores.disapprove');
});