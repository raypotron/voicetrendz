<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewContactMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $sender;

    /**
     * Create a new message instance.
     */
    public function __construct($payload)
    {
        $this->sender = $payload;
    }

    public function build()
    {
        return $this->from($this->sender['email'])
                    ->markdown('mail.new-contact-message')
                    ->with([
                        'subject' => $this->sender['subject'],
                        'message' => $this->sender['message'],
                        'email' => $this->sender['email'],
                        'name' => $this->sender['name'],
                    ]);
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->sender['subject'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'mail.new-contact-message',
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
