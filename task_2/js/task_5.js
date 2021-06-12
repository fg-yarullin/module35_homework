const userName = prompt("Добро пожаловать!\nНазовите, пожалуйста, ваше имя", '');

userName ? proceed() : alert('Вы не ввели имя!');

function proceed() {
    if (str = inStorage()) {
        alert(str);
    } else {
        const key = userName + Date.now();
        setStorageItem(userName, new Date(), key);
    }
}

function inStorage() {
    for (let key in localStorage) {
        let obj = JSON.parse(localStorage.getItem(key));
        if (obj !== null && obj.hasOwnProperty('name') && obj.name.toLowerCase() === userName.toLowerCase()) {
            const message = `Добрый день, ${obj.name}!\nДавно не виделись. В последний раз вы были у нас\n${formatDate(obj.lastVisitedAt)}`;
            setStorageItem(obj.name, new Date(), key);
            return message;
        } 
    }
}

function formatDate(dateString) {
    let dateTime = new Date(dateString);
    return dateTime.toLocaleString();
}

function setStorageItem(userName, date, key) {
    const user = {
        name: userName,
        lastVisitedAt: date
    };
    localStorage.setItem(key, JSON.stringify(user));
}