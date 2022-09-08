class Produto {
  constructor(){
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }
  salvar(){ 
    let produto = this.lerDados()
    if(this.validaCampo(produto) == true){
      if(this.editId == null){
         this.adicionar(produto)
      }
        this.atualizar(this.editId,produto)
    }
      this.listaTabela()
      this.cancelar()
  }
  listaTabela(){
      let tbody = document.getElementById('tbody')
      tbody.innerHTML = ''

    for(let i =0;i<this.arrayProdutos.length;i++){
      let tr = tbody.insertRow()

      let td_id = tr.insertCell()
      let td_produto = tr.insertCell()
      let td_valor = tr.insertCell()
      let td_acoes = tr.insertCell()
      
      td_id.innerText= this.arrayProdutos [i].id;
      td_produto.innerText= this.arrayProdutos [i].nomeProduto
      td_valor.innerText= this.arrayProdutos [i].preco

      td_id.classList.add('center')
      let imgEdit= document.createElement('img')
      imgEdit.src = 'img/edit-icon.svg'
      td_acoes.appendChild(imgEdit) //<td><img></td>
      imgEdit.setAttribute('onclick','produto.editar('+ JSON.stringify(this.arrayProdutos[i])+')')

      let imgDel = document.createElement('img')
      imgDel.src = 'img/delete-icon.svg'
      td_acoes.appendChild(imgDel)
      imgDel.setAttribute('onclick','produto.deletar('+this.arrayProdutos [i].id+')') //setAttribute('evento','acao')
    } 
  }
  adicionar(produto){
    produto.preco = parseFloat(produto.preco)
    this.arrayProdutos.push(produto)
    this.id++;

  }


  atualizar(id,produto){
    for(let i = 0; i < this.arrayProdutos.length; i++){
      if( this.arrayProdutos[i].id == id){
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].preco = produto.preco;
        
      }
  
    }

  }
  
  cancelar(){
    document.getElementById('produto').value = '';
    document.getElementById('preco').value = '';

    document.getElementById('btn1').innerText ='Salvar'
    this.editId =null;
  }
  lerDados(){
    let produto = {}
     produto.id = this.id
     produto.nomeProduto = document.getElementById('produto').value;
     produto.preco= document.getElementById('preco').value;
     // criou uma prop nomeProduto e preco no obj produto
     return produto;
  }
  validaCampo(produto){
    let msg= ''
    if(produto.nomeProduto == ''){
      msg += '- informe o nome do Produto \n'
    }
    if(produto.preco == ''){
      msg += '- informe o preço do Produto \n'
    }
    if(msg != ''){
      alert (msg);
      return false;
    }
    return true;
  }
  editar(dados){
    this.editId = dados.id;

    document.getElementById('produto').value = dados.nomeProduto;
    document.getElementById('preco').value = dados.preco;
    document.getElementById('btn1').innerText = 'Atualizar';
  }

  deletar(id){ 

    if(confirm('Deseja realmente deletar o produto do ID ' + id)){
      for(let i = 0; i < this.arrayProdutos.length; i++){
        if(this.arrayProdutos[i].id == id){
          this.arrayProdutos.splice(i,1)
          tbody.deleteRow(i)
        }
    }
    }
    console.log(this.arrayProdutos)
  }


}
var produto = new Produto()