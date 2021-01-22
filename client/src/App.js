import { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [foodname, setfoodname] = useState('');
  const [days, setdays] = useState(0);

  const [foodlist, setfoodlist] = useState([])

  const [newfood, setnewfood] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((responce) => {
      setfoodlist(responce.data);
    })
  }, [])

  const addlist = () => {

    Axios.post('http://localhost:3001/insert', {
      foodName: foodname,
      days: days
    });

  }

  const updatefood = (id) => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      newfood: newfood
    });

  }

  const deletefood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  };

  return (
    <div className="App container bg-light">
      <h1 className="bg-secondary p-3 m-3 text-white"> FOOD APP</h1>
      <label className="text-monospace mt-5 h3">FoodName</label>
      <input className="mt-2 form-control w-25" type="text" onChange={(e) => setfoodname(e.target.value)} />
      <label className="mt-5 text-monospace h3">Day since you ate it</label>
      <input className="mt-2 form-control w-25" type="number" onChange={(e) => setdays(e.target.value)} />
      <button className="mt-2 btn btn-success" type="button" onClick={addlist}>Add to list</button>

      <h1 className="mt-5 mb-4"> FOOD LIST</h1>
      {foodlist.map((val, key) => {
        return (
          <div key={key} className=" shadow-sm p-3 mb-5 bg-light rounded">
            <h1> {val.foodName}</h1>
            <h1 > {val.daysSinceIAte} </h1>
            <input className="m-2 form-control" type="text" placeholder="New Food name....." onChange={(e) => setnewfood(e.target.value)} />
            <button className="m-2 btn btn-warning" type="button" onClick={() => updatefood(val._id)} >update</button>
            <button className="m-2 btn btn-danger" type="button" onClick={() => deletefood(val._id)}>delete</button>
          </div>
        )
      })}
    </div>
  );
}
export default App;
