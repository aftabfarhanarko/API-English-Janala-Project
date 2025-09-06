const creatElement = (arr) =>{
  const bodyHrml = arr.map(element =>`
     <span> <button class="btn">${element}</button></span>
    ` )
   return (bodyHrml.join(" "));
}

const spinner = (sta) =>{
  if(sta == true){
    document.getElementById("spiners").classList.remove("hidden");
    document.getElementById("wordCointaner").classList.add("hidden");
  }else{
     document.getElementById("wordCointaner").classList.remove("hidden");
    document.getElementById("spiners").classList.add("hidden");
  }
}

const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const btns = () => {
  const btn = document.querySelectorAll(".lesson-btn");
  btn.forEach((element) => element.classList.remove("active"));
};
const lavelWorld = (id) => {
    spinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      btns();
      const click = document.getElementById(`click-btn-${id}`);
      click.classList.add("active");
      click.remove = "active";
      displayLavelWord(data.data);
    });
};

const loadWord = async (wordID) => {
  const url = `https://openapi.programming-hero.com/api/word/${wordID}`;
  const res = await fetch(url);
  const detlis = await res.json();
  wrdDetilsDisplay(detlis.data);
};

const wrdDetilsDisplay = (word) => {
  const coinModal = document.getElementById("modal-cointnar");
  coinModal.innerHTML = `
                <div class="text-2xl font-bold">
                    <h2>${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.meaning})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold text-xl">Meaning</h2>
                    <p class="font-medium">${word.meaning ?word.meaning : "অর্থ পাওয়া যায়নি" }</p>
                </div>
                <div class="">
                    <h2 class="font-bold text-xl">Example</h2>
                    <p class="font-medium">${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold text-xl mb-3">সমার্থক শব্দ গুলো</h2>
                     <div>${creatElement(word.synonyms)}</div>
                </div>
  `;
  document.getElementById("my_modal").showModal();
};

const displayLavelWord = (word) => {
  const woedCointner = document.getElementById("wordCointaner");
  woedCointner.innerHTML = "";

  if (word.length == 0) {
    woedCointner.innerHTML = `
    <div class="text-center col-span-full space-y-4 py-10">
             <img class="mx-auto" src="./assets/alert-error.png" alt="">
             <p class="  font-semibold text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
             <h1 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h1>
        </div>
   `;
    spinner(false);
    return;
  }

  word.forEach((wordes) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="font-sans bg-white p-5 text-center rounded-lg shadow-lg  py-6 px-6 space-y-4">
           <h2 class="text-2xl font-bold">${
             wordes.word ? wordes.word : "Word Not Found"
           }</h2>
           <p class=" text-[18px] font-semibold">Meaning /Pronounciation</p>
           <h2 class=" text-2xl font-bold bangla-font">"${
             wordes.meaning ? wordes.meaning : "অর্থ পাওয়া যায়নি"
           } /${wordes.pronunciation ? wordes.pronunciation : "অর্থ পাওয়া যায়নি"}"</h2>
           <div class="flex justify-between items-center ">
                  <button onclick="loadWord(${
                    wordes.id
                  })" class="btn bg-sky-100"><i class="fa-solid fa-circle-info"></i>    </button>
                  <button class="btn bg-sky-100"><i class="fa-solid fa-volume-high"></i>   </button>
           </div>
       </div>
    `;
    woedCointner.append(card);
  });
  spinner(false);
  
};

const displayLesson = (lessone) => {
  // 1 Get The COintnar
  const cointanar = document.getElementById("leson-cointnar");
  cointanar.innerHTML = "";
  lessone.forEach((element) => {
    const lavelBtn = document.createElement("div");
    lavelBtn.innerHTML = `
        <div>
        <button id="click-btn-${element.level_no}" onclick="lavelWorld(${element.level_no})" class="btn btn-outline btn-primary lesson-btn">
         <i class="fa-solid fa-book-open-reader"></i>Lessone - ${element.level_no}</button> 
        </div>
        `;
    cointanar.append(lavelBtn);
  });
};
loadData();
