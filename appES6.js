class Course {
    constructor(title, instructor, image) {
        this.id=Math.floor(Math.random()*1000)
        this.title = title
        this.instructor = instructor
        this.image = image
    }
}
class UI {
    addCourseList(course) {
        const list = document.getElementById("course-list")
        let html = `
        <tr>
        <td><img src="img/${course.image}.jpg"></td>
        <td>${course.title}</td>
        <td>${course.instructor}</td>
        <td> <a href="#" data-id=${course.id} class="btn btn-danger delete btn-sm">Delete</a>
        </tr>
        `
        list.innerHTML += html
    }
    clearControl() {
        const title = document.getElementById('title').value = ""
        const instructor = document.getElementById('instructor').value = ""
        const image = document.getElementById('image').value = ""
    }
    deleteElement(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove()
            return true
        }
    }
    showAlert(massage, className) {
        let html = `
    <div class="alert alert-${className}">${massage}</div>
    `
        const row = document.querySelector(".row")
        row.insertAdjacentHTML("beforebegin", html)
        setTimeout(x => {
            document.querySelector(".alert").remove()
        }, 2000)
    }
}

class Storage {
    static getCourse(){
        let courses
        if(localStorage.getItem("courses")===null){
          courses=[]
        }
        else{
            courses=JSON.parse(localStorage.getItem("courses"))
           
        }
        return courses
    }
    static dispalyCourse(){
        const courses=Storage.getCourse()
        courses.forEach(course => {
            const ui = new UI()
            ui.addCourseList(course)
        });
    }
    static addCourse(course) {
        const courses=Storage.getCourse()
        courses.push(course)
        localStorage.setItem('courses',JSON.stringify(courses))
    }
    static deleteCourse(element){
        if (element.classList.contains('delete')){
            const id=element.getAttribute('data-id')
            let courses=Storage.getCourse()
            courses.forEach((course,index) => {
                if(course.id==id){
                    courses.splice(index,1)
                    localStorage.setItem('courses',JSON.stringify(courses))
                }
            });
            console.log(id)
        }
    }
}
document.addEventListener('DOMcontentLoaded',Storage.dispalyCourse())
document.getElementById("new-course").addEventListener('submit',
    function (e) {
        const title = document.getElementById('title').value
        const instructor = document.getElementById('instructor').value
        const image = document.getElementById('image').value
        // create course object
        const course = new Course(title, instructor, image)
        // create UI
        const ui = new UI()
        if (title === '' || instructor === '' || image === '') {
            ui.showAlert('Ekleme yapılamadı boş cevap vermeyin', 'danger')
        } else {
            //add course to list
            ui.addCourseList(course)
            Storage.addCourse(course)
            //clear control
            ui.clearControl()
            ui.showAlert('Başarıyla Eklendi', 'success')
        }

        e.preventDefault()
    })
document.getElementById("course-list").addEventListener('click', function (e) {
    const ui = new UI()
   if( ui.deleteElement(e.target)){
       Storage.deleteCourse(e.target)
    ui.showAlert('Kurs Silindi', 'danger'
    )}
    
})