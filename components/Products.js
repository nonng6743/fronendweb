import React from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      nameproduct
      description
      typeproduct
      price
      imageUrl
    }
  }
`

const Products = () => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '40px',
        gridGap: '10px'
      }}
    >
      {data.products.map(prod => (
        <div
          key={prod.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '30px',
            border: 'solid 1px black',
            padding: '10px'
          }}
        >
          <Link href='/products/[productId]' as={`/products/${prod.id}`}>
            <a>
              <img src={prod.imageUrl} alt={prod.description} width='250px' />
            </a>
          </Link>
          <h3>{prod.nameproduct}</h3>
          <h3>{prod.description}</h3>
          <h3>{prod.typeproduct}</h3>
          <h4>{prod.price} THB</h4>
          <button
            style={{
              background: 'green',
              color: 'white',
              padding: '10px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default Products