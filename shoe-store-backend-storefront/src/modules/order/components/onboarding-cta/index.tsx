"use client"

import { resetOnboardingState } from "@lib/data/onboarding"
import { Button, Container, Text } from "@medusajs/ui"

const OnboardingCta = ({ orderId }: { orderId: string }) => {
  return (
    <Container className="max-w-3xl h-full bg-editorial-light border-2 border-editorial-dark rounded-none shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] w-full">
      <div className="flex flex-col gap-y-4 center p-4 md:items-center">
        <Text className="text-editorial-dark text-xl font-editorial font-black uppercase tracking-wider">
          Đơn hàng thử nghiệm của bạn đã được tạo thành công! 🎉
        </Text>
        <Text className="text-ui-fg-subtle text-small-regular font-medium">
          Bây giờ bạn có thể hoàn tất việc thiết lập cửa hàng của mình trong trang quản trị Medusa Admin.
        </Text>
        <Button
          className="w-fit bg-editorial-neonPink text-white border-2 border-editorial-dark rounded-none font-bold uppercase hover:bg-editorial-dark hover:text-editorial-neonPink hover:translate-y-[-2px] active:translate-y-[1px] shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] transition-all duration-150 py-2 px-6"
          size="xlarge"
          onClick={() => resetOnboardingState(orderId)}
        >
          Hoàn tất thiết lập trong Admin
        </Button>
      </div>
    </Container>
  )
}

export default OnboardingCta
