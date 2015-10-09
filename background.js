chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete')
    {
        return;
    }
    if (tab.url.match(/https\:\/\/[^\.]+\.basecamphq.com\//)) {
      chrome.tabs.executeScript(tabId, { file: 'calendar.js' });
    }
});
