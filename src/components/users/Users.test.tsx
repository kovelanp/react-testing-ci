import { render, screen } from '@testing-library/react'
import { Users } from './Users'
import { rest } from 'msw'
import { server } from '../../mocks/server'

describe('Users', () => {
  test('renders correctly', () => {
    render(<Users />)
    const textElement = screen.getByText('Users')
    expect(textElement).toBeInTheDocument()
  })

  /**
   * moked api call will execute on testing which is configured in setupTest.ts
   */

  test('renders a list of users', async () => {
    render(<Users />)
    const users = await screen.findAllByRole('listitem')
    expect(users).toHaveLength(3)
  })

  /**
   * modify the mock server to use custom configs given in this function
   */
  test('renders error', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users',
        (req, res, ctx) => {
          return res(ctx.status(500))
        }
      )
    )
    render(<Users />)
    const error = await screen.findByText('Error fetching users')
    expect(error).toBeInTheDocument()
  })
})
