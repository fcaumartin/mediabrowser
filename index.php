<?php
require_once("lib.php");

$uri = rawurldecode($_SERVER["REQUEST_URI"]);


if (str_starts_with($uri, "/dist/") || str_contains($uri, "bootstrap-icons.woff")) {
    return false;
}
elseif (str_starts_with($uri, "/api/pictures")) {
    $uri = str_replace("/api/pictures","", $uri);
    $elements = array_filter(explode("/", $uri));
    $rep = end($elements);
    echo json_encode(get_directories_infos($base_dir . "/" . $rep));
    return true; 
}
elseif (is_file($base_dir.$uri)) {
    $im = file_get_contents($base_dir.$uri);
    header("Content-type: image/jpeg");
    echo $im;
    return true; 
} else {
    require("page.php");
    return true;
}

