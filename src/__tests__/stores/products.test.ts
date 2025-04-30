import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@/stores/products'
import api from '@/core/api'

vi.mock('@/core/api')

describe('Products Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initializes with default state', () => {
    const store = useProductsStore()
    expect(store.items).toEqual([])
    expect(store.categories).toEqual([])
    expect(store.brands).toEqual([])
    expect(store.colors).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.total).toBe(0)
    expect(store.currentPage).toBe(1)
    expect(store.filters).toEqual({
      search: '',
      category: null,
      brand: null,
      color: null
    })
  })

  it('fetches products successfully', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Test Product 1',
        description: 'Test Description 1',
        price: 10,
        image_url: 'test1.jpg',
        category_uuid: 'cat1',
        brand_uuid: 'brand1',
        color_uuid: 'color1'
      },
      {
        id: '2',
        name: 'Test Product 2',
        description: 'Test Description 2',
        price: 20,
        image_url: 'test2.jpg',
        category_uuid: 'cat2',
        brand_uuid: 'brand2',
        color_uuid: 'color2'
      }
    ]
    const mockResponse = { 
      data: { 
        data: mockProducts,
        total: 2
      } 
    }
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useProductsStore()
    await store.fetchProducts()

    expect(store.items).toEqual(mockProducts)
    expect(store.total).toBe(2)
    expect(store.error).toBeNull()
  })

  it('handles error when fetching products', async () => {
    const error = { response: { data: { message: 'Failed to fetch products' } } }
    vi.mocked(api.get).mockRejectedValue(error)

    const store = useProductsStore()
    await store.fetchProducts()

    expect(store.error).toBe('Failed to fetch products')
  })

  it('fetches categories successfully', async () => {
    const mockCategories = [
      { uuid: 'cat1', name: 'Category 1' },
      { uuid: 'cat2', name: 'Category 2' }
    ]
    const mockResponse = { data: { data: mockCategories } }
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useProductsStore()
    await store.fetchCategories()

    expect(store.categories).toEqual(mockCategories)
    expect(store.error).toBeNull()
  })

  it('fetches brands successfully', async () => {
    const mockBrands = [
      { uuid: 'brand1', name: 'Brand 1' },
      { uuid: 'brand2', name: 'Brand 2' }
    ]
    const mockResponse = { data: { data: mockBrands } }
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useProductsStore()
    await store.fetchBrands()

    expect(store.brands).toEqual(mockBrands)
    expect(store.error).toBeNull()
  })

  it('fetches colors successfully', async () => {
    const mockColors = [
      { uuid: 'color1', name: 'Color 1' },
      { uuid: 'color2', name: 'Color 2' }
    ]
    const mockResponse = { data: { data: mockColors } }
    vi.mocked(api.get).mockResolvedValue(mockResponse)

    const store = useProductsStore()
    await store.fetchColors()

    expect(store.colors).toEqual(mockColors)
    expect(store.error).toBeNull()
  })

  it('sets filters correctly', () => {
    const store = useProductsStore()
    const newFilters = {
      search: 'test',
      category: 'cat1',
      brand: 'brand1',
      color: 'color1'
    }

    store.setFilters(newFilters)

    expect(store.filters).toEqual(newFilters)
  })

  it('clears filters correctly', () => {
    const store = useProductsStore()
    store.filters = {
      search: 'test',
      category: 'cat1',
      brand: 'brand1',
      color: 'color1'
    }

    store.clearFilters()

    expect(store.filters).toEqual({
      search: '',
      category: null,
      brand: null,
      color: null
    })
  })
}) 