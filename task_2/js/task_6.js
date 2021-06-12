function usePromise() {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const number = getRandomNumber(100);
            number % 2 === 0 
                ? resolve(`Завершено успешно. Сгенерированное число — ${number}`)
                : reject(`Завершено с ошибкой. Сгенерированное число — ${number}`);
            },
            3000
        );
    });

    myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
}


function getRandomNumber(max) {
    return Math.ceil((Math.random() * max));
}

console.log('3 секунды терпения, пожалуйста!');
usePromise();