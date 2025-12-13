<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewContactMessage extends Notification implements ShouldQueue
{
    use Queueable;

    protected $senderName;

    protected $message;

    protected $subject;

    protected $email;

    protected $to;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $senderName, string $message, string $subject, string $email, string $to)
    {
        $this->senderName = $senderName;
        $this->message = $message;
        $this->subject = $subject;
        $this->email = $email;
        $this->to = $to;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)->markdown('mail.new-contact-message', [
            'name' => $this->senderName,
            'message' => $this->message,
            'email' => $this->email,
        ])->subject($this->subject)
            ->line($this->message);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'subject' => $this->subject,
            'message' => $this->message,
            'name' => $this->senderName,
            'email' => $this->email,
            'to' => $this->to,
        ];
    }
}
