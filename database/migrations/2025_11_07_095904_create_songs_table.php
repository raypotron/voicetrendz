<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('excerpt')->nullable();
            $table->mediumText('content')->fulltext();

            $table->string('content_format')->default('html');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            $table->string('status')->default('draft');
            $table->timestamp('published_at')->nullable();

            $table->string('thumbnail_path')->nullable();
            $table->string('file_path')->nullable();

            $table->string('format')->nullable();
            $table->string('duration')->nullable();
            $table->integer('duration_seconds')->nullable();
            $table->integer('bitrate')->nullable();

            $table->foreignId('artist_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('album_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
