<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'phoneNumber', 'password', 'role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function attendance()
    {
        return $this->hasMany('App\Attendance');
    }

    public function exams()
    {
        return $this->hasMany('App\Exam');
    }

    public function notes()
    {
        return $this->hasMany('App\Notes');
    }

    public function timetable()
    {
        return $this->hasMany('App\Timetable');
    }

    public function result()
    {
        return $this->hasMany('App\Result');
    }

    public function transactions()
    {
        return $this->hasMany('App\Transactions');
    }
}
