<?php

$apiKey = ""; //Paste her your api key from https://openweathermap.org

$url = 'https://api.openweathermap.org/data/2.5/weather?lat=' . $_GET["lat"] . '&lon=' . $_GET["long"] . '&appid=' . $apiKey;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$output = curl_exec($ch);

curl_close($ch);

echo $output;

?>
