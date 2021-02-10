import React, {useState, useEffect}from "react";
import api from './services/api';

import "./styles.css";
/**
 *
 * Listar os repositórios da sua API: Deve ser capaz de criar uma lista com o campo title de todos os repositórios que estão cadastrados na sua API.

 * Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar e, após a criação, deve ser capaz de exibir o nome dele após o cadastro.

 * Remover um repositório da sua API: Para cada item da sua lista, deve possuir um botão com o texto Remover que, ao clicar, irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
 *
 */
function App() {
  const [reps, setReps] = useState([]);

  useEffect(()=> {
    api.get('/repositories').then((res)=> {
      if(res.status === 200){
        setReps(res.data);
      }
    })
  }, [handleRemoveRepository])

  async function handleAddRepository() {
    // TODO
    const res = await api.post('/repositories', {
      title:`Desafio ReactJS ${Date.now()}`,
      techs: ['JS', 'React'],
      url: "https://github.com/"
    })

    const repositorio = res.data;

    setReps([...reps, repositorio])

    console.log(reps);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
    
    console.log(reps);
  }

  return ( 
    <div>
      <ul data-testid="repository-list">

      {reps.map(el => 
        <li key={el.id}>
          {el.title}
          <button onClick={()=>handleRemoveRepository(el.id)}>
          Remover
          </button>
        </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
