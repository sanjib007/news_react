<?php

use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i=0; $i < 243; $i++) {
            DB::table('countries')->insert([
                'name' => $faker->unique()->country
            ]);
        }
    }
}
