<?php

use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::insert('insert into user_role (role) values (?)', ['admin']);
        DB::insert('insert into user_role (role) values (?)', ['faculty']);
        DB::insert('insert into user_role (role) values (?)', ['student']);
        DB::insert('insert into user_role (role) values (?)', ['parents']);
    }
}
