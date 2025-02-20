<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeUserAdmin extends Command
{
    protected $signature = 'user:admin {email}';
    protected $description = 'Give a user admin privileges';

    public function handle()
    {
        $email = $this->argument('email');
        
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("No user found with email: {$email}");
            return 1;
        }
        
        $user->role = 'admin';
        $user->save();
        
        $this->info("Successfully made {$user->name} ({$email}) an admin!");
        return 0;
    }
} 