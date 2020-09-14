<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Attendance;
use App\Course;
use App\Timetable;

class AttendanceController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function markAttendance(Request $req)
    {
        $attend = new Attendance();
        $attend->student_id = $req->mark_id;
        $attend->timetable_id = $req->timetable_id;
        $attend->save();
        return response()->json([ 'status' => true, 'message' => 'attendance marked.', $data => $attend ]);
    }

    public function getAttendanceReport(Request $req, $id)
    {
        $present = Attendance::select('timetable_id')->where('user_id', $id)->get();
        $coursePresent = Timetable::select('course_id')->whereIn('id', $present)->get();
        $lecPresent = Course::whereIn('id', $coursePresent)->get();
        return response()->json([ 'status' => true, 'message' => 'attendance marked.', $data => $lecPresent ]);
    }
}
