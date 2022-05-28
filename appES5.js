function Course(title, instructor, image) {
    this.title = title
    this.instructor = instructor
    this.image = image
}
function UI() {
}
UI.prototype.addCourseList = function (course) {
    const list = document.getElementById("course-list")
    let html = `
    <tr>
    <td><img src="img/${course.image}.jpg"></td>
    <td>${course.title}</td>
    <td>${course.instructor}</td>
    <td> <a href="#" class="btn btn-danger delete btn-sm">Delete</a>
    </tr>
    `
    list.innerHTML += html
}
UI.prototype.clearControl = function () {
    const title = document.getElementById('title').value = ""
    const instructor = document.getElementById('instructor').value = ""
    const image = document.getElementById('image').value = ""
}
UI.prototype.deleteElement = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove()
    }
}
UI.prototype.showAlert=function(massage,className){
    let html=`
    <div class="alert alert-${className}">${massage}</div>
    `
    const row =document.querySelector(".row")
    row.insertAdjacentHTML("beforebegin",html)
    setTimeout(x=>{
        document.querySelector(".alert").remove()
    },2000)
}
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
            //clear control
            ui.clearControl()
            ui.showAlert('Başarıyla Eklendi','success')
        }

        e.preventDefault()
    })
document.getElementById("course-list").addEventListener('click', function (e) {
    const ui = new UI()
    ui.deleteElement(e.target)
    ui.showAlert('Kurs Silindi', 'danger')
})