<?php

namespace App\Http\Controllers\Blog;

use App\Events\ContactNotification;
use App\Http\Controllers\Controller;
use App\Http\Requests\Blog\StoreContactMessageRequest;
use App\Services\ContactMessageService;

class ContactMessageController extends Controller
{
    public function __construct(private ContactMessageService $contactMessageService) {}

    public function __invoke(StoreContactMessageRequest $request)
    {
        try {

            $this->contactMessageService->create($request->validated());

            ContactNotification::dispatch($request->name, $request->message, $request->subject, $request->email, $request->to);

            return redirect()->back()->with('success', 'Submitted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Submission failed! Please try again.']);
        }
    }
}
