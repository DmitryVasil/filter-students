//Создаем экземпляр студента
function createStudent(surname, name, lastname, berthday, yearEducation, faculty) {
  return {
    surname: surname,
    name: name,
    lastname: lastname,
    berthday: berthday,
    yearEducation: yearEducation,
    faculty: faculty,
  }
}

//Выводим полное имя
function getFullName(obj) {
    return obj.surname + ' ' + obj.name + ' ' + obj.lastname;
  }

//Превращаем в строку дату рождения
function getBirthdayString(obj) {
    const yyyy = obj.berthday.getFullYear();
    let mm = obj.berthday.getMonth() + 1;
    let dd = obj.berthday.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy  ;
  }

//Высчитываем возраст
function getAge(obj) {
    const today = new Date();
    let age = today.getFullYear() - obj.berthday.getFullYear();
    let m = today.getMonth() - obj.berthday.getMonth();
    if ( m < 0 || (m === 0 && today.getDate() < obj.berthday.getDate())) {
      age --;
    }
    return age;
  }

  function getDateStartYear(obj) {
    return obj.yearEducation;
  }

  function getFaculty(obj) {
    return obj.faculty;
  }

//Высчитываем период обучения
 function getEducationPeriod (obj) {
  let yearsOfEducation = new Date().getFullYear() - obj.yearEducation;
  if (yearsOfEducation > 4) {
    return  'закончил)';
  } else {
    return yearsOfEducation  + ' курс)';
  }
 }

// Массив студентов по дефолту
const students = [
  createStudent('Иванов', 'Иван', 'Иванович', new Date(1992, 3, 17), 2021, 'юрист'),
  createStudent('Васильев', 'Дмитрий', 'Андреевич', new Date(1993, 3, 17), 2020, 'информатика'),
  createStudent('Долгова', 'Александра', 'Дмитриевна', new Date(1995, 2, 6), 2000, 'тракторист'),
]


//таблица студентов
const studentsListTable = document.getElementById('students-list');

//Создаем нового студента
function appStudent (student) {
  const studentTableTr = document.createElement('tr');
  const fullNameTable = document.createElement('td');

  const berthdayTable = document.createElement('td');
  const yearEducationTable = document.createElement('td');
  const facultyTable = document.createElement('td');

  fullNameTable.textContent = getFullName(student);
  berthdayTable.textContent = getBirthdayString(student) + ' (' + getAge(student) + ' лет)';
  yearEducationTable.textContent = student.yearEducation + '-' + (Number(student.yearEducation) + 4) + ' (' + getEducationPeriod(student);
  facultyTable.textContent = student.faculty;

  studentTableTr.append(fullNameTable);
  studentTableTr.append(berthdayTable);
  studentTableTr.append(yearEducationTable);
  studentTableTr.append(facultyTable);
  // console.log(fullNameTable);
  // console.log(studentTableTr);
  return studentTableTr;
}
// console.log(appStudent(students[0]));

let dir = true; // возрастание списка
const findFioValue = document.getElementById('input-goup-find'); // поле ввода поиска по ФИО
const thFIO =  document.getElementById('thFIO'); // кнопка фильтрации по ФИО

const findAgeValue = document.getElementById('input-goup-age');
const thAGE = document.getElementById('thAGE');

const findDateValue = document.getElementById('input-goup-date');
const thDate = document.getElementById('thDate');

const findFacultyValue = document.getElementById('input-goup-faculty');
const thFaculty = document.getElementById('thFaculty');

let arrFilter = [];


//Сортировка
function sort(arr, item, dir) {
  let studentsCopy = [...arr];
  if (typeof item == 'function') {
    if (dir ==true) {
      return (
        studentsCopy.sort((a, b) => item(a) > item(b) ? 1 : -1)
        );
    } else if (dir == false) {
      return studentsCopy.sort((a, b) => item(a) < item(b) ? 1 : -1);
    }
  } else {
    if (dir ==true) {
      return (
        studentsCopy.sort((a, b) => a.item > b.item ? 1 : -1)
        );
    } else if (dir == false) {
      return studentsCopy.sort((a, b) => a.item < b.item ? 1 : -1);
    }
  }
}

//нажимаем-сортируем по возрасту
function clickSortAge () {
  thAGE.addEventListener('click', function() {
    studentsListTable.innerHTML = '';
    // let studentsCopy = [...students];
    if (arrFilter.length === 0) {
      studentsCopy = sort([...students], getAge, dir);
    } else {
      studentsCopy = sort(arrFilter, getAge, dir);
    }
    dir = !dir;
    for (let student of studentsCopy) {
      studentsListTable.append(appStudent(student));
    }
  })
}

//нажимаем-сортируем по ФИО
function clickSortFio () {
  thFIO.addEventListener('click', function() {
    studentsListTable.innerHTML = '';
    console.log(2);
    // let studentsCopy = [...students];
    if (arrFilter.length === 0) {
      studentsCopy = sort([...students], getFullName, dir);
    } else {
      studentsCopy = sort(arrFilter, getFullName, dir);
    }
    dir = !dir;
    for (let student of studentsCopy) {
      studentsListTable.append(appStudent(student));
    }
  })
}

//нажимаем-сортируем по дате поступления
function clickSortYearEducation () {
  thDate.addEventListener('click', function() {
    studentsListTable.innerHTML = '';
    // let studentsCopy = [...students];
    console.log(2);
    if (arrFilter.length === 0) {
      studentsCopy = sort([...students], getDateStartYear, dir);
    } else {
      studentsCopy = sort(arrFilter, getDateStartYear, dir);
    }
    dir = !dir;
    for (let student of studentsCopy) {
      studentsListTable.append(appStudent(student));
    }
  })
}

//нажимаем-сортируем по факультету
function clickSortFaculty () {
  thFaculty.addEventListener('click', function() {
    studentsListTable.innerHTML = '';
    // let studentsCopy = [...students];
    if (arrFilter.length === 0) {
      studentsCopy = sort([...students], getFaculty, dir);
    } else {
      studentsCopy = sort(arrFilter, getFaculty, dir);
    }
    dir = !dir;
    for (let student of studentsCopy) {
      studentsListTable.append(appStudent(student));
    }
  })
}

function filterFioFunction() {
  return arrFilter.filter(student => getFullName(student).toLowerCase().includes(findFioValue.value.toLowerCase()));
}

function filterAgeFunction() {
  return arrFilter.filter(student => String(getAge(student)).includes(findAgeValue.value));
}

function filterDataYearFunction() {
  return arrFilter.filter(student => String(getDateStartYear(student)).includes(findDateValue.value));
}

function filterFacultyFunction() {
  return arrFilter.filter(student => getFaculty(student).toLowerCase().includes(findFacultyValue.value.toLowerCase()));
}

arrFilter = students;

// поиск по ФИО
function findFIO () {
  findFioValue.addEventListener('input', function () {
    studentsListTable.innerHTML = '';
    if (findFacultyValue.value) arrFilter = filterFacultyFunction();
    if (findDateValue.value) arrFilter = filterDataYearFunction();
    if (findAgeValue.value) arrFilter = filterAgeFunction();
    arrFilter = filterFioFunction();
    for (let student of arrFilter) {
      studentsListTable.append(appStudent(student));
    }
    arrFilter = students;
  })
}

// поиск по возрасту
function findAge () {
  findAgeValue.addEventListener('input', function () {
    studentsListTable.innerHTML = '';
    if (findFacultyValue.value) arrFilter = filterFacultyFunction();
    if (findDateValue.value) arrFilter = filterDataYearFunction();
    if (findFioValue.value) arrFilter = filterFioFunction();
    arrFilter = filterAgeFunction();
    for (let student of arrFilter) {
      studentsListTable.append(appStudent(student));
    }
    arrFilter = students;
  })
}

// поиск по дате
function findStartYear () {
  findDateValue.addEventListener('input', function () {
    studentsListTable.innerHTML = '';
    if (findFacultyValue.value) arrFilter = filterFacultyFunction();
    if (findAgeValue.value) arrFilter = filterAgeFunction();
    if (findFioValue.value) arrFilter = filterFioFunction();
    arrFilter = filterDataYearFunction();
    for (let student of arrFilter) {
      studentsListTable.append(appStudent(student));
    }
    arrFilter = students;
  })
}

// поиск по факультету
function findFaculty () {
  findFacultyValue.addEventListener('input', function () {
    studentsListTable.innerHTML = '';
    if (findDateValue.value) arrFilter = filterDataYearFunction();
    if (findAgeValue.value) arrFilter = filterAgeFunction();
    if (findFioValue.value) arrFilter = filterFioFunction();
    arrFilter = filterFacultyFunction();
    for (let student of arrFilter) {
      studentsListTable.append(appStudent(student));
    }
    arrFilter = students;
  })
}

function render() {
  let studentsCopy = [...students];
  studentsListTable.innerHTML = '';
  for (let student of studentsCopy) {
    studentsListTable.append(appStudent(student));
  }
  document.querySelectorAll('.form input').forEach(el => el.value = ""); // обнуляем поля ввода
}

findAge();
findFIO();
findFaculty();
findStartYear();
clickSortAge();
clickSortFio();
clickSortYearEducation();
clickSortFaculty();


document.getElementById('add-student').addEventListener('submit', function(e) {
  e.preventDefault()

  students.push(createStudent(
    document.getElementById('input-surname').value.trim(),
    document.getElementById('input-name').value.trim(),
    document.getElementById('input-lastname').value.trim(),
    new Date(document.getElementById('input-berthday').value),
    document.getElementById('input-year-education').value,
    document.getElementById('input-faculty').value.trim(),

  ))

  render()
})

render()

