<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EnrollToCourse;
use App\User;

class EnrollToCourseController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function enrollStudentToCourse(Request $req)
    {
        $student_id = $req->student_id;
        $course_id = $req->course_id;
        try {
            $enrolling = new EnrollToCourse();
            $enrolling->course_id = $course_id;
            $enrolling->student_id = $student_id;
            $enrolling->save();
            return response()->json(array('status' => true, 'message' => 'student enrolled in course.', 'data' => [$enrolling]));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error while enrolling student in course batch.', 'data' => []));
        }
    }

    public function getEnrolledCourseByEmail(Request $req, $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if ($user) {
                $enrollment = EnrollToCourse::where('student_id', $user->id)->get();
                if ($enrollment) {
                    foreach ($enrollment as $course) {
                        $course->get_course;
                    }
                    return response()->json(array( 'status' => true, 'message' => 'enrollment found for current user.', 'data' => [ 'enrollment' => $enrollment, 'user' => $user ] ));
                } else {
                    return response()->json(array( 'status' => false, 'message' => 'user not enrolled in any course yet.', 'data' => [ 'user' => $user ] ));
                }
            } else {
                return response()->json(array( 'status' => false, 'message' => 'No user found with email.', 'data' => ['email' => $email] ));
            }
        } catch (Exception $e) {
            return response()->json(array( 'status' => false, 'message' => 'Error get enrolled course.', 'data' => [] ));
        }
    }
}
