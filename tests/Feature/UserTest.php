<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

/**
 * Testing the two JSON Endpoints
 */
class BacklogTest extends TestCase
{  
	use DatabaseMigrations;  

    public function testGetBacklogs()
    {	
    	$user = factory(\App\User::class)->make();
    	$backlog = factory(\App\Backlog::class)->make();
    	$user->backlogs()->save($backlog);    	
        $response = $this->actingAs($user)->json('GET', '/backlogs');
        
        $response->assertStatus(200);   
        $response->assertHeader('content-type', 'application/json');     
        $response->assertJson([
        	['name' => $backlog->name,
        	'expression' => $backlog->expression,]
        ]); 
    }

    public function testPostBacklog() {
    	$user = factory(\App\User::class)->make();
    	$backlog = factory(\App\Backlog::class)->make();
    	$payload = ['name' => $backlog->name, 'expression' => $backlog->expression];
    	$response = $this->actingAs($user)->json('POST', '/backlog', $payload);

    	$response->assertStatus(200);   
    	$response->assertHeader('content-type', 'application/json');  
    	$response->assertJson([
    		'name' => $backlog->name,
    		'expression' => $backlog->expression,
    	]);   
    }
}
