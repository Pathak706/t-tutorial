<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use App\Timetable;
use App\User;
use App\EnrollToCourse;

class CourseController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function index(Request $req, $id = null)
    {
        try {
            if ($id) {
                $user = User::find($id);
                if ($user->role === 2) {
                    // if faculty map with timetable
                    $teach = Timetable::select('course_id')->where('faculty_id', $id)->get();
                    $courses = \DB::table('courses')->whereIn('id', $teach)->get();
                    return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $courses));
                } else {
                    // else students map with enrollment
                    $learn = EnrollToCourse::select('course_id')->where('student_id', $id)->get();
                    $courses = \DB::table('courses')->whereIn('id', $learn)->get();
                    return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $courses));
                }
            } else {
                $courses = Course::all();
                return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $courses));
            }
        } catch (Exception $e) {
            return response()->json(array('status' =>false, 'message' => 'Error fetching courses.', 'data' => []));
        }
    }

    public function getAllCourseName(Request $req, $id = null)
    {
        try {
            if ($id) {
                $teach = Timetable::select('course_id')->where('faculty_id', $id)->get();
                $courses = \DB::table('courses')->whereIn('id', $teach)->get()->groupBy('course_name');
                return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $courses));
            } else {
                $course = Course::all()->groupBy('course_name');
                return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $course));
            }
        } catch (Exception $e) {
            return response()->json(array('status' =>false, 'message' => 'Error fetching courses.', 'data' => []));
        }
    }

    public function getAllSubjectAgainstCourse(Request $req)
    {
        try {
            $course = Course::where('course_name', $req->course_name)->get();
            return response()->json(array('status' => true, 'message' => 'courses list fetched.', 'data' => $course));
        } catch (Exception $e) {
            return response()->json(array('status' =>false, 'message' => 'Error fetching courses.', 'data' => []));
        }
    }

    public function create(Request $req)
    {
        $req->validate([
            'course_name' => 'required|string|min:3',
            'course_subject' => 'required|string|min:3',
            'course_batch' => 'required|string|min:1',
        ]);
        try {
            $isPresent = Course::where("course_batch", $req->course_batch)
                                ->where("course_name", $req->course_name)
                                ->where("course_subject", $req->course_subject)
                                ->first();
            if (empty($isPresent)) {
                $course = new Course();
                $course->course_name    = $req->course_name;
                $course->course_subject = $req->course_subject;
                $course->course_batch   = $req->course_batch;
                $course->save();
                return response()->json(array('status' => true, 'message' => 'course created successfully.', 'data' => $course ));
            } else {
                return response()->json(array('status' => false, 'message' => 'already present.', 'data' => $isPresent));
            }
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error creating course.', 'data' => $e));
        }
    }

    public function getAllCourses(Request $req)
    {
        try {
            $courses = Course::all();
            return response()->json(array('status' => true, 'message' => 'all courses fetched', 'data' => [$courses]));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching courses.', 'data' => $e));
        }
    }

    public function update(Request $req, $id)
    {
        $req->validate([
            'course_name' => 'required|string|min:3',
            'course_subject' => 'required|string|min:3',
            'course_batch' => 'required|string|min:1',
            'id' => 'required|integer'
        ]);
        try {
            $course = Course::find($id);
            $course->course_name    = $req->course_name;
            $course->course_subject = $req->course_subject;
            $course->course_batch   = $req->course_batch;
            $course->save();
            return response()->json(array('status' => true, 'message' => 'course updated successfully.', 'data' => $course ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error updating course.', 'data' => $e));
        }
    }

    public function delete(Request $req)
    {
        $req->validate([
            'ids' => 'required|array'
        ]);
        try {
            \DB::table('courses')->whereIn('id', $req->ids)->delete();
            return response()->json(array('status' => true, 'message' => 'course updated successfully.', 'data' => Course::all() ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error updating course.', 'data' => $e));
        }
    }
}
