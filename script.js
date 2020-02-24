
let font;
let clicked = true;
let prev;

let head;
let cam1;
  
let headArr=[];
  
  // p5 sketch
  function preload() {
    head = loadModel('assets/head.obj');
    font = loadFont('assets/Inconsolata-Regular.ttf');
    
    // api request
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(json => {console.log("here",json);
      
    // create array of People objects
      for (let x = 0; x < 10; x += 1) {
        for (let y = 0; y < 10; y += 1) {
    
          let p = new People(x,y,json[x]);
          headArr.push(p);  
        }
      }
  });
  }

  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    noStroke();
    textFont(font);
  
    cam1 = createCamera();
    //cam1.setPosition(-800, -100, 2000);
    cam1.setPosition(-(width/0.8), (width/9),(width/0.35));
    cam1.lookAt(-800, 0, 0);
    cam1.perspective();
}
  
  function draw() {
    background(40);
    lights();
    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;
    pointLight(255, 255, 255, locX, locY, locY);
  
    orbitControl();
    
    //iterate over People Array
    for (let p of headArr) {
      p.renderPerson();
      p.renderText();
    }
  
  
  }

  function displayinfo()
  {
    let r= int(Math.random()*100);
    headArr[r].click();
    let n = document.getElementById("sidebar");

    if (clicked) // the first time
    {
      console.log("one");
      let d = document.createElement("DIV"); 
      d.setAttribute("id", "Div1");
      let t = document.createTextNode(`Name: ${headArr[r].data.name} \nEmail: ${headArr[r].data.email}\nPhone Number: ${headArr[r].data.phone}`);
      d.appendChild(t);
      n.appendChild(d);
      clicked = false;
      prev =r;
  }
  else{
    headArr[prev].click(); // prevent multiple objects from becoming red
    let div = document.getElementById('Div1');
    console.log(n.innerText);
    div.innerText =`Name: ${headArr[r].data.name} \nEmail: ${headArr[r].data.email}\nPhone Number: ${headArr[r].data.phone}`;
    prev=r;
  
  }
}
  
  class People {
    constructor(x,y,data) {
      this.x =x;
      this.y =y;
      this.data =data;
      this.scale =(windowWidth / 150);
      this.color =220;
      this.clicked=false;
    }
  
    renderPerson() {
      if (this.clicked)
      {
      push();
      ambientMaterial("red");
      scale(this.scale);
      rotateX(170);
      rotateY(180);
      translate(40 * this.x, 0, 50 * this.y);
      model(head);
      pop();
      }
      
      else{
      push();
      ambientMaterial(220);
      scale(this.scale);
      rotateX(170);
      rotateY(180);
      translate(40 * this.x, 0, 50 * this.y);
      model(head);
      pop();
        
      }
    }
    
    renderText()
    {
    push();
    scale(this.scale);
    rotateX(170);
    rotateY(180);
    rotateZ(180);
    translate(-41.5 * this.x, this.scale, 51*this.y );
    fill(255);
    textSize(windowWidth / 150);
    text(this.data.name, 0, 0,0);
    pop();
    }
    
    click()
    {
        this.clicked = !this.clicked;
    }
    
    
    
  
  
  }
       