<?php

namespace App\Services;

use Carbon\Carbon;

class AgoraService
{
    public static function generateToken($channelName, $uid)
    {
        $appId = env('AGORA_APP_ID');
        $appCertificate = env('AGORA_APP_CERTIFICATE');
        // Set token expiration to 30 minutes from now
        $expireTime = Carbon::now()->addMinutes(30)->timestamp;

        return RtcTokenBuilder::buildTokenWithUid(
            $appId,
            $appCertificate,
            $channelName,
            $uid,
            RtcTokenBuilder::Role_Publisher,
            $expireTime
        );
    }
}
