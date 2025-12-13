<?php

namespace App\Services;

use App\Events\ContactNotification;
use App\Models\ContactMessage;

class ContactMessageService
{
    public function __construct(private ContactMessage $contactMessage) {}

    public function create(array $data)
    {
        return ContactNotification::dispatch($data['name'], $data['message'], $data['subject'], $data['email'], $data['to']);
    }
}
