<x-mail::message>
You have received a new message from **{{ $name }}**.

**Email:** {{ $email }}

**Message:**
{{ $message }}


Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
