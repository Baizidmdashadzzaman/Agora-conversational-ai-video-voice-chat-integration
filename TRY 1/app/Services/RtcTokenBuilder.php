<?php

namespace App\Services;

class RtcTokenBuilder
{
    const Role_Publisher = 1;
    const Role_Subscriber = 2;

    /**
     * Build a token with a numeric UID.
     *
     * @param string $appID
     * @param string $appCertificate
     * @param string $channelName
     * @param int|string $uid
     * @param int $role
     * @param int $privilegeExpiredTs
     * @return string
     */
    public static function buildTokenWithUid($appID, $appCertificate, $channelName, $uid, $role, $privilegeExpiredTs)
    {
        // Create a new token instance
        $token = new RtcToken($appID, $appCertificate, $channelName, (string)$uid);
        // Grant join channel privilege
        $token->addPrivilege(RtcToken::$Privileges["joinChannel"], $privilegeExpiredTs);

        if ($role == self::Role_Publisher) {
            $token->addPrivilege(RtcToken::$Privileges["publishAudioStream"], $privilegeExpiredTs);
            $token->addPrivilege(RtcToken::$Privileges["publishVideoStream"], $privilegeExpiredTs);
            $token->addPrivilege(RtcToken::$Privileges["publishDataStream"], $privilegeExpiredTs);
        }

        return $token->build();
    }
}

class RtcToken
{
    public static $Privileges = [
        "joinChannel"       => 1,
        "publishAudioStream"=> 2,
        "publishVideoStream"=> 3,
        "publishDataStream" => 4,
    ];

    private $appID;
    private $appCertificate;
    private $channelName;
    private $uid;
    private $salt;
    private $ts;
    private $privileges;

    public function __construct($appID, $appCertificate, $channelName, $uid)
    {
        $this->appID         = $appID;
        $this->appCertificate= $appCertificate;
        $this->channelName   = $channelName;
        $this->uid           = $uid;
        $this->salt          = random_int(1, 99999999);
        $this->ts            = time() + 24 * 3600; // default expiration (24 hours) for internal use
        $this->privileges    = [];
    }

    /**
     * Add a privilege with its expiration timestamp.
     *
     * @param int $privilege
     * @param int $expireTimestamp
     */
    public function addPrivilege($privilege, $expireTimestamp)
    {
        $this->privileges[$privilege] = $expireTimestamp;
    }

    /**
     * Build the token.
     *
     * @return string
     */
    public function build()
    {
        // For demonstration, we simply encode the token parameters as JSON and base64 encode the result.
        // Replace this with the proper token generation logic for production use.
        $data = [
            'appID'       => $this->appID,
            'channelName' => $this->channelName,
            'uid'         => $this->uid,
            'salt'        => $this->salt,
            'ts'          => $this->ts,
            'privileges'  => $this->privileges,
        ];

        return base64_encode(json_encode($data));
    }
}
