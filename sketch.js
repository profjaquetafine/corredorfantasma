var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDeEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  somAssustador.loop();
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 1;
  
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
  
  fantasma = createSprite(200,200,50,50);
  fantasma.scale = 0.3;
  fantasma.addImage("ghost", imagemDoFantasma);
}

function draw(){
  background(0);
  if (estadoJogo === "JOGAR") {
    if(keyDown("left_arrow")){
      fantasma.x = fantasma.x - 3;
    }
    
    if(keyDown("right_arrow")){
      fantasma.x = fantasma.x + 3;
    }
    
    if(keyDown("space")){
      fantasma.velocityY = -10;
    }
    
    fantasma.velocityY = fantasma.velocityY + 0.8
    
    if(torre.y > 400){
      torre.y = 300
    }
    gerarPortas();

    
    //grupoDeEscaladores.collide(fantasma);
    if(grupoDeEscaladores.isTouching(fantasma)){
      fantasma.velocityY = 0;
    }
    if(grupoDeBlocoInvisivel.isTouching(fantasma) || fantasma.y > 600){
      fantasma.destroy();
      estadoJogo = "ENCERRAR"
    }
    
    drawSprites();
  }
  
  if (estadoJogo === "ENCERRAR"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function gerarPortas() {
  //escreva o código aqui para gerar portas na torre
  if (frameCount % 240 === 0) {
    var porta = createSprite(200, -50);
    var escalador = createSprite(200,10);
    var blocoInvisivel = createSprite(200,15);
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    
    porta.x = Math.round(random(120,400));
    escalador.x = porta.x;
    blocoInvisivel.x = porta.x;
    
    porta.addImage(imagemDaPorta);
    escalador.addImage(imagemDeEscalador);
    
    porta.velocityY = 1;
    escalador.velocityY = 1;
    blocoInvisivel.velocityY = 1;
    
    fantasma.depth = porta.depth;
    fantasma.depth +=1;
   
    //atribuir tempo de vida à variável
    porta.lifetime = 800;
    escalador.lifetime = 800;
    blocoInvisivel.lifetime = 800;

    
    //adicione cada porta ao grupo
    grupoDePortas.add(porta);
    blocoInvisivel.debug = true;
    grupoDeEscaladores.add(escalador);
    grupoDeBlocoInvisivel.add(blocoInvisivel);
  }
}
