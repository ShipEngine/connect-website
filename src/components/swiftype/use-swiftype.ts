/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useScript from '@charlietango/use-script'
import { useEffect } from 'react'

// this is awful, but swiftype is a jquery plugin and it is not intended to be installed in react (and specifically nextjs sites)
// this allows it to work on route change
// alternative to the docs here: https://swiftype.com/documentation/site-search/guides/design-and-customization
// using https://github.com/elastic/search-ui is the recommended way forward.
const useSwiftType = () => {
  const [ready] = useScript('//s.swiftypecdn.com/install/v2/st.js')
  const _install = () => {
    // normal install is broken when route changes -- result of some jquery plugin reverse-engineering.
    ;(window as any)._InternalSwiftype?.Install?.apply(
      (window as any)._InternalSwiftype?.Install?.prototype,
      ['u86UF32qnUsbG7SMBeRd', {}, 0],
    )
  }

  useEffect(() => {
    window['SwiftypeObject'] = '_st'
    _install()
  }, [ready])
}

export default useSwiftType
