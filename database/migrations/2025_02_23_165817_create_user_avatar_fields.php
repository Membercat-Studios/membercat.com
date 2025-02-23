<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_photo_path')->nullable();
            $table->boolean('use_discord_avatar')->default(false);
            $table->string('discord_avatar')->nullable();
            $table->boolean('use_github_avatar')->default(false);
            $table->boolean('use_gravatar')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'profile_photo_path',
                'use_discord_avatar',
                'discord_avatar',
                'use_github_avatar',
                'use_gravatar'
            ]);
        });
    }
};