<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Timetable;
use App\User;
use App\EnrollToCourse;

class TimetableController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function createLecture(Request $req)
    {
        $course_id = $req->course_id;
        $start_time     = $req->start_time;
        $end_time       = $req->end_time;
        $faculty_id     = $req->faculty_id;
        try {
            $timetable = new Timetable();
            $timetable->course_id      = $course_id;
            $timetable->start_time     = $start_time;
            $timetable->end_time       = $end_time;
            $timetable->faculty_id     = $faculty_id;
            $timetable->save();
            return response()->json(array('status' => true, 'message' => 'timetable for lecture created successfully.', 'data' => [$timetable]));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error creating timetable for new lecture.', 'data' => []));
        }
    }

    public function getStudentTimetableByEmail(Request $req, $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if ($user && $user->role == 3) {
                $user_enroll = EnrollToCourse::where('student_id', $user->id)->get();
                if ($user_enroll) {
                    foreach ($user_enroll as $enrollment) {
                        $enrollment->get_timetable;
                        $enrollment->get_timetable->getCourse;
                    }
                    return response()->json(array( 'status' => true, 'message' => 'timetable made for current user.', 'data' => $user_enroll ));
                } else {
                    return response()->json(array( 'status' => false, 'message' => 'user is not enrolled in any course yet.', 'data' => [ 'user' => $user ] ));
                }
            } else {
                return response()->json(array('status' => false, 'message' => 'no user found with email.', 'data' => ['email' => $email]));
            }
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching timetable.', 'data' => []));
        }
    }

    public function getFacultyTimetableByEmail(Request $req, $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if ($user && $user->role == 2) {
                $user_enroll = Timetable::where('faculty_id', $user->id)->get();
                if ($user_enroll) {
                    foreach ($user_enroll as $enrollment) {
                        $enrollment->getCourse;
                    }
                    return response()->json(array( 'status' => true, 'message' => 'timetable made for current user.', 'data' => $user_enroll  ));
                } else {
                    return response()->json(array( 'status' => false, 'message' => 'user is not enrolled in any course yet.', 'data' => [ 'user' => $user ] ));
                }
            } else {
                return response()->json(array('status' => false, 'message' => 'no user found with email.', 'data' => ['email' => $email]));
            }
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching timetable.', 'data' => []));
        }
    }

    public function getAllTimetable(Request $req)
    {
        try {
            $timetable = Timetable::all();
            foreach ($timetable as $value) {
                $value->getCourse;
            }
            return response()->json(array('status' => true, 'message' => 'all timetable fetched.', 'data' => $timetable));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching timetable.', 'data' => []));
        }
    }

    public function delete(Request $req)
    {
        $req->validate([
            'ids' => 'required|array'
        ]);
        try {
            \DB::table('timetables')->whereIn('id', $req->ids)->delete();
            return response()->json(array('status' => true, 'message' => 'timetable deleted successfully.', 'data' => [] ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error deleting timetable.', 'data' => $e));
        }
    }
}
