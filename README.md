@papack/csr

Async JSX SPA framework with Fine-grained Reactivity (Experimental).

Planned Features:

- h, signal, onMount, onCleanup, Show, For, ref, effect
- Lifecycle (onMount/onCleanup)
- Conditional rendering (Show)
- Hooks (useSignal, useEffect)
- Ready to use Colors, Spaces etc.
- Ready to use Layout Components (Box, Center, Flex, Stack etc.)
- Ready to use Templates (Login, Register, AppShell)
- Ready to use Hooks (useCustomEvent)
- useBrakepoint for responsive Layouts

Design:

- Design Goal: Fast and good Developer Experience for internal Tools like portals etc.
  - Make a SPA-based GUI for APIs FAST!
- Only One Way (for example: Signals only with setValue((prev) => newValue))
- No Hydration in Mind
- Batteries Included
