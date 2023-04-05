<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'cookie_id',
        'display_name',
        'date_played',
        'total_rounds',
        'avg_time',
        'round_times',
        'ip_address',
        'approved'
    ];

    protected $casts = [
        'date_played' => 'datetime',
        'total_rounds' => 'integer',
        'avg_time' => 'decimal:3',
        'round_times' => 'array',
        'approved' => 'boolean'
    ];
}
