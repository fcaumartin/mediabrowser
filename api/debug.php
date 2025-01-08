<?php
    foreach($DEBUG as $k=>$v) {
        echo "<pre>";
        echo "<h2>${k}</h2>";
        var_dump($DEBUG[$k]);
        echo "</pre>";
        echo "<hr>";
    }
?>
