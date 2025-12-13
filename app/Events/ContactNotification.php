<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContactNotification
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $name;

    public string $message;

    public string $subject;

    public string $email;

    public string $to;

    /**
     * Create a new event instance.
     */
    public function __construct($name, $message, $subject, $email, $to)
    {
        $this->name = $name;
        $this->message = $message;
        $this->subject = $subject;
        $this->email = $email;
        $this->to = $to;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
