<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * class to handle frontend requests for user
 * backlogs. It's possible to save one, or get all.
 * Responses are always JSON.
 * Thanks to Laravel authentication middleware if a guest
 * user try to access one of these routes, it's redirected to
 * the login page
 */
class BacklogController extends Controller
{
    /**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
	    $this->middleware('auth');
	}

	/**
	 * Create a new backlog.
	 *
	 * @param  Request  $request
	 * @return Json Response
	 */
	public function save(Request $request)
	{
	    $this->validate($request, [
	        'name' => 'required|max:255',
	        'expression' => [
	        	'required',
	        	'regex:/[0-9.+\-*\/\s]/'
	        ],
	    ]);

	    $result = $request->user()->backlogs()->create([
	    	'name' => $request->name,
	    	'expression' => $request->expression,
	    ]);
	    
	    return response()->json($result);	    	    
	}

	/**
	 * Get all of the user's logs.
	 *
	 * @param  Request  $request
	 * @return Json Response
	 */
	public function index(Request $request)
	{
	    $backlogs = $request->user()->backlogs()->orderBy('created_at', 'desc')->get();
	    return response()->json($backlogs);
	}
}
