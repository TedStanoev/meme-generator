import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import MemeViewCard from '@/components/cards/meme-view-card';

const meme = {
  id: '1',
  name: 'Test Meme',
  url: 'https://example.com/meme.png'
};
 
describe('MemeViewCard', () => {
  it('renders meme name', () => {
    render(<MemeViewCard meme={meme} />)
 
    const heading = screen.getByRole('paragraph')
 
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Meme');
  })
})