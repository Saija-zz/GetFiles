/*
A script used to generate PowerShell commands to download files from the links(a tag) included on some html page
*/
function main(){
	//extension de los archivos que queremos descargar
	var extension = '.pk3';
	var downloadLocation = 'c:\\users\\borrerju\\Downloads\\';
	var input = crearTextArea();
	
	var tagsA = document.querySelectorAll('a[href]');
	
	input.innerHTML = initializePowerShell();
	
	getTheFiles(tagsA, downloadLocation);
}

function getTheFiles(tagsArray, downloadLocation){
	for (var i = 0; i < tagsArray.length; i++) {
		var hreff = tagsArray[i].href;
		
		if (hreff.endsWith(extension)) {
			
			//del href del elemento A(link) se extrae solo el file name
			var fileName = getFilename(hreff);
			console.log(i + ' -> ' + hreff);
			
			//armamos la sentencia que le dira a PowerShell que descargue el archivo x y lo guarde en cierta ubicacion
			input.innerHTML = input.innerHTML + "\n" + buildDownloadSentence(hreff, downloadLocation, fileName);
		}
	}
}

function getFilename(hreff){
	var fileName = '';
	var n = hreff.lastIndexOf("/");
	//del href del elemento A(link) se extrae solo el file name
	fileName = hreff.substring(n+1, hreff.length);
	return fileName;
}

function crearTextArea(){
	var input = document.createElement('TEXTAREA');
	input.setAttribute('maxlength', 30000);
	input.setAttribute('cols', 80);
	input.setAttribute('rows', 40);	
	return input;
}

function initializePowerShell(){
	return '$client = new-object System.Net.WebClient';
}

function buildDownloadSentence(hreff, downloadLocation, fileName){
	return '$client.DownloadFile("' + hreff + '","' + downloadLocation +  fileName + '")';
}


