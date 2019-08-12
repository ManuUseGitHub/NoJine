<!DOCTYPE html>

<!--
Copyright 2015 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<html>

<head>
    <title>NoJine - Some neat interactions</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">
    <link rel="stylesheet" href="../public/assets/css/style2.css">
    <link rel="stylesheet" href="../public/assets/css/themes.css">
    <link rel="shortcut icon" type="image/png" href="images/logo.svg.png"/>
</head>

<body>
	<div id='main'>
	<?php
        include_once ('body.html')
    ?>	
	</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://rawcdn.githack.com/ManuUseGitHub/CardinalSwitcher/6da7eac77fd6fc68835c17ce0a5fc5d28aba3538/dev/CardinalSwitcher.js"></script>

    <!-- development version, includes helpful console warnings -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <script src="../public/assets/js/components/v-app.js"></script>


    <script src="../public/assets/js/notif_engine.js"></script>
    <script src="../public/assets/js/showcase.js"></script>

</body>

</html>