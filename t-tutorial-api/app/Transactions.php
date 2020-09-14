<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    //
    protected $fillable = [
        'id',
        'profile_id',
        'transaction_type',
        'adjustment',
        'grand_total',
        'total',
        'created_at',
        'updated_at',
    ];

    public function profile()
    {
        return $this->belongsTo('App\User', 'profile_id');
    }
}
