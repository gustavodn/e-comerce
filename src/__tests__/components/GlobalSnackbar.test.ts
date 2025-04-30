import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GlobalSnackbar from '@/components/GlobalSnackbar.vue'
import { useSnackbar } from '@/composables/useSnackbar'

describe('GlobalSnackbar', () => {
  it('renders correctly', () => {
    const wrapper = mount(GlobalSnackbar)
    expect(wrapper.exists()).toBe(true)
  })

  it('shows message when snackbar is active', async () => {
    const { show } = useSnackbar()
    const wrapper = mount(GlobalSnackbar)
    
    await show('Test message', 'success')
    
    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.find('.v-snackbar').exists()).toBe(true)
  })

  it('hides snackbar after timeout', async () => {
    vi.useFakeTimers()
    const { show } = useSnackbar()
    const wrapper = mount(GlobalSnackbar)
    
    await show('Test message', 'success')
    vi.advanceTimersByTime(3000)
    
    expect(wrapper.find('.v-snackbar').exists()).toBe(false)
    vi.useRealTimers()
  })
}) 