let headerDate = document.querySelector('.todays-date')

window.onload = () =>{
    let today = new Date()
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

    headerDate.textContent = date
}