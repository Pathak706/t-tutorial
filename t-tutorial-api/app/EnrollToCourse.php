<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EnrollToCourse extends Model
{
    protected $fillable = [
        'id',
        'course_id',
        'student_id',
        'created_at',
        'updated_at',
    ];

    public function get_course()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function get_timetable()
    {
        return $this->belongsTo('App\Timetable', 'course_id');
    }
}
