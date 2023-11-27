<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>{{ env('APP_NAME') }}</title>

        @vite('resources/css/app.css')
    </head>
    <body class="bg-gray-100 dark:bg-background ">
        <div class=" w-screen h-screen p-6 flex flex-col gap-4 items-center justify-center">
            <div class=" relative flex flex-col gap-2 justify-center items-center">
                <h1 class=" text-xl font-bold">Token Missmatch</h1>
                <span class=" font-semibold text-3xl relative 
                    after:absolute after:rounded-full after:h-1 after:w-full after:bg-black dark:after:bg-background after:top-1/2 after:right-[calc(-100%-1rem)] after:-translate-y-1/2
                    before:absolute before:rounded-full before:h-1 before:w-full before:bg-black dark:before:bg-background before:top-1/2 before:left-[calc(-100%-1rem)] before:-translate-y-1/2
                ">419</span>
            </div>
            <div class=" rounded border p-4 w-3/5">
                <span>Either the token is mismatched or has already expired. Please consider refreshing the entire page or clicking the button below.</span>
            </div>

            <div class=" mt-4 flex flex-row gap-4 w-3/5">
                <button type="button" class=" px-4 py-2 rounded border w-full flex flex-row items-center justify-center gap-1" onclick="window.top.location.reload();">
                    <span>Refresh</span>
                </button>
                <a href="{{ route('public.index') }}" class=" px-4 py-2 rounded bg-primary text-white w-full flex flex-row items-center justify-center gap-1">
                    <span>Homepage</span>
                </a>
            </div>
        </div>
    </body>
</html>