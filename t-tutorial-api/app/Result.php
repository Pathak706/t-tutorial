<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    //
    protected $fillable = [
        'id',
        'profile_id',
        'exam_set',
        'question_id',
        'answer_choose',
        'is_correct',
        'created_at',
        'updated_at',
    ];

    public function question()
    {
        return $this->belongsTo('App\Exams', 'question_id');
    }

    public function exam_set()
    {
        return $this->hasMany('App\Exam', 'exam_set');
    }

    public function profile()
    {
        return $this->belongsTo('App\User', 'profile_id');
    }
}
