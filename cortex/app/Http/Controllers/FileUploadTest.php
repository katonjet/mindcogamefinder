<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadTest extends Controller
{
    public function upload(Request $request){

        $request->validate([// 'required' option removed for testing
            'image' => 'required|image|max:2048', //2MB max limit for image
            'pdf' => 'required|mimes:pdf|max:10240', //10MB max limit for pdf
        ]);

        //Store images in /images dir under public bucket
        $imagePath = $request->file('image')->store('images', 'public');

        //Store pdfs in /docs dir under public bucket
        $pdfPath = $request->file('pdf')->store('docs', 'public');

        //get URL for uploaded files
        $baseUrl = config("app.url");
        $imageUrl = $baseUrl . Storage::url($imagePath);
        $pdfUrl = $baseUrl . Storage::url($pdfPath);

        return response()->json([
            'message' => "files uploaded",
            'pdfFileUrl' => $pdfUrl,
            'imageFileUrl' => $imageUrl,
        ]);

    }

    public function uploadGameBackdrop(Request $request){

        $request->validate([
            'imageFile' => 'required|image|max:10240'
        ]);

        $backdropPath = $request->file('imageFile')->store('game_backdrop', 'public');

        //get URL for uploaded files
        $baseUrl = config("app.url");
        $backdropUrl = $baseUrl . Storage::url($backdropPath);

        return response()->json([
            'message' => 'files uploaded',
            'backdrop' => $backdropUrl,
        ]);

    }
}
