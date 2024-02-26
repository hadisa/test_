'use client'

import { useState } from 'react'
import ProductsDetails from './ProductsDetails/ProductsDetails'
// You cannot import a Server Component into a Client Component.

function ProductDetailsWrapper({ params }: { params: { channel: string } }) {
    const [count, setCount] = useState(0)

    return (
        <>
            <button onClick={() => setCount(count + 1)}>{count}</button>

            <ProductsDetails params={{
                channel: params.channel
            }} />
        </>
    )
}
export default ProductDetailsWrapper;