window.addEventListener('load', () => {
  let salvarPaleta = ['rgb(0,0,0)']; // Nessa constante eu vou adicionar o resto das cores que faltam para completar as quatro cores.
  const coresSalvas = JSON.parse(localStorage.getItem('colorPalette'));
  const corBranca = 'rgb(255, 255, 255)';
  const divCor = document.querySelectorAll('.color'); // DIV IMPORTANTE PARA PEGAR OS ELEMENTOS NO HTML. ESSES SÃO OS BOTÕES DAS CORES.
  const sortear = document.querySelector('#button-random-color'); // Pega o elemento 'botão' de Sortear lá no HTML;
  // const quadroDePixels = document.querySelector('#pixel-board'); // Pegar no DOM o elemento com a classe indicada no '()'.
  let quantidadeDePixels = 25;
  const limpar = document.querySelector('#clear-board');
  let corSelecionada = 'black';
  let salvarQuadro = []; // Aqui vai salvar todos as cores de cada PIXEL

  // functions ---------------------------------------------------------
  // Aqui vou criar uma função para gerar cores aleatórias e posteriormente usar em uma das funções criadas. 
  const gerCorAleatoria = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return (`rgb(${red}, ${green}, ${blue})`)
  }

  // Aqui eu quero criar um loop para adicionar as cores dos elementos que eu salvei no localStorage e aplicar a cada um dos itens caso haja alguma cor salva. 
  if(coresSalvas) {
    for(let i = 0; i <coresSalvas.length; i += 1) {
      divCor[i].style.backgroundColor = coresSalvas[i];
    }
  } else {
    // Com as cores geradas. Agora vou pegar as divs das cores que têm a classe '.color' para adicionar a cada uma, uma das cores assim que recarregar a página, menos a cor branca. E o primeiro elemento com a cor Preta.
    for (let index = 1; index < divCor.length; index += 1) {
      let corGerada = gerCorAleatoria() != corBranca ? gerCorAleatoria(): gerCorAleatoria();
      divCor[index].style.backgroundColor = corGerada;
      divCor[0].style.backgroundColor = 'rgb(0,0,0)';
      salvarPaleta.push(corGerada)
    }
    localStorage.setItem('colorPalette', JSON.stringify(salvarPaleta))
  }

  // As cores foram geradas automaticamente ou restauradas, então eu vou atribuir ao botão sortear, as cores em formato aleatório. E adicionando à primeira div a cor preta.
  sortear.addEventListener('click', () => {
    salvarPaleta = ['rgb(0,0,0)']
    for (let index = 1; index < divCor.length; index += 1) {
      let corGerada = gerCorAleatoria() != corBranca ? gerCorAleatoria(): gerCorAleatoria();
      divCor[index].style.backgroundColor = corGerada;
      divCor[0].style.backgroundColor = 'rgb(0,0,0)';
      salvarPaleta.push(corGerada);
    }
    localStorage.setItem('colorPalette', JSON.stringify(salvarPaleta))
  });

  // Aqui vou criar uma função que adicione pixels dentro do elemento boxTable
  const criacaoDeTabelaDePixels = () => {
    const quadroDePixels = document.querySelector('#pixel-board')
    for (let i = 1; i <= quantidadeDePixels; i += 1){
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.style.backgroundColor = 'white'
      quadroDePixels.appendChild(pixel);
    }
  };
  criacaoDeTabelaDePixels()

  // Essa função faz com que limpe tudo do quadro e deixe-o branco
  limpar.addEventListener('click', () => {
    divsBrancas.forEach((pixel, index) => {
        pixel.style.backgroundColor = 'white';
        salvarQuadro[index] = 'white';
        localStorage.setItem('pixelBoard', JSON.stringify(salvarQuadro));
    })
  })

  // Adicionei um escutador de evento para cada vez que eu tocar nas cores ele selecionar a cor em formato RGB. Também adicionar um zoom à cor; e guardar a cor dentro de uma variável.
  for (let index of divCor) {
    divCor[0].classList.add('selected')
    index.addEventListener('click', () => {
      for (let index of divCor){
        index.classList.remove('selected')
        index.style.width = '50px'
        index.style.height = '50px'
        corSelecionada = 'black'
      }
      index.classList.add('selected')
      index.style.width = '55px'
      index.style.height = '55px'
      corSelecionada = index.style.backgroundColor
    })
  };

  // Aqui vou pegar a cor selecionada e adicionar ao pixel que eu clicar e salvar as cores dentro do LocalStorage;

  const divsBrancas = document.querySelectorAll('.pixel'); // Pegar no DOM o elemento com classe 'pixel' que são os próprios pixels.

  divsBrancas.forEach((pixel, index) => {
    pixel.addEventListener('click', () => {
      pixel.style.backgroundColor = corSelecionada;
      salvarQuadro[index] = corSelecionada;
      localStorage.setItem('pixelBoard', JSON.stringify(salvarQuadro));
    })
  })
  
  // Aqui vou recuperar as cores dos pixels; 
  const paletaSalva = JSON.parse(localStorage.getItem('pixelBoard'));
  
  // Essa linha abaixo é para recuperar o quadro que estava selecionado antes.
  salvarQuadro = paletaSalva ? paletaSalva : new Array(divsBrancas.length).fill(null);

  if (paletaSalva) {
    paletaSalva.forEach((cor, index) => {
      divsBrancas[index].style.backgroundColor = cor || 'white';
    });
  }
























  // const divsBrancas = document.querySelectorAll('.pixel'); // Pegar no DOM o elemento com classe 'pixel' que são os próprios pixels.

  // divsBrancas.forEach((pixel, index) => {
  //   pixel.addEventListener('click', () =>{
  //     pixel.style.backgroundColor = corSelecionada;
  //     salvarQuadro[index] = corSelecionada;
  //     localStorage.setItem('pixelBoard', JSON.stringify(salvarQuadro));
  //   })
  // })

  // // Aqui vou recuperar as cores dos pixels; 
  // const paletaSalva = JSON.parse(localStorage.getItem('pixelBoard'));
  // if (salvarQuadro){
  //   divsBrancas.forEach((pixel, index) => {
  //     pixel.style.backgroundColor = paletaSalva[index];
  //   });
  // }


  // if (paletaSalva) {
  //   paletaSalva.forEach((cor, index) => {
  //     divsBrancas[index].style.backgroundColor = cor ? cor : 'white';
  //   });
  // }
});





