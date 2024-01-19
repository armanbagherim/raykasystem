import React from 'react'

interface ProductCardProps {
    type: String
}
export default function ProductCard({ type }: ProductCardProps) {
    if (type === 'big') {
        return 'big'
    } else if (type === 'small') {
        return 'small'
    }
}
