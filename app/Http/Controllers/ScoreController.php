<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Rules\RoundTimeLimit;
use App\Mail\HighScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Config;
use Carbon\Carbon;

class ScoreController extends Controller
{
    public function list(Request $request) {
        $validator = Validator::make($request->all(), [
            'cookie_id' => 'nullable|uuid'
        ]);
        \abort_if($validator->fails(), response()->json(['message'=>'Invalid cookie identifier'], 400));
        
        $cookie_id = $request->input('cookie_id', '');

        $top50 = DB::table('scores')
                    ->selectRaw('cookie_id = ? AS active_player, CASE WHEN approved = 1 THEN display_name ELSE "(Pending approval)" END as display_name ', [$cookie_id])
                    ->addSelect('date_played', 'total_rounds', 'avg_time')
                    ->orderBy('total_rounds', 'desc')
                    ->orderBy('avg_time', 'asc')
                    ->limit(50)
                    ->get();
        return response()->json($top50, 200);
    }

    public function submit(Request $request) {
        $request->validate([
            'player_name' => 'required|max:50',
            'cookie_id' => 'required|uuid',
            'round_times' => ['required', new RoundTimeLimit],
        ]);

        $data = $request->all();
        $roundTimes = @$data["round_times"] ?? array();

        $totalTime = array_reduce($roundTimes, function($t, $i) { return $t + $i; }, 0);
        $totalRounds = count($roundTimes);
        $avgTime = $totalRounds > 0 ? $totalTime / $totalRounds : 0;

        $oldScore = Score::firstWhere('cookie_id', $data['cookie_id']);

        // If we're updating the high score, make sure it is actually a higher score
        if($oldScore !== null && ($oldScore->total_rounds > $totalRounds || ($oldScore->total_rounds === $totalRounds && $oldScore->avg_time < $avgTime ))) {
            return response()->json([
                'message' => 'Your current score in the leaderboard is higher'
            ], 409);
        }

        // Calculate profanity of playername
        $moderatorRequest = Http::withHeaders([
            'Content-Type' => 'text/plain',
            'Ocp-Apim-Subscription-Key' => Config::get('app.ms_moderator_key'),
        ])->post( Config::get('app.ms_moderator_url'), [
            'body' => $data['player_name']
        ]);

        $moderator = $moderatorRequest->json();

        $approved = false;
        if($moderatorRequest->ok()) {
            $approved = !$moderator['Classification']['ReviewRecommended'];
        }

        $score = Score::updateOrCreate(
            [
                'cookie_id' => $data['cookie_id'] 
            ],
            [
                'display_name' => $data["player_name"],
                'date_played' => Carbon::now('UTC')->format('Y-m-d H:i:s'),
                'total_rounds' => $totalRounds,
                'avg_time' => $avgTime,
                'round_times' => $roundTimes,
                'ip_address' => $request->ip(),
                'approved' => $approved
            ]
        );

        Mail::to(Config::get('mail.from.address'))->send(new HighScore($score));

        return response()->json([
            'approved' => $approved
        ], 201);
    }

    public function approve(Request $request, Score $score) {

        $score->approved = true;
        $score->save();
        return response('approved');
    }

    public function disapprove(Request $request, Score $score) {
        $score->approved = false;
        $score->save();
        return response('disapproved');
    }
}
