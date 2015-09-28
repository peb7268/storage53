<?php
/* Template Name: Site */
get_header();
?>

<?php echo st_get_headers($allPages); ?>

<section id="content">
    <div class="wrapper">
        <?php echo st_get_content($allPages); ?>
    </div>
</section>

<?php get_footer();