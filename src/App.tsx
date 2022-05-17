import 'macro-css'
import Card from './components/Card/Card'
import Header from './components/Header';
import Drawer from './components/Drawer';

type sneakersType = {
    name: string
    price: number
    imageUrl: string
}

const sneakers: sneakersType[] = [
    {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: './img/sneakers/1.jpg'},
    {name: 'Мужские Кроссовки Nike Air Max 270', price: 15600, imageUrl: './img/sneakers/2.jpg'},
    {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, imageUrl: './img/sneakers/3.jpg'},
    {name: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: './img/sneakers/4.jpg'},
]

function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>

            <div className="content p-40">
                <div className={'d-flex align-center justify-between mb-40'}>
                    <h1>Все кроссовки</h1>
                    <div className={'search-block d-flex'}>
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder={'Поиск...'}/>
                    </div>
                </div>

                <div className="d-flex">
                    {sneakers.map(sneaker => (
                        <Card title={sneaker.name}
                              price={sneaker.price}
                              imageUrl={sneaker.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
