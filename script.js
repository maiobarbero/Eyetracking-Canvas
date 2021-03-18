window.saveDataAcrossSession = true;
//Calibration

alert("Calibrazione in corso... ");
alert(
	"Centra la tua faccia nel riquadro, poi clicca velocemente sui punti rossi fino a farli sparire"
);

//Calibration
var calibrationPoint = document.querySelectorAll(".calibration");
var i = 0;

calibrationPoint.forEach((div) =>
	div.addEventListener("click", (e) => {
		if (i < 5) i++;
		if (i == 5) {
			div.classList.add("hide");
			i = 0;
		}
		console.log(i);
	})
);
webgazer
	.setGazeListener((data, timestamp) => {
		if (data == null) {
			return;
		}
		//Constant & Variables
		var xPrediction = data.x;
		var yPrediction = data.y;

		//Canvas
		const canvas = document.querySelector("#canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const ctx = canvas.getContext("2d");

		const dot = document.querySelector("#webgazerGazeDot");

		const img = document.querySelector("#img");

		//Drawing function
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutationRecord) {
				ctx.lineWidth = 2;
				ctx.lineTo(xPrediction, yPrediction);
				ctx.stroke();
				ctx.strokeStyle = "#00ff37";
				ctx.beginPath();
				ctx.moveTo(xPrediction, yPrediction);
			});
		});
		observer.observe(dot, { attributes: true, attributeFilter: ["style"] });
		//Add image
		function getImg() {
			setTimeout(() => {
				img.src = "img/img.jpg";
			}, 20000); //20sec delay
		}
		getImg();
	})
	.begin();

function stopDrawing() {
	setTimeout(() => {
		webgazer.pause();
	}, 40000); //end 20sec after image spawn
}

stopDrawing();
