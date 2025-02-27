<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'is_banned',
        'discord_id',
        'discord_username',
        'discord_token',
        'discord_refresh_token',
        'discord_avatar',
        'github_id',
        'github_username',
        'github_token',
        'github_avatar',
        'last_login',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'discord_token',
        'discord_refresh_token',
        'github_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_banned' => 'boolean',
        'last_login' => 'datetime',
    ];

    const ROLE_USER = 'user';
    const ROLE_ADMIN = 'admin';
    const ROLE_MOD = 'mod';

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isMod(): bool
    {
        return $this->role === self::ROLE_MOD;
    }

    public function makeAdmin(string $email): bool
    {
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            return false;
        }
        
        $user->role = self::ROLE_ADMIN;
        return $user->save();
    }
}
