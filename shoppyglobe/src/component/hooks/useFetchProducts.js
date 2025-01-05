import {useState, useEffect} from 'react'

const useFetchProducts = (url) => {
  const [products,setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data from Api
  useEffect(()=>{
    const fetchData = async ()=>{
        try {
            const response = await fetch(url)
            if(!response.ok){
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data.products);
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }finally{
          setLoading(false);
        }
    };
    fetchData();
  },[url])

  return {products, loading}
}

export default useFetchProducts;