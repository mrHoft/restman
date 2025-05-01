interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
}

interface DebouncedFunction<Args extends unknown[], Return> {
  (...args: Args): Return | undefined;
  forceCall: () => Return | undefined;
  cancel: () => void;
}

/**
 * Creates a debounced function with forceCall capability
 * @param func The function to debounce
 * @param wait Delay in milliseconds
 * @param options Optional settings
 * @returns Debounced function with forceCall method
 */
export function debounce<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  wait = 500,
  options: DebounceOptions = {}
): DebouncedFunction<Args, Return> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Args | undefined;
  let lastThis: unknown;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;

  const { leading = false, maxWait } = options;
  const maxWaitTime = maxWait ? Math.max(maxWait, wait) : null;

  function invokeFunc(): Return {
    lastInvokeTime = Date.now();
    if (!lastArgs) {
      throw new Error('No arguments stored to invoke');
    }
    return func.apply(lastThis as ThisParameterType<typeof func>, lastArgs);
  }

  function shouldInvoke(time: number): boolean {
    if (lastCallTime === undefined) return true;

    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    return (
      timeSinceLastCall >= wait || timeSinceLastCall < 0 || (maxWaitTime !== null && timeSinceLastInvoke >= maxWaitTime)
    );
  }

  function startTimer(time: number): void {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const waitTime = maxWaitTime
      ? Math.min(wait - timeSinceLastCall, maxWaitTime - (time - lastInvokeTime))
      : wait - timeSinceLastCall;

    timeoutId = setTimeout(() => {
      if (lastArgs) invokeFunc();
      timeoutId = null;
    }, waitTime);
  }

  function debounced(this: unknown, ...args: Args): Return | undefined {
    const now = Date.now();
    lastArgs = args;
    lastThis = this;
    lastCallTime = now;

    const shouldInvokeNow = shouldInvoke(now);
    const isLeadingCall = leading && !timeoutId;

    if (shouldInvokeNow) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (isLeadingCall) return invokeFunc();
      if (maxWaitTime) {
        startTimer(now);
        return invokeFunc();
      }
    }

    if (!timeoutId) {
      startTimer(now);
    }

    return undefined;
  }

  function forceCall(): Return | undefined {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    return lastArgs ? invokeFunc() : undefined;
  }

  function cancel(): void {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    lastArgs = undefined;
  }

  debounced.forceCall = forceCall;
  debounced.cancel = cancel;

  return debounced;
}
