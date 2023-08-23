


class Cliente {
    constructor(){
        this.id = 1 ;
        this.nome = '';
        this.rg = 0;
        this.arrayMaster = [];
        this.editID = null; 
    }
    salvar(){
        let cliente = this.lerDados();

        if(this.validaCampos(cliente)){
            if(this.editID == null){
                this.adicionar(cliente);
            }else{
                this.atualizar(this.editID,cliente)
            }
            
        }

        this.listarDados();
    }
    adicionar(cliente){
        this.arrayMaster.push(cliente);
        this.id++;
    }
    atualizar(id, cliente){
     
        for(let i = 0; i < this.arrayMaster.length; i++){

            if(this.arrayMaster[i].id == id){
                this.arrayMaster[i].nome = cliente.nome;
                this.arrayMaster[i].rg = cliente.rg;
                document.getElementById('btt').innerText = 'Adicionar'
                this.editID = null
            }
        }
    }
    lerDados(){
        let cliente = {};
        cliente.id = this.id;
        cliente.nome = document.getElementById('nome').value;
        cliente.rg = document.getElementById('rg').value;
        
        return cliente;
    }
    validaCampos(cliente){
        let msg = '';

        if(cliente.nome == ''){
            msg += 'Informe o Nome \n'
        };
        if(cliente.rg == ''){
            msg += 'Informe o RG \n'  
        };
        if(msg != ''){
            alert(msg);
            return false
        };
        return true
    }
    listarDados(){
        let tbd = document.getElementById('tbody');
        tbd.innerText = '';

        for(let i = 0; i < this.arrayMaster.length; i++){
            let tr = tbd.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_rg = tr.insertCell();
            let td_acoes = tr.insertCell();
        

            td_id.innerText = this.arrayMaster[i].id;
            td_nome.innerText = this.arrayMaster[i].nome;
            td_rg.innerText = this.arrayMaster[i].rg; 
            
            
            td_id.classList.add('center');
            td_acoes.classList.add('center');
            
            let imgEdit = document.createElement('img');
            let imgDel = document.createElement('img');

            imgEdit.src = './imgs/editButton.svg';
            imgEdit.classList.add('icons');
            imgDel.src = './imgs/deleteButton.svg';
            imgDel.id = 'del'
            imgDel.classList.add('icons');
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDel);


            imgEdit.setAttribute('onclick','clint.preparaEdicao('+JSON.stringify(this.arrayMaster[i])+')')
            imgDel.setAttribute('onclick','clint.deletar('+this.arrayMaster[i].id+')')
            
            
        }
        console.log(this.arrayMaster)

    }
    deletar(id){
        if(confirm('Deseja realmente deletar o ID' + id)){
        let tbd = document.getElementById('tbody');

        for(let i = 0; i < this.arrayMaster.length; i++){
        if(this.arrayMaster[i].id == id){
            this.arrayMaster.splice(i,1);
            tbd.deleteRow(i)
            }
        }
    };
        console.log(this.arrayMaster)                               
    }
    preparaEdicao(dados){
        this.editID = dados.id;

        document.getElementById('nome').value = dados.nome;
        document.getElementById('rg').value = dados.rg;
        document.getElementById('btt').innerText = 'Salvar';                    
    }
}

var clint = new Cliente()
const btt = document.getElementById('btt');
const cln = document.querySelector('input[type=reset]');


btt.addEventListener('click',e=>{e.preventDefault();clint.salvar();cln.click()});








