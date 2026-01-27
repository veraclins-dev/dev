import { useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router'
import { useSpinDelay } from 'spin-delay'

import { Box } from '@veraclins-dev/ui'
import { cn } from '@veraclins-dev/utils'

function Progress() {
	const transition = useNavigation()
	const busy = transition.state !== 'idle'
	const delayedPending = useSpinDelay(busy, {
		delay: 600,
		minDuration: 400,
	})
	const ref = useRef<HTMLDivElement>(null)
	const [animationComplete, setAnimationComplete] = useState(true)

	useEffect(() => {
		if (!ref.current) return
		if (delayedPending) setAnimationComplete(false)

		const animationPromises = ref.current
			.getAnimations()
			.map(({ finished }) => finished)

		Promise.allSettled(animationPromises)
			.then(() => {
				if (!delayedPending) setAnimationComplete(true)
			})
			.catch(() => {
				// Ignore animation errors
			})
	}, [delayedPending])

	return (
		<Box
			aria-hidden={delayedPending ? undefined : true}
			aria-valuetext={delayedPending ? 'Loading' : undefined}
			className="fixed inset-x-0 top-0 left-0 z-50 h-2 animate-pulse"
		>
			<Box
				ref={ref}
				className={cn(
					'bg-secondary h-full w-0 duration-500 ease-in-out',
					transition.state === 'idle' &&
						(animationComplete
							? 'transition-none'
							: 'w-full opacity-0 transition-all'),
					delayedPending && transition.state === 'submitting' && 'w-5/12',
					delayedPending && transition.state === 'loading' && 'w-8/12',
				)}
			/>
		</Box>
	)
}

export { Progress as EpicProgress }
