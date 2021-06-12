const seconds = 3;
const pageNumber = document.getElementById('page_number');
const countLimit = document.getElementById('limit');
const myButton = document.querySelector('.btn');

onDocumentLoad();

myButton.addEventListener('click', async () => {
    const message = document.getElementById('message');
    message.innerText = '';
       
    let page = pageNumber.value;
    let limit = countLimit.value;

    if ((notValidValue(page) === notValidValue(limit)) && notValidValue(page)) {
        message.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
        message.style.display = 'block';
    } else if (notValidValue(page)) {
        message.innerText = 'Номер страницы вне диапазона от 1 до 10';
        message.style.display = 'block';
    } else if (notValidValue(limit)) {
        message.innerText = 'Лимит вне диапазона от 1 до 10';
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
        const images = await getImages(page, limit);
        setStorageItem(images);
        renderImages(images);
    }
    message.style.display === 'block' ? displayNoneAfter(seconds) : '';
});

function notValidValue(value) {
    return isNaN(value) || Number(value) < 1 || Number(value) > 10;
}

function displayNoneAfter(seconds) {
    let i = 0;
    const timerId = setInterval(function () {
            i++;
            if (i === seconds) {
                message.style.display = 'none';
                clearInterval(timerId);
            }
        }, 
        1000
    )
}

function getImages(page, limit) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    let images;
    return fetch(url)
        .then((response) => { 
            return response.json();
        })
        .then((data) => {
            return data
        })
        .catch(() => console.log('ошибка'))        
}

function renderImages(data) {
    const imageDiv = document.querySelector('.images');
    imageDiv.innerHTML = '';
    for (item of data) {
        const img = document.createElement('img');
        img.className = 'img';
        img.src = item.download_url;
        img.width = 350;
        imageDiv.appendChild(img);
    }
}

function setStorageItem(images) {
    if (images.length > 0 && localStorage.getItem('picsum_photos')) {
        localStorage.removeItem('picsum_photos');
    }
    localStorage.setItem('picsum_photos', JSON.stringify(images));
}

function onDocumentLoad() {
    let images;
    if (images = localStorage.getItem('picsum_photos')) {
        images = JSON.parse(images);
        renderImages(images)
    }
}