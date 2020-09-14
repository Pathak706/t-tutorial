<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notes;

class NotesController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function index(Request $req)
    {
        try {
            $notes = Notes::all();
            return response()->json(array('status' => true, 'message' => 'all notes fetched.', 'data' => $notes ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching notes.', 'data' => [] ));
        }
    }

    public function upload(Request $request)
    {
        $imageName = $request->input('notes');
        if ($request->hasfile($imageName)) {
            $file =$request->file($imageName);
            $extension =$file['notes']->extension();
            $filename = '_'.time().'_'.rand(0000, 9999).'.'.$extension;
            // dd($filename);
            $file['notes']->move('uploads/Notes/', $filename);
            $notes = new Notes();
            $notes->notes_name = $file['notes']->getClientOriginalName();
            $notes->file_path =$filename;
            $notes->save();
            return response()->json(array('status' => true, 'message' => 'document uploaded.', 'data' => $notes ));
        } else {
            return response()->json(array('status' => false, 'message' => 'no document uploaded.', 'data' => $request ));
        }
    }

    public function getAllNotes(Request $request)
    {
        try {
            $notes = Notes::all();
            return response()->json(array('status' => true, 'message' => 'document uploaded.', 'data' => $notes ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'no document uploaded.', 'data' => $e ));
        }
    }

}
