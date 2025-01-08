<?php

/* Create new imagick object */
$im = new Imagick(["img1.jpg", "img2.jpg"]);
$im2 = new Imagick(["img3.jpg", "img4.jpg"]);
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
header("Content-Type: image/png");
echo $combined3;
?>