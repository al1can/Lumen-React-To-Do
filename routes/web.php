<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

$router->get('/{any:(?!api).*}', function () {
    return view('app');
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('notes', 'NotesController@index');
    $router->post('notes', 'NotesController@store');
    $router->put('notes/{note}', 'NotesController@update');
    $router->delete('notes/{note}', 'NotesController@delete');
});