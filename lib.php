<?php

$base_dir = "/disk2/photos";
$base_dir = "/media/frc/save_20240708/sauvegarde/maison/photos";
$base_dir = "/home/frc/Images";

function get_directories_infos($dir) {

    $liste = array_filter(scandir($dir), fn ($v) => str_starts_with($v, ".")?false:true);

    $directories = [];
    $pictures = [];
    foreach($liste as $v) {
        if (is_dir($dir . "/" . $v)) {
            if ($v != ".thumbnails") {

                $directories[] = $v;
                if (!file_exists($dir . "/" . $v . "/folder.jpg")) {
                    generate_folder_pic($dir . "/" . $v);
                }
            }
        }
        if (is_file($dir . "/" . $v) && is_picture($dir . "/" . $v) && $v!="folder.jpg") {
            $pictures[] = $v;
            if (!file_exists($dir . "/.thumbnails/" . $v)) {
                if (is_dir($dir . "/.thumbnails/")==false) {
                    mkdir($dir . "/.thumbnails");
                }
                try {

                    $thumb = new Imagick($dir . "/" . $v);
                    // $thumb->resizeImage(50,50,Imagick::FILTER_LANCZOS,1);
                    $thumb->thumbnailImage(150, 150, true);
                    $thumb->writeImage($dir . "/.thumbnails/" . $v);
                }
                catch (Exception $er) {
                    
                }

            }
        }
    }

    return [
        "directories" => $directories,
        "pictures" => $pictures,
    ];
}

function get_first_files($dir) {

    $liste = array_filter(scandir($dir), function ($v) {
        if (str_starts_with($v, ".")) return false;
        if (!is_picture($v)) return false;
        return true;
    });
    $tab = array_slice($liste, 0, 4);
    // echo $tab;
    return $tab;
}

function generate_folder_pic($dir) {
    try {

        $pics = get_first_files($dir);


        /* Create new imagick object */
        $im = new Imagick([$dir."/".$pics[0], $dir."/".$pics[1]]);
        $im2 = new Imagick([$dir."/".$pics[2], $dir."/".$pics[3]]);
        /* create red, green and blue images */

        /* Append the images into one */
        $im->resetIterator();
        $combined = $im->appendImages(true);

        $im2->resetIterator();
        $combined2 = $im2->appendImages(true);

        $im3 = new Imagick();
        $im3->addImage($combined);
        $im3->addImage($combined2);
        $im3->resetIterator();
        $combined3 = $im3->appendImages(false);

        /* Output the image */
        $combined3->setImageFormat("png");
        $combined3->thumbnailImage(300 , 300, true);
        $combined3->writeImage($dir . "/folder.jpg");
    }
    catch (Exception $er) {
        return false;
    }
    return true;
}

function is_picture($file) {
    if (str_ends_with(strtolower($file), ".jpg")) return true;
    if (str_ends_with(strtolower($file), ".png")) return true;
    if (str_ends_with(strtolower($file), ".gif")) return true;
        
    return false;
}