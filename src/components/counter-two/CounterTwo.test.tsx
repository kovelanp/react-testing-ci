import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { CounterTwo } from './CounterTwo'

test('renders correctly', () => {
  render(<CounterTwo count={0} />)
  const textElement = screen.getByText('Counter Two')
  expect(textElement).toBeInTheDocument()
})

/** 
 * MOCK function
 * this the test to mock the incrementHandler, decrementHandler 
 * we don't know what will happen in the functions and args, return 
 * just check the function is getting call or not -> integration testing 
 * it will not effect the functionality -> ex - if the function is backend call, that will not call 
 */

test('handlers are called', async () => {
  user.setup()
  const incrementHandler = jest.fn()
  const decrementHandler = jest.fn()
  render(
    <CounterTwo
      count={0}
      handleIncrement={incrementHandler}
      handleDecrement={decrementHandler}
    />
  )
  const incrementButton = screen.getByRole('button', { name: 'Increment' })
  const decrementButton = screen.getByRole('button', { name: 'Decrement' })
  await user.click(incrementButton)
  await user.click(decrementButton)
  expect(incrementHandler).toHaveBeenCalledTimes(1)
  expect(decrementHandler).toHaveBeenCalledTimes(1)
})
