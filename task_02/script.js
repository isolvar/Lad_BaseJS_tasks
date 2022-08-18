// https://jsbin.com/deyoteb/edit?html,css,js,output
// исправить код таким образом, чтобы при фокусе у инпутов добавлялась красная рамка.
// Обработка событий должна происходить на formElement.

//ORIGINAL(doesn't work)

// var formElement = document.forms['formElement'];

// formElement.onfocus = function(evt) {
//     var activeElement = formElement.querySelector('.focused');
// 	if (activeElement) {
// 	    activeElement.classList.remove('focused');
//     }
//     evt.target.classList.add('focused');
// };

// formElement.onblur = function(evt) {
// 	var activeElement = formElement.querySelector('.focused');
//     if (activeElement) {
//      	activeElement.classList.remove('focused');
//     }
// };

//======================
// Solution 1 (через погружение)

// var formElement = document.forms["formElement"];

// formElement.addEventListener(
//     "focus",
//     function (evt) {
//         var activeElement = formElement.querySelector(".focused");
//         if (activeElement) {
//             activeElement.classList.remove("focused");
//         }
//         evt.target.classList.add("focused");
//     },
//     true
// );

// formElement.addEventListener(
//     "blur",
//     function (evt) {
//         var activeElement = formElement.querySelector(".focused");
//         if (activeElement) {
//             activeElement.classList.remove("focused");
//         }
//     },
//     true
// );

//======================
// Solution 2 (через всплытие)

// var formElement = document.forms["formElement"];

// formElement.addEventListener("focusin", function (evt) {
//     var activeElement = formElement.querySelector(".focused");
//     if (activeElement) {
//         activeElement.classList.remove("focused");
//     }
//     evt.target.classList.add("focused");
// });

// formElement.addEventListener("focusout", function (evt) {
//     var activeElement = formElement.querySelector(".focused");
//     if (activeElement) {
//         activeElement.classList.remove("focused");
//     }
// });

//======================
// Solution 2.1 (через всплытие)

var formElement = document.forms["formElement"];

formElement.addEventListener("focusin", (evt) =>
    evt.target.classList.add("focused")
);

formElement.addEventListener("focusout", (evt) =>
    evt.target.classList.remove("focused")
);
