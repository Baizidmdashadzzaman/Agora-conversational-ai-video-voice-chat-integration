<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AgoraService;

class VideoCallController extends Controller
{
    public function generateToken(Request $request)
    {
        $request->validate([
            'channel_name' => 'required|string',
            'uid' => 'required|integer',
        ]);

        $token = AgoraService::generateToken($request->channel_name, $request->uid);
        return response()->json(['token' => $token]);
    }
}
