<?php

namespace App\Http\Controllers;

use App\Models\Score;

use Illuminate\Http\Request;

class ScoreController extends Controller
{
    public function test(Request $request) {
        return response()->json([
            'count' => Score::all()->count()
        ], 200);
    }
}
