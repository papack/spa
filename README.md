@papack/spa

Async first JSX CSR SPA framework with Fine-grained Reactivity, 0 Dependencys and mutable/immutalbe one way databinding (Experimental).

Planned Features:

- h, signal, onMount, onCleanup, Show, For, ref, effect
- Lifecycle (mount/unmount)
- Conditional rendering (Show)
- Hooks (useSignal, useEffect)
- Ready to use Colors, Spaces etc.
- Ready to use Layout Components (Box, Center, Flex, Stack etc.)

- Ready to use Hooks (useCustomEvent)
- useBrakepoint for responsive Layouts

Design:

- Design Goal: Fast and good Developer Experience for internal Tools like portals etc.
  - Make a SPA-based GUI for APIs FAST!
- Only One Way (for example: Signals only with setValue((prev) => newValue))
- mutable one way databinding
- no bloat, only one idimatic way to do things
- No Hydration in Mind
