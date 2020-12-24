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

async function getDailyCount () {
    previous = await getStorageData('previous');
    previous = previous.previous
    today = await getStorageData('dailyCount');
    today = today.dailyCount
    createPrevChart(previous)

        if (today == undefined) {
            console.log("shampoo" + today)
            document.getElementById('dailyCount').innerHTML = 0
        }
        else {
            document.getElementById('dailyCount').innerHTML = today;
            
            }
        }

function createPrevChart (userPrevs) {
    var ctx = document.getElementById("myChart");
    days = [7, 6, 5, 4, 3, 2, 1]
    var myChart = new Chart(ctx, {
        type:"bar",
        data: {
            labels: days,
            datasets: [
                {
                    barThickness: 10,
                    label:"",
                    backgroundColor: 'rgba(241,21,98,1)',
                    data:userPrevs}
            ]
        },
        options: {
            scales: {
                
                xAxes: [{
                    ticks: {
                        display:false
                    },
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                        drawBorder: false,
                        display:false
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            }
        }
        
    });

}
        
        

    


getDailyCount()

