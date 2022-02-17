<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Note as NoteResources;
use App\Models\Note;

class NotesController extends Controller
{
    protected $rules = [
        'title' => ['required', 'string'],
        'body' => ['required', 'string']
    ];

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        return NoteResources::collection(Note::all());
    }

    public function store(Request $request)
    {
        /*
        $data = $request->validate([
            'title' => ['required', 'string'],
            'body' => ['required', 'string']
        ]);
        */

        $data = $this->validate($request, $this->rules);

        Note::create([
            'title' => $data['title'],
            'body' => $data['body']
        ]);

        return response()->json([
            'data' => 'Note Created!'
        ]);
    }

    public function update(Request $request, $note)
    {
        $data = $this->validate($request, $this->rules);

        Note::where('id', $note)->update([
            'title' => $data['title'],
            'body' => $data['body']
        ]);

        return response()->json([
            'data' => 'Note Updated!'
        ]);
    }

    public function delete($note)
    {
        Note::destroy($note);

        return response()->json([
            'data' => 'Note Deleted!'
        ]);
    }

}
