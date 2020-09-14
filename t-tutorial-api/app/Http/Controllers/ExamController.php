<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exams;
use App\User;
use App\EnrollToCourse;

class ExamController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function create(Request $req)
    {
        $faculty_id     = $req->faculty_id;
        $course_id   = $req->course_subject;
        $exam_set       = $req->exam_set;

        $last_exam_set  = \DB::table('exams')->orderBy('id', 'desc')->first();
        
        $last_exam_set = $last_exam_set ? $last_exam_set->exam_set : 0 ;
        // dd('last exam set', $last_exam_set);
        try {
            foreach ($exam_set as $questions) {
                // dd("questions", $questions);
                \DB::table('exams')->insert([
                    'course_id'         => $course_id,
                    'faculty_id'        => $faculty_id,
                    'is_done'           => 0,
                    'exam_set'          => (int)$last_exam_set+1,
                    'questions'         => $questions['question'],
                    'option_1'          => $questions['A'],
                    'option_2'          => $questions['B'],
                    'option_3'          => $questions['C'],
                    'option_4'          => $questions['D'],
                    'correct_option'    => $questions['answer'],
                ]);
            }
            return response()->json(array('status' => true, 'message' => 'Exam Set created successfully.', 'data' => [$exam_set]));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error creating exam.', 'data' => []));
        }
    }

    public function index(Request $req, $id = null)
    {
        try {
            $all_exams = array();
            if ($id) {
                $user = User::find($id);
                if ($user->role === 3) {
                    // if student then map course id
                    $enrollments = EnrollToCourse::select('course_id')->where('student_id', $id)->get();
                    $all_exams = Exams::select('*')->whereIn('course_id', $enrollments)->get()->groupBy('exam_set');
                } else {
                    // else faculty map directly
                    $all_exams = Exams::where('faculty_id', $id)->get()->groupBy('exam_set');
                }
            } else {
                $all_exams = Exams::all()->groupBy('exam_set');
            }
            foreach ($all_exams as $exam) {
                foreach ($exam as $value) {
                    $value->getCourse;
                    $value->getFaculty;
                }
            }
            return response()->json(array('status' => true, 'message' => 'all exam sets fetched.', 'data' => $all_exams ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching exam sets.', 'data' => [] ));
        }
    }

    public function getByExamSet(Request $req, $id)
    {
        try {
            $exam_set = Exams::where('exam_set', $id)->get();
            foreach ($exam_set as $exam) {
                $exam->getCourse;
                $exam->getFaculty;
            }
            return response()->json(array('status' => true, 'message' => 'Exam set fetched by id successful.', 'data' => [$exam_set] ));
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error fetching exam data by set id.', 'data' => [] ));
        }
    }
}
