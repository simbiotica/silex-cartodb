<?php

require_once __DIR__ . '/../vendor/autoload.php';

/**
 * Services Providers Registration
 */
use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

/**
 * Application
 */
$app = new Application();
$app->register(new TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/Views',
));
$app->register(new UrlGeneratorServiceProvider());

require_once __DIR__ . '/routes.php';

return $app;

?>
