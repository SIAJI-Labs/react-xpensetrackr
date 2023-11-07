<?php

/**
 * Format Rupiah
 *
 * Print number in Indonesian Rupiah
 */
if(!(function_exists('formatRupiah'))){
    function formatRupiah($number = 0, $prefix = true, $short = false)
    {
        if($short){
            $number = shortNumber($number);
        } else {
            $number = round($number, 2);
            $decimal = null;
            $checkDecimal = explode('.', $number);
            if (count($checkDecimal) > 1) {
                $decimal = $checkDecimal[1];
            }
        
            if($number < 0){
                $number = '('.number_format((int) $number, 0, ',', '.').(! empty($decimal) ? ','.$decimal : '').')';
            } else {
                $number = number_format((int) $number, 0, ',', '.').(! empty($decimal) ? ','.$decimal : '');
            }
        }
        
        return ($prefix ? 'Rp ' : '').$number;
    }
}

/**
 * Convert thousand
 * 
 * Example: 1000 to 1K, 1.200.000 to 1.2M, etc
 */
if(!(function_exists('shortNumber'))){
    function shortNumber($number)
    {
        $negative = false;
        if($number < 0){
            $negative = true;
            $number *= -1;
        }

        $units = ['', 'K', 'M', 'B', 'T'];
        $i = 0;
        for($i = 0;$number >= 1000; $i++){
        $number /= 1000;
        }

        if($negative){
            $number *= -1;
        }
        
        return round($number, 2).$units[$i];
    }
}

/**
 * Convert CamelCase to dash-word
 * 
 */
if(!(function_exists('camel2dashed'))){
    function camel2dashed($string)
    {
        return strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', $string));
    }
}


/**
 * Encryption
 */
if(!(function_exists('saEncrypt'))){
    function saEncrypt($value, $encrypt = true)
    {
        $method = new \Illuminate\Encryption\Encrypter(env('PRIVATE_KEY'), config('app.cipher'));
        $data = null;

        if($encrypt){
            // Encryption
            $data = $method->encrypt($value);
        } else {
            // Decryption
            try {
                // Try to decrypt given value
                $data = $method->decrypt($value);
            } catch (\RuntimeException $e) {
                // Failed to decrypt, return original data
                $data = $value;
            }
        }

        return $data;
    }
}

/**
 * Generate randomg mix character
 * 
 * @param integer $length
 * @return string
 */
if(!(function_exists('generateRandomMixCharacter'))){
    function generateRandomMixCharacter($length = 8, $range = [])
    {
        $useDefault = true;
        if(is_array($range) && count($range) > 0){
            // Check if range is multidimensional array
            $rv = array_filter($range,'is_array');
            if(count($rv) > 0){
                $useDefault = true;
            } else {
                $useDefault = false;

                // Convert array to string
                $mix = implode("", $range);
            }
        }

        if($useDefault){
            // Prepare an array
            $numeric = range(0, 9);
            $alpha = range('a', 'z');
            $alpha_b = range('A', 'Z');

            // Convert array to string
            $mix = implode("", $numeric).implode("", $alpha).implode("", $alpha_b);
        }

        // Generate Random Character
        $string = '';
        for($i = 0; $i < $length; $i++){
            // Shuffle Joined Array
            $mix_shuffle = str_shuffle($mix);
            // Fetch random index
            $index = rand(0, strlen($mix_shuffle) - 1);
            // Get max index
            $index = max(0, $index);

            $string .= $mix_shuffle[$index];
        }
        
        return $string;
    }
}

/**
 * Validate Date Format
 * 
 * @param string $date
 * @return boolean
 */
if(!(function_exists('validateDateFormat'))){
    function validateDateFormat($date, $format = 'Y-m-d')
    {
        $pattern = '/^\d{4}-\d{2}$/'; // Define the regex pattern for Y-m format

        if (preg_match($pattern, $date) === 1) {
            $parsedDate = date_create_from_format($format, $date);
            if ($parsedDate !== false && date_format($parsedDate, $format) === $date) {
                return true; // Valid date with the specified format
            }
        }

        return false; // Invalid date or format
    }
}