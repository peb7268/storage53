<?php
remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

#Set some paths
define('TEMPLATE_DIR', get_template_directory_uri());
define('IMAGE_DIR', get_template_directory_uri().'/img');

add_action('wp_enqueue_scripts', 'register_scripts');

function register_scripts(){
    global $post;

    wp_register_script('global', TEMPLATE_DIR . '/js/global.js', array());
    wp_register_script('fancybox', TEMPLATE_DIR . '/js/vendors/fancybox/source/jquery.fancybox.pack.js', array('jquery'), null, true);

    wp_register_style('fancybox', TEMPLATE_DIR . '/js/vendors/fancybox/source/jquery.fancybox.css', array(), null, 'all');

    wp_enqueue_script('jquery');
    wp_enqueue_script('global');

    wp_enqueue_style('fancybox');
    wp_enqueue_script('fancybox');
}

#Remove some default WP crap
remove_filter('the_content',  'wpautop');

#Fetch the site data
function st_get_headers($allPages){
    $headers = [];
    foreach($allPages as $page):
        if(strpos($page->post_title, 'header-') !== FALSE) $headers[] = $page->post_content;
    endforeach;

    $headers = implode(' ', $headers);
    return $headers;
}

function st_get_content($allPages){
    $pages = [];
    foreach($allPages as $page):
        if(strpos($page->post_title, 'page-') !== FALSE) { 
            $content = $page->post_content;
            $content = apply_filters('the_content', $content);
            $pages[$page->menu_order] = $content;
        }
    endforeach;

    ksort($pages);
    $pages = implode(' ', $pages);

    return $pages;
}

function st_get_page_order($allPages){
    $pages = [];
    foreach($allPages as $idx => $page):
        if(strpos($page->post_title, 'header-') !== FALSE) {
            $page_name = explode('header-', $page->post_title)[1];
            $pages[$page->menu_order] = $page_name;
        }
    endforeach;

    ksort($pages);
    return $pages;
}

function st_build_nav($page_order, $allPages){
    $nav_elements = [];

    foreach($page_order as $i => $page_name):
        $i++;

        foreach($allPages as $idx => $item):
            $hashName = '#'.str_replace(' ', '_', strtolower($page_name));
            $nav_elements[$i] = '<li><span ng-class="{active:tab==='.$i.'}"><a href="'. $hashName .'" ng-click="togglePage($event,'. $i .')">'.$page_name.'</a></span></li>';
        endforeach;
    endforeach;

    ksort($nav_elements);
    $nav_elements = implode(' ', $nav_elements);
    echo $nav_elements;

}

#Preload the page data
$allPages = get_pages();

//Debugging
function dd($mixed){
    echo '<pre>';
        print_r($mixed);
    echo '</pre>';
    die;
}

function d($mixed){
    echo '<pre>';
    print_r($mixed);
    echo '</pre>';
}
