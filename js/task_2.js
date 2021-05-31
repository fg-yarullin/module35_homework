// const jsonString = '{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}';
// const employee = JSON.parse(jsonString);

const employee = {
    name: "Anton",
    age: 36,
    skils: [
        "Javascript",
        "HTML",
        "CSS"
    ],
    salary: 80000
};

console.log(JSON.stringify(employee));