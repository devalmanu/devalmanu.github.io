(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",function(){const m=document.getElementById("fileInput"),i=document.getElementById("previewContainer");if(i){let l=function(){i.innerHTML="",r.forEach((a,s)=>{const c=new FileReader;c.onload=function(f){const n=document.createElement("div");n.className="preview-item",n.draggable=!0,n.innerHTML=`
                    <img src="${f.target.result}" alt="Preview" style="transform: rotate(${a.rotation}deg)">
                    <button class="remove-btn preview-item__remove" data-index="${s}">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.75 0.75L0.75 8.75M0.75 0.75L8.75 8.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="rotate-btn preview-item__rotate" data-index="${s}">
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4167 5.41667C13.4167 5.41667 12.08 3.59548 10.9941 2.50883C9.90821 1.42218 8.4076 0.75 6.75 0.75C3.43629 0.75 0.75 3.43629 0.75 6.75C0.75 10.0637 3.43629 12.75 6.75 12.75C9.4854 12.75 11.7933 10.9195 12.5155 8.41667M13.4167 5.41667V1.41667M13.4167 5.41667H9.41667" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="preview-item__main" data-index="${s}">
                        Главная
                    </button>
                    <div class="drag-handle"></div>
                `,n.addEventListener("dragstart",o=>{o.dataTransfer.setData("text/plain",s),n.classList.add("dragging")}),n.addEventListener("dragend",()=>{n.classList.remove("dragging")}),n.addEventListener("dragover",o=>{o.preventDefault()}),n.addEventListener("drop",o=>{o.preventDefault();const p=parseInt(o.dataTransfer.getData("text/plain"));d(p,s)}),n.querySelector(".remove-btn").addEventListener("click",function(){const o=parseInt(this.getAttribute("data-index"));u(o)}),n.querySelector(".rotate-btn").addEventListener("click",function(){const o=parseInt(this.getAttribute("data-index"));e(o)}),i.appendChild(n)},c.readAsDataURL(a.file)}),r.length>0?document.querySelector(".block-adaptive-upload").classList.add("add-file"):document.querySelector(".block-adaptive-upload").classList.remove("add-file")};var t=l;let r=[];m.addEventListener("change",function(a){const c=Array.from(a.target.files).map(f=>({file:f,rotation:0}));r=[...r,...c],l()})}function u(r){filesArray.splice(r,1),t()}function d(r,l){const[a]=filesArray.splice(r,1);filesArray.splice(l,0,a),t()}function e(r){filesArray[r].rotation=(filesArray[r].rotation+90)%360,t()}});
//# sourceMappingURL=main-DvuoewxS.js.map
