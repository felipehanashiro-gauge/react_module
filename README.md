Camadas do Módulo

* react_components - Contém cada componente do sistema. Os componentes devem seguir os seguintes padrões:
	- caso haja um dado a ser trabalhado, este dado deve ser chamado de "data".
	- caso haja um elemento que exibirá o valor do dado "data", este elemento deverá ter o "ref" com o valor "data".
		ex: <input type="text" ref="data" />

	- casa haja uma lista a ser trabalhada, esta lista deve ser chamada de "list".
	- valores que serão apenas exibidos devem ser "props", normalmente passados pelo pai desse componente. Se houver necessidade de
	atualizar o dado, o pai deve ter seu valor alterado, fazendo com que a alteração seja propagada para os filhos.
	- componentes não devem ter regra de negócio ou acessar end points. Apenas receber dados, exibi-los e, raramente, processá-los.
	- caso haja a necessidade de criar um pequeno componente que sempre estárá junto a seu pai, criá-lo como um subcomponente.
		ex: ClientRegister = React.createClass...
			ClientRegister.list = React.createClass...
    - devem ser autoconsistentes (funcionam sozinhos e providenciam uma api para utilizá-los)
    - não devem ter ações de acordo com seu nome
    - na necessidade de saber o nome do componente, passar como props a propriedade "componentName"
        ex: <DatePicker componentName="DatePicker" label={"Reference Date"} name={"referenceDate"} />

var ClientRegister = React.createClass({
    getDefaultProps: function(){
        return {
            list: []
        }
    },
    getInitialState: function(){
        return{
            selected: ""
        }
    },
    selectClient: function(event){
        this.setState({selected: event.target.innerText });
    },
    render: function(){
        var self = this;
        return(
            <div>
                <input type="text" id="clientName" ref="data" />
                <button onClick={this.props.onClick} >New Client</button> //executa a função de click que foi passada na view
                
                Selected: {this.state.selected}
                
                <ul>
                    {this.props.list.map(function(client){
                        return (<li onClick={self.selectClient} >{client.name}</li>)
                    })}
                </ul>
            </div>
        );
    }
});






* views - Onde fica o HTML da aplicação. As views são basicamente um container de componentes e elementos HTML. Devem ter apenas o
essencial para a renderização. Lógicas, regras de negócio, etc. devem ficar nas stores.
	Cada view deve ter pelo menos uma store, a qual é iniciada na função "componentWillMount".
	Dentro da função "componentWillMount" deve ser chamada a função criadora da store, passando a própria view como parâmetro.
		ex: this.Store = HomeStore.init(this);



var HomeView = React.createClass({

    Store: null, //local onde é armazenada a store da view

    componentWillMount: function(){
        this.Store = HomeStore.init(this); //inicialização da store da view
    },

    getInitialState: function(){ //apenas o básico para permitir a renderização. Sem lógica ou outras funções.
        return {
            Clients: {
                list: []
            }
        }
    },

    render: function() { //dar um "ref" para o componente é uma maneira de poder acessá-lo da nossa store.
     return (
        <section className="top-Gutter Grid">
            <ClientRegister ref="ClientRegister" list={this.state.Clients.list} onClick={this.Store.Clients.save} />
        </section>
     );
    }
});






* stores - Onde fica a lógica da view. Deve ter uma função "init" que será executada logo na sua criação.
	A função "init" recebe a view como parâmetro, a qual deve ser armazenada, e deve retornar a própria store.

	É na store onde devem ficar as funções de acesso ao Back End, lógica, etc., evitando deixar responsabilidades para a view ou para os
	componentes.

var View = null;
var HomeStore = {
    init: function(view){ // recebe a view como parâmetro
        View = view; //guarda a view para podermos acessá-la
        this.init = function(){console.log('Store already started!!!')}; //sobreescreve a função init para evitar de ser chamada novamente
        return this; // retorna a store para a view
    },
    Clients: {
        getAll: function(){// busca todos os objetos e atualiza a view
            var self = this;
            Api.Client.getAll( //utilizar o objeto Api para evitar urls espalhadas pelo sistema.
                function(clientsList){
                	var clients = View.state.Clients;
                	clients.list = clientsList;
                    View.setState({"Clients": clients}) 
                }
            );
        },
        save: function(){
            var Clients = View.state.Clients; // pega o objeto que está com os dados do estado da view
            
            Clients.list.push({name: View.refs.ClientRegister.refs.data.value}); // insere um novo valor à "list", pegando o valor do componente

            View.refs.ClientRegister.refs.data.value = ""; // limpa o input do componente

            View.setState({Clients : Clients}); // atualiza view
        }
    }
}