<?php
// require("lib.php");


define("BASE_DIR", "/media/frc/save_20240708/sauvegarde/maison/photos");

// $dir = array_filter(scandir(BASE_DIR), function ($v) { if (return true;} );
$dir = array_diff(scandir(BASE_DIR, SCANDIR_SORT_ASCENDING), array('..', '.'));
$uri = rawurldecode($_SERVER["REQUEST_URI"]);

if (str_starts_with($uri, "/dist/")) {
    return false; 
}


$DEBUG = [
    "uri" => $uri,
    "dir" => $dir,
];

require("header.php");
require("page.php");
require("debug.php");
require("footer.php");


return true;