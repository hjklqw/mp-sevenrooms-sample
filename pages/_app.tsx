import type { AppProps } from 'next/app'
import { Router } from 'next/router'

import 'common/global.scss'
import 'react-datepicker/dist/react-datepicker.css'
import 'common/datePickerOverrides.scss'

import { GlobalLayout } from '/layouts/global'

function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on('routeChangeComplete', () => {
    document.getElementById('__next')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  })

  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  )
}

export default MyApp
