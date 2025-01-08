<div className="row">
    <div id="root" className="col-12"></div>
</div>

<div class="row">

    <?php foreach($liste["directories"] as $d):  ?>

        <div class="col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
            <a href="/<?=$d?>">
                <img src="/<?=$d?>/folder.jpg" alt="" width="100%">
                <?=$d?>
            </a>
        </div>
    
    
    <?php endforeach ?>
</div>

<div class="row">

    <?php foreach($liste["pictures"] as $d):  ?>

        <div class="col-12 col-sm-6 col-md-4 col-xl-3 col-xxl-2">
            <a href="<?=rawurlencode($uri."/".$d)?>">
                <img src="<?=rawurlencode($uri."/.thumbnails/".$d)?>" width="100%"/>
                <?=$d?>
            </a>
        </div>
    
    
    <?php endforeach ?>
</div>