import { useEffect } from "react";

function Lottery() {
    /*
    A vátozók, amikre szükségünk lesz 
    userNumbers -> a számok, amiket kiválaszt a felhasználó
    randomNumbers -> véltelenszerűen generált számok
    */
    const [userNumbers, setUserNumbers] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [hits, setHits] = useState(0);
    const [started, setStarted] = useState(false);
    const [numbers, setNumbers] = useState([...new Array(90).keys()]);

    /*
    Amikor rákattintunk ezekre a div-ekre tehát ezekre a cell-ekre, kellene nekik adni egy class-t, ami mutatja, hogy ezek 
    ki vannak jelölve -> .highlighted adtunk neki egy háttérszínt css-ben 

    így csináljuk meg ->
    */

    const cellClick = (cell) => {
        if (userNumbers.length >= 5)
            return;
        /*
        hogyan kapjuk meg az aktuális div-et, amire rákattintottunk -> 
        megadunk a div-nek onClick={()=>cellClick()}, meghívjuk itt a cellClick-et és adunk neki különdböző paramétereket 
        itt tudni kellene azt, hogy mi az a szám, amit kijelöltünk, de ez már onnan tudható, hogy az event objektumból (e)
        eül tudjuk érni a target-et, ami pedig maga a div -> <div onClick={(e)=>cellClick(e.target)}
        ez lesz nekünk a cell-ünk
        */
        console.log(cell);//ha rákattintunk, akkor megkapjuk az adott cellát, tehát a div-ét az adott számnak 
        /*
        ennek a div-nek az innnerText-jére van szükségünk, mert az lesz az aktuális számunk
        */
        console.log(cell.innerText);//pl.rákattintunk a 65-ös cellára, akkor ez 65 lesz a konzolon
        /*
        a cell pedig kap egy class-t, a highlighted class-t, amit csináltunk éppen erre a css-ben, hogy más legyen a háttérszíne a többitől
        és akkor így már látjuk, hogy melyik cellák vannak kiválasztva, melyikekre kattintottunk rá
        */

        /*
        mwg fog változni az if-be tesszük ezeket bele lejebb !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        */
        cell.classList.add("highlighted");
        const n = parseInt(cell.innerText); // lementjük egy változóba (n mint number) a számunkat, tehát a cell-nek az innerText-jét
        // és ezt a számot belerakjuk a userNumbers-ba
        setUserNumbers([...userNumbers, n]);
        /*
        [...userNumbers, n] -> mintha leírnánk egymás mellé ezeket a userNumber-eket és mág hozzáadjuk a n-t (a kiválasztott számunkat)
        és innentől azt történik, hogy beleraktuk a userNumbers-be a számainkat és csak azt kell megcsinálni, hogy ne engedje, hogy több
        mint 5 számunk legyen itt, ezt megcsináljuk feljebb egy if-vel és egy return-vel, hogy ne engedje, hogy többet kijelöljünk mint 5
        if(userNumbers.length >= 5)
            return;
        */

        //igy fog kinézni, lejjebb a leírás, hogy mit csináltunk 
        const n = parseInt(cell.innnerText);// globális változóban létrehozva, mert az if mindegyik ágában szükségünk lesz rá 

        if (!cell.classList.contains("highlighted")) {
            cell.classList.add("highlighted");
            setUserNumbers([...userNumbers, n]);
        } else {
            const index = userNumbers.indexOf(n);
            console.log(index);//első kiválastott számnál 0, másodiknál 1, harmadiknál 2 lesz a konzolon az index
            const un = [...userNumbers];
            un.splice(index, 1);
            setUserNumbers(userNumbers);
        }


        /*
        Berakunk egy button - beküldés gombot 
        Még azt kell megcsinálnunk, hogyha egyet beleraktunk akkor azt ki is tudjuk venni, hogyha egyett kijelöltünk, mondjuk a 26-at 
        de mégsem azt szeretnénk, akkor innentől kezdve, ha mégegyszer rákattintunk akkor ki tudjuk venni 
        de ezt úgy tudjuk megoldani, hogyha nincs kijelölve egy cella if(!cell.classList.contains("highlighted")) -> 
        ha a cellánk nem tartalmazza azt a class-t, hogy highlighted, akkor hozzáadjuk ha pedig tartalmazza, akkor megkeressük, hogy hányadik 
        indexen van ez a szám -> const index = userNumbers.indexOf(n)
        !!!!! és mindegyik if ágban szükségünk van a számra, tehát az n változóra, amiben le van mentve ez a szám, ezért ezt az if-en 
        kivül fogjuk elkészíteni 
        -> const index = userNumbers.indexOf(n) ezzel megkapjuk a számunknak az indexét a tömbben 
        console.log(index) -> rákattintunk számokra és az amire rákattintottunk elöször az a tömbben a 0 -ás indexű lesz második 1, harmadik 2....
        és ezt kellene nekünk valahogy kiszedni (mondjuk a második indexűt), ezt úgy tudjuk kiszedni, hogy csinálunk egy olyan változót, hogy 
        un (mint usernumbers), aminek megadjuk a userNumbers -> const un = [...userNumbers];
        és az un.splice(index, 1);-val kiszedünk egyet az indextől, tehát azt az indexen lévőt és a végén setUserNumbers
    
                if (!cell.classList.contains("highlighted")) {
                cell.classList.add("highlighted");
                setUserNumbers([...userNumbers, n]);
            } else {
                const index = userNumbers.indexOf(n);
                console.log(index);//első kiválastott számnál 0, másodiknál 1, harmadiknál 2 lesz a konzolon az index
                const un = [...userNumbers];
                un.splice(index, 1);
                setUserNumbers(userNumbers);
            }
    
            if (userNumbers.length >= 5)
                return;
            ezzél még az a probléma, az if feltételünk csak, hogyha hozzá akarunk adni még egyett, de ha le akarunk vonni és 
            van már 5, akkor tudjunk még levonni, mert >=5, tehát 5-nél return-öl 
    
            az első fele így fog kinézni az if- else-nek (tehát az if-es része) -> && userNumbers.length < 5) ezt hozzáadjuk 
    
            ezt meg letöröljük, mert máshogy lesz megoldva 
            if (userNumbers.length >= 5)
                return;
    
            if (!cell.classList.contains("highlighted")
            && userNumbers.length < 5) {
                cell.classList.add("highlighted");
                setUserNumbers([...userNumbers, n]);
            és második részében nem elég egy else hanem else if kell 
            mert -> 
            ha nagyobb a userNumbers.length mint 5 és nem olyanra kattintottunk rá, ami highlighted-os akkor olyat próbál meg kiszedni 
            ami nincs is benne a const index-re kapunk egy -1-et és akkor a userNumbers tömbünkből a -1-et akarjuk kiszedni ami nem jó, 
            ezért kell egy else if, létrehozunk egy változót az if-en kívül const highlighted = cell.classList.contains("highlighted")
    
            !!!!!!!!!!!!!így fog kinézni az egész cellClick függvény a változtastások végén
            ->
        */
    };

    const cellClick = (cell) => {
        const n = parseInt(cell.innerText);
        const highlighted = cell.classList.contains("highlighted");

        if (!highlighted
            && userNumbers.length < 5) {
            cell.classList.add("highlighted");
            setUserNumbers([...userNumbers, n]);
        } else if (highlighted) {
            const index = userNumbers.indexOf(n);
            const un = [...userNumbers];
            un.splice(index, 1);//kiszedjük a számot a tömbünkből 

            setUserNumbers(un);//az új tömbbel frissítjük az értékeit a userNumbers-nak 
            cell.classList.remove("highlighted");//leszedjük a kijelőlést ha mégegyszer rákattintunk a számra 

            /*
            Csináltunk egy un változót, ami a userNumbers tömbünk(nek a másolata), és itt csinálunk valamilyen 
            változtatást, pl. un.splice(index, 1) és a végén !!!!!!!!!!!!!!setUserNumbers-nak megadjuk a változót(un), 
            hogy frissítsük a userNumbers tömbünket 
            */
        }
    }

    /*
    Ha összegyült a userNumbers, tehát kiválasztottunk 5 számot, azután kell legenerálnunk a randomNumbers-t 
    Honnan tudjuk, hogy összegyült 5, onnan, hogy rákattintunk a beküldés gombra és a beküldésnél fogunk generálni számokat 
    ->
    */
    const send = () => {
        /*
        csak, akkor szeretnénk, hogy send-eljen, tehát beküldje a számokat, ha ki van választva mind az 5 
        elötte ne lehessen beküldeni, különben returnülünk és nem fogja kiadni a változók értékét, nem fog véletlen számokat generálni
        majd kiírunk egy hibaüzenetet a usernak
        -> 
        */
        if (userNumbers.length !== 5)
            return; // csak, akkor küldhessük be ha van 5 szám a userNumbers tömbünkben, különben return 
        /*
        megadtuk a buttonünknek (onClick és send)-> <button onClick={send}>Beküldés</button>
        ebben a függvényben pedig generálunk 5 darab véltelen számot 
        */
        const rn = []; //rn -mint randomnumbers, egy üres tömb, amibe fogunk generálni véletlen számokat 

        while (rn.length < 5) {
            // while-val generáljuk, amig a rn tömbnek a length-je kisebb, mint 5 addig generálunk véltelen számokat 
            const rand = Math.floor(Math.random() * 90) + 1;
            // így kapunk 0-89-ig egy értéket, de ha hozzáadunk eggyet, akkor 1-90-ig kapunk random számokat 

            /*
            itt azt kell vizsgálni, hogyha az rn nem tartalmazza rand(random szám, amit generáltunk)
            akkor rakjuk csak bele, mert egy ilyen ciklusban akár többször is generálhatjuk ugyanazt a számot 
            */
            if (!rn.includes(rand)) {
                rn.push(rand);
            }

            setRandomNumbers(rn); //mindig set-velni kell a felül létrehozott változót!!!!!!!!!!!!!!!!!!!!
            setStarted(true);
            /*
            Ha megnyomtuk a gombot és nem returnólünk, tehát a userNumbers.length === 5, akkor a setStarted true lesz 
            és akkor a useEffect-ben nem a randomNumbers változására reagálunk, hanem a startednak a módosulására 
            újracsinálom az egész useEffectet az előző alá!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
            */

            console.log(randomNumbers); //egy üres tömböt fogunk visszakapni
        }
    };

/*
Most azt kell leeneőriznünk, hogy van-e találatunk. tehát, hogy a randomNUmbers és mi általunk kiválasztott számok 
között van-e egyezés 
->
ehhez létrehozunk az elején egy hits useState-s változót 
const [hits, setHits] = useState(0);

Amikor legenráltuk a véletlen számokat, akkor kellene nekünk leellenőrizni a találatokat, viszont ha feljebb, 
kikonzolzzuk a randomNumbers-t, amibe annak ellenére, hogy a setRandomNumbers(rn)-vel beletettük a véletlen legenerált számainkat 
akkor egy üres tömböt fogunk visszakapni , miután kijelöltük a mi számainkat 
-> 
Azért fogunk üres tömböt kapni, mert úgy müködik a react, hogy amikor megváltozik a useState-s változónak az értéke, 
emiatt setRandomNumbers(rn), akkor frissíti a komponens-t, azért, hogy reagáljon a komponens változók módosulására és 
ez a kiírás console.log(randomNumbers) egy korábbi életciklusban lesz elvégezve és nekünk az új életciklusból származó adatokat kell 
megkapnunk és ehhez jó az useEffect nevű megoldás!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

    useEffect(() => {
        /*
        a useEffect, arra jó, hogy reagál egy vagy több komponensváltozó módosulására 
        két paramétert vár, az egyik az egy callback function a másik pedig egy 
        tömb azokkal a változókkal, amelyeknek a módosulására reagálunk 
        és ha azt mondjuk, hogy a randomNumbers lesz ez a változó, tehát amikor módosul a randomNumbers értéke, 
        */
        console.log(randomNumbers);
        /*
        Azt láthatjuk a böngésző konzolján, hogy van egy üres tömb és egy tömb random számokkal(miután mi kiválasztottuk a számainkat)
        az üres tömb az a verzió, amit még előtte konzoluztunk ki és a mostani verzió, ami itt van benne a useEffect-ben, az pedig 
        tartalmazza a random számokat a tömbben 

        Azt is hozzá kell tenni, amikor elkészül a komponens, tehát elöször olvasuk be, akkor is kap értéket a randomNumbers,
        mághozzá egy üres tömböt, amit ki is ír és a useEffect arra is reagál, hogy az elején elkészítettük a változót 
        -> 
        Tehát itt minket csak azok az esetek fognak érdekelni, amikor a userNumbersnek már van 5 darab értéke és a randomNUmbersnek is 
        van már 5 darab értéke 
        ->
        */
        if (randomNumbers.length === 5) {
            /*
            itt már elég csak azt kiírni, hogy a randomNumbersnek a length-je legyen 5, mert addig nem is tudnánk randomNumberseket
            generálni, amíg a userNumbers az nem 5, tehát itt nem kell beírni még egy feltételt, hogy userNumbers.length === 5
    
            De azt is megcsinálhatnánk, hogy a játék fázisait valahogyan beosztjuk, hogy legyen az, hogy van a kijelölési fázis és 
            utána van a beküldési fázis és akkor ennek a fázisváltozónak az értékváltozására reagálunk 
            -> 
            tehát nem is ez lesz a useEffect (ki lett kommentelve), hanem létrehozunk felül started useState-s változót 
            const [started, setStarted] = useState(false);
            */
        }

    }, [randomNumbers]);

    /*
    !!!!!!!!!!!!!!!!!!!!!! új useEffect ami nem a randomNUmbers módosulására fog reagálni mint az előző lett volna hanem a started-ra 
    */

    useEffect(() => {
        if (started)
            /*
            azt mondjuk, hogyha a started true lesz és akkor már a randomNumbersban ott lesznek a random számok
            akkor kezdünk el számolni találatokat de még jobb ha azt mondjuk, hogy ha nem kezdődött el a játék, akkor return 
            és akkor nem kell egy if elágazásban egy blokkban elkészíteni a kódot, csinálok még egy useEffectet ugy
            */
            console.log("Találatok számolása!");
        //akkor fog ez a konzolon megjelenni ha kiválasztottuk az 5 számot és beküldjük 

    }, [started]);

    /*
    végső useEffect 
    */
    useEffect(() => {
        if (!started)
            return;

        /*
        Az sem probléma, ha ugyanazokkal a számokkal szeretnénk játszani de akkor kell nullázni a hits-et
        és utána kezdi el számolni a hits-eket, mert enélkül bent maradt volna a hits és folyamatosan adta volna hozzá 
        tehát ugyanazokkal a számokkal játszottunk volna 100 kört és lett volna 6 hits-ünk
        */
        setHits(0);

        /*
        Csináltunk egy display nevű div-et, ami majd tartalmazni fogja a userNumber-eket és a találatokat (css formázás)
            <div className="display">
                <div className="cell">
                    találatok: {hits}
                </div>
                <div className="cell">
                    nyertes: {randomNumbers.join(", ")}
                </div>
            </div>
        */

        /*
        végigmegyünk a userNumbers-ökön és ha a randomNumbers tartalmaz valamelyik userNumber-t, akkor növeljük a hits-ek számát eggyel 
        */
        for (const n of userNumbers) {
            if (randomNumbers.includes(n)) {
                setHits(h => h + 1);
            }
        }
        /*
        Mivel ez a started-ra reagál, ezért vissza kell állítanunk started-ot false-ra
        */

        setStarted(false);
    }, [started]);

    /*
    Csinálunk egy új játék gombot, ami letörölné a táblát és kitörölné a találatokat  
    <button onClick={newNumbers}>Új számok</button>
    */
    const newNumbers = ()=> {
        setUserNumbers([]);
        /*
        Itt még az lesz a probléma, hogy kiválasztunk 5 számot beküldjük és rányomunk az Új számok gombra 
        Megcsinálta a kiűrítést, de a táblának a letísztítását viszont nem, tehát fent fognak maradni a kijelölt (highlighted)
        számok és mivel a div-ket generáltuk, ezért nem érhetők el külön id-vel vagy referenciaként 
        */
       /*
       létrehoztunk fent egy numbers useState-s változót -> const [numbers, setNumbers] = useState([...new Array(90).keys()]);
       lent, meg árírtuk ->
                        numbers.map((n, i) =>
                        <div onClick={(e) => cellClick(e.target)}
                        key={i} className="cell">{n + 1}</div>

        Itt az a probléma, hogyha ugyanzok az értékek lesznek benne a useState-s változóban, akkor nem reagál a módosításra 
        mert effektív az értékek nem módosultak, de nem feltétlen csak az értékek módosulására kellenne reagálnia, 
        hanem arra is, hogy egy másik referenciát kap, másik tömb lesz az értéke (de erre így nem reagál) ->
        setUserNumbers([]);
        setUserNumbers([...new Array(90).keys()]);

        Csak ugy tudjuk letörölni a táblát, ha a numbers-nek új értékeket adnánk meg 
        megoldás setNumbers plusz useEffect 
       */
      setNumbers([]);
    };

    useEffect(()=> {
        if(numbers.length !== 90) {
            setNumbers([...new Array(90).keys()]);
        }
    }, [numbers]);
    /*
    Elöször leűríti a numbers-t és
    */

    return (
        <>
            <div className="display">
                <div className="cell">
                    találatok: {hits}
                </div>
                <div className="cell">
                    nyertes: {randomNumbers.join(", ")}
                </div>
            </div>
            <div className="lottery-numbers">
                {
                    numbers.map((n, i) =>
                        <div onClick={(e) => cellClick(e.target)}
                            key={i} className="cell">{n + 1}</div>
                    )
                }
            </div>

            <button onClick={send}>Beküldés</button>

            <button onClick={newNumbers}>Új számok</button>
        </>
    )
}

export default Lottery;

/*
Hogy fog kinézni -> lesz egy táblázat, ahol lesz 10 oszlop és kilenc sor
és ha rákattintunk, akkor az a szám lesz kiválasztva

    return(
        <div className="container"> ezt a contaienert majd átrakjuk az App.js-be
            <div className="lottery-numbers">
                !!!itt kell majd generálnunk négyzeteket, amiben számok vannak bent 
                az a baj, hogy itt nem tudunk for ciklust létrehozni, csak ezeket az iterációs függvényeket tudjuk alkalmazni ->
                forEach-et, map-et 

                App.js-ben, hogy mit fogunk helyette csinálni -> const arr = new Array(90);
                a tömböknek a kulcsai az indexszámai és ez kell majd nekünk itt 
                    {
                    [...new Array(90).keys()].map((n, i)=> 
                        <div key={i} className="cell">{n+1}</div>
                    )
                így csinákunk cell-elemeket, hogy csinálunk egy ...new Array, ami tartalmazni fog 90 undefined elemet 
                .keys -> ennek a kulcsai 0-89-ig fognak menni és a mappal végigmegyünk rajtuk (itt kell két paraméter)
                az egyik azok a számok, amiket megadunk majd a div-ben {n+1}, hogy láthatók legyenek, +1, mert nekünk 
                1-90-ig kellenek, majd a számok és az i-index, azért kell mert mindegyik div-nek kell, hogy legyen egy unique key
                property-je, key={i}, amire mi az indexeket szoktuk megadni 
                }
            </div>
        </div>
    )
*/
/*
Meg vannak a számok, csak még kicsit furán néznek ki ezért css -> .cell-t megformázzuk 
*/

