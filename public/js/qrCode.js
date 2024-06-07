var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 280,
	height : 280
});

function makeCode (id) {      
  qrcode.makeCode(id);
}

