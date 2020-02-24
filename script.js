let results;

console.log("here");
$.ajax({
    url: 'https://randomuser.me/api/?results=10',
    dataType: 'json',
    success: function(data) {
      results = data.results;
      console.log(results);
    }
  });

  let head;
  let cam1;
  
  let headArr=[];
  
  // p5 sketch
  function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    noStroke();
  
    cam1 = createCamera();
    //cam1.setPosition(-800, -100, 2000);
    cam1.setPosition(-(width/0.8), (width/9),(width/0.35));
    cam1.lookAt(-800, 0, 0);
    cam1.perspective();
    
    // create array of People objects
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
  
        let p = new People(x,y,results[0]);
        headArr.push(p);
      }
    }
    
  }
  
  function preload() {
    head = loadModel('assets/head.obj');
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
      p.renderButton();
      p.click();
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
    
    renderButton()
    {
      push()
      ambientMaterial(220);
      scale(this.scale);
      rotateX(170);
      rotateY(180);
      translate(40 * this.x, this.scale, 50*this.y );
      box(10);
      pop();
    }
    
  //   click()
  //   {
  //     if (mouseIsPressed)
  //     {
  //     if (((mouseX>=this.x*40 +10)&&(mouseX<=this.x*40 -10)) && ((mouseY>=this.x*50 +10)&&(mouseY<=this.x*50 -10)))
  //     {
  //       console.log("clicked");
  //       this.clicked = !this.clicked;
  //     }
  //     }
      
  //   }
    
    
    
  
  
  }
       