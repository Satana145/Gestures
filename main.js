Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");


Webcam.attach('#camera');


function take_snapshot() {

    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/m7_pEOLE3/model.json', modelLoaded);


function modelLoaded() {
    console.log('Model Is Loaded!')
}


function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction Is -" + prediction_1;
    speak_data_2 = "And The Second Prediction Is -" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}


function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}


function gotResults(error, results) {

    if (error) {
        console.error(error);
    } else {
        console.log(results);
        console.log("yay")
        document.getElementById("result_hand_name").innerHTML = results[0].label;
        document.getElementById("result_hand_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Wave") {
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
        else if (results[0].label == "Clap") {
            document.getElementById("update_emoji").innerHTML = "&#128079;";
        }
        else if (results[0].label == "Thumbs Down") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        else if (results[0].label == "Thumbs Up") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        else if (results[0].label == "Perfect") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        else if (results[0].label == "Up") {
            document.getElementById("update_emoji").innerHTML = "&#9757;";
        }
        
        if (results[1].label == "Wave") {
            document.getElementById("update_emoji2").innerHTML = "&#128075;";
        }
        else if (results[1].label == "Clap") {
            document.getElementById("update_emoji2").innerHTML = "&#128079;";
        }
        else if (results[1].label == "Thumbs Down") {
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
        }
        else if (results[1].label == "Thumbs Up") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        else if (results[1].label == "Perfect") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        else if (results[1].label == "Up") {
            document.getElementById("update_emoji2").innerHTML = "&#9757;";
        }
    }
}