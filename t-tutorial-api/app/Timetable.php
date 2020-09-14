<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    protected $table = "timetables";
    //
    protected $fillable = [
        'id',
        'course_id',
        'start_time',
        'end_time',
        'faculty_id',
        'created_at',
        'updated_at',
    ];

    public function getCourse()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function faculty()
    {
        return $this->belongsTo('App\User', 'faculty_id');
    }

    public function enrollment_timetable()
    {
        return $this->hasMany('App\EnrollToCourse', 'course_id');
    }
}
