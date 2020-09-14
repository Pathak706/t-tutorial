<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    protected $fillable = [
        'id',
        'course_name',
        'course_subject',
        'course_batch',
        'created_at',
        'updated_at',
    ];

    public function timetable()
    {
        return $this->hasMany('App\Timetable');
    }

    public function exams()
    {
        return $this->hasMany('App\Exam');
    }

    public function enrollment()
    {
        return $this->hasMany('App\EnrollToCourse');
    }
}
