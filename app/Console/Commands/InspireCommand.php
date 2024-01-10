<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class InspireCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inspire:get-quotes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get quotes from API based on category';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $base_url = 'https://api.api-ninjas.com/v1/quotes?category=';
        // $all_categories = ['attitude', 'happiness', 'inspirational', 'success', 'learning', 'money'];
        $selected_categories = ['success', 'money'];

        // Start fetching data
        $category = $selected_categories[array_rand($selected_categories)];
        $response = Http::withHeaders([
                'X-Api-Key' => env('API_NINJA_KEY')
            ])
            ->get($base_url.$category);

        // Show CLI message
        $this->info('Debug in Inspire Command result ~ '.date('Y-m-d H:i;s'));
        $this->info('Status: '.$response->status());

        // Handle response
        if($response->status() === 200){
            $result = json_decode(json_encode($response->object()), FALSE)[0];

            if(!empty($result)){
                // Add to database
                $data = new \App\Models\Inspiration();
                $data->author = $result->author;
                $data->quotes = $result->quote;
                $data->category = $result->category;
                $data->save();
            }
            
            // \Log::debug("Debug on Response result", [
            //     // 'raw' => $response,
            //     // 'object' => $response->object(),
            //     'result' => [
            //         'data' => $result,
            //         'quote' => $result->quote,
            //         'author' => $result->author,
            //         'category' => $result->category
            //     ]
            // ]);
        }
    }
}
