<x-mail::message>
# New High Score

<h2>Player Information</h2>
<ul>
    <li>Player name: {{ $score->display_name }}</li>
    <li>Date Played: {{ $score->date_played }}</li>
    <li>Total Rounds: {{ $score->total_rounds }}</li>
    <li>Avg Time: {{ number_format($score->avg_time / 1000, 3) }}</li>
    <li>IP Address: {{ $score->ip_address }}</li>
    <li>Approved: {{ $score->approved }} </li>
</ul>
@if( !$score->approved )
<x-mail::button :url="$url">
Approve score
</x-mail::button>
@else
<x-mail::button :url="$url">
Disapprove score
</x-mail::button>
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
