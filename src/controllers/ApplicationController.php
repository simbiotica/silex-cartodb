<?php

namespace Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;

class ApplicationController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        $indexController = $app['controllers_factory'];
        $indexController->get('/', array($this, 'index'))->bind('application');
        return $indexController;
    }

    public function index(Application $app)
    {
        return $app['twig']->render('application.twig', array(
            'title' => 'Welcome',
            'description' => 'A demo'
        ));
    }
}

?>
