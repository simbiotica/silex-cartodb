<?php

require_once __DIR__ . '/../vendor/autoload.php';


/**
 * Services Providers Registration
 */
use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\HttpCacheServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;


/**
 * Application
 */
$app = new Application();

$app->register(new HttpCacheServiceProvider(), array(
  'http_cache.cache_dir' => __DIR__ . '/../cache/'
));
$app->register(new TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
    'twig.options' => array(
        'cache' => __DIR__ . '/../cache/twig'
    )
));
$app->register(new UrlGeneratorServiceProvider());

require_once __DIR__ . '/routes.php';

return $app;

?>
