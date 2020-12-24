console.log("this is for content.js")

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        console.log("spacey")
        if (checkDateMatch()) {
            console.log("space")
            addWords(1)
        }
    }
  })

async function addWords(addend) {
    
    storedCount = await getStorageData('dailyCount');
        if (storedCount.dailyCount == null) {
            let value = 1;
            setStorageData({"dailyCount": value})

        }
        else {
            let value = addend + storedCount.dailyCount;
            setStorageData({"dailyCount": value})
        }
      
}

async function checkDateMatch () {
    let currentDate = new Date();
    currentDate = currentDate.getDate();
    let storedDate = await getStorageData('date');
    return compareDates(storedDate.date, currentDate);

}

const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )

const setStorageData = data =>
new Promise((resolve, reject) =>
chrome.storage.sync.set(data, () =>
    chrome.runtime.lastError
    ? reject(Error(chrome.runtime.lastError.message))
    : resolve()
)
)

async function compareDates (storedDate, currentDate) {
    if (storedDate == currentDate) {
        return true
    }
    else {
        await setStorageData({"date": currentDate});
        await shiftCounts();
        return false;
    }
}

async function shiftCounts () {
    previous = await getStorageData('previous');
    previous = previous.previous
    mostRecent = await getStorageData('dailyCount');
    mostRecent = mostRecent.dailyCount
    previous.push(mostRecent)
    if (previous.length > 7) {
        previous.shift()
    }
    await setStorageData({"previous": previous})
    await setStorageData({"dailyCount": 1});

}
