<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    //
    protected $fillable = [
        'id',
        'user_id',
        'timetable_id',
        'created_at',
        'updated_at',
    ];

    public function get_user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function get_lecture()
    {
        return $this->belongsTo('App\Timetable', 'timetable_id');
    }
}
