  let selectedAgent; 
  let allAgents = [];
  let timeoutid = {

  }   
  
        
  function hasNumber(myString) {
    return /\d/.test(myString);
  }
  $(document).ready(function() {
    digitalClock()
    const inButton = document.querySelector("#inButton")
    inButton.addEventListener("click",() => { 
    staffIn() 
    })
    const clearbutton = document.querySelector('#buttonClear')
      clearbutton.addEventListener("click",() => {
        var table = document.getElementById('delivery-driver-table');
        var rowCount = table.rows.length;
        for (var i = 1; i < rowCount; i++) {
            table.deleteRow(i);
        }
    })

    const addbutton = document.querySelector("#mymodal2")
      addbutton.addEventListener("click", () => {
        const vehicle = document.querySelector("#vehicle")
        const name = document.querySelector("#name")
        const surname = document.querySelector("#surname")
        const telephone = document.querySelector("#telephone")
        const address  = document.querySelector("#address")
        const returntime = document.querySelector("#returntime")
        if (vehicle.value === "" || name.value === "" || surname.value === "" || telephone.value === "" || address.value === "" || returntime.value === "") {
          const missingfields = [] 
          if (vehicle.value === "") missingfields.push("vehicle")
          if (name.value === "") missingfields.push("name")
          if (surname.value === "") missingfields.push("surname")
          if (telephone.value === "") missingfields.push("telephone")
          if (address.value === "") missingfields.push("address")
          if (returntime.value === "") missingfields.push("returntime")
          
          
        validateDelivery(telephone, name, surname, missingfields)
     

        
      } else {
        const deliverydriver = new Deliverydriver (name.value, surname.value, vehicle.value, telephone.value, address.value,  returntime.value)
        
       
        addDelivery(deliverydriver)

        const expecteddate = new Date(new Date().toDateString() + ' ' + deliverydriver.returntime)
        let seconds = Math.abs((new Date().getTime() - expecteddate.getTime()));
      resetdeliveryform()
      
      deliveryDriverIsLate(deliverydriver, seconds)
      } 



  })   
      const submitbutton2 = document.querySelector("#modal-submit2")
        submitbutton2.addEventListener("click",() => { 
          $("#modal-content2, #modal-background2").toggleClass("active"); 
        })
  });

function resetdeliveryform () {
    document.querySelector("#name").value = ""
    document.querySelector("#surname").value = ""
    document.querySelector("#telephone").value = ""
    document.querySelector("#address").value = ""
    // document.querySelector("#returntime").value 
}

function staffMemberIsLate (selectedAgent, seconds) {
  let currenttimeoutid =setTimeout(() => { 
    show("Staff delay alert!", selectedAgent.outtime, selectedAgent.picture, selectedAgent.name)
  },[seconds])
  timeoutid[selectedAgent.name] = currenttimeoutid
}

function staffIn ()  {
  console.log(timeoutid)
  clearTimeout (timeoutid[selectedAgent.name])
  clearstaffIn()
}


function clearstaffIn () {
  let table =document.getElementById("tableReception")
  const rows = table.getElementsByTagName('tr');
  for (const row of rows) {  
  const firstrowcells = row.getElementsByTagName('td') 
  if (firstrowcells.length > 1 ) {
  const firstrowname = firstrowcells[1].innerHTML
  if (firstrowname === selectedAgent.name) {
    firstrowcells[4].innerHTML = "in",
    firstrowcells[5].innerHTML = "",
    firstrowcells[6].innerHTML = "",
    firstrowcells[7].innerHTML = ""
  }}
  } 
}

function validateDelivery (telephone, name, surname, missingfields) {

  if(telephone.value.length < 7 || hasNumber(name.value) || hasNumber(surname.value)) {
    if (telephone.value.length < 7) { 

const telephonewarning = document.querySelector("#telephone-warning")
telephonewarning.innerHTML = "Telephone should have atleast 7 digits & only digits!"
const telephonewarning2 = document.querySelector("#telephone-warning2")
telephonewarning2.innerHTML = "Telephone should have atleast 7 digits & only digits!"
document.querySelector("#modal-title2").innerHTML = "not a valid number"
} 
if  (hasNumber (name.value)) {
document.querySelector("#telephone-warning").innerHTML = "Name Shouldnt contain digits.."
document.querySelector("#modal-title2").innerHTML = "Not a valid name"
document.querySelector("#name-warning").innerHTML = "Name Shouldnt contain digits.."
}
if  (hasNumber (surname.value)) {
document.querySelector("#telephone-warning").innerHTML = "Surname shouldnt contain digits.."
document.querySelector("#modal-title2").innerHTML = "Not a valid surname"
document.querySelector("#surname-warning").innerHTML = "Surname shouldnt contain digits.."
} 
} else standarderrormodal (missingfields)


}

function deliveryDriverIsLate (deliverydriver, seconds) {
   setTimeout(() => { 
    show("Deliver driver delay alert!", deliverydriver.returntime, null , deliverydriver.name, deliverydriver.address, deliverydriver.telephone)
   },[seconds])  
}


function standarderrormodal (missingfields) 
  { document.querySelector("#modal-title2").innerHTML = "Oops.."
  const missingfieldstext = document.getElementById("missing-fields")
  missingfieldstext.innerHTML = `${missingfields.join(", ")} field required.`
  document.querySelector("#telephone-warning").innerHTML = ""
  document.querySelector("#telephone-warning2").innerHTML = "" 
  document.querySelector("#surname-warning").innerHTML = ""
  document.querySelector("#name-warning").innerHTML = ""


  $("#modal-content2, #modal-background2").toggleClass("active"); 

}

function addDelivery (deliverydriver) {
  const deliverytable = document.querySelector("#delivery-driver-table")
  const rows = deliverytable.getElementsByTagName('tr');
  let row = deliverytable.insertRow(rows.length); 

  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4)
  let cell6 = row.insertCell(5)

  cell1.innerHTML = deliverydriver.vehicle
  cell2.innerHTML = deliverydriver.name
  cell3.innerHTML = deliverydriver.SurName
  cell4.innerHTML = deliverydriver.telephone
  cell5.innerHTML = deliverydriver.address
  cell6.innerHTML = deliverydriver.returntime
}

function staffOut (firstrowcells, timeResult) {

  firstrowcells[4].innerHTML = "Out"
  const currentTime = new Date()
  firstrowcells[5].innerHTML = currentTime.toLocaleTimeString();
  firstrowcells[6].innerHTML = selectedAgent.outtime
  const expectedReturnTime = new Date()
  expectedReturnTime.setHours(expectedReturnTime.getHours()+timeResult.hours)
  expectedReturnTime.setMinutes(expectedReturnTime.getMinutes()+timeResult.minutes)
  firstrowcells[7].innerHTML = expectedReturnTime.toLocaleTimeString()
  let seconds = Math.abs((currentTime.getTime() - expectedReturnTime.getTime()));
  staffMemberIsLate (selectedAgent, seconds) 

} 

staffUserGet()

function staffUserGet () {
  fetch("https://randomuser.me/api/?results=5&inc=picture,name,email").then(
    res => {
      res.json().then(
        data => {
          
          if (data && data.results && data.results.length) {
            let table =document.getElementById("tableReception");
   
            
            $(function(){
              $("#mymodal, #modal-background").click(function() {
                if (selectedAgent) {
                  $("#modal-content, #modal-background").toggleClass("active");
                    document.getElementById('modal-title').innerHTML = `Enter the out time for ${selectedAgent.name} in Minutes`
                 } 
              });
          });
        
          $(function(){
            $("#modal-submit").click(function() {
              const time = document.getElementById('time-input').value
             
              const timeResult = toHoursAndMinutes(time)
               selectedAgent.outtime = `${timeResult.hours} hr : ${timeResult.minutes} min`
              
               const rows = table.getElementsByTagName('tr');
               for (const row of rows) {
                 const firstrowcells = row.getElementsByTagName('td') 
                if (firstrowcells.length > 0 ) {
                 
                  
                 
                  const firstrowname = firstrowcells[1].innerHTML
                  if (firstrowname === selectedAgent.name ){
              
                   staffOut (firstrowcells, timeResult)
                    
                  }
                
  
                
                }
                }
  
                $("#modal-content, #modal-background").toggleClass("active");
              });
        });
  
  
        
  
            data.results.forEach((itemData,index) => {
              const agent = new Staffmember (itemData.name.first, itemData.name.last, itemData.email, itemData.picture.large, "in", null, null, null) 
              allAgents.push(agent)
            
            
            let row = table.insertRow(index+1); 
            row.classList.add("table-row"); // connect the cells in every row
            row.classList.add(`agent${index}`)
  
            
  
            const rows = table.getElementsByTagName('tr');
             // 👉️ NodeList(3) [tr, tr, tr]
            
            for (const row of rows) {
              row.addEventListener('click', () => {
                row.classList.add("table-rowselected")
                
                
                const firstrowcells = row.getElementsByTagName('td') 
                const firstrowname = firstrowcells[1].innerHTML
                selectedAgent = allAgents.find((agent) => agent.name === firstrowname)
            
                for (const secondrow of rows) { 
                  
                const secondrowcells = secondrow.getElementsByTagName('td') 
                  if (secondrowcells.length > 0 ) {
                const secondrowname = secondrowcells[1].innerHTML
                  
                  if (firstrowname.toLowerCase() !== secondrowname.toLowerCase()) { 
                 
                   
                    secondrow.classList.remove("table-rowselected")
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
            cell1.innerHTML = `<img src=${agent.picture} style="width:40px">`
            cell5.innerHTML = agent.status 
            
      
  
          }) 
        }
      }) 
    }
  )

}


// class object
  class Employee {
  constructor(name, SurName)  {
  this.name = name;
  this.SurName = SurName; 
}}



  class Staffmember extends Employee {
  constructor(name, SurName, email, picture, status, outtime, duration, expectedRt) {
    super(name, SurName)
    this.email = email;
    this.picture = picture; 
    this.status = status;
    this.outtime = outtime;
    this.duration = duration;
    this.expectedRt = expectedRt;
  }
}
class Deliverydriver extends Employee {
  constructor (name, SurName, vehicle, telephone, address, returntime) {
  super(name, SurName)
  this.vehicle = vehicle;
  this.telephone = telephone;
  this.address = address; 
  this.returntime = returntime; 
  }}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes }
}

//`${hours} hr : ${minutes} min`

// toast

function show(title, outtime, icon, name, address, telephone){
  
  toast.create({
     title: title,
     text: `Time out-of-office:${outtime}`,
     name: `${name} Is delayed`,
     icon: icon,
     address: address,  
     telephone: telephone,
     
  });
};

(function(root, factory) {
  try {
    // commonjs
    if (typeof exports === 'object') {
      module.exports = factory();
    // global
    } else {
      root.toast = factory();
    }
  } catch(error) {
    
  }
})(this, function() {

  // We need DOM to be ready
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }

  // Create toast object
  toast = {
    // In case toast creation is attempted before dom has finished loading!
    create: function() {
      console.error([
        'DOM has not finished loading.',
        '\tInvoke create method when DOM\s readyState is complete'
      ].join('\n'))
    }
  };
  var autoincrement = 0;

  // Initialize library
  function init() {
    // Toast container
    var container = document.createElement('div');
    container.id = 'cooltoast-container';
    document.body.appendChild(container);

    // @Override
    // Replace create method when DOM has finished loading
    toast.create = function(options) {
      var toast = document.createElement('div');
      toast.id = ++autoincrement;
      toast.id = 'toast-' + toast.id;
      toast.className = 'cooltoast-toast';

      // title
      if (options.title) {
        var h4 = document.createElement('h4');
        h4.className = 'cooltoast-title';
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // text
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'cooltoast-text';
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

            // text
            if (options.name) {
              var p = document.createElement('p');
              p.className = 'cooltoast-name';
              p.innerHTML = options.name;
              toast.appendChild(p);
            }

            // text
            if (options.address) {
              var p = document.createElement('p');
              p.className = 'cooltoast-text';
              p.innerHTML = `Address: ${options.address}`
              toast.appendChild(p);
            }

            if (options.telephone) {
              var p = document.createElement('p');
              p.className = 'cooltoast-text';
              p.innerHTML = `Telephone:  ${options.telephone}`
              toast.appendChild(p);
            }


      // icon
      if (options.icon) {
        var img = document.createElement('img');
        img.src = options.icon;
        img.className = 'cooltoast-icon';
        toast.appendChild(img);

      }

      // click callback
      if (typeof options.callback === 'function') {
        toast.addEventListener('click', options.callback);
      }

      // toast api
      toast.hide = function() {
        toast.className += ' cooltoast-fadeOut';
        toast.addEventListener('animationend', removeToast, false);
      };

      // autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      } 
      // else setTimeout(toast.hide, 2000);

      if (options.type) {
        toast.className += ' cooltoast-' + options.type;
      }

      toast.addEventListener('click', toast.hide);


      function removeToast() {
        document.getElementById('cooltoast-container').removeChild(toast);
      }

      document.getElementById('cooltoast-container').appendChild(toast);
      return toast;

    }
  }

  return toast;

});

function digitalClock() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML = `${today.toDateString()}` + " " + h + ":" + m + ":" + s;
  setTimeout(digitalClock, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}