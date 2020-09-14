<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::get('/get-all-students', 'UserController@getAllStudents');
Route::get('/get-all-courses/{id?}', 'CourseController@index');
Route::get('/get-all-course-name/{id?}', 'CourseController@getAllCourseName');
Route::get('/get-all-course-subject-against-name', 'CourseController@getAllSubjectAgainstCourse');
Route::get('/get-all-faculty', 'UserController@getAllFaculty');
Route::get('/get-all-notes', 'NotesController@index');
Route::get('/get-all-exams/{id?}', 'ExamController@index');
Route::get('/get-exam-by-exam_set/{id}', 'ExamController@getByExamSet');
Route::get('/get-result/{email}', 'ResultController@getResultByEmail');
Route::get('/get-course-enrolled/{email}', 'EnrollToCourseController@getEnrolledCourseByEmail');
Route::get('/get-student-timetable/{email}', 'TimetableController@getStudentTimetableByEmail');
Route::get('/get-faculty-timetable/{email}', 'TimetableController@getFacultyTimetableByEmail');
Route::get('/get-all-result-by-exam_set', 'ResultController@getAllResultByExamSet');
Route::get('/get-result-by-exam_set/{id}', 'ResultController@getResultBySet');
Route::get('/get-all-timetable', 'TimetableController@getAllTimetable');

Route::post('/add-faculty', 'UserController@addNewFaculty');
Route::post('/add-student', 'UserController@addNewStudent');
Route::post('/add-course', 'CourseController@create');
Route::post('/add-timetable', 'TimetableController@createLecture');
Route::post('/add-exam', 'ExamController@create');

Route::put('/edit-course/{id}', 'CourseController@update');
Route::put('/edit-faculty/{id}', 'UserController@updateUser');
Route::put('/edit-student/{id}', 'UserController@updateUser');

Route::post('/delete-courses', 'CourseController@delete');
Route::post('/delete-faculty', 'UserController@deleteUsers');
Route::post('/delete-timetable', 'TimetableController@delete');

Route::post('/enroll-student', 'EnrollToCourseController@enrollStudentToCourse');
Route::post('/file-upload', "NotesController@upload");
Route::post('/mark-exam-done', 'ResultController@markDone');
Route::post('/get-all-notes', 'NotesController@getAllNotes');
Route::post('mark-attendance', 'AttendanceController@markAttendance');
Route::post('get-attendance', 'AttendanceController@getAttendanceReport');
