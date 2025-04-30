import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/stores/cart'
import api from '@/core/api'

vi.mock('@/core/api')

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with empty cart', () => {
    const store = useCartStore()
    expect(store.items).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('adds item to cart successfully', async () => {
    const mockResponse = { data: { data: [] } }
    vi.mocked(api.post).mockResolvedValue({})
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useCartStore()
    await store.addToCart('product-1', 2)

    expect(api.post).toHaveBeenCalledWith('/carts', {
      product_id: 'product-1',
      stock: 2
    })
    expect(store.error).toBeNull()
  })

  it('handles error when adding item to cart', async () => {
    const error = { response: { data: { message: 'Product not found' } } }
    vi.mocked(api.post).mockRejectedValue(error)

    const store = useCartStore()
    await store.addToCart('invalid-product', 1)

    expect(store.error).toBe('Product not found')
  })

  it('fetches cart successfully', async () => {
    const mockItems = [
      {
        id: '1',
        product_id: 'product-1',
        quantity: 2,
        product: {
          name: 'Test Product',
          price: 10,
          image_url: 'https://example.com/image1.jpg'
        }
      }
    ]
    const mockResponse = { data: { data: mockItems } }
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useCartStore()
    await store.fetchCart()

    expect(store.items).toEqual(mockItems)
    expect(store.error).toBeNull()
  })

  it('handles error when fetching cart', async () => {
    const error = { response: { data: { message: 'Failed to fetch cart' } } }
    vi.mocked(api.get).mockRejectedValue(error)

    const store = useCartStore()
    await store.fetchCart()

    expect(store.error).toBe('Failed to fetch cart')
  })

  it('removes item from cart successfully', async () => {
    const mockResponse = { data: { data: [] } }
    vi.mocked(api.delete).mockResolvedValue({})
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useCartStore()
    await store.removeFromCart('cart-item-1')

    expect(api.delete).toHaveBeenCalledWith('/carts/cart-item-1')
    expect(store.error).toBeNull()
  })

  it('updates item quantity successfully', async () => {
    const mockResponse = { data: { data: [] } }
    vi.mocked(api.put).mockResolvedValue({})
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useCartStore()
    await store.updateQuantity('cart-item-1', 3)

    expect(api.put).toHaveBeenCalledWith('/carts/cart-item-1', { stock: 3 })
    expect(store.error).toBeNull()
  })

  it('calculates total price correctly', () => {
    const store = useCartStore()
    store.items = [
      {
        id: '1',
        product_id: 'product-1',
        quantity: 2,
        product: {
          name: 'Test Product 1',
          price: 10,
          image_url: 'https://example.com/image1.jpg'
        }
      },
      {
        id: '2',
        product_id: 'product-2',
        quantity: 3,
        product: {
          name: 'Test Product 2',
          price: 20,
          image_url: 'https://example.com/image2.jpg'
        }
      }
    ]

    expect(store.totalItems).toBe(2)
    expect(store.totalPrice).toBe(80) // (10 * 2) + (20 * 3)
  })
}) 