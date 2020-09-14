<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exams extends Model
{
    //
    protected $fillable = [
        'id',
        'course_id',
        'faculty_id',
        'questions',
        'option_1',
        'option_2',
        'option_3',
        'option_4',
        'correct_option',
        'is_done',
        'exam_set',
        'created_at',
        'updated_at',
    ];

    public function getCourse()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function getFaculty()
    {
        return $this->belongsTo('App\User', 'faculty_id');
    }

    public function result()
    {
        return $this->hasMany('App\Result');
    }
}
