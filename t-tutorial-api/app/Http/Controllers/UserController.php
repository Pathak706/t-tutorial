<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function getAllStudents(Request $req)
    {
        try {
            $users = User::where('role', 3)->get();
            return response()->json(array('status' => true, 'message' => 'all students fetched', 'data' => $users));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error while fetching data', 'data' => []));
        }
    }

    public function getAllFaculty(Request $req)
    {
        try {
            $user = User::where('role', 2)->get();
            return response()->json(array('status' => true, 'message' => 'all faculty fetched', 'data' => $user));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching faculty.', 'data' => []));
        }
    }

    public function addNewFaculty(Request $req)
    {
        try {
            $req->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);
            $user = new User();
            $user->first_name = $req->first_name;
            $user->last_name = $req->last_name;
            $user->email = $req->email;
            $user->password = bcrypt($req->passowrd);
            $user->role = env('USER_ROLE_FACULTY', 2);
            $user->save();

            return response()->json([
                'message' => 'Successfully created faculty!',
                'data' => [$user]
            ], 201);
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error creating faculty.', 'error' => $e));
        }
    }

    public function addNewStudent(Request $req)
    {
        try {
            $req->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);
            $user = new User();
            $user->first_name = $req->first_name;
            $user->last_name = $req->last_name;
            $user->email = $req->email;
            $user->password = bcrypt($req->passowrd);
            $user->role = env('USER_ROLE_STUDENT', 3);
            $user->save();

            return response()->json([
                'message' => 'Successfully created student!',
                'data' => [$user]
            ], 201);
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error creating student.', 'error' => $e));
        }
    }

    public function updateUser(Request $req, $id)
    {
        try {
            $req->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|string|email',
            ]);
            $user = User::find($id);
            $user->first_name = $req->first_name;
            $user->last_name = $req->last_name;
            $user->email = $req->email;
            $user->save();

            return response()->json([
                'message' => 'Successfully updated user!',
                'data' => [$user]
            ], 200);
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error updating user.', 'error' => $e));
        }
    }

    public function deleteUsers(Request $req)
    {
        $req->validate([
            'ids' => 'required|array'
        ]);
        try {
            \DB::table('users')->whereIn('id', $req->ids)->delete();
            return response()->json(array('status' => true, 'message' => 'users deleted successfully.', 'data' => [] ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error updating course.', 'data' => $e));
        }
    }
}
