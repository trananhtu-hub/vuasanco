import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "group border-t-4 border-editorial-dark last:border-b-4",
        "py-4",
        className
      )}
    >
      <AccordionPrimitive.Header className="px-2">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-editorial text-2xl font-black uppercase tracking-wider text-editorial-dark">{title}</span>
            </div>
            <AccordionPrimitive.Trigger className="focus:outline-none">
              {customTrigger || <MorphingTrigger />}
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" size="small" className="mt-1 font-sans">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-2"
        )}
      >
        <div className="group-radix-state-closed:animate-accordion-close py-4">
          {description && <p className="font-sans text-sm mb-4">{description}</p>}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="w-8 h-8 border-2 border-editorial-dark flex items-center justify-center bg-white group-hover:bg-editorial-neonVolt transition-colors relative">
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Horizontal Line (Always visible) */}
        <span className="absolute w-4 h-[3px] bg-editorial-dark" />
        {/* Vertical Line (Visible when closed, rotates 90deg to hide behind horizontal line when open) */}
        <span className="absolute h-4 w-[3px] bg-editorial-dark transition-transform duration-300 group-radix-state-open:rotate-90" />
      </div>
    </div>
  )
}

export default Accordion
