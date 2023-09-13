  let selectedAgent; 
  let allAgents = []; 

fetch("https://randomuser.me/api/?results=5&inc=picture,name,email").then(
  res => {
    res.json().then(
      data => {
        console.log(data.results);
        if (data && data.results && data.results.length) {
          let table =document.getElementById("tableReception");
          
          
          $(function(){
            $("#mymodal, #modal-background, #modal-close").click(function() {
              if (selectedAgent) {
                $("#modal-content, #modal-background").toggleClass("active");
                  document.getElementById('modal-title').innerHTML = `Enter the out time for ${selectedAgent.name} in Minutes`
               } 
            });
        });
      
        $(function(){
          $("#modal-submit").click(function() {
            const time = document.getElementById('time-input').value
            console.log(toHoursAndMinutes(time))
             selectedAgent.outtime = toHoursAndMinutes(time)
            
             const rows = table.getElementsByTagName('tr');
             for (const row of rows) {
               const firstrowcells = row.getElementsByTagName('td') 
              if (firstrowcells.length > 0 ) {
               
                
               
                const firstrowname = firstrowcells[1].innerHTML
                if (firstrowname === selectedAgent.name ){
                  firstrowcells[4].innerHTML = "Out"
                  const currentTime = new Date()
                  firstrowcells[5].innerHTML = currentTime.toLocaleTimeString();
                  firstrowcells[6].innerHTML = selectedAgent.outtime
                  
                }
              
              
              }
              }

              $("#modal-content, #modal-background").toggleClass("active");
            });
      });


      

          data.results.forEach((itemData,index) => {
            const agent = new Agent (itemData.name.first, itemData.name.last, itemData.email, itemData.picture.large, "in", null, null, null) 
            allAgents.push(agent)
          
          console.log(table)
          let row = table.insertRow(index+1); 
          row.classList.add("table-row"); // connect the cells in every row
          row.classList.add(`agent${index}`)

          

          const rows = table.getElementsByTagName('tr');
          console.log(rows); // 👉️ NodeList(3) [tr, tr, tr]
          
          for (const row of rows) {
            row.addEventListener('click', () => {
              row.classList.add("table-rowselected")
              console.log(allAgents)
              
              const firstrowcells = row.getElementsByTagName('td') 
              const firstrowname = firstrowcells[1].innerHTML
              selectedAgent = allAgents.find((agent) => agent.name === firstrowname)
              console.log(selectedAgent)
              for (const secondrow of rows) { 
                
              const secondrowcells = secondrow.getElementsByTagName('td') 
                if (secondrowcells.length > 0 ) {
              const secondrowname = secondrowcells[1].innerHTML
                
                if (firstrowname.toLowerCase() !== secondrowname.toLowerCase())
                
                 { 
                //  row.classList.remove("table-rowselected")
              }
            }}

            
             
            });
          }
            
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4)
          let cell6 = row.insertCell(5)
          let cell7 = row.insertCell(6)
          let cell8 = row.insertCell(7)

         


          cell2.innerHTML = agent.name
          cell3.innerHTML = agent.SurName
          cell4.innerHTML = agent.email
          cell1.innerHTML = `<img src=${agent.picture}/>`
          cell5.innerHTML = agent.status 
          
    

        }) 
      }
    }) 
  }
)

// class object

class Agent {
  constructor(name, SurName, email, picture, status, outtime, duration, expectedRt) {
    this.name = name;
    this.SurName = SurName;
    this.email = email;
    this.picture = picture; 
    this.status = status;
    this.outtime = outtime;
    this.duration = duration;
    this.expectedRt = expectedRt;
  }
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hr : ${minutes} min`
}