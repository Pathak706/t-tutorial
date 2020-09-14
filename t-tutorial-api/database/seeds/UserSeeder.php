<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::insert('insert into users (first_name, last_name, email, password, role, course_batch) values (?, ?, ?, ?, ?, ?)', ['super', 'admin', 'superadmin@gmail.com', \Hash::make('123456789'), 1, NULL]);
    }
}
