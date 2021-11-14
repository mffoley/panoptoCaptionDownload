function download() {
  var captions = document.querySelectorAll('*[id^="UserCreatedTranscript"]');

  var element = document.createElement('a');

  var captionsstr = '';
  var currentSentence = '';
  var punctuation = -1;
  var maxCaptionLen = 0;

  for (var i = 0; i < captions.length; i++) {
    if (captions[i].getElementsByClassName('index-event-row').length > 0) {
      currentcaption = captions[i].getElementsByClassName('index-event-row')[0].getElementsByClassName('event-text')[0].getElementsByTagName('span')[0].innerText;
      if (currentcaption.length > maxCaptionLen){
        maxCaptionLen = currentcaption.length;
      }
      punctuation = Math.max(currentcaption.indexOf("."), currentcaption.indexOf("?"), currentcaption.indexOf("!"));
      if (punctuation>0 && currentSentence.length > 40){
        captionsstr += currentSentence + currentcaption.substring(0,punctuation+1) + '\n\n';
        if (punctuation+2 < currentcaption.length){
          currentSentence = currentcaption.substring(punctuation+2) + " ";
        }
        else{
          currentSentence = "";
        }

      }
      else {
        currentSentence += currentcaption + " ";
      }
    }
  }



  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(captionsstr));
  element.setAttribute('download', document.title + ' Captions');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: download
  });
});
