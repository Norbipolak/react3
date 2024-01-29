import logo from './logo.svg';
import './App.css';
import Lottery from './components/lottery';

const arr = new Array(90);
console.log(arr);
/*
Ez egy tömb lesz, aminek 90 eleme van és mindegyik elemnek az az értéke, hogy undefined, de a length-je 90 lesz 
*/
console.log(...arr);
/*
így visszakapjuk a 90db undefined elemeket, mert a ... ugye kibontottuk az array-t 
*/
console.log(...arr.keys()); 
/*
Visszakapjuk 0-89-ig a számokat -> 
Azért, mert a tömbök a JavaScriptben objektumok és a kulcsaik, azok az indexek
*/

/*
Ha készítünk egy objektumot így
akkro visszakapjuk a kulcsait {'key:1', 'key2', 'key3'} 0:"key1" 1:"key2" 2:"key3", 
de ez a tömböknél úgy müködik, hogy itt a kulcsok azok az indexek 
*/
const obj = {"key1":0, "key2":1, "key3":2};
console.log(Object.keys(obj));// visszakapjuk a kulcsait {'key:1', 'key2', 'key3'} 0:"key1" 1:"key2" 2:"key3"

function App() {
    return (
        <div className='container'>
            </Lottery>
        </div>
    );
}

export default App;
