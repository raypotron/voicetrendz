<?php

namespace App\Services;

use App\Models\ContactMessage;

class ContactMessageService
{
    public function __construct(private ContactMessage $contactMessage){}

    public function create(array $data)
    {
        return $this->contactMessage->create($data);
    }
}
