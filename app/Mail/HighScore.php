<?php

namespace App\Mail;

use App\Models\Score;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class HighScore extends Mailable
{
    use Queueable, SerializesModels;

    public $score;

    /**
     * Create a new message instance.
     */
    public function __construct(Score $score)
    {
        $this->score = $score;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $nameApproved = $this->score->approved ? 'Approved' : 'Review';
        return new Envelope(
            subject: "New High Score ($nameApproved)",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.highscore',
            with: [
                'score' => $this->score,
                'url' => URL::temporarySignedRoute($this->score->approved ? 'scores.disapprove' : 'scores.approve', now()->addMinutes(60), ['score' => $this->score])
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
