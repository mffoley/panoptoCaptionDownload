function download() {
  var captions = document.querySelectorAll('*[id^="UserCreatedTranscript"]');

  var element = document.createElement('a');

  var captionsstr = '';

  for (var i = 0; i < captions.length; i++) {
    if (captions[i].getElementsByClassName('index-event-row').length > 0) {
      captionsstr += captions[i].getElementsByClassName('index-event-row')[0].getElementsByClassName('event-text')[0].getElementsByTagName('span')[0].innerText+'\n\n';
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
