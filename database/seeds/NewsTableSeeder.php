<?php

use App\Category;
use App\Country;
use Illuminate\Database\Seeder;

class NewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i=0; $i < 1000; $i++) {
            DB::table('news')->insert([
                'newsTitle' => $faker->sentence(6),
                'description' => $faker->paragraph(5),
                'country_id' => Country::all()->random()->id,
                'category_id' => Category::all()->random()->id
            ]);
        }
    }
}
