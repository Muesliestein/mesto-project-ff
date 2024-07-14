(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"80596f38-4157-4aaf-819e-3ca8cd6b9487","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},c=document.querySelector("#card").content;function a(e){var t=e.target.closest(".card"),r=t.dataset.id;n(r).then((function(){t.remove()})).catch((function(e){console.error("Ошибка при удалении карточки: ".concat(e))}))}function i(e){var t=e.target,n=t.closest(".card"),c=n.querySelector(".card__like_count"),a=n.dataset.id;t.classList.contains("card__like_active")?o(a).then((function(e){t.classList.remove("card__like_active"),c.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при снятии лайка: ".concat(e))})):r(a).then((function(e){t.classList.add("card__like_active"),c.textContent=e.likes.length})).catch((function(e){console.error("Ошибка при добавлении лайка: ".concat(e))}))}function u(e,t,n){var r=c.cloneNode(!0),o=r.querySelector(".card__image"),u=r.querySelector(".card__name"),l=r.querySelector(".card__like_count"),s=r.getElementById("card_delete"),d=r.querySelector(".card__like");return r.querySelector(".card").dataset.id=e._id,u.textContent=e.name,o.alt=e.name,o.src=e.link,l.textContent=e.likes.length,e.likes.some((function(e){return e._id===n}))&&d.classList.add("card__like_active"),e.owner._id===n?s.addEventListener("click",a):s.remove(),r.querySelector(".card__like").addEventListener("click",i),r.querySelector(".card__image").addEventListener("click",(function(){return t(e)})),r}function l(e){e.classList.add("popup_opened"),document.addEventListener("keydown",d),document.addEventListener("click",d)}function s(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",d),document.removeEventListener("click",d)}function d(e){("Escape"===e.key||e.target.classList.contains("popup_opened"))&&s(document.querySelector(".popup_opened"))}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"},m=function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},p=function(e,t,n){v(e)?(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0)):(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled"))},v=function(e){return e.some((function(e){return!e.validity.valid}))},_=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?m(e,t,n):function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=t.dataset.error||t.validationMessage,r.classList.add(n.errorClass)}(e,t,n)}(e,o,t),p(n,r,t)}))}))},h=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){m(e,n,t)})),p(n,r,t)};function y(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function S(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;y(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error("Ошибка: ".concat(e))})).finally((function(){y(!1,r,o)}))}function E(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var g,k=document.querySelector(".elements__list"),L=document.querySelector(".popup__image"),C=document.querySelector(".popup__description"),q=document.getElementById("popup-image"),A=document.getElementById("popup-profile"),x=document.getElementById("popup-card"),B=document.getElementById("popup-avatar"),I=document.forms.profile_form,U=document.forms.card_form,T=document.forms.avatar_form,j=document.querySelector(".profile__edit"),w=document.querySelector(".profile__button"),O=document.querySelector(".profile__avatar"),P=document.getElementById("title"),N=document.getElementById("description"),D=document.getElementById("name"),J=document.getElementById("link"),H=document.getElementById("avatar_link"),M=document.querySelector(".profile__title"),z=document.querySelector(".profile__subtitle"),$=document.querySelector(".profile__image");function F(e){l(q),C.textContent=e.name,L.src=e.link,L.alt=e.name}function G(e){k.append(e)}w.addEventListener("click",(function(){U.reset(),h(U,f),l(x)})),j.addEventListener("click",(function(){h(I,f),l(A),P.value=M.textContent,N.value=z.textContent})),O.addEventListener("click",(function(){T.reset(),h(T,f),l(B)})),U.addEventListener("submit",(function(n){S((function(){return(n=D.value,r=J.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then(t)).then((function(e){var t,n=u(e,F,g);t=n,k.prepend(t),s(x)}));var n,r}),n,"Создание...")})),I.addEventListener("submit",(function(n){S((function(){return(n=P.value,r=N.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then(t)).then((function(e){M.textContent=e.name,z.textContent=e.about,s(A)}));var n,r}),n)})),T.addEventListener("submit",(function(n){S((function(){return(n=H.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)).then((function(e){$.src=e.avatar,s(B)}));var n}),n)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t=E(e,2),n=t[0],r=t[1];M.textContent=n.name,z.textContent=n.about,$.src=n.avatar,g=n._id,r.forEach((function(e){G(u(e,F,g))}))})).catch((function(e){console.error("Ошибка: ".concat(e))})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return s(t)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){_(t,e)}))}(f)})();