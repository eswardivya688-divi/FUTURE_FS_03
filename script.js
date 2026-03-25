let leads = JSON.parse(localStorage.getItem("leads")) || []

function displayLeads(list = leads){

let container=document.getElementById("leadContainer")
container.innerHTML=""

list.forEach((lead,index)=>{

let card=document.createElement("div")

card.className="leadCard"

card.innerHTML=`

<h3>${lead.name}</h3>

<p>${lead.email}</p>

<p>${lead.phone}</p>

<select onchange="updateStatus(${index}, this.value)">
<option ${lead.status==="New"?"selected":""}>New</option>
<option ${lead.status==="Contacted"?"selected":""}>Contacted</option>
<option ${lead.status==="Closed"?"selected":""}>Closed</option>
</select>

<button class="delete" onclick="deleteLead(${index})">Delete</button>

`

container.appendChild(card)

})

document.getElementById("totalLeads").innerText=leads.length
document.getElementById("activeLeads").innerText=leads.length

}

function addLead(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let phone=document.getElementById("phone").value

if(name=="" || email==""){
alert("Enter client details")
return
}

let lead={
name:name,
email:email,
phone:phone,
status:"New"
}

leads.push(lead)

localStorage.setItem("leads",JSON.stringify(leads))

document.getElementById("name").value=""
document.getElementById("email").value=""
document.getElementById("phone").value=""

displayLeads()

}

function deleteLead(index){

leads.splice(index,1)

localStorage.setItem("leads",JSON.stringify(leads))

displayLeads()

}

function updateStatus(index,status){

leads[index].status=status

localStorage.setItem("leads",JSON.stringify(leads))

}

function searchLeads(){

let keyword=document.getElementById("search").value.toLowerCase()

let filtered=leads.filter(l =>
l.name.toLowerCase().includes(keyword) ||
l.email.toLowerCase().includes(keyword)
)

displayLeads(filtered)

}

function exportCSV(){

let csv="Name,Email,Phone,Status\n"

leads.forEach(l=>{
csv+=`${l.name},${l.email},${l.phone},${l.status}\n`
})

let blob=new Blob([csv],{type:"text/csv"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)
a.download="leads.csv"

a.click()

}

displayLeads()