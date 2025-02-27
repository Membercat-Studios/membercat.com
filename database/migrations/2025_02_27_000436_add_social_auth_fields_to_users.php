<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Discord fields
            $table->string('discord_id')->nullable()->unique();
            $table->string('discord_username')->nullable();
            $table->text('discord_token')->nullable();
            $table->text('discord_refresh_token')->nullable();
            $table->string('discord_avatar')->nullable();

            // GitHub fields
            $table->string('github_id')->nullable()->unique();
            $table->string('github_username')->nullable();
            $table->text('github_token')->nullable();
            $table->string('github_avatar')->nullable();

            // Add indexes
            $table->index(['discord_id', 'github_id']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'discord_id',
                'discord_username',
                'discord_token',
                'discord_refresh_token',
                'discord_avatar',
                'github_id',
                'github_username',
                'github_token',
                'github_avatar',
            ]);
        });
    }
};