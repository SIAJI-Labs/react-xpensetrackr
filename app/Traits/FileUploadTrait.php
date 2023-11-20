<?php

namespace App\Traits;

use Intervention\Image\ImageManagerStatic as Image;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

trait FileUploadTrait
{
    public $fileUploadTraitsDestination = 'files';

    /**
     * Upload file
     */
    public function fileUpload($file)
    {
        $result = [];
        if ($file) {
            // Check if directory exists
            if (! (File::exists($this->fileUploadTraitsDestination))) {
                Log::debug('Debug on making directory ~ \App\Http\Traits\FileUploadTrait', [
                    'fileUploadTraitsDestination' => $this->fileUploadTraitsDestination,
                ]);
                
                File::makeDirectory($this->fileUploadTraitsDestination, 0777, true, true);
            }

            $uploadedFile = $file;
            $filename = 'files-'.(Carbon::now()->timestamp + rand(1, 1000));
            $extension = $uploadedFile->getClientOriginalExtension();
            // $fullname = $filename.'.'.strtolower($extension);
            $fullname = $filename.'.webp';
            $fileSize = $uploadedFile->getSize();

            if ($uploadedFile->getClientMimeType() === 'application/pdf') {
                // File is PDF
                $path = $uploadedFile->storeAs($this->fileUploadTraitsDestination, $fullname);
            } else {
                $dimension = getimagesize($file);
                // File is image
                $extension = 'webp';
                $path = $this->fileUploadTraitsDestination.'/'.$fullname;
                $imageResize = Image::make($uploadedFile)->encode('webp', 90);
                // Resize image
                // if ($imageResize->width() > 750){
                //     $imageResize->resize(750, null, function ($constraint) {
                //         $constraint->aspectRatio();
                //     });
                // }

                // Change extension

                $imageResize->save($path);
            }

            $result = [
                'file' => [
                    'filename' => $filename,
                    'extension' => $extension,
                    'fullname' => $fullname,
                    'path' => $path,
                ],
                'dimension' => [
                    'width' => isset($dimension) ? $dimension[0] : null,
                    'height' => isset($dimension) ? $dimension[1] : null,
                ],
                'fileSize' => $fileSize,
            ];
        }

        return $result;
    }

    /**
     * Remove from Storage
     */
    public function fileRemove($file)
    {
        $result = false;
        if(!empty($file) && Storage::exists($file)){
            Storage::delete($file);
        }

        return $result;
    }
}