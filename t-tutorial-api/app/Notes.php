<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    //
    protected $fillable = [
        'id',
        'faculty_id',
        'course_id',
        'notes_name',
        'file_path',
        'created_at',
        'updated_at',
    ];

    public function faculty()
    {
        return $this->belongsTo('App\User', 'faculty_id');
    }
}
