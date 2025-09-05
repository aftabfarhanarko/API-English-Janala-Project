const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const displayLesson = (lessone) => {
  console.log(lessone);
  // 1 Get The COintnar
  const cointanar = document.getElementById("leson-cointnar");
  cointanar.innerHTML = "";
// : 
// id
// : 
// 102
// lessonName
// : 
// "Everyday Words"
// level_no
// : 
// 2

  lessone.forEach((element) => {
    const lavelBtn = document.createElement("div");
    lavelBtn.innerHTML = `
        <div>
        <button class="btn btn-outline btn-primary">
         <i class="fa-solid fa-book-open-reader"></i>Lessone - ${element.level_no}</button> 
        </div>
        `;
        cointanar.append(lavelBtn);
  });
};
loadData();
