<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Backlog extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'expression'];


    /**
     * get the user that owns this backlog
     */
    public function user()
    {
    	return $this->belongsTo(User::class);
    }
}
