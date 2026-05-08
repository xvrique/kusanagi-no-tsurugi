import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'
import { Card } from '../Card'
import { Badge } from '../Badge'
import { Container } from '../Container'

describe('Button Component', () => {
  it('should render button with default variant', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('should render button with primary variant', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button', { name: /primary/i })
    expect(button).toHaveClass('bg-crimson')
  })

  it('should render button with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button).toHaveClass('bg-ink')
  })

  it('should render button with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border-2')
  })

  it('should render button with different sizes', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </>
    )
    const smallBtn = screen.getByRole('button', { name: /small/i })
    const largeBtn = screen.getByRole('button', { name: /large/i })
    expect(smallBtn).toHaveClass('px-3')
    expect(largeBtn).toHaveClass('px-6')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })
})

describe('Card Component', () => {
  it('should render card with default styling', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content')
    expect(card).toBeInTheDocument()
    expect(card.parentElement).toHaveClass('bg-cream')
  })

  it('should render card with border when bordered is true', () => {
    render(<Card bordered={true}>Bordered card</Card>)
    const card = screen.getByText('Bordered card')
    expect(card.parentElement).toHaveClass('border-2')
  })

  it('should render card with dark theme', () => {
    render(<Card dark={true}>Dark card</Card>)
    const card = screen.getByText('Dark card')
    expect(card.parentElement).toHaveClass('bg-darkInk')
    expect(card.parentElement).toHaveClass('text-cream')
  })

  it('should render card with scanlines effect', () => {
    render(<Card scanlines={true}>Scanlines card</Card>)
    const card = screen.getByText('Scanlines card')
    expect(card.parentElement).toHaveClass('relative')
  })

  it('should render card with custom className', () => {
    render(<Card className="custom-class">Custom card</Card>)
    const card = screen.getByText('Custom card')
    expect(card.parentElement).toHaveClass('custom-class')
  })
})

describe('Badge Component', () => {
  it('should render badge with default variant', () => {
    render(<Badge>Badge</Badge>)
    const badge = screen.getByText('Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-crimson')
  })

  it('should render badge with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>)
    const badge = screen.getByText('Secondary')
    expect(badge).toHaveClass('bg-parchment')
  })

  it('should render badge with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>)
    const badge = screen.getByText('Outline')
    expect(badge).toHaveClass('border-2')
  })

  it('should render badge with dark variant', () => {
    render(<Badge variant="dark">Dark</Badge>)
    const badge = screen.getByText('Dark')
    expect(badge).toHaveClass('bg-darkInk')
  })

  it('should have uppercase text', () => {
    render(<Badge>badge text</Badge>)
    const badge = screen.getByText('badge text')
    expect(badge).toHaveClass('uppercase')
  })
})

describe('Container Component', () => {
  it('should render container with default size', () => {
    render(<Container>Container content</Container>)
    const container = screen.getByText('Container content')
    expect(container.parentElement).toHaveClass('max-w-6xl')
  })

  it('should render container with small size', () => {
    render(<Container size="sm">Small container</Container>)
    const container = screen.getByText('Small container')
    expect(container.parentElement).toHaveClass('max-w-2xl')
  })

  it('should render container with large size', () => {
    render(<Container size="lg">Large container</Container>)
    const container = screen.getByText('Large container')
    expect(container.parentElement).toHaveClass('max-w-6xl')
  })

  it('should render container with full width', () => {
    render(<Container size="full">Full width</Container>)
    const container = screen.getByText('Full width')
    expect(container.parentElement).toHaveClass('w-full')
  })

  it('should have responsive padding', () => {
    render(<Container>Responsive</Container>)
    const container = screen.getByText('Responsive')
    expect(container.parentElement).toHaveClass('px-4')
  })
})
