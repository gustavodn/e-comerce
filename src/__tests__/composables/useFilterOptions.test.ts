import { describe, it, expect } from 'vitest'
import { useFilterOptions } from '@/composables/useFilterOptions'

describe('useFilterOptions', () => {
  it('returns the correct functions', () => {
    const { fetchCategories, fetchBrands, fetchColors } = useFilterOptions()

    expect(typeof fetchCategories).toBe('function')
    expect(typeof fetchBrands).toBe('function')
    expect(typeof fetchColors).toBe('function')
  })

  it('fetchCategories returns mock categories', async () => {
    const { fetchCategories } = useFilterOptions()
    const categories = await fetchCategories()

    expect(categories).toEqual([
      { uuid: '1', name: 'Electronics' },
      { uuid: '2', name: 'Clothing' },
      { uuid: '3', name: 'Home Appliances' },
    ])
  })

  it('fetchBrands returns mock brands', async () => {
    const { fetchBrands } = useFilterOptions()
    const brands = await fetchBrands()

    expect(brands).toEqual([
      { uuid: '1', name: 'Brand A' },
      { uuid: '2', name: 'Brand B' },
      { uuid: '3', name: 'Brand C' },
    ])
  })

  it('fetchColors returns mock colors', async () => {
    const { fetchColors } = useFilterOptions()
    const colors = await fetchColors()

    expect(colors).toEqual([
      { uuid: '1', name: 'Red' },
      { uuid: '2', name: 'Blue' },
      { uuid: '3', name: 'Green' },
    ])
  })
}) 