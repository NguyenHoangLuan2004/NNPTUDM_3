let products=[];
let page=1;
let limit=5;
let sortGia=true;
let sortTen=true;

// GET ALL
fetch("https://api.escuelajs.co/api/v1/products")
.then(r=>r.json())
.then(d=>{
products=d;
taoTrang();
hienThi();
});

// hiển thị
function hienThi(){

let start=(page-1)*limit;
let end=start+limit;

let show=products.slice(start,end);

let html="";

show.forEach(p=>{

let img="";

if(p.images && p.images.length>0){
img=p.images[0];
}

html+=`
<tr>
<td>${p.id}</td>
<td>${p.title}</td>
<td>${p.price}</td>
<td><img src="${img}"></td>
</tr>
`;
});

document.getElementById("data").innerHTML=html;
}

// tìm kiếm onchange
function timKiem(){

let key=document.getElementById("search").value.toLowerCase();

fetch("https://api.escuelajs.co/api/v1/products")
.then(r=>r.json())
.then(d=>{
products=d.filter(p=>p.title.toLowerCase().includes(key));
page=1;
taoTrang();
hienThi();
});
}

// đổi số dòng
function doiSoDong(v){
limit=Number(v);
page=1;
taoTrang();
hienThi();
}

// phân trang
function taoTrang(){

let total=Math.ceil(products.length/limit);
let html="";

for(let i=1;i<=total;i++){
html+=`<button onclick="doiTrang(${i})">${i}</button>`;
}

document.getElementById("pages").innerHTML=html;
}

function doiTrang(i){
page=i;
hienThi();
}

// sort giá
function sapXepGia(){
products.sort((a,b)=>sortGia?a.price-b.price:b.price-a.price);
sortGia=!sortGia;
hienThi();
}

// sort tên
function sapXepTen(){
products.sort((a,b)=>sortTen?a.title.localeCompare(b.title):b.title.localeCompare(a.title));
sortTen=!sortTen;
hienThi();
}
