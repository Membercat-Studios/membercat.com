<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            
        });

        $this->renderable(function (AuthenticationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
            
            return Inertia::render('Util/401')
                ->toResponse($request)
                ->setStatusCode(401);
        });

        $this->renderable(function (AuthorizationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Forbidden.'], 403);
            }
            
            return Inertia::render('Util/403')
                ->toResponse($request)
                ->setStatusCode(403);
        });

        $this->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Not Found.'], 404);
            }
            
            return Inertia::render('Util/404')
                ->toResponse($request)
                ->setStatusCode(404);
        });

        $this->renderable(function (HttpException $e, $request) {
            if ($e->getStatusCode() == 500) {
                if ($request->expectsJson()) {
                    return response()->json(['message' => 'Server Error.'], 500);
                }
                
                return Inertia::render('Util/500')
                    ->toResponse($request)
                    ->setStatusCode(500);
            }
        });
    }
} 