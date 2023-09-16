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
            const timeResult = toHoursAndMinutes(time)
             selectedAgent.outtime = `${timeResult.hours} hr : ${timeResult.minutes} min`
            
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
                  const expectedReturnTime = new Date()
                  expectedReturnTime.setHours(expectedReturnTime.getHours()+timeResult.hours)
                  expectedReturnTime.setMinutes(expectedReturnTime.getMinutes()+timeResult.minutes)
                  firstrowcells[7].innerHTML = expectedReturnTime.toLocaleTimeString()
                  let seconds = Math.abs((currentTime.getTime() - expectedReturnTime.getTime()));
                  setTimeout(() => { 
                    show()
                  },[seconds])
                  console.log(seconds)
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

  return { hours, minutes }
}

//`${hours} hr : ${minutes} min`

// toast

function show(){
  console.log('works')
  toast.create({
     title: 'Some titie',
     text: 'Some text'
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
    console.log('Isomorphic compatibility is not supported at this time for toast.')
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