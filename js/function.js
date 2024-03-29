// Created by Pedro H.J


// ***********************
// Created by Pedro H.J
// Framework: P5
// 02/02/19 23:55
// Version: 1.0
//
// 0.01 First version
// 0.02 Updated Jump (suggestion by @Rowsej Thanks)
// 0.03 Added Outline (suggestion by @Kevin Paul)
// 0.04 Logo cube animation
// 1.00 Added joystick (suggestion by @EnCoDeR). Joystick created by @Burey
// 
// ***********************

var jumping = false;
var jumpAmount = 0;
var jumpI = 0;

// disable console
console.log=()=>{};
console.error=()=>{};
console.warn=()=>{};

// Position & Rotation
var aX,aY,aZ,rotY,jump;
// Objects
var chao,ground,asfalto,door1,door2,house1,house2,cubologo,b1,b2,b3;
var placa1,placa2,outdoor,river;
var tree,base_tree,tree2,base_tree2;
var wSololearn,bSololearn,backSololearn;

// textures
var gras,logo,metal,door,asfalto,mato,thunder,qa,water,welcome;

// animation
var posz=0;

var joystick;

function preload(){

        // Image
  grass= loadImage("https://dl.dropboxusercontent.com/s/d9bu91rgarbn5nb/grass.jpg?dl=0");
  logo= loadImage("https://dl.dropboxusercontent.com/s/u9f98q2ncm6v76l/logo.jpg?dl=0");
  metal= loadImage("https://dl.dropboxusercontent.com/s/fb9ll2s57u042k8/metal.jpg?dl=0");
  wood=loadImage("https://dl.dropboxusercontent.com/s/kh6s7o2s2ytkww4/wood.jpg?dl=0");
  door=loadImage("https://dl.dropboxusercontent.com/s/k5pymraewv43sgo/porta.jpg?dl=0");
  html=loadImage("https://dl.dropboxusercontent.com/s/ikkd5m1o86k378v/html.png?dl=0");
  asfalto=loadImage("https://dl.dropboxusercontent.com/s/0ywi6sjat64mx1v/asfalto.jpg?dl=0");
  mato=loadImage("https://dl.dropboxusercontent.com/s/bfkdljll3fo491f/mato.jpg?dl=0");
  thunder=loadImage("https://dl.dropboxusercontent.com/s/xv8yabrml1o6feu/thunder.jpg?dl=0");
  qa=loadImage("https://dl.dropboxusercontent.com/s/iiux4j3npt153dk/QA.png?dl=0");
  water=loadImage("https://dl.dropboxusercontent.com/s/d7x9vq186d7ev1f/water.jpg?dl=0");
  welcome=loadImage("https://dl.dropboxusercontent.com/s/4e5lnx7j17b73yn/welcome.jpg?dl=0");

}
function setup() {

  
  aX=0;aY=0;aZ=0;rotY=0;



  
createCanvas(windowWidth,windowHeight,WEBGL).position(0,0);  
createP("Sololearn City").position(0,0).id("fonte1"); 

button1=createButton("Rot.+").id("botao2").mouseClicked(rotC).position(width/4+20,height-35);
button2=createButton("Rot.-").id("botao2").mouseClicked(rotAC).position(width/4-50,height-35);

button3=createButton("Jump").id("botao2").mouseClicked(jump).position(width/4+80,height-35);

  sel = createSelect().id("fonte1");
sel.position(width/1.6, 20);
sel.option('Afternoon');
sel.option('Morning');
sel.option('Night');
  
  len=10;
  aX=0;
  aY=0;
  rotY=0;
  rigth=0;

ground= new CustomBox(0,0,0,50*len,len,50*len,grass);
chao= new CustomBox(0,-len/2,0,6*len,0.1*len,50*len,asfalto);
river= new CustomBox(-20*len,-len/2,0,6*len,0.1*len,50*len,water);

  
base_tree=new CustomBox(-6*len,-1*len,10*len,len,8*len,len,wood);
tree= new CustomBox(-6*len,-6*len,10*len,3*len,3*len,3*len,mato);
 
base_tree2=new CustomBox(6*len,-1*len,-13*len,len,8*len,len,wood);
tree2= new CustomBox(6*len,-6*len,-13*len,3*len,3*len,3*len,mato);

bSololearn=new CustomBox(6*len,-1*len,10*len,len/2,4*len/2,len/2,asfalto);
wSololearn= new CustomBox(6*len,-3*len,10*len,3*len,2*len,len/10,welcome);
backSololearn= new CustomBox(6*len,-3*len,9.9*len,3*len,2*len,len/10,asfalto);

  
house1= new CustomBox(10*len,-2*len,len,6*len,6*len,8*len,metal);
door1= new CustomBox(7*len  ,-2*len  ,1*len,0.01*len,3*len,2*len,door);

house2= new CustomBox(-10*len,-2*len,len,6*len,6*len,8*len,metal);
door2= new CustomBox(-7*len  ,-2*len  ,1*len,0.01*len,3*len,2*len,wood);

cubologo= new CustomBox(4*len,-len,-10*len,len,len,len,logo);
  
//house2= new CustomBox(20*len,-2*len,len,6*len,6*len,8*len,metal);
//door2= new CustomBox(17*len  ,-2*len  ,1*len,0.2*len,3*len,2*len,door);
outdoor =new CustomBox(15*len,-2*len,-20*len,-2*len,2*len,2*len,qa);
  
  
  placa2= new CustomBox(7*len,-3*len,3.5*len,0.01*len,len,1.7*len,html);
  placa1= new CustomBox(-7*len,-3*len,3.5*len,0.01*len,len,1.7*len,thunder);


  
joystick = new Joystick();


 
}

function draw() {
  
   if(sel.value()=="Morning"){ 
  background("#33ccff");//#E5C2D5 //#33ccff
   }
if(sel.value()=="Afternoon"){ 
  background("#E5C2D5");//#E5C2D5 //#33ccff
   }
  if(sel.value()=="Night"){ 
  background("grey");//#E5C2D5 //#33ccff
   }
    
 // orbitControl();
  
  
   var dx = this.joystick.deltaX() * 0.05;
   var dy = this.joystick.deltaY() * 0.05;
   var direction = this.joystick.direction();
   
   aX-=dx;
   aY-=dy;
  
  // Rotate and translate 
  rotateX(-0.1);
  translate(aX,aZ,aY);
  rotateY(rotY);

  // Show all objects 
  ground.show();
  chao.show();
  river.show();
  
  house1.show();
  door1.show();
  
  house2.show();
  door2.show();
  placa1.show();
  placa2.show();
  cubologo.show();
  
  base_tree.show();
  tree.show();
  
  base_tree2.show();
  tree2.show();

  wSololearn.show();
  bSololearn.show();
  backSololearn.show();
    
  outdoor.show();

 // Cube logo animation
  posz+=0.05;
  cubologo.y=-2*len+Math.sin(posz)*10;

    if(jumping) { 
      aZ+=jumpAmount; 
    }
      else{
    aZ-=1;
      if(aZ<=0)aZ=0;
    }
    }


function CustomBox(x,y,z,w,h,a,c){

  this.x=x;
  this.y=y;
  this.z=z;
  this.w=w;
  this.h=h;
  this.a=a;
  this.c=c;
  
  this.show = function (){  
  push();
    rotateY(rotY);
  translate(this.x,this.y,this.z);
  texture(this.c);
  box(this.w,this.h,this.a);
  pop();
  }
}

// Buttons functions LEFT,RIGTH,FRONT,BACK,ROT
function rotC(){
 rotY-=PI/20; 
}
function rotAC(){
 rotY+=PI/20; 
 
}
function jump(){
if(!jumping) {
    jumping = true;
    jumpAmount = 3;
    jumpI = setInterval(function() {
        jumpAmount -= 0.3;
        if(jumpAmount < -3) {
            clearInterval(jumpI);
            jumping = false;
        }
    }, 50);
}
}
