<?php

$url = 'https://api.openweathermap.org/data/2.5/weather?lat=' . $_GET["lat"] . '&lon=' . $_GET["long"] . '&appid=22b62880d74af53003622ae0e5b63b8a';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);

curl_close($ch);

echo $output;
