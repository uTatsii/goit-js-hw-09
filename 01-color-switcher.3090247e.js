!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),d=null;function o(){t.disabled=!t.disabled,e.disabled=!e.disabled}t.disabled=!1,e.disabled=!0,t.addEventListener("click",(function(){o(),d=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){o(),clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.3090247e.js.map