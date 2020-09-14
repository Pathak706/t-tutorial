<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Result;
use App\User;

class ResultController extends Controller
{
    public function __construct(Request $req)
    {
        $this->middleware('auth:api');
    }

    public function markDone(Request $req)
    {
        $email          = $req->email;
        $answers        = $req->answers;
        $miscellaneous  = $req->miscellaneous;
        try {
            $profile_id = User::where('email', $email)->first()->id;
            if ($profile_id) {
                foreach ($answers as $key=>$answer) {
                    $result                 = new Result();
                    $result->profile_id     = $profile_id;
                    $result->exam_set       = $miscellaneous[$key]['exam_set'];
                    $result->question_id    = $miscellaneous[$key]['id'];
                    $result->answer_choose  = $answer;
                    // check the answer selected is correct or not
                    if ($miscellaneous[$key]['correct_option'] == $answer) {
                        $result->is_correct = 1;
                    } else {
                        $result->is_correct = 0;
                    }
                    $result->save();
                }
                return response()->json(array( 'status' => true, 'message' => "your answer recored in system.", 'data' =>  [ 'email' => $email, 'answers' => $answers ] ));
            } else {
                return response()->json(array('status' => false, 'message' => 'No User found with given email id.', 'data' => ["email" => $email]  ));
            }
        } catch (Exception $e) {
            return response()->json(array('status' => false, 'message' => 'Error submit your answers.', 'data' => [] ));
        }
    }

    public function getResultByEmail(Request $req, $email)
    {
        try {
            $user = User::where('email', $email)->first();
            if ($user) {
                $result_set = Result::where('profile_id', $user->id)->groupBy('exam_set')->get();
                $result_sheet = [];
                foreach ($result_set as $result) {
                    $right = Result::selectRaw("count('is_correct') as count")
                                ->where('profile_id', $user->id)
                                ->where('exam_set', $result->exam_set)
                                ->where('is_correct', 1)->get();
                    $wrong = Result::selectRaw("count('is_correct') as count")
                                ->where('profile_id', $user->id)
                                ->where('exam_set', $result->exam_set)
                                ->where('is_correct', 0)->get();
                    $cur_res = [ 'right' => $right, 'wrong' => $wrong ];
                    $result_sheet[$result->exam_set] = $cur_res;
                }
                return response()->json(array( 'status' => true, 'message' => 'Result sheet made successfully.', 'data' => ['result_set' => $result_set, 'result_sheet' => $result_sheet ] ));
            } else {
                return response()->json(array( 'status' => false, 'message' => 'No user found with email.', 'data' => [ 'email' => $email ] ));
            }
        } catch (Exception $e) {
            return response()->json(array( 'status' => false, 'message' => 'Error fetching result.', 'data' => [] ));
        }
    }

    public function getAllResultByExamSet(Request $req)
    {
        try {
            $results_by_exam_set = Result::groupBy('exam_set')->get();
            return response()->json(array( 'status' => true, 'message' => 'student results for given exam set.', 'data' => [ 'result_set' => $results_by_exam_set ] ));
        } catch (Exception $e) {
            return response()->json(array( 'status' => false, 'message' => 'Error fetching result by exam set.', 'data' => [] ));
        }
    }

    public function getResultBySet(Request $req, $exam_set_id)
    {
        try {
            $result_sheet = Result::where('exam_set', $exam_set_id)
                                  ->groupBy('profile_id')->get();
            return response()->json(array( 'status' => true, 'message' => 'result sheet.', 'data' => ['result_sheet' => $result_sheet] ));
        } catch (Exception $e) {
            return response()->json(array( 'status' => false, 'message' => 'Error fetching result by for given exam set.', 'data' => [ "exam_set" => $exam_set_id ] ));
        }
    }
}
