 
const whetherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

whetherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    
    const location = search.value
   
 msg1.textContent = 'Loading.....'   
 msg2.textContent=''   
fetch('/weather?adress=' + location).then((response)=>{

    response.json().then((data)=>{
        
        if(data.error){
           // console.log(data.error)
           msg1.textContent = data.error 
        }
        else{
        msg1.textContent = data.location 
        msg2.textContent = data.forcast
        //console.log(data)
        }
    })
})

    



})






