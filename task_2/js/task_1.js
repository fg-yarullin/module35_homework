const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;

let parser = new DOMParser();

const doc = parser.parseFromString(xmlString, "application/xml");
const students = doc.querySelectorAll('student');

const result = {
    list: []
};

for (let item of students) {
    let person = {
        name: item.querySelector('first').innerHTML + ' ' + item.querySelector('second').innerHTML,
        age: item.querySelector('age').innerHTML,
        prof: item.querySelector('prof').innerHTML,
        lang: item.querySelector('name').attributes.lang.value,
        
    };
    result.list.push(person);
}

console.log(result);