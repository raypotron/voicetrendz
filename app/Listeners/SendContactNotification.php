<?php

namespace App\Listeners;

use App\Events\ContactNotification;
use App\Mail\NewContactMessage as NewContactMessageMail;
use App\Models\User;
use App\Notifications\NewContactMessage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class SendContactNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ContactNotification $event): void
    {
        $adminUsers = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->get();

        Notification::send($adminUsers, new NewContactMessage($event->name, $event->message,
            $event->subject, $event->email, $event->to));

        if ($event->to) {
            Mail::to($event->to)->queue(new NewContactMessageMail([
                'name' => $event->name,
                'message' => $event->message,
                'subject' => $event->subject,
                'email' => $event->email,
                'to' => $event->to,
            ]));
        }
    }
}
