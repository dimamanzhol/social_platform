import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white"

    const variants = {
      default: "bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary focus-visible:ring-offset-white rounded-md",
      secondary: "bg-transparent border border-default text-primary hover:bg-hover hover:border-hover focus-visible:ring-border-focus rounded-md",
      outline: "border border-default text-primary hover:bg-primary hover:text-white hover:border-primary focus-visible:ring-primary focus-visible:ring-offset-white rounded-md",
      ghost: "text-secondary hover:bg-primary hover:text-white hover:bg-opacity-10 focus-visible:ring-primary focus-visible:ring-offset-transparent rounded-md",
    }

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10 rounded-md",
    }

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }